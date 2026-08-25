import { createFileRoute, notFound } from "@tanstack/react-router";
import JobDetail from "@/pages/JobDetail";
import { publicVacancyQuery } from "@/hooks/useVacancies";
import { cleanDescription, createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/careers/$jobSlug")({
  loader: async ({ context, params }) => {
    const vacancy = await context.queryClient.ensureQueryData(publicVacancyQuery(params.jobSlug));
    if (!vacancy) throw notFound();
    return vacancy;
  },
  head: ({ loaderData, params }) => {
    const title = loaderData ? `${loaderData.title} Job | Careers at Sky Designers` : "Job Opening | Sky Designers";
    const description = cleanDescription(loaderData?.short_description || loaderData?.description || "", "View this open role and apply to join the Sky Designers team in Sri Lanka.");
    return createSeoHead({ title, description, path: `/careers/${params.jobSlug}` });
  },
  component: JobDetail,
});
