import type { Q } from "./questions";
const items: [string, string[], number, string][] = [
  [
    "What is the SI base unit of mass?",
    ["Gram", "Kilogram", "Newton", "Litre"],
    1,
    "The kilogram is the base unit. The gram is a submultiple; the newton measures force and the litre measures volume.",
  ],
  [
    "In 25 mm, which part is the unit?",
    ["25", "Length", "mm", "25 mm²"],
    2,
    "mm is the symbol for millimetre; 25 is the numerical value.",
  ],
  [
    "Which quantity is expressed in kelvin?",
    ["Mass", "Thermodynamic temperature", "Time", "Electric current"],
    1,
    "The kelvin is the SI unit of thermodynamic temperature.",
  ],
  [
    "Convert 0.075 m to millimetres.",
    ["0.75 mm", "7.5 mm", "75 mm", "750 mm"],
    2,
    "Multiply by 1000: 0.075 × 1000 = 75 mm.",
  ],
  [
    "Convert 2500 mm to metres.",
    ["25 m", "2.5 m", "0.25 m", "250 m"],
    1,
    "Divide by 1000: 2500 ÷ 1000 = 2.5 m.",
  ],
  [
    "What is 1 cm² in square millimetres?",
    ["10 mm²", "100 mm²", "1000 mm²", "1 mm²"],
    1,
    "1 cm = 10 mm. Squaring the conversion factor gives 100 mm².",
  ],
  [
    "An instrument displays values in steps of 0.01 mm. This describes its:",
    ["Guaranteed accuracy", "Display resolution", "Complete traceability", "Zero error"],
    1,
    "The display step describes resolution, not guaranteed accuracy or freedom from error.",
  ],
  [
    "Before measuring a part, you should:",
    [
      "Force the jaws closed",
      "Clean the contact faces and check zero",
      "Ignore temperature",
      "Measure beyond the range",
    ],
    1,
    "Dirt and an incorrect zero can affect the measurement.",
  ],
  [
    "An instrument with a 0–150 mm range is used on a 200 mm dimension. It:",
    [
      "Always works",
      "Works if forced",
      "Does not cover the dimension",
      "Guarantees greater accuracy",
    ],
    2,
    "The dimension exceeds the measurement range.",
  ],
  [
    "Main scale: 12 mm; matching division: 7; resolution: 0.02 mm. What is the reading?",
    ["12.07 mm", "12.14 mm", "14.00 mm", "12.70 mm"],
    1,
    "12 + 7 × 0.02 = 12.14 mm. Do not add the division number directly.",
  ],
  [
    "Main scale: 8 mm; matching division: 3; resolution: 0.05 mm. What is the reading?",
    ["8.03 mm", "8.30 mm", "8.15 mm", "8.50 mm"],
    2,
    "8 + 3 × 0.05 = 8.15 mm.",
  ],
  [
    "Which information converts a matching Vernier division into a length?",
    ["Instrument colour", "Part name", "Vernier resolution", "Part mass"],
    2,
    "Multiply the matching division number by the stated resolution.",
  ],
  [
    "Sleeve: 5.5 mm; thimble: 23 divisions of 0.01 mm. What is the reading?",
    ["5.23 mm", "5.73 mm", "7.80 mm", "5.523 mm"],
    1,
    "5.5 + 23 × 0.01 = 5.73 mm.",
  ],
  [
    "A screw advances 0.5 mm per turn and has 50 divisions. What does one division represent?",
    ["0.1 mm", "0.05 mm", "0.01 mm", "0.5 mm"],
    2,
    "0.5 ÷ 50 = 0.01 mm per division.",
  ],
  [
    "Omitting a visible 0.5 mm sleeve mark produces:",
    ["A reading 0.5 mm too low", "A reading 0.5 mm too high", "No change", "Greater resolution"],
    0,
    "Omitting the half-millimetre mark subtracts 0.5 mm from the result.",
  ],
  [
    "Measured value: 10.08 mm; reference: 10.00 mm. What is the measurement error?",
    ["−0.08 mm", "+0.08 mm", "0.8 mm", "10.08 mm"],
    1,
    "Error = measured value − reference value = +0.08 mm.",
  ],
  [
    "Closely grouped measurements far from the reference indicate:",
    [
      "Good precision, but not necessarily good accuracy",
      "Necessarily zero error",
      "Guaranteed traceability",
      "No uncertainty",
    ],
    0,
    "Grouping indicates precision; proximity to the reference is a different aspect.",
  ],
  [
    "A small resolution guarantees:",
    [
      "Perfect accuracy",
      "Zero uncertainty",
      "Only a small display increment",
      "Current calibration",
    ],
    2,
    "Resolution does not replace error evaluation, uncertainty evaluation or calibration.",
  ],
  [
    "Does calibration necessarily include adjustment?",
    [
      "Yes, always",
      "No, they are different operations",
      "Only for digital instruments",
      "Only for mass measurements",
    ],
    1,
    "Calibration establishes relationships; adjustment changes the system to provide prescribed indications.",
  ],
  [
    "Metrological traceability requires:",
    [
      "Only a label",
      "A documented, unbroken chain of calibrations",
      "Only a new battery",
      "Only a small resolution",
    ],
    1,
    "Each calibration in the chain contributes to measurement uncertainty.",
  ],
  [
    "In a calibration certificate, uncertainty:",
    [
      "Is relevant information",
      "Should be omitted",
      "Proves there is no error",
      "Is the seal colour",
    ],
    0,
    "Uncertainty is essential for interpreting results and their traceability.",
  ],
  [
    "Which interval corresponds to 10.02 mm ± 0.03 mm?",
    ["9.99 to 10.05 mm", "10.01 to 10.03 mm", "9.72 to 10.32 mm", "10.02 to 10.05 mm"],
    0,
    "Subtract and add 0.03: the endpoints are 9.99 and 10.05 mm.",
  ],
  [
    "Tolerance and uncertainty are:",
    ["Synonyms", "Different concepts", "Always zero", "Base units"],
    1,
    "Tolerance comes from a specification; uncertainty characterizes the measurement.",
  ],
  [
    "The measurement interval crosses a tolerance limit. A conformity decision should consider:",
    [
      "Only the central value",
      "A decision rule that considers uncertainty",
      "Only the number of attempts",
      "Instrument colour",
    ],
    1,
    "Use a previously defined decision rule and consider the associated risk.",
  ],
];
export function englishMetrologyQuestions(questions: Q[], sheetIndex: number): Q[] {
  return questions.map((q, i) => {
    const en = items[sheetIndex * 3 + i];
    return en ? { q: en[0], options: en[1], answer: en[2], why: en[3], source: q.source } : q;
  });
}
