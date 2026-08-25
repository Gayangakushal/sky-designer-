import { useState } from "react";
import { ArrowRight, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { founder, services, team } from "@/data/siteData";
import { useCompany } from "@/hooks/useCompany";
import { Link } from "@/lib/router-compat";

const About = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const company = useCompany();
  const socialProfiles = [
    ["Facebook", company.facebook],
    ["Instagram", company.instagram],
    ["LinkedIn", company.linkedin],
    ["Threads", company.threads],
    ["TikTok", company.tiktok],
    ["YouTube", company.youtube],
  ] as const;

  return (
    <div className="min-h-screen bg-white">
      <Navbar onBookCall={() => setBookingOpen(true)} />
      <main>
        <header className="relative overflow-hidden bg-[#030b1b] pb-20 pt-36 text-white sm:pt-40">
          <div className="blue-grid absolute inset-0 opacity-30" />
          <div className="site-container relative">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-300">About Sky Designers</p>
            <h1 className="mt-5 max-w-5xl font-heading text-4xl font-extrabold tracking-[-0.05em] sm:text-6xl">
              A Sri Lankan digital marketing and creative agency
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Sky Designers brings digital strategy, performance advertising, social media,
              branding, content production, and website development together for businesses in
              Sri Lanka.
            </p>
          </div>
        </header>

        <section className="site-container grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_.9fr]" aria-labelledby="company-overview-heading">
          <article>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Company overview</p>
            <h2 id="company-overview-heading" className="mt-3 font-heading text-3xl font-extrabold tracking-[-0.04em] text-slate-950">
              What Sky Designers is
            </h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
              <p>
                Sky Designers is a digital marketing and creative agency based in Sri Lanka. The
                agency works as one connected team across strategy, advertising, design, content,
                and web delivery.
              </p>
              <p>
                Its public portfolio includes social media campaigns, advertising creative,
                video production, brand work, and website projects. The agency is registered in
                Sri Lanka under business registration {company.registration}.
              </p>
              <p>
                Businesses can review the agency’s <Link to="/services" className="font-bold text-primary">digital marketing services</Link>,
                inspect <Link to="/work" className="font-bold text-primary">published projects and case studies</Link>,
                or read the team’s <Link to="/blog" className="font-bold text-primary">digital marketing insights</Link>.
              </p>
            </div>
          </article>

          <aside className="rounded-[24px] bg-slate-50 p-7 sm:p-9" aria-labelledby="official-details-heading">
            <h2 id="official-details-heading" className="font-heading text-2xl font-bold text-slate-950">Official details</h2>
            <dl className="mt-6 grid gap-5 text-sm">
              <div><dt className="font-bold text-slate-950">Official brand name</dt><dd className="mt-1 text-slate-600">{company.name}</dd></div>
              <div><dt className="font-bold text-slate-950">Business category</dt><dd className="mt-1 text-slate-600">Digital marketing and creative agency</dd></div>
              <div><dt className="font-bold text-slate-950">Operating context</dt><dd className="mt-1 flex items-center gap-2 text-slate-600"><MapPin size={15} aria-hidden="true" /> {company.location}</dd></div>
              <div><dt className="font-bold text-slate-950">Business registration</dt><dd className="mt-1 text-slate-600">{company.registration}</dd></div>
            </dl>
            <div className="mt-7 grid gap-3 border-t border-slate-200 pt-6 text-sm">
              <a href={`tel:${company.phone}`} className="flex items-center gap-3 font-semibold text-slate-700"><Phone size={16} className="text-primary" /> {company.phoneDisplay}</a>
              <a href={`mailto:${company.email}`} className="flex items-center gap-3 font-semibold text-slate-700"><Mail size={16} className="text-primary" /> {company.email}</a>
            </div>
          </aside>
        </section>

        <section className="bg-slate-50 py-16 sm:py-20" aria-labelledby="about-services-heading">
          <div className="site-container">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Main services</p>
            <h2 id="about-services-heading" className="mt-3 font-heading text-3xl font-extrabold tracking-[-0.04em] text-slate-950">What the agency provides</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <article key={service.slug} className="rounded-[20px] border border-slate-200 bg-white p-6">
                  <h3 className="font-heading text-xl font-bold text-slate-950">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
                  <Link to={`/services/${service.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">
                    View service <ArrowRight size={15} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="site-container py-16 sm:py-20" aria-labelledby="leadership-heading">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <article>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Leadership</p>
              <h2 id="leadership-heading" className="mt-3 font-heading text-3xl font-extrabold tracking-[-0.04em] text-slate-950">{founder.name}, {founder.role}</h2>
              <p className="mt-5 text-base leading-8 text-slate-600">{founder.description}</p>
            </article>
            <article aria-labelledby="team-expertise-heading">
              <h2 id="team-expertise-heading" className="font-heading text-3xl font-extrabold tracking-[-0.04em] text-slate-950">Team expertise</h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                The published Sky Designers team combines operations, account management,
                digital marketing strategy, web execution, art direction, performance marketing,
                social media, graphic design, and administration.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {team.map((member) => (
                  <li key={member.name} className="rounded-xl border border-slate-200 p-4">
                    <span className="block font-bold text-slate-950">{member.name}</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500">{member.role}</span>
                  </li>
                ))}
              </ul>
              <a href="/#team" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">Meet the team on the homepage <ArrowRight size={15} /></a>
            </article>
          </div>
        </section>

        <section className="bg-[#030713] py-16 text-white sm:py-20" aria-labelledby="official-profiles-heading">
          <div className="site-container grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-300">Official profiles</p>
              <h2 id="official-profiles-heading" className="mt-3 font-heading text-3xl font-extrabold tracking-[-0.04em]">Follow Sky Designers</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">These profiles are the social channels linked by Sky Designers on this website.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                {socialProfiles.map(([name, href]) => (
                  <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-bold text-white">
                    {name} <ExternalLink size={14} />
                  </a>
                ))}
              </div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-7 sm:p-9">
              <h2 className="font-heading text-2xl font-bold">Explore or contact the agency</h2>
              <div className="mt-6 grid gap-3 text-sm font-bold">
                <Link to="/work" className="text-blue-200">View published work and case studies</Link>
                <Link to="/blog" className="text-blue-200">Read insights from the team</Link>
                <Link to="/careers" className="text-blue-200">View careers at Sky Designers</Link>
                <a href="/#contact" className="text-blue-200">Contact Sky Designers</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} selectedPackage="" />
    </div>
  );
};

export default About;
