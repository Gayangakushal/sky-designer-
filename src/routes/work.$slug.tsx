import { createFileRoute } from "@tanstack/react-router";
import WorkDetail from "@/pages/WorkDetail";

const title = "Work | Sky Designers Creative Showcase";
const description = "Campaign, design, video and digital project details from the Sky Designers creative team.";

export const Route = createFileRoute("/work/$slug")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkDetail,
});