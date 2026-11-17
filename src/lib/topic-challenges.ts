import type { Q } from "./questions";
type Pair = [string, string];
type Challenge = [Pair, Pair[], number, Pair];
const challenges: Record<string, Challenge[]> = {
  fracciones: [
    [
      [
        "Se necesitan 3/4 L por mezcla. ¿Cuántos litros se necesitan para 8 mezclas?",
        "Each mixture requires 3/4 L. How many litres are needed for 8 mixtures?",
      ],
      [
        ["6 L", "6 L"],
        ["8,75 L", "8.75 L"],
        ["2 L", "2 L"],
        ["10,67 L", "10.67 L"],
      ],
      0,
      [
        "3/4 × 8 = 6 L. Se multiplica la cantidad por mezcla por el número de mezclas.",
        "3/4 × 8 = 6 L. Multiply the amount per mixture by the number of mixtures.",
      ],
    ],
    [
      [
        "Dos bombas iguales llenan un tanque en 6 horas. Si el caudal se suma sin pérdidas, ¿cuánto tardan 3 bombas?",
        "Two identical pumps fill a tank in 6 hours. If their flow rates add without losses, how long do 3 pumps take?",
      ],
      [
        ["9 h", "9 h"],
        ["4 h", "4 h"],
        ["3 h", "3 h"],
        ["12 h", "12 h"],
      ],
      1,
      [
        "El trabajo es 2 × 6 = 12 bomba-horas. Con 3 bombas: 12 ÷ 3 = 4 h.",
        "The work is 2 × 6 = 12 pump-hours. With 3 pumps: 12 ÷ 3 = 4 h.",
      ],
    ],
  ],
  ecuaciones: [
    [
      ["Si 2(x − 3) = 10, ¿cuál es x?", "If 2(x − 3) = 10, what is x?"],
      [
        ["2", "2"],
        ["5", "5"],
        ["8", "8"],
        ["13", "13"],
      ],
      2,
      [
        "Divida entre 2: x − 3 = 5. Sume 3: x = 8. Compruebe: 2(8 − 3) = 10.",
        "Divide by 2: x − 3 = 5. Add 3: x = 8. Check: 2(8 − 3) = 10.",
      ],
    ],
    [
      ["Si 3x + 4 = x + 18, ¿cuál es x?", "If 3x + 4 = x + 18, what is x?"],
      [
        ["11", "11"],
        ["14", "14"],
        ["5", "5"],
        ["7", "7"],
      ],
      3,
      [
        "Reste x y 4: 2x = 14. Divida entre 2: x = 7. Ambos lados valen 25.",
        "Subtract x and 4: 2x = 14. Divide by 2: x = 7. Both sides equal 25.",
      ],
    ],
  ],
  probabilidad: [
    [
      [
        "Una bolsa tiene 3 fichas rojas y 2 azules. Se extraen dos sin reemplazo. ¿Cuál es la probabilidad de que ambas sean rojas?",
        "A bag has 3 red and 2 blue counters. Two are drawn without replacement. What is the probability that both are red?",
      ],
      [
        ["3/10", "3/10"],
        ["9/25", "9/25"],
        ["2/5", "2/5"],
        ["3/5", "3/5"],
      ],
      0,
      [
        "P = (3/5) × (2/4) = 6/20 = 3/10. La segunda extracción tiene una ficha menos.",
        "P = (3/5) × (2/4) = 6/20 = 3/10. The second draw has one fewer counter.",
      ],
    ],
    [
      [
        "Al lanzar dos dados justos e independientes de seis caras, ¿cuál es la probabilidad de obtener suma 7?",
        "Two fair independent six-sided dice are rolled. What is the probability of a sum of 7?",
      ],
      [
        ["1/7", "1/7"],
        ["1/6", "1/6"],
        ["1/12", "1/12"],
        ["7/36", "7/36"],
      ],
      1,
      [
        "Hay 36 pares equiprobables; seis suman 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1).",
        "There are 36 equally likely pairs; six sum to 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1).",
      ],
    ],
  ],
  rapidez: [
    [
      [
        "Un móvil recorre 60 m en 10 s y 40 m en otros 10 s. ¿Cuál es su rapidez media total?",
        "An object travels 60 m in 10 s and 40 m in another 10 s. What is its overall average speed?",
      ],
      [
        ["10 m/s", "10 m/s"],
        ["2 m/s", "2 m/s"],
        ["5 m/s", "5 m/s"],
        ["6 m/s", "6 m/s"],
      ],
      2,
      [
        "Distancia total = 100 m; tiempo total = 20 s; rapidez = 100/20 = 5 m/s.",
        "Total distance = 100 m; total time = 20 s; speed = 100/20 = 5 m/s.",
      ],
    ],
    [
      [
        "Un viaje de 120 km dura 2 h de movimiento y 1 h de parada. ¿Cuál es la rapidez media de todo el viaje?",
        "A 120 km trip includes 2 h of movement and a 1 h stop. What is the average speed for the whole trip?",
      ],
      [
        ["60 km/h", "60 km/h"],
        ["120 km/h", "120 km/h"],
        ["80 km/h", "80 km/h"],
        ["40 km/h", "40 km/h"],
      ],
      3,
      [
        "La parada forma parte del tiempo total: 120 ÷ (2 + 1) = 40 km/h.",
        "The stop is part of total time: 120 ÷ (2 + 1) = 40 km/h.",
      ],
    ],
  ],
  fuerza: [
    [
      [
        "Una fuerza de 20 N y otra de 8 N actúan en sentidos opuestos sobre 4 kg. ¿Cuál es la magnitud de la aceleración?",
        "Forces of 20 N and 8 N act in opposite directions on 4 kg. What is the acceleration magnitude?",
      ],
      [
        ["3 m/s²", "3 m/s²"],
        ["7 m/s²", "7 m/s²"],
        ["5 m/s²", "5 m/s²"],
        ["2 m/s²", "2 m/s²"],
      ],
      0,
      [
        "Fuerza neta = 20 − 8 = 12 N. a = 12/4 = 3 m/s².",
        "Net force = 20 − 8 = 12 N. a = 12/4 = 3 m/s².",
      ],
    ],
    [
      [
        "Un objeto de 3 kg pasa de 2 m/s a 8 m/s en 2 s con aceleración constante. ¿Cuál es la fuerza neta?",
        "A 3 kg object changes from 2 m/s to 8 m/s in 2 s at constant acceleration. What is the net force?",
      ],
      [
        ["18 N", "18 N"],
        ["9 N", "9 N"],
        ["12 N", "12 N"],
        ["24 N", "24 N"],
      ],
      1,
      ["a = (8 − 2)/2 = 3 m/s². F = 3 × 3 = 9 N.", "a = (8 − 2)/2 = 3 m/s². F = 3 × 3 = 9 N."],
    ],
  ],
  energia: [
    [
      [
        "Una fuerza de 10 N empuja 5 m hacia delante mientras el rozamiento de 2 N se opone. ¿Cuál es el trabajo neto?",
        "A 10 N force pushes an object 5 m forward while 2 N friction opposes motion. What is the net work?",
      ],
      [
        ["60 J", "60 J"],
        ["50 J", "50 J"],
        ["40 J", "40 J"],
        ["10 J", "10 J"],
      ],
      2,
      [
        "Trabajo neto = (10 − 2) × 5 = 40 J. El rozamiento hace trabajo negativo.",
        "Net work = (10 − 2) × 5 = 40 J. Friction does negative work.",
      ],
    ],
    [
      [
        "Una máquina realiza 600 J de trabajo en 3 s. ¿Cuál es su potencia media?",
        "A machine does 600 J of work in 3 s. What is its average power?",
      ],
      [
        ["1800 W", "1800 W"],
        ["603 W", "603 W"],
        ["2 W", "2 W"],
        ["200 W", "200 W"],
      ],
      3,
      [
        "Potencia media = trabajo/tiempo = 600/3 = 200 W.",
        "Average power = work/time = 600/3 = 200 W.",
      ],
    ],
  ],
  densidad: [
    [
      [
        "Un objeto de 54 g desplaza 20 cm³ de agua al sumergirse completamente. ¿Cuál es su densidad?",
        "A 54 g object displaces 20 cm³ of water when fully submerged. What is its density?",
      ],
      [
        ["2,7 g/cm³", "2.7 g/cm³"],
        ["1080 g/cm³", "1080 g/cm³"],
        ["0,37 g/cm³", "0.37 g/cm³"],
        ["34 g/cm³", "34 g/cm³"],
      ],
      0,
      [
        "El agua desplazada da el volumen del objeto: 54/20 = 2,7 g/cm³.",
        "Displaced water gives the object volume: 54/20 = 2.7 g/cm³.",
      ],
    ],
    [
      [
        "Un material homogéneo tiene densidad de 2 g/cm³. ¿Qué masa tiene una pieza de 30 cm³?",
        "A homogeneous material has a density of 2 g/cm³. What is the mass of a 30 cm³ piece?",
      ],
      [
        ["15 g", "15 g"],
        ["60 g", "60 g"],
        ["32 g", "32 g"],
        ["28 g", "28 g"],
      ],
      1,
      ["Despeje m = ρV = 2 × 30 = 60 g.", "Rearrange m = ρV = 2 × 30 = 60 g."],
    ],
  ],
  atomos: [
    [
      [
        "Un ion tiene 11 protones y 10 electrones. ¿Cuál es su carga neta en unidades de carga elemental?",
        "An ion has 11 protons and 10 electrons. What is its net charge in elementary charge units?",
      ],
      [
        ["−1", "−1"],
        ["0", "0"],
        ["+1", "+1"],
        ["+21", "+21"],
      ],
      2,
      [
        "La carga neta es protones menos electrones: 11 − 10 = +1.",
        "Net charge is protons minus electrons: 11 − 10 = +1.",
      ],
    ],
    [
      [
        "Dos átomos tienen 6 protones cada uno y 6 y 8 neutrones, respectivamente. ¿Qué relación tienen?",
        "Two atoms each have 6 protons and respectively 6 and 8 neutrons. How are they related?",
      ],
      [
        ["Son elementos distintos", "They are different elements"],
        ["Son necesariamente iones", "They are necessarily ions"],
        ["Tienen el mismo número másico", "They have the same mass number"],
        ["Son isótopos del carbono", "They are carbon isotopes"],
      ],
      3,
      [
        "El mismo Z = 6 identifica carbono; distintos neutrones producen isótopos con A = 12 y 14.",
        "The same Z = 6 identifies carbon; different neutron counts produce isotopes with A = 12 and 14.",
      ],
    ],
  ],
  disoluciones: [
    [
      [
        "Se toman 100 mL de una disolución de 20 g/L y se diluyen hasta 500 mL sin perder soluto. ¿Cuál es la concentración final?",
        "100 mL of a 20 g/L solution is diluted to 500 mL without losing solute. What is the final concentration?",
      ],
      [
        ["4 g/L", "4 g/L"],
        ["100 g/L", "100 g/L"],
        ["10 g/L", "10 g/L"],
        ["20 g/L", "20 g/L"],
      ],
      0,
      [
        "El soluto es 20 × 0,1 = 2 g. Concentración final = 2/0,5 = 4 g/L.",
        "Solute mass is 20 × 0.1 = 2 g. Final concentration = 2/0.5 = 4 g/L.",
      ],
    ],
    [
      [
        "Una disolución de 250 mL contiene 5 g de soluto. ¿Cuál es su concentración másica?",
        "A 250 mL solution contains 5 g of solute. What is its mass concentration?",
      ],
      [
        ["0,02 g/L", "0.02 g/L"],
        ["20 g/L", "20 g/L"],
        ["1250 g/L", "1250 g/L"],
        ["50 g/L", "50 g/L"],
      ],
      1,
      ["250 mL = 0,25 L. c = 5/0,25 = 20 g/L.", "250 mL = 0.25 L. c = 5/0.25 = 20 g/L."],
    ],
  ],
  celulas: [
    [
      [
        "Una célula produce una proteína para secretarla. ¿Qué ruta es coherente con ese proceso?",
        "A cell produces a protein for secretion. Which pathway is consistent with this process?",
      ],
      [
        ["ADN → pared → cloroplasto", "DNA → wall → chloroplast"],
        ["Vacuola → ADN → cilio", "Vacuole → DNA → cilium"],
        [
          "Ribosoma en retículo endoplasmático → Golgi → vesícula",
          "Ribosome on endoplasmic reticulum → Golgi → vesicle",
        ],
        ["Membrana → pared → ADN", "Membrane → wall → DNA"],
      ],
      2,
      [
        "Las proteínas de secreción se sintetizan en ribosomas asociados al retículo, se procesan y se transportan mediante Golgi y vesículas.",
        "Secreted proteins are synthesized by ribosomes associated with the endoplasmic reticulum, processed and transported through the Golgi and vesicles.",
      ],
    ],
    [
      [
        "Un experimento inhibe la síntesis de proteínas en una célula. ¿Qué consecuencia directa es esperable?",
        "An experiment inhibits protein synthesis in a cell. Which direct consequence is expected?",
      ],
      [
        ["Se crea más ADN automáticamente", "More DNA is automatically created"],
        ["La célula pierde toda el agua", "The cell loses all water"],
        ["Aparece una pared nueva", "A new wall appears"],
        ["Disminuye la producción de nuevas enzimas", "Production of new enzymes decreases"],
      ],
      3,
      [
        "Las enzimas celulares son, en su mayoría, proteínas; frenar su síntesis reduce la producción de nuevas enzimas.",
        "Most cellular enzymes are proteins; inhibiting protein synthesis reduces production of new enzymes.",
      ],
    ],
  ],
  ecosistemas: [
    [
      [
        "Al desaparecer un depredador en una red simple, su presa aumenta inicialmente. ¿Qué explicación es más directa?",
        "When a predator disappears from a simple food web, its prey initially increases. Which explanation is most direct?",
      ],
      [
        ["Disminuye la mortalidad por depredación", "Mortality from predation decreases"],
        ["Toda la energía se crea de nuevo", "All energy is recreated"],
        ["La presa deja de alimentarse", "The prey stops feeding"],
        ["El clima se vuelve idéntico siempre", "Climate becomes permanently identical"],
      ],
      0,
      [
        "Menos depredación puede aumentar inicialmente la supervivencia, aunque otros factores también limitan la población.",
        "Less predation may initially increase survival, although other factors also limit the population.",
      ],
    ],
    [
      [
        "Si se transfiere aproximadamente 10 % de energía entre niveles y los productores tienen 10 000 kJ, ¿cuánto llega al segundo nivel consumidor?",
        "If approximately 10% of energy transfers between levels and producers contain 10,000 kJ, how much reaches the second consumer level?",
      ],
      [
        ["1000 kJ", "1000 kJ"],
        ["100 kJ", "100 kJ"],
        ["10 000 kJ", "10,000 kJ"],
        ["10 kJ", "10 kJ"],
      ],
      1,
      [
        "Con la suposición dada: consumidores primarios 1000 kJ; secundarios 100 kJ. El 10 % es una aproximación, no una constante universal.",
        "Under the stated assumption: primary consumers 1000 kJ; secondary consumers 100 kJ. The 10% value is an approximation, not a universal constant.",
      ],
    ],
  ],
  genetica: [
    [
      [
        "En dominancia completa, Aa × aa produce ¿qué proporción esperada de descendientes con fenotipo dominante?",
        "Under complete dominance, what expected proportion of offspring from Aa × aa has the dominant phenotype?",
      ],
      [
        ["100 %", "100%"],
        ["25 %", "25%"],
        ["50 %", "50%"],
        ["0 %", "0%"],
      ],
      2,
      [
        "Aa produce gametos A y a; aa solo a. La mitad esperada es Aa y la otra mitad aa.",
        "Aa produces A and a gametes; aa only a. Half the expected offspring are Aa and half aa.",
      ],
    ],
    [
      [
        "Dos plantas con igual genotipo crecen distinto bajo diferente iluminación. ¿Qué conclusión está respaldada?",
        "Two plants with the same genotype grow differently under different lighting. Which conclusion is supported?",
      ],
      [
        ["El genotipo no existe", "Genotype does not exist"],
        ["Toda diferencia es una mutación", "Every difference is a mutation"],
        ["La luz cambia siempre los alelos", "Light always changes alleles"],
        ["El ambiente puede influir en el fenotipo", "Environment can influence phenotype"],
      ],
      3,
      [
        "Un mismo genotipo puede producir variación fenotípica según el ambiente; el caso no demuestra cambios de alelos.",
        "The same genotype can produce phenotypic variation depending on environment; the case does not demonstrate allele changes.",
      ],
    ],
  ],
  acentuacion: [
    [
      [
        "¿Cuál oración usa correctamente la tilde diacrítica?",
        "Which sentence correctly uses the Spanish diacritical accent?",
      ],
      [
        ["Él tomó el libro.", "Él tomó el libro."],
        ["El tomó él libro.", "El tomó él libro."],
        ["Él tomó él libro.", "Él tomó él libro."],
        ["El tomó el libro.", "El tomó el libro."],
      ],
      0,
      [
        "Él es pronombre personal; el que acompaña libro es artículo y no lleva tilde.",
        "Él is a personal pronoun; el before libro is an article and takes no accent.",
      ],
    ],
    [
      ["¿Por qué país lleva tilde?", "Why does país take an accent mark?"],
      [
        ["Es esdrújula", "It is proparoxytone"],
        ["La vocal cerrada tónica forma un hiato", "The stressed closed vowel forms a hiatus"],
        ["Termina en consonante distinta de n o s", "It ends in a consonant other than n or s"],
        ["Es monosílaba", "It is monosyllabic"],
      ],
      1,
      [
        "Pa-ís contiene una vocal cerrada tónica junto a una abierta átona: se marca el hiato con tilde en í.",
        "Pa-ís contains a stressed closed vowel next to an unstressed open vowel; the accent on í marks the hiatus.",
      ],
    ],
  ],
  gramatica: [
    [
      [
        "¿Qué oración conserva la concordancia con un sujeto plural aunque haya un complemento singular?",
        "Which sentence preserves agreement with a plural subject despite a singular complement?",
      ],
      [
        ["Las alumnas del curso estudia.", "Las alumnas del curso estudia."],
        ["Las alumnas del curso estudio.", "Las alumnas del curso estudio."],
        ["Las alumnas del curso estudian.", "Las alumnas del curso estudian."],
        ["Las alumnas del curso estudiamos.", "Las alumnas del curso estudiamos."],
      ],
      2,
      [
        "El núcleo alumnas es plural; del curso no cambia la concordancia con estudian.",
        "The head alumnas is plural; del curso does not change agreement with estudian.",
      ],
    ],
    [
      [
        "En «Ayer, la profesora entregó los informes», ¿cuál es el complemento directo?",
        "In “Ayer, la profesora entregó los informes”, what is the direct object?",
      ],
      [
        ["Ayer", "Ayer"],
        ["La profesora", "La profesora"],
        ["Entregó", "Entregó"],
        ["Los informes", "Los informes"],
      ],
      3,
      [
        "Los informes designa lo entregado; puede sustituirse por los: la profesora los entregó.",
        "Los informes names what was delivered; it can be replaced by los: la profesora los entregó.",
      ],
    ],
  ],
  lectura: [
    [
      [
        "«Tras instalar recipientes, los residuos mezclados bajaron; también disminuyó la asistencia». ¿Qué debe revisarse antes de atribuir todo el descenso a los recipientes?",
        "“After bins were installed, mixed waste fell; attendance also fell.” What should be checked before attributing the entire reduction to the bins?",
      ],
      [
        [
          "Residuos por estudiante y condiciones comparables",
          "Waste per student and comparable conditions",
        ],
        ["Solo el color de los recipientes", "Only bin colour"],
        ["Solo la opinión más popular", "Only the most popular opinion"],
        [
          "Nada: toda coincidencia prueba causalidad",
          "Nothing: every coincidence proves causation",
        ],
      ],
      0,
      [
        "La asistencia puede explicar parte del descenso; comparar residuos por estudiante ayuda a controlar esa variable.",
        "Attendance may explain part of the reduction; comparing waste per student helps control that variable.",
      ],
    ],
    [
      [
        "Un texto afirma «Todas las personas mejorarán porque una obtuvo mejor nota». ¿Cuál es el problema principal?",
        "A text claims “Everyone will improve because one person earned a better grade.” What is the main problem?",
      ],
      [
        ["Usa un verbo", "It uses a verb"],
        ["Generaliza sin evidencia suficiente", "It generalizes without sufficient evidence"],
        ["Incluye una persona", "It includes a person"],
        ["Menciona una nota", "It mentions a grade"],
      ],
      1,
      [
        "Un solo caso no respalda una afirmación universal. Se necesitan datos suficientes y pertinentes.",
        "One case does not support a universal claim. Sufficient relevant data is needed.",
      ],
    ],
  ],
  respeto: [
    [
      [
        "Una actividad escolar incluye una oración de una sola tradición. ¿Qué adaptación respeta mejor la conciencia sin aislar a nadie?",
        "A school activity includes a prayer from one tradition. Which adjustment best respects conscience without isolating anyone?",
      ],
      [
        ["Exigir repetirla", "Require everyone to repeat it"],
        ["Castigar a quien discrepa", "Punish disagreement"],
        [
          "Ofrecer una participación alternativa respetuosa",
          "Offer a respectful alternative way to participate",
        ],
        ["Eliminar la voz de las minorías", "Silence minorities"],
      ],
      2,
      [
        "Una alternativa evita coerción y permite seguir participando en el grupo.",
        "An alternative avoids coercion while allowing continued participation in the group.",
      ],
    ],
    [
      [
        "Alguien rechaza una creencia y propone insultar a quienes la comparten. ¿Qué distinción es correcta?",
        "Someone rejects a belief and proposes insulting its followers. Which distinction is correct?",
      ],
      [
        ["Discrepar autoriza humillar", "Disagreement permits humiliation"],
        ["Toda crítica debe prohibirse", "All criticism must be banned"],
        ["Solo la mayoría tiene dignidad", "Only the majority has dignity"],
        [
          "Se puede criticar una idea sin humillar a las personas",
          "An idea can be criticized without humiliating people",
        ],
      ],
      3,
      [
        "La libertad de pensamiento permite desacuerdo, pero no elimina la igual dignidad de las personas.",
        "Freedom of thought allows disagreement but does not remove people’s equal dignity.",
      ],
    ],
  ],
  convivencia: [
    [
      [
        "Un acuerdo de turnos no funciona porque una persona requiere más tiempo por una necesidad de accesibilidad. ¿Qué revisión es más justa?",
        "A turn-taking agreement fails because someone needs more time for accessibility reasons. Which revision is fairest?",
      ],
      [
        [
          "Ajustar los turnos mediante diálogo y necesidades reales",
          "Adjust turns through dialogue and actual needs",
        ],
        ["Expulsar a esa persona", "Expel that person"],
        ["Mantenerlo aunque impida participar", "Keep it even if participation is impossible"],
        ["Resolverlo con amenazas", "Resolve it through threats"],
      ],
      0,
      [
        "La equidad puede requerir ajustes razonables para participar, no solo tiempos idénticos.",
        "Equity may require reasonable adjustments for participation, not only identical times.",
      ],
    ],
    [
      [
        "Una mediación no detiene amenazas reiteradas. ¿Cuál es el siguiente paso más seguro?",
        "Mediation does not stop repeated threats. What is the safest next step?",
      ],
      [
        ["Reunirse a solas con quien amenaza", "Meet the threatening person alone"],
        [
          "Solicitar protección y activar el protocolo institucional",
          "Seek protection and activate the institutional protocol",
        ],
        ["Publicar amenazas de venganza", "Publish revenge threats"],
        ["Eliminar las evidencias", "Destroy evidence"],
      ],
      1,
      [
        "La protección tiene prioridad ante amenazas; la mediación no sustituye medidas institucionales de seguridad.",
        "Protection takes priority when there are threats; mediation does not replace institutional safety measures.",
      ],
    ],
  ],
  etica: [
    [
      [
        "Un grupo quiere recaudar fondos difundiendo imágenes de una familia vulnerable sin permiso. ¿Qué alternativa es más ética?",
        "A group wants to raise funds by sharing images of a vulnerable family without permission. Which alternative is more ethical?",
      ],
      [
        ["Publicarlas porque ayudan", "Publish them because they help"],
        ["Exigir que agradezcan", "Demand gratitude"],
        [
          "Pedir consentimiento informado y limitar datos identificables",
          "Seek informed consent and limit identifying data",
        ],
        ["Ocultarles la publicación", "Hide the publication from them"],
      ],
      2,
      [
        "Un fin solidario no anula la privacidad; consentimiento y minimización de datos protegen dignidad.",
        "A charitable goal does not override privacy; consent and data minimization protect dignity.",
      ],
    ],
    [
      [
        "Una decisión beneficia a la mayoría pero excluye injustamente a una minoría. ¿Qué revisión es pertinente?",
        "A decision benefits the majority but unfairly excludes a minority. Which review is appropriate?",
      ],
      [
        ["Contar solo votos", "Count only votes"],
        ["Ignorar a la minoría", "Ignore the minority"],
        ["Mantenerla porque es popular", "Keep it because it is popular"],
        [
          "Evaluar derechos, daños y alternativas inclusivas",
          "Evaluate rights, harms and inclusive alternatives",
        ],
      ],
      3,
      [
        "La mayoría no vuelve legítima una exclusión injusta; una decisión ética considera derechos de todas las personas.",
        "Majority support does not legitimize unfair exclusion; an ethical decision considers everyone’s rights.",
      ],
    ],
  ],
};
export function topicChallenges(id: string, lang: "es" | "en", source: string): Q[] {
  const index = lang === "es" ? 0 : 1;
  return (challenges[id] ?? []).map(([q, options, answer, why], i) => ({
    q: q[index],
    options: options.map((o) => o[index]),
    answer,
    why: why[index],
    source,
    difficulty: i === 0 ? 2 : 3,
  }));
}
