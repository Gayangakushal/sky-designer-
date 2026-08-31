import { createFileRoute, notFound } from "@tanstack/react-router";
import BlogDetail from "@/pages/BlogDetail";
import { blogPostQuery } from "@/hooks/useBlog";
import { BlogApiError } from "@/lib/blog-api";
import { resolveBlogImageUrl } from "@/lib/blog-images";
import { absoluteUrl, cleanDescription, createSeoHead, SITE_URL } from "@/lib/seo";
import { founder, team } from "@/data/siteData";
import { getExistingBlogSeoProfile } from "@/data/existingBlogSeo";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ context, params }) => {
    try {
      const post = await context.queryClient.ensureQueryData(blogPostQuery(params.slug));
      if (!post || post.status !== "published") throw notFound();
      return { post, image: await resolveBlogImageUrl(post.featured_image) };
    } catch (error) {
      if (error instanceof BlogApiError && error.confirmedNotFound) throw notFound();
      throw error;
    }
  },
  head: ({ loaderData, params }) => {
    const post = loaderData?.post;
    const seoProfile = getExistingBlogSeoProfile(params.slug);
    const title =
      seoProfile?.seoTitle ||
      post?.seo_title ||
      (post ? `${post.title} | Sky Designers` : "Insight | Sky Designers");
    const description = cleanDescription(
      seoProfile?.seoDescription || post?.seo_description || post?.excerpt || "",
      "Read digital marketing and creative insights from Sky Designers in Sri Lanka.",
    );
    const path = `/blog/${params.slug}`;
    const base = createSeoHead({
      title,
      description,
      path,
      image: loaderData?.image,
      type: "article",
    });
    if (!post) return base;
    const published = post.published_at || post.created_at;
    const knownAuthor = post.author_name
      ? [founder, ...team].find(
          (person) => person.name.toLowerCase() === post.author_name?.trim().toLowerCase(),
        )
      : undefined;
    const author = post.author_name
      ? {
          "@type": "Person",
          name: post.author_name,
          ...(knownAuthor
            ? {
                jobTitle: knownAuthor.role,
                worksFor: { "@id": `${SITE_URL}/#organization` },
                url: `${SITE_URL}/about`,
              }
            : {}),
        }
      : { "@id": `${SITE_URL}/#organization` };
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${absoluteUrl(path)}#article`,
      mainEntityOfPage: absoluteUrl(path),
      headline: post.title,
      description,
      ...(loaderData.image ? { image: [loaderData.image] } : {}),
      author,
      datePublished: published,
      dateModified: post.updated_at || published,
      publisher: { "@id": `${SITE_URL}/#organization` },
      ...(seoProfile?.cluster ? { articleSection: seoProfile.cluster } : {}),
      inLanguage: "en-LK",
    };
    return {
      ...base,
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
    };
  },
  component: BlogDetail,
});
