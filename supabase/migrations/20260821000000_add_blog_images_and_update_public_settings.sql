-- Preserve each settings group while updating the requested current values.
INSERT INTO public.site_settings (setting_key, setting_value)
VALUES
  ('contact', jsonb_build_object('email', 'Info@skyDesigners.lk')),
  (
    'social',
    jsonb_build_object(
      'facebook', 'https://web.facebook.com/profile.php?id=100089002696067',
      'instagram', 'https://www.instagram.com/js_sky_designers/',
      'linkedin', 'https://lk.linkedin.com/company/sky-designers',
      'threads', 'https://www.threads.com/@js_sky_designers?xmt=AQG08qf4Pz6BzskfgCvBjwAlt5lzOQUseE8WOWhIO99nN1E',
      'tiktok', 'https://www.tiktok.com/@sky_designers',
      'youtube', 'https://youtube.com/@skydesigners?si=vvigzHI3WzfNyxUo'
    )
  ),
  (
    'hero',
    jsonb_build_object(
      'badge', 'Design Excellence Marketing Brilliance',
      'slogan', 'Design Excellence Marketing Brilliance'
    )
  )
ON CONFLICT (setting_key) DO UPDATE
SET setting_value = COALESCE(public.site_settings.setting_value, '{}'::jsonb) || EXCLUDED.setting_value;

UPDATE public.team_members SET name = 'Dilshan' WHERE lower(name) = 'dilashan';

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.site_settings;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
