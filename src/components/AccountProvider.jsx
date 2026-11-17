import { createContext, useContext, useEffect, useState } from "react";

import { useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
const AccountContext = createContext<{ user null; ready }>({
  user,
  ready,
});
export const useAccount = () => useContext(AccountContext);
export function AccountProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const queries = useQueryClient();
  useEffect(() => {
    let active = true;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;
      setUser(session?.user ?? null);
      setReady(true);
      if (["SIGNED_IN", "SIGNED_OUT", "USER_UPDATED"].includes(event)) {
        queries.removeQueries({ queryKey: ['authorized-content'] });
        void router.invalidate();
        if (event !== "SIGNED_OUT") void queries.invalidateQueries();
      }
      if ((event === "SIGNED_IN" || event === "INITIAL_SESSION") && session?.user) {
        window.setTimeout(() => { void supabase.rpc('claim_student_registration'); }, 0);
      }
    });
    void supabase.auth.getUser().then(({ data }) => {
      if (active) {
        setUser(data.user);
        setReady(true);
      }
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [router, queries]);
  return <AccountContext.Provider value={{ user, ready }}>{children}</AccountContext.Provider>;
}
