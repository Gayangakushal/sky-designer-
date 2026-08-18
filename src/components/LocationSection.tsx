import { motion } from "framer-motion";
import { ArrowUpRight, Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { company } from "@/data/siteData";

const contacts = [
  { icon: Phone, label: "Call us", value: company.phoneDisplay, href: `tel:${company.phone}` },
  { icon: Mail, label: "Email us", value: company.email, href: `mailto:${company.email}` },
  { icon: MessageCircle, label: "WhatsApp", value: "Start a conversation", href: company.whatsapp },
  { icon: MapPin, label: "Based in", value: company.location, href: undefined },
];

const LocationSection = () => (
  <section id="contact" className="section-space bg-white">
    <div className="site-container">
      <div className="overflow-hidden rounded-[30px] bg-[#030713] text-white shadow-[0_35px_100px_rgba(15,23,42,.2)]">
        <div className="grid lg:grid-cols-[1.03fr_.97fr]">
          <div className="relative overflow-hidden p-8 sm:p-12 lg:p-16">
            <div className="blue-grid absolute inset-0 opacity-30" />
            <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-primary/20 blur-[90px]" />
            <div className="relative">
              <SectionHeading eyebrow="Let’s talk" title="Tell us what you are building next." description="Share your goals, current challenges, or the service you need. Our team will guide you to the right next step." light />
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={company.whatsapp} target="_blank" rel="noreferrer" className="button-shine inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5">Message on WhatsApp <ArrowUpRight size={17} /></a>
                <a href={`mailto:${company.email}`} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-white/10">Send an email <Mail size={17} /></a>
              </div>
              <div className="mt-9 flex items-center gap-3 text-sm text-slate-400"><Clock3 size={17} className="text-blue-300" />Bookings are available before 5:00 PM.</div>
            </div>
          </div>

          <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-1">
            {contacts.map(({ icon: Icon, label, value, href }, index) => {
              const content = (
                <motion.div initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }} className="group flex min-h-[135px] items-center gap-5 bg-[#07101f] p-7 transition hover:bg-[#0a1628]">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/12 text-blue-300 transition group-hover:bg-primary group-hover:text-white"><Icon size={21} /></span>
                  <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{label}</p><p className="mt-2 break-all font-heading text-base font-bold text-white">{value}</p></div>
                </motion.div>
              );
              return href ? <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>{content}</a> : <div key={label}>{content}</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default LocationSection;
