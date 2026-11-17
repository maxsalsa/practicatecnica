import { primaryBooks, secondaryBooks, ctpBook } from './primary-books';
import { splitQuestionForm } from './question-forms';
import type { Attempt } from './progress-data';
import { decks } from './questions';
export function bookTopicId(grade: number, subject: string) {
  return `book-v1-${grade}-${subject.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '')}`;
}
export const bookTopics = [...primaryBooks, ...secondaryBooks, ctpBook].flatMap(book => book.chapters.map(chapter => ({
  id: bookTopicId(book.grade, chapter.subject), grade: book.grade, subject: chapter.subject,
  title: `${book.grade === 0 ? 'Preescolar' : `${book.grade}.º`} · ${chapter.subject}`,
  deckIds: book.grade === 1 && chapter.subject === 'Matemática' ? ['mep-math-01-v1', 'mep-math-01-v2', 'mep-math-01-e60'] : book.grade === 1 && chapter.subject === 'Español' ? ['mep-spanish-01-v1'] : book.grade === 7 && chapter.subject === 'Matemática' ? ['lote-mat-07-01', 'lote-mat-07-01-t1', 'lote-mat-07-01-t2', 'lote-mat-07-01-t3', 'lote-mat-07-01-t4'] : book.grade === 8 && chapter.subject === 'Matemática' ? ['lote-mat-08-01'] : [],
})));
export const publishedExamTopics = bookTopics.filter(topic => topic.grade > 0 && topic.grade < 12 && topic.deckIds.some(id => decks.some(deck => deck.id === id)));
export function topicExamResults(topicId: string, attempts: Attempt[]) {
  const topic = bookTopics.find(t => t.id === topicId);
  return attempts.filter(a => a.verified_scoring && a.assessment_mode === 'exam' && topic?.deckIds.includes(splitQuestionForm(a.deck_id).baseId));
}
export type BookProgressRow = { topic_id: string; read_done: boolean; exercises_done: boolean; updated_at: string };
export function gradeSubjectProgress(rows: BookProgressRow[], attempts: Attempt[]) {
  return bookTopics.map(topic => {
    const row = rows.find(r => r.topic_id === topic.id);
    const exams = topicExamResults(topic.id, attempts);
    return { ...topic, recorded: Boolean(row), updatedAt: row?.updated_at ?? null, reading: row?.read_done ?? false, exercises: row?.exercises_done ?? false,
      completed: Number(row?.read_done ?? false) + Number(row?.exercises_done ?? false),
      examCount: exams.length, bestScore: exams.length ? Math.max(...exams.map(a => a.score)) : null };
  });
}