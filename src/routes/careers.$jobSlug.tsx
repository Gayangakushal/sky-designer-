import { createFileRoute } from "@tanstack/react-router";
import JobDetail from "@/pages/JobDetail";

const title = "Job Opening | Careers at Sky Designers";
const description = "Role details, responsibilities and application form for this Sky Designers opening.";

export const Route = createFileRoute("/careers/$jobSlug")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: JobDetail,
});
