import { createFileRoute } from "@tanstack/react-router";
import Careers from "@/pages/Careers";
import { createSeoHead } from "@/lib/seo";
import { publicVacanciesQuery } from "@/hooks/useVacancies";

const title = "Digital Marketing Jobs Sri Lanka | Sky Designers Careers";
const description =
  "Explore digital marketing and creative agency jobs at Sky Designers for marketers, designers, editors and developers in Sri Lanka.";

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
