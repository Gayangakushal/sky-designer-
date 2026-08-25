-- The former combined policy evaluated has_role() for anonymous requests.
-- anon intentionally cannot execute that admin-only helper, which caused every
-- public content query with an embedded category to fail with PostgreSQL 42501.
DROP POLICY IF EXISTS "Anyone can view active categories" ON public.content_categories;

CREATE POLICY "Anyone can view active categories"
  ON public.content_categories
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Preserve the existing ability for authenticated admins to see inactive
-- categories without exposing them to public visitors.
CREATE POLICY "Admins can view all categories"
  ON public.content_categories
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
