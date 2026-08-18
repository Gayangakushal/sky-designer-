import { motion, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";
import { company } from "@/data/siteData";
import { MOTION } from "@/lib/motion";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
    <path
      d="M20.5 11.7a8.5 8.5 0 0 1-12.55 7.47L3.5 20.5l1.28-4.33A8.5 8.5 0 1 1 20.5 11.7Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.15 7.8c.2-.45.4-.46.7-.47h.58c.18 0 .36.03.48.35l.7 1.7c.08.2.05.4-.08.57l-.55.7c-.14.16-.12.33-.03.5.54 1.03 1.35 1.84 2.38 2.38.18.1.35.1.5-.04l.74-.86c.15-.18.35-.23.55-.14l1.78.84c.22.1.35.27.3.52-.12.67-.45 1.3-.95 1.75-.55.5-1.34.7-2.1.5-1.15-.3-2.7-.96-4.12-2.35-1.18-1.15-1.92-2.43-2.25-3.5-.25-.8-.05-1.67.48-2.32.3-.38.58-.7.73-1.03Z"
      fill="currentColor"
    />
  </svg>
);

const FloatingContactActions = () => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.aside
      aria-label="Contact Sky Designers"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduceMotion ? 0 : 0.7, duration: MOTION.reveal, ease: MOTION.ease }}
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-[60] flex flex-col items-end gap-2 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] sm:right-6"
    >
      <motion.a
        href={company.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label={`Chat with Sky Designers on WhatsApp at ${company.phoneDisplay}`}
        title={`WhatsApp ${company.phoneDisplay}`}
        whileHover={reduceMotion ? undefined : { y: -2 }}
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        className="group grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-[#25D366] text-white shadow-[0_12px_34px_rgba(37,211,102,0.35)] transition-shadow duration-300 hover:shadow-[0_16px_42px_rgba(37,211,102,0.48)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:h-14 sm:w-14"
      >
        <motion.span
          animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
          className="grid h-9 w-9 place-items-center rounded-full bg-white/15 sm:h-11 sm:w-11"
        >
          <WhatsAppIcon />
        </motion.span>
      </motion.a>

      <motion.a
        href={`tel:${company.phone}`}
        aria-label={`Call Sky Designers at ${company.phoneDisplay}`}
        title={`Call ${company.phoneDisplay}`}
        whileHover={reduceMotion ? undefined : { y: -2 }}
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        className="group grid h-12 w-12 place-items-center rounded-full border border-blue-300/25 bg-[#071a3d] text-white shadow-[0_12px_34px_rgba(7,26,61,0.32)] transition duration-300 hover:border-blue-300/50 hover:bg-[#0a2452] hover:shadow-[0_16px_42px_rgba(7,26,61,0.46)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 sm:h-14 sm:w-14"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-500 text-white transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11">
          <Phone size={18} aria-hidden="true" />
        </span>
      </motion.a>
    </motion.aside>
  );
};

export default FloatingContactActions;
