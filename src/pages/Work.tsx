import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import SectionHeading from "@/components/common/SectionHeading";
import WorkCard from "@/components/work/WorkCard";
import { useContentCategories, usePublishedPosts } from "@/hooks/useContent";
import MotionReveal from "@/components/MotionReveal";
import { MOTION } from "@/lib/motion";
import { Link } from "@/lib/router-compat";
import { servicePages } from "@/data/servicePages";

const Work = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const { data: categories = [] } = useContentCategories();
  const { data: posts = [], isLoading, isFetching } = usePublishedPosts();
  const waitingForPosts = posts.length === 0 && (isLoading || isFetching);

  const filters = useMemo(
    () => [
      { slug: "all", name: "All" },
      ...categories.map((c) => ({ slug: c.slug, name: c.name })),
    ],
    [categories],
  );

  const visible = useMemo(
    () =>
      activeCategory === "all"
        ? posts
        : posts.filter((post) => post.category?.slug === activeCategory),
    [posts, activeCategory],
  );

  return (
    <div className="min-h-screen bg-[#030713]">
      <Navbar onBookCall={() => setBookingOpen(true)} />
      <main className="pt-28 pb-24 text-white">
        <div className="site-container">
          <SectionHeading
            eyebrow="Portfolio"
            title="Digital Marketing Portfolio in Sri Lanka"
            description="Explore advertising campaigns, social media, branding, video and website projects created by Sky Designers for businesses in Sri Lanka and beyond."
            light
            as="h1"
          />

          <div className="mt-10 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.slug}
                type="button"
                onClick={() => setActiveCategory(filter.slug)}
                className={`rounded-full border px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] transition ${
                  activeCategory === filter.slug
                    ? "border-blue-400/60 bg-blue-500/20 text-white"
                    : "border-white/12 bg-white/5 text-slate-300 hover:border-blue-400/40 hover:text-white"
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>

          <nav aria-label="Explore portfolio services" className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm">
            {servicePages.map((service) => (
              <Link key={service.slug} to={`/services/${service.slug}`} className="font-bold text-blue-300 transition hover:text-white">
                {service.title}
              </Link>
            ))}
          </nav>

          {waitingForPosts ? (
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-80 animate-pulse rounded-[24px] border border-white/10 bg-white/5"
                />
              ))}
            </div>
          ) : visible.length === 0 ? (
            <p className="mt-16 text-center text-slate-400">
              No published work in this category yet. New posts appear here as soon as they go live.
            </p>
          ) : (
            <section className="mt-12" aria-labelledby="portfolio-projects-heading">
              <h2 id="portfolio-projects-heading" className="sr-only">Published digital marketing and creative projects</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((post, index) => (
                  <MotionReveal key={post.id} delay={index * MOTION.stagger}>
                    <WorkCard post={post} />
                  </MotionReveal>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} selectedPackage="" />
    </div>
  );
};

export default Work;
