import type {Q} from './questions';
import {LANGUAGE_REVIEW_BANKS} from './language-review-catalog';
import {rng,shuffle} from './generators/core';
type ReviewedItem={skill:string;question:Q};
const q=(stem:string,correct:string,wrong:string[],why:string):Q=>({q:stem,options:[correct,...wrong],answer:0,why,source:'pracTICAtecnica.com · repaso introductorio depurado v3',difficulty:1});
/** One canonical item per learning objective; no substitutions counted as new items. */
const BANKS:Record<string,ReviewedItem[]>={
 frclean:[
  {skill:'identity',question:q('Pour présenter votre profession, complétez : « Je ___ technicienne. »','suis',['ai','fait','va'],'Être exprime ici une identité : je suis technicienne.')},
  {skill:'possession',question:q('Quel verbe exprime la possession dans « Nous ___ un dictionnaire » ?','avons',['sommes','allez','est'],'La possession s’exprime avec avoir : nous avons.')},
  {skill:'completed-past',question:q('Choisissez la phrase qui décrit une action terminée hier.','Hier, elle a réparé le clavier.',['Hier, elle va réparer le clavier.','Hier, elle réparera le clavier.','Hier, elle est en train de réparer le clavier.'],'Le passé composé a réparé décrit une action passée et achevée.')},
  {skill:'future-plan',question:q('Vous avez prévu une visite demain. Quelle phrase exprime ce projet au futur proche ?','Demain, nous allons visiter le musée.',['Demain, nous avons visité le musée.','Demain, nous visitions le musée.','Demain, nous sommes visiter le musée.'],'Le futur proche se construit avec aller au présent et un infinitif : allons visiter.')},
  {skill:'ongoing',question:q('Dans « Elle est en train de préparer le dossier », que décrit la construction « être en train de » ?','Une action en cours',['Une action déjà terminée','Une obligation passée','Une possession'],'Être en train de suivi de l’infinitif met l’accent sur le déroulement actuel de l’action.')},
  {skill:'article-elision',question:q('Quel groupe nominal respecte l’élision de l’article devant une voyelle ?','L’ordinateur',['Le ordinateur','La ordinateur','Les ordinateur'],'Devant ordinateur, l’article singulier le s’élide : l’ordinateur.')},
  {skill:'negation',question:q('Mettez « Elle travaille au laboratoire » à la forme négative écrite.','Elle ne travaille pas au laboratoire.',['Elle travaille ne pas au laboratoire.','Elle ne pas travaille au laboratoire.','Elle pas travaille au laboratoire.'],'Dans la négation écrite, ne précède le verbe conjugué et pas le suit.')},
  {skill:'regular-present',question:q('Avec « vous », quelle forme du verbe régulier « parler » convient au présent ?','Vous parlez.',['Vous parlons.','Vous parlent.','Vous parles.'],'Au présent, la terminaison des verbes réguliers en -er avec vous est -ez.')},
 ],
 ptclean:[
  {skill:'identity',question:q('Para apresentar uma profissão, complete: « Eu ___ professora. »','sou',['estou','tenho','vai'],'Ser expressa a identidade profissional: eu sou professora.')},
  {skill:'location',question:q('Qual frase indica corretamente a localização atual da equipe?','A equipe está no laboratório.',['A equipe têm no laboratório.','A equipe sou no laboratório.','A equipe vamos no laboratório.'],'Estar indica localização: a equipe está no laboratório.')},
  {skill:'possession',question:q('Escolha a forma de « ter » que expressa posse com « nós ».','Nós temos um manual.',['Nós têm um manual.','Nós tenho um manual.','Nós tem um manual.'],'No presente, ter concorda com nós na forma temos.')},
  {skill:'completed-past',question:q('Qual frase descreve uma ação concluída ontem?','Ontem, ela testou a conexão.',['Ontem, ela vai testar a conexão.','Ontem, ela testará a conexão.','Ontem, ela está testando a conexão.'],'Testou está no pretérito perfeito e expressa uma ação concluída no passado.')},
  {skill:'ongoing',question:q('O que significa « A técnica está verificando o relatório agora » ?','A verificação está em andamento.',['A verificação já terminou.','A verificação foi cancelada.','A técnica possui o relatório, mas não o verifica.'],'Estar com gerúndio expressa uma ação em andamento: está verificando.')},
  {skill:'future-plan',question:q('Escolha a frase que expressa um plano para amanhã com o verbo « ir » seguido de infinitivo.','Amanhã, nós vamos organizar os arquivos.',['Amanhã, nós fomos organizar os arquivos.','Amanhã, nós temos organizar os arquivos.','Amanhã, nós estamos organizou os arquivos.'],'O plano futuro usa ir no presente seguido do infinitivo: vamos organizar.')},
  {skill:'article-agreement',question:q('Qual grupo nominal tem artigo e substantivo concordando no feminino plural?','As janelas',['O janelas','A janelas','Os janelas'],'Janelas é feminino plural; o artigo correspondente é as.')},
  {skill:'negation',question:q('Passe « Ela trabalha na biblioteca » para a forma negativa.','Ela não trabalha na biblioteca.',['Ela trabalha não na biblioteca.','Ela nenhum trabalha na biblioteca.','Ela sem trabalha na biblioteca.'],'Na negação verbal, não aparece antes do verbo: não trabalha.')},
 ],
};
export function reviewedLanguageItems(key:string){return BANKS[key]??[];}
export function buildReviewedLanguageDeck(key:string,seed:number){
 const metadata=LANGUAGE_REVIEW_BANKS.find(b=>b.key===key);if(!metadata)return null;
 const random=rng(seed);const questions=shuffle(random,reviewedLanguageItems(key)).map(({question})=>{const correct=question.options[question.answer];const options=shuffle(random,question.options);return {...question,options,answer:options.indexOf(correct??'')};});
 return {id:`gen-${key}-v2-review-s${seed}`,title:metadata.title,emoji:'🗣️',level:'Repaso introductorio · 8 habilidades · sin certificación',questions};
}