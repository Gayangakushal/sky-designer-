import { createFileRoute } from "@tanstack/react-router";
import AdminDashboard from "@/pages/AdminDashboard";

export const Route = createFileRoute("/admin/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin Dashboard | Sky Designers" },
      { name: "description", content: "Manage packages, bookings, team, portfolio, reviews and site settings." },
      { property: "og:title", content: "Admin Dashboard | Sky Designers" },
      { property: "og:description", content: "Manage packages, bookings, team, portfolio, reviews and site settings." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboard,
});
