CREATE POLICY "Anyone can upload a CV" ON storage.objects
  FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'job-cvs');
CREATE POLICY "Admins can read CVs" ON storage.objects
  FOR SELECT TO authenticated USING (bucket_id = 'job-cvs' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete CVs" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'job-cvs' AND public.has_role(auth.uid(), 'admin'));