import { createFileRoute } from "@tanstack/react-router";
import { fetchPublishedPosts as fetchBlogPosts } from "@/lib/blog-api";
import { fetchPublishedPosts as fetchWorkPosts } from "@/lib/content";
import { fetchPublicVacancies } from "@/lib/recruitment";
import { servicePages } from "@/data/servicePages";
import { absoluteUrl, escapeXml } from "@/lib/seo";

type SitemapEntry = { path: string; lastModified?: string | null };

const staticEntries: SitemapEntry[] = [
  { path: "/" },
  { path: "/about" },
  { path: "/services" },
  ...servicePages.map((service) => ({ path: `/services/${service.slug}` })),
  { path: "/blog" },
  { path: "/work" },
  { path: "/careers" },
  { path: "/packages" },
  { path: "/graphic-design" },
  { path: "/privacy" },
];

const xmlEntry = ({ path, lastModified }: SitemapEntry) => {
  const lastmod = lastModified ? `<lastmod>${escapeXml(new Date(lastModified).toISOString())}</lastmod>` : "";
  return `<url><loc>${escapeXml(absoluteUrl(path))}</loc>${lastmod}</url>`;
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const [blogResult, workResult, careerResult] = await Promise.allSettled([
          fetchBlogPosts(),
          fetchWorkPosts(),
          fetchPublicVacancies(),
        ]);
        const dynamicEntries: SitemapEntry[] = [];

        if (blogResult.status === "fulfilled") {
          dynamicEntries.push(...blogResult.value.posts
            .filter((post) => post.status === "published" && post.slug)
            .map((post) => ({ path: `/blog/${post.slug}`, lastModified: post.updated_at || post.published_at })));
        }
        if (workResult.status === "fulfilled") {
          dynamicEntries.push(...workResult.value
            .filter((post) => post.status === "published" && post.slug)
            .map((post) => ({ path: `/work/${post.slug}`, lastModified: post.updated_at || post.published_at })));
        }
        if (careerResult.status === "fulfilled") {
          dynamicEntries.push(...careerResult.value
            .filter((vacancy) => vacancy.status === "active" && vacancy.is_active && vacancy.slug)
            .map((vacancy) => ({ path: `/careers/${vacancy.slug}`, lastModified: vacancy.updated_at })));
        }

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...staticEntries, ...dynamicEntries].map(xmlEntry).join("")}</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
          },
        });
      },
    },
  },
});
