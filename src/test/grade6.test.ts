import { describe, expect, it } from "vitest";
import { GRADE6_VERSIONS, grade6Deck, grade6Subjects, resolveGrade6Deck } from "@/lib/grade6.bank";

describe("6.º grado", () => {
  it("offers 500 versions per subject", () => {
    expect(GRADE6_VERSIONS).toBe(500);
    expect(resolveGrade6Deck("g6-matematica-v499")).toBeDefined();
    expect(resolveGrade6Deck("g6-matematica-v500")).toBeUndefined();
  });
  it("every version has 6 questions with 4 distinct options", () => {
    for (const s of grade6Subjects)
      for (let v = 0; v < GRADE6_VERSIONS; v++) {
        const d = grade6Deck(s.id, v);
        expect(d.questions).toHaveLength(6);
        for (const q of d.questions) expect(new Set(q.options).size).toBe(4);
      }
  });
  it("same id rebuilds the same answers for server scoring", () => {
    const a = grade6Deck("matematica", 42);
    expect(resolveGrade6Deck(a.id)?.questions.map((q) => q.q)).toEqual(a.questions.map((q) => q.q));
  });
  it("math versions vary their data", () => {
    const texts = new Set(Array.from({ length: 50 }, (_, v) => grade6Deck("matematica", v).questions[0]!.q));
    expect(texts.size).toBeGreaterThan(30);
  });
});
