import { motion } from "framer-motion";
import { ArrowUpRight, BadgeCheck, Globe2, Lightbulb, Zap } from "lucide-react";
import officeTeam from "@/assets/optimized/sky-designers-office-team.webp";
import SectionHeading from "@/components/common/SectionHeading";
import { company } from "@/data/siteData";
import { MOTION } from "@/lib/motion";
import ImageReveal from "@/components/motion/ImageReveal";
import ParallaxMedia from "@/components/motion/ParallaxMedia";

const points = [
  {
    icon: Lightbulb,
    title: "Ideas with purpose",
    text: "Creative decisions shaped around your goals, audience, and offer.",
  },
  {
    icon: Zap,
    title: "Fast, focused execution",
    text: "A connected team that moves from strategy to delivery without unnecessary complexity.",
  },
  {
    icon: Globe2,
    title: "Built for digital",
    text: "Content and experiences designed for the platforms your customers use every day.",
  },
];

const AboutSection = () => (
  <section id="about" className="section-space overflow-hidden bg-white">
    <div className="site-container">
      <div className="grid items-center gap-14 lg:grid-cols-[.92fr_1.08fr] lg:gap-20">
        <div className="relative">
          <ImageReveal className="rounded-[30px] shadow-[0_35px_90px_rgba(15,23,42,.14)]">
            <div className="relative overflow-hidden rounded-[30px] bg-slate-100 p-3">
              <ParallaxMedia distance={12} className="-my-3">
                <img
                  src={officeTeam}
                  alt="Sky Designers team working together in the office"
                  width={1200}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full scale-[1.03] rounded-[23px] object-cover object-center sm:aspect-[16/10] lg:aspect-[4/4.6]"
                />
              </ParallaxMedia>
              <div className="absolute inset-x-3 bottom-3 rounded-b-[23px] bg-gradient-to-t from-slate-950/85 to-transparent px-7 pb-7 pt-24 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                  Registered Sri Lankan agency
                </p>
                <p className="mt-2 text-sm text-slate-200">
                  Business Registration: {company.registration}
                </p>
              </div>
            </div>
          </ImageReveal>
          <div className="absolute -right-5 top-8 hidden w-48 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:block">
            <BadgeCheck className="h-7 w-7 text-primary" />
            <p className="mt-4 font-heading text-lg font-bold text-slate-950">
              Your growth partner
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Strategy, creative, media, and technology in one team.
            </p>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Who we are"
            title="A creative growth team for brands ready to be seen differently."
            description="Sky Designers is a Sri Lankan digital marketing and creative agency. We bring strategy, advertising, design, content, and web development together to help businesses communicate clearly and grow with confidence."
          />

          <div className="mt-9 grid gap-5">
            {points.map(({ icon: Icon, title, text }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * MOTION.stagger,
                  duration: MOTION.reveal,
                  ease: MOTION.ease,
                }}
                className="premium-card group flex gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 hover:border-blue-200 hover:bg-white hover:shadow-lg"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:scale-105 group-hover:bg-primary group-hover:text-white">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <a
            href="/about"
            className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-primary transition hover:gap-3"
          >
            Learn more about Sky Designers <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
