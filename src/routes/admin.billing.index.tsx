import { createFileRoute } from "@tanstack/react-router";
import AdminBilling from "@/pages/AdminBilling";
export const Route = createFileRoute("/admin/billing/")({ ssr: false, head: () => ({ meta: [{ title: "Billing Dashboard | Sky Designers" }, { name: "robots", content: "noindex, nofollow" }] }), component: AdminBilling });
