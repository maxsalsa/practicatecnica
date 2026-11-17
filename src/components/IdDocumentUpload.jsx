import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const KINDS = { carne: "Carné estudiantil", libro: "Libro de comunicación" };


export function IdDocumentUpload({ userId }: { userId }) {
  const [kind, setKind] = useState("carne");
  const [docs, setDocs] = useState([]);
  const [busy, setBusy] = useState(false);

  async function load() {
    const { data } = await supabase.storage.from("id-documents").list(userId);
    const out = [];
    for (const f of data ?? []) {
      const { data } = await supabase.storage.from("id-documents").createSignedUrl(`${userId}/${f.name}`, 600);
      if (s) out.push({ name: f.name, url: s.signedUrl });
    }
    setDocs(out);
  }
  useEffect(() => { void load(); }, [userId]);

  async function upload(file) {
    if (file.size > 5 * 1024 * 1024) { toast.error("El archivo debe pesar menos de 5 MB."); return; }
    setBusy(true);
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const { error } = await supabase.storage.from("id-documents").upload(`${userId}/${kind}-${Date.now()}.${ext}`, file);
    setBusy(false);
    if (error) { toast.error("No se pudo subir. Intente de nuevo."); return; }
    toast.success("Documento subido. Administración lo revisará.");
    void load();
  }

  return (
    <div className="mt-6 rounded-2xl border bg-card p-5">
      <h2 className="text-lg font-extrabold">🪪 Carné estudiantil o libro de comunicación</h2>
      <p className="mt-1 text-sm text-muted-foreground">Súbalo para confirmar que es estudiante. Solo usted y administración pueden verlo.</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <select value={kind} onChange={(e) => setKind(e.target.value)} className="rounded-xl border bg-background px-3 py-2" aria-label="Tipo de documento">
          {Object.entries(KINDS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <label className="cursor-pointer rounded-xl bg-primary px-4 py-2 font-bold text-primary-foreground">
          {busy ? "Subiendo…" : "Subir foto o PDF"}
          <input type="file" accept="image/*,application/pdf" className="sr-only" disabled={busy} onChange={(e) => { const f = e.target.files?.[0]; if (f) void upload(f); e.target.value = ""; }} />
        </label>
      </div>
      {docs.length > 0 && (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {docs.map((d) => (
            <li key={d.name} className="rounded-xl border p-2 text-sm">
              <p className="font-semibold">{d.name.startsWith("libro") ? KINDS.libro : KINDS.carne}</p>
              {d.name.endsWith(".pdf") ? <a href={d.url} target="_blank" rel="noreferrer" className="text-accent underline">Ver PDF</a> : <img src={d.url} alt="Documento subido" className="mt-1 max-h-48 rounded-lg object-contain" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

