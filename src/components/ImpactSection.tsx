import { BarChart3, Eye, Gauge, Route } from "lucide-react";
import MotionReveal from "./MotionReveal";

const impactAreas = [
  { icon: Gauge, title: "Campaign performance", text: "Measured against the objectives and KPIs agreed for each campaign." },
  { icon: Eye, title: "Content engagement", text: "Relevant platform signals are reviewed to guide creative decisions." },
  { icon: Route, title: "Customer journey", text: "Key touchpoints are considered from first attention through to action." },
  { icon: BarChart3, title: "Clear reporting", text: "Progress, learnings and next actions are kept visible to your team." },
];

const ImpactSection = () => (
  <section id="impact" className="bg-white py-20 sm:py-24 lg:py-28">
    <div className="section-shell">
      <div className="overflow-hidden rounded-2xl border border-[#C9D5E3] bg-[#F5F7FA]">
        <div className="grid lg:grid-cols-[.43fr_.57fr]">
          <MotionReveal className="bg-primary p-8 text-white sm:p-10 lg:p-12"><p className="section-kicker text-[#F2C94C]">Impact &amp; reporting</p><h2 className="mt-6 font-heading text-[clamp(2.15rem,4vw,3.8rem)] font-bold leading-[1.04]">Focused on signals that support better decisions.</h2><p className="mt-6 max-w-lg text-base leading-7 text-white/70">Every business has different objectives. Reporting is aligned to the work agreed, without relying on generic vanity numbers.</p></MotionReveal>
          <div className="grid sm:grid-cols-2">{impactAreas.map((item, index) => <MotionReveal key={item.title} delay={index * 0.05} className="border-b border-[#D4DEE9] p-7 last:border-b-0 sm:border-r sm:p-8 sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0"><item.icon className="h-7 w-7 text-primary" strokeWidth={1.6} /><h3 className="mt-7 font-heading text-xl font-semibold text-[#071A2F]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p></MotionReveal>)}</div>
        </div>
      </div>
    </div>
  </section>
);

export default ImpactSection;
