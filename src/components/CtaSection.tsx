import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CtaSection = ({ onBookCall }: { onBookCall: () => void }) => (
  <section className="bg-slate-50 py-20 sm:py-24">
    <div className="site-container">
      <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#030713] px-7 py-14 text-center text-white shadow-[0_28px_80px_rgba(3,7,19,.24)] sm:px-12 sm:py-20">
        <div className="blue-grid absolute inset-0 opacity-20" />
        <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-white/18 blur-[90px]" />
        <div className="absolute -bottom-28 -right-16 h-72 w-72 rounded-full bg-blue-950/30 blur-[90px]" />
        <div className="relative mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-100">Your next move</p>
          <h2 className="mt-5 text-balance font-heading text-4xl font-extrabold leading-tight tracking-[-0.05em] sm:text-5xl lg:text-6xl">Ready to build something people notice?</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-blue-50 sm:text-lg">Bring us the idea, the challenge, or the goal. We will help you shape the right digital execution.</p>
          <button onClick={onBookCall} className="mt-9 inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-white px-7 text-sm font-extrabold text-slate-950 transition hover:-translate-y-1 hover:shadow-xl">Discuss Your Project <ArrowRight size={18} /></button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CtaSection;
