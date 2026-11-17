REVOKE EXECUTE ON FUNCTION public.recreation_ranking(int) FROM authenticated;
COMMENT ON FUNCTION public.recreation_ranking(int) IS 'DEPRECATED: replaced by my_recreation_rank (no public names)';
CREATE OR REPLACE FUNCTION public.my_recreation_rank(_days int DEFAULT 7)
RETURNS TABLE(rank bigint, players bigint, points bigint, games bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  WITH s AS (
    SELECT r.user_id, sum(least(greatest(r.correct,0), greatest(r.questions,0), 50))*10 AS points, count(*) AS games
    FROM public.recreational_sessions r
    WHERE auth.uid() IS NOT NULL AND r.created_at >= now() - make_interval(days => least(greatest(_days,1),365))
    GROUP BY r.user_id
  ), ranked AS (SELECT s.*, rank() OVER (ORDER BY s.points DESC) AS rk, count(*) OVER () AS total FROM s)
  SELECT rk, total, points, games FROM ranked WHERE user_id = auth.uid()
$$;
REVOKE ALL ON FUNCTION public.my_recreation_rank(int) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.my_recreation_rank(int) TO authenticated;