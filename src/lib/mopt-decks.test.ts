import { expect, it } from 'vitest';
import { moptDecks, MOPT_LAW } from './mopt-decks';
import { scoreAnswers } from './progress-data';
import { agilityDeck } from './agility-deck';
it('mantiene cinco preguntas de carro y cinco de moto en bancos distintos', () => { expect(moptDecks.map(d => d.id)).toEqual(['mopt-carro','mopt-moto']); expect(moptDecks.map(d => d.questions.length)).toEqual([5,5]); });
it('califica ambos bancos canónicamente', () => { for (const d of moptDecks) expect(scoreAnswers(d.questions,d.questions.map((q,index) => ({index,pick:q.answer})))).toBe(100); });
it('referencia la ley real y valida opciones', () => { for(const d of moptDecks) for(const q of d.questions) { expect(q.source).toContain(MOPT_LAW); expect(q.options).toHaveLength(4); expect(q.options[q.answer]).toBeTruthy(); } });
it('mantiene agilidad mental separada de MOPT', () => { expect(agilityDeck.id).toBe('agilidad-mental'); expect(agilityDeck.questions).toHaveLength(5); expect(scoreAnswers(agilityDeck.questions,agilityDeck.questions.map((q,index)=>({index,pick:q.answer})))).toBe(100); });