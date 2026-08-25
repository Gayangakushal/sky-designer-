import { createFileRoute } from "@tanstack/react-router";
import Careers from "@/pages/Careers";
import { createSeoHead } from "@/lib/seo";
import { publicVacanciesQuery } from "@/hooks/useVacancies";

const title = "Careers at Sky Designers | Join Our Creative Team";
const description =
  "Open roles at Sky Designers for marketers, designers, editors and developers who want to build brands in Sri Lanka and beyond.";

export const Route = createFileRoute("/careers/")({
  loader: async ({ context }) => {
    const query = publicVacanciesQuery();
    try {
      return await context.queryClient.ensureQueryData(query);
    } catch (error) {
      console.error("[SEO] Careers SSR data unavailable:", error);
      context.queryClient.removeQueries({ queryKey: query.queryKey, exact: true });
      context.queryClient.setQueryData(query.queryKey, []);
      return [];
    }
  },
  head: () => createSeoHead({ title, description, path: "/careers" }),
  component: Careers,
});
