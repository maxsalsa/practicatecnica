import { z } from 'zod';
export const editorialContent = z.object({
 text:z.string().max(5000).default(''),textEn:z.string().max(5000).default(''),titleEn:z.string().max(140).default(''),
 objective:z.string().max(500).default(''),audience:z.string().max(100).default('Comunidad educativa'),channel:z.string().max(100).default('Pizarra / impreso'),
 start:z.string().max(10).default(''),end:z.string().max(10).default(''),tags:z.string().max(200).default(''),format:z.enum(['vertical','square','story','screen']).default('vertical'),
 observance:z.boolean().default(false),source:z.string().max(500).default(''),sourceConfirmed:z.boolean().default(false),rights:z.boolean().default(false)
}).superRefine((d,c)=>{if(d.start&&d.end&&d.end<d.start)c.addIssue({code:'custom',message:'La fecha final es anterior al inicio.'});});
export const editorialInput=z.object({id:z.string().uuid().optional(),institutionId:z.string().uuid(),kind:z.enum(['campaign','pdf']),title:z.string().trim().min(3).max(140),content:editorialContent,filePath:z.string().max(160).nullable().default(null),status:z.enum(['draft','review','published'])});
export const sizes={vertical:[1080,1350],square:[1080,1080],story:[1080,1920],screen:[1920,1080]} as const;
export function approvalIssues(c:z.infer<typeof editorialContent>){return [...(!c.rights?['Confirme derechos y privacidad.']:[]),...(c.observance&&(!/^https:\/\/\S+$/.test(c.source)||!c.sourceConfirmed)?['Revise la fuente de la efeméride.']:[])];}
// Adapted from Campana Clara's poster wrapping/export: escape all text and never execute imported artwork.
const escape=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]??''));
export function campaignArtwork(title:string,text:string,name:string,format:keyof typeof sizes,colors:{background:string;foreground:string;accent:string},logo=''){
 const [w,h]=sizes[format];const pad=80;const width=w-pad*2;const lines:string[]=[];
 for(const paragraph of text.split('\n')){let line='';for(const word of paragraph.split(/\s+/)){if((line+' '+word).length>Math.floor(width/23)){lines.push(line);line=word;}else line=(line+' '+word).trim();}lines.push(line);}
 const max=Math.floor((h-480)/58);const visible=lines.slice(0,max);const safeLogo=/^data:image\/png;base64,/.test(logo)?`<image href="${logo}" x="${pad}" y="${h-170}" width="110" height="110"/>`:'';
 const titleLines=title.match(/.{1,28}(?:\s|$)|\S{1,28}/g)?.slice(0,3)??[];
 return {hidden:Math.max(0,lines.length-max),svg:`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="${escape(colors.background)}"/><rect x="80" y="60" width="160" height="8" fill="${escape(colors.accent)}"/>${titleLines.map((l,i)=>`<text x="80" y="${160+i*70}" fill="${escape(colors.foreground)}" font-family="Arial" font-size="60" font-weight="700">${escape(l)}</text>`).join('')}${visible.map((l,i)=>`<text x="80" y="${390+i*58}" fill="${escape(colors.foreground)}" font-family="Arial" font-size="40">${escape(l)}</text>`).join('')}<path d="M80 ${h-200} H${w-80}" stroke="${escape(colors.accent)}"/>${safeLogo}<text x="${safeLogo?220:80}" y="${h-100}" fill="${escape(colors.foreground)}" font-family="Arial" font-size="30">${escape(name.slice(0,65))}</text></svg>`};
}
export function downloadArtwork(blob:Blob,name:string){const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),30000);}