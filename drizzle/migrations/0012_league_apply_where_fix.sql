CREATE OR REPLACE FUNCTION public.league_apply(_from timestamptz, _to timestamptz, _source date, _target date) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  WITH pool AS (
    SELECT l.user_id, l.tier,
      COALESCE((SELECT sum(a.earned_points) FROM practice_attempts a WHERE a.user_id = l.user_id AND a.created_at >= _from AND a.created_at < _to), 0)::bigint AS pts
    FROM league_tiers l WHERE l.week_start = _source
  ), ranked AS (
    SELECT *, row_number() OVER (PARTITION BY tier ORDER BY pts DESC) AS r,
      row_number() OVER (PARTITION BY tier ORDER BY pts ASC) AS rr, count(*) OVER (PARTITION BY tier) AS n FROM pool
  ), res AS (
    SELECT user_id, tier, pts, r,
      CASE WHEN pts > 0 AND r <= 5 THEN LEAST(tier + 1, 3) WHEN n >= 8 AND rr <= 3 THEN GREATEST(tier - 1, 0) ELSE tier END::smallint AS nt,
      CASE WHEN pts > 0 AND r <= 5 THEN (ARRAY['🦉','🚀','🐆','🌋','🦜','🐢','⚡','🎓','⚙️','🔬','💻','📐'])[1 + floor(random()*12)::int] END AS ch
    FROM ranked
  ), hist AS (
    INSERT INTO league_history (user_id, closed_at, from_tier, to_tier, points, rank) SELECT user_id, _to, tier, nt, pts, r FROM res
  )
  INSERT INTO league_tiers (user_id, week_start, tier, chest, chest_claimed)
    SELECT user_id, _target, nt, ch, false FROM res
  ON CONFLICT (user_id, week_start) DO UPDATE SET tier = EXCLUDED.tier, chest = EXCLUDED.chest, chest_claimed = false;
END $$;
REVOKE EXECUTE ON FUNCTION public.league_apply(timestamptz, timestamptz, date, date) FROM PUBLIC, anon, authenticated;