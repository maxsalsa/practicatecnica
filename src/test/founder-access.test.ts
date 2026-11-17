import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
describe("Verified founder access", () => {
  it("limits founder admin grants to the two exact confirmed emails", () => {
    const sql = readFileSync("drizzle/migrations/0005_verified_founder_admins.sql", "utf8");
    expect(sql).toContain("IF new.email_confirmed_at IS NOT NULL THEN");
    expect(sql).toContain(
      "IF lower(new.email) IN ('maxi.salsa@gmail.com','escb77@gmail.com') THEN INSERT INTO public.user_roles(user_id,role) VALUES(new.id,'admin')",
    );
    expect(sql.indexOf("IF new.email_confirmed_at IS NOT NULL THEN")).toBeLessThan(
      sql.indexOf("IN ('maxi.salsa@gmail.com','escb77@gmail.com')"),
    );
    expect(sql).toContain(
      "REVOKE ALL ON FUNCTION public.initialize_student_account() FROM PUBLIC,anon,authenticated",
    );
  });
});
