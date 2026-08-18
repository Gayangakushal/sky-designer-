import { createFileRoute } from "@tanstack/react-router";
import Careers from "@/pages/Careers";

const title = "Careers at Sky Designers | Join Our Creative Team";
const description =
  "Open roles at Sky Designers for marketers, designers, editors and developers who want to build brands in Sri Lanka and beyond.";

export const Route = createFileRoute("/careers/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Careers,
});
