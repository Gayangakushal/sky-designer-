import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import WorkCard from "@/components/work/WorkCard";
import { Link } from "@/lib/router-compat";
import { usePublishedPosts } from "@/hooks/useContent";
import MotionReveal from "./MotionReveal";
import { MOTION } from "@/lib/motion";

/**
 * Homepage "Latest Work" band: editorial mixed-size grid built from the
 * six most recent published content posts (featured first).
 */
const LatestWorkSection = () => {
  const { data: posts = [], isLoading } = usePublishedPosts(6);

  if (!isLoading && posts.length === 0) return null;

  return (
    <section id="portfolio" className="section-space bg-[#030713] text-white">
      <div className="site-container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Latest work"
            title="See What We've Been Creating"
            description="Explore our latest campaigns, designs, videos and digital projects."
            light
          />
          <Link
            to="/work"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:border-blue-400/50 hover:bg-white/10"
          >
            View All Work <ArrowUpRight size={17} />
          </Link>
        </div>

        {isLoading ? (
          <div className="mt-14 grid gap-5 lg:grid-cols-12">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`h-72 animate-pulse rounded-[24px] border border-white/10 bg-white/5 ${index % 2 === 0 ? "lg:col-span-7" : "lg:col-span-5"}`}
              />
            ))}
          </div>
        ) : (
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-12">
            {posts.map((post, index) => {
              // Alternating editorial rhythm: wide / narrow, narrow / wide.
              const wide = index % 4 === 0 || index % 4 === 3;
              return (
                <MotionReveal
                  key={post.id}
                  delay={index * MOTION.stagger}
                  className={wide ? "lg:col-span-7" : "lg:col-span-5"}
                >
                  <WorkCard post={post} large={wide} />
                </MotionReveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestWorkSection;
