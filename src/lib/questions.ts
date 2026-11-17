import catalog from './deck-catalog.json';
export type Q = { q: string; options: string[]; answer: number; why: string; source: string; difficulty?: 1 | 2 | 3 };
export type Deck = { id: string; title: string; emoji: string; level: string; questions: Q[]; progressive?: boolean; questionCount?: number; examSessionId?: string | undefined };
// Public catalog contains no bank questions. Full decks require a server access check.
export const decks: Deck[] = catalog;