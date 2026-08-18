import { createFileRoute } from "@tanstack/react-router";
import AdminBlog from "@/pages/AdminBlog";
export const Route = createFileRoute("/admin/blog/")({ ssr: false, head: () => ({ meta: [{ title: "Blog Management | Sky Designers" }, { name: "robots", content: "noindex, nofollow" }] }), component: AdminBlog });
