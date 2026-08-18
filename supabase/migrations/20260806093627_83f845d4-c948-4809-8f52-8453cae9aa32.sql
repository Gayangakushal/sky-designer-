CREATE TABLE public.vacancies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  department text,
  location text,
  employment_type text,
  work_mode text,
  experience_required text,
  short_description text,
  description text,
  responsibilities text[] NOT NULL DEFAULT '{}',
  requirements text[] NOT NULL DEFAULT '{}',
  benefits text[] NOT NULL DEFAULT '{}',
  application_deadline date,
  status text NOT NULL DEFAULT 'draft',
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.vacancies TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.vacancies TO authenticated;
GRANT ALL ON public.vacancies TO service_role;

ALTER TABLE public.vacancies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view open vacancies" ON public.vacancies
  FOR SELECT TO anon, authenticated
  USING (is_active = true AND status = 'active' AND (application_deadline IS NULL OR application_deadline >= CURRENT_DATE));

CREATE POLICY "Admins can view all vacancies" ON public.vacancies
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert vacancies" ON public.vacancies
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update vacancies" ON public.vacancies
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete vacancies" ON public.vacancies
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_vacancies_updated_at BEFORE UPDATE ON public.vacancies
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vacancy_id uuid REFERENCES public.vacancies(id) ON DELETE SET NULL,
  position text NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  current_location text,
  years_of_experience text,
  linkedin_profile text,
  portfolio_website text,
  cover_message text NOT NULL,
  cv_file_path text NOT NULL,
  cv_file_name text NOT NULL,
  consent_given boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'new',
  admin_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX job_applications_vacancy_id_idx ON public.job_applications (vacancy_id);

GRANT INSERT ON public.job_applications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.job_applications TO authenticated;
GRANT ALL ON public.job_applications TO service_role;

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an application" ON public.job_applications
  FOR INSERT TO anon, authenticated WITH CHECK (consent_given = true);
CREATE POLICY "Admins can view applications" ON public.job_applications
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update applications" ON public.job_applications
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete applications" ON public.job_applications
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_job_applications_updated_at BEFORE UPDATE ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.vacancy_status_check()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.status NOT IN ('draft','active','closed','archived') THEN
    RAISE EXCEPTION 'Invalid vacancy status: %', NEW.status;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER vacancies_status_check BEFORE INSERT OR UPDATE ON public.vacancies
  FOR EACH ROW EXECUTE FUNCTION public.vacancy_status_check();

CREATE OR REPLACE FUNCTION public.application_status_check()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.status NOT IN ('new','reviewing','shortlisted','interview','hired','rejected') THEN
    RAISE EXCEPTION 'Invalid application status: %', NEW.status;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER job_applications_status_check BEFORE INSERT OR UPDATE ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION public.application_status_check();

INSERT INTO public.vacancies (title, slug, department, location, employment_type, work_mode, experience_required, short_description, description, responsibilities, requirements, benefits, status, is_active, sort_order) VALUES
('Creative Designer','creative-designer','Creative','Sri Lanka','Full-time','On-site','1+ year preferred','Create distinctive social media visuals and campaign artwork for a diverse client portfolio.','You will work closely with the social media and performance teams to transform campaign ideas into polished, platform-ready creative work.',
ARRAY['Design social media posts, ad creatives, and campaign key visuals.','Maintain brand consistency across multiple client accounts.','Prepare files accurately for digital publishing.','Collaborate with content and advertising specialists.'],
ARRAY['A strong portfolio of digital and social media design work.','Confidence using Adobe Photoshop and Illustrator or equivalent tools.','Good understanding of typography, hierarchy, and composition.','Ability to manage deadlines and receive feedback professionally.'],
ARRAY['Creative ownership of live client campaigns.','Collaborative, feedback-driven team culture.'],'active',true,1),
('Video Editor','video-editor','Content Production','Sri Lanka','Full-time','On-site','1+ year preferred','Edit short-form promotional, educational, and social media videos with strong pacing and polish.','You will shape raw footage into engaging brand content optimised for Facebook, Instagram, TikTok, and advertising placements.',
ARRAY['Edit reels, ads, interviews, and promotional video content.','Add subtitles, sound design, transitions, and motion graphics.','Organise project files and deliver multiple aspect ratios.','Work with the content team to improve retention and storytelling.'],
ARRAY['A portfolio or showreel demonstrating social-first editing.','Experience with Premiere Pro, After Effects, CapCut, or similar tools.','Strong sense of timing, music, and visual storytelling.','Ability to work accurately under campaign deadlines.'],
ARRAY['Work on high-visibility brand campaigns.','Access to modern production workflows.'],'active',true,2),
('General Application','general-application','Multiple Teams','Sri Lanka','Open application','Flexible','Any level','Share your profile with us even when your ideal role is not currently listed.','We are always interested in meeting talented people in design, content, advertising, web development, and account management.',
ARRAY['Tell us where you can create the most value.','Share relevant work samples and your preferred area of work.'],
ARRAY['A clear introduction and an up-to-date CV.','A portfolio or work samples where relevant.'],
ARRAY['Considered for future openings across all teams.'],'active',true,3);