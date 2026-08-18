import { createFileRoute } from "@tanstack/react-router";
import GraphicDesignGallery from "@/pages/GraphicDesignGallery";

const title = "Graphic Design Gallery | Sky Designers";
const description =
  "Browse social media creatives, brand identity work and campaign design produced by the Sky Designers studio.";

export const Route = createFileRoute("/graphic-design")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: GraphicDesignGallery,
});
