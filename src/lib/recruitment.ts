import { supabase } from "@/integrations/supabase/client";

export const VACANCY_STATUSES = ["draft", "active", "closed", "archived"] as const;
export type VacancyStatus = (typeof VACANCY_STATUSES)[number];

export const APPLICATION_STATUSES = ["new", "reviewing", "shortlisted", "interview", "hired", "rejected"] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export interface Vacancy {
  id: string;
  title: string;
  slug: string;
  department: string | null;
  location: string | null;
  employment_type: string | null;
  work_mode: string | null;
  experience_required: string | null;
  short_description: string | null;
  description: string | null;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  application_deadline: string | null;
  status: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id: string;
  vacancy_id: string | null;
  position: string;
  full_name: string;
  email: string;
  phone: string;
  current_location: string | null;
  years_of_experience: string | null;
  linkedin_profile: string | null;
  portfolio_website: string | null;
  cover_message: string;
  cv_file_path: string;
  cv_file_name: string;
  consent_given: boolean;
  status: string;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

const VACANCY_COLUMNS =
  "id,title,slug,department,location,employment_type,work_mode,experience_required,short_description,description,responsibilities,requirements,benefits,application_deadline,status,is_active,sort_order,created_at,updated_at";

const today = () => new Date().toISOString().slice(0, 10);

export const isVacancyOpen = (vacancy: Pick<Vacancy, "status" | "is_active" | "application_deadline">) =>
  vacancy.is_active && vacancy.status === "active" && (!vacancy.application_deadline || vacancy.application_deadline >= today());

/** Public: only active, published, non-expired vacancies. */
export const fetchPublicVacancies = async (): Promise<Vacancy[]> => {
  const { data, error } = await supabase
    .from("vacancies")
    .select(VACANCY_COLUMNS)
    .eq("is_active", true)
    .eq("status", "active")
    .or(`application_deadline.is.null,application_deadline.gte.${today()}`)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Vacancy[];
};

export const fetchPublicVacancyBySlug = async (slug: string): Promise<Vacancy | null> => {
  const { data, error } = await supabase
    .from("vacancies")
    .select(VACANCY_COLUMNS)
    .eq("slug", slug)
    .eq("is_active", true)
    .eq("status", "active")
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  const vacancy = data as Vacancy;
  return isVacancyOpen(vacancy) ? vacancy : null;
};

/** Admin: every vacancy regardless of status. */
export const fetchAllVacancies = async (): Promise<Vacancy[]> => {
  const { data, error } = await supabase
    .from("vacancies")
    .select(VACANCY_COLUMNS)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Vacancy[];
};

export const fetchApplications = async (): Promise<JobApplication[]> => {
  const { data, error } = await supabase.from("job_applications").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as JobApplication[];
};

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

const safeFileName = (name: string) => {
  const dot = name.lastIndexOf(".");
  const ext = dot > -1 ? name.slice(dot + 1).toLowerCase().replace(/[^a-z0-9]/g, "") : "pdf";
  const base = (dot > -1 ? name.slice(0, dot) : name).replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "cv";
  return `${base}.${ext}`;
};

export interface ApplicationInput {
  vacancyId: string;
  fullName: string;
  email: string;
  phone: string;
  currentLocation?: string;
  yearsOfExperience?: string;
  linkedinProfile?: string;
  portfolioWebsite?: string;
  coverMessage: string;
  file: File;
}

/**
 * Re-validates the vacancy, uploads the CV to the private `job-cvs` bucket, then
 * inserts the application. Cleans up an orphaned upload if the insert fails.
 */
export const submitApplication = async (input: ApplicationInput) => {
  const vacancy = await (async () => {
    const { data, error } = await supabase
      .from("vacancies")
      .select("id,title,status,is_active,application_deadline")
      .eq("id", input.vacancyId)
      .maybeSingle();
    if (error) throw error;
    return data;
  })();

  if (!vacancy || !isVacancyOpen(vacancy)) {
    throw new Error("This position is no longer accepting applications. Please pick another open role.");
  }

  const applicationId = crypto.randomUUID();
  const path = `job-applications/${vacancy.id}/${applicationId}/${Date.now()}-${safeFileName(input.file.name)}`;

  const upload = await supabase.storage.from("job-cvs").upload(path, input.file, {
    contentType: input.file.type || "application/octet-stream",
    upsert: false,
  });
  if (upload.error) throw new Error(`We could not upload your CV: ${upload.error.message}`);

  const { error: insertError } = await supabase.from("job_applications").insert({
    id: applicationId,
    vacancy_id: vacancy.id,
    position: vacancy.title,
    full_name: input.fullName,
    email: input.email,
    phone: input.phone,
    current_location: input.currentLocation || null,
    years_of_experience: input.yearsOfExperience || null,
    linkedin_profile: input.linkedinProfile || null,
    portfolio_website: input.portfolioWebsite || null,
    cover_message: input.coverMessage,
    cv_file_path: path,
    cv_file_name: input.file.name,
    consent_given: true,
    status: "new",
  });

  if (insertError) {
    // Remove the orphaned upload so the bucket stays clean.
    try {
      const { discardOrphanCv } = await import("@/lib/cv-cleanup.functions");
      await discardOrphanCv({ data: { path } });
    } catch {
      /* best effort */
    }
    throw new Error(insertError.message || "Your application could not be saved. Please try again.");
  }

  return { applicationId, path };
};

export const createCvSignedUrl = async (path: string, expiresIn = 60 * 10) => {
  const { data, error } = await supabase.storage.from("job-cvs").createSignedUrl(path, expiresIn);
  if (error) throw error;
  return data.signedUrl;
};

export const deleteCvFile = async (path: string) => {
  const { error } = await supabase.storage.from("job-cvs").remove([path]);
  if (error) throw error;
};
