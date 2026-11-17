import { describe, expect, it } from 'vitest';
import { bookTopics, bookTopicId, topicExamResults, gradeSubjectProgress, publishedExamTopics } from './book-topics';
import type { Attempt } from './progress-data';
describe('book topic progress', () => {
  it('offers only grades and subjects with specific published exams on Home', () => {
    expect([...new Set(publishedExamTopics.map(t=>t.grade))]).toEqual([1,7,8]);
    expect(publishedExamTopics.map(t=>t.id)).toEqual(['book-v1-1-matematica','book-v1-1-espanol','book-v1-7-matematica','book-v1-8-matematica']);
  });
  it('ignores unknown topics and distinguishes absent records from recorded zero completion', () => {
    const rows = gradeSubjectProgress([{topic_id:'unknown',read_done:true,exercises_done:true,updated_at:'2026-11-14'}, {topic_id:bookTopicId(1,'Matemática'),read_done:false,exercises_done:false,updated_at:'2026-11-14'}],[]);
    expect(rows.filter(r=>r.recorded).map(r=>r.id)).toEqual([bookTopicId(1,'Matemática')]);
    expect(rows.find(r=>r.id===bookTopicId(1,'Matemática'))?.updatedAt).toBe('2026-11-14');
    expect(rows.find(r=>r.id===bookTopicId(2,'Matemática'))?.recorded).toBe(false);
  });
  it('keeps reading completion separate for each grade without inventing an exam grade', () => {
    const rows = gradeSubjectProgress([{ topic_id: bookTopicId(1, 'Matemática'), read_done: true, exercises_done: true, updated_at: '2026-11-14' }], []);
    expect(rows.find(r => r.id === bookTopicId(1, 'Matemática'))?.completed).toBe(2);
    expect(rows.find(r => r.id === bookTopicId(2, 'Matemática'))?.completed).toBe(0);
    expect(rows.find(r => r.id === bookTopicId(1, 'Matemática'))?.bestScore).toBeNull();
  });
  it('keeps every book chapter separate', () => {
    expect(new Set(bookTopics.map(t => t.id)).size).toBe(bookTopics.length);
    expect(bookTopicId(1, 'Español')).not.toBe(bookTopicId(2, 'Español'));
  });
  it('never attributes unrelated or self-reported exams to a topic', () => {
    const base: Attempt = { id: 'a', deck_id: 'mep-math-01-v1', title: 'Math', score: 60, question_count: 20, created_at: '2026-11-14', verified_scoring: true, assessment_mode: 'exam' };
    expect(topicExamResults(bookTopicId(1, 'Matemática'), [base, { ...base, deck_id: 'mep-spanish-01-v1' }, { ...base, verified_scoring: false }, { ...base, assessment_mode: 'practice' }])).toEqual([base]);
    expect(topicExamResults(bookTopicId(2, 'Matemática'), [base])).toEqual([]);
  });
});