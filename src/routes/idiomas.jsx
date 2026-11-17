import { createFileRoute,Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { LevelTest } from "@/components/LevelTest";
import { Button } from '@/components/ui/button';

export const Route = createFileRoute("/idiomas")({staticData:{sitemap:true},
  head: () => ({ meta: [
    { title: "Seis idiomas: gramática, listening, pronunciación y escritura · pracTICAtecnica.com" },
    { name: "description", content: "Resúmenes por nivel A1–B1 con ejemplos y práctica de pronunciación, listening, grammar y writing en inglés y francés." },
    { property: "og:title", content: "Idiomas · pracTICAtecnica.com" },
    { property: "og:description", content: "Escuche, repita, escriba y practique gramática en inglés y francés." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Idiomas,
});

type LangKey = "en" | "fr" | "de" | "pt" | "es" | "zh";
type Unit = { level: string; topic: string; summary: string; examples: string[]; grammar: { q: string; opts: string[]; a: number }; listen: string; write: { prompt: string; answer: string } };
const DATA: Record<LangKey, { name: string; voice: string; units: Unit[] }> = {
  en: { name: "🇬🇧 English", voice: "en-US", units: [
    { level: "A1 · Primaria", topic: "Verb to be", summary: "Use am with I, is with he/she/it, are with you/we/they.", examples: ["I am ten years old.", "She is my sister.", "They are students."], grammar: { q: "We ___ from Costa Rica.", opts: ["is", "are", "am"], a: 1 }, listen: "My favorite color is blue.", write: { prompt: "Translate: «Él es mi amigo».", answer: "he is my friend" } },
    { level: "A2 · 7.º–9.º", topic: "Past simple", summary: "Regular verbs add -ed; irregular verbs change (go → went).", examples: ["I visited Cartago last year.", "We went to the beach."], grammar: { q: "Yesterday she ___ to school.", opts: ["go", "goes", "went"], a: 2 }, listen: "Last weekend I played soccer with my friends.", write: { prompt: "Past of «eat»", answer: "ate" } },
    { level: "B1 · 10.º–11.º", topic: "First conditional", summary: "If + present, will + verb: real future possibilities.", examples: ["If it rains, we will stay home.", "If you study, you will pass."], grammar: { q: "If you practice, you ___ improve.", opts: ["will", "would", "did"], a: 0 }, listen: "If I finish my homework, I will watch a movie.", write: { prompt: "Complete: If he runs, he ___ win.", answer: "will" } },
    { level: "A1 · Primaria", topic: "Numbers and colors", summary: "Learn numbers 1–20 and basic colors.", examples: ["I have twelve pencils.", "The sky is blue."], grammar: { q: "The banana ___ yellow.", opts: ["are", "is", "am"], a: 1 }, listen: "I have three red apples.", write: { prompt: "Write the number 15 in English", answer: "fifteen" } },
    { level: "A2 · 7.º–9.º", topic: "Present continuous", summary: "am/is/are + verb-ing for actions happening now.", examples: ["She is reading a book.", "We are studying English."], grammar: { q: "They ___ playing soccer now.", opts: ["is", "are", "am"], a: 1 }, listen: "My brother is cooking dinner right now.", write: { prompt: "Complete: I am ___ (write) a letter.", answer: "writing" } },
    { level: "A1 · Primaria", topic: "Have / has", summary: "I/you/we/they have; he/she/it has.", examples: ["I have a dog.", "She has two brothers."], grammar: { q: "He ___ a new bike.", opts: ["have", "has", "having"], a: 1 }, listen: "My mother has a small garden.", write: { prompt: "Complete: They ___ a car.", answer: "have" } },
    { level: "A1 · Primaria", topic: "Present simple: do / does", summary: "Preguntas y negaciones: do (I/you/we/they), does (he/she/it) + verbo base.", examples: ["Do you like rice?", "She doesn't play soccer."], grammar: { q: "___ he speak English?", opts: ["Do", "Does", "Did"], a: 1 }, listen: "Does your school have a library?", write: { prompt: "Negativo: She plays → She ___ play.", answer: "doesn't" } },
    { level: "A2 · 7.º–9.º", topic: "Past simple: did / didn't", summary: "Preguntas y negaciones en pasado: did + verbo base (no went, sino go).", examples: ["Did you study?", "We didn't go to the beach."], grammar: { q: "Did she ___ the homework?", opts: ["finished", "finish", "finishes"], a: 1 }, listen: "Did you watch the game last night?", write: { prompt: "Negativo: I went → I didn't ___.", answer: "go" } },
    { level: "B1 · 10.º–11.º", topic: "Present perfect: have / has + participio", summary: "Experiencias o acciones con efecto en el presente.", examples: ["I have visited Arenal.", "She has finished her project."], grammar: { q: "They ___ already eaten.", opts: ["has", "have", "did"], a: 1 }, listen: "I have never seen a volcano erupt.", write: { prompt: "Participio de «write»", answer: "written" } },
    { level: "B2", topic: "Past perfect: had + participio", summary: "Acción anterior a otra en el pasado.", examples: ["When I arrived, the bus had left.", "She had studied before the test."], grammar: { q: "By 8 p.m. we ___ finished.", opts: ["had", "have", "did"], a: 0 }, listen: "The class had started when I got there.", write: { prompt: "Complete: He ___ (had) eaten before.", answer: "had" } },
    { level: "A2 · 7.º–9.º", topic: "Comparatives and superlatives", summary: "-er/-est para palabras cortas; more/most para largas.", examples: ["Chirripó is higher than Irazú.", "This is the most interesting book."], grammar: { q: "My house is ___ than yours.", opts: ["big", "bigger", "biggest"], a: 1 }, listen: "Costa Rica is smaller than Nicaragua.", write: { prompt: "Superlativo de «good»", answer: "best" } },
    { level: "B1 · 10.º–11.º", topic: "Passive voice", summary: "be + participio: el foco está en la acción, no en quien la hace.", examples: ["Coffee is grown in Tarrazú.", "The bridge was built in 2010."], grammar: { q: "The emails ___ sent yesterday.", opts: ["was", "were", "are"], a: 1 }, listen: "The new school was opened by the community.", write: { prompt: "Pasiva: They clean the room → The room ___ cleaned.", answer: "is" } },
  ]},
  fr: { name: "🇫🇷 Français", voice: "fr-FR", units: [
    { level: "A1", topic: "Le verbe être", summary: "Je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont.", examples: ["Je suis étudiant.", "Elle est costaricienne."], grammar: { q: "Nous ___ amis.", opts: ["sommes", "êtes", "sont"], a: 0 }, listen: "Bonjour, je m'appelle Ana.", write: { prompt: "Traduzca: «Yo soy estudiante».", answer: "je suis étudiant" } },
    { level: "A1", topic: "Les articles", summary: "Le (masculin), la (féminin), les (pluriel).", examples: ["le livre", "la table", "les enfants"], grammar: { q: "___ maison est grande.", opts: ["Le", "La", "Les"], a: 1 }, listen: "Le chat est sur la table.", write: { prompt: "Artículo para «livre»", answer: "le" } },
    { level: "A2", topic: "Le passé composé", summary: "Avoir/être + participe passé.", examples: ["J'ai mangé.", "Elle est allée à l'école."], grammar: { q: "Hier, j'___ mangé une pomme.", opts: ["ai", "suis", "as"], a: 0 }, listen: "Hier, nous avons visité le musée.", write: { prompt: "Complete: Tu ___ fini? (avoir)", answer: "as" } },
    { level: "A1", topic: "Les nombres et les couleurs", summary: "Un, deux, trois… rouge, bleu, vert.", examples: ["J'ai deux livres.", "La voiture est rouge."], grammar: { q: "Le ciel ___ bleu.", opts: ["est", "es", "sont"], a: 0 }, listen: "J'ai trois pommes vertes.", write: { prompt: "Escriba «tres» en francés", answer: "trois" } },
    { level: "A2", topic: "Le futur proche", summary: "aller + infinitif para planes cercanos.", examples: ["Je vais étudier.", "Nous allons voyager."], grammar: { q: "Demain, elle ___ travailler.", opts: ["va", "vas", "vont"], a: 0 }, listen: "Ce soir, nous allons regarder un film.", write: { prompt: "Complete: Je ___ manger. (aller)", answer: "vais" } },
    { level: "B1", topic: "L'imparfait", summary: "Hábitos y descripciones en el pasado: -ais, -ait, -ions.", examples: ["Quand j'étais petit, je jouais au foot.", "Il faisait beau."], grammar: { q: "Avant, nous ___ à la plage.", opts: ["allions", "allons", "irons"], a: 0 }, listen: "Quand j'étais enfant, j'habitais à Heredia.", write: { prompt: "Imparfait de «être» (je)", answer: "étais" } },
  ]},
  de: { name: "🇩🇪 Deutsch", voice: "de-DE", units: [
    { level: "A1", topic: "Das Verb sein", summary: "ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie sind.", examples: ["Ich bin Schüler.", "Sie ist Lehrerin."], grammar: { q: "Wir ___ Freunde.", opts: ["sind", "seid", "ist"], a: 0 }, listen: "Guten Morgen, ich heiße Ana.", write: { prompt: "Traduzca: «Yo soy estudiante» (Schüler).", answer: "ich bin schüler" } },
    { level: "A1", topic: "Artikel: der, die, das", summary: "der (masculino), die (femenino), das (neutro).", examples: ["der Tisch", "die Schule", "das Buch"], grammar: { q: "___ Buch ist neu.", opts: ["Der", "Die", "Das"], a: 2 }, listen: "Die Schule ist groß.", write: { prompt: "Artículo de «Schule»", answer: "die" } },
    { level: "A1", topic: "Zahlen und Farben", summary: "eins, zwei, drei… rot, blau, grün.", examples: ["Ich habe zwei Bücher.", "Das Auto ist rot."], grammar: { q: "Der Himmel ist ___.", opts: ["blau", "blaue", "blauen"], a: 0 }, listen: "Ich habe drei grüne Äpfel.", write: { prompt: "Escriba «tres» en alemán", answer: "drei" } },
    { level: "A2", topic: "Perfekt mit haben", summary: "haben + Partizip II al final: Ich habe gelernt.", examples: ["Ich habe Deutsch gelernt.", "Wir haben Fußball gespielt."], grammar: { q: "Gestern ___ ich Pizza gegessen.", opts: ["habe", "bin", "hat"], a: 0 }, listen: "Am Wochenende habe ich meine Oma besucht.", write: { prompt: "Partizip II de «machen»", answer: "gemacht" } },
    { level: "B1", topic: "Konjunktiv II", summary: "würde + Infinitiv para deseos y cortesía.", examples: ["Ich würde gern reisen.", "Könnten Sie mir helfen?"], grammar: { q: "Wenn ich Zeit hätte, ___ ich lesen.", opts: ["würde", "werde", "wurde"], a: 0 }, listen: "Ich würde gern nach Berlin fahren.", write: { prompt: "Complete: Ich ___ gern kommen. (würde)", answer: "würde" } },
  ]},
  pt: { name: "🇧🇷 Português", voice: "pt-BR", units: [
    { level: "A1", topic: "Ser e estar", summary: "Ser = características permanentes; estar = estados temporais.", examples: ["Eu sou costarriquenho.", "Ela está cansada."], grammar: { q: "Nós ___ estudantes.", opts: ["somos", "estamos", "são"], a: 0 }, listen: "Bom dia, eu sou a Ana.", write: { prompt: "Traduzca: «Él está feliz».", answer: "ele está feliz" } },
    { level: "A2", topic: "Pretérito perfeito", summary: "Ações concluídas no passado: falei, comi, parti.", examples: ["Ontem eu estudei.", "Nós comemos arroz."], grammar: { q: "Ontem ela ___ ao cinema.", opts: ["foi", "vai", "ia"], a: 0 }, listen: "No sábado nós visitamos a praia.", write: { prompt: "Pasado de «falar» (eu)", answer: "falei" } },
    { level: "B1", topic: "Futuro do subjuntivo", summary: "Quando/se + futuro do subjuntivo: quando eu tiver tempo…", examples: ["Se você estudar, vai passar.", "Quando eu chegar, ligo."], grammar: { q: "Se você ___, vai aprender.", opts: ["praticar", "pratica", "praticou"], a: 0 }, listen: "Quando eu terminar o curso, vou trabalhar.", write: { prompt: "Complete: Quando eu ___ (ter) tempo…", answer: "tiver" } },
    { level: "A1", topic: "Números e cores", summary: "um, dois, três… vermelho, azul, verde.", examples: ["Eu tenho dois livros.", "O carro é azul."], grammar: { q: "O céu ___ azul.", opts: ["é", "são", "estão"], a: 0 }, listen: "Eu tenho três maçãs verdes.", write: { prompt: "Escriba «diez» en portugués", answer: "dez" } },
  ]},
  es: { name: "🇨🇷 Español", voice: "es-CR", units: [
    { level: "A2", topic: "Tildes: agudas, graves y esdrújulas", summary: "Agudas llevan tilde si terminan en n, s o vocal; esdrújulas siempre.", examples: ["canción", "árbol", "matemática"], grammar: { q: "¿Cuál está bien escrita?", opts: ["camión", "camion", "cámion"], a: 0 }, listen: "El camión llegó a la estación.", write: { prompt: "Escriba con tilde: «pajaro»", answer: "pájaro" } },
    { level: "B1", topic: "Hace / a / ha", summary: "Hace = tiempo transcurrido; ha = verbo haber; a = preposición.", examples: ["Hace dos años viajé.", "Ella ha estudiado.", "Voy a Cartago."], grammar: { q: "Ella ___ terminado la tarea.", opts: ["ha", "a", "hace"], a: 0 }, listen: "Hace tres días fui a San José.", write: { prompt: "Complete: Voy ___ la escuela.", answer: "a" } },
    { level: "B2", topic: "Prefijos des- y dis-", summary: "des- niega o invierte (deshacer); dis- indica separación o dificultad (discordia).", examples: ["deshacer", "desconectar", "disgusto"], grammar: { q: "Lo contrario de «conectar»:", opts: ["desconectar", "disconectar", "inconectar"], a: 0 }, listen: "Debe desconectar el equipo antes de repararlo.", write: { prompt: "Lo contrario de «hacer»", answer: "deshacer" } },
    { level: "B1", topic: "Haber / a ver", summary: "Haber = verbo o sustantivo; a ver = preposición + ver.", examples: ["Debe haber una solución.", "Vamos a ver la película."], grammar: { q: "Vamos ___ qué pasó.", opts: ["a ver", "haber", "aver"], a: 0 }, listen: "Va a haber reunión mañana.", write: { prompt: "Complete: Puede ___ problemas. (haber/a ver)", answer: "haber" } },
  ]},
  zh: { name: "🇨🇳 中文", voice: "zh-CN", units: [
    { level: "A1", topic: "Saludos · 你好 (nǐ hǎo)", summary: "Saludos básicos con pinyin y tonos.", examples: ["你好 nǐ hǎo · hola", "谢谢 xièxie · gracias", "再见 zàijiàn · adiós"], grammar: { q: "«Gracias» en chino es:", opts: ["谢谢 xièxie", "你好 nǐ hǎo", "再见 zàijiàn"], a: 0 }, listen: "你好，我叫安娜。", write: { prompt: "Pinyin de 你好 (sin tonos)", answer: "ni hao" } },
    { level: "A1", topic: "Ser · 是 (shì)", summary: "Sujeto + 是 + sustantivo: 我是学生 (soy estudiante).", examples: ["我是学生 wǒ shì xuéshēng", "他是老师 tā shì lǎoshī"], grammar: { q: "我 ___ 学生。", opts: ["是 shì", "有 yǒu", "在 zài"], a: 0 }, listen: "我是哥斯达黎加人。", write: { prompt: "Pinyin de 是 (sin tono)", answer: "shi" } },
    { level: "A2", topic: "Números · 一 二 三", summary: "一 yī, 二 èr, 三 sān, 四 sì, 五 wǔ, 十 shí.", examples: ["三本书 sān běn shū · tres libros", "十个人 shí gè rén · diez personas"], grammar: { q: "¿Cuál es «cinco»?", opts: ["五 wǔ", "四 sì", "十 shí"], a: 0 }, listen: "我有三本书。", write: { prompt: "Pinyin de 十 (sin tono)", answer: "shi" } },
    { level: "A2", topic: "Tener · 有 (yǒu)", summary: "Sujeto + 有 + objeto; negación 没有 (méiyǒu).", examples: ["我有一个哥哥 · tengo un hermano mayor", "他没有车 · él no tiene carro"], grammar: { q: "我 ___ 两本书。", opts: ["有 yǒu", "是 shì", "去 qù"], a: 0 }, listen: "我有一只猫。", write: { prompt: "Pinyin de 有 (sin tono)", answer: "you" } },
  ]},
};

function speak(text: string, voice: string) {
  const u = new SpeechSynthesisUtterance(text); u.lang = voice; u.rate = 0.9; speechSynthesis.cancel(); speechSynthesis.speak(u);
}

function Idiomas() {
  const [lang, setLang] = useState<LangKey>("en");
  const L = DATA[lang];
  return (
    <main className="min-h-screen bg-hero">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-5 pb-16">
        <h1 className="mt-6 text-4xl font-black md:text-5xl">🗣️ Idiomas</h1>
        <Button className="mt-4" asChild><Link to="/practicas-idiomas">Prácticas contextuales · Seis idiomas A1–C1</Link></Button>
        <Button className="mt-4 ml-2" variant="outline" asChild><Link to="/practica-sin-repeticion">Gramática variable · English / Français / Português</Link></Button>
        <p className="mt-2 text-muted-foreground">Resumen, ejemplos, gramática, escucha, pronunciación y escritura por nivel.</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {(["en", "fr", "de", "pt", "es", "zh"] as const).map((k) => (
            <button key={k} onClick={() => setLang(k)} className={`rounded-full border px-5 py-2 font-bold ${lang === k ? "bg-primary text-primary-foreground" : "bg-card"}`}>{DATA[k].name}</button>
          ))}
        </div>
        <div className="mt-6 grid gap-5">
          {L.units.map((u) => <UnitCard key={lang + u.topic} u={u} voice={L.voice} />)}
        </div>
        {lang === "en" && <div className="mt-8 grid gap-5 md:grid-cols-2"><LevelTest level="B2" /><LevelTest level="C1" /></div>}
      </section>
    </main>
  );
}

function UnitCard({ u, voice }: { u: Unit; voice: string }) {
  const [pick, setPick] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [heard, setHeard] = useState("");
  const [typed, setTyped] = useState("");
  const [checkW, setCheckW] = useState(false);
  const norm = (s: string) => s.toLowerCase().replace(/[.,!?¿¡'’]/g, "").replace(/\s+/g, " ").trim();
  const listenMic = () => {
    const SR = (window as unknown as { SpeechRecognition?: new () => any; webkitSpeechRecognition?: new () => any });
    const C = SR.SpeechRecognition ?? SR.webkitSpeechRecognition;
    if (!C) { setHeard("Su navegador no permite reconocimiento de voz. Pruebe con Chrome."); return; }
    const r = new C(); r.lang = voice; r.onresult = (e: any) => setHeard(e.results[0][0].transcript); r.start();
  };
  return (
    <article className="rounded-2xl border bg-card p-6 shadow-card">
      <p className="text-xs font-bold text-accent">{u.level}</p>
      <h2 className="text-2xl font-black">{u.topic}</h2>
      <p className="mt-2 text-sm">{u.summary}</p>
      <ul className="mt-2 flex flex-wrap gap-2">{u.examples.map((x) => (
        <li key={x}><button onClick={() => speak(x, voice)} className="rounded-full border px-3 py-1 text-sm hover:border-primary">🔊 {x}</button></li>
      ))}</ul>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-muted p-4">
          <h3 className="font-bold">✍️ Grammar</h3>
          <p className="mt-1 text-sm">{u.grammar.q}</p>
          <div className="mt-2 flex flex-wrap gap-2">{u.grammar.opts.map((o, i) => (
            <button key={o} disabled={confirmed} onClick={() => setPick(i)} className={`rounded-full border px-3 py-1 text-sm ${pick === i ? "border-primary bg-primary text-primary-foreground" : ""}`}>{o}</button>
          ))}</div>
          {pick !== null && !confirmed && <button onClick={() => setConfirmed(true)} className="mt-2 text-sm font-bold text-primary underline">Confirmar respuesta</button>}
          {confirmed && <p className="mt-2 text-sm font-bold">{pick === u.grammar.a ? "✅ ¡Correcto!" : `❌ Correcta: ${u.grammar.opts[u.grammar.a]}`}</p>}
        </div>
        <div className="rounded-xl bg-muted p-4">
          <h3 className="font-bold">🎧 Listening + 🎤 Pronunciation</h3>
          <button onClick={() => speak(u.listen, voice)} className="mt-2 rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">▶ Escuchar</button>
          <button onClick={listenMic} className="ml-2 mt-2 rounded-full border px-3 py-1 text-sm font-bold">🎤 Repetir</button>
          {heard && <p className="mt-2 text-sm">Escuchamos: «{heard}» {norm(heard) === norm(u.listen) ? "✅ ¡Excelente!" : "· Intente de nuevo"}</p>}
          <details className="mt-2 text-xs"><summary>Ver texto</summary>{u.listen}</details>
        </div>
        <div className="rounded-xl bg-muted p-4">
          <h3 className="font-bold">📝 Writing</h3>
          <p className="mt-1 text-sm">{u.write.prompt}</p>
          <input value={typed} onChange={(e) => { setTyped(e.target.value); setCheckW(false); }} className="mt-2 w-full rounded-lg border bg-background px-3 py-1 text-sm" />
          <button onClick={() => setCheckW(true)} className="mt-2 text-sm font-bold text-primary underline">Revisar</button>
          {checkW && <p className="mt-1 text-sm font-bold">{norm(typed) === norm(u.write.answer) ? "✅ ¡Correcto!" : `Respuesta: ${u.write.answer}`}</p>}
        </div>
      </div>
    </article>
  );
}
