import { createFileRoute } from "@tanstack/react-router";
import BlogDetail from "@/pages/BlogDetail";

export const Route = createFileRoute("/blog/$slug")({
  ssr: false,
  head: () => ({ meta: [{ title: "Insight | Sky Designers" }, { name: "description", content: "Read the latest insight from Sky Designers." }] }),
  component: BlogDetail,
});
