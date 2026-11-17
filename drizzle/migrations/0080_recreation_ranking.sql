CREATE OR REPLACE FUNCTION public.recreation_ranking(_days int DEFAULT 7)
RETURNS TABLE(rank bigint, player text, avatar text, points bigint, games bigint, is_me boolean)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  WITH s AS (
    SELECT r.user_id, sum(least(greatest(r.correct,0), greatest(r.questions,0), 50))*10 AS points, count(*) AS games
    FROM public.recreational_sessions r
    WHERE auth.uid() IS NOT NULL AND r.created_at >= now() - make_interval(days => least(greatest(_days,1),365))
    GROUP BY r.user_id
  )
  SELECT rank() OVER (ORDER BY s.points DESC), 
    coalesce(nullif(split_part(trim(p.display_name),' ',1),''),'Jugador') || coalesce(' ' || left(nullif(split_part(trim(p.display_name),' ',2),''),1) || '.',''),
    p.avatar, s.points, s.games, s.user_id = auth.uid()
  FROM s LEFT JOIN public.profiles p ON p.id = s.user_id
  ORDER BY s.points DESC LIMIT 20
$$;
REVOKE ALL ON FUNCTION public.recreation_ranking(int) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.recreation_ranking(int) TO authenticated;