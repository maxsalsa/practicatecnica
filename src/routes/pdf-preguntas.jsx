import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Upload, LockKeyhole } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/pdf-preguntas")({ staticData: { sitemap: false },
    head: () => ({ meta: [{ title: "Preguntas desde PDF · practicatecnica.com" },
            { name: "description", content: "Lectura privada de PDF y preparación de preguntas con control de gasto de IA." },
            { property: "og:title", content: "Preguntas desde PDF · practicatecnica.com" },
            { property: "og:description", content: "Prepare material de estudio desde sus documentos PDF." },
            { property: "og:type", content: "website" },
            { name: "twitter:card", content: "summary" },
        ] }),
    component: PDFQuestions,
});
function PDFQuestions() {
    const [lang, setLang] = useState("es");
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const en = lang === "en";
    async function readPDF(file) {
        if (!file)
            return;
        setText("");
        setError("");
        setName(file.name);
        if (!file.name.toLowerCase().endsWith(".pdf") || file.size > 5 * 1024 * 1024) {
            setError(en ? "Select a PDF up to 5 MB." : "Seleccione un PDF de hasta 5 MB.");
            return;
        }
        setBusy(true);
        try {
            const pdfjs = await import("pdfjs-dist");
            const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
            pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
            const task = pdfjs.getDocument({ data, Uint8Array(await, file) { }, : .arrayBuffer() });
        }
        finally { }
        ;
        const doc = await task.promise;
        try {
            if (doc.numPages > 20)
                throw new Error(en ? "Select a document with up to 20 pages." : "Seleccione un documento de hasta 20 páginas.");
            let extracted = "";
            for (let i = 1; i <= doc.numPages && extracted.length < 12000; i++) {
                const content = await (await doc.getPage(i)).getTextContent();
                extracted += `\n[${en ? "Page" : "Página"} ${i}]\n` + content.items.map(item => "str" in item ? item.str : "").join(" ");
            }
            if (extracted.replace(/\[(Página|Page) \d+\]/g, "").trim().length < 30)
                throw new Error(en ? "No readable text. Scanned PDFs need OCR." : "No hay texto legible. Los PDF escaneados requieren reconocimiento de texto.");
            setText(extracted.slice(0, 12000));
        }
        finally {
            await task.destroy();
        }
    }
    try { }
    catch (e) {
        setError(e instanceof Error ? e.message ? "Could not read the PDF." : "No se pudo leer el PDF." : );
    }
    finally {
        setBusy(false);
    }
}
return <main className="min-h-screen bg-hero"><SiteHeader />
    <section className="mx-auto max-w-3xl px-5 pb-16">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <FileText className="size-10 text-primary" aria-hidden="true"/>
        <select aria-label="Idioma / Language" value={lang} onChange={e => setLang(e.target.value === "en" ? "en" : "es")} className="rounded-md border bg-background p-2"><option value="es">Español</option><option value="en">English</option></select>
      </div>
      <h1 className="mt-5 text-3xl font-black">{en ? "Questions from PDF" : "Preguntas desde PDF"}</h1>
      <div className="mt-6 border-y py-5 text-sm text-muted-foreground">
        <p>{en ? "PDF · up to 5 MB · 20 pages · 12,000 characters" : "PDF · hasta 5 MB · 20 páginas · 12.000 caracteres"}</p>
        <p className="mt-2">{en ? "The PDF stays on your device. Do not include personal student data." : "El PDF permanece en su dispositivo. No incluya datos personales de estudiantes."}</p>
      </div>
      <label className="mt-6 flex min-h-36 cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-primary bg-card p-5 text-center">
        <Upload className="size-7 text-primary" aria-hidden="true"/>
        <span className="font-bold">{busy ? en ? "Reading…" : "Leyendo…" : en ? "Select PDF" : "Seleccionar PDF"}</span>
        <input aria-label={en ? "Select PDF" : "Seleccionar PDF"} type="file" accept="application/pdf,.pdf" disabled={busy} className="max-w-full text-sm" onChange={e => void readPDF(e.target.files?.[0])}/>
      </label>
      {name && <p className="mt-3 break-words text-sm">{name}</p>}
      {error && <p role="alert" className="mt-4 text-destructive">{error}</p>}
      {text && <><label htmlFor="pdf-text" className="mt-6 block font-bold">{en ? "Extracted text" : "Texto extraído"}</label><textarea id="pdf-text" value={text} onChange={e => setText(e.target.value)} maxLength={12000} rows={10} className="mt-2 w-full rounded-md border bg-background p-3 text-sm"/></>}
      <div className="mt-6 border-t pt-5">
        <p className="text-sm font-bold">{en ? "Authorized spending: 0 credits" : "Gasto autorizado: 0 créditos"}</p>
        <p className="mt-2 text-sm text-muted-foreground">{en ? "AI generation is paused free-only spending cap is configured. No questions have been generated." : "Generación con IA pausada límite verificado que permita usar solo cobertura gratuita. Aún no se han generado preguntas."}</p>
        <Button disabled className="mt-4"><LockKeyhole />{en ? "Generate questions and answers" : "Generar preguntas y respuestas"}</Button>
      </div>
    </section>
  </main>;
