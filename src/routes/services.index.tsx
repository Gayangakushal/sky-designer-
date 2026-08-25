import { createFileRoute } from "@tanstack/react-router";
import Services from "@/pages/Services";
import { createSeoHead } from "@/lib/seo";

const title = "Digital Marketing Services Sri Lanka | Sky Designers";
const description = "Explore performance advertising, social media, branding, video production, website development and digital strategy services from Sky Designers Sri Lanka.";

export const Route = createFileRoute("/services/")({
  head: () => createSeoHead({ title, description, path: "/services" }),
  component: Services,
});
