import { motion } from "framer-motion";
import { Facebook, Youtube, Instagram, Linkedin, ChevronRight, MapPin, Phone, Mail, MessageCircle } from "lucide-react";

const usefulLinks = [
  { label: "Home", href: "#home" },
  { label: "Who We Are", href: "#team" },
  { label: "Contact Us", href: "#reviews" },
  { label: "Courses", href: "#services" },
  { label: "Solutions", href: "#services" },
  { label: "Knowledge Centre", href: "#portfolio" },
];

const services = [
  { label: "Meta Ads Management", href: "#meta-ads" },
  { label: "Social Media Handling", href: "#services" },
  { label: "Graphic Design", href: "/graphic-design" },
  { label: "Consultation", href: "#services" },
];

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/sky-designers/", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@skydesigners?si=vvigzHI3WzfNyxUo", label: "YouTube" },
  { icon: Facebook, href: "https://www.facebook.com/share/17wYxL7qKf/", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/js_sky_designers?igsh=MWh1dngyaDkwMGc0OA==", label: "Instagram" },
];

const Footer = () => (
  <footer className="relative pt-16 pb-6 border-t border-border">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div>
          <a href="#home" className="font-heading text-2xl font-bold text-gradient-primary inline-block mb-4">
            Sky Designers<span className="text-accent">.</span>
          </a>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            We are 10+ professional Digital Marketers 5 years of experience
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary hover:bg-primary/10 transition-all"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground mb-5">Useful Links</h3>
          <ul className="space-y-3">
            {usefulLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-muted-foreground text-sm hover:text-foreground transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Services */}
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground mb-5">Our Services</h3>
          <ul className="space-y-3">
            {services.map((service) => (
              <li key={service.label}>
                <a href={service.href} className="text-muted-foreground text-sm hover:text-foreground transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                  {service.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground mb-5">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground text-sm">Ministry Of Defence Rd, Battaramulla 10120</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-primary flex-shrink-0" />
              <a href="tel:+94779507298" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                +94 77 950 7298
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-primary flex-shrink-0" />
              <a href="mailto:Info@jsskydesigners.com" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                Info@skydesigners.com
              </a>
            </li>
          </ul>
        </div>
      </div>


      {/* Bottom bar */}
      <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-xs">
            Copyright 2025, <span className="text-primary font-medium">Novonex Software Solutions </span>. All Rights Reserved.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-muted-foreground text-xs hover:text-foreground transition-colors">Terms of Services</a>
          <a href="#" className="text-muted-foreground text-xs hover:text-foreground transition-colors">Privacy Policy</a>
        </div>
      </div>
    </div>

    {/* Floating chat buttons: Contact pill (left) + circular WhatsApp (right) */}
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      <motion.a
        href="https://wa.me/94779507298"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ translateY: -4 }}
        whileTap={{ translateY: 0 }}
        className="flex items-center gap-3 rounded-full bg-accent text-accent-foreground px-4 py-2.5 shadow-lg hover:shadow-2xl transition-transform"
        aria-label="Contact Us via WhatsApp"
        title="Contact Us"
      >
        <span className="font-medium text-sm">Contact Us</span>
      </motion.a>

      <motion.a
        href="https://wa.me/94779507298"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:shadow-2xl transition-transform"
        aria-label="WhatsApp chat"
        title="WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" aria-hidden="true">
          <path d="M20.52 3.48A11.9 11.9 0 0 0 12 0C5.373 0 .004 5.372.004 12.001c0 2.115.55 4.181 1.596 6.02L0 24l6.182-1.622A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-11.999 0-3.207-1.247-6.214-3.48-8.52z" fill="#fff" opacity="0.01"/>
          <path d="M17.472 14.382c-.297-.149-1.758-.868-2.03-.967-.273-.099-.472-.148-.672.149-.198.297-.768.966-.942 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.787-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.148-.174.198-.298.297-.497.099-.198 0-.372-.05-.52-.049-.149-.672-1.611-.92-2.206-.242-.579-.487-.5-.672-.51l-.573-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487 2.981 1.29 2.981.861 3.521.807.54-.049 1.758-.719 2.007-1.412.248-.693.248-1.287.173-1.412-.074-.124-.272-.198-.57-.347z" fill="#fff"/>
        </svg>
      </motion.a>
    </div>
  </footer>
);

export default Footer;
