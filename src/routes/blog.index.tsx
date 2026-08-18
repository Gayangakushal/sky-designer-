import { createFileRoute } from "@tanstack/react-router";
import Blog from "@/pages/Blog";

export const Route = createFileRoute("/blog/")({
  ssr: false,
  head: () => ({ meta: [{ title: "Blog & Insights | Sky Designers" }, { name: "description", content: "Practical ideas on digital marketing, branding, technology and business growth from Sky Designers." }] }),
  component: Blog,
});
