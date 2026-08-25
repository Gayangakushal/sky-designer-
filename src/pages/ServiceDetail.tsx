import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { Link } from "@/lib/router-compat";
import type { ServicePageData } from "@/data/servicePages";

const ServiceDetail = ({ service }: { service: ServicePageData }) => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const Icon = service.icon;
  return <div className="min-h-screen bg-white">
    <Navbar onBookCall={() => setBookingOpen(true)} />
    <main>
      <header className="relative overflow-hidden bg-[#030b1b] pb-20 pt-36 text-white sm:pt-40">
        <div className="blue-grid absolute inset-0 opacity-30" />
        <div className="site-container relative">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm font-bold text-blue-200"><ArrowLeft size={16} /> All services</Link>
          <Icon className="mt-10 text-blue-300" size={34} aria-hidden="true" />
          <h1 className="mt-5 max-w-4xl font-heading text-4xl font-extrabold tracking-[-0.05em] sm:text-6xl">{service.title} in Sri Lanka</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{service.introduction}</p>
        </div>
      </header>
      <section className="site-container section-space grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <article>
          <h2 className="font-heading text-3xl font-extrabold tracking-[-0.04em] text-slate-950">A practical, connected approach</h2>
          <p className="mt-5 text-base leading-8 text-slate-600">{service.approach}</p>
          <h2 className="mt-12 font-heading text-3xl font-extrabold tracking-[-0.04em] text-slate-950">What the service covers</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">{service.features.map((feature) => <li key={feature} className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-sm font-semibold text-slate-800"><Check size={17} className="shrink-0 text-primary" /> {feature}</li>)}</ul>
        </article>
        <aside className="rounded-[24px] bg-slate-50 p-7 sm:p-9">
          <h2 className="font-heading text-2xl font-bold text-slate-950">What you can expect</h2>
          <ul className="mt-6 grid gap-5">{service.outcomes.map((outcome) => <li key={outcome} className="flex gap-3 text-sm leading-7 text-slate-600"><Check size={18} className="mt-1 shrink-0 text-primary" /> {outcome}</li>)}</ul>
          <button type="button" onClick={() => setBookingOpen(true)} className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-extrabold text-white">Discuss this service <ArrowRight size={16} /></button>
          <p className="mt-5 text-xs leading-6 text-slate-500">Need a broader plan? Explore our <Link to="/services/digital-strategy-growth" className="font-bold text-primary">digital strategy and growth service</Link> or review <Link to="/work" className="font-bold text-primary">recent work</Link>.</p>
        </aside>
      </section>
    </main>
    <Footer />
    <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} selectedPackage={service.title} />
  </div>;
};

export default ServiceDetail;
