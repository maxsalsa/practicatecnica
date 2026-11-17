CREATE TABLE public.league_tiers (
  user_id uuid NOT NULL,
  week_start date NOT NULL,
  tier smallint NOT NULL DEFAULT 0 CHECK (tier BETWEEN 0 AND 3),
  chest text,
  chest_claimed boolean NOT NULL DEFAULT false,
  PRIMARY KEY (user_id, week_start)
);
GRANT SELECT ON public.league_tiers TO authenticated;
GRANT ALL ON public.league_tiers TO service_role;
ALTER TABLE public.league_tiers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own league rows" ON public.league_tiers FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.league_week_start(_ts timestamptz) RETURNS date
LANGUAGE sql IMMUTABLE AS $$ SELECT date_trunc('week', _ts AT TIME ZONE 'America/Costa_Rica')::date $$;

-- Settles last week lazily: top 5 of each tier go up (and get a chest), bottom 3 go down when the group has 8+ people.
CREATE OR REPLACE FUNCTION public.league_settle() RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE cur date := public.league_week_start(now()); prev date := cur - 7;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext('league_settle'));
  IF EXISTS (SELECT 1 FROM league_tiers WHERE week_start = cur) THEN RETURN; END IF;
  WITH pool AS (
    SELECT u.user_id,
      COALESCE((SELECT t.tier FROM league_tiers t WHERE t.user_id = u.user_id AND t.week_start <= prev ORDER BY t.week_start DESC LIMIT 1), 0) AS tier,
      COALESCE((SELECT sum(a.earned_points) FROM practice_attempts a WHERE a.user_id = u.user_id AND public.league_week_start(a.created_at) = prev), 0) AS pts
    FROM (SELECT DISTINCT user_id FROM practice_attempts WHERE created_at >= prev::timestamp AT TIME ZONE 'America/Costa_Rica' - interval '60 days'
          UNION SELECT user_id FROM league_tiers) u
  ), ranked AS (
    SELECT *, row_number() OVER (PARTITION BY tier ORDER BY pts DESC) AS r,
      row_number() OVER (PARTITION BY tier ORDER BY pts ASC) AS rr, count(*) OVER (PARTITION BY tier) AS n
    FROM pool
  )
  INSERT INTO league_tiers (user_id, week_start, tier, chest)
  SELECT user_id, cur,
    CASE WHEN pts > 0 AND r <= 5 THEN LEAST(tier + 1, 3)
         WHEN n >= 8 AND rr <= 3 THEN GREATEST(tier - 1, 0) ELSE tier END,
    CASE WHEN pts > 0 AND r <= 5 THEN (ARRAY['🦉','🚀','🐆','🌋','🦜','🐢','⚡','🎓','⚙️','🔬','💻','📐'])[1 + floor(random()*12)::int] END
  FROM ranked;
END $$;

CREATE OR REPLACE FUNCTION public.league_standings()
RETURNS TABLE (name text, avatar text, points bigint, is_me boolean, my_tier smallint, chest text, chest_claimed boolean)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE cur date := public.league_week_start(now()); me uuid := auth.uid(); t smallint;
BEGIN
  IF me IS NULL THEN RAISE EXCEPTION 'auth required'; END IF;
  PERFORM public.league_settle();
  INSERT INTO league_tiers (user_id, week_start, tier) VALUES (me, cur,
    COALESCE((SELECT x.tier FROM league_tiers x WHERE x.user_id = me ORDER BY x.week_start DESC LIMIT 1), 0))
  ON CONFLICT DO NOTHING;
  SELECT x.tier INTO t FROM league_tiers x WHERE x.user_id = me AND x.week_start = cur;
  RETURN QUERY
  SELECT split_part(COALESCE(p.display_name, 'Estudiante'), ' ', 1) || COALESCE(' ' || left(NULLIF(split_part(p.display_name, ' ', 2), ''), 1) || '.', ''),
    COALESCE(p.avatar, '🦉'),
    COALESCE((SELECT sum(a.earned_points) FROM practice_attempts a WHERE a.user_id = l.user_id AND public.league_week_start(a.created_at) = cur), 0)::bigint AS pts,
    l.user_id = me, t,
    CASE WHEN l.user_id = me THEN l.chest END, CASE WHEN l.user_id = me THEN l.chest_claimed END
  FROM league_tiers l LEFT JOIN profiles p ON p.id = l.user_id
  WHERE l.week_start = cur AND l.tier = t
  ORDER BY pts DESC LIMIT 50;
END $$;

CREATE OR REPLACE FUNCTION public.league_claim_chest() RETURNS text
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE c text;
BEGIN
  UPDATE league_tiers SET chest_claimed = true
  WHERE user_id = auth.uid() AND week_start = public.league_week_start(now()) AND chest IS NOT NULL AND NOT chest_claimed
  RETURNING chest INTO c;
  IF c IS NOT NULL THEN UPDATE profiles SET avatar = c WHERE id = auth.uid(); END IF;
  RETURN c;
END $$;

REVOKE EXECUTE ON FUNCTION public.league_settle() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.league_standings() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.league_claim_chest() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.league_standings() TO authenticated;
GRANT EXECUTE ON FUNCTION public.league_claim_chest() TO authenticated;