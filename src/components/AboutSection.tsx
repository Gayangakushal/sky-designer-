import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">About</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gradient-primary">About Sky Designers</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-background/80 border border-border rounded-2xl p-8 md:p-12 shadow-lg"
        >
          <div className="flex flex-col md:flex-row md:items-start md:gap-8">
            <div className="flex-1">
              <p className="text-muted-foreground text-base leading-relaxed">
                At Sky Designers, we are more than just a marketing agency; we are your growth partners. Based in Sri Lanka, we specialize in helping businesses dominate the digital landscape through data-driven Meta Ads, creative content production, and cutting-edge WhatsApp marketing solutions. Our mission is to transform your brand's vision into measurable success.
              </p>

              <div className="mt-6 flex items-center gap-4">
                <span className="inline-block text-xs font-semibold text-foreground bg-muted/10 px-3 py-1 rounded-full">Registered Marketing Agency – Sri Lanka</span>
                <span className="text-muted-foreground text-sm">Business Registration: <span className="font-medium text-foreground">WP/GAM/WT/2024/00244</span></span>
              </div>
            </div>

            <div className="mt-6 md:mt-0 md:w-44 md:flex-shrink-0 text-center">
              <div className="inline-block w-36 h-36 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/5 flex items-center justify-center border border-border">
                <span className="text-sm font-heading font-semibold text-foreground">Sky Designers</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
