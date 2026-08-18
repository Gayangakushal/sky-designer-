import { useQuery } from "@tanstack/react-query";
import { fetchAllVacancies, fetchApplications, fetchPublicVacancies, fetchPublicVacancyBySlug } from "@/lib/recruitment";

export const usePublicVacancies = () =>
  useQuery({ queryKey: ["vacancies", "public"], queryFn: fetchPublicVacancies, staleTime: 60_000 });

export const usePublicVacancy = (slug: string | undefined) =>
  useQuery({
    queryKey: ["vacancies", "public", slug],
    queryFn: () => fetchPublicVacancyBySlug(slug as string),
    enabled: Boolean(slug),
  });

export const useAdminVacancies = (enabled = true) =>
  useQuery({ queryKey: ["vacancies", "admin"], queryFn: fetchAllVacancies, enabled });

export const useAdminApplications = (enabled = true) =>
  useQuery({ queryKey: ["job_applications", "admin"], queryFn: fetchApplications, enabled });
