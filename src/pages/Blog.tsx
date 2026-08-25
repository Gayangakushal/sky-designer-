import { useState } from "react";
import { ArrowUpRight, BookOpen, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import MotionReveal from "@/components/MotionReveal";
import BlogCard from "@/components/blog/BlogCard";
import { usePublishedPosts } from "@/hooks/useBlog";
import { formatBlogDate, getPostCategoryName } from "@/lib/blog-api";
import { useBlogImageUrl } from "@/hooks/useBlogImageUrl";
import { Link } from "@/lib/router-compat";

const BlogSkeleton = () => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {[0, 1, 2, 3, 4, 5].map((item) => (
      <div key={item} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="aspect-[16/9] animate-pulse bg-slate-200" />
        <div className="space-y-4 p-6">
          <div className="h-3 w-2/5 animate-pulse rounded bg-slate-200" />
          <div className="h-7 w-4/5 animate-pulse rounded bg-slate-200" />
          <div className="h-16 animate-pulse rounded bg-slate-100" />
        </div>
      </div>
    ))}
  </div>
);

const Blog = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const { data: posts = [], isLoading, isError, refetch, isFetching } = usePublishedPosts();
  const featured = posts.find((post) => post.is_featured);
  const remaining = featured ? posts.filter((post) => post.id !== featured.id) : posts;
  const { url: featuredImage } = useBlogImageUrl(featured?.featured_image);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onBookCall={() => setBookingOpen(true)} />
      <main>
        <section className="relative overflow-hidden bg-[#030b1b] pb-20 pt-36 text-white sm:pb-24 sm:pt-40">
          <div className="blue-grid absolute inset-0 opacity-30" />
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
          <div className="site-container relative">
            <MotionReveal>
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-blue-300">
                Blog / Insights
              </p>
              <h1 className="mt-5 max-w-4xl font-heading text-4xl font-extrabold leading-[1.06] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                Insights for Brands <span className="text-gradient-primary">Ready to Grow.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Practical ideas on digital marketing, branding, social media, advertising,
                technology, and business growth.
              </p>
            </MotionReveal>
          </div>
        </section>

        <section className="site-container section-space">
          {isLoading ? (
            <BlogSkeleton />
          ) : isError ? (
            <div className="mx-auto max-w-xl rounded-2xl border border-red-100 bg-red-50 px-6 py-12 text-center">
              <RefreshCw className="mx-auto text-red-500" />
              <h2 className="mt-4 text-xl font-bold text-slate-950">
                Insights are temporarily unavailable
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We couldn’t connect to the blog service. Please try again.
              </p>
              <button
                onClick={() => refetch()}
                disabled={isFetching}
                className="mt-6 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white"
              >
                {isFetching ? "Trying again…" : "Try again"}
              </button>
            </div>
          ) : posts.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-slate-50 px-6 py-16 text-center">
              <BookOpen className="mx-auto text-primary" size={30} />
              <h2 className="mt-5 text-2xl font-extrabold text-slate-950">
                Fresh thinking is on the way
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Our team is preparing practical ideas for ambitious brands. Check back soon for the
                first insight.
              </p>
            </div>
          ) : (
            <>
              {featured && (
                <MotionReveal className="mb-16">
                  <article className="grid overflow-hidden rounded-3xl bg-[#06142b] text-white shadow-2xl lg:grid-cols-[1.15fr_.85fr]">
                    <div className="relative min-h-72 overflow-hidden bg-[#0b2349] lg:min-h-[460px]">
                      {featuredImage ? (
                        <img
                          src={featuredImage}
                          alt={`Featured insight: ${featured.title}`}
                          loading="eager"
                          fetchPriority="high"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      ) : (
                        <div className="blue-grid absolute inset-0" />
                      )}
                    </div>
                    <div className="flex flex-col justify-center p-8 sm:p-12">
                      <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-300">
                        Featured · {getPostCategoryName(featured)}
                      </span>
                      <h2 className="mt-5 font-heading text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl">
                        {featured.title}
                      </h2>
                      {featured.excerpt && (
                        <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">
                          {featured.excerpt}
                        </p>
                      )}
                      <p className="mt-5 text-xs font-semibold text-slate-400">
                        {formatBlogDate(featured.published_at)} ·{" "}
                        {featured.author_name || "Sky Designers"}
                      </p>
                      <Link
                        to={`/blog/${featured.slug}`}
                        className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-extrabold text-white"
                      >
                        Read Article <ArrowUpRight size={17} />
                      </Link>
                    </div>
                  </article>
                </MotionReveal>
              )}
              {remaining.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {remaining.map((post, index) => (
                    <MotionReveal key={post.id} delay={Math.min(index * 0.05, 0.2)}>
                      <BlogCard post={post} />
                    </MotionReveal>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} selectedPackage="" />
    </div>
  );
};

export default Blog;
