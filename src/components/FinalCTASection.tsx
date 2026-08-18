import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import MotionReveal from "./MotionReveal";
import { useCompany } from "@/hooks/useCompany";

const FinalCTASection = ({ onBookCall }: { onBookCall: () => void }) => {
  const company = useCompany();

  return (
  <section id="contact" className="relative overflow-hidden bg-primary py-20 text-white sm:py-24">
    <div className="absolute inset-0 agency-grid opacity-15" aria-hidden="true" />
    <div className="section-shell relative">
      <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <MotionReveal><p className="section-kicker text-[#F2C94C]">Start a conversation</p><h2 className="mt-5 max-w-4xl font-heading text-[clamp(2.4rem,6vw,5.6rem)] font-bold leading-[.98]">Ready to build a brand that performs?</h2><p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">Tell us what you are trying to achieve. We’ll help you identify the right next step for your marketing, creative or digital presence.</p></MotionReveal>
        <MotionReveal delay={0.08} className="flex flex-col gap-3 sm:flex-row lg:flex-col"><button onClick={onBookCall} className="group inline-flex min-h-14 items-center justify-between gap-7 rounded-lg bg-[#071A2F] px-6 font-bold shadow-xl transition hover:-translate-y-0.5">Book a Strategy Call <ArrowRight className="transition group-hover:translate-x-1" /></button><a href={company.whatsapp} target="_blank" rel="noreferrer" className="group inline-flex min-h-14 items-center justify-between gap-7 rounded-lg border border-white/35 px-6 font-bold transition hover:bg-white hover:text-primary">Contact on WhatsApp <MessageCircle size={19} /></a></MotionReveal>
      </div>
      <div className="mt-14 grid gap-4 border-t border-white/25 pt-7 text-sm text-white/72 sm:grid-cols-2 lg:grid-cols-4"><a href={`tel:${company.phone}`} className="flex items-center gap-3 transition hover:text-white"><Phone size={17} /> {company.phoneDisplay}</a><a href={`mailto:${company.email}`} className="flex min-w-0 items-center gap-3 break-all transition hover:text-white"><Mail size={17} className="shrink-0" /> {company.email}</a><span className="flex items-start gap-3 sm:col-span-2"><MapPin size={17} className="mt-0.5 shrink-0" /> {company.address}</span></div>
    </div>
  </section>
  );
};

export default FinalCTASection;
