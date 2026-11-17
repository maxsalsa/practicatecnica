import { expect, it } from "vitest";
import { summarizeAICosts } from "./ai-cost-summary";
it("keeps unknown provider costs pending rather than treating them as free", () => {
  expect(summarizeAICosts([{ actual_credits: 0.25 }, { actual_credits: null }, { actual_credits: 0.5 }])).toEqual({ confirmed: 0.75, pending: 1 });
});