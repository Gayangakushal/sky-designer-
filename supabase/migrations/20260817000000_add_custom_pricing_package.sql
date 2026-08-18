INSERT INTO public.pricing_packages (
  slug,
  tier,
  name,
  price_lkr,
  billing_period,
  description,
  badge,
  is_popular,
  is_active,
  sort_order,
  features
) VALUES (
  'custom',
  'CUSTOM',
  'Custom Growth Package',
  0,
  'custom',
  'A flexible digital solution tailored around your business goals, required services, campaign needs, and available budget.',
  NULL,
  false,
  true,
  5,
  ARRAY[
    'Custom digital strategy',
    'Flexible content & creative plan',
    'Social media management as required',
    'Advertising based on your budget',
    'Website / landing page support if required',
    'Custom reporting & consultation',
    'Dedicated support'
  ]
)
ON CONFLICT (slug) DO NOTHING;
