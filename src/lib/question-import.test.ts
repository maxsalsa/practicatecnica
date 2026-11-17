import {expect,it} from 'vitest';import {importQuestions} from './question-import';
const q={q:'What is the past of go?',options:['went','goes','going','go'],answer:0};
it('imports canonical keys and four different options',()=>expect(importQuestions(JSON.stringify([q]))).toEqual([q]));
it('accepts 1000 questions but rejects 1001',()=>{const rows=Array.from({length:1000},(_,i)=>({...q,q:`Question ${i}`}));expect(importQuestions(JSON.stringify(rows))).toHaveLength(1000);expect(()=>importQuestions(JSON.stringify([...rows,{...q,q:'Extra'}]))).toThrow();});
it('rejects duplicates and invalid keys',()=>{expect(()=>importQuestions(JSON.stringify([q,q]))).toThrow();expect(()=>importQuestions(JSON.stringify([{...q,answer:4}]))).toThrow();});