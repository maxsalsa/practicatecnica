export type Profile = { name: string; level: string; goal: string; dailyXp: number; avatar: string };
export const defaultProfile: Profile = { name: "", level: "Secundaria", goal: "Examen teórico MOPT", dailyXp: 50, avatar: "🦉" };
export const loadProfile = (): Profile => ({ ...defaultProfile, ...JSON.parse(localStorage.getItem("pt-profile") || "{}") });
export const saveProfile = (p: Profile) => localStorage.setItem("pt-profile", JSON.stringify(p));
export const loadStreak = () =>
  JSON.parse(localStorage.getItem("pt-streak") || '{"last":"","count":0,"xpDay":"","xp":0}') as { last: string; count: number; xpDay: string; xp: number };
