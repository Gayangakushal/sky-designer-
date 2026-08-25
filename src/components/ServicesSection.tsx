import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { services } from "@/data/siteData";
import { MOTION } from "@/lib/motion";
import { Link } from "@/lib/router-compat";

const ServicesSection = ({ onBookCall }: { onBookCall: () => void }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-clip bg-slate-50 py-24 sm:py-28 lg:py-36"
    >
      <div className="pointer-events-none absolute -left-48 top-1/3 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-10 h-80 w-80 rounded-full bg-sky-100/60 blur-3xl" />

      <div className="site-container relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div id="services-heading">
            <SectionHeading
              eyebrow="What we do"
              title="One connected team for your brand’s digital growth."
              description="From the first idea to launch and optimisation, our services are designed to work together—not as disconnected deliverables."
            />
          </div>
          <motion.button
            type="button"
            onClick={onBookCall}
            initial={prefersReducedMotion ? false : { opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={MOTION.viewport}
            transition={{ duration: MOTION.reveal, ease: MOTION.ease }}
            whileHover={prefersReducedMotion ? undefined : { y: -2 }}
            className="group inline-flex w-fit items-center gap-3 rounded-2xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-extrabold text-slate-950 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition-colors hover:border-primary hover:text-primary"
          >
            Discuss your project
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </motion.button>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: prefersReducedMotion ? 0 : MOTION.stagger,
              },
            },
          }}
          className="mt-14 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {services.map(({ slug, icon: Icon, title, description, features }) => (
            <motion.article
              key={title}
              variants={{
                hidden: prefersReducedMotion ? {} : { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: MOTION.reveal, ease: MOTION.ease }}
              whileHover={prefersReducedMotion ? undefined : { y: -4 }}
              className="group relative flex h-full min-h-[30rem] flex-col overflow-hidden rounded-[1.35rem] border border-blue-300/20 bg-[linear-gradient(180deg,#071a3d_0%,#0a234f_100%)] p-7 text-white shadow-[0_18px_48px_rgba(3,15,40,0.22),inset_0_1px_0_rgba(255,255,255,0.07)] transition-[border-color,box-shadow,transform] duration-300 hover:border-blue-300/45 hover:shadow-[0_26px_64px_rgba(3,20,55,0.32),0_0_32px_rgba(37,99,235,0.12),inset_0_1px_0_rgba(255,255,255,0.1)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-blue-400/[0.05] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-400/20 blur-3xl transition duration-500 group-hover:bg-blue-300/30" />

              <div className="relative grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-blue-300/30 bg-blue-500/20 text-blue-200 shadow-[0_0_22px_rgba(37,99,235,0.14),inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 group-hover:border-blue-200/55 group-hover:bg-blue-500/30 group-hover:text-white group-hover:shadow-[0_0_28px_rgba(59,130,246,0.28)]">
                <Icon
                  size={22}
                  strokeWidth={1.9}
                  className="transition-transform duration-300 group-hover:scale-105"
                  aria-hidden="true"
                />
              </div>

              <h3 className="relative mt-7 min-h-14 font-heading text-xl font-bold leading-7 tracking-[-0.025em] text-white">
                {title}
              </h3>
              <p className="relative mt-3 min-h-[5.25rem] text-sm leading-7 text-slate-300">
                {description}
              </p>

              <ul className="relative mt-6 grid gap-2.5" aria-label={`${title} features`}>
                {features.slice(0, 3).map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2.5 text-xs font-semibold text-slate-300/95"
                  >
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-blue-300/20 bg-blue-400/15 text-blue-200 transition-colors duration-300 group-hover:bg-blue-400/25 group-hover:text-white">
                      <Check size={12} strokeWidth={2.4} aria-hidden="true" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to={`/services/${slug}`}
                className="relative mt-auto inline-flex w-fit items-center gap-2 pt-8 text-sm font-extrabold text-blue-300 transition-colors hover:text-white"
              >
                Explore service
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
