import { describe, it, expect } from "vitest";
import { analizarCodigoVerificacion, calcularFechaLimiteREA, construirResumenCertificado, normalizarCodigoVerificacion } from "./verificacionDocumental.js";
import { detectarColision, bloqueRespetaRecesos } from "./schedule.js";
import { generarReactivosParametricos } from "./catalogoReactivos.js";

const base = { diaSemana: 1, horaInicio: "07:00", horaFin: "08:20", docenteId: "d1", seccionId: "10-1" };
describe("horarios", () => {
  it("detecta choque 40 vs 60 min del mismo docente", () => {
    expect(detectarColision({ ...base, horaInicio: "07:40", horaFin: "08:40", seccionId: "11-2" }, [{ ...base, horaFin: "07:40", horaInicio: "07:00" }, { ...base, horaInicio: "08:00", horaFin: "08:40" }]).hayChoque).toBe(true);
  });
  it("frontera exacta 08:20 no choca", () => {
    expect(detectarColision({ ...base, horaInicio: "08:20", horaFin: "09:00" }, [base]).hayChoque).toBe(false);
  });
  it("bloque de 120 min no atraviesa recreo", () => {
    expect(bloqueRespetaRecesos({ horaInicio: "08:40", horaFin: "10:40" }, [{ horaInicio: "09:20", horaFin: "09:40" }])).toBe(false);
  });
});
describe("REA y verificación", () => {
  it("3 días hábiles cruzando fin de semana", () => {
    expect(calcularFechaLimiteREA("2026-03-12")).toBe("2026-03-17");
  });
  it("salta Semana Santa 2026", () => {
    expect(calcularFechaLimiteREA("2026-04-01")).toBe("2026-04-08");
  });
  it("salta receso de medio año", () => {
    expect(calcularFechaLimiteREA("2026-07-03")).toBe("2026-07-15");
  });
  it("normaliza folio con guion tipográfico", () => {
    expect(normalizarCodigoVerificacion(" mep–rea–0123456789abcdef ")).toBe("MEP-REA-0123456789ABCDEF");
    expect(analizarCodigoVerificacion("a".repeat(64)).tipo).toBe("SHA256");
  });
  it("resumen público sin nombres ni iniciales", () => {
    const r = construirResumenCertificado({ valido: true, tipo_documento: "JUSTIFICACION_REA", estudiante_enmascarado: "J. P. M.", estudiante: "Juan", sha256: "f".repeat(64), estado: "APROBADO" });
    expect(JSON.stringify(r)).not.toMatch(/J\. P\. M\.|Juan/);
    expect(r.selloTruncado).toBe("ffffffff…ffffffff");
  });
});
describe("reactivos", () => {
  it("misma semilla reproduce el mismo bloque", () => {
    expect(generarReactivosParametricos("m", 42, 50)).toEqual(generarReactivosParametricos("m", 42, 50));
  });
  it("claves distribuidas en A-D y 1000 ítems", () => {
    const r = generarReactivosParametricos("m", 7, 1000);
    expect(r).toHaveLength(1000);
    const c = [0, 0, 0, 0]; r.forEach((x) => c[x.indiceRespuestaCorrecta]++);
    c.forEach((n) => expect(n).toBeGreaterThan(150));
  });
});
