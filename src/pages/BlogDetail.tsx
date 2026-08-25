import { useState } from "react";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { Link, useParams } from "@/lib/router-compat";
import { useBlogPost } from "@/hooks/useBlog";
import {
  BlogApiError,
  formatBlogDate,
  getPostCategoryName,
  sanitizeBlogHtml,
} from "@/lib/blog-api";
import { useBlogImageUrl } from "@/hooks/useBlogImageUrl";

const BlogDetail = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const [bookingOpen, setBookingOpen] = useState(false);
  const { data: post, isLoading, error, refetch } = useBlogPost(slug);

  const notFound = error instanceof BlogApiError && error.status === 404;
  const { url: image } = useBlogImageUrl(post?.featured_image);
  const readingMinutes = post
    ? Math.max(
        1,
        Math.ceil(
          post.content
            .replace(/<[^>]+>/g, " ")
            .split(/\s+/)
            .filter(Boolean).length / 220,
        ),
      )
    : 0;

  return (
    <div className="min-h-screen bg-white">
      <Navbar onBookCall={() => setBookingOpen(true)} />
      <main className="pt-[76px]">
        {isLoading ? (
          <div className="site-container py-24">
            <div className="mx-auto max-w-4xl space-y-6">
              <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
              <div className="h-16 animate-pulse rounded bg-slate-200" />
              <div className="aspect-[16/8] animate-pulse rounded-3xl bg-slate-200" />
            </div>
          </div>
        ) : !post ? (
          <section className="site-container grid min-h-[65vh] place-items-center py-24 text-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[.2em] text-primary">
                {notFound ? "404 / Article not found" : "Unable to load"}
              </p>
              <h1 className="mt-4 text-4xl font-extrabold text-slate-950">
                {notFound ? "This insight isn’t here." : "This article couldn’t be loaded."}
              </h1>
              <p className="mx-auto mt-4 max-w-lg text-slate-600">
                {notFound
                  ? "It may have been moved, renamed, or is no longer published."
                  : "Please check your connection and try once more."}
              </p>
              <div className="mt-7 flex justify-center gap-3">
                <Link
                  to="/blog"
                  className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white"
                >
                  Back to Blog
                </Link>
                {!notFound && (
                  <button
                    onClick={() => refetch()}
                    className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800"
                  >
                    Try again
                  </button>
                )}
              </div>
            </div>
          </section>
        ) : (
          <>
            <header className="relative overflow-hidden bg-[#030b1b] py-20 text-white sm:py-28">
              <div className="blue-grid absolute inset-0 opacity-25" />
              <div className="site-container relative">
                <div className="mx-auto max-w-4xl">
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-200 hover:text-white"
                  >
                    <ArrowLeft size={17} /> Back to Blog
                  </Link>
                  <p className="mt-10 text-xs font-extrabold uppercase tracking-[.2em] text-blue-300">
                    {getPostCategoryName(post)}
                  </p>
                  <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.08] tracking-[-.05em] sm:text-6xl">
                    {post.title}
                  </h1>
                  {post.excerpt && (
                    <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-8 flex flex-wrap gap-5 text-sm text-slate-400">
                    <span>By {post.author_name || "Sky Designers"}</span>
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays size={15} /> {formatBlogDate(post.published_at)}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Clock3 size={15} /> {readingMinutes} min read
                    </span>
                  </div>
                </div>
              </div>
            </header>
            <article className="site-container py-14 sm:py-20">
              <div className="mx-auto max-w-4xl">
                {image && (
                  <img
                    src={image}
                    alt={post.title}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="mb-12 aspect-[16/8] w-full rounded-3xl object-cover shadow-xl"
                  />
                )}
                <div
                  className="blog-prose"
                  dangerouslySetInnerHTML={{ __html: sanitizeBlogHtml(post.content) }}
                />
                <div className="mt-14 border-t border-slate-200 pt-8">
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 font-bold text-primary"
                  >
                    <ArrowLeft size={17} /> Back to all insights
                  </Link>
                </div>
              </div>
            </article>
          </>
        )}
      </main>
      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} selectedPackage="" />
    </div>
  );
};

export default BlogDetail;
