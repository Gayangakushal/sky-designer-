import { motion } from "framer-motion";
import { CheckCircle, Target, ShieldCheck, FileText, BadgeCheck, Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "This is a Work-Based Service",
  "01 USD($) = LKR 310/-",
  "Service Fee = 1,500/- (per setup)",
  "Reports will be Provided",
  "Verified Ad Accounts",
  "Certified Advertisers",
];

const MetaAdsSection = ({ onBookCall }: { onBookCall: () => void }) => {
  return (
    <section id="meta-ads" className="py-24 relative overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">Paid Media</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gradient-primary">
            Meta Ads Management
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            High-converting ad campaigns on Facebook, Instagram, TikTok & SEO platforms
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left - Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-foreground text-lg font-medium">{feature}</p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="pt-6"
            >
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={onBookCall}
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8"
                >
                  Get Started
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all font-semibold px-8"
                >
                  <a href="/Client_Portfolio.pdf" target="_blank" rel="noopener noreferrer">
                    <FileText className="w-4 h-4 mr-2" />
                    View Portfolio
                    <ExternalLink className="w-3.5 h-3.5 ml-2" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Verification Card & Cost Formula */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Verification Card */}
            <div className="glass-card p-8 space-y-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-green-400" />
                <h3 className="font-heading text-xl font-bold text-foreground">Business Verification</h3>
                <BadgeCheck className="w-6 h-6 text-primary" />
              </div>

              <div className="glass-card p-4 space-y-3">
                <p className="text-sm text-muted-foreground">Select your verification use case</p>
                <div className="border border-border rounded-lg px-4 py-2.5">
                  <p className="text-foreground text-sm">Verifying a business or organisation</p>
                </div>
                <div className="pt-2">
                  <p className="font-semibold text-foreground">Verification for Sky Designers</p>
                  <p className="text-xs text-muted-foreground">Originally verified on Jun 27, 2024</p>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-medium">Verified</span>
                </div>
              </div>

              {/* Meta Certified Badge */}
              <div className="flex items-center justify-center mt-4">
                <div className="bg-primary/10 border border-primary/30 rounded-full px-6 py-3 flex items-center gap-3">
                  <span className="text-primary font-bold text-lg">Meta</span>
                  <div className="text-center">
                    <p className="text-xs text-accent font-semibold uppercase tracking-wider">Certified</p>
                    <p className="text-sm font-bold text-foreground">Digital Marketing Associate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Formula */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6 text-center glow-primary"
            >
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Total Cost Formula</p>
              <p className="font-heading text-xl md:text-2xl font-bold text-foreground">
                (310 × USD Amount) + <span className="text-accent">Service Fee</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MetaAdsSection;
