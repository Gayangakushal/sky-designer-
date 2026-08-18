-- Pricing packages
CREATE TABLE public.pricing_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  tier TEXT NOT NULL,
  name TEXT NOT NULL,
  price_lkr INTEGER NOT NULL,
  billing_period TEXT NOT NULL DEFAULT '/mo',
  description TEXT,
  badge TEXT,
  is_popular BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.pricing_packages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pricing_packages TO authenticated;
GRANT ALL ON public.pricing_packages TO service_role;
ALTER TABLE public.pricing_packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active packages" ON public.pricing_packages
  FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Admins can view all packages" ON public.pricing_packages
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert packages" ON public.pricing_packages
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update packages" ON public.pricing_packages
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete packages" ON public.pricing_packages
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_pricing_packages_updated_at BEFORE UPDATE ON public.pricing_packages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Pricing categories
CREATE TABLE public.pricing_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.pricing_categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pricing_categories TO authenticated;
GRANT ALL ON public.pricing_categories TO service_role;
ALTER TABLE public.pricing_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view pricing categories" ON public.pricing_categories
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can insert pricing categories" ON public.pricing_categories
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update pricing categories" ON public.pricing_categories
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete pricing categories" ON public.pricing_categories
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_pricing_categories_updated_at BEFORE UPDATE ON public.pricing_categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Pricing features
CREATE TABLE public.pricing_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.pricing_categories(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.pricing_features TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pricing_features TO authenticated;
GRANT ALL ON public.pricing_features TO service_role;
ALTER TABLE public.pricing_features ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view pricing features" ON public.pricing_features
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can insert pricing features" ON public.pricing_features
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update pricing features" ON public.pricing_features
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete pricing features" ON public.pricing_features
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_pricing_features_updated_at BEFORE UPDATE ON public.pricing_features
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Pricing feature values
CREATE TABLE public.pricing_feature_values (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID REFERENCES public.pricing_packages(id) ON DELETE CASCADE,
  feature_id UUID REFERENCES public.pricing_features(id) ON DELETE CASCADE,
  included BOOLEAN,
  display_value TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (package_id, feature_id)
);
GRANT SELECT ON public.pricing_feature_values TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pricing_feature_values TO authenticated;
GRANT ALL ON public.pricing_feature_values TO service_role;
ALTER TABLE public.pricing_feature_values ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view pricing feature values" ON public.pricing_feature_values
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can insert pricing feature values" ON public.pricing_feature_values
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update pricing feature values" ON public.pricing_feature_values
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete pricing feature values" ON public.pricing_feature_values
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_pricing_feature_values_updated_at BEFORE UPDATE ON public.pricing_feature_values
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Site settings
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view site settings" ON public.site_settings
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can insert site settings" ON public.site_settings
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update site settings" ON public.site_settings
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete site settings" ON public.site_settings
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed packages
INSERT INTO public.pricing_packages (slug, tier, name, price_lkr, billing_period, description, badge, is_popular, sort_order) VALUES
('standard','STANDARD','Startup Foundation',35000,'/mo','Perfect for new businesses looking to establish a strong digital footprint.',NULL,false,1),
('premium','PREMIUM','Brand Growth Package',65000,'/mo','Designed for growing brands that need active market testing and consistent mid-tier content.',NULL,false,2),
('platinum','PLATINUM','Market Leader Package',100000,'/mo','Our most popular package for dominant market positioning and high-volume content output.','MOST POPULAR',true,3),
('corporate','CORPORATE','Omnichannel Dominance',200000,'/mo','A complete omnichannel growth solution designed for established businesses and corporate brands.',NULL,false,4);

-- Seed categories
INSERT INTO public.pricing_categories (name, sort_order) VALUES
('Advertising Platforms',1),
('Strategy & Onboarding',2),
('Content & Creative',3),
('Tech & Infrastructure',4),
('Support & Reporting',5);

-- Seed features
INSERT INTO public.pricing_features (category_id, label, sort_order)
SELECT c.id, f.label, f.sort_order
FROM (VALUES
  ('Advertising Platforms','Meta Ads – Facebook & Instagram',1),
  ('Advertising Platforms','TikTok Ads',2),
  ('Advertising Platforms','Google Ads – Search & Display',3),
  ('Advertising Platforms','YouTube & Performance Max Ads',4),
  ('Advertising Platforms','Active Campaigns Limit',5),
  ('Strategy & Onboarding','Kick-off Strategy Call',1),
  ('Strategy & Onboarding','Competitor Analysis',2),
  ('Strategy & Onboarding','Target Audience Mapping',3),
  ('Strategy & Onboarding','A/B Testing Strategy',4),
  ('Content & Creative','Monthly Creative Output',1),
  ('Content & Creative','Social Media Graphics',2),
  ('Content & Creative','Short-Form Videos',3),
  ('Content & Creative','Captions & Copywriting',4),
  ('Content & Creative','Professional Product Shoot',5),
  ('Tech & Infrastructure','Meta Pixel Integration',1),
  ('Tech & Infrastructure','Conversions API – CAPI',2),
  ('Tech & Infrastructure','Google Tag Manager – GTM',3),
  ('Tech & Infrastructure','Google Analytics 4 – GA4',4),
  ('Tech & Infrastructure','Website CRO / Lead Generation',5),
  ('Support & Reporting','Direct WhatsApp Support',1),
  ('Support & Reporting','Community Management',2),
  ('Support & Reporting','Monthly Strategy Call',3),
  ('Support & Reporting','Performance Reporting',4)
) AS f(category, label, sort_order)
JOIN public.pricing_categories c ON c.name = f.category;

-- Seed feature values
INSERT INTO public.pricing_feature_values (package_id, feature_id, included, display_value)
SELECT pk.id, ft.id,
  CASE WHEN e.val IN ('true','false') THEN e.val::boolean ELSE NULL END,
  CASE WHEN e.val IN ('true','false') THEN NULL ELSE e.val END
FROM (
  SELECT r.label, p.slug, r.vals[p.idx] AS val
  FROM (VALUES
    ('Meta Ads – Facebook & Instagram', ARRAY['true','true','true','true']),
    ('TikTok Ads', ARRAY['false','true','true','true']),
    ('Google Ads – Search & Display', ARRAY['false','false','true','true']),
    ('YouTube & Performance Max Ads', ARRAY['false','false','false','true']),
    ('Active Campaigns Limit', ARRAY['Up to 04','Up to 06','Up to 10','Unlimited']),
    ('Kick-off Strategy Call', ARRAY['true','true','true','true']),
    ('Competitor Analysis', ARRAY['false','true','true','true']),
    ('Target Audience Mapping', ARRAY['false','true','true','true']),
    ('A/B Testing Strategy', ARRAY['false','false','true','true']),
    ('Monthly Creative Output', ARRAY['Up to 08','Up to 13','15+ Premium Assets','Daily Output']),
    ('Social Media Graphics', ARRAY['true','true','true','true']),
    ('Short-Form Videos', ARRAY['true','true','true','true']),
    ('Captions & Copywriting', ARRAY['true','true','true','true']),
    ('Professional Product Shoot', ARRAY['false','false','01 per month','Monthly']),
    ('Meta Pixel Integration', ARRAY['true','true','true','true']),
    ('Conversions API – CAPI', ARRAY['false','true','true','true']),
    ('Google Tag Manager – GTM', ARRAY['false','false','true','true']),
    ('Google Analytics 4 – GA4', ARRAY['false','false','true','true']),
    ('Website CRO / Lead Generation', ARRAY['false','false','false','true']),
    ('Direct WhatsApp Support', ARRAY['true','true','true','true']),
    ('Community Management', ARRAY['false','Basic','Priority','VIP']),
    ('Monthly Strategy Call', ARRAY['false','false','true','true']),
    ('Performance Reporting', ARRAY['false','PDF Report','Live Dashboard','Live Dashboard'])
  ) AS r(label, vals)
  CROSS JOIN (VALUES ('standard',1),('premium',2),('platinum',3),('corporate',4)) AS p(slug, idx)
) AS e
JOIN public.pricing_packages pk ON pk.slug = e.slug
JOIN public.pricing_features ft ON ft.label = e.label;

-- Seed site settings
INSERT INTO public.site_settings (setting_key, setting_value) VALUES
('contact', '{"phone":"+94 74 234 5678","whatsapp":"+94 74 234 5678","email":"hello@skydesigners.lk","address":"Colombo, Sri Lanka"}'),
('hero', '{"badge":"Sri Lanka Digital Growth Studio","heading":"We build brands that win attention","description":"Strategy, creative, content, advertising and web development for ambitious brands."}'),
('social', '{"facebook":"","instagram":"","tiktok":"","linkedin":"","youtube":""}');