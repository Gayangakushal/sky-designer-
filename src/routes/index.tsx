import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";

const title = "Sky Designers | Digital Marketing & Creative Agency Sri Lanka";
const description =
  "Sky Designers is a Sri Lankan digital marketing and creative agency for social media, Meta ads, branding, content production, and web development.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});
