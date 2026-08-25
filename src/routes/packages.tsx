import { createFileRoute } from "@tanstack/react-router";
import Packages from "@/pages/Packages";
import { createSeoHead } from "@/lib/seo";

const title = "Marketing Packages & Pricing | Sky Designers";
const description =
  "Compare Sky Designers monthly marketing packages — Startup Foundation, Brand Growth, Market Leader and Omnichannel Dominance — with full feature breakdowns.";

export const Route = createFileRoute("/packages")({
  head: () => createSeoHead({ title, description, path: "/packages" }),
  component: Packages,
});
