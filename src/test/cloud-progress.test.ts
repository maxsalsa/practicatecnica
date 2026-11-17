import { describe, it, expect } from "vitest";
import {
  aggregateAttempts,
  costaRicaDay,
  scoreAnswers,
  earnedPoints,
  exercisePoints,
} from "@/lib/progress-data";
import { metrologyDecks } from "@/lib/metrology.bank";
describe("Costa Rica student progress", () => {
  it("uses UTC-6 for the day boundary", () => {
    expect(costaRicaDay(new Date("2026-11-10T05:59:00Z"))).toBe("2026-11-09");
    expect(costaRicaDay(new Date("2026-11-10T06:00:00Z"))).toBe("2026-11-10");
  });
  it("counts a daily streak once even after multiple attempts", () => {
    const r = aggregateAttempts(
      ["2026-11-08T14:00:00Z", "2026-11-09T14:00:00Z", "2026-11-09T15:00:00Z"].map(
        (created_at, i) => ({
          id: String(i),
          deck_id: "metro-si",
          title: "SI",
          score: 80,
          question_count: 3,
          created_at,
          verified_scoring: true,
          earned_points: 30,
          points_version: 1,
        }),
      ),
      new Date("2026-11-09T16:00:00Z"),
    );
    expect(r.streak.count).toBe(2);
    expect(r.streak.xp).toBe(60);
    expect(r.stats["metro-si"]?.attempts).toBe(3);
  });
  it("scores submitted answers against the bank rather than a reported grade", () => {
    expect(
      scoreAnswers(metrologyDecks[0]?.questions ?? [], [
        { index: 0, pick: 1 },
        { index: 1, pick: 0 },
        { index: 2, pick: 1 },
      ]),
    ).toBe(67);
  });
  it("rejects duplicated question indices", () =>
    expect(() =>
      scoreAnswers(
        [{ answer: 1 }],
        [
          { index: 0, pick: 1 },
          { index: 0, pick: 1 },
        ],
      ),
    ).toThrow());
  it("metrology calculations have concrete correct results", () => {
    const conversion = metrologyDecks.find((d) => d.id === "metro-conversion");
    expect(conversion?.questions[0]?.options[conversion.questions[0].answer]).toBe("75 mm");
    const vernier = metrologyDecks.find((d) => d.id === "metro-vernier");
    expect(vernier?.questions[0]?.options[vernier.questions[0].answer]).toBe("12,14 mm");
  });
});
describe("Difficulty XP", () => {
  it("awards 10, 20 and 30 for correct foundation, application and reasoning answers", () => {
    expect([1, 2, 3].map((d) => exercisePoints({ difficulty: d as 1 | 2 | 3 }))).toEqual([
      10, 20, 30,
    ]);
    const questions = [
      { answer: 0, difficulty: 1 as const },
      { answer: 1, difficulty: 2 as const },
      { answer: 2, difficulty: 3 as const },
    ];
    expect(
      earnedPoints(questions, [
        { index: 0, pick: 0 },
        { index: 1, pick: 0 },
        { index: 2, pick: 2 },
      ]),
    ).toBe(40);
    expect(
      scoreAnswers(questions, [
        { index: 0, pick: 0 },
        { index: 1, pick: 0 },
        { index: 2, pick: 2 },
      ]),
    ).toBe(67);
  });
  it("gives no points for wrong answers", () => {
    expect(earnedPoints([{ answer: 0, difficulty: 3 }], [{ index: 0, pick: 1 }])).toBe(0);
  });
  it("keeps a practice day for verified work even without points, but excludes self-reported AI days", () => {
    const base = {
      id: "a",
      deck_id: "a",
      title: "a",
      score: 0,
      question_count: 1,
      created_at: "2026-11-09T14:00:00Z",
      earned_points: 0,
      points_version: 1,
    };
    expect(
      aggregateAttempts([{ ...base, verified_scoring: true }], new Date(base.created_at)).streak
        .count,
    ).toBe(1);
    expect(
      aggregateAttempts([{ ...base, verified_scoring: false }], new Date(base.created_at)).streak
        .count,
    ).toBe(0);
  });
});

describe("Bilingual metrology bank", () => {
  it("keeps the same canonical correct answer index in English", async () => {
    const { englishMetrologyQuestions } = await import("@/lib/metrology-en");
    for (const [index, deck] of metrologyDecks.entries()) {
      const en = englishMetrologyQuestions(deck.questions, index);
      expect(en.map((q) => q.answer)).toEqual(deck.questions.map((q) => q.answer));
      expect(new Set(en[0]?.options).size).toBe(4);
    }
  });
});

describe("School practice answers", () => {
  it("uses the same answer keys in both languages and checks concrete physics results", async () => {
    const { schoolSubjects, schoolDeck } = await import("@/lib/school-practice.bank");
    for (const s of schoolSubjects) {
      expect(schoolDeck(s.id, "6.º primaria", "es").questions.map((q) => q.answer)).toEqual(
        schoolDeck(s.id, "6.º primaria", "en").questions.map((q) => q.answer),
      );
    }
    const physics = schoolDeck("fisica", "10.º secundaria / CTP", "es");
    const first = physics.questions[0];
    expect(first?.options[first.answer]).toBe("6 m/s");
  });
});
