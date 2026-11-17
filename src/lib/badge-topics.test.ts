import { describe, it, expect } from "vitest";
import { badgeTopic } from "./badge-topics";
describe("badgeTopic", () => {
  it("maps electrical simulacro to Electricidad", () => expect(badgeTopic("Electricidad Industrial EN · Simulacro mezclado (60)").key).toBe("electrical"));
  it("maps web to Desarrollo Web", () => expect(badgeTopic("Desarrollo Web · Bloque 1").key).toBe("web"));
  it("falls back to general", () => expect(badgeTopic("Algo raro").key).toBe("general"));
});
