CREATE POLICY "Authenticated can read portfolio files" ON storage.objects
  FOR SELECT TO authenticated USING (bucket_id = 'portfolio');
CREATE POLICY "Admins can upload portfolio files" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update portfolio files" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete portfolio files" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));