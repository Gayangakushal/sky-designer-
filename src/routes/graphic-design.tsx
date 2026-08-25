import { createFileRoute } from "@tanstack/react-router";
import GraphicDesignGallery from "@/pages/GraphicDesignGallery";
import { createSeoHead } from "@/lib/seo";

const title = "Graphic Design Gallery | Sky Designers";
const description =
  "Browse social media creatives, brand identity work and campaign design produced by the Sky Designers studio.";

export const Route = createFileRoute("/graphic-design")({
  head: () => createSeoHead({ title, description, path: "/graphic-design" }),
  component: GraphicDesignGallery,
});
