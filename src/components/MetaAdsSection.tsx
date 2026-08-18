import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, MessageCircle, PhoneCall, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompany } from "@/hooks/useCompany";

const initialPackages = [
  {
    id: "standard",
    tier: "Standard",
    title: "Startup Foundation",
    price: "LKR 30,000",
    period: "/mo",
    description: "Perfect for new businesses looking to establish a basic digital footprint.",
    features: ["Creative Content 8", "Strategic Planning", "Standard Setup", "Meta Ads Management"],
    highlighted: false,
  },
  {
    id: "premium",
    tier: "Premium",
    title: "Brand Growth Package",
    price: "LKR 65,000",
    period: "/mo",
    description: "Designed for growing brands needing active market testing and mid-tier content.",
    features: ["Mid-Tier Content (Creative Content 15)", "Premium Setup"],
    highlighted: false,
  },
  {
    id: "platinum",
    tier: "Platinum",
    title: "Market Leader Package",
    price: "LKR 100,000",
    period: "/mo",
    description: "Our most popular tier for dominant market positioning and heavy content output.",
    features: [
      "Special Hook: Daily Content Package + Meta Blue Tick Verification Facilitation (Takes 6-8 weeks)",
      "Advanced ROI Reporting & Dashboards",
      "Ads Management (Meta + TikTok + LinkedIn)",
      "Creative Content (30)",
    ],
    highlighted: true,
  },
  {
    id: "corporate",
    tier: "Corporate",
    title: "Omnichannel Dominance",
    price: "LKR 200,000",
    period: "/mo",
    description: "The ultimate omnipresent strategy for large-scale corporate entities.",
    features: ["Full SEO", "Daily Posts", "Dedicated Video Production", "VIP Support"],
    highlighted: false,
  },
];

interface PackageItem {
  id: string;
  tier: string;
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
}

interface PackagesSectionProps {
  packages?: PackageItem[];
}

const MetaAdsSection = ({ packages: externalPackages }: PackagesSectionProps) => {
  const [packagesData, setPackagesData] = useState<PackageItem[]>(externalPackages ?? initialPackages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTier, setActiveTier] = useState("");

  useEffect(() => {
    if (externalPackages) {
      setPackagesData(externalPackages);
    }
  }, [externalPackages]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openModal = (tier: string) => {
    setActiveTier(tier);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveTier("");
  };

  const { phone: phoneNumber } = useCompany();
  const whatsappMessage = encodeURIComponent(`Hi, I'm interested in the ${activeTier} package.`);

  return (
    <section id="meta-ads" className="relative overflow-hidden bg-[#020520] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0.05)_0%,rgba(2,6,23,0.45)_100%)]" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-sky-400">Digital Growth</p>
          <h2 className="font-heading mb-3 text-4xl font-bold text-white md:text-6xl">Investment Packages</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Choose the tier that best fits your business growth objectives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {packagesData.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`flex h-full flex-col justify-between rounded-3xl p-8 shadow-[0_35px_80px_rgba(5,11,34,0.65)] backdrop-blur-xl ${
                pkg.highlighted
                  ? "border-2 border-blue-500/90 bg-blue-950/40 ring-2 ring-blue-500/20"
                  : "border border-border bg-slate-900/50"
              }`}
            >
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-sky-300">{pkg.tier}</span>
                  {pkg.highlighted ? (
                    <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold uppercase text-blue-300">
                      Most Popular
                    </span>
                  ) : null}
                </div>

                <h3 className="mb-3 text-2xl font-bold text-white">{pkg.title}</h3>

                <div className="mb-4 flex items-end gap-2">
                  <span className="text-4xl font-extrabold text-white md:text-5xl">{pkg.price}</span>
                  <span className="text-sm text-muted-foreground">{pkg.period}</span>
                </div>

                <p className="mb-6 text-sm text-muted-foreground">{pkg.description}</p>

                <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={`${pkg.tier}-${featureIndex}`} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button className="w-full" variant="secondary" onClick={() => openModal(pkg.tier)}>
                Select {pkg.tier}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm" onClick={closeModal}>
          <div
            className="w-full max-w-lg overflow-hidden rounded-[28px] border border-sky-200/60 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.45)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-sky-100 bg-[linear-gradient(135deg,rgba(240,249,255,1)_0%,rgba(219,234,254,0.95)_100%)] p-6 md:p-7">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Premium Support
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">{activeTier} Package</h3>
                  <p className="mt-2 text-sm text-slate-600">Choose your preferred contact method and we will help you get started.</p>
                </div>
                <button
                  onClick={closeModal}
                  aria-label="Close package dialog"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sky-200 bg-white text-sky-700 transition-colors hover:bg-sky-50"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="rounded-2xl border border-sky-100 bg-white/80 px-4 py-3 text-sm text-slate-600">
                Fast replies for package details, pricing clarifications, and onboarding guidance.
              </div>
            </div>

            <div className="space-y-4 p-6 md:p-7">
              <a
                href={`tel:${phoneNumber}`}
                className="group flex w-full items-center justify-between rounded-2xl border border-sky-200 bg-sky-50 px-5 py-4 text-left transition-all hover:border-sky-300 hover:bg-sky-100"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-lg shadow-sky-200">
                    <PhoneCall className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-slate-900">Call Now</div>
                    <div className="text-sm text-slate-600">Speak directly with our team</div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-sky-600 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href={`https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="group flex w-full items-center justify-between rounded-2xl border border-sky-200 bg-white px-5 py-4 text-left transition-all hover:border-sky-300 hover:bg-sky-50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-slate-900">WhatsApp</div>
                    <div className="text-sm text-slate-600">Send a quick message and get a reply</div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-sky-600 transition-transform group-hover:translate-x-1" />
              </a>

              <p className="pt-1 text-center text-sm text-slate-500">Click outside the card to close this window.</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default MetaAdsSection;
