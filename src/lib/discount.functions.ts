import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

export const createDiscountCode = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({
      code: z.string().trim().regex(/^[A-Za-z0-9]{3,32}$/),
      percent: z.number().int().min(1).max(100),
      audience: z.enum(["estudiante", "general", "todos"]),
      uses: z.number().int().min(1).max(10000).optional(),
      environment: z.enum(["sandbox", "live"]),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (!isAdmin) throw new Error("Solo administradores.");
    const { gatewayFetch } = await import("@/lib/paddle.server");
    const ids = data.audience === "todos" ? ["estudiante_anual", "general_anual"] : [data.audience === "estudiante" ? "estudiante_anual" : "general_anual"];
    const restrict: string[] = [];
    for (const id of ids) {
      const r = await (await gatewayFetch(data.environment, `/prices?external_id=${id}`)).json();
      if (r.data?.[0]?.id) restrict.push(r.data[0].id);
    }
    const res = await gatewayFetch(data.environment, "/discounts", {
      method: "POST",
      body: JSON.stringify({
        description: `Código ${data.code} (${data.audience})`,
        type: "percentage",
        amount: String(data.percent),
        code: data.code.toUpperCase(),
        enabled_for_checkout: true,
        recur: false,
        usage_limit: data.uses ?? null,
        restrict_to: restrict.length ? restrict : null,
      }),
    });
    const j = await res.json();
    if (!res.ok) throw new Error(j?.error?.detail ?? "No se pudo crear el código.");
    return { code: j.data.code as string };
  });
