import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { Link } from "@/lib/router-compat";
import { servicePages } from "@/data/servicePages";

const Services = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  return <div className="min-h-screen bg-white">
    <Navbar onBookCall={() => setBookingOpen(true)} />
    <main>
      <header className="relative overflow-hidden bg-[#030b1b] pb-20 pt-36 text-white sm:pt-40">
        <div className="blue-grid absolute inset-0 opacity-30" />
        <div className="site-container relative">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-300">Digital marketing services</p>
          <h1 className="mt-5 max-w-4xl font-heading text-4xl font-extrabold tracking-[-0.05em] sm:text-6xl">Connected creative and digital marketing services in Sri Lanka.</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">Sky Designers brings strategy, social media, performance advertising, branding, content production and website development together around your business goals.</p>
        </div>
      </header>
      <section className="site-container section-space" aria-labelledby="services-list-heading">
        <h2 id="services-list-heading" className="font-heading text-3xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-4xl">Choose the support your brand needs.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicePages.map(({ slug, title, description, features, icon: Icon }) => <article key={slug} className="flex h-full flex-col rounded-[24px] border border-slate-200 bg-slate-50 p-7">
            <Icon className="text-primary" aria-hidden="true" />
            <h3 className="mt-6 font-heading text-2xl font-bold text-slate-950">{title}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>
            <ul className="mt-5 grid gap-2 text-sm text-slate-700">{features.map((feature) => <li key={feature}>• {feature}</li>)}</ul>
            <Link to={`/services/${slug}`} className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-extrabold text-primary">Explore {title} <ArrowRight size={16} /></Link>
          </article>)}
        </div>
      </section>
    </main>
    <Footer />
    <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} selectedPackage="" />
  </div>;
};

export default Services;
