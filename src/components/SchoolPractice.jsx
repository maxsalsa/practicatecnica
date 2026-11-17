import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { schoolSubjects, schoolLevels, schoolDeck } from "@/lib/school-practice";

export function SchoolPractice({ onStart }) {
  const [level, setLevel] = useState(schoolLevels[0] ?? "6.º primaria");
  const [lang, setLang] = useState("es");
  return (
    <section className="mt-8 border-y py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">Asignaturas escolares</h2>
        <div className="flex gap-2">
          <select
            aria-label="Nivel académico"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="max-w-52 rounded-md border bg-background p-2 text-sm"
          >
            {schoolLevels.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
          <Button variant="outline" onClick={() => setLang(lang === "es" ? "en" : "es")}>
            {lang === "es" ? "Español" : "English"}
          </Button>
        </div>
      </div>
      <Button asChild variant="outline" className="mt-4 h-auto whitespace-normal">
        <Link to="/practicas" search={{ subject: "matematica", level, lang, mode: "practice", variant: 0 }}>
          {lang === "es"
            ? "Explorar fichas completas por tema y nivel →"
            : "Explore complete topic and grade sheets →"}
        </Link>
      </Button>
      <p className="mt-3 text-sm text-muted-foreground">
        {lang === "es" ? "Diagnóstico breve por materia" : "Short subject diagnostic"}
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {schoolSubjects.map((s) => (
          <Button
            key={s.id}
            variant="secondary"
            className="h-auto justify-start whitespace-normal py-4"
            onClick={() => onStart(schoolDeck(s.id, level, lang))}
          >
            <span aria-hidden="true">{s.emoji}</span>
            {lang === "es" ? s.title : s.en} →
          </Button>
        ))}
      </div>
    </section>
  );
}
