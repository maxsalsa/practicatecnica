import { describe, it, expect } from "vitest";
import { start, allMoves, apply } from "./checkers";
describe("checkers", () => {
  it("starts with 12 pieces each", () => { const b = start(); expect(b.filter(v => v === 1).length).toBe(12); expect(b.filter(v => v === 2).length).toBe(12); });
  it("red has 7 opening moves", () => expect(allMoves(start(), 1).length).toBe(7));
  it("capture is mandatory and removes the piece", () => {
    const b = Array(64).fill(0); b[44] = 1; b[35] = 2; // red at r5c4, black at r4c3
    const m = allMoves(b, 1); expect(m.length).toBe(1); expect(m[0]?.jump).toBe(35);
    const move = m[0]; expect(move).toBeDefined(); if (!move) throw new Error("Missing capture");
    expect(apply(b, move)[35]).toBe(0);
  });
});
