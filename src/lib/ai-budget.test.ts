import { describe, it, expect } from "vitest";
import { aiBudget, canGenerateWithAI } from "./ai-budget";
describe("free-only authorization", () => {
  it("permits zero credits of spending and blocks inference", () => {
    expect(aiBudget.monthlyCredits).toBe(0);
    expect(canGenerateWithAI()).toBe(false);
  });
});