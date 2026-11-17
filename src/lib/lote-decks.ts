import { decks } from './questions';
export const loteDecks = decks.filter(d => d.id==='lote-mat-07-01' || d.id==='lote-mat-08-01');
export const mat07TopicDecks = decks.filter(d => d.id.startsWith('lote-mat-07-01-t'));
