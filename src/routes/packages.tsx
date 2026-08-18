import { createFileRoute } from "@tanstack/react-router";
import Packages from "@/pages/Packages";

const title = "Marketing Packages & Pricing | Sky Designers";
const description =
  "Compare Sky Designers monthly marketing packages — Startup Foundation, Brand Growth, Market Leader and Omnichannel Dominance — with full feature breakdowns.";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Packages,
});
