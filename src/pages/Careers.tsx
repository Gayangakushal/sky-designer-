import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, BriefcaseBusiness, CalendarClock, Clock3, Laptop, Loader2, MapPin, Sparkles, Users } from "lucide-react";
import { Link } from "@/lib/router-compat";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import SectionHeading from "@/components/common/SectionHeading";
import JobApplicationForm from "@/components/JobApplicationForm";
import { usePublicVacancies } from "@/hooks/useVacancies";

const benefits = [
  { icon: Sparkles, title: "Creative ownership", text: "Contribute ideas and see your work move from concept to live campaign." },
  { icon: Users, title: "Collaborative team", text: "Work closely with design, content, advertising, and client teams." },
  { icon: BriefcaseBusiness, title: "Real client exposure", text: "Build experience across different industries and business challenges." },
];

const formatDeadline = (value: string | null) =>
  value ? new Date(`${value}T00:00:00`).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) : null;

const Careers = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState("");
  const { data: vacancies = [], isLoading, isError, error } = usePublicVacancies();

  const applyTo = (id: string) => {
    setSelectedVacancy(id);
    document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onBookCall={() => setBookingOpen(true)} />
      <main>
        <section className="relative overflow-hidden bg-[#030713] pb-24 pt-40 text-white sm:pb-28 sm:pt-48">
          <div className="blue-grid absolute inset-0 opacity-30" /><div className="absolute left-[15%] top-16 h-96 w-96 rounded-full bg-primary/18 blur-[120px]" />
          <div className="site-container relative">
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-bold uppercase tracking-[0.24em] text-blue-300">Careers at Sky Designers</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 max-w-5xl text-balance font-heading text-5xl font-extrabold leading-[1.02] tracking-[-0.06em] sm:text-6xl lg:text-8xl">Digital marketing careers <span className="text-gradient-primary">at Sky Designers.</span></motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">Join a growing creative team building content, campaigns, and digital experiences for ambitious brands.</motion.p>
            <motion.a href="#open-roles" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-9 inline-flex min-h-14 items-center gap-3 rounded-xl bg-primary px-7 text-sm font-extrabold text-white transition hover:-translate-y-1">View open roles <ArrowRight size={18} /></motion.a>
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="site-container">
            <SectionHeading eyebrow="Why join us" title="A place to sharpen your craft and create meaningful work." description="We value initiative, clarity, reliable execution, and people who care about making every project stronger." />
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {benefits.map(({ icon: Icon, title, text }, index) => <motion.div key={title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-[22px] border border-slate-200 bg-slate-50 p-7"><div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary"><Icon size={21} /></div><h3 className="mt-6 font-heading text-xl font-bold text-slate-950">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{text}</p></motion.div>)}
            </div>
          </div>
        </section>

        <section id="open-roles" className="section-space bg-slate-50">
          <div className="site-container">
            <SectionHeading
              eyebrow="Open positions"
              title="Find the role where you can do your best work."
              description={isLoading ? "Loading current openings..." : `${vacancies.length} application ${vacancies.length === 1 ? "option is" : "options are"} currently available.`}
            />

            {isLoading && (
              <div className="mt-12 grid gap-4">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="animate-pulse rounded-[22px] border border-slate-200 bg-white p-7">
                    <div className="h-3 w-24 rounded bg-slate-200" />
                    <div className="mt-4 h-6 w-64 rounded bg-slate-200" />
                    <div className="mt-4 h-3 w-full max-w-xl rounded bg-slate-100" />
                  </div>
                ))}
              </div>
            )}

            {isError && (
              <div className="mt-12 rounded-[22px] border border-red-200 bg-red-50 p-8 text-center">
                <AlertTriangle className="mx-auto h-10 w-10 text-red-500" />
                <h3 className="mt-4 font-heading text-xl font-bold text-slate-950">We could not load open positions</h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">{error instanceof Error ? error.message : "Please refresh the page and try again."}</p>
              </div>
            )}

            {!isLoading && !isError && vacancies.length === 0 && (
              <div className="mt-12 rounded-[22px] border border-slate-200 bg-white p-10 text-center">
                <BriefcaseBusiness className="mx-auto h-10 w-10 text-primary" />
                <h3 className="mt-4 font-heading text-2xl font-bold text-slate-950">No vacancies available right now</h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">We currently do not have any open positions. Please check again later.</p>
              </div>
            )}

            {!isLoading && !isError && vacancies.length > 0 && (
              <div className="mt-12 grid gap-4">
                {vacancies.map((vacancy, index) => {
                  const deadline = formatDeadline(vacancy.application_deadline);
                  return (
                    <motion.article key={vacancy.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="group rounded-[22px] border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_55px_rgba(15,23,42,.08)] sm:p-7">
                      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          {vacancy.department && <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">{vacancy.department}</p>}
                          <h3 className="mt-3 font-heading text-2xl font-bold text-slate-950">{vacancy.title}</h3>
                          {vacancy.short_description && <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{vacancy.short_description}</p>}
                          <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold text-slate-500">
                            {vacancy.location && <span className="flex items-center gap-1.5"><MapPin size={14} className="text-primary" />{vacancy.location}</span>}
                            {vacancy.employment_type && <span className="flex items-center gap-1.5"><BriefcaseBusiness size={14} className="text-primary" />{vacancy.employment_type}</span>}
                            {vacancy.work_mode && <span className="flex items-center gap-1.5"><Laptop size={14} className="text-primary" />{vacancy.work_mode}</span>}
                            {vacancy.experience_required && <span className="flex items-center gap-1.5"><Clock3 size={14} className="text-primary" />{vacancy.experience_required}</span>}
                            {deadline && <span className="flex items-center gap-1.5"><CalendarClock size={14} className="text-primary" />Apply before {deadline}</span>}
                          </div>
                        </div>
                        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                          <Link to={`/careers/${vacancy.slug}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-extrabold text-slate-900 transition hover:border-primary hover:text-primary">View Details</Link>
                          <button type="button" onClick={() => applyTo(vacancy.id)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#07101f] px-5 text-sm font-extrabold text-white transition group-hover:bg-primary">Apply Now <ArrowRight size={16} /></button>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <section id="apply-form" className="section-space bg-white">
          <div className="site-container grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
            <div className="lg:sticky lg:top-28"><SectionHeading eyebrow="Quick application" title="Send your details directly to our team." description="Choose a role, attach your CV, and include a short message. Your application is saved securely for our recruitment team." /></div>
            <JobApplicationForm vacancyId={selectedVacancy} onVacancyChange={setSelectedVacancy} />
          </div>
        </section>
      </main>
      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
      {isLoading && <span className="sr-only"><Loader2 /> Loading vacancies</span>}
    </div>
  );
};

export default Careers;
