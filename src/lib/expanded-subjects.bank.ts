import type { Deck } from './questions';
import { supportDecks } from './support-ti.bank';
import { sportsDecks } from './sports.bank';
import { socialDecks } from './social.bank';
import { physicsDecks } from './physics.bank';
export const expandedSubjectDecks: Deck[] = [
  {
    "id": "study-english-b1-v1",
    "title": "Inglés · Bloque 1 · Presente y vocabulario",
    "emoji": "🌍",
    "level": "Preparación independiente · 20 preguntas originales; no examen oficial",
    "questions": [
      {
        "q": "The technician ___ the devices every morning.",
        "options": [
          "checks",
          "check",
          "checking",
          "checked"
        ],
        "answer": 0,
        "why": "He/she/it takes -s in the present simple.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 1
      },
      {
        "q": "Right now, the team ___ the router.",
        "options": [
          "is configuring",
          "configure",
          "configured",
          "has configure"
        ],
        "answer": 0,
        "why": "Right now signals a current action: is + verb-ing.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 1
      },
      {
        "q": "I ___ a backup every Friday.",
        "options": [
          "make",
          "makes",
          "am make",
          "made"
        ],
        "answer": 0,
        "why": "I uses the base form in the present simple.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 1
      },
      {
        "q": "The two students ___ the manual now.",
        "options": [
          "are reading",
          "is reading",
          "reads",
          "readed"
        ],
        "answer": 0,
        "why": "Plural subject: are + reading.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 1
      },
      {
        "q": "She ___ work on Sundays.",
        "options": [
          "does not",
          "do not",
          "is not",
          "has not"
        ],
        "answer": 0,
        "why": "Present simple negative: does not + base verb.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 1
      },
      {
        "q": "___ you need a receipt?",
        "options": [
          "Do",
          "Does",
          "Are",
          "Have"
        ],
        "answer": 0,
        "why": "A present simple question with you starts with Do.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 1
      },
      {
        "q": "Listen! The supervisor ___ the task.",
        "options": [
          "is explaining",
          "explains yesterday",
          "explain",
          "has explain"
        ],
        "answer": 0,
        "why": "Listen points to an action happening now.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 1
      },
      {
        "q": "A device that connects networks is a ___.",
        "options": [
          "router",
          "receipt",
          "drawer",
          "salary"
        ],
        "answer": 0,
        "why": "Router connects networks; receipt is proof of payment.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 1
      },
      {
        "q": "Keep a second copy of your files: create a ___.",
        "options": [
          "backup",
          "invoice",
          "deadline",
          "expense"
        ],
        "answer": 0,
        "why": "Backup means a copy used for recovery.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 1
      },
      {
        "q": "The last day to submit a report is the ___.",
        "options": [
          "deadline",
          "warehouse",
          "revenue",
          "keyboard"
        ],
        "answer": 0,
        "why": "Deadline is the latest submission time.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 1
      },
      {
        "q": "The amount paid to an employee for work is a ___.",
        "options": [
          "salary",
          "supplier",
          "asset",
          "browser"
        ],
        "answer": 0,
        "why": "Salary is compensation for work.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 1
      },
      {
        "q": "A company that provides goods is a ___.",
        "options": [
          "supplier",
          "customer",
          "password",
          "liability"
        ],
        "answer": 0,
        "why": "Supplier provides; customer buys.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 1
      },
      {
        "q": "An amount the business spends is an ___.",
        "options": [
          "expense",
          "income",
          "equity",
          "attachment"
        ],
        "answer": 0,
        "why": "Expense is a cost incurred by the business.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 1
      },
      {
        "q": "A document requesting payment is an ___.",
        "options": [
          "invoice",
          "employee",
          "network",
          "profit"
        ],
        "answer": 0,
        "why": "An invoice details amounts owed.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 1
      },
      {
        "q": "We ___ two laptops available today.",
        "options": [
          "have",
          "has",
          "having",
          "had yesterday"
        ],
        "answer": 0,
        "why": "We uses have to express possession in the present.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 1
      },
      {
        "q": "She ___ a valid access card.",
        "options": [
          "has",
          "have",
          "having",
          "is have"
        ],
        "answer": 0,
        "why": "Third-person singular uses has.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 1
      },
      {
        "q": "The opposite of increase is ___.",
        "options": [
          "decrease",
          "receive",
          "protect",
          "supply"
        ],
        "answer": 0,
        "why": "Decrease means become smaller.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 1
      },
      {
        "q": "To obtain a file from a server is to ___ it.",
        "options": [
          "download",
          "delete",
          "print",
          "owe"
        ],
        "answer": 0,
        "why": "Download transfers a file to your device.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 1
      },
      {
        "q": "Which sentence describes a habit?",
        "options": [
          "We check stock every Monday.",
          "We are checking stock right now.",
          "We checked stock yesterday.",
          "We will check stock tomorrow."
        ],
        "answer": 0,
        "why": "Every Monday signals a regular habit.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 1
      },
      {
        "q": "Choose the present continuous sentence.",
        "options": [
          "They are testing the app.",
          "They tests the app.",
          "They tested the app.",
          "They have test the app."
        ],
        "answer": 0,
        "why": "Present continuous: subject + are + testing.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 1
      }
    ]
  },
  {
    "id": "study-english-b2-v1",
    "title": "Inglés · Bloque 2 · Pasado y have / had",
    "emoji": "🌍",
    "level": "Preparación independiente · 20 preguntas originales; no examen oficial",
    "questions": [
      {
        "q": "Yesterday, we ___ the invoice.",
        "options": [
          "sent",
          "send",
          "sending",
          "sends"
        ],
        "answer": 0,
        "why": "Sent is the irregular past of send.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "Last week, she ___ the office.",
        "options": [
          "visited",
          "visit",
          "visiting",
          "visits"
        ],
        "answer": 0,
        "why": "A completed past action uses visited.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "The team ___ a meeting yesterday.",
        "options": [
          "had",
          "have",
          "has",
          "having"
        ],
        "answer": 0,
        "why": "Had is the past form of have.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "He ___ the report last night.",
        "options": [
          "did not finish",
          "does not finished",
          "did not finished",
          "not finishes"
        ],
        "answer": 0,
        "why": "After did not use the base form finish.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "___ they repair the printer yesterday?",
        "options": [
          "Did",
          "Do",
          "Does",
          "Are"
        ],
        "answer": 0,
        "why": "Past simple questions use Did + base verb.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "We have ___ the documents; they are ready now.",
        "options": [
          "checked",
          "check",
          "checking",
          "checks"
        ],
        "answer": 0,
        "why": "Have + past participle forms the present perfect.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "She has ___ the file.",
        "options": [
          "written",
          "wrote",
          "write",
          "writing"
        ],
        "answer": 0,
        "why": "Has needs the past participle written, not wrote.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "Before the meeting started, I had ___ the data.",
        "options": [
          "reviewed",
          "review",
          "reviewing",
          "reviews"
        ],
        "answer": 0,
        "why": "Had + past participle describes the earlier past event.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "I ___ a laptop now, but I ___ a desktop last year.",
        "options": [
          "have / had",
          "had / have",
          "has / had",
          "have / has"
        ],
        "answer": 0,
        "why": "Present possession: have; past possession: had.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "Choose the past simple sentence.",
        "options": [
          "We bought new equipment yesterday.",
          "We buy equipment every year.",
          "We are buying equipment.",
          "We have buy equipment."
        ],
        "answer": 0,
        "why": "Bought is the past form of buy.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "The past form of go is ___.",
        "options": [
          "went",
          "goed",
          "gone",
          "going"
        ],
        "answer": 0,
        "why": "Went is past simple; gone is a past participle.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "The past participle of see is ___.",
        "options": [
          "seen",
          "saw",
          "see",
          "seeing"
        ],
        "answer": 0,
        "why": "Have seen uses the participle seen.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "The past form of allow is ___.",
        "options": [
          "allowed",
          "allowd",
          "allowing",
          "allows"
        ],
        "answer": 0,
        "why": "A regular verb ends in -ed: allowed.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "The technician ___ the cable two hours ago.",
        "options": [
          "replaced",
          "replaces",
          "is replacing",
          "has replace"
        ],
        "answer": 0,
        "why": "Ago marks a completed past time.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "At 3 p.m. yesterday, we ___ the system.",
        "options": [
          "were testing",
          "are testing",
          "tests",
          "have test"
        ],
        "answer": 0,
        "why": "Past continuous: were + testing.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "She ___ the file when the power failed.",
        "options": [
          "was saving",
          "is saving",
          "were saving",
          "have saved"
        ],
        "answer": 0,
        "why": "Singular subject in past continuous uses was.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "Which sentence is correct?",
        "options": [
          "We had finished before the client arrived.",
          "We had finish before the client arrived.",
          "We have finished yesterday at noon.",
          "We has finished before the client arrived."
        ],
        "answer": 0,
        "why": "Had finished expresses completion before another past event.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "Choose the correct negative in the past.",
        "options": [
          "They did not have the key.",
          "They did not had the key.",
          "They does not have the key.",
          "They not had the key."
        ],
        "answer": 0,
        "why": "Did carries the past; have stays in the base form.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "How long ___ you had this account?",
        "options": [
          "have",
          "has",
          "did",
          "are"
        ],
        "answer": 0,
        "why": "You uses have; have had describes possession until now.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "By noon yesterday, the team had ___ three tests.",
        "options": [
          "completed",
          "complete",
          "completing",
          "completes"
        ],
        "answer": 0,
        "why": "Had requires a past participle: completed.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      }
    ]
  },
  {
    "id": "study-english-b3-v1",
    "title": "Inglés · Bloque 3 · Infinitivo y allow",
    "emoji": "🌍",
    "level": "Preparación independiente · 20 preguntas originales; no examen oficial",
    "questions": [
      {
        "q": "We need ___ the application.",
        "options": [
          "to update",
          "updating it to",
          "updated",
          "update to"
        ],
        "answer": 0,
        "why": "Need can be followed by a to-infinitive: to update.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "The manager allows us ___ from home.",
        "options": [
          "to work",
          "work",
          "working to",
          "worked"
        ],
        "answer": 0,
        "why": "Allow + object + to-infinitive.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "The policy does not allow ___ personal passwords.",
        "options": [
          "sharing",
          "to sharing",
          "shared",
          "share to"
        ],
        "answer": 0,
        "why": "With no object, allow may take a gerund: allow sharing.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "Let me ___ the results.",
        "options": [
          "check",
          "to check",
          "checking",
          "checked"
        ],
        "answer": 0,
        "why": "Let + object + bare infinitive.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "You must ___ your identity.",
        "options": [
          "verify",
          "to verify",
          "verified",
          "verifying"
        ],
        "answer": 0,
        "why": "A modal such as must takes the bare infinitive.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "She decided ___ a new course.",
        "options": [
          "to take",
          "taking to",
          "took",
          "take to"
        ],
        "answer": 0,
        "why": "Decide is followed by a to-infinitive.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "We enjoy ___ technical texts.",
        "options": [
          "reading",
          "to reading",
          "read",
          "reads"
        ],
        "answer": 0,
        "why": "Enjoy takes a gerund.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "The supervisor asked me ___ the report.",
        "options": [
          "to send",
          "sending",
          "sent",
          "send to"
        ],
        "answer": 0,
        "why": "Ask + object + to-infinitive.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "A firewall can ___ unwanted traffic.",
        "options": [
          "block",
          "to block",
          "blocking",
          "blocked"
        ],
        "answer": 0,
        "why": "Can takes a bare infinitive.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "The app helps users ___ their progress.",
        "options": [
          "track",
          "tracked",
          "tracking to",
          "tracks"
        ],
        "answer": 0,
        "why": "Help allows a bare infinitive (help users track).",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "A rule says visitors may enter. Which verb means permit?",
        "options": [
          "allow",
          "deny",
          "owe",
          "fail"
        ],
        "answer": 0,
        "why": "Allow means permit.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "The service does not allow employees ___ customer data publicly.",
        "options": [
          "to post",
          "post",
          "posted",
          "posting to"
        ],
        "answer": 0,
        "why": "With employees as object, use to post.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "Please remember ___ the file before closing the app.",
        "options": [
          "to save",
          "saved",
          "save to",
          "to saving"
        ],
        "answer": 0,
        "why": "Remember to do something is a reminder about a future action.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "I look forward to ___ from you.",
        "options": [
          "hearing",
          "hear",
          "heard",
          "to hear"
        ],
        "answer": 0,
        "why": "To is a preposition in look forward to, so use a gerund.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "To reduce risk, avoid ___ suspicious links.",
        "options": [
          "opening",
          "to opening",
          "opened",
          "open to"
        ],
        "answer": 0,
        "why": "Avoid takes a gerund.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "The company plans ___ its staff.",
        "options": [
          "to train",
          "training to",
          "trained",
          "train to"
        ],
        "answer": 0,
        "why": "Plan takes a to-infinitive.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "Choose the purpose clause.",
        "options": [
          "We save copies to prevent data loss.",
          "We save copies yesterday.",
          "We saves copies for prevent.",
          "We save copies to preventing."
        ],
        "answer": 0,
        "why": "To prevent states the purpose.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "Which sentence uses allow correctly?",
        "options": [
          "The teacher allows students to ask questions.",
          "The teacher allows students ask questions.",
          "The teacher allow students to asks questions.",
          "The teacher allows to students asking questions."
        ],
        "answer": 0,
        "why": "Allow + students + to ask.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "Choose the correct sentence with have to.",
        "options": [
          "We have to wear identification.",
          "We have wear identification.",
          "We has to wear identification.",
          "We have to wearing identification."
        ],
        "answer": 0,
        "why": "Have to + base verb expresses a requirement.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      },
      {
        "q": "Choose the correct sentence with had to.",
        "options": [
          "They had to restart the server.",
          "They had to restarted the server.",
          "They had restart the server.",
          "They has to restart yesterday."
        ],
        "answer": 0,
        "why": "Had to + base verb expresses a past requirement.",
        "source": "GICM. Ejercicio original. Referencia conceptual: British Council, LearnEnglish Grammar. https://learnenglish.britishcouncil.org/grammar",
        "difficulty": 2
      }
    ]
  },
  {
    "id": "study-math-b1-v1",
    "title": "Matemáticas · Bloque 1 · Operaciones y proporciones",
    "emoji": "📐",
    "level": "Preparación independiente · 20 preguntas originales; no examen oficial",
    "questions": [
      {
        "q": "Una biblioteca tiene 13 libros y recibe 3. ¿Cuántos tiene ahora?",
        "options": [
          "16",
          "10",
          "39",
          "17"
        ],
        "answer": 0,
        "why": "Sume los libros iniciales y nuevos: 13 + 3 = 16.",
        "source": "GICM. Original; operaciones básicas.",
        "difficulty": 1
      },
      {
        "q": "3 cajas contienen 13 piezas cada una. ¿Cuántas piezas hay?",
        "options": [
          "39",
          "16",
          "36",
          "52"
        ],
        "answer": 0,
        "why": "Multiplique 3 × 13 = 39.",
        "source": "GICM. Original; multiplicación.",
        "difficulty": 1
      },
      {
        "q": "Un rectángulo mide 13 cm de largo y 3 cm de ancho. ¿Cuál es su perímetro?",
        "options": [
          "32 cm",
          "39 cm",
          "16 cm",
          "29 cm"
        ],
        "answer": 0,
        "why": "Sume los cuatro lados: 2 × (13 + 3) = 32 cm. No confunda perímetro con área.",
        "source": "GICM. Original; geometría.",
        "difficulty": 2
      },
      {
        "q": "Resuelva x + 3 = 13. ¿Cuánto vale x?",
        "options": [
          "10",
          "16",
          "39",
          "11"
        ],
        "answer": 0,
        "why": "Reste 3 a ambos lados: x = 13 − 3 = 10.",
        "source": "GICM. Original; álgebra introductoria.",
        "difficulty": 2
      },
      {
        "q": "Una biblioteca tiene 16 libros y recibe 4. ¿Cuántos tiene ahora?",
        "options": [
          "20",
          "12",
          "64",
          "21"
        ],
        "answer": 0,
        "why": "Sume los libros iniciales y nuevos: 16 + 4 = 20.",
        "source": "GICM. Original; operaciones básicas.",
        "difficulty": 1
      },
      {
        "q": "4 cajas contienen 16 piezas cada una. ¿Cuántas piezas hay?",
        "options": [
          "64",
          "20",
          "60",
          "80"
        ],
        "answer": 0,
        "why": "Multiplique 4 × 16 = 64.",
        "source": "GICM. Original; multiplicación.",
        "difficulty": 1
      },
      {
        "q": "Un rectángulo mide 16 cm de largo y 4 cm de ancho. ¿Cuál es su perímetro?",
        "options": [
          "40 cm",
          "64 cm",
          "20 cm",
          "36 cm"
        ],
        "answer": 0,
        "why": "Sume los cuatro lados: 2 × (16 + 4) = 40 cm. No confunda perímetro con área.",
        "source": "GICM. Original; geometría.",
        "difficulty": 2
      },
      {
        "q": "Resuelva x + 4 = 16. ¿Cuánto vale x?",
        "options": [
          "12",
          "20",
          "64",
          "13"
        ],
        "answer": 0,
        "why": "Reste 4 a ambos lados: x = 16 − 4 = 12.",
        "source": "GICM. Original; álgebra introductoria.",
        "difficulty": 2
      },
      {
        "q": "Una biblioteca tiene 19 libros y recibe 5. ¿Cuántos tiene ahora?",
        "options": [
          "24",
          "14",
          "95",
          "25"
        ],
        "answer": 0,
        "why": "Sume los libros iniciales y nuevos: 19 + 5 = 24.",
        "source": "GICM. Original; operaciones básicas.",
        "difficulty": 1
      },
      {
        "q": "5 cajas contienen 19 piezas cada una. ¿Cuántas piezas hay?",
        "options": [
          "95",
          "24",
          "90",
          "114"
        ],
        "answer": 0,
        "why": "Multiplique 5 × 19 = 95.",
        "source": "GICM. Original; multiplicación.",
        "difficulty": 1
      },
      {
        "q": "Un rectángulo mide 19 cm de largo y 5 cm de ancho. ¿Cuál es su perímetro?",
        "options": [
          "48 cm",
          "95 cm",
          "24 cm",
          "43 cm"
        ],
        "answer": 0,
        "why": "Sume los cuatro lados: 2 × (19 + 5) = 48 cm. No confunda perímetro con área.",
        "source": "GICM. Original; geometría.",
        "difficulty": 2
      },
      {
        "q": "Resuelva x + 5 = 19. ¿Cuánto vale x?",
        "options": [
          "14",
          "24",
          "95",
          "15"
        ],
        "answer": 0,
        "why": "Reste 5 a ambos lados: x = 19 − 5 = 14.",
        "source": "GICM. Original; álgebra introductoria.",
        "difficulty": 2
      },
      {
        "q": "Una biblioteca tiene 22 libros y recibe 6. ¿Cuántos tiene ahora?",
        "options": [
          "28",
          "16",
          "132",
          "29"
        ],
        "answer": 0,
        "why": "Sume los libros iniciales y nuevos: 22 + 6 = 28.",
        "source": "GICM. Original; operaciones básicas.",
        "difficulty": 1
      },
      {
        "q": "6 cajas contienen 22 piezas cada una. ¿Cuántas piezas hay?",
        "options": [
          "132",
          "28",
          "126",
          "154"
        ],
        "answer": 0,
        "why": "Multiplique 6 × 22 = 132.",
        "source": "GICM. Original; multiplicación.",
        "difficulty": 1
      },
      {
        "q": "Un rectángulo mide 22 cm de largo y 6 cm de ancho. ¿Cuál es su perímetro?",
        "options": [
          "56 cm",
          "132 cm",
          "28 cm",
          "50 cm"
        ],
        "answer": 0,
        "why": "Sume los cuatro lados: 2 × (22 + 6) = 56 cm. No confunda perímetro con área.",
        "source": "GICM. Original; geometría.",
        "difficulty": 2
      },
      {
        "q": "Resuelva x + 6 = 22. ¿Cuánto vale x?",
        "options": [
          "16",
          "28",
          "132",
          "17"
        ],
        "answer": 0,
        "why": "Reste 6 a ambos lados: x = 22 − 6 = 16.",
        "source": "GICM. Original; álgebra introductoria.",
        "difficulty": 2
      },
      {
        "q": "Una biblioteca tiene 25 libros y recibe 7. ¿Cuántos tiene ahora?",
        "options": [
          "32",
          "18",
          "175",
          "33"
        ],
        "answer": 0,
        "why": "Sume los libros iniciales y nuevos: 25 + 7 = 32.",
        "source": "GICM. Original; operaciones básicas.",
        "difficulty": 1
      },
      {
        "q": "7 cajas contienen 25 piezas cada una. ¿Cuántas piezas hay?",
        "options": [
          "175",
          "32",
          "168",
          "200"
        ],
        "answer": 0,
        "why": "Multiplique 7 × 25 = 175.",
        "source": "GICM. Original; multiplicación.",
        "difficulty": 1
      },
      {
        "q": "Un rectángulo mide 25 cm de largo y 7 cm de ancho. ¿Cuál es su perímetro?",
        "options": [
          "64 cm",
          "175 cm",
          "32 cm",
          "57 cm"
        ],
        "answer": 0,
        "why": "Sume los cuatro lados: 2 × (25 + 7) = 64 cm. No confunda perímetro con área.",
        "source": "GICM. Original; geometría.",
        "difficulty": 2
      },
      {
        "q": "Resuelva x + 7 = 25. ¿Cuánto vale x?",
        "options": [
          "18",
          "32",
          "175",
          "19"
        ],
        "answer": 0,
        "why": "Reste 7 a ambos lados: x = 25 − 7 = 18.",
        "source": "GICM. Original; álgebra introductoria.",
        "difficulty": 2
      }
    ]
  },
  {
    "id": "study-math-b2-v1",
    "title": "Matemáticas · Bloque 2 · Álgebra y geometría",
    "emoji": "📐",
    "level": "Preparación independiente · 20 preguntas originales; no examen oficial",
    "questions": [
      {
        "q": "Una biblioteca tiene 14 libros y recibe 3. ¿Cuántos tiene ahora?",
        "options": [
          "17",
          "11",
          "42",
          "18"
        ],
        "answer": 0,
        "why": "Sume los libros iniciales y nuevos: 14 + 3 = 17.",
        "source": "GICM. Original; operaciones básicas.",
        "difficulty": 1
      },
      {
        "q": "3 cajas contienen 14 piezas cada una. ¿Cuántas piezas hay?",
        "options": [
          "42",
          "17",
          "39",
          "56"
        ],
        "answer": 0,
        "why": "Multiplique 3 × 14 = 42.",
        "source": "GICM. Original; multiplicación.",
        "difficulty": 1
      },
      {
        "q": "Un rectángulo mide 14 cm de largo y 3 cm de ancho. ¿Cuál es su perímetro?",
        "options": [
          "34 cm",
          "42 cm",
          "17 cm",
          "31 cm"
        ],
        "answer": 0,
        "why": "Sume los cuatro lados: 2 × (14 + 3) = 34 cm. No confunda perímetro con área.",
        "source": "GICM. Original; geometría.",
        "difficulty": 2
      },
      {
        "q": "Resuelva x + 3 = 14. ¿Cuánto vale x?",
        "options": [
          "11",
          "17",
          "42",
          "12"
        ],
        "answer": 0,
        "why": "Reste 3 a ambos lados: x = 14 − 3 = 11.",
        "source": "GICM. Original; álgebra introductoria.",
        "difficulty": 2
      },
      {
        "q": "Una biblioteca tiene 17 libros y recibe 4. ¿Cuántos tiene ahora?",
        "options": [
          "21",
          "13",
          "68",
          "22"
        ],
        "answer": 0,
        "why": "Sume los libros iniciales y nuevos: 17 + 4 = 21.",
        "source": "GICM. Original; operaciones básicas.",
        "difficulty": 1
      },
      {
        "q": "4 cajas contienen 17 piezas cada una. ¿Cuántas piezas hay?",
        "options": [
          "68",
          "21",
          "64",
          "85"
        ],
        "answer": 0,
        "why": "Multiplique 4 × 17 = 68.",
        "source": "GICM. Original; multiplicación.",
        "difficulty": 1
      },
      {
        "q": "Un rectángulo mide 17 cm de largo y 4 cm de ancho. ¿Cuál es su perímetro?",
        "options": [
          "42 cm",
          "68 cm",
          "21 cm",
          "38 cm"
        ],
        "answer": 0,
        "why": "Sume los cuatro lados: 2 × (17 + 4) = 42 cm. No confunda perímetro con área.",
        "source": "GICM. Original; geometría.",
        "difficulty": 2
      },
      {
        "q": "Resuelva x + 4 = 17. ¿Cuánto vale x?",
        "options": [
          "13",
          "21",
          "68",
          "14"
        ],
        "answer": 0,
        "why": "Reste 4 a ambos lados: x = 17 − 4 = 13.",
        "source": "GICM. Original; álgebra introductoria.",
        "difficulty": 2
      },
      {
        "q": "Una biblioteca tiene 20 libros y recibe 5. ¿Cuántos tiene ahora?",
        "options": [
          "25",
          "15",
          "100",
          "26"
        ],
        "answer": 0,
        "why": "Sume los libros iniciales y nuevos: 20 + 5 = 25.",
        "source": "GICM. Original; operaciones básicas.",
        "difficulty": 1
      },
      {
        "q": "5 cajas contienen 20 piezas cada una. ¿Cuántas piezas hay?",
        "options": [
          "100",
          "25",
          "95",
          "120"
        ],
        "answer": 0,
        "why": "Multiplique 5 × 20 = 100.",
        "source": "GICM. Original; multiplicación.",
        "difficulty": 1
      },
      {
        "q": "Un rectángulo mide 20 cm de largo y 5 cm de ancho. ¿Cuál es su perímetro?",
        "options": [
          "50 cm",
          "100 cm",
          "25 cm",
          "45 cm"
        ],
        "answer": 0,
        "why": "Sume los cuatro lados: 2 × (20 + 5) = 50 cm. No confunda perímetro con área.",
        "source": "GICM. Original; geometría.",
        "difficulty": 2
      },
      {
        "q": "Resuelva x + 5 = 20. ¿Cuánto vale x?",
        "options": [
          "15",
          "25",
          "100",
          "16"
        ],
        "answer": 0,
        "why": "Reste 5 a ambos lados: x = 20 − 5 = 15.",
        "source": "GICM. Original; álgebra introductoria.",
        "difficulty": 2
      },
      {
        "q": "Una biblioteca tiene 23 libros y recibe 6. ¿Cuántos tiene ahora?",
        "options": [
          "29",
          "17",
          "138",
          "30"
        ],
        "answer": 0,
        "why": "Sume los libros iniciales y nuevos: 23 + 6 = 29.",
        "source": "GICM. Original; operaciones básicas.",
        "difficulty": 1
      },
      {
        "q": "6 cajas contienen 23 piezas cada una. ¿Cuántas piezas hay?",
        "options": [
          "138",
          "29",
          "132",
          "161"
        ],
        "answer": 0,
        "why": "Multiplique 6 × 23 = 138.",
        "source": "GICM. Original; multiplicación.",
        "difficulty": 1
      },
      {
        "q": "Un rectángulo mide 23 cm de largo y 6 cm de ancho. ¿Cuál es su perímetro?",
        "options": [
          "58 cm",
          "138 cm",
          "29 cm",
          "52 cm"
        ],
        "answer": 0,
        "why": "Sume los cuatro lados: 2 × (23 + 6) = 58 cm. No confunda perímetro con área.",
        "source": "GICM. Original; geometría.",
        "difficulty": 2
      },
      {
        "q": "Resuelva x + 6 = 23. ¿Cuánto vale x?",
        "options": [
          "17",
          "29",
          "138",
          "18"
        ],
        "answer": 0,
        "why": "Reste 6 a ambos lados: x = 23 − 6 = 17.",
        "source": "GICM. Original; álgebra introductoria.",
        "difficulty": 2
      },
      {
        "q": "Una biblioteca tiene 26 libros y recibe 7. ¿Cuántos tiene ahora?",
        "options": [
          "33",
          "19",
          "182",
          "34"
        ],
        "answer": 0,
        "why": "Sume los libros iniciales y nuevos: 26 + 7 = 33.",
        "source": "GICM. Original; operaciones básicas.",
        "difficulty": 1
      },
      {
        "q": "7 cajas contienen 26 piezas cada una. ¿Cuántas piezas hay?",
        "options": [
          "182",
          "33",
          "175",
          "208"
        ],
        "answer": 0,
        "why": "Multiplique 7 × 26 = 182.",
        "source": "GICM. Original; multiplicación.",
        "difficulty": 1
      },
      {
        "q": "Un rectángulo mide 26 cm de largo y 7 cm de ancho. ¿Cuál es su perímetro?",
        "options": [
          "66 cm",
          "182 cm",
          "33 cm",
          "59 cm"
        ],
        "answer": 0,
        "why": "Sume los cuatro lados: 2 × (26 + 7) = 66 cm. No confunda perímetro con área.",
        "source": "GICM. Original; geometría.",
        "difficulty": 2
      },
      {
        "q": "Resuelva x + 7 = 26. ¿Cuánto vale x?",
        "options": [
          "19",
          "33",
          "182",
          "20"
        ],
        "answer": 0,
        "why": "Reste 7 a ambos lados: x = 26 − 7 = 19.",
        "source": "GICM. Original; álgebra introductoria.",
        "difficulty": 2
      }
    ]
  },
  {
    "id": "study-math-b3-v1",
    "title": "Matemáticas · Bloque 3 · Datos y razonamiento",
    "emoji": "📐",
    "level": "Preparación independiente · 20 preguntas originales; no examen oficial",
    "questions": [
      {
        "q": "Una biblioteca tiene 15 libros y recibe 3. ¿Cuántos tiene ahora?",
        "options": [
          "18",
          "12",
          "45",
          "19"
        ],
        "answer": 0,
        "why": "Sume los libros iniciales y nuevos: 15 + 3 = 18.",
        "source": "GICM. Original; operaciones básicas.",
        "difficulty": 1
      },
      {
        "q": "3 cajas contienen 15 piezas cada una. ¿Cuántas piezas hay?",
        "options": [
          "45",
          "18",
          "42",
          "60"
        ],
        "answer": 0,
        "why": "Multiplique 3 × 15 = 45.",
        "source": "GICM. Original; multiplicación.",
        "difficulty": 1
      },
      {
        "q": "Un rectángulo mide 15 cm de largo y 3 cm de ancho. ¿Cuál es su perímetro?",
        "options": [
          "36 cm",
          "45 cm",
          "18 cm",
          "33 cm"
        ],
        "answer": 0,
        "why": "Sume los cuatro lados: 2 × (15 + 3) = 36 cm. No confunda perímetro con área.",
        "source": "GICM. Original; geometría.",
        "difficulty": 2
      },
      {
        "q": "Resuelva x + 3 = 15. ¿Cuánto vale x?",
        "options": [
          "12",
          "18",
          "45",
          "13"
        ],
        "answer": 0,
        "why": "Reste 3 a ambos lados: x = 15 − 3 = 12.",
        "source": "GICM. Original; álgebra introductoria.",
        "difficulty": 2
      },
      {
        "q": "Una biblioteca tiene 18 libros y recibe 4. ¿Cuántos tiene ahora?",
        "options": [
          "22",
          "14",
          "72",
          "23"
        ],
        "answer": 0,
        "why": "Sume los libros iniciales y nuevos: 18 + 4 = 22.",
        "source": "GICM. Original; operaciones básicas.",
        "difficulty": 1
      },
      {
        "q": "4 cajas contienen 18 piezas cada una. ¿Cuántas piezas hay?",
        "options": [
          "72",
          "22",
          "68",
          "90"
        ],
        "answer": 0,
        "why": "Multiplique 4 × 18 = 72.",
        "source": "GICM. Original; multiplicación.",
        "difficulty": 1
      },
      {
        "q": "Un rectángulo mide 18 cm de largo y 4 cm de ancho. ¿Cuál es su perímetro?",
        "options": [
          "44 cm",
          "72 cm",
          "22 cm",
          "40 cm"
        ],
        "answer": 0,
        "why": "Sume los cuatro lados: 2 × (18 + 4) = 44 cm. No confunda perímetro con área.",
        "source": "GICM. Original; geometría.",
        "difficulty": 2
      },
      {
        "q": "Resuelva x + 4 = 18. ¿Cuánto vale x?",
        "options": [
          "14",
          "22",
          "72",
          "15"
        ],
        "answer": 0,
        "why": "Reste 4 a ambos lados: x = 18 − 4 = 14.",
        "source": "GICM. Original; álgebra introductoria.",
        "difficulty": 2
      },
      {
        "q": "Una biblioteca tiene 21 libros y recibe 5. ¿Cuántos tiene ahora?",
        "options": [
          "26",
          "16",
          "105",
          "27"
        ],
        "answer": 0,
        "why": "Sume los libros iniciales y nuevos: 21 + 5 = 26.",
        "source": "GICM. Original; operaciones básicas.",
        "difficulty": 1
      },
      {
        "q": "5 cajas contienen 21 piezas cada una. ¿Cuántas piezas hay?",
        "options": [
          "105",
          "26",
          "100",
          "126"
        ],
        "answer": 0,
        "why": "Multiplique 5 × 21 = 105.",
        "source": "GICM. Original; multiplicación.",
        "difficulty": 1
      },
      {
        "q": "Un rectángulo mide 21 cm de largo y 5 cm de ancho. ¿Cuál es su perímetro?",
        "options": [
          "52 cm",
          "105 cm",
          "26 cm",
          "47 cm"
        ],
        "answer": 0,
        "why": "Sume los cuatro lados: 2 × (21 + 5) = 52 cm. No confunda perímetro con área.",
        "source": "GICM. Original; geometría.",
        "difficulty": 2
      },
      {
        "q": "Resuelva x + 5 = 21. ¿Cuánto vale x?",
        "options": [
          "16",
          "26",
          "105",
          "17"
        ],
        "answer": 0,
        "why": "Reste 5 a ambos lados: x = 21 − 5 = 16.",
        "source": "GICM. Original; álgebra introductoria.",
        "difficulty": 2
      },
      {
        "q": "Una biblioteca tiene 24 libros y recibe 6. ¿Cuántos tiene ahora?",
        "options": [
          "30",
          "18",
          "144",
          "31"
        ],
        "answer": 0,
        "why": "Sume los libros iniciales y nuevos: 24 + 6 = 30.",
        "source": "GICM. Original; operaciones básicas.",
        "difficulty": 1
      },
      {
        "q": "6 cajas contienen 24 piezas cada una. ¿Cuántas piezas hay?",
        "options": [
          "144",
          "30",
          "138",
          "168"
        ],
        "answer": 0,
        "why": "Multiplique 6 × 24 = 144.",
        "source": "GICM. Original; multiplicación.",
        "difficulty": 1
      },
      {
        "q": "Un rectángulo mide 24 cm de largo y 6 cm de ancho. ¿Cuál es su perímetro?",
        "options": [
          "60 cm",
          "144 cm",
          "30 cm",
          "54 cm"
        ],
        "answer": 0,
        "why": "Sume los cuatro lados: 2 × (24 + 6) = 60 cm. No confunda perímetro con área.",
        "source": "GICM. Original; geometría.",
        "difficulty": 2
      },
      {
        "q": "Resuelva x + 6 = 24. ¿Cuánto vale x?",
        "options": [
          "18",
          "30",
          "144",
          "19"
        ],
        "answer": 0,
        "why": "Reste 6 a ambos lados: x = 24 − 6 = 18.",
        "source": "GICM. Original; álgebra introductoria.",
        "difficulty": 2
      },
      {
        "q": "Una biblioteca tiene 27 libros y recibe 7. ¿Cuántos tiene ahora?",
        "options": [
          "34",
          "20",
          "189",
          "35"
        ],
        "answer": 0,
        "why": "Sume los libros iniciales y nuevos: 27 + 7 = 34.",
        "source": "GICM. Original; operaciones básicas.",
        "difficulty": 1
      },
      {
        "q": "7 cajas contienen 27 piezas cada una. ¿Cuántas piezas hay?",
        "options": [
          "189",
          "34",
          "182",
          "216"
        ],
        "answer": 0,
        "why": "Multiplique 7 × 27 = 189.",
        "source": "GICM. Original; multiplicación.",
        "difficulty": 1
      },
      {
        "q": "Un rectángulo mide 27 cm de largo y 7 cm de ancho. ¿Cuál es su perímetro?",
        "options": [
          "68 cm",
          "189 cm",
          "34 cm",
          "61 cm"
        ],
        "answer": 0,
        "why": "Sume los cuatro lados: 2 × (27 + 7) = 68 cm. No confunda perímetro con área.",
        "source": "GICM. Original; geometría.",
        "difficulty": 2
      },
      {
        "q": "Resuelva x + 7 = 27. ¿Cuánto vale x?",
        "options": [
          "20",
          "34",
          "189",
          "21"
        ],
        "answer": 0,
        "why": "Reste 7 a ambos lados: x = 27 − 7 = 20.",
        "source": "GICM. Original; álgebra introductoria.",
        "difficulty": 2
      }
    ]
  },
  {
    "id": "study-security-b1-v1",
    "title": "Ciberseguridad · Bloque 1 · Caso Laboratorio de formación",
    "emoji": "🛡️",
    "level": "Preparación independiente · 20 preguntas originales; no examen oficial",
    "questions": [
      {
        "q": "Caso Laboratorio de formación. Una cuenta solo necesita consultar informes. ¿Qué acceso debe recibir?",
        "options": [
          "Lectura de los informes autorizados",
          "Administrador global",
          "Edición de todas las cuentas",
          "La clave de otra persona"
        ],
        "answer": 0,
        "why": "Aplique mínimo privilegio: únicamente permisos necesarios.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. Un correo urgente pide una contraseña mediante un enlace. ¿Qué acción es más segura?",
        "options": [
          "Verificar por un canal oficial independiente",
          "Ingresar la clave en el enlace",
          "Enviar la clave por correo",
          "Compartirlo como confirmación"
        ],
        "answer": 0,
        "why": "La urgencia no prueba autenticidad; confirme fuera del mensaje.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué combinación representa autenticación multifactor?",
        "options": [
          "Contraseña y llave de seguridad",
          "Dos contraseñas",
          "Contraseña y nombre de usuario",
          "Dos preguntas públicas"
        ],
        "answer": 0,
        "why": "Use factores distintos: algo que sabe y algo que posee.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Cómo se deben almacenar contraseñas de usuarios?",
        "options": [
          "Hash lento con sal única",
          "Texto plano",
          "Cifrado reversible sin necesidad",
          "Hash rápido sin sal"
        ],
        "answer": 0,
        "why": "Una función de derivación de contraseñas dificulta ataques; no guarde texto plano.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué permite recuperar información tras un fallo?",
        "options": [
          "Un respaldo probado mediante restauración",
          "Un archivo sin verificar",
          "Desactivar registros",
          "Un nombre de archivo nuevo"
        ],
        "answer": 0,
        "why": "Un respaldo útil debe ser recuperable, no solo existir.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué propiedad evita revelar datos a personas no autorizadas?",
        "options": [
          "Confidencialidad",
          "Disponibilidad",
          "Latencia",
          "Portabilidad"
        ],
        "answer": 0,
        "why": "Confidencialidad limita acceso; integridad evita alteraciones no autorizadas.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué propiedad protege contra cambios no autorizados?",
        "options": [
          "Integridad",
          "Popularidad",
          "Compresión",
          "Escalabilidad"
        ],
        "answer": 0,
        "why": "La integridad preserva exactitud y consistencia.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué propiedad busca que el servicio esté accesible cuando se necesita?",
        "options": [
          "Disponibilidad",
          "Confidencialidad",
          "Estética",
          "Anonimato absoluto"
        ],
        "answer": 0,
        "why": "Disponibilidad es acceso oportuno a servicios autorizados.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué controla el tráfico entre segmentos según reglas?",
        "options": [
          "Firewall",
          "Procesador de texto",
          "Hoja de cálculo",
          "Impresora"
        ],
        "answer": 0,
        "why": "Un firewall aplica reglas; no elimina todos los riesgos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué reduce el movimiento lateral dentro de una red?",
        "options": [
          "Segmentación con permisos restringidos",
          "Una red plana con acceso total",
          "Una contraseña común",
          "Desactivar controles"
        ],
        "answer": 0,
        "why": "Separar segmentos limita alcance de un incidente.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué debe hacerse con actualizaciones de seguridad?",
        "options": [
          "Evaluar, probar y aplicar oportunamente",
          "Ignorarlas siempre",
          "Instalar sin ninguna validación en todo caso",
          "Sustituirlas por cambiar el fondo"
        ],
        "answer": 0,
        "why": "Pruebe impacto y no deje vulnerabilidades conocidas sin gestionar.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué evita una consulta SQL construida con texto no confiable?",
        "options": [
          "Consultas parametrizadas",
          "Concatenar entrada directamente",
          "Ocultar el formulario",
          "Validar solo en el navegador"
        ],
        "answer": 0,
        "why": "La parametrización separa instrucciones SQL de datos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Dónde debe comprobarse autorización para leer datos privados?",
        "options": [
          "En el servidor en cada operación",
          "Solo ocultando botones",
          "Solo en una cookie editable",
          "Solo en una captura de pantalla"
        ],
        "answer": 0,
        "why": "Ocultar una opción no impide llamadas directas.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Cómo se deben gestionar secretos de producción?",
        "options": [
          "Almacén de secretos con acceso limitado",
          "Repositorio público",
          "Archivo compartido abierto",
          "Mensaje en el sitio"
        ],
        "answer": 0,
        "why": "Limite exposición, rote secretos y no los publique.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. Ante sospecha de un equipo comprometido, ¿qué se prioriza?",
        "options": [
          "Contener según el plan y preservar evidencia",
          "Borrar todo inmediatamente",
          "Publicar claves",
          "Ignorar alertas"
        ],
        "answer": 0,
        "why": "Contención y evidencia permiten investigar sin aumentar daño.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué es un falso positivo en una alerta?",
        "options": [
          "Actividad legítima señalada como amenaza",
          "Ataque no detectado",
          "Respaldo restaurado",
          "Contraseña expirada"
        ],
        "answer": 0,
        "why": "Una detección puede equivocarse; valide antes de concluir.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué protege TLS durante una conexión correctamente validada?",
        "options": [
          "Datos en tránsito entre extremos",
          "Todo archivo almacenado para siempre",
          "Identidad de toda persona",
          "Ausencia de malware"
        ],
        "answer": 0,
        "why": "TLS no sustituye autorización ni protección de los extremos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué se debe registrar para investigar acceso sensible?",
        "options": [
          "Evento, fecha y actor sin secretos",
          "La contraseña completa",
          "Todas las tarjetas sin protección",
          "Solo el color del botón"
        ],
        "answer": 0,
        "why": "Registre lo necesario sin exponer secretos o datos excesivos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Cuál es una medida contra pérdida por ransomware?",
        "options": [
          "Respaldos aislados y restauraciones probadas",
          "Pagar garantiza recuperación",
          "Una carpeta con todos los permisos",
          "Desactivar actualizaciones"
        ],
        "answer": 0,
        "why": "Respaldos aislados ayudan a recuperar; pagar no garantiza resultado.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué es gestión de riesgo?",
        "options": [
          "Evaluar probabilidad e impacto y tratar riesgos",
          "Prometer seguridad absoluta",
          "Comprar cualquier producto",
          "Eliminar todos los registros"
        ],
        "answer": 0,
        "why": "No existe riesgo cero; priorice según impacto y probabilidad.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 1
      }
    ]
  },
  {
    "id": "study-security-b2-v1",
    "title": "Ciberseguridad · Bloque 2 · Caso Cooperativa de servicios",
    "emoji": "🛡️",
    "level": "Preparación independiente · 20 preguntas originales; no examen oficial",
    "questions": [
      {
        "q": "Caso Cooperativa de servicios. Una cuenta solo necesita consultar informes. ¿Qué acceso debe recibir? Evalúe la justificación de la decisión.",
        "options": [
          "Lectura de los informes autorizados; Aplique mínimo privilegio: únicamente permisos necesarios.",
          "Administrador global",
          "Edición de todas las cuentas",
          "La clave de otra persona"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Aplique mínimo privilegio: únicamente permisos necesarios.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. Un correo urgente pide una contraseña mediante un enlace. ¿Qué acción es más segura? Evalúe la justificación de la decisión.",
        "options": [
          "Verificar por un canal oficial independiente; La urgencia no prueba autenticidad; confirme fuera del mensaje.",
          "Ingresar la clave en el enlace",
          "Enviar la clave por correo",
          "Compartirlo como confirmación"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. La urgencia no prueba autenticidad; confirme fuera del mensaje.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué combinación representa autenticación multifactor? Evalúe la justificación de la decisión.",
        "options": [
          "Contraseña y llave de seguridad; Use factores distintos: algo que sabe y algo que posee.",
          "Dos contraseñas",
          "Contraseña y nombre de usuario",
          "Dos preguntas públicas"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Use factores distintos: algo que sabe y algo que posee.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Cómo se deben almacenar contraseñas de usuarios? Evalúe la justificación de la decisión.",
        "options": [
          "Hash lento con sal única; Una función de derivación de contraseñas dificulta ataques; no guarde texto plano.",
          "Texto plano",
          "Cifrado reversible sin necesidad",
          "Hash rápido sin sal"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Una función de derivación de contraseñas dificulta ataques; no guarde texto plano.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué permite recuperar información tras un fallo? Evalúe la justificación de la decisión.",
        "options": [
          "Un respaldo probado mediante restauración; Un respaldo útil debe ser recuperable, no solo existir.",
          "Un archivo sin verificar",
          "Desactivar registros",
          "Un nombre de archivo nuevo"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Un respaldo útil debe ser recuperable, no solo existir.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué propiedad evita revelar datos a personas no autorizadas? Evalúe la justificación de la decisión.",
        "options": [
          "Confidencialidad; Confidencialidad limita acceso; integridad evita alteraciones no autorizadas.",
          "Disponibilidad",
          "Latencia",
          "Portabilidad"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Confidencialidad limita acceso; integridad evita alteraciones no autorizadas.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué propiedad protege contra cambios no autorizados? Evalúe la justificación de la decisión.",
        "options": [
          "Integridad; La integridad preserva exactitud y consistencia.",
          "Popularidad",
          "Compresión",
          "Escalabilidad"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. La integridad preserva exactitud y consistencia.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué propiedad busca que el servicio esté accesible cuando se necesita? Evalúe la justificación de la decisión.",
        "options": [
          "Disponibilidad; Disponibilidad es acceso oportuno a servicios autorizados.",
          "Confidencialidad",
          "Estética",
          "Anonimato absoluto"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Disponibilidad es acceso oportuno a servicios autorizados.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué controla el tráfico entre segmentos según reglas? Evalúe la justificación de la decisión.",
        "options": [
          "Firewall; Un firewall aplica reglas; no elimina todos los riesgos.",
          "Procesador de texto",
          "Hoja de cálculo",
          "Impresora"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Un firewall aplica reglas; no elimina todos los riesgos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué reduce el movimiento lateral dentro de una red? Evalúe la justificación de la decisión.",
        "options": [
          "Segmentación con permisos restringidos; Separar segmentos limita alcance de un incidente.",
          "Una red plana con acceso total",
          "Una contraseña común",
          "Desactivar controles"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Separar segmentos limita alcance de un incidente.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué debe hacerse con actualizaciones de seguridad? Evalúe la justificación de la decisión.",
        "options": [
          "Evaluar, probar y aplicar oportunamente; Pruebe impacto y no deje vulnerabilidades conocidas sin gestionar.",
          "Ignorarlas siempre",
          "Instalar sin ninguna validación en todo caso",
          "Sustituirlas por cambiar el fondo"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Pruebe impacto y no deje vulnerabilidades conocidas sin gestionar.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué evita una consulta SQL construida con texto no confiable? Evalúe la justificación de la decisión.",
        "options": [
          "Consultas parametrizadas; La parametrización separa instrucciones SQL de datos.",
          "Concatenar entrada directamente",
          "Ocultar el formulario",
          "Validar solo en el navegador"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. La parametrización separa instrucciones SQL de datos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Dónde debe comprobarse autorización para leer datos privados? Evalúe la justificación de la decisión.",
        "options": [
          "En el servidor en cada operación; Ocultar una opción no impide llamadas directas.",
          "Solo ocultando botones",
          "Solo en una cookie editable",
          "Solo en una captura de pantalla"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Ocultar una opción no impide llamadas directas.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Cómo se deben gestionar secretos de producción? Evalúe la justificación de la decisión.",
        "options": [
          "Almacén de secretos con acceso limitado; Limite exposición, rote secretos y no los publique.",
          "Repositorio público",
          "Archivo compartido abierto",
          "Mensaje en el sitio"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Limite exposición, rote secretos y no los publique.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. Ante sospecha de un equipo comprometido, ¿qué se prioriza? Evalúe la justificación de la decisión.",
        "options": [
          "Contener según el plan y preservar evidencia; Contención y evidencia permiten investigar sin aumentar daño.",
          "Borrar todo inmediatamente",
          "Publicar claves",
          "Ignorar alertas"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Contención y evidencia permiten investigar sin aumentar daño.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué es un falso positivo en una alerta? Evalúe la justificación de la decisión.",
        "options": [
          "Actividad legítima señalada como amenaza; Una detección puede equivocarse; valide antes de concluir.",
          "Ataque no detectado",
          "Respaldo restaurado",
          "Contraseña expirada"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Una detección puede equivocarse; valide antes de concluir.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué protege TLS durante una conexión correctamente validada? Evalúe la justificación de la decisión.",
        "options": [
          "Datos en tránsito entre extremos; TLS no sustituye autorización ni protección de los extremos.",
          "Todo archivo almacenado para siempre",
          "Identidad de toda persona",
          "Ausencia de malware"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. TLS no sustituye autorización ni protección de los extremos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué se debe registrar para investigar acceso sensible? Evalúe la justificación de la decisión.",
        "options": [
          "Evento, fecha y actor sin secretos; Registre lo necesario sin exponer secretos o datos excesivos.",
          "La contraseña completa",
          "Todas las tarjetas sin protección",
          "Solo el color del botón"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Registre lo necesario sin exponer secretos o datos excesivos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Cuál es una medida contra pérdida por ransomware? Evalúe la justificación de la decisión.",
        "options": [
          "Respaldos aislados y restauraciones probadas; Respaldos aislados ayudan a recuperar; pagar no garantiza resultado.",
          "Pagar garantiza recuperación",
          "Una carpeta con todos los permisos",
          "Desactivar actualizaciones"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Respaldos aislados ayudan a recuperar; pagar no garantiza resultado.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué es gestión de riesgo? Evalúe la justificación de la decisión.",
        "options": [
          "Evaluar probabilidad e impacto y tratar riesgos; No existe riesgo cero; priorice según impacto y probabilidad.",
          "Prometer seguridad absoluta",
          "Comprar cualquier producto",
          "Eliminar todos los registros"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. No existe riesgo cero; priorice según impacto y probabilidad.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 2
      }
    ]
  },
  {
    "id": "study-security-b3-v1",
    "title": "Ciberseguridad · Bloque 3 · Caso Empresa de mantenimiento",
    "emoji": "🛡️",
    "level": "Preparación independiente · 20 preguntas originales; no examen oficial",
    "questions": [
      {
        "q": "Caso Empresa de mantenimiento. Una cuenta solo necesita consultar informes. ¿Qué acceso debe recibir?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Lectura de los informes autorizados; Aplique mínimo privilegio: únicamente permisos necesarios.",
          "Administrador global",
          "Edición de todas las cuentas",
          "La clave de otra persona"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Aplique mínimo privilegio: únicamente permisos necesarios.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. Un correo urgente pide una contraseña mediante un enlace. ¿Qué acción es más segura?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Verificar por un canal oficial independiente; La urgencia no prueba autenticidad; confirme fuera del mensaje.",
          "Ingresar la clave en el enlace",
          "Enviar la clave por correo",
          "Compartirlo como confirmación"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. La urgencia no prueba autenticidad; confirme fuera del mensaje.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué combinación representa autenticación multifactor?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Contraseña y llave de seguridad; Use factores distintos: algo que sabe y algo que posee.",
          "Dos contraseñas",
          "Contraseña y nombre de usuario",
          "Dos preguntas públicas"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Use factores distintos: algo que sabe y algo que posee.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Cómo se deben almacenar contraseñas de usuarios?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Hash lento con sal única; Una función de derivación de contraseñas dificulta ataques; no guarde texto plano.",
          "Texto plano",
          "Cifrado reversible sin necesidad",
          "Hash rápido sin sal"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Una función de derivación de contraseñas dificulta ataques; no guarde texto plano.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué permite recuperar información tras un fallo?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Un respaldo probado mediante restauración; Un respaldo útil debe ser recuperable, no solo existir.",
          "Un archivo sin verificar",
          "Desactivar registros",
          "Un nombre de archivo nuevo"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Un respaldo útil debe ser recuperable, no solo existir.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué propiedad evita revelar datos a personas no autorizadas?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Confidencialidad; Confidencialidad limita acceso; integridad evita alteraciones no autorizadas.",
          "Disponibilidad",
          "Latencia",
          "Portabilidad"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Confidencialidad limita acceso; integridad evita alteraciones no autorizadas.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué propiedad protege contra cambios no autorizados?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Integridad; La integridad preserva exactitud y consistencia.",
          "Popularidad",
          "Compresión",
          "Escalabilidad"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. La integridad preserva exactitud y consistencia.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué propiedad busca que el servicio esté accesible cuando se necesita?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Disponibilidad; Disponibilidad es acceso oportuno a servicios autorizados.",
          "Confidencialidad",
          "Estética",
          "Anonimato absoluto"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Disponibilidad es acceso oportuno a servicios autorizados.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué controla el tráfico entre segmentos según reglas?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Firewall; Un firewall aplica reglas; no elimina todos los riesgos.",
          "Procesador de texto",
          "Hoja de cálculo",
          "Impresora"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Un firewall aplica reglas; no elimina todos los riesgos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué reduce el movimiento lateral dentro de una red?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Segmentación con permisos restringidos; Separar segmentos limita alcance de un incidente.",
          "Una red plana con acceso total",
          "Una contraseña común",
          "Desactivar controles"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Separar segmentos limita alcance de un incidente.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué debe hacerse con actualizaciones de seguridad?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Evaluar, probar y aplicar oportunamente; Pruebe impacto y no deje vulnerabilidades conocidas sin gestionar.",
          "Ignorarlas siempre",
          "Instalar sin ninguna validación en todo caso",
          "Sustituirlas por cambiar el fondo"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Pruebe impacto y no deje vulnerabilidades conocidas sin gestionar.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué evita una consulta SQL construida con texto no confiable?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Consultas parametrizadas; La parametrización separa instrucciones SQL de datos.",
          "Concatenar entrada directamente",
          "Ocultar el formulario",
          "Validar solo en el navegador"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. La parametrización separa instrucciones SQL de datos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Dónde debe comprobarse autorización para leer datos privados?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "En el servidor en cada operación; Ocultar una opción no impide llamadas directas.",
          "Solo ocultando botones",
          "Solo en una cookie editable",
          "Solo en una captura de pantalla"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Ocultar una opción no impide llamadas directas.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Cómo se deben gestionar secretos de producción?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Almacén de secretos con acceso limitado; Limite exposición, rote secretos y no los publique.",
          "Repositorio público",
          "Archivo compartido abierto",
          "Mensaje en el sitio"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Limite exposición, rote secretos y no los publique.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. Ante sospecha de un equipo comprometido, ¿qué se prioriza?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Contener según el plan y preservar evidencia; Contención y evidencia permiten investigar sin aumentar daño.",
          "Borrar todo inmediatamente",
          "Publicar claves",
          "Ignorar alertas"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Contención y evidencia permiten investigar sin aumentar daño.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué es un falso positivo en una alerta?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Actividad legítima señalada como amenaza; Una detección puede equivocarse; valide antes de concluir.",
          "Ataque no detectado",
          "Respaldo restaurado",
          "Contraseña expirada"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Una detección puede equivocarse; valide antes de concluir.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué protege TLS durante una conexión correctamente validada?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Datos en tránsito entre extremos; TLS no sustituye autorización ni protección de los extremos.",
          "Todo archivo almacenado para siempre",
          "Identidad de toda persona",
          "Ausencia de malware"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. TLS no sustituye autorización ni protección de los extremos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué se debe registrar para investigar acceso sensible?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Evento, fecha y actor sin secretos; Registre lo necesario sin exponer secretos o datos excesivos.",
          "La contraseña completa",
          "Todas las tarjetas sin protección",
          "Solo el color del botón"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Registre lo necesario sin exponer secretos o datos excesivos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Cuál es una medida contra pérdida por ransomware?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Respaldos aislados y restauraciones probadas; Respaldos aislados ayudan a recuperar; pagar no garantiza resultado.",
          "Pagar garantiza recuperación",
          "Una carpeta con todos los permisos",
          "Desactivar actualizaciones"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Respaldos aislados ayudan a recuperar; pagar no garantiza resultado.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué es gestión de riesgo?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Evaluar probabilidad e impacto y tratar riesgos; No existe riesgo cero; priorice según impacto y probabilidad.",
          "Prometer seguridad absoluta",
          "Comprar cualquier producto",
          "Eliminar todos los registros"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. No existe riesgo cero; priorice según impacto y probabilidad.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.nist.gov/cyberframework",
        "difficulty": 3
      }
    ]
  },
  {
    "id": "study-web-b1-v1",
    "title": "Desarrollo web · Bloque 1 · Caso Laboratorio de formación",
    "emoji": "💻",
    "level": "Preparación independiente · 20 preguntas originales; no examen oficial",
    "questions": [
      {
        "q": "Caso Laboratorio de formación. ¿Qué elemento representa la navegación principal?",
        "options": [
          "nav",
          "span",
          "b",
          "br"
        ],
        "answer": 0,
        "why": "Use semántica HTML que describa la función.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Cómo se asocia una etiqueta con un campo?",
        "options": [
          "label con for igual al id del input",
          "Un div visual cercano",
          "Un color igual",
          "Un placeholder como único nombre"
        ],
        "answer": 0,
        "why": "Una etiqueta programática ayuda a lectores de pantalla.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué elemento nativo ejecuta una acción?",
        "options": [
          "button",
          "Un div sin teclado",
          "Una imagen sin nombre",
          "Un párrafo"
        ],
        "answer": 0,
        "why": "Button ofrece activación por teclado y semántica.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. Una imagen informativa necesita:",
        "options": [
          "Texto alternativo que comunique su contenido",
          "Siempre alt vacío",
          "Solo nombre del archivo",
          "Solo color"
        ],
        "answer": 0,
        "why": "Describa la información relevante; las decorativas usan alt vacío.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué facilita navegación con teclado?",
        "options": [
          "Foco visible y orden lógico",
          "Eliminar el contorno de foco",
          "Solo eventos de mouse",
          "Bloquear la tecla Tab"
        ],
        "answer": 0,
        "why": "El foco debe ser visible y alcanzar acciones importantes.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. En CSS, display: grid sirve para:",
        "options": [
          "Organizar filas y columnas",
          "Consultar una base de datos",
          "Enviar correos",
          "Validar identidad"
        ],
        "answer": 0,
        "why": "Grid organiza la presentación, no datos remotos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué ayuda a evitar desbordamiento en pantallas estrechas?",
        "options": [
          "Dimensiones flexibles y ajuste de contenido",
          "Ancho fijo mayor que la pantalla",
          "Ocultar todo el texto",
          "Desactivar zoom"
        ],
        "answer": 0,
        "why": "Diseñe tamaños adaptables y verifique el contenido.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué hace const en JavaScript?",
        "options": [
          "Impide reasignar la referencia",
          "Vuelve inmutable todo objeto",
          "Cifra la variable",
          "Solo permite números"
        ],
        "answer": 0,
        "why": "Const no impide modificar propiedades de un objeto.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué compara === en JavaScript?",
        "options": [
          "Igualdad sin conversión de tipos",
          "Asigna un valor",
          "Compara solo longitud",
          "Concatena textos"
        ],
        "answer": 0,
        "why": "La igualdad estricta no hace coerción de tipos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. Una promesa rechazada requiere:",
        "options": [
          "Manejo de error y respuesta útil",
          "Ignorar el rechazo",
          "Declarar éxito",
          "Recargar sin límite"
        ],
        "answer": 0,
        "why": "Muestre una recuperación adecuada sin filtrar secretos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué método HTTP suele solicitar un recurso sin modificarlo?",
        "options": [
          "GET",
          "DELETE",
          "PATCH",
          "POST"
        ],
        "answer": 0,
        "why": "GET debe ser una lectura; no utilice enlaces para borrar.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué indica el estado HTTP 404?",
        "options": [
          "Recurso no encontrado",
          "Todo correcto",
          "No autorizado siempre",
          "Error de sintaxis CSS"
        ],
        "answer": 0,
        "why": "404 indica que el recurso solicitado no se encuentra.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué indica HTTP 401?",
        "options": [
          "Falta autenticación válida",
          "Fallo de CSS",
          "Recurso movido siempre",
          "Éxito sin contenido"
        ],
        "answer": 0,
        "why": "401 pide credenciales válidas; 403 es prohibición de acceso.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué debería verificar un servidor antes de modificar datos?",
        "options": [
          "Identidad, permiso y datos de entrada",
          "Solo el texto del botón",
          "Solo resolución de pantalla",
          "Solo idioma"
        ],
        "answer": 0,
        "why": "La autorización y validación se hacen en el servidor.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué reduce XSS al mostrar entrada no confiable?",
        "options": [
          "Salida escapada y controles de contenido",
          "Insertar HTML arbitrario",
          "Desactivar HTTPS",
          "Cambiar el logotipo"
        ],
        "answer": 0,
        "why": "Evite ejecutar contenido no confiable; aplique defensa por capas.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué significa una interfaz accesible?",
        "options": [
          "Operable y comprensible con distintas capacidades",
          "Solo tener colores claros",
          "Solo usar imágenes",
          "Prohibir tecnología asistiva"
        ],
        "answer": 0,
        "why": "Accesibilidad abarca percepción, operación y comprensión.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué representa JSON?",
        "options": [
          "Un formato de datos estructurados",
          "Un lenguaje de estilos",
          "Una clave secreta",
          "Un protocolo de correo"
        ],
        "answer": 0,
        "why": "JSON expresa objetos, arreglos y valores.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué debe hacer un formulario ante datos inválidos?",
        "options": [
          "Mostrar un error asociado al campo",
          "Borrar todo sin avisar",
          "Declarar éxito",
          "Ocultar el campo"
        ],
        "answer": 0,
        "why": "La retroalimentación debe ser clara y accesible.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué mejora el rendimiento de imágenes?",
        "options": [
          "Tamaño adecuado y carga diferida cuando corresponde",
          "Siempre el archivo más grande",
          "Duplicar todas las fotos",
          "Convertirlas a texto"
        ],
        "answer": 0,
        "why": "No retrase la imagen principal crítica; optimice dimensiones.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué prueba verifica un flujo del usuario completo?",
        "options": [
          "Prueba de extremo a extremo",
          "Solo contar archivos",
          "Solo compilar CSS",
          "Solo revisar nombres"
        ],
        "answer": 0,
        "why": "Reproduce acciones y resultados en el entorno real.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 1
      }
    ]
  },
  {
    "id": "study-web-b2-v1",
    "title": "Desarrollo web · Bloque 2 · Caso Cooperativa de servicios",
    "emoji": "💻",
    "level": "Preparación independiente · 20 preguntas originales; no examen oficial",
    "questions": [
      {
        "q": "Caso Cooperativa de servicios. ¿Qué elemento representa la navegación principal? Evalúe la justificación de la decisión.",
        "options": [
          "nav; Use semántica HTML que describa la función.",
          "span",
          "b",
          "br"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Use semántica HTML que describa la función.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Cómo se asocia una etiqueta con un campo? Evalúe la justificación de la decisión.",
        "options": [
          "label con for igual al id del input; Una etiqueta programática ayuda a lectores de pantalla.",
          "Un div visual cercano",
          "Un color igual",
          "Un placeholder como único nombre"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Una etiqueta programática ayuda a lectores de pantalla.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué elemento nativo ejecuta una acción? Evalúe la justificación de la decisión.",
        "options": [
          "button; Button ofrece activación por teclado y semántica.",
          "Un div sin teclado",
          "Una imagen sin nombre",
          "Un párrafo"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Button ofrece activación por teclado y semántica.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. Una imagen informativa necesita: Evalúe la justificación de la decisión.",
        "options": [
          "Texto alternativo que comunique su contenido; Describa la información relevante; las decorativas usan alt vacío.",
          "Siempre alt vacío",
          "Solo nombre del archivo",
          "Solo color"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Describa la información relevante; las decorativas usan alt vacío.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué facilita navegación con teclado? Evalúe la justificación de la decisión.",
        "options": [
          "Foco visible y orden lógico; El foco debe ser visible y alcanzar acciones importantes.",
          "Eliminar el contorno de foco",
          "Solo eventos de mouse",
          "Bloquear la tecla Tab"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. El foco debe ser visible y alcanzar acciones importantes.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. En CSS, display: grid sirve para: Evalúe la justificación de la decisión.",
        "options": [
          "Organizar filas y columnas; Grid organiza la presentación, no datos remotos.",
          "Consultar una base de datos",
          "Enviar correos",
          "Validar identidad"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Grid organiza la presentación, no datos remotos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué ayuda a evitar desbordamiento en pantallas estrechas? Evalúe la justificación de la decisión.",
        "options": [
          "Dimensiones flexibles y ajuste de contenido; Diseñe tamaños adaptables y verifique el contenido.",
          "Ancho fijo mayor que la pantalla",
          "Ocultar todo el texto",
          "Desactivar zoom"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Diseñe tamaños adaptables y verifique el contenido.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué hace const en JavaScript? Evalúe la justificación de la decisión.",
        "options": [
          "Impide reasignar la referencia; Const no impide modificar propiedades de un objeto.",
          "Vuelve inmutable todo objeto",
          "Cifra la variable",
          "Solo permite números"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Const no impide modificar propiedades de un objeto.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué compara === en JavaScript? Evalúe la justificación de la decisión.",
        "options": [
          "Igualdad sin conversión de tipos; La igualdad estricta no hace coerción de tipos.",
          "Asigna un valor",
          "Compara solo longitud",
          "Concatena textos"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. La igualdad estricta no hace coerción de tipos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. Una promesa rechazada requiere: Evalúe la justificación de la decisión.",
        "options": [
          "Manejo de error y respuesta útil; Muestre una recuperación adecuada sin filtrar secretos.",
          "Ignorar el rechazo",
          "Declarar éxito",
          "Recargar sin límite"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Muestre una recuperación adecuada sin filtrar secretos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué método HTTP suele solicitar un recurso sin modificarlo? Evalúe la justificación de la decisión.",
        "options": [
          "GET; GET debe ser una lectura; no utilice enlaces para borrar.",
          "DELETE",
          "PATCH",
          "POST"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. GET debe ser una lectura; no utilice enlaces para borrar.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué indica el estado HTTP 404? Evalúe la justificación de la decisión.",
        "options": [
          "Recurso no encontrado; 404 indica que el recurso solicitado no se encuentra.",
          "Todo correcto",
          "No autorizado siempre",
          "Error de sintaxis CSS"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. 404 indica que el recurso solicitado no se encuentra.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué indica HTTP 401? Evalúe la justificación de la decisión.",
        "options": [
          "Falta autenticación válida; 401 pide credenciales válidas; 403 es prohibición de acceso.",
          "Fallo de CSS",
          "Recurso movido siempre",
          "Éxito sin contenido"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. 401 pide credenciales válidas; 403 es prohibición de acceso.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué debería verificar un servidor antes de modificar datos? Evalúe la justificación de la decisión.",
        "options": [
          "Identidad, permiso y datos de entrada; La autorización y validación se hacen en el servidor.",
          "Solo el texto del botón",
          "Solo resolución de pantalla",
          "Solo idioma"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. La autorización y validación se hacen en el servidor.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué reduce XSS al mostrar entrada no confiable? Evalúe la justificación de la decisión.",
        "options": [
          "Salida escapada y controles de contenido; Evite ejecutar contenido no confiable; aplique defensa por capas.",
          "Insertar HTML arbitrario",
          "Desactivar HTTPS",
          "Cambiar el logotipo"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Evite ejecutar contenido no confiable; aplique defensa por capas.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué significa una interfaz accesible? Evalúe la justificación de la decisión.",
        "options": [
          "Operable y comprensible con distintas capacidades; Accesibilidad abarca percepción, operación y comprensión.",
          "Solo tener colores claros",
          "Solo usar imágenes",
          "Prohibir tecnología asistiva"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Accesibilidad abarca percepción, operación y comprensión.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué representa JSON? Evalúe la justificación de la decisión.",
        "options": [
          "Un formato de datos estructurados; JSON expresa objetos, arreglos y valores.",
          "Un lenguaje de estilos",
          "Una clave secreta",
          "Un protocolo de correo"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. JSON expresa objetos, arreglos y valores.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué debe hacer un formulario ante datos inválidos? Evalúe la justificación de la decisión.",
        "options": [
          "Mostrar un error asociado al campo; La retroalimentación debe ser clara y accesible.",
          "Borrar todo sin avisar",
          "Declarar éxito",
          "Ocultar el campo"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. La retroalimentación debe ser clara y accesible.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué mejora el rendimiento de imágenes? Evalúe la justificación de la decisión.",
        "options": [
          "Tamaño adecuado y carga diferida cuando corresponde; No retrase la imagen principal crítica; optimice dimensiones.",
          "Siempre el archivo más grande",
          "Duplicar todas las fotos",
          "Convertirlas a texto"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. No retrase la imagen principal crítica; optimice dimensiones.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué prueba verifica un flujo del usuario completo? Evalúe la justificación de la decisión.",
        "options": [
          "Prueba de extremo a extremo; Reproduce acciones y resultados en el entorno real.",
          "Solo contar archivos",
          "Solo compilar CSS",
          "Solo revisar nombres"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Reproduce acciones y resultados en el entorno real.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 2
      }
    ]
  },
  {
    "id": "study-web-b3-v1",
    "title": "Desarrollo web · Bloque 3 · Caso Empresa de mantenimiento",
    "emoji": "💻",
    "level": "Preparación independiente · 20 preguntas originales; no examen oficial",
    "questions": [
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué elemento representa la navegación principal?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "nav; Use semántica HTML que describa la función.",
          "span",
          "b",
          "br"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Use semántica HTML que describa la función.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Cómo se asocia una etiqueta con un campo?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "label con for igual al id del input; Una etiqueta programática ayuda a lectores de pantalla.",
          "Un div visual cercano",
          "Un color igual",
          "Un placeholder como único nombre"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Una etiqueta programática ayuda a lectores de pantalla.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué elemento nativo ejecuta una acción?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "button; Button ofrece activación por teclado y semántica.",
          "Un div sin teclado",
          "Una imagen sin nombre",
          "Un párrafo"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Button ofrece activación por teclado y semántica.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. Una imagen informativa necesita:Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Texto alternativo que comunique su contenido; Describa la información relevante; las decorativas usan alt vacío.",
          "Siempre alt vacío",
          "Solo nombre del archivo",
          "Solo color"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Describa la información relevante; las decorativas usan alt vacío.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué facilita navegación con teclado?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Foco visible y orden lógico; El foco debe ser visible y alcanzar acciones importantes.",
          "Eliminar el contorno de foco",
          "Solo eventos de mouse",
          "Bloquear la tecla Tab"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. El foco debe ser visible y alcanzar acciones importantes.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. En CSS, display: grid sirve para:Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Organizar filas y columnas; Grid organiza la presentación, no datos remotos.",
          "Consultar una base de datos",
          "Enviar correos",
          "Validar identidad"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Grid organiza la presentación, no datos remotos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué ayuda a evitar desbordamiento en pantallas estrechas?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Dimensiones flexibles y ajuste de contenido; Diseñe tamaños adaptables y verifique el contenido.",
          "Ancho fijo mayor que la pantalla",
          "Ocultar todo el texto",
          "Desactivar zoom"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Diseñe tamaños adaptables y verifique el contenido.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué hace const en JavaScript?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Impide reasignar la referencia; Const no impide modificar propiedades de un objeto.",
          "Vuelve inmutable todo objeto",
          "Cifra la variable",
          "Solo permite números"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Const no impide modificar propiedades de un objeto.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué compara === en JavaScript?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Igualdad sin conversión de tipos; La igualdad estricta no hace coerción de tipos.",
          "Asigna un valor",
          "Compara solo longitud",
          "Concatena textos"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. La igualdad estricta no hace coerción de tipos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. Una promesa rechazada requiere:Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Manejo de error y respuesta útil; Muestre una recuperación adecuada sin filtrar secretos.",
          "Ignorar el rechazo",
          "Declarar éxito",
          "Recargar sin límite"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Muestre una recuperación adecuada sin filtrar secretos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué método HTTP suele solicitar un recurso sin modificarlo?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "GET; GET debe ser una lectura; no utilice enlaces para borrar.",
          "DELETE",
          "PATCH",
          "POST"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. GET debe ser una lectura; no utilice enlaces para borrar.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué indica el estado HTTP 404?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Recurso no encontrado; 404 indica que el recurso solicitado no se encuentra.",
          "Todo correcto",
          "No autorizado siempre",
          "Error de sintaxis CSS"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. 404 indica que el recurso solicitado no se encuentra.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué indica HTTP 401?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Falta autenticación válida; 401 pide credenciales válidas; 403 es prohibición de acceso.",
          "Fallo de CSS",
          "Recurso movido siempre",
          "Éxito sin contenido"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. 401 pide credenciales válidas; 403 es prohibición de acceso.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué debería verificar un servidor antes de modificar datos?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Identidad, permiso y datos de entrada; La autorización y validación se hacen en el servidor.",
          "Solo el texto del botón",
          "Solo resolución de pantalla",
          "Solo idioma"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. La autorización y validación se hacen en el servidor.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué reduce XSS al mostrar entrada no confiable?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Salida escapada y controles de contenido; Evite ejecutar contenido no confiable; aplique defensa por capas.",
          "Insertar HTML arbitrario",
          "Desactivar HTTPS",
          "Cambiar el logotipo"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Evite ejecutar contenido no confiable; aplique defensa por capas.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué significa una interfaz accesible?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Operable y comprensible con distintas capacidades; Accesibilidad abarca percepción, operación y comprensión.",
          "Solo tener colores claros",
          "Solo usar imágenes",
          "Prohibir tecnología asistiva"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Accesibilidad abarca percepción, operación y comprensión.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué representa JSON?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Un formato de datos estructurados; JSON expresa objetos, arreglos y valores.",
          "Un lenguaje de estilos",
          "Una clave secreta",
          "Un protocolo de correo"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. JSON expresa objetos, arreglos y valores.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué debe hacer un formulario ante datos inválidos?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Mostrar un error asociado al campo; La retroalimentación debe ser clara y accesible.",
          "Borrar todo sin avisar",
          "Declarar éxito",
          "Ocultar el campo"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. La retroalimentación debe ser clara y accesible.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué mejora el rendimiento de imágenes?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Tamaño adecuado y carga diferida cuando corresponde; No retrase la imagen principal crítica; optimice dimensiones.",
          "Siempre el archivo más grande",
          "Duplicar todas las fotos",
          "Convertirlas a texto"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. No retrase la imagen principal crítica; optimice dimensiones.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué prueba verifica un flujo del usuario completo?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Prueba de extremo a extremo; Reproduce acciones y resultados en el entorno real.",
          "Solo contar archivos",
          "Solo compilar CSS",
          "Solo revisar nombres"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Reproduce acciones y resultados en el entorno real.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://developer.mozilla.org/en-US/docs/Learn_web_development",
        "difficulty": 3
      }
    ]
  },
  {
    "id": "study-architecture-b1-v1",
    "title": "Arquitectura de software · Bloque 1 · Caso Laboratorio de formación",
    "emoji": "🏗️",
    "level": "Preparación independiente · 20 preguntas originales; no examen oficial",
    "questions": [
      {
        "q": "Caso Laboratorio de formación. ¿Qué reduce acoplamiento entre módulos?",
        "options": [
          "Contratos claros y dependencias limitadas",
          "Acceso a todos los detalles internos",
          "Copiar lógica en cada módulo",
          "Una variable global para todo"
        ],
        "answer": 0,
        "why": "Contratos estables evitan dependencia de detalles internos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. Una responsabilidad bien delimitada favorece:",
        "options": [
          "Alta cohesión",
          "Cambios dispersos sin relación",
          "Duplicación inevitable",
          "Ausencia de pruebas"
        ],
        "answer": 0,
        "why": "Cohesión agrupa funciones relacionadas.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué caracteriza una arquitectura por capas?",
        "options": [
          "Responsabilidades separadas con límites definidos",
          "Todo código en una sola función",
          "Cada vista escribe directamente cualquier tabla",
          "Sin contratos"
        ],
        "answer": 0,
        "why": "Capas separan presentación, dominio y acceso a datos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué permite cambiar una implementación sin cambiar al cliente?",
        "options": [
          "Dependencia de una abstracción",
          "Dependencia de detalles privados",
          "Copiar el código cliente",
          "Eliminar tipos"
        ],
        "answer": 0,
        "why": "Una interfaz separa contrato e implementación.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Cuándo conviene un monolito modular?",
        "options": [
          "Cuando simplicidad operativa y límites claros son suficientes",
          "Nunca es válido",
          "Solo si no hay usuarios",
          "Siempre antes de evaluar requisitos"
        ],
        "answer": 0,
        "why": "No imponga microservicios sin una necesidad real.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué costo agregan los microservicios?",
        "options": [
          "Comunicación distribuida y operación más compleja",
          "Eliminan fallos de red",
          "Garantizan consistencia inmediata",
          "Eliminan observabilidad"
        ],
        "answer": 0,
        "why": "Distribuir introduce fallos parciales y coordinación.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué evita aplicar dos veces el mismo cobro al reintentar?",
        "options": [
          "Idempotencia con clave y registro persistido",
          "Un texto que diga éxito",
          "Un número aleatorio nuevo por reintento",
          "Borrar el historial"
        ],
        "answer": 0,
        "why": "Reintentos de la misma operación deben compartir identidad.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. Una transacción de base de datos permite:",
        "options": [
          "Confirmar o revertir un conjunto de cambios",
          "Acelerar toda red",
          "Eliminar toda validación",
          "Compartir todas las claves"
        ],
        "answer": 0,
        "why": "Atomicidad evita estados parciales dentro de su alcance.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué expresa consistencia eventual?",
        "options": [
          "Las réplicas pueden converger tras un intervalo",
          "Todos leen siempre el mismo dato inmediato",
          "Los datos nunca cambian",
          "No se requiere tratar conflictos"
        ],
        "answer": 0,
        "why": "No implica consistencia inmediata ni ausencia de conflictos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué riesgo tiene una caché?",
        "options": [
          "Servir información desactualizada",
          "Impide toda lectura",
          "Siempre pierde datos",
          "Elimina necesidad de autorización"
        ],
        "answer": 0,
        "why": "Diseñe caducidad e invalidación y no mezcle datos privados.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué favorece un contrato de API versionado?",
        "options": [
          "Evolución compatible y cambios explícitos",
          "Romper consumidores sin aviso",
          "Eliminar documentación",
          "Cambiar respuesta al azar"
        ],
        "answer": 0,
        "why": "Mantenga compatibilidad o publique una transición clara.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué objetivo tiene un timeout?",
        "options": [
          "Limitar espera por una dependencia",
          "Garantizar éxito",
          "Reintentar para siempre",
          "Eliminar latencia"
        ],
        "answer": 0,
        "why": "La espera acotada evita bloquear recursos indefinidamente.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué hace un circuit breaker?",
        "options": [
          "Interrumpe llamadas a una dependencia con fallos persistentes",
          "Encripta todo",
          "Borra errores",
          "Aumenta llamadas sin límite"
        ],
        "answer": 0,
        "why": "Permite recuperación y evita sobrecargar un servicio fallando.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué información ayuda a seguir una solicitud entre servicios?",
        "options": [
          "Identificador de correlación",
          "Contraseña del usuario",
          "Solo el nombre del proyecto",
          "Imagen de fondo"
        ],
        "answer": 0,
        "why": "Correlación conecta registros de la misma operación.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué son requisitos no funcionales?",
        "options": [
          "Calidad como seguridad, disponibilidad y rendimiento",
          "Solo botones visibles",
          "Solo el precio",
          "Solo nombres de tablas"
        ],
        "answer": 0,
        "why": "Definen cómo debe comportarse el sistema.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué mide latencia?",
        "options": [
          "Tiempo de respuesta",
          "Cantidad total de cuentas",
          "Número de módulos",
          "Espacio de pantalla"
        ],
        "answer": 0,
        "why": "Mida percentiles y contexto, no solo promedios.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué es escalado horizontal?",
        "options": [
          "Agregar instancias",
          "Aumentar memoria de una sola instancia",
          "Eliminar monitoreo",
          "Cambiar idioma"
        ],
        "answer": 0,
        "why": "Más instancias requiere gestionar estado y distribución.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué debe documentar una decisión arquitectónica?",
        "options": [
          "Contexto, alternativas, decisión y consecuencias",
          "Solo el ganador de una votación",
          "Todas las claves",
          "Únicamente un diagrama bonito"
        ],
        "answer": 0,
        "why": "Un registro permite revisar decisiones cuando cambia el contexto.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué reduce riesgo al modificar un sistema legado?",
        "options": [
          "Cambios incrementales con pruebas de comportamiento",
          "Reescribir todo sin pruebas",
          "Eliminar historial",
          "Cambiar todos los contratos a la vez"
        ],
        "answer": 0,
        "why": "Un avance incremental facilita detectar regresiones.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué debe proteger un límite de confianza?",
        "options": [
          "Validación y autorización de entradas externas",
          "Asumir todo dato correcto",
          "Confiar en campos editables del cliente",
          "Desactivar auditoría"
        ],
        "answer": 0,
        "why": "Cada límite necesita controles apropiados.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 1
      }
    ]
  },
  {
    "id": "study-architecture-b2-v1",
    "title": "Arquitectura de software · Bloque 2 · Caso Cooperativa de servicios",
    "emoji": "🏗️",
    "level": "Preparación independiente · 20 preguntas originales; no examen oficial",
    "questions": [
      {
        "q": "Caso Cooperativa de servicios. ¿Qué reduce acoplamiento entre módulos? Evalúe la justificación de la decisión.",
        "options": [
          "Contratos claros y dependencias limitadas; Contratos estables evitan dependencia de detalles internos.",
          "Acceso a todos los detalles internos",
          "Copiar lógica en cada módulo",
          "Una variable global para todo"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Contratos estables evitan dependencia de detalles internos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. Una responsabilidad bien delimitada favorece: Evalúe la justificación de la decisión.",
        "options": [
          "Alta cohesión; Cohesión agrupa funciones relacionadas.",
          "Cambios dispersos sin relación",
          "Duplicación inevitable",
          "Ausencia de pruebas"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Cohesión agrupa funciones relacionadas.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué caracteriza una arquitectura por capas? Evalúe la justificación de la decisión.",
        "options": [
          "Responsabilidades separadas con límites definidos; Capas separan presentación, dominio y acceso a datos.",
          "Todo código en una sola función",
          "Cada vista escribe directamente cualquier tabla",
          "Sin contratos"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Capas separan presentación, dominio y acceso a datos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué permite cambiar una implementación sin cambiar al cliente? Evalúe la justificación de la decisión.",
        "options": [
          "Dependencia de una abstracción; Una interfaz separa contrato e implementación.",
          "Dependencia de detalles privados",
          "Copiar el código cliente",
          "Eliminar tipos"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Una interfaz separa contrato e implementación.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Cuándo conviene un monolito modular? Evalúe la justificación de la decisión.",
        "options": [
          "Cuando simplicidad operativa y límites claros son suficientes; No imponga microservicios sin una necesidad real.",
          "Nunca es válido",
          "Solo si no hay usuarios",
          "Siempre antes de evaluar requisitos"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. No imponga microservicios sin una necesidad real.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué costo agregan los microservicios? Evalúe la justificación de la decisión.",
        "options": [
          "Comunicación distribuida y operación más compleja; Distribuir introduce fallos parciales y coordinación.",
          "Eliminan fallos de red",
          "Garantizan consistencia inmediata",
          "Eliminan observabilidad"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Distribuir introduce fallos parciales y coordinación.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué evita aplicar dos veces el mismo cobro al reintentar? Evalúe la justificación de la decisión.",
        "options": [
          "Idempotencia con clave y registro persistido; Reintentos de la misma operación deben compartir identidad.",
          "Un texto que diga éxito",
          "Un número aleatorio nuevo por reintento",
          "Borrar el historial"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Reintentos de la misma operación deben compartir identidad.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. Una transacción de base de datos permite: Evalúe la justificación de la decisión.",
        "options": [
          "Confirmar o revertir un conjunto de cambios; Atomicidad evita estados parciales dentro de su alcance.",
          "Acelerar toda red",
          "Eliminar toda validación",
          "Compartir todas las claves"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Atomicidad evita estados parciales dentro de su alcance.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué expresa consistencia eventual? Evalúe la justificación de la decisión.",
        "options": [
          "Las réplicas pueden converger tras un intervalo; No implica consistencia inmediata ni ausencia de conflictos.",
          "Todos leen siempre el mismo dato inmediato",
          "Los datos nunca cambian",
          "No se requiere tratar conflictos"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. No implica consistencia inmediata ni ausencia de conflictos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué riesgo tiene una caché? Evalúe la justificación de la decisión.",
        "options": [
          "Servir información desactualizada; Diseñe caducidad e invalidación y no mezcle datos privados.",
          "Impide toda lectura",
          "Siempre pierde datos",
          "Elimina necesidad de autorización"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Diseñe caducidad e invalidación y no mezcle datos privados.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué favorece un contrato de API versionado? Evalúe la justificación de la decisión.",
        "options": [
          "Evolución compatible y cambios explícitos; Mantenga compatibilidad o publique una transición clara.",
          "Romper consumidores sin aviso",
          "Eliminar documentación",
          "Cambiar respuesta al azar"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Mantenga compatibilidad o publique una transición clara.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué objetivo tiene un timeout? Evalúe la justificación de la decisión.",
        "options": [
          "Limitar espera por una dependencia; La espera acotada evita bloquear recursos indefinidamente.",
          "Garantizar éxito",
          "Reintentar para siempre",
          "Eliminar latencia"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. La espera acotada evita bloquear recursos indefinidamente.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué hace un circuit breaker? Evalúe la justificación de la decisión.",
        "options": [
          "Interrumpe llamadas a una dependencia con fallos persistentes; Permite recuperación y evita sobrecargar un servicio fallando.",
          "Encripta todo",
          "Borra errores",
          "Aumenta llamadas sin límite"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Permite recuperación y evita sobrecargar un servicio fallando.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué información ayuda a seguir una solicitud entre servicios? Evalúe la justificación de la decisión.",
        "options": [
          "Identificador de correlación; Correlación conecta registros de la misma operación.",
          "Contraseña del usuario",
          "Solo el nombre del proyecto",
          "Imagen de fondo"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Correlación conecta registros de la misma operación.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué son requisitos no funcionales? Evalúe la justificación de la decisión.",
        "options": [
          "Calidad como seguridad, disponibilidad y rendimiento; Definen cómo debe comportarse el sistema.",
          "Solo botones visibles",
          "Solo el precio",
          "Solo nombres de tablas"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Definen cómo debe comportarse el sistema.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué mide latencia? Evalúe la justificación de la decisión.",
        "options": [
          "Tiempo de respuesta; Mida percentiles y contexto, no solo promedios.",
          "Cantidad total de cuentas",
          "Número de módulos",
          "Espacio de pantalla"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Mida percentiles y contexto, no solo promedios.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué es escalado horizontal? Evalúe la justificación de la decisión.",
        "options": [
          "Agregar instancias; Más instancias requiere gestionar estado y distribución.",
          "Aumentar memoria de una sola instancia",
          "Eliminar monitoreo",
          "Cambiar idioma"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Más instancias requiere gestionar estado y distribución.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué debe documentar una decisión arquitectónica? Evalúe la justificación de la decisión.",
        "options": [
          "Contexto, alternativas, decisión y consecuencias; Un registro permite revisar decisiones cuando cambia el contexto.",
          "Solo el ganador de una votación",
          "Todas las claves",
          "Únicamente un diagrama bonito"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Un registro permite revisar decisiones cuando cambia el contexto.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué reduce riesgo al modificar un sistema legado? Evalúe la justificación de la decisión.",
        "options": [
          "Cambios incrementales con pruebas de comportamiento; Un avance incremental facilita detectar regresiones.",
          "Reescribir todo sin pruebas",
          "Eliminar historial",
          "Cambiar todos los contratos a la vez"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Un avance incremental facilita detectar regresiones.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué debe proteger un límite de confianza? Evalúe la justificación de la decisión.",
        "options": [
          "Validación y autorización de entradas externas; Cada límite necesita controles apropiados.",
          "Asumir todo dato correcto",
          "Confiar en campos editables del cliente",
          "Desactivar auditoría"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Cada límite necesita controles apropiados.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 2
      }
    ]
  },
  {
    "id": "study-architecture-b3-v1",
    "title": "Arquitectura de software · Bloque 3 · Caso Empresa de mantenimiento",
    "emoji": "🏗️",
    "level": "Preparación independiente · 20 preguntas originales; no examen oficial",
    "questions": [
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué reduce acoplamiento entre módulos?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Contratos claros y dependencias limitadas; Contratos estables evitan dependencia de detalles internos.",
          "Acceso a todos los detalles internos",
          "Copiar lógica en cada módulo",
          "Una variable global para todo"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Contratos estables evitan dependencia de detalles internos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. Una responsabilidad bien delimitada favorece:Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Alta cohesión; Cohesión agrupa funciones relacionadas.",
          "Cambios dispersos sin relación",
          "Duplicación inevitable",
          "Ausencia de pruebas"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Cohesión agrupa funciones relacionadas.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué caracteriza una arquitectura por capas?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Responsabilidades separadas con límites definidos; Capas separan presentación, dominio y acceso a datos.",
          "Todo código en una sola función",
          "Cada vista escribe directamente cualquier tabla",
          "Sin contratos"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Capas separan presentación, dominio y acceso a datos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué permite cambiar una implementación sin cambiar al cliente?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Dependencia de una abstracción; Una interfaz separa contrato e implementación.",
          "Dependencia de detalles privados",
          "Copiar el código cliente",
          "Eliminar tipos"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Una interfaz separa contrato e implementación.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Cuándo conviene un monolito modular?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Cuando simplicidad operativa y límites claros son suficientes; No imponga microservicios sin una necesidad real.",
          "Nunca es válido",
          "Solo si no hay usuarios",
          "Siempre antes de evaluar requisitos"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. No imponga microservicios sin una necesidad real.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué costo agregan los microservicios?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Comunicación distribuida y operación más compleja; Distribuir introduce fallos parciales y coordinación.",
          "Eliminan fallos de red",
          "Garantizan consistencia inmediata",
          "Eliminan observabilidad"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Distribuir introduce fallos parciales y coordinación.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué evita aplicar dos veces el mismo cobro al reintentar?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Idempotencia con clave y registro persistido; Reintentos de la misma operación deben compartir identidad.",
          "Un texto que diga éxito",
          "Un número aleatorio nuevo por reintento",
          "Borrar el historial"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Reintentos de la misma operación deben compartir identidad.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. Una transacción de base de datos permite:Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Confirmar o revertir un conjunto de cambios; Atomicidad evita estados parciales dentro de su alcance.",
          "Acelerar toda red",
          "Eliminar toda validación",
          "Compartir todas las claves"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Atomicidad evita estados parciales dentro de su alcance.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué expresa consistencia eventual?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Las réplicas pueden converger tras un intervalo; No implica consistencia inmediata ni ausencia de conflictos.",
          "Todos leen siempre el mismo dato inmediato",
          "Los datos nunca cambian",
          "No se requiere tratar conflictos"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. No implica consistencia inmediata ni ausencia de conflictos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué riesgo tiene una caché?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Servir información desactualizada; Diseñe caducidad e invalidación y no mezcle datos privados.",
          "Impide toda lectura",
          "Siempre pierde datos",
          "Elimina necesidad de autorización"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Diseñe caducidad e invalidación y no mezcle datos privados.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué favorece un contrato de API versionado?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Evolución compatible y cambios explícitos; Mantenga compatibilidad o publique una transición clara.",
          "Romper consumidores sin aviso",
          "Eliminar documentación",
          "Cambiar respuesta al azar"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Mantenga compatibilidad o publique una transición clara.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué objetivo tiene un timeout?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Limitar espera por una dependencia; La espera acotada evita bloquear recursos indefinidamente.",
          "Garantizar éxito",
          "Reintentar para siempre",
          "Eliminar latencia"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. La espera acotada evita bloquear recursos indefinidamente.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué hace un circuit breaker?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Interrumpe llamadas a una dependencia con fallos persistentes; Permite recuperación y evita sobrecargar un servicio fallando.",
          "Encripta todo",
          "Borra errores",
          "Aumenta llamadas sin límite"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Permite recuperación y evita sobrecargar un servicio fallando.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué información ayuda a seguir una solicitud entre servicios?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Identificador de correlación; Correlación conecta registros de la misma operación.",
          "Contraseña del usuario",
          "Solo el nombre del proyecto",
          "Imagen de fondo"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Correlación conecta registros de la misma operación.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué son requisitos no funcionales?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Calidad como seguridad, disponibilidad y rendimiento; Definen cómo debe comportarse el sistema.",
          "Solo botones visibles",
          "Solo el precio",
          "Solo nombres de tablas"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Definen cómo debe comportarse el sistema.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué mide latencia?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Tiempo de respuesta; Mida percentiles y contexto, no solo promedios.",
          "Cantidad total de cuentas",
          "Número de módulos",
          "Espacio de pantalla"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Mida percentiles y contexto, no solo promedios.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué es escalado horizontal?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Agregar instancias; Más instancias requiere gestionar estado y distribución.",
          "Aumentar memoria de una sola instancia",
          "Eliminar monitoreo",
          "Cambiar idioma"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Más instancias requiere gestionar estado y distribución.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué debe documentar una decisión arquitectónica?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Contexto, alternativas, decisión y consecuencias; Un registro permite revisar decisiones cuando cambia el contexto.",
          "Solo el ganador de una votación",
          "Todas las claves",
          "Únicamente un diagrama bonito"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Un registro permite revisar decisiones cuando cambia el contexto.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué reduce riesgo al modificar un sistema legado?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Cambios incrementales con pruebas de comportamiento; Un avance incremental facilita detectar regresiones.",
          "Reescribir todo sin pruebas",
          "Eliminar historial",
          "Cambiar todos los contratos a la vez"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Un avance incremental facilita detectar regresiones.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué debe proteger un límite de confianza?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Validación y autorización de entradas externas; Cada límite necesita controles apropiados.",
          "Asumir todo dato correcto",
          "Confiar en campos editables del cliente",
          "Desactivar auditoría"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Cada límite necesita controles apropiados.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://learn.microsoft.com/en-us/azure/architecture/guide/",
        "difficulty": 3
      }
    ]
  },
  {
    "id": "study-accounting-b1-v1",
    "title": "Contabilidad · Accounting · Bloque 1 · Caso Laboratorio de formación",
    "emoji": "🧾",
    "level": "Preparación independiente · 20 preguntas originales; no examen oficial",
    "questions": [
      {
        "q": "Caso Laboratorio de formación. Activos 1200 y pasivos 450. ¿Patrimonio?",
        "options": [
          "750",
          "1650",
          "450",
          "1200"
        ],
        "answer": 0,
        "why": "Activo − pasivo = patrimonio: 1200 − 450 = 750.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. Una compra de equipo al contado cambia:",
        "options": [
          "Equipo aumenta y efectivo disminuye",
          "Solo patrimonio aumenta",
          "Pasivos aumentan siempre",
          "Ingresos aumentan"
        ],
        "answer": 0,
        "why": "Es intercambio entre activos, sin ingreso inmediato.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué significa accounts receivable?",
        "options": [
          "Cuentas por cobrar",
          "Cuentas por pagar",
          "Inventario",
          "Gasto de alquiler"
        ],
        "answer": 0,
        "why": "Representa derechos de cobro.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué significa accounts payable?",
        "options": [
          "Cuentas por pagar",
          "Ventas",
          "Cuentas por cobrar",
          "Efectivo"
        ],
        "answer": 0,
        "why": "Representa obligaciones de pago.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. Ingresos 900 y gastos 650. ¿Resultado simplificado?",
        "options": [
          "Utilidad de 250",
          "Pérdida de 250",
          "Utilidad de 1550",
          "Utilidad de 650"
        ],
        "answer": 0,
        "why": "900 − 650 = 250, sin otros conceptos en este modelo.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué muestra el estado de situación financiera?",
        "options": [
          "Activos, pasivos y patrimonio a una fecha",
          "Solo ventas futuras",
          "Solo horas trabajadas",
          "Solo costos unitarios"
        ],
        "answer": 0,
        "why": "Es una fotografía financiera a una fecha.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué muestra un estado de resultados?",
        "options": [
          "Ingresos y gastos de un período",
          "Solo saldos de caja a una fecha",
          "Todos los empleados",
          "Solo deudas"
        ],
        "answer": 0,
        "why": "Resume desempeño durante un período.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué caracteriza un costo fijo dentro del rango relevante?",
        "options": [
          "No cambia en total por volumen dentro de ese rango",
          "Nunca cambia bajo ningún contexto",
          "Siempre crece por unidad",
          "Es siempre cero"
        ],
        "answer": 0,
        "why": "Fijo se refiere a comportamiento dentro de supuestos y rango.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué caracteriza un costo variable total?",
        "options": [
          "Cambia con el nivel de actividad",
          "Siempre es constante",
          "Es patrimonio",
          "Es un préstamo"
        ],
        "answer": 0,
        "why": "Ejemplo: material por unidad multiplicado por producción.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. Precio 100, costo variable 60. ¿Contribución unitaria?",
        "options": [
          "40",
          "160",
          "60",
          "100"
        ],
        "answer": 0,
        "why": "100 − 60 = 40 para cubrir costos fijos y resultado.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. Costo fijo 200 y contribución unitaria 40. ¿Equilibrio?",
        "options": [
          "5 unidades",
          "8 unidades",
          "40 unidades",
          "200 unidades"
        ],
        "answer": 0,
        "why": "200 ÷ 40 = 5, bajo el modelo lineal simplificado.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué representa revenue?",
        "options": [
          "Ingresos",
          "Pasivos",
          "Patrimonio",
          "Inventario"
        ],
        "answer": 0,
        "why": "Revenue se refiere a ingresos de actividades, no a utilidad neta.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué representa equity?",
        "options": [
          "Patrimonio",
          "Solo efectivo",
          "Gastos",
          "Impuestos"
        ],
        "answer": 0,
        "why": "Equity es la participación residual tras restar pasivos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué es conciliación bancaria?",
        "options": [
          "Comparar libros y estado bancario y explicar diferencias",
          "Borrar diferencias sin revisar",
          "Sumar todas las entradas dos veces",
          "Inventar depósitos"
        ],
        "answer": 0,
        "why": "Identifique pendientes, comisiones y errores con evidencia.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué documento respalda una venta facturada?",
        "options": [
          "Factura",
          "Contraseña",
          "Horario de clase",
          "Diagrama de red"
        ],
        "answer": 0,
        "why": "La factura documenta una operación; su emisión no prueba pago.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué diferencia ingreso de cobro?",
        "options": [
          "Pueden ocurrir en fechas diferentes",
          "Son siempre simultáneos",
          "Cobro es siempre un gasto",
          "Ingreso elimina toda cuenta por cobrar"
        ],
        "answer": 0,
        "why": "Una venta a crédito puede reconocer ingreso antes del cobro.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué es depreciación en un modelo contable?",
        "options": [
          "Distribución del importe depreciable durante la vida útil",
          "Siempre valor de mercado exacto",
          "Un cobro al cliente",
          "Un aumento de efectivo"
        ],
        "answer": 0,
        "why": "No equivale necesariamente a pérdida de valor de mercado.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué significa FIFO / PEPS?",
        "options": [
          "Primero en entrar, primero en salir",
          "Último en entrar, primero en salir",
          "Promedio ponderado",
          "Inventario sin control"
        ],
        "answer": 0,
        "why": "El flujo de costos asigna primero las unidades más antiguas.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué busca separación de funciones?",
        "options": [
          "Reducir riesgo de error o fraude mediante controles",
          "Todos usan la misma contraseña",
          "Una sola persona controla todo sin revisión",
          "Eliminar registros"
        ],
        "answer": 0,
        "why": "Distribuya autorización, custodia y registro cuando sea viable.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 1
      },
      {
        "q": "Caso Laboratorio de formación. ¿Qué significa due date?",
        "options": [
          "Fecha de vencimiento",
          "Fecha de nacimiento",
          "Fecha de contratación",
          "Valor del inventario"
        ],
        "answer": 0,
        "why": "Es la fecha límite del pago o compromiso.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 1
      }
    ]
  },
  {
    "id": "study-accounting-b2-v1",
    "title": "Contabilidad · Accounting · Bloque 2 · Caso Cooperativa de servicios",
    "emoji": "🧾",
    "level": "Preparación independiente · 20 preguntas originales; no examen oficial",
    "questions": [
      {
        "q": "Caso Cooperativa de servicios. Activos 1200 y pasivos 450. ¿Patrimonio? Evalúe la justificación de la decisión.",
        "options": [
          "750; Activo − pasivo = patrimonio: 1200 − 450 = 750.",
          "1650",
          "450",
          "1200"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Activo − pasivo = patrimonio: 1200 − 450 = 750.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. Una compra de equipo al contado cambia: Evalúe la justificación de la decisión.",
        "options": [
          "Equipo aumenta y efectivo disminuye; Es intercambio entre activos, sin ingreso inmediato.",
          "Solo patrimonio aumenta",
          "Pasivos aumentan siempre",
          "Ingresos aumentan"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Es intercambio entre activos, sin ingreso inmediato.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué significa accounts receivable? Evalúe la justificación de la decisión.",
        "options": [
          "Cuentas por cobrar; Representa derechos de cobro.",
          "Cuentas por pagar",
          "Inventario",
          "Gasto de alquiler"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Representa derechos de cobro.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué significa accounts payable? Evalúe la justificación de la decisión.",
        "options": [
          "Cuentas por pagar; Representa obligaciones de pago.",
          "Ventas",
          "Cuentas por cobrar",
          "Efectivo"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Representa obligaciones de pago.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. Ingresos 900 y gastos 650. ¿Resultado simplificado? Evalúe la justificación de la decisión.",
        "options": [
          "Utilidad de 250; 900 − 650 = 250, sin otros conceptos en este modelo.",
          "Pérdida de 250",
          "Utilidad de 1550",
          "Utilidad de 650"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. 900 − 650 = 250, sin otros conceptos en este modelo.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué muestra el estado de situación financiera? Evalúe la justificación de la decisión.",
        "options": [
          "Activos, pasivos y patrimonio a una fecha; Es una fotografía financiera a una fecha.",
          "Solo ventas futuras",
          "Solo horas trabajadas",
          "Solo costos unitarios"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Es una fotografía financiera a una fecha.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué muestra un estado de resultados? Evalúe la justificación de la decisión.",
        "options": [
          "Ingresos y gastos de un período; Resume desempeño durante un período.",
          "Solo saldos de caja a una fecha",
          "Todos los empleados",
          "Solo deudas"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Resume desempeño durante un período.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué caracteriza un costo fijo dentro del rango relevante? Evalúe la justificación de la decisión.",
        "options": [
          "No cambia en total por volumen dentro de ese rango; Fijo se refiere a comportamiento dentro de supuestos y rango.",
          "Nunca cambia bajo ningún contexto",
          "Siempre crece por unidad",
          "Es siempre cero"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Fijo se refiere a comportamiento dentro de supuestos y rango.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué caracteriza un costo variable total? Evalúe la justificación de la decisión.",
        "options": [
          "Cambia con el nivel de actividad; Ejemplo: material por unidad multiplicado por producción.",
          "Siempre es constante",
          "Es patrimonio",
          "Es un préstamo"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Ejemplo: material por unidad multiplicado por producción.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. Precio 100, costo variable 60. ¿Contribución unitaria? Evalúe la justificación de la decisión.",
        "options": [
          "40; 100 − 60 = 40 para cubrir costos fijos y resultado.",
          "160",
          "60",
          "100"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. 100 − 60 = 40 para cubrir costos fijos y resultado.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. Costo fijo 200 y contribución unitaria 40. ¿Equilibrio? Evalúe la justificación de la decisión.",
        "options": [
          "5 unidades; 200 ÷ 40 = 5, bajo el modelo lineal simplificado.",
          "8 unidades",
          "40 unidades",
          "200 unidades"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. 200 ÷ 40 = 5, bajo el modelo lineal simplificado.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué representa revenue? Evalúe la justificación de la decisión.",
        "options": [
          "Ingresos; Revenue se refiere a ingresos de actividades, no a utilidad neta.",
          "Pasivos",
          "Patrimonio",
          "Inventario"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Revenue se refiere a ingresos de actividades, no a utilidad neta.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué representa equity? Evalúe la justificación de la decisión.",
        "options": [
          "Patrimonio; Equity es la participación residual tras restar pasivos.",
          "Solo efectivo",
          "Gastos",
          "Impuestos"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Equity es la participación residual tras restar pasivos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué es conciliación bancaria? Evalúe la justificación de la decisión.",
        "options": [
          "Comparar libros y estado bancario y explicar diferencias; Identifique pendientes, comisiones y errores con evidencia.",
          "Borrar diferencias sin revisar",
          "Sumar todas las entradas dos veces",
          "Inventar depósitos"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Identifique pendientes, comisiones y errores con evidencia.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué documento respalda una venta facturada? Evalúe la justificación de la decisión.",
        "options": [
          "Factura; La factura documenta una operación; su emisión no prueba pago.",
          "Contraseña",
          "Horario de clase",
          "Diagrama de red"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. La factura documenta una operación; su emisión no prueba pago.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué diferencia ingreso de cobro? Evalúe la justificación de la decisión.",
        "options": [
          "Pueden ocurrir en fechas diferentes; Una venta a crédito puede reconocer ingreso antes del cobro.",
          "Son siempre simultáneos",
          "Cobro es siempre un gasto",
          "Ingreso elimina toda cuenta por cobrar"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Una venta a crédito puede reconocer ingreso antes del cobro.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué es depreciación en un modelo contable? Evalúe la justificación de la decisión.",
        "options": [
          "Distribución del importe depreciable durante la vida útil; No equivale necesariamente a pérdida de valor de mercado.",
          "Siempre valor de mercado exacto",
          "Un cobro al cliente",
          "Un aumento de efectivo"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. No equivale necesariamente a pérdida de valor de mercado.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué significa FIFO / PEPS? Evalúe la justificación de la decisión.",
        "options": [
          "Primero en entrar, primero en salir; El flujo de costos asigna primero las unidades más antiguas.",
          "Último en entrar, primero en salir",
          "Promedio ponderado",
          "Inventario sin control"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. El flujo de costos asigna primero las unidades más antiguas.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué busca separación de funciones? Evalúe la justificación de la decisión.",
        "options": [
          "Reducir riesgo de error o fraude mediante controles; Distribuya autorización, custodia y registro cuando sea viable.",
          "Todos usan la misma contraseña",
          "Una sola persona controla todo sin revisión",
          "Eliminar registros"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Distribuya autorización, custodia y registro cuando sea viable.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 2
      },
      {
        "q": "Caso Cooperativa de servicios. ¿Qué significa due date? Evalúe la justificación de la decisión.",
        "options": [
          "Fecha de vencimiento; Es la fecha límite del pago o compromiso.",
          "Fecha de nacimiento",
          "Fecha de contratación",
          "Valor del inventario"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Es la fecha límite del pago o compromiso.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 2
      }
    ]
  },
  {
    "id": "study-accounting-b3-v1",
    "title": "Contabilidad · Accounting · Bloque 3 · Caso Empresa de mantenimiento",
    "emoji": "🧾",
    "level": "Preparación independiente · 20 preguntas originales; no examen oficial",
    "questions": [
      {
        "q": "Caso Empresa de mantenimiento. Activos 1200 y pasivos 450. ¿Patrimonio?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "750; Activo − pasivo = patrimonio: 1200 − 450 = 750.",
          "1650",
          "450",
          "1200"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Activo − pasivo = patrimonio: 1200 − 450 = 750.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. Una compra de equipo al contado cambia:Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Equipo aumenta y efectivo disminuye; Es intercambio entre activos, sin ingreso inmediato.",
          "Solo patrimonio aumenta",
          "Pasivos aumentan siempre",
          "Ingresos aumentan"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Es intercambio entre activos, sin ingreso inmediato.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué significa accounts receivable?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Cuentas por cobrar; Representa derechos de cobro.",
          "Cuentas por pagar",
          "Inventario",
          "Gasto de alquiler"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Representa derechos de cobro.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué significa accounts payable?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Cuentas por pagar; Representa obligaciones de pago.",
          "Ventas",
          "Cuentas por cobrar",
          "Efectivo"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Representa obligaciones de pago.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. Ingresos 900 y gastos 650. ¿Resultado simplificado?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Utilidad de 250; 900 − 650 = 250, sin otros conceptos en este modelo.",
          "Pérdida de 250",
          "Utilidad de 1550",
          "Utilidad de 650"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. 900 − 650 = 250, sin otros conceptos en este modelo.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué muestra el estado de situación financiera?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Activos, pasivos y patrimonio a una fecha; Es una fotografía financiera a una fecha.",
          "Solo ventas futuras",
          "Solo horas trabajadas",
          "Solo costos unitarios"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Es una fotografía financiera a una fecha.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué muestra un estado de resultados?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Ingresos y gastos de un período; Resume desempeño durante un período.",
          "Solo saldos de caja a una fecha",
          "Todos los empleados",
          "Solo deudas"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Resume desempeño durante un período.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué caracteriza un costo fijo dentro del rango relevante?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "No cambia en total por volumen dentro de ese rango; Fijo se refiere a comportamiento dentro de supuestos y rango.",
          "Nunca cambia bajo ningún contexto",
          "Siempre crece por unidad",
          "Es siempre cero"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Fijo se refiere a comportamiento dentro de supuestos y rango.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué caracteriza un costo variable total?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Cambia con el nivel de actividad; Ejemplo: material por unidad multiplicado por producción.",
          "Siempre es constante",
          "Es patrimonio",
          "Es un préstamo"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Ejemplo: material por unidad multiplicado por producción.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. Precio 100, costo variable 60. ¿Contribución unitaria?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "40; 100 − 60 = 40 para cubrir costos fijos y resultado.",
          "160",
          "60",
          "100"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. 100 − 60 = 40 para cubrir costos fijos y resultado.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. Costo fijo 200 y contribución unitaria 40. ¿Equilibrio?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "5 unidades; 200 ÷ 40 = 5, bajo el modelo lineal simplificado.",
          "8 unidades",
          "40 unidades",
          "200 unidades"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. 200 ÷ 40 = 5, bajo el modelo lineal simplificado.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué representa revenue?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Ingresos; Revenue se refiere a ingresos de actividades, no a utilidad neta.",
          "Pasivos",
          "Patrimonio",
          "Inventario"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Revenue se refiere a ingresos de actividades, no a utilidad neta.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué representa equity?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Patrimonio; Equity es la participación residual tras restar pasivos.",
          "Solo efectivo",
          "Gastos",
          "Impuestos"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Equity es la participación residual tras restar pasivos.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué es conciliación bancaria?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Comparar libros y estado bancario y explicar diferencias; Identifique pendientes, comisiones y errores con evidencia.",
          "Borrar diferencias sin revisar",
          "Sumar todas las entradas dos veces",
          "Inventar depósitos"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Identifique pendientes, comisiones y errores con evidencia.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué documento respalda una venta facturada?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Factura; La factura documenta una operación; su emisión no prueba pago.",
          "Contraseña",
          "Horario de clase",
          "Diagrama de red"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. La factura documenta una operación; su emisión no prueba pago.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué diferencia ingreso de cobro?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Pueden ocurrir en fechas diferentes; Una venta a crédito puede reconocer ingreso antes del cobro.",
          "Son siempre simultáneos",
          "Cobro es siempre un gasto",
          "Ingreso elimina toda cuenta por cobrar"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Una venta a crédito puede reconocer ingreso antes del cobro.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué es depreciación en un modelo contable?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Distribución del importe depreciable durante la vida útil; No equivale necesariamente a pérdida de valor de mercado.",
          "Siempre valor de mercado exacto",
          "Un cobro al cliente",
          "Un aumento de efectivo"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. No equivale necesariamente a pérdida de valor de mercado.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué significa FIFO / PEPS?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Primero en entrar, primero en salir; El flujo de costos asigna primero las unidades más antiguas.",
          "Último en entrar, primero en salir",
          "Promedio ponderado",
          "Inventario sin control"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. El flujo de costos asigna primero las unidades más antiguas.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué busca separación de funciones?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Reducir riesgo de error o fraude mediante controles; Distribuya autorización, custodia y registro cuando sea viable.",
          "Todos usan la misma contraseña",
          "Una sola persona controla todo sin revisión",
          "Eliminar registros"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Distribuya autorización, custodia y registro cuando sea viable.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 3
      },
      {
        "q": "Caso Empresa de mantenimiento. ¿Qué significa due date?Seleccione la decisión que respeta los límites del caso.",
        "options": [
          "Fecha de vencimiento; Es la fecha límite del pago o compromiso.",
          "Fecha de nacimiento",
          "Fecha de contratación",
          "Valor del inventario"
        ],
        "answer": 0,
        "why": "Paso 1: identifique el concepto. Paso 2: aplíquelo al caso. Paso 3: descarte opciones que contradicen el principio. Es la fecha límite del pago o compromiso.",
        "source": "GICM. Caso original simplificado. Referencia conceptual: https://www.ifrs.org/issued-standards/list-of-standards/",
        "difficulty": 3
      }
    ]
  }
,
  ...supportDecks,
  ...physicsDecks,
  ...sportsDecks,
  ...socialDecks
];
