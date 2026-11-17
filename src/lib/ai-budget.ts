// No billable inference is authorized until a verified spend cap is configured.
export const aiBudget = { monthlyCredits: 0, generationEnabled: false } as const;
export function canGenerateWithAI() { return aiBudget.generationEnabled && aiBudget.monthlyCredits > 0; }