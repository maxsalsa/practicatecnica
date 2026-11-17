import { describe,it,expect } from 'vitest';
import { editorialContent,approvalIssues,campaignArtwork,sizes } from './institution-editorial';
describe('institution editorial rules',()=>{
 it('requires rights and verified source for an observance',()=>{expect(approvalIssues(editorialContent.parse({observance:true}))).toHaveLength(2);expect(approvalIssues(editorialContent.parse({rights:true,observance:true,source:'https://example.org',sourceConfirmed:true}))).toEqual([]);});
 it('rejects reversed diffusion dates',()=>{expect(editorialContent.safeParse({start:'2026-11-15',end:'2026-11-14'}).success).toBe(false);});
 it('escapes imported text instead of executing markup',()=>{expect(campaignArtwork('<script>', '<img>', 'CTP', 'square',{background:'navy',foreground:'white',accent:'cyan'}).svg).not.toContain('<script>');expect(sizes.story).toEqual([1080,1920]);});
});