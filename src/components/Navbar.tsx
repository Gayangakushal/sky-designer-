import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "@/lib/router-compat";
import { useCompany } from "@/hooks/useCompany";
import { MOTION } from "@/lib/motion";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Our Work", href: "/work" },
  { label: "Packages", href: "/#pricing" },
  { label: "Team", href: "/#team" },
  { label: "Careers", href: "/careers" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

const BrandMark = ({ slogan }: { slogan: string }) => (
  <div className="flex min-w-0 items-center gap-3">
    <div className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-white/15 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,.12)]">
      <span className="absolute inset-0 bg-gradient-to-br from-[#3b82f6] via-[#176bff] to-[#075ddb]" />
      <span className="absolute inset-px rounded-[11px] bg-gradient-to-br from-white/15 to-transparent" />
      <span className="relative font-heading text-sm font-extrabold text-white">SD</span>
    </div>
    <div className="min-w-0 leading-none">
      <span className="block font-heading text-base font-extrabold tracking-[-0.03em] text-white">
        Sky Designers
      </span>
      <span className="mt-1 block max-w-[170px] truncate text-[7px] font-extrabold uppercase leading-tight tracking-[0.12em] text-[#b0b8c5] sm:text-[8px]">
        {slogan}
      </span>
    </div>
  </div>
);

const Navbar = ({ onBookCall }: { onBookCall: () => void }) => {
  const company = useCompany();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isCareer = location.pathname.startsWith("/careers");
  const isActiveNavItem = (href: string) => {
    if (href === "/careers") return isCareer;
    if (href === "/#pricing" && location.pathname === "/packages") return true;
    if (!href.includes("#"))
      return location.pathname === href || location.pathname.startsWith(`${href}/`);
    if (location.pathname !== "/") return false;
    const targetHash = href.split("#")[1];
    return targetHash === "home"
      ? !location.hash || location.hash === "#home"
      : location.hash === `#${targetHash}`;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: MOTION.reveal, ease: MOTION.ease }}
        className={`w-full border-b transition-all duration-500 ${
          scrolled || isCareer
            ? "border-white/[0.12] bg-[#06142b]/95 shadow-[0_14px_40px_rgba(0,0,0,.28)] backdrop-blur-xl"
            : "border-white/[0.1] bg-[#06142b]/80 shadow-[0_10px_35px_rgba(0,0,0,.2)] backdrop-blur-xl"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1440px] items-center justify-between px-4 transition-[height] sm:px-6 lg:px-8 ${scrolled ? "h-[68px]" : "h-[76px]"}`}
        >
          <Link
            to="/"
            aria-label="Sky Designers home"
            className="rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06142b]"
          >
            <BrandMark slogan={company.slogan} />
          </Link>

          <div className="hidden items-center gap-4 xl:gap-7 lg:flex">
            {navItems.map((item) => {
              const active = isActiveNavItem(item.href);
              const linkClass = `group relative rounded-sm text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06142b] ${active ? "text-white" : "text-[#b0b8c5] hover:text-white"}`;
              const underlineClass = `absolute -bottom-2 left-0 h-0.5 bg-primary transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`;

              return item.href.startsWith("/#") ? (
                <a
                  key={item.label}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={linkClass}
                >
                  {item.label}
                  <span className={underlineClass} />
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  aria-current={active ? "page" : undefined}
                  className={linkClass}
                >
                  {item.label}
                  <span className={underlineClass} />
                </Link>
              );
            })}
          </div>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <a
              href={company.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm text-xs font-extrabold uppercase tracking-[0.16em] text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06142b]"
            >
              WhatsApp
            </a>
            <button
              onClick={onBookCall}
              className="button-shine inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(23,107,255,.32)] transition hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06142b] xl:px-5"
            >
              Start a Project <ArrowUpRight size={16} />
            </button>
          </div>

          <button
            onClick={() => setOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.12] bg-white/[0.06] text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06142b] lg:hidden"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: MOTION.normal, ease: MOTION.ease }}
            className="mx-3 mt-2 max-h-[calc(100svh-92px)] overflow-y-auto rounded-2xl border border-white/10 bg-[#050b18]/95 p-5 shadow-2xl backdrop-blur-xl sm:mx-5 lg:hidden"
          >
            <div className="grid gap-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  {item.href.startsWith("/#") ? (
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold text-slate-200 hover:bg-white/5 hover:text-white"
                    >
                      {item.label}
                      <ArrowUpRight size={16} className="text-primary" />
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold text-slate-200 hover:bg-white/5 hover:text-white"
                    >
                      {item.label}
                      <ArrowUpRight size={16} className="text-primary" />
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
            <button
              onClick={() => {
                setOpen(false);
                onBookCall();
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-4 text-sm font-bold text-white"
            >
              Start a Project <ArrowUpRight size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
