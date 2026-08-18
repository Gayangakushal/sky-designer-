import { createFileRoute } from "@tanstack/react-router";
import AdminLogin from "@/pages/AdminLogin";

export const Route = createFileRoute("/admin/login")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin Sign In | Sky Designers" },
      { name: "description", content: "Secure sign in for the Sky Designers website administrator." },
      { property: "og:title", content: "Admin Sign In | Sky Designers" },
      { property: "og:description", content: "Secure sign in for the Sky Designers website administrator." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLogin,
});
