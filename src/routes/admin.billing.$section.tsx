import { createFileRoute } from "@tanstack/react-router";
import AdminBilling from "@/pages/AdminBilling";
export const Route = createFileRoute("/admin/billing/$section")({ ssr: false, head: () => ({ meta: [{ title: "Billing | Sky Designers" }, { name: "robots", content: "noindex, nofollow" }] }), component: BillingSection });
function BillingSection(){ const { section } = Route.useParams(); return <AdminBilling section={section}/>; }
