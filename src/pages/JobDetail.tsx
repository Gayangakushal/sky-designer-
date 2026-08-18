import { useState } from "react";
import { ArrowLeft, BriefcaseBusiness, CalendarClock, CheckCircle2, Clock3, Laptop, MapPin, Sparkles } from "lucide-react";
import { Link, Navigate, useParams } from "@/lib/router-compat";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import JobApplicationForm from "@/components/JobApplicationForm";
import { usePublicVacancy } from "@/hooks/useVacancies";

const formatDeadline = (value: string | null) =>
  value ? new Date(`${value}T00:00:00`).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) : null;

const JobDetail = () => {
  const { jobSlug } = useParams();
  const [bookingOpen, setBookingOpen] = useState(false);
  const { data: job, isLoading, isError } = usePublicVacancy(jobSlug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar onBookCall={() => setBookingOpen(true)} />
        <div className="site-container flex min-h-[60vh] items-center justify-center pt-40">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (isError || !job) return <Navigate to="/careers" replace />;

  const deadline = formatDeadline(job.application_deadline);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onBookCall={() => setBookingOpen(true)} />
      <main>
        <section className="relative overflow-hidden bg-[#030713] pb-20 pt-40 text-white sm:pb-24 sm:pt-44">
          <div className="blue-grid absolute inset-0 opacity-30" /><div className="absolute right-[10%] top-10 h-96 w-96 rounded-full bg-primary/18 blur-[120px]" />
          <div className="site-container relative">
            <Link to="/careers" className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 transition hover:text-white"><ArrowLeft size={17} />Back to careers</Link>
            {job.department && <p className="mt-10 text-xs font-bold uppercase tracking-[0.22em] text-blue-300">{job.department}</p>}
            <h1 className="mt-5 max-w-4xl text-balance font-heading text-5xl font-extrabold tracking-[-0.055em] sm:text-6xl lg:text-7xl">{job.title}</h1>
            {job.short_description && <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{job.short_description}</p>}
            <div className="mt-7 flex flex-wrap gap-4 text-sm font-semibold text-slate-300">
              {job.location && <span className="flex items-center gap-2"><MapPin size={16} className="text-blue-300" />{job.location}</span>}
              {job.employment_type && <span className="flex items-center gap-2"><BriefcaseBusiness size={16} className="text-blue-300" />{job.employment_type}</span>}
              {job.work_mode && <span className="flex items-center gap-2"><Laptop size={16} className="text-blue-300" />{job.work_mode}</span>}
              {job.experience_required && <span className="flex items-center gap-2"><Clock3 size={16} className="text-blue-300" />{job.experience_required}</span>}
              {deadline && <span className="flex items-center gap-2"><CalendarClock size={16} className="text-blue-300" />Apply before {deadline}</span>}
            </div>
            <a href="#apply" className="mt-9 inline-flex min-h-14 items-center gap-3 rounded-xl bg-primary px-7 text-sm font-extrabold text-white transition hover:-translate-y-1">Apply Now</a>
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="site-container grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
            <div>
              <h2 className="font-heading text-3xl font-extrabold tracking-[-0.04em] text-slate-950">About the role</h2>
              {job.description && <p className="mt-5 whitespace-pre-line text-base leading-8 text-slate-600">{job.description}</p>}

              {job.responsibilities.length > 0 && (
                <div className="mt-10">
                  <h3 className="font-heading text-xl font-bold text-slate-950">What you will do</h3>
                  <div className="mt-5 grid gap-3">{job.responsibilities.map((item) => <div key={item} className="flex gap-3 text-sm leading-6 text-slate-600"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />{item}</div>)}</div>
                </div>
              )}

              {job.requirements.length > 0 && (
                <div className="mt-10">
                  <h3 className="font-heading text-xl font-bold text-slate-950">What we are looking for</h3>
                  <div className="mt-5 grid gap-3">{job.requirements.map((item) => <div key={item} className="flex gap-3 text-sm leading-6 text-slate-600"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />{item}</div>)}</div>
                </div>
              )}

              {job.benefits.length > 0 && (
                <div className="mt-10">
                  <h3 className="font-heading text-xl font-bold text-slate-950">What we offer</h3>
                  <div className="mt-5 grid gap-3">{job.benefits.map((item) => <div key={item} className="flex gap-3 text-sm leading-6 text-slate-600"><Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" />{item}</div>)}</div>
                </div>
              )}
            </div>

            <div id="apply" className="lg:sticky lg:top-28">
              <div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Apply now</p><h2 className="mt-3 font-heading text-3xl font-extrabold tracking-[-0.04em] text-slate-950">Send us your application.</h2></div>
              <JobApplicationForm vacancyId={job.id} lockPosition />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
};

export default JobDetail;
