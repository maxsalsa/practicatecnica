import { supabase } from "@/integrations/supabase/client";
import type { Attempt } from "./progress-data";
export async function readAttempts(userId?: string) {
  const rows: Attempt[] = [];
  for (let offset = 0; ; offset += 1000) {
    let query = supabase
      .from("practice_attempts")
      .select(
        "id,deck_id,title,score,question_count,created_at,verified_scoring,earned_points,points_version,assessment_mode,certification_subject",
      )
      .order("created_at", { ascending: false })
      .order("id")
      .range(offset, offset + 999);
    if (userId) query = query.eq("user_id", userId);
    const { data, error } = await query;
    if (error) throw new Error("No se pudo leer el avance en la nube.");
    rows.push(...data);
    if (data.length < 1000) break;
  }
  return rows;
}
