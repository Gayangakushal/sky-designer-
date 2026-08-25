ALTER TABLE public.content_posts
  ADD COLUMN IF NOT EXISTS scheduled_at timestamptz;

CREATE OR REPLACE FUNCTION public.content_post_check()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.post_type NOT IN ('image', 'video', 'youtube', 'carousel', 'project') THEN
    RAISE EXCEPTION 'Invalid post_type: %', NEW.post_type;
  END IF;
  IF NEW.status NOT IN ('draft', 'scheduled', 'published', 'archived') THEN
    RAISE EXCEPTION 'Invalid content post status';
  END IF;
  IF NEW.status = 'scheduled' AND NEW.scheduled_at IS NULL THEN
    RAISE EXCEPTION 'Scheduled posts require scheduled_at';
  END IF;
  IF NEW.status = 'scheduled' AND NEW.published_at IS NULL THEN
    NEW.published_at = NEW.scheduled_at;
  END IF;
  IF NEW.status = 'published' AND NEW.published_at IS NULL THEN
    NEW.published_at = now();
  END IF;
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP POLICY IF EXISTS "Anyone can view published posts" ON public.content_posts;
DROP POLICY IF EXISTS "Anyone can view publicly available posts" ON public.content_posts;
CREATE POLICY "Anyone can view publicly available posts"
ON public.content_posts
FOR SELECT
TO anon, authenticated
USING (
  status = 'published'
  OR (status = 'scheduled' AND scheduled_at IS NOT NULL AND scheduled_at <= now())
);

DROP POLICY IF EXISTS "Anyone can view media of published posts" ON public.content_post_media;
DROP POLICY IF EXISTS "Anyone can view media of publicly available posts" ON public.content_post_media;
CREATE POLICY "Anyone can view media of publicly available posts"
ON public.content_post_media
FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.content_posts p
    WHERE p.id = post_id
      AND (
        p.status = 'published'
        OR (p.status = 'scheduled' AND p.scheduled_at IS NOT NULL AND p.scheduled_at <= now())
      )
  )
);

CREATE INDEX IF NOT EXISTS content_posts_scheduled_at_idx
  ON public.content_posts (scheduled_at)
  WHERE status = 'scheduled';
