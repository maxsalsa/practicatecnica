import { describe, expect, it } from "vitest";
import {
  practiceTopics,
  topicDeck,
  topicsFor,
  topicDecks,
  numericTopicIds,
  resolveVariantDeck,
} from "@/lib/practice-library.bank";
import { schoolSubjects, schoolLevels } from "@/lib/school-practice";
import { scoreAnswers } from "@/lib/progress-data";
import { learningInput } from "@/lib/learning-input";

describe("Progressive topic bank", () => {
  it("offers 50 distinct numeric stems per topic with reproducible server keys and four distinct options", () => {
    for (const id of numericTopicIds) {
      const topic = practiceTopics.find((t) => t.id === id);
      if (!topic) throw new Error("Missing topic");
      const level = schoolLevels.find((l) => parseInt(l, 10) >= topic.minGrade);
      if (!level) throw new Error("Missing grade");
      const stems = new Set<string>();
      for (let variant = 0; variant < 50; variant++) {
        const deck = topicDeck(id, level, "en", "practice", 2, variant);
        stems.add(deck.questions[0]?.q ?? "");
        for (const q of deck.questions) expect(new Set(q.options).size).toBe(4);
        if (variant > 0)
          expect(resolveVariantDeck(deck.id)?.questions.map((q) => q.answer)).toEqual(
            deck.questions.map((q) => q.answer),
          );
      }
      expect(stems.size).toBe(50);
    }
    expect(() => topicDeck("rapidez", "6.º primaria", "es", "practice", 2, 50)).toThrow();
  });
  it("offers three topic stages per requested subject", () => {
    expect(schoolSubjects.map((s) => s.id)).toEqual([
      "religion",
      "biologia",
      "quimica",
      "fisica",
      "matematica",
      "espanol",
    ]);
    for (const s of schoolSubjects) {
      expect(topicsFor(s.id, "6.º primaria")).toHaveLength(1);
      expect(topicsFor(s.id, "8.º secundaria")).toHaveLength(2);
      expect(topicsFor(s.id, "10.º secundaria / CTP")).toHaveLength(3);
    }
  });
  it("rejects a topic before its grade stage", () => {
    expect(() => topicDeck("genetica", "6.º primaria", "es")).toThrow();
    expect(() => topicDeck("ecuaciones", "7.º secundaria", "en")).toThrow();
  });
  it("preserves canonical answer keys and distinct options at every grade in both languages", () => {
    for (const subject of schoolSubjects)
      for (const level of schoolLevels)
        for (const topic of topicsFor(subject.id, level)) {
          const es = topicDeck(topic.id, level, "es"),
            en = topicDeck(topic.id, level, "en");
          expect(es.questions.map((q) => q.answer)).toEqual(en.questions.map((q) => q.answer));
          for (const deck of [es, en])
            for (const q of deck.questions) expect(new Set(q.options).size).toBe(4);
          expect(
            scoreAnswers(
              es.questions,
              en.questions.map((q, index) => ({ index, pick: q.answer })),
            ),
          ).toBe(100);
        }
  });
  it("computes concrete grade-specific physics and chemistry values", () => {
    const speed6 = topicDeck("rapidez", "6.º primaria", "en").questions[0];
    const speed12 = topicDeck("rapidez", "12.º CTP", "en").questions[0];
    expect(speed6?.options[speed6.answer]).toBe("8 m/s");
    expect(speed12?.options[speed12.answer]).toBe("14 m/s");
    const atoms = topicDeck("atomos", "8.º secundaria", "en").questions[0];
    expect(atoms?.options[atoms.answer]).toBe("11");
    const solution = topicDeck("disoluciones", "10.º secundaria / CTP", "en").questions[0];
    expect(solution?.options[solution.answer]).toBe("6 g/L");
  });
  it("registers both modes for server scoring with unique stable IDs", () => {
    expect(practiceTopics).toHaveLength(18);
    expect(new Set(topicDecks.map((d) => d.id)).size).toBe(topicDecks.length);
    expect(topicDecks.find((d) => d.id === "topic-rapidez-6-review")?.questions).toHaveLength(4);
    expect(topicDecks.find((d) => d.id === "topic-v2-rapidez-6-review")?.questions).toHaveLength(6);
  });
  it("adds genuine application and reasoning to every available topic without changing historical keys", () => {
    for (const t of practiceTopics) {
      const level = schoolLevels.find((l) => parseInt(l, 10) >= t.minGrade);
      if (!level) throw new Error("Missing grade");
      const old = topicDeck(t.id, level, "es", "practice", 1),
        expanded = topicDeck(t.id, level, "es");
      expect(expanded.questions.slice(0, 4).map((q) => q.answer)).toEqual(
        old.questions.map((q) => q.answer),
      );
      expect(expanded.questions.map((q) => q.difficulty)).toEqual([1, 1, 1, 1, 2, 3]);
      expect(topicDeck(t.id, level, "en", "trivia").questions.map((q) => q.difficulty)).toEqual([
        1, 2, 3,
      ]);
    }
  });
});
describe("Manual learning progress", () => {
  const valid = {
    studentId: "11111111-1111-4111-8111-111111111111",
    subject: "biologia",
    level: "6.º primaria",
    progress: 0,
    notes: "",
  };
  it("accepts 0 and 100 percent but rejects negative, fractional and above-100 progress", () => {
    expect(learningInput.parse(valid).progress).toBe(0);
    expect(learningInput.parse({ ...valid, progress: 100 }).progress).toBe(100);
    for (const progress of [-1, 101, 0.5])
      expect(() => learningInput.parse({ ...valid, progress })).toThrow();
  });
  it("rejects unsupported subjects and grade labels", () => {
    expect(() => learningInput.parse({ ...valid, subject: "unknown" })).toThrow();
    expect(() => learningInput.parse({ ...valid, level: "99.º" })).toThrow();
  });
});
