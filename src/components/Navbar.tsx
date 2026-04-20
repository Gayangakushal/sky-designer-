import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const servicesDropdown = [
  { label: "Meta Ads Management", href: "#services" },
  { label: "Web Development", href: "#services" },
  { label: "Social Media Handling", href: "#services" },
  { label: "Graphic Design", href: "/graphic-design" },
  { label: "Consultation", href: "#services" },
];

const worksDropdown = [
  { label: "Ads Campaign Results", href: "#portfolio" },
  { label: "Graphics Design", href: "#portfolio" },
  { label: "Video Creation Samples", href: "#portfolio" },
];

interface DropdownProps {
  label: string;
  items: { label: string; href: string }[];
  onNavigate?: () => void;
}

const NavDropdown = ({ label, items, onNavigate }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
      >
        {label}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-background border border-border rounded-xl shadow-xl z-50 py-2 overflow-hidden"
          >
            {items.map((item) =>
              item.href.startsWith("/") ? (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => {
                    setOpen(false);
                    onNavigate?.();
                  }}
                  className="block px-5 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setOpen(false);
                    onNavigate?.();
                  }}
                  className="block px-5 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  {item.label}
                </a>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = ({ onBookCall }: { onBookCall: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-t-0 border-x-0 rounded-none"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#home" className="font-heading text-xl font-bold text-gradient-primary">
          Sky Designers<span className="text-accent">.</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</a>
          <NavDropdown label="Services" items={servicesDropdown} />
          <NavDropdown label="Our Works" items={worksDropdown} />
          <a href="#team" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Team</a>
          <a href="#reviews" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Reviews</a>
          <Button onClick={onBookCall} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary">
            Book a Call
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <a href="#home" onClick={() => setIsOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</a>
              <NavDropdown label="Services" items={servicesDropdown} onNavigate={() => setIsOpen(false)} />
              <NavDropdown label="Our Works" items={worksDropdown} onNavigate={() => setIsOpen(false)} />
              <a href="#team" onClick={() => setIsOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Team</a>
              <a href="#reviews" onClick={() => setIsOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Reviews</a>
              <Button onClick={() => { onBookCall(); setIsOpen(false); }} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground w-fit">
                Book a Call
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
