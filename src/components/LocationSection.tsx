import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

const LocationSection = () => {
  return (
    <section id="location" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">Our Location</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gradient-primary">Find Us</h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="glass-card p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">Address</h3>
                <p className="text-muted-foreground text-sm">Ministry Of Defence Rd, Battaramulla 10120</p>
              </div>
            </div>

            <div className="glass-card p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">Phone</h3>
                <a href="tel:+94779507298" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  +94 77 950 7298
                </a>
              </div>
            </div>

            <div className="glass-card p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">Email</h3>
                <a href="mailto:Info@jsskydesigners.com" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  Info@skydesigners.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 rounded-xl overflow-hidden border border-border min-h-[350px]"
          >
            <iframe
              title="Sky Designers Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.974629869156!2d79.9385900752624!3d6.893637918750886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2f75f7193dc5b%3A0xeb378a4fde076831!2sSky%20Designers!5e0!3m2!1sen!2slk!4v1771133865380!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 350 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
