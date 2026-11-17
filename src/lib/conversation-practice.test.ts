import {it,expect} from 'vitest';
import {conversationMatch,conversationScenarios} from './conversation-practice';
import {isEnglishBank,englishSupport,englishQuestionSupport} from './english-audio';
it('accepts model text case-insensitively but not unrelated speech',()=>{expect(conversationMatch('YES, I have time to practice with you!',conversationScenarios[0]?.turns[2]?.responses??[])).toBe(true);expect(conversationMatch('I lost my password',conversationScenarios[0]?.turns[2]?.responses??[])).toBe(false)});
it('has three original conversations with three bilingual turns and model alternatives',()=>{expect(conversationScenarios).toHaveLength(3);for(const s of conversationScenarios){expect(s.turns).toHaveLength(3);for(const t of s.turns){expect(t.responses).toHaveLength(2);expect(t.spanish.length).toBeGreaterThan(10)}}});
it('audio supports English form IDs without giving the correct answer in support',()=>{expect(isEnglishBank('study-english-b1-v1~f15')).toBe(true);expect(isEnglishBank('study-finance-b1-v1')).toBe(false);expect(englishSupport({q:'Right now, the team ___ the router.',options:[],why:'is configuring'})).not.toContain('is configuring')});

it("provides question-specific Spanish support for all 60 new English prompts",()=>{expect(Object.keys(englishQuestionSupport)).toHaveLength(60);expect(englishQuestionSupport["The past form of allow is ___."]).toBe("La forma pasada de allow es ___.")});
