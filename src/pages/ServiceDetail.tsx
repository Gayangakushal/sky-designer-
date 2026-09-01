import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { Link } from "@/lib/router-compat";
import type { ServicePageData } from "@/data/servicePages";
import { usePublishedPosts } from "@/hooks/useContent";
import { relatedServicePagesForWork } from "@/lib/service-links";
import WorkCard from "@/components/work/WorkCard";
import { workEvidencePriority } from "@/data/workEvidence";

const ServiceDetail = ({ service }: { service: ServicePageData }) => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const Icon = service.icon;
  const { data: work = [] } = usePublishedPosts();
  const relatedWork = useMemo(
    () =>
      work
        .filter((project) =>
          relatedServicePagesForWork(project).some((related) => related.slug === service.slug),
        )
        .sort((a, b) => workEvidencePriority(b) - workEvidencePriority(a))
        .slice(0, 3),
    [service.slug, work],
  );
  return <div className="min-h-screen bg-white">
    <Navbar onBookCall={() => setBookingOpen(true)} />
    <main>
      <header className="relative overflow-hidden bg-[#030b1b] pb-20 pt-36 text-white sm:pt-40">
        <div className="blue-grid absolute inset-0 opacity-30" />
        <div className="site-container relative">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm font-bold text-blue-200"><ArrowLeft size={16} /> All services</Link>
          <Icon className="mt-10 text-blue-300" size={34} aria-hidden="true" />
          <h1 className="mt-5 max-w-4xl font-heading text-4xl font-extrabold tracking-[-0.05em] sm:text-6xl">{service.h1}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{service.introduction}</p>
        </div>
      </header>
      <section className="site-container section-space grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <article>
          <h2 className="font-heading text-3xl font-extrabold tracking-[-0.04em] text-slate-950">What is {service.title.toLowerCase()}?</h2>
          <p className="mt-5 text-base leading-8 text-slate-600">{service.definition}</p>
          <h2 className="mt-12 font-heading text-3xl font-extrabold tracking-[-0.04em] text-slate-950">Who this service is for</h2>
          <p className="mt-5 text-base leading-8 text-slate-600">{service.idealFor}</p>
          <h2 className="mt-12 font-heading text-3xl font-extrabold tracking-[-0.04em] text-slate-950">The business problem it addresses</h2>
          <p className="mt-5 text-base leading-8 text-slate-600">{service.businessProblem}</p>
          <h2 className="mt-12 font-heading text-3xl font-extrabold tracking-[-0.04em] text-slate-950">What affects the scope and cost?</h2>
          <p className="mt-5 text-base leading-8 text-slate-600">{service.scopeFactors}</p>
          <h2 className="mt-12 font-heading text-3xl font-extrabold tracking-[-0.04em] text-slate-950">What should you evaluate before choosing a provider?</h2>
          <ul className="mt-6 grid gap-4">
            {service.providerChecklist.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 p-4 text-sm font-semibold leading-6 text-slate-800">
                <Check size={17} className="mt-1 shrink-0 text-primary" /> {item}
              </li>
            ))}
          </ul>
          <h2 className="mt-12 font-heading text-3xl font-extrabold tracking-[-0.04em] text-slate-950">How Sky Designers provides the service</h2>
          <p className="mt-5 text-base leading-8 text-slate-600">{service.approach}</p>
          <h2 className="mt-12 font-heading text-3xl font-extrabold tracking-[-0.04em] text-slate-950">What the service covers</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">{service.features.map((feature) => <li key={feature} className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-sm font-semibold text-slate-800"><Check size={17} className="shrink-0 text-primary" /> {feature}</li>)}</ul>
        </article>
        <aside className="rounded-[24px] bg-slate-50 p-7 sm:p-9">
          <h2 className="font-heading text-2xl font-bold text-slate-950">What you can expect</h2>
          <ul className="mt-6 grid gap-5">{service.outcomes.map((outcome) => <li key={outcome} className="flex gap-3 text-sm leading-7 text-slate-600"><Check size={18} className="mt-1 shrink-0 text-primary" /> {outcome}</li>)}</ul>
          <button type="button" onClick={() => setBookingOpen(true)} className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-extrabold text-white">Discuss this service <ArrowRight size={16} /></button>
          <p className="mt-5 text-xs leading-6 text-slate-500">
            {service.slug === "digital-strategy-growth" ? (
              <>Ready to activate the plan? Explore our <Link to="/services/performance-advertising" className="font-bold text-primary">performance marketing service</Link></>
            ) : (
              <>Need a broader plan? Explore our <Link to="/services/digital-strategy-growth" className="font-bold text-primary">digital strategy and growth service</Link></>
            )}{" "}
            or review <Link to="/work" className="font-bold text-primary">relevant digital marketing work</Link>.
          </p>
        </aside>
      </section>
      <section className="bg-[#030713] py-16 text-white sm:py-20" aria-labelledby="related-work-heading">
          <div className="site-container">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-300">Related work</p>
                <h2 id="related-work-heading" className="mt-3 font-heading text-3xl font-extrabold tracking-[-0.04em]">Projects connected to {service.title.toLowerCase()}</h2>
              </div>
              <Link to="/work" className="text-sm font-bold text-blue-300">View all work <ArrowRight className="ml-1 inline" size={15} /></Link>
            </div>
            {relatedWork.length > 0 ? (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {relatedWork.map((project) => <WorkCard key={project.id} post={project} />)}
              </div>
            ) : (
              <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-300">
                Browse the complete portfolio for published Sky Designers projects. A project appears here only when its stored category, service labels, or visible topic match this service.
              </p>
            )}
            <p className="mt-6 max-w-3xl text-xs leading-6 text-slate-400">
              Published work demonstrates documented scope or creative output. Unless a project
              explicitly includes measurement context, it should not be read as proof of reach,
              leads, sales, revenue, or typical results for this service.
            </p>
          </div>
        </section>
      <section className="site-container py-16 sm:py-20" aria-labelledby="service-faq-heading">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Common questions</p>
        <h2 id="service-faq-heading" className="mt-3 font-heading text-3xl font-extrabold tracking-[-0.04em] text-slate-950">About this service</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {service.faqs.map((faq) => (
            <article key={faq.question} className="rounded-[20px] border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-heading text-lg font-bold text-slate-950">{faq.question}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm leading-7 text-slate-600">Learn more <Link to="/about" className="font-bold text-primary">about Sky Designers</Link>, browse <Link to="/blog" className="font-bold text-primary">digital marketing insights</Link>, or <a href="/#contact" className="font-bold text-primary">contact the team</a>.</p>
      </section>
    </main>
    <Footer />
    <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} selectedPackage={service.title} />
  </div>;
};

export default ServiceDetail;
