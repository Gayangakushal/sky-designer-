import { createFileRoute } from "@tanstack/react-router";
import AdminStaffAccess from "@/pages/AdminStaffAccess";

export const Route = createFileRoute("/admin/staff-access")({
  ssr: false,
  head: () => ({ meta: [{ title: "Staff Access | Sky Designers" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: AdminStaffAccess,
});
