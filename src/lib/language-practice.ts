export const practiceLanguages=[{id:'es',name:'Español'},{id:'en',name:'English'},{id:'fr',name:'Français'},{id:'pt',name:'Português'},{id:'de',name:'Deutsch'},{id:'zh',name:'中文 · Mandarín'}];
export const practiceLevels=['A1','A2','B1','B2','C1'] as const;
export function languagePracticeId(lang:string,level:string){return `language-${lang}-${level.toLowerCase()}-v1`;}
