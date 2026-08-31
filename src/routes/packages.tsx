import { createFileRoute } from "@tanstack/react-router";
import Packages from "@/pages/Packages";
import { createSeoHead } from "@/lib/seo";

const title = "Meta Ads Packages Sri Lanka | Sky Designers";
const description =
  "Compare Sky Designers Facebook, Instagram and TikTok advertising packages in Sri Lanka by campaign duration and business plan.";

export const Route = createFileRoute("/packages")({
  head: () => createSeoHead({ title, description, path: "/packages" }),
  component: Packages,
});
