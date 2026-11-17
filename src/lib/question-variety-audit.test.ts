import {expect,it} from 'vitest';
import {auditQuestionVariety} from './question-variety-audit';
it('detects repeated stems despite whitespace and case',()=>{expect(auditQuestionVariety(['Resuelva 2 + 3',' resuelva 2 + 3 ']).exactDuplicates).toEqual([[0,1]]);});
it('does not count changed numbers as a new operation',()=>{const a=auditQuestionVariety(['Resuelva 2 + 3','Resuelva 4 + 5','Resuelva 4 × 5']);expect(a.exactDuplicates).toEqual([]);expect(a.numericStructureRepeats).toEqual([[0,1]]);});
it('detects decorative IPv6 address changes',()=>{expect(auditQuestionVariety(['Clasifique fe80::2.','Clasifique fe80::3.']).numericStructureRepeats).toEqual([[0,1]]);});