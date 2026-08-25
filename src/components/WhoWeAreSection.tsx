import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import workspaceImage from "@/assets/optimized/inside-sky-designers-workspace.webp";

const WhoWeAreSection = () => (
  <section className="bg-white pb-20 sm:pb-24 lg:pb-32">
    <div className="site-container">
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75 }}
        className="group relative min-h-[520px] overflow-hidden rounded-[28px] bg-[#020713] shadow-[0_35px_100px_rgba(15,23,42,.24)] sm:min-h-[620px] lg:min-h-[720px] lg:rounded-[36px]"
      >
        <img
          src={workspaceImage}
          alt="Sky Designers team working at their office desks"
          width={1600}
          height={1200}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[58%_center] sm:object-center"
        />

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,.84),rgba(2,6,23,.28))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(23,107,255,.26),transparent_35%)]" />

        <div className="relative z-10 flex min-h-[520px] items-end p-7 sm:min-h-[620px] sm:p-12 lg:min-h-[720px] lg:p-16">
          <div className="max-w-3xl text-white">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-blue-400" />
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-300">
                Inside Sky Designers
              </p>
            </div>
            <h2 className="text-balance font-heading text-4xl font-extrabold leading-tight tracking-[-0.045em] sm:text-5xl lg:text-7xl">
              The people, energy, and thinking behind every project.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              We believe the strongest work happens when strategy and creativity sit at the same
              table. This is where ideas become campaigns, content, and experiences built to
              perform.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#team"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold text-slate-950 transition hover:-translate-y-0.5"
              >
                Meet the team <ArrowUpRight size={17} />
              </a>
              <span className="inline-flex items-center gap-3 text-sm font-bold text-slate-200">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10">
                  <Play size={16} fill="currentColor" />
                </span>
                Our story in motion
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default WhoWeAreSection;
