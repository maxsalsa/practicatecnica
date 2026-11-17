export interface ConversationTurn {prompt:string;spanish:string;responses:string[];hint:string}
export interface ConversationScenario {id:string;title:string;turns:ConversationTurn[]}
export const conversationScenarios:ConversationScenario[]=[
{id:'study',title:'Organizar el estudio',turns:[
{prompt:'Hi! What are you studying today?',spanish:'¡Hola! ¿Qué está estudiando hoy?',responses:['I am studying English today.','I am studying mathematics today.'],hint:'I am studying + materia + today.'},
{prompt:'What did you study yesterday?',spanish:'¿Qué estudió ayer?',responses:['I studied science yesterday.','I studied English yesterday.'],hint:'I studied + materia + yesterday.'},
{prompt:'Do you have time to practice with me?',spanish:'¿Tiene tiempo para practicar conmigo?',responses:['Yes, I have time to practice with you.','I have ten minutes to practice.'],hint:'Use have para expresar disponibilidad.'}]},
{id:'shop',title:'Conversación en una tienda',turns:[
{prompt:'Good morning. How can I help you?',spanish:'Buenos días. ¿Cómo puedo ayudarle?',responses:['Good morning. I need a notebook, please.','I would like a notebook, please.'],hint:'I need / I would like + artículo + please.'},
{prompt:'Would you like a blue notebook or a green one?',spanish:'¿Prefiere un cuaderno azul o uno verde?',responses:['I would like a blue notebook.','I would like a green notebook.'],hint:'I would like + color + notebook.'},
{prompt:'Do you need a receipt?',spanish:'¿Necesita un recibo?',responses:['Yes, I need a receipt, please.','No, thank you.'],hint:'Puede responder sí o no con cortesía.'}]},
{id:'work',title:'Coordinar una tarea técnica',turns:[
{prompt:'Have you checked the report?',spanish:'¿Ha revisado el informe?',responses:['Yes, I have checked the report.','No, I have not checked it yet.'],hint:'Have + participio para una acción relacionada con el presente.'},
{prompt:'What were you doing when I called?',spanish:'¿Qué estaba haciendo cuando llamé?',responses:['I was testing the application.','I was reading the manual.'],hint:'I was + verbo terminado en -ing.'},
{prompt:'Does the policy allow us to share passwords?',spanish:'¿La norma nos permite compartir contraseñas?',responses:['No, the policy does not allow us to share passwords.','No, we must not share passwords.'],hint:'Does not allow us to + verbo.'}]}];
const normalize=(s:string)=>s.toLowerCase().replace(/[^a-z0-9\s]/g,'').replace(/\s+/g,' ').trim();
export function conversationMatch(text:string,responses:string[]){return responses.some(r=>normalize(r)===normalize(text));}
