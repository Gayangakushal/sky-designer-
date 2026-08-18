import { createFileRoute } from "@tanstack/react-router";
import Privacy from "@/pages/Privacy";

const title = "Privacy Policy | Sky Designers";
const description = "How Sky Designers collects, uses and protects the information you share with us.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Privacy,
});
