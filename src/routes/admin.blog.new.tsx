import { createFileRoute } from "@tanstack/react-router";
import AdminBlogEditor from "@/pages/AdminBlogEditor";
export const Route = createFileRoute("/admin/blog/new")({ ssr: false, head: () => ({ meta: [{ title: "New Blog Post | Sky Designers" }, { name: "robots", content: "noindex, nofollow" }] }), component: AdminBlogEditor });
