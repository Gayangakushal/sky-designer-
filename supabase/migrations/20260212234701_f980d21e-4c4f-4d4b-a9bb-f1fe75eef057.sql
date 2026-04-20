
-- Portfolio items table
CREATE TABLE public.portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL DEFAULT 'image',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

-- Public can view, admin can CRUD
CREATE POLICY "Anyone can view portfolio" ON public.portfolio_items FOR SELECT USING (true);
CREATE POLICY "Admins can insert portfolio" ON public.portfolio_items FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update portfolio" ON public.portfolio_items FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete portfolio" ON public.portfolio_items FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Storage bucket for portfolio media
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true);

CREATE POLICY "Anyone can view portfolio files" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');
CREATE POLICY "Admins can upload portfolio files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete portfolio files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));
