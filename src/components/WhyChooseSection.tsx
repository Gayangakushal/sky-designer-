import { BarChart3, Boxes, Compass, Headphones, Sparkles } from "lucide-react";
import MotionReveal from "./MotionReveal";

const strengths = [
  { icon: Compass, title: "Strategy-led approach", text: "Every engagement begins with the business objective, audience and clearest route to market." },
  { icon: Sparkles, title: "Creative execution", text: "Campaign ideas, content and design are developed together for a consistent customer experience." },
  { icon: BarChart3, title: "Performance tracking", text: "Reporting and campaign signals inform what the team tests, improves and prioritises next." },
  { icon: Headphones, title: "Responsive support", text: "A connected local team keeps communication direct throughout planning, production and delivery." },
  { icon: Boxes, title: "Complete digital solutions", text: "Marketing, creative, branding and web capabilities work together instead of operating in silos." },
];

const WhyChooseSection = () => (
  <section id="about" className="bg-[#071A2F] py-20 text-white sm:py-24 lg:py-32">
    <div className="section-shell">
      <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
        <MotionReveal><p className="section-kicker text-[#69AEFF]">Why Sky Designers</p><h2 className="mt-5 max-w-xl font-heading text-[clamp(2.25rem,4.5vw,4.25rem)] font-bold leading-[1.05]">One connected team from first idea to launch.</h2></MotionReveal>
        <MotionReveal delay={0.08}><p className="max-w-2xl text-base leading-7 text-white/62 sm:text-lg sm:leading-8">Sky Designers brings strategy, paid media, content, design and development into a practical delivery system built around your business needs.</p><p className="mt-5 text-xs font-semibold uppercase tracking-[.16em] text-[#F2C94C]">Registered Marketing Agency · Sri Lanka · WP/GAM/WT/2024/00244</p></MotionReveal>
      </div>
      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-5">
        {strengths.map((strength, index) => <MotionReveal key={strength.title} delay={index * 0.05} className="bg-[#0A2038] p-6 lg:min-h-[280px]"><strength.icon className="h-8 w-8 text-[#F2C94C]" strokeWidth={1.5} /><p className="mt-10 text-[10px] font-bold uppercase tracking-[.2em] text-white/35">0{index + 1}</p><h3 className="mt-3 font-heading text-xl font-semibold leading-tight">{strength.title}</h3><p className="mt-4 text-sm leading-6 text-white/55">{strength.text}</p></MotionReveal>)}
      </div>
    </div>
  </section>
);

export default WhyChooseSection;
