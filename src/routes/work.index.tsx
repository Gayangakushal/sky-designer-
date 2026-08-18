import { createFileRoute } from "@tanstack/react-router";
import Work from "@/pages/Work";

const title = "Our Latest Work | Sky Designers Portfolio";
const description =
  "Explore the campaigns, designs, productions and digital experiences Sky Designers creates for brands in Sri Lanka and beyond.";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Work,
});