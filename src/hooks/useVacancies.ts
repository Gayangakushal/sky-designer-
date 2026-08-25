import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchAllVacancies, fetchApplications, fetchPublicVacancies, fetchPublicVacancyBySlug } from "@/lib/recruitment";

export const publicVacanciesQuery = () =>
  queryOptions({ queryKey: ["vacancies", "public"], queryFn: fetchPublicVacancies, staleTime: 60_000 });

export const publicVacancyQuery = (slug: string) =>
  queryOptions({ queryKey: ["vacancies", "public", slug], queryFn: () => fetchPublicVacancyBySlug(slug), staleTime: 60_000 });

export const usePublicVacancies = () => useQuery(publicVacanciesQuery());

export const usePublicVacancy = (slug: string | undefined) =>
  useQuery({ ...publicVacancyQuery(slug ?? ""), enabled: Boolean(slug) });

export const useAdminVacancies = (enabled = true) =>
  useQuery({ queryKey: ["vacancies", "admin"], queryFn: fetchAllVacancies, enabled });

export const useAdminApplications = (enabled = true) =>
  useQuery({ queryKey: ["job_applications", "admin"], queryFn: fetchApplications, enabled });
