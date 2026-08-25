import {
  ArrowUpRight,
  AtSign,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Youtube,
  type LucideProps,
} from "lucide-react";
import { Link } from "@/lib/router-compat";
import { services } from "@/data/siteData";
import { useCompany } from "@/hooks/useCompany";
import MotionReveal from "./MotionReveal";

const TikTokIcon = ({ size = 17, ...props }: LucideProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    {...props}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2-2.75v-3.5a6.33 6.33 0 1 0 5.45 6.25V8.73a8.2 8.2 0 0 0 4.77 1.52V6.81c-.34 0-.67-.04-1-.12Z" />
  </svg>
);

const footerContacts = [
  { name: "Gimhani", display: "075 225 7239", href: "tel:+94752257239" },
  { name: "Dilshan", display: "070 750 7298", href: "tel:+94707507298" },
  { name: "Yasara", display: "070 750 7296", href: "tel:+94707507296" },
];

const Footer = () => {
  const company = useCompany();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#02050c] text-white">
      <div className="blue-grid absolute inset-0 opacity-20" />
      <div className="site-container relative py-14 sm:py-18">
        <MotionReveal amount={0.08}>
          <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.2fr_.75fr_.85fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary font-heading text-sm font-extrabold">
                  SD
                </div>
                <div>
                  <p className="font-heading text-xl font-extrabold tracking-[-0.04em]">
                    Sky Designers
                  </p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.22em] text-blue-300">
                    {company.slogan}
                  </p>
                </div>
              </div>
              <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
                A Sri Lankan creative and digital marketing agency connecting strategy, content,
                advertising, design, and web development.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { icon: Facebook, href: company.facebook, label: "Facebook" },
                  { icon: Instagram, href: company.instagram, label: "Instagram" },
                  { icon: Linkedin, href: company.linkedin, label: "LinkedIn" },
                  { icon: AtSign, href: company.threads, label: "Threads" },
                  { icon: TikTokIcon, href: company.tiktok, label: "TikTok" },
                  { icon: Youtube, href: company.youtube, label: "YouTube" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:border-blue-400/40 hover:bg-primary hover:text-white hover:shadow-[0_6px_18px_rgba(37,99,235,0.22)]"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                Navigate
              </h3>
              <div className="mt-6 grid gap-3 text-sm font-semibold text-slate-300">
                <a href="/#about" className="transition hover:text-white">
                  About
                </a>
                <a href="/#portfolio" className="transition hover:text-white">
                  Our Work
                </a>
                <a href="/#team" className="transition hover:text-white">
                  Team
                </a>
                <Link to="/careers" className="transition hover:text-white">
                  Careers
                </Link>
                <Link to="/packages" className="transition hover:text-white">
                  Packages
                </Link>
                <Link to="/blog" className="transition hover:text-white">
                  Insights
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                Services
              </h3>
              <div className="mt-6 grid gap-3 text-sm font-semibold text-slate-300">
                {services.slice(0, 5).map((service) => (
                  <Link key={service.title} to={`/services/${service.slug}`} className="transition hover:text-white">
                    {service.shortTitle}
                  </Link>
                ))}
                <Link to="/services" className="font-bold text-blue-300 transition hover:text-white">All services</Link>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                Contact
              </h3>
              <div className="mt-6 grid gap-4">
                <a
                  href={`tel:${company.phone}`}
                  className="flex items-center gap-3 text-sm text-slate-300 transition hover:text-white"
                >
                  <Phone size={16} className="text-blue-300" />
                  {company.phoneDisplay}
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-start gap-3 break-all text-sm text-slate-300 transition hover:text-white"
                >
                  <Mail size={16} className="mt-0.5 shrink-0 text-blue-300" />
                  {company.email}
                </a>
                <div className="grid gap-2 border-t border-white/10 pt-4">
                  {footerContacts.map((contact) => (
                    <a
                      key={contact.name}
                      href={contact.href}
                      className="flex min-w-0 items-center gap-3 text-sm text-slate-300 transition hover:text-white"
                    >
                      <Phone size={15} className="shrink-0 text-blue-300" />
                      <span className="min-w-0">
                        <span className="font-semibold text-slate-200">{contact.name}</span>
                        <span aria-hidden="true"> — </span>
                        <span className="whitespace-nowrap">{contact.display}</span>
                      </span>
                    </a>
                  ))}
                </div>
                <a
                  href={company.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-white/10"
                >
                  WhatsApp <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} Sky Designers. All rights reserved.</p>
            <div className="flex gap-5">
              <Link to="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
              <span>Registration: {company.registration}</span>
            </div>
          </div>
        </MotionReveal>
      </div>
    </footer>
  );
};

export default Footer;
