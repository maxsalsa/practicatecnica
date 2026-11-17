export type Lang = "en" | "fr" | "pt";
export type MC = { q: string; options: string[]; answer: number; why: string; level: string };
export type Say = { text: string; es: string; level: string };
export type LangPack = { name: string; flag: string; voice: string; listen: MC[]; speak: Say[]; grammar: MC[]; write: { es: string; answer: string; level: string }[] };

export const LANGS: Record<Lang, LangPack> = {
  en: { name: "Inglés", flag: "🇬🇧", voice: "en-US",
    listen: [
      { q: "The bus to San José leaves at seven fifteen.", options: ["7:15", "7:50", "11:15", "7:05"], answer: 0, why: "«Seven fifteen» = 7:15.", level: "A1" },
      { q: "I'd like two coffees and one orange juice, please.", options: ["2 cafés y 1 jugo", "1 café y 2 jugos", "3 cafés", "2 jugos"], answer: 0, why: "Two coffees + one orange juice.", level: "A1" },
      { q: "The library is next to the bank, across from the park.", options: ["Junto al banco", "Dentro del parque", "Detrás del colegio", "Lejos del banco"], answer: 0, why: "«Next to» = junto a.", level: "A2" },
      { q: "If it rains tomorrow, the field trip will be postponed.", options: ["Se pospone si llueve", "Se cancela siempre", "Es hoy", "Es bajo techo"], answer: 0, why: "Primer condicional: si llueve, se pospone.", level: "B1" },
      { q: "Please save your work before shutting down the computer.", options: ["Guardar antes de apagar", "Apagar sin guardar", "Imprimir el trabajo", "Reiniciar"], answer: 0, why: "«Save… before shutting down».", level: "B1" },
    ],
    speak: [
      { text: "Good morning, my name is Ana.", es: "Buenos días, me llamo Ana.", level: "A1" },
      { text: "I live in Costa Rica.", es: "Vivo en Costa Rica.", level: "A1" },
      { text: "Could you repeat that, please?", es: "¿Podría repetirlo, por favor?", level: "A2" },
      { text: "I have been studying English for two years.", es: "He estudiado inglés por dos años.", level: "B1" },
    ],
    grammar: [
      { q: "She ___ to school every day.", options: ["go", "goes", "going", "gone"], answer: 1, why: "Tercera persona del presente simple: goes.", level: "A1" },
      { q: "Yesterday we ___ a movie.", options: ["watch", "watches", "watched", "watching"], answer: 2, why: "Pasado simple regular: watched.", level: "A2" },
      { q: "I have lived here ___ 2020.", options: ["for", "since", "during", "ago"], answer: 1, why: "«Since» + punto en el tiempo.", level: "A2" },
      { q: "If I ___ more time, I would travel.", options: ["have", "had", "will have", "having"], answer: 1, why: "Segundo condicional: if + pasado.", level: "B1" },
      { q: "The report ___ by the manager last week.", options: ["wrote", "was written", "is writing", "has write"], answer: 1, why: "Voz pasiva en pasado: was written.", level: "B2" },
    ],
    write: [
      { es: "Yo soy estudiante.", answer: "I am a student", level: "A1" },
      { es: "Ella tiene dos hermanos.", answer: "She has two brothers", level: "A1" },
      { es: "Nosotros fuimos a la playa.", answer: "We went to the beach", level: "A2" },
      { es: "¿Dónde está la estación?", answer: "Where is the station", level: "A1" },
    ] },
  fr: { name: "Francés", flag: "🇫🇷", voice: "fr-FR",
    listen: [
      { q: "Le train part à huit heures.", options: ["8:00", "18:00", "7:00", "8:30"], answer: 0, why: "«Huit heures» = 8:00.", level: "A1" },
      { q: "Je voudrais un croissant et un café, s'il vous plaît.", options: ["Croissant y café", "Pan y té", "Dos cafés", "Jugo"], answer: 0, why: "Un croissant et un café.", level: "A1" },
      { q: "La pharmacie est à gauche, après le supermarché.", options: ["A la izquierda, después del súper", "A la derecha", "Antes del súper", "Enfrente"], answer: 0, why: "«À gauche» = a la izquierda.", level: "A2" },
      { q: "S'il fait beau demain, nous irons à la plage.", options: ["Irán a la playa si hace buen tiempo", "Ya fueron", "Se quedan en casa", "Llueve"], answer: 0, why: "Si + presente, futuro.", level: "B1" },
    ],
    speak: [
      { text: "Bonjour, je m'appelle Marie.", es: "Hola, me llamo Marie.", level: "A1" },
      { text: "J'habite au Costa Rica.", es: "Vivo en Costa Rica.", level: "A1" },
      { text: "Pouvez-vous répéter, s'il vous plaît ?", es: "¿Puede repetir, por favor?", level: "A2" },
    ],
    grammar: [
      { q: "Nous ___ français.", options: ["parle", "parlons", "parlez", "parlent"], answer: 1, why: "Nous → parlons.", level: "A1" },
      { q: "Elle ___ allée au cinéma.", options: ["a", "est", "ai", "sont"], answer: 1, why: "«Aller» usa être: est allée.", level: "A2" },
      { q: "C'est ___ livre de Paul.", options: ["la", "le", "les", "l'"], answer: 1, why: "«Livre» es masculino: le.", level: "A1" },
      { q: "Je ___ venir demain si tu veux.", options: ["peux", "peut", "pouvons", "pouvez"], answer: 0, why: "Je → peux.", level: "A2" },
    ],
    write: [
      { es: "Yo soy estudiante.", answer: "Je suis étudiant", level: "A1" },
      { es: "Tengo hambre.", answer: "J'ai faim", level: "A1" },
      { es: "Buenas noches.", answer: "Bonne nuit", level: "A1" },
    ] },
  pt: { name: "Portugués", flag: "🇧🇷", voice: "pt-BR",
    listen: [
      { q: "O ônibus sai às nove horas.", options: ["9:00", "19:00", "10:00", "9:30"], answer: 0, why: "«Nove horas» = 9:00.", level: "A1" },
      { q: "Eu quero um suco de laranja, por favor.", options: ["Jugo de naranja", "Café", "Agua", "Leche"], answer: 0, why: "«Suco de laranja» = jugo de naranja.", level: "A1" },
      { q: "A escola fica perto do mercado.", options: ["Cerca del mercado", "Lejos del mercado", "Dentro del mercado", "En otra ciudad"], answer: 0, why: "«Perto» = cerca.", level: "A2" },
      { q: "Se chover amanhã, ficaremos em casa.", options: ["Se quedan en casa si llueve", "Van a la playa", "Ya llovió", "Salen temprano"], answer: 0, why: "Futuro do subjuntivo: se chover.", level: "B1" },
    ],
    speak: [
      { text: "Bom dia, meu nome é João.", es: "Buenos días, me llamo João.", level: "A1" },
      { text: "Eu moro na Costa Rica.", es: "Vivo en Costa Rica.", level: "A1" },
      { text: "Você pode repetir, por favor?", es: "¿Puede repetir, por favor?", level: "A2" },
    ],
    grammar: [
      { q: "Nós ___ estudantes.", options: ["somos", "são", "sou", "é"], answer: 0, why: "Nós → somos.", level: "A1" },
      { q: "Ontem eu ___ ao cinema.", options: ["vou", "fui", "ia", "vai"], answer: 1, why: "Pretérito perfeito de ir: fui.", level: "A2" },
      { q: "Ela ___ português muito bem.", options: ["fala", "falo", "falam", "falamos"], answer: 0, why: "Ela → fala.", level: "A1" },
      { q: "Eu ___ fome.", options: ["estou com", "sou", "tem", "está"], answer: 0, why: "«Estar com fome» = tener hambre.", level: "A2" },
    ],
    write: [
      { es: "Yo soy estudiante.", answer: "Eu sou estudante", level: "A1" },
      { es: "Muchas gracias.", answer: "Muito obrigado", level: "A1" },
      { es: "¿Cómo estás?", answer: "Como você está", level: "A1" },
    ] },
};

export function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z' ]/g, " ").replace(/\s+/g, " ").trim();
}
/** Porcentaje de palabras esperadas presentes en lo dicho/escrito */
export function similarity(expected: string, got: string) {
  const e = normalize(expected).split(" "); const g = new Set(normalize(got).split(" "));
  return Math.round((e.filter((w) => g.has(w)).length / e.length) * 100);
}

// Ampliación: más ejercicios por destreza (listen: respuesta correcta siempre en índice 0; se baraja al mostrar)
const L = (q: string, o: string[], why: string, level: string): MC => ({ q, options: o, answer: 0, why, level });
const S = (text: string, es: string, level: string): Say => ({ text, es, level });
const G = (q: string, options: string[], answer: number, why: string, level: string): MC => ({ q, options, answer, why, level });
const W = (es: string, answer: string, level: string) => ({ es, answer, level });

LANGS.en.listen.push(
  L("My sister is twelve years old.", ["12 años", "20 años", "2 años", "11 años"], "«Twelve» = 12.", "A1"),
  L("The museum is closed on Mondays.", ["Cierra los lunes", "Abre los lunes", "Cierra los domingos", "Siempre abre"], "«Closed on Mondays».", "A1"),
  L("Turn left at the traffic light and go straight.", ["Izquierda en el semáforo y recto", "Derecha en el semáforo", "Vuelta en U", "Detenerse"], "«Turn left… go straight».", "A2"),
  L("We need to finish the project by Friday.", ["Terminar antes del viernes", "Empezar el viernes", "Terminar el lunes", "No hay fecha"], "«By Friday» = a más tardar el viernes.", "A2"),
  L("The technician replaced the damaged cable.", ["Cambió el cable dañado", "Compró un cable", "Cortó la luz", "Reparó la pantalla"], "«Replaced» = reemplazó.", "B1"),
  L("Although it was expensive, they bought the tickets.", ["Compraron aunque era caro", "No compraron", "Era barato", "Los regalaron"], "«Although» = aunque.", "B2"),
);
LANGS.en.speak.push(
  S("What time is it?", "¿Qué hora es?", "A1"),
  S("I would like a glass of water.", "Quisiera un vaso de agua.", "A1"),
  S("How much does this cost?", "¿Cuánto cuesta esto?", "A2"),
  S("I am going to study engineering.", "Voy a estudiar ingeniería.", "A2"),
  S("In my opinion, practice is the key to success.", "En mi opinión, la práctica es la clave del éxito.", "B1"),
);
LANGS.en.grammar.push(
  G("There ___ three books on the table.", ["is", "are", "be", "am"], 1, "Plural: there are.", "A1"),
  G("He is ___ than his brother.", ["tall", "taller", "tallest", "more tall"], 1, "Comparativo corto: taller.", "A2"),
  G("I ___ my homework right now.", ["do", "did", "am doing", "done"], 2, "Presente continuo: am doing.", "A1"),
  G("You ___ wear a helmet on a motorcycle.", ["must", "can't", "mustn't to", "musts"], 0, "Obligación: must.", "A2"),
  G("By the time we arrived, the class ___.", ["started", "had started", "has started", "starts"], 1, "Pasado perfecto: had started.", "B2"),
  G("She asked me where I ___.", ["live", "lived", "am living", "lives"], 1, "Estilo indirecto: retrocede a lived.", "B2"),
);
LANGS.en.write.push(
  W("Me gusta leer.", "I like to read", "A1"),
  W("Hace calor hoy.", "It is hot today", "A1"),
  W("Mañana voy a estudiar.", "Tomorrow I am going to study", "A2"),
  W("Ellos están en la escuela.", "They are at school", "A1"),
  W("He terminado mi tarea.", "I have finished my homework", "B1"),
);

LANGS.fr.listen.push(
  L("J'ai quinze ans.", ["15 años", "50 años", "5 años", "14 años"], "«Quinze» = 15.", "A1"),
  L("Il fait froid aujourd'hui.", ["Hace frío hoy", "Hace calor", "Llueve", "Hace viento"], "«Il fait froid».", "A1"),
  L("Le magasin ouvre à neuf heures et demie.", ["9:30", "9:00", "10:30", "19:30"], "«Neuf heures et demie» = 9:30.", "A2"),
  L("Prenez la deuxième rue à droite.", ["Segunda calle a la derecha", "Primera a la izquierda", "Segunda a la izquierda", "Siga recto"], "«Deuxième… à droite».", "A2"),
  L("Nous avons fini le travail hier soir.", ["Terminaron anoche", "Terminan mañana", "Empiezan hoy", "No terminaron"], "Passé composé: avons fini.", "B1"),
  L("Bien qu'il soit fatigué, il continue à étudier.", ["Sigue estudiando aunque está cansado", "Deja de estudiar", "No está cansado", "Duerme"], "«Bien que» = aunque.", "B2"),
);
LANGS.fr.speak.push(
  S("Quelle heure est-il ?", "¿Qué hora es?", "A1"),
  S("Merci beaucoup.", "Muchas gracias.", "A1"),
  S("Combien ça coûte ?", "¿Cuánto cuesta?", "A2"),
  S("Je voudrais apprendre le français.", "Quisiera aprender francés.", "A2"),
  S("À mon avis, il faut pratiquer tous les jours.", "En mi opinión, hay que practicar todos los días.", "B1"),
);
LANGS.fr.grammar.push(
  G("Ils ___ au parc.", ["va", "vont", "allons", "allez"], 1, "Ils → vont.", "A1"),
  G("J'aime ___ pommes.", ["le", "la", "les", "un"], 2, "Plural: les.", "A1"),
  G("Hier, j'___ mangé une pizza.", ["ai", "suis", "as", "est"], 0, "Manger usa avoir: j'ai mangé.", "A2"),
  G("Elle est ___ grande que sa sœur.", ["plus", "très", "trop", "beaucoup"], 0, "Comparativo: plus … que.", "A2"),
  G("Si j'avais le temps, je ___ voyager.", ["vais", "voudrais", "veux", "voulais"], 1, "Condicional: voudrais.", "B1"),
  G("Il faut que tu ___ tes devoirs.", ["fais", "fasses", "feras", "faisais"], 1, "Subjuntivo tras «il faut que».", "B2"),
);
LANGS.fr.write.push(
  W("Me gusta la música.", "J'aime la musique", "A1"),
  W("Ella es mi amiga.", "Elle est mon amie", "A1"),
  W("Vivimos en Costa Rica.", "Nous habitons au Costa Rica", "A2"),
  W("¿Dónde está la escuela?", "Où est l'école", "A1"),
  W("Mañana voy a estudiar.", "Demain je vais étudier", "A2"),
);

LANGS.pt.listen.push(
  L("Tenho quatorze anos.", ["14 años", "40 años", "4 años", "13 años"], "«Quatorze» = 14.", "A1"),
  L("Hoje está muito quente.", ["Hoy hace mucho calor", "Hace frío", "Llueve", "Está nublado"], "«Quente» = caliente.", "A1"),
  L("A aula começa às oito e meia.", ["8:30", "8:00", "18:30", "9:30"], "«Oito e meia» = 8:30.", "A2"),
  L("Vire à direita depois da farmácia.", ["Derecha después de la farmacia", "Izquierda antes", "Recto", "Detrás de la farmacia"], "«Vire à direita».", "A2"),
  L("Nós terminamos o trabalho ontem à noite.", ["Terminaron anoche", "Terminan mañana", "Empiezan hoy", "No terminaron"], "«Ontem à noite» = anoche.", "B1"),
  L("Embora estivesse cansado, ele continuou estudando.", ["Siguió estudiando aunque estaba cansado", "Dejó de estudiar", "No estaba cansado", "Se durmió"], "«Embora» = aunque.", "B2"),
);
LANGS.pt.speak.push(
  S("Que horas são?", "¿Qué hora es?", "A1"),
  S("Muito obrigado.", "Muchas gracias.", "A1"),
  S("Quanto custa isso?", "¿Cuánto cuesta esto?", "A2"),
  S("Eu gostaria de aprender português.", "Quisiera aprender portugués.", "A2"),
  S("Na minha opinião, praticar todos os dias é importante.", "En mi opinión, practicar todos los días es importante.", "B1"),
);
LANGS.pt.grammar.push(
  G("Eles ___ na escola.", ["está", "estão", "estou", "estamos"], 1, "Eles → estão.", "A1"),
  G("Eu ___ café todas as manhãs.", ["bebo", "bebe", "bebem", "bebemos"], 0, "Eu → bebo.", "A1"),
  G("Ela é ___ alta que o irmão.", ["mais", "muito", "tão", "menos de"], 0, "Comparativo: mais … que.", "A2"),
  G("Amanhã nós ___ à praia.", ["iremos", "fomos", "íamos", "vamos ir"], 0, "Futuro do presente: iremos.", "A2"),
  G("Se eu tivesse tempo, ___ mais.", ["viajaria", "viajo", "viajei", "viajarei"], 0, "Condicional: viajaria.", "B1"),
  G("Espero que você ___ bem.", ["está", "esteja", "estava", "estará"], 1, "Subjuntivo tras «espero que».", "B2"),
);
LANGS.pt.write.push(
  W("Me gusta leer.", "Eu gosto de ler", "A1"),
  W("Buenas noches.", "Boa noite", "A1"),
  W("Ella es mi hermana.", "Ela é minha irmã", "A1"),
  W("Vivimos en Costa Rica.", "Nós moramos na Costa Rica", "A2"),
  W("Mañana voy a estudiar.", "Amanhã eu vou estudar", "A2"),
);

// Progressive B2 → C1 English set (original items).
LANGS.en.grammar.push(
  G("If I ___ about the delay, I would have called you.", ["knew", "had known", "have known", "would know"], 1, "Tercer condicional: had known.", "B2"),
  G("The bridge is thought ___ in 1950.", ["to build", "to have been built", "being built", "built"], 1, "Pasiva impersonal en pasado: to have been built.", "B2"),
  G("Hardly ___ the meeting started when the power went out.", ["had", "has", "did", "was"], 0, "Inversión tras «hardly»: had.", "C1"),
  G("I'd rather you ___ the results until Friday.", ["don't share", "didn't share", "not share", "won't share"], 1, "«Would rather» + sujeto + pasado: didn't share.", "C1"),
  G("Not only ___ the deadline, but she also improved the design.", ["she met", "did she meet", "she did meet", "met she"], 1, "Inversión con «not only»: did she meet.", "C1"),
  G("The proposal, ___ was approved yesterday, will cut costs.", ["that", "which", "what", "who"], 1, "Relativa explicativa con coma: which.", "B2"),
);
LANGS.en.listen.push(
  L("Had we left earlier, we would have caught the train.", ["Salieron tarde y perdieron el tren", "Tomaron el tren", "Salieron temprano", "No había tren"], "Condicional invertido: no salieron temprano.", "C1"),
  L("The findings are, to say the least, inconclusive.", ["Los resultados no son concluyentes", "Los resultados son claros", "No hubo resultados", "Son definitivos"], "«To say the least» suaviza: poco concluyentes.", "C1"),
);
LANGS.en.write.push(
  W("De haberlo sabido, habría venido.", "Had I known, I would have come", "C1"),
  W("El informe debe entregarse antes del lunes.", "The report must be submitted by Monday", "B2"),
);
