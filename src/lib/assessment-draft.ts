import { useEffect, useState } from 'react';
import { splitQuestionForm } from './question-forms';

export function draftKey(owner: string | undefined, id: string, mode: string, lang = 'es') {
  // Generated decks share one draft slot per family: the seed suffix identifies the form, not the bank.
  const base = splitQuestionForm(id).baseId.replace(/^(gen-[a-z]+(?:-60)?)-s\d+$/, '$1');
  return `pt-draft-v1:${owner ?? 'anonymous'}:${mode}:${lang}:${base}`;
}
export interface AssessmentDraft<T> { request: string; signature: string; session?: string | undefined; state: T }
export function readDraft<T>(key: string): AssessmentDraft<T> | null {
  try { return JSON.parse(localStorage.getItem(key) ?? 'null'); } catch { return null; }
}
export function writeDraft<T>(key: string, draft: AssessmentDraft<T> | null) {
  try { if (draft) localStorage.setItem(key, JSON.stringify(draft)); else localStorage.removeItem(key); } catch { /* Browser storage can be unavailable. */ }
}
export function useAssessmentDraft<T>(key: string) {
  const [loaded, setLoaded] = useState<{key: string; draft: AssessmentDraft<T> | null} | null>(null);
  useEffect(() => { setLoaded({key, draft: readDraft<T>(key)}); }, [key]);
  return {ready: loaded?.key === key, draft: loaded?.key === key ? loaded.draft : null};
}