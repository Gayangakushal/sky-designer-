import { createFileRoute } from "@tanstack/react-router";
import AdminBlogEditor from "@/pages/AdminBlogEditor";
export const Route = createFileRoute("/admin/blog/$id/edit")({ ssr: false, head: () => ({ meta: [{ title: "Edit Blog Post | Sky Designers" }, { name: "robots", content: "noindex, nofollow" }] }), component: AdminBlogEditor });
