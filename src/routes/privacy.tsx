import { createFileRoute } from "@tanstack/react-router";
import Privacy from "@/pages/Privacy";
import { createSeoHead } from "@/lib/seo";

const title = "Privacy Policy | Sky Designers";
const description = "How Sky Designers collects, uses and protects the information you share with us.";

export const Route = createFileRoute("/privacy")({
  head: () => createSeoHead({ title, description, path: "/privacy" }),
  component: Privacy,
});
