CREATE TABLE public.recreational_sessions (id uuid PRIMARY KEY, user_id uuid NOT NULL, subject text NOT NULL CHECK (length(subject) BETWEEN 1 AND 100), questions integer NOT NULL CHECK (questions BETWEEN 0 AND 500), correct integer NOT NULL CHECK (correct BETWEEN 0 AND questions), created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT, INSERT ON public.recreational_sessions TO authenticated;
GRANT ALL ON public.recreational_sessions TO service_role;
ALTER TABLE public.recreational_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owner reads recreational activity" ON public.recreational_sessions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Owner records recreational activity" ON public.recreational_sessions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
COMMENT ON TABLE public.recreational_sessions IS 'Owner-reported completed recreational sessions, never academic grades, certification eligibility or verified XP.';