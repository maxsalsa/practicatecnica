import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { useAccount } from "@/components/AccountProvider";
import { Button } from "@/components/ui/button";
import QRCode from "qrcode";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/certificados")({staticData:{sitemap:true},
  validateSearch: (s: Record<string, unknown>) => ({ h: typeof s["h"] === "string" ? (s["h"] as string) : undefined }) as { h?: string },
  head: () => ({
    meta: [
      { title: "Certificados verificables SHA-256 · pracTICAtecnica.com" },
      { name: "description", content: "Emita y verifique certificados con huella SHA-256 a partir de calificaciones verificadas." },
      { property: "og:title", content: "Certificados verificables · pracTICAtecnica.com" },
      { property: "og:description", content: "Verifique la autenticidad de un certificado con su código SHA-256." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Certificados,
});

type V = { holder: string; title: string; score: number; issued_at: string };

function Certificados() {
  const { h } = Route.useSearch();
  const { user } = useAccount();
  const [code, setCode] = useState(h ?? "");
  const [res, setRes] = useState<V | null | undefined>();
  const [attempts, setAttempts] = useState<{ id: string; title: string; score: number; created_at: string }[]>([]);
  const [certs, setCerts] = useState<Record<string, string>>({});
  const [qr, setQr] = useState<Record<string,string>>({});
  const [err, setErr] = useState("");

  const verify = async (c: string) => {
    const { data } = await supabase.rpc("verify_certificate", { _hash: c });
    setRes((data as V[] | null)?.[0] ?? null);
  };
  useEffect(() => { if (h) verify(h); }, [h]);

  const load = async () => {
    if (!user) return;
    const [a, c] = await Promise.all([
      supabase.from("practice_attempts").select("id,title,score,created_at,certification_subject").eq("user_id", user.id).eq("verified_scoring", true).eq("assessment_mode", "exam").gte("score", 60).order("created_at", { ascending: false }).limit(50),
      supabase.from("certificates").select("hash,attempt_id"),
    ]);
    const rows=a.data ?? [];
    setAttempts(rows.filter(row => row.certification_subject));
    setCerts(Object.fromEntries((c.data ?? []).map((x) => [x.attempt_id, x.hash])));
    const images=await Promise.all((c.data??[]).map(async x=>[x.hash,await QRCode.toDataURL(`https://practicatecnica.com/certificados?h=${x.hash}`,{width:180,margin:2})] as const));
    setQr(Object.fromEntries(images));
  };
  useEffect(() => { load(); }, [user?.id]);

  const issue = async (id: string) => {
    setErr("");
    const { error } = await supabase.rpc("issue_certificate", { _attempt: id });
    if (error) setErr(error.message); else load();
  };
  const downloadCertificate = async (a: {id:string;title:string;score:number}) => {
    const hash=certs[a.id]; if(!hash) return;
    const {data,error}=await supabase.rpc('verify_certificate',{_hash:hash});
    const cert=(data as V[]|null)?.[0]; if(error||!cert){setErr('No se pudo verificar el certificado para descargar.');return;}
    const {jsPDF}=await import('jspdf'); const doc=new jsPDF();
    doc.setFontSize(20);doc.text('pracTICAtecnica.com',20,25);
    doc.setFontSize(16);doc.text('Certificado independiente de aprendizaje',20,40);
    doc.setFontSize(10);doc.text('Costa Rica · Constancia y resultados de simulacros',20,47);
    doc.setFontSize(12);doc.text(doc.splitTextToSize(`Titular: ${cert.holder}\nMateria / banco: ${cert.title}\nPuntaje verificado: ${cert.score}%\nFecha de emisión: ${new Date(cert.issued_at).toLocaleString('es-CR',{timeZone:'America/Costa_Rica'})}\nRequisito: un simulacro verificado con nota de 60 o más.`,170),20,55);
    const image=qr[hash];if(image)doc.addImage(image,'PNG',20,105,45,45);
    doc.setFontSize(9);doc.text(doc.splitTextToSize(`SHA-256: ${hash}\nVerificación: ${link(hash)}\nEmitido por GICM. No es título oficial ni acredita dominio profesional o nivel completo de idioma.`,170),20,165);
    const blob=doc.output('blob'); const url=URL.createObjectURL(blob);const anchor=document.createElement('a');anchor.href=url;anchor.download='certificado-practica.pdf';anchor.click();setTimeout(()=>URL.revokeObjectURL(url),30000);
  };
  const link = (hash: string) => `https://practicatecnica.com/certificados?h=${hash}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-3xl space-y-8 px-4 py-8">
        <h1 className="text-3xl font-black">🔐 Certificados verificables</h1>
        <section className="space-y-3 rounded-xl border border-border bg-card p-5">
          <h2 className="text-xl font-bold">Verificar un certificado</h2>
          <p className="text-sm text-muted-foreground">Pegue el código SHA-256 de 64 caracteres impreso en el certificado.</p>
          <div className="flex flex-wrap gap-2">
            <input value={code} onChange={(e) => setCode(e.target.value)} className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2 font-mono text-xs" placeholder="a3f5…" aria-label="Código SHA-256" />
            <Button onClick={() => verify(code)} className="rounded-md bg-primary px-4 py-2 font-bold text-primary-foreground">Verificar</Button>
          </div>
          {res === null && <p className="font-bold text-destructive">Código no encontrado, revocado o no verificable.</p>}
          {res && (
            <div className="rounded-lg border border-accent p-4">
              <p className="font-bold text-accent">✓ Certificado auténtico</p>
              <p>Titular: <b>{res.holder}</b></p>
              <p>Práctica: {res.title} · Calificación verificada: {res.score}%</p>
              <p className="text-sm text-muted-foreground">Emitido: {new Date(res.issued_at).toLocaleString("es-CR", { timeZone: "America/Costa_Rica" })}</p>
            </div>
          )}
        </section>
        {user ? (
          <section className="space-y-3">
            <h2 className="text-xl font-bold">Mis resultados certificables (un simulacro con 60 % o más)</h2>
            {err && <p className="text-destructive">{err}</p>}
            {attempts.length === 0 && <p className="text-muted-foreground">Necesita un simulacro completo verificado con nota de 60 o más. Las prácticas y juegos no cuentan.</p>}
            {attempts.map((a) => (
              <div key={a.id} className="rounded-lg border border-border bg-card p-4">
                <p className="font-bold">{a.title} · {a.score}%</p>
                {certs[a.id] ? (
                  <div className="mt-2 space-y-2">
                    {qr[certs[a.id] ?? ""] && <img src={qr[certs[a.id] ?? ""]} alt="Código QR de verificación de este certificado" width={180} height={180} />}
                    <p className="text-sm">Emitido para {a.title} · Resultado: {a.score}%</p>
                    <p className="break-all font-mono text-xs">SHA-256: {certs[a.id]}</p>
                    <div className="flex flex-wrap gap-2">
                      <Button onClick={() => navigator.clipboard.writeText(link(certs[a.id] ?? ""))} className="rounded-md border border-border px-3 py-1 text-sm">Copiar enlace de verificación</Button>
                      <Button onClick={() => void downloadCertificate(a)} variant="outline">Descargar PDF</Button>
                      <Button onClick={() => window.print()} className="rounded-md border border-border px-3 py-1 text-sm">Imprimir</Button>
                    </div>
                  </div>
                ) : (
                  <Button onClick={() => issue(a.id)} className="mt-2 rounded-md bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">Emitir certificado</Button>
                )}
              </div>
            ))}
          </section>
        ) : (
          <p className="text-muted-foreground">Ingrese para emitir sus certificados.</p>
        )}
        <p className="text-xs text-muted-foreground">Certificado de práctica de pracTICAtecnica.com; no es un título oficial del MEP, MOPT ni universidades.</p>
      </main>
    </div>
  );
}
