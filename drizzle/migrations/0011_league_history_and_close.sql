CREATE TABLE public.league_closures (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, closed_at timestamptz NOT NULL DEFAULT now(), manual boolean NOT NULL DEFAULT false);
GRANT ALL ON public.league_closures TO service_role;
ALTER TABLE public.league_closures ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.league_history (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id uuid NOT NULL, closed_at timestamptz NOT NULL DEFAULT now(),
  from_tier smallint NOT NULL, to_tier smallint NOT NULL, points bigint NOT NULL, rank int NOT NULL
);
GRANT SELECT ON public.league_history TO authenticated;
GRANT ALL ON public.league_history TO service_role;
ALTER TABLE public.league_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own league history" ON public.league_history FOR SELECT TO authenticated USING (user_id = auth.uid());

-- Start of the current scoring window: week start or last closure, whichever is later
CREATE OR REPLACE FUNCTION public.league_window_start() RETURNS timestamptz
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT GREATEST(public.league_week_start(now())::timestamp AT TIME ZONE 'America/Costa_Rica',
                  COALESCE((SELECT max(closed_at) FROM league_closures), '-infinity'::timestamptz))
$$;

-- Ranks current rows by points in [from_ts, to_ts) and applies promotions/demotions + chests to week _target
CREATE OR REPLACE FUNCTION public.league_apply(_from timestamptz, _to timestamptz, _source date, _target date) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  CREATE TEMP TABLE _r ON COMMIT DROP AS
  WITH pool AS (
    SELECT l.user_id, l.tier,
      COALESCE((SELECT sum(a.earned_points) FROM practice_attempts a WHERE a.user_id = l.user_id AND a.created_at >= _from AND a.created_at < _to), 0)::bigint AS pts
    FROM league_tiers l WHERE l.week_start = _source
  )
  SELECT *, row_number() OVER (PARTITION BY tier ORDER BY pts DESC) AS r,
    row_number() OVER (PARTITION BY tier ORDER BY pts ASC) AS rr, count(*) OVER (PARTITION BY tier) AS n FROM pool;
  ALTER TABLE _r ADD COLUMN nt smallint, ADD COLUMN ch text;
  UPDATE _r SET nt = CASE WHEN pts > 0 AND r <= 5 THEN LEAST(tier + 1, 3) WHEN n >= 8 AND rr <= 3 THEN GREATEST(tier - 1, 0) ELSE tier END,
    ch = CASE WHEN pts > 0 AND r <= 5 THEN (ARRAY['🦉','🚀','🐆','🌋','🦜','🐢','⚡','🎓','⚙️','🔬','💻','📐'])[1 + floor(random()*12)::int] END;
  INSERT INTO league_history (user_id, closed_at, from_tier, to_tier, points, rank) SELECT user_id, _to, tier, nt, pts, r FROM _r;
  INSERT INTO league_tiers (user_id, week_start, tier, chest, chest_claimed)
    SELECT user_id, _target, nt, ch, false FROM _r
  ON CONFLICT (user_id, week_start) DO UPDATE SET tier = EXCLUDED.tier, chest = EXCLUDED.chest, chest_claimed = false;
  DROP TABLE _r;
END $$;

CREATE OR REPLACE FUNCTION public.league_settle() RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE cur date := public.league_week_start(now()); prev date := cur - 7; lastw date; cur_ts timestamptz;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext('league_settle'));
  IF EXISTS (SELECT 1 FROM league_tiers WHERE week_start = cur) THEN RETURN; END IF;
  SELECT max(week_start) INTO lastw FROM league_tiers;
  IF lastw IS NULL THEN RETURN; END IF;
  cur_ts := cur::timestamp AT TIME ZONE 'America/Costa_Rica';
  PERFORM public.league_apply(
    GREATEST(lastw::timestamp AT TIME ZONE 'America/Costa_Rica', COALESCE((SELECT max(closed_at) FROM league_closures WHERE closed_at < cur_ts), '-infinity'::timestamptz)),
    cur_ts, lastw, cur);
  INSERT INTO league_closures (closed_at, manual) VALUES (cur_ts, false);
END $$;

CREATE OR REPLACE FUNCTION public.league_close_now() RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE cur date := public.league_week_start(now()); t timestamptz := now();
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'admin only'; END IF;
  PERFORM public.league_settle();
  PERFORM pg_advisory_xact_lock(hashtext('league_settle'));
  PERFORM public.league_apply(public.league_window_start(), t, cur, cur);
  INSERT INTO league_closures (closed_at, manual) VALUES (t, true);
END $$;

CREATE OR REPLACE FUNCTION public.league_standings()
RETURNS TABLE (name text, avatar text, points bigint, is_me boolean, my_tier smallint, chest text, chest_claimed boolean)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE cur date := public.league_week_start(now()); me uuid := auth.uid(); t smallint; ws timestamptz;
BEGIN
  IF me IS NULL THEN RAISE EXCEPTION 'auth required'; END IF;
  PERFORM public.league_settle();
  INSERT INTO league_tiers (user_id, week_start, tier) VALUES (me, cur,
    COALESCE((SELECT x.tier FROM league_tiers x WHERE x.user_id = me ORDER BY x.week_start DESC LIMIT 1), 0))
  ON CONFLICT DO NOTHING;
  SELECT x.tier INTO t FROM league_tiers x WHERE x.user_id = me AND x.week_start = cur;
  ws := public.league_window_start();
  RETURN QUERY
  SELECT split_part(COALESCE(p.display_name, 'Estudiante'), ' ', 1) || COALESCE(' ' || left(NULLIF(split_part(p.display_name, ' ', 2), ''), 1) || '.', ''),
    COALESCE(p.avatar, '🦉'),
    COALESCE((SELECT sum(a.earned_points) FROM practice_attempts a WHERE a.user_id = l.user_id AND a.created_at >= ws), 0)::bigint AS pts,
    l.user_id = me, t,
    CASE WHEN l.user_id = me THEN l.chest END, CASE WHEN l.user_id = me THEN l.chest_claimed END
  FROM league_tiers l LEFT JOIN profiles p ON p.id = l.user_id
  WHERE l.week_start = cur AND l.tier = t
  ORDER BY pts DESC LIMIT 50;
END $$;

REVOKE EXECUTE ON FUNCTION public.league_apply(timestamptz, timestamptz, date, date) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.league_window_start() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.league_settle() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.league_close_now() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.league_close_now() TO authenticated;