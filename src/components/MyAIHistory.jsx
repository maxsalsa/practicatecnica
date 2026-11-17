import { useQuery } from "@tanstack/react-query";
import { FileText, MessageCircleQuestion, ReceiptText } from "lucide-react";
import { useAccount } from "@/components/AccountProvider";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { z } from "zod";
import { summarizeAICosts } from "@/lib/ai-cost-summary";
const questionSchema = z.array(z.object({ q: z.string(), options: z.array(z.string()), answer: z.number().int(), why: z.string() }));
export function MyAIHistory({ title = "Mi historial de IA" }) {
    const { user } = useAccount();
    const { data, isPending, error } = useQuery({
        queryKey: ["my-ai-history", user?.id], enabled: !!user,
        queryFn() { }
    });
    {
        if (!user)
            return [];
        const result = await supabase.from("ai_generations").select("id,created_at,document_name,model,questions,actual_credits,input_tokens,output_tokens").eq("user_id", user.id).order("created_at", { ascending }).limit(50);
        if (result.error)
            throw new Error("No se pudo consultar su historial de IA.");
        return result.data;
    }
}
;
return <section className="mt-8 border-y py-6">
    <h1 className="text-3xl font-black">{title}</h1>
    <div className="mt-4 flex flex-wrap gap-2">
      <Button asChild variant="outline"><Link to="/pdf-preguntas"><FileText />Preguntas desde PDF</Link></Button>
      <Button asChild variant="outline"><Link to="/pregunta-ia"><MessageCircleQuestion />Mi pregunta</Link></Button>
      <Button asChild variant="outline"><Link to="/gastos-ia"><ReceiptText />Mis gastos</Link></Button>
    </div>
    {!user ? <p className="mt-4 text-muted-foreground">Ingrese con su cuenta para ver su historial privado.</p> : isPending ? <p role="status" className="mt-4">Consultando historial…</p> : error ? <p role="alert" className="mt-4 text-destructive">{error.message}</p> : <>
      <p className="mt-4 text-sm text-muted-foreground">Últimas 50 generaciones · solo sus registros · gasto en créditos confirmado por el proveedor.</p>
      {!!data?.length && <p className="mt-3 font-bold">Gasto confirmado en estos registros: {summarizeAICosts(data).confirmed} créditos · pendientes de confirmación: {summarizeAICosts(data).pending}</p>}
      {!data?.length && <p className="mt-5">Aún no hay generaciones ni gastos de IA registrados para su cuenta. La generación permanece pausada.</p>}
      {data?.map(row => {
            const parsed = questionSchema.safeParse(row.questions);
            return <article key={row.id} className="mt-5 rounded-lg border bg-card p-4">
          <h2 className="break-words font-bold">{row.document_name}</h2>
          <p className="mt-2 break-words text-sm text-muted-foreground">{new Date(row.created_at).toLocaleString("es-CR", { timeZone: "America/Costa_Rica" })} · {row.model}</p>
          <p className="mt-2 text-sm">Gasto real: {row.actual_credits === null ? "Pendiente de confirmación" : `${row.actual_credits} créditos`}</p>
          <p className="mt-1 text-sm text-muted-foreground">Tokens de entrada: {row.input_tokens ?? "Sin registrar"} · salida: {row.output_tokens ?? "Sin registrar"}</p>
          {parsed.success && parsed.data.map((q, i) => <details key={i} className="mt-4 border-t pt-3"><summary className="cursor-pointer font-semibold">{i + 1}. {q.q}</summary><ol className="mt-3 list-[upper-alpha] space-y-1 pl-6">{q.options.map((option, j) => <li key={j}>{option}</li>)}</ol><p className="mt-3 font-bold">Respuesta: {q.options[q.answer] ?? "No registrada"}</p><p className="mt-2 text-sm">{q.why}</p></details>)}
        </article>;
        })}
    </>}
  </section>;
