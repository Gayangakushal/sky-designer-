import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Target, Share2, Palette, MessageSquare, GitBranch, Award, X, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  { icon: Target, title: "Meta Ads Management", desc: "High-converting ad campaigns on Facebook & Instagram", price: "$499" },
  { icon: Code, title: "Web Development", desc: "Custom websites and web applications designed for performance, scalability, and modern user experience", price: "$999" },
  { icon: Share2, title: "Social Media Handling", desc: "Complete social media management & content strategy", price: "$399" },
  { icon: Palette, title: "Graphic Design", desc: "Stunning visuals for brand identity and campaigns", price: "$299" },
  { icon: MessageSquare, title: "Consultation", desc: "Expert digital marketing strategy & guidance", price: "$199" },
  { icon: GitBranch, title: "Funnel Building", desc: "High-conversion sales funnels that drive revenue", price: "$599" },
  { icon: Award, title: "Branding", desc: "Complete brand identity development & positioning", price: "$799" },
];

const serviceDetails: Record<string, { features: string[]; benefits: string[] }> = {
  "Meta Ads Management": {
    features: [
      "Campaign strategy & audience targeting",
      "Creative ad copy + design",
      "A/B testing & optimization",
      "Weekly performance reports",
    ],
    benefits: ["Increase qualified leads", "Maximise ad ROI", "Scale predictable growth"],
  },
  "Social Media Handling": {
    features: ["Content calendar & creation", "Community management", "Paid + organic growth", "Monthly analytics"],
    benefits: ["Stronger brand presence", "Improved engagement", "Consistent lead flow"],
  },
  "Graphic Design": {
    features: ["Logo & identity", "Marketing collateral", "Social creatives", "Brand guidelines"],
    benefits: ["Professional brand image", "Higher perceived value", "Faster creative turnaround"],
  },
  "Consultation": {
    features: ["One-on-one strategy calls", "Audit of current channels", "Actionable roadmap", "Follow-up support"],
    benefits: ["Clear marketing direction", "Reduced wasted spend", "Faster results"],
  },
  "Funnel Building": {
    features: ["Landing page design", "Email automation", "Checkout optimization", "Analytics setup"],
    benefits: ["Higher conversions", "Improved LTV", "Predictable revenue"],
  },
  "Branding": {
    features: ["Brand strategy workshops", "Visual identity", "Messaging framework", "Launch assets"],
    benefits: ["Stronger market position", "Clear customer messaging", "Brand recognition"],
  },
  "Web Development": {
    features: [
      "Custom website design (UI/UX)",
      "Responsive mobile-friendly development",
      "E-commerce functionality",
      "CMS integration (WordPress or custom)",
      "SEO-ready structure",
      "Speed optimization",
      "Hosting & deployment support",
    ],
    benefits: [
      "High-performance, SEO-friendly sites",
      "Improved conversions & user experience",
      "Scalable architecture for growth",
    ],
  },
};

const ServicesSection = ({ onBookCall }: { onBookCall: () => void }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<typeof services[0] | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openModal = (service: typeof services[0]) => {
    setActive(service);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setActive(null);
  };

  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">What We Offer</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gradient-primary">Our Services</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass-card p-8 group hover:glow-primary transition-shadow duration-500"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3 text-foreground">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{service.desc}</p>
              <div className="flex items-center justify-end">
                <Button onClick={() => openModal(service)} size="sm" variant="outline" className="border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                  See More
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Modal */}
        {open && active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/60" onClick={closeModal} />

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="relative w-full max-w-2xl mx-4 bg-background border border-border rounded-xl shadow-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                aria-label="Close details"
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-heading text-2xl font-semibold mb-2 text-foreground">{active.title}</h3>
              <p className="text-muted-foreground mb-4">{active.desc}</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Features</h4>
                  <ul className="list-inside list-disc text-sm text-muted-foreground space-y-2">
                    {(serviceDetails[active.title]?.features || []).map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Benefits</h4>
                  <ul className="list-inside list-disc text-sm text-muted-foreground space-y-2">
                    {(serviceDetails[active.title]?.benefits || []).map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button variant="ghost" onClick={closeModal} className="text-muted-foreground">Close</Button>
                <Button onClick={onBookCall}>Book a Call</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
