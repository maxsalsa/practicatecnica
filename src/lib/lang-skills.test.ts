import { describe, it, expect } from "vitest";
import { similarity, LANGS } from "./lang-skills";
describe("idiomas", () => {
  it("acepta respuesta sin tildes ni mayúsculas", () => expect(similarity("Je suis étudiant", "je suis etudiant")).toBe(100));
  it("puntúa parcial", () => expect(similarity("I am a student", "I am student")).toBe(75));
  it("cada respuesta correcta existe", () => Object.values(LANGS).forEach((l) => [...l.listen, ...l.grammar].forEach((q) => expect(q.options[q.answer]).toBeTruthy())));
});

import { levelItems } from "@/components/LevelTest";
describe("level tests", () => {
  it("B2 and C1 tests have items with valid answers", () => {
    for (const l of ["B2", "C1"]) {
      const items = levelItems(l);
      expect(items.length).toBeGreaterThanOrEqual(4);
      for (const q of items) expect(q.options[q.answer]).toBeDefined();
    }
  });
});
