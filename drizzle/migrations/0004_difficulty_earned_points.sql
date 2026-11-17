ALTER TABLE public.practice_attempts ADD COLUMN earned_points integer NOT NULL DEFAULT 0 CHECK (earned_points >= 0);
ALTER TABLE public.practice_attempts ADD COLUMN points_version integer NOT NULL DEFAULT 0;
COMMENT ON COLUMN public.practice_attempts.earned_points IS 'Server-calculated difficulty XP from correct canonical answers; version 0 historical rows have no difficulty XP.';
COMMENT ON COLUMN public.practice_attempts.points_version IS '0 legacy, 1 difficulty points. AI self-reported attempts earn no verified XP.';