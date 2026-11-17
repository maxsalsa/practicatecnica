import { describe, it, expect } from "vitest";
import { specialtyDeckIds } from "./specialty-decks";
import { decks } from "./questions";
describe("specialty practice selection", () => {
  it("resolves every linked specialty to an existing question bank", () => {
    for (const id of Object.values(specialtyDeckIds)) expect(decks.some(d => d.id === id)).toBe(true);
  });
  it("includes digital design practice without substituting a nonexistent bank", () => {
    expect(specialtyDeckIds["3017"]).toBe("ctp-web");
  });
});