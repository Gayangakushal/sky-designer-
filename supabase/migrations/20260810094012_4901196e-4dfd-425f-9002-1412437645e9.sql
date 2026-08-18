CREATE TABLE public.content_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.content_categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.content_categories TO authenticated;
GRANT ALL ON public.content_categories TO service_role;
ALTER TABLE public.content_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active categories" ON public.content_categories FOR SELECT TO anon, authenticated USING (is_active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert categories" ON public.content_categories FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update categories" ON public.content_categories FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete categories" ON public.content_categories FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_content_categories_updated_at BEFORE UPDATE ON public.content_categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.content_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  post_type text NOT NULL DEFAULT 'image',
  excerpt text,
  content text,
  category_id uuid REFERENCES public.content_categories(id) ON DELETE SET NULL,
  cover_image_url text,
  video_url text,
  youtube_url text,
  youtube_video_id text,
  client_name text,
  services text[] NOT NULL DEFAULT '{}'::text[],
  external_url text,
  status text NOT NULL DEFAULT 'draft',
  is_featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.content_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.content_posts TO authenticated;
GRANT ALL ON public.content_posts TO service_role;
ALTER TABLE public.content_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published posts" ON public.content_posts FOR SELECT TO anon, authenticated USING (status = 'published');
CREATE POLICY "Admins can view all posts" ON public.content_posts FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert posts" ON public.content_posts FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update posts" ON public.content_posts FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete posts" ON public.content_posts FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_content_posts_updated_at BEFORE UPDATE ON public.content_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.content_post_check()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.post_type NOT IN ('image','video','youtube','carousel','project') THEN
    RAISE EXCEPTION 'Invalid post_type: %', NEW.post_type;
  END IF;
  IF NEW.status NOT IN ('draft','published','archived') THEN
    RAISE EXCEPTION 'Invalid status: %', NEW.status;
  END IF;
  IF NEW.status = 'published' AND NEW.published_at IS NULL THEN
    NEW.published_at = now();
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER content_posts_check BEFORE INSERT OR UPDATE ON public.content_posts FOR EACH ROW EXECUTE FUNCTION public.content_post_check();

CREATE INDEX content_posts_status_idx ON public.content_posts (status, is_featured DESC, published_at DESC);
CREATE INDEX content_posts_category_idx ON public.content_posts (category_id);

CREATE TABLE public.content_post_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.content_posts(id) ON DELETE CASCADE,
  media_type text NOT NULL DEFAULT 'image',
  media_url text NOT NULL,
  thumbnail_url text,
  alt_text text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.content_post_media TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.content_post_media TO authenticated;
GRANT ALL ON public.content_post_media TO service_role;
ALTER TABLE public.content_post_media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view media of published posts" ON public.content_post_media FOR SELECT TO anon, authenticated USING (EXISTS (SELECT 1 FROM public.content_posts p WHERE p.id = post_id AND p.status = 'published'));
CREATE POLICY "Admins can view all media" ON public.content_post_media FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert media" ON public.content_post_media FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update media" ON public.content_post_media FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete media" ON public.content_post_media FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE INDEX content_post_media_post_idx ON public.content_post_media (post_id, sort_order);

INSERT INTO public.content_categories (name, slug, sort_order) VALUES
  ('Social Media', 'social-media', 1),
  ('Graphic Design', 'graphic-design', 2),
  ('Video & Reels', 'video-reels', 3),
  ('Paid Advertising', 'paid-advertising', 4),
  ('Branding', 'branding', 5),
  ('Web Development', 'web-development', 6),
  ('Productions', 'productions', 7);