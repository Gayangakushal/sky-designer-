import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { services } from "@/data/siteData";
import { usePricingData } from "@/hooks/usePricingData";
import { useCompany } from "@/hooks/useCompany";
import { Link } from "@/lib/router-compat";
import { pushConversionEvent } from "@/lib/conversion-events";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: string;
}

const initialForm = { name: "", phone: "", email: "", service: "", package: "", date: "", time: "" };

const BookingModal = ({ isOpen, onClose, selectedPackage = "" }: BookingModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [interestError, setInterestError] = useState(false);
  const [form, setForm] = useState(initialForm);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const { toast } = useToast();
  const { packages: pricingPackages } = usePricingData();
  const company = useCompany();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) setForm((current) => ({ ...current, package: selectedPackage }));
  }, [isOpen, selectedPackage]);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onKey);
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.service && !form.package) {
      toast({ title: "Select an interest", description: "Choose a service or investment package to discuss.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("bookings").insert({
      name: form.name.trim(),
      phone: form.phone.trim() || null,
      email: form.email.trim(),
      service: form.package ? `Investment Package: ${form.package}` : form.service,
      preferred_date: form.date || null,
      preferred_time: form.time || null,
    });
    setLoading(false);

    if (error) {
      toast({ title: "Could not submit", description: "Please try again or contact us through WhatsApp.", variant: "destructive" });
      return;
    }

    setSubmitted(true);
    window.setTimeout(() => {
      setSubmitted(false);
      setForm(initialForm);
      onClose();
    }, 2300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-[#020713]/85 p-4 backdrop-blur-lg" onMouseDown={onClose}>
          <motion.div initial={{ opacity: 0, scale: 0.96, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97, y: 10 }} transition={{ duration: 0.25 }} onMouseDown={(event) => event.stopPropagation()} className="relative my-8 w-full max-w-xl overflow-hidden rounded-[26px] border border-white/10 bg-[#07101f] p-6 text-white shadow-[0_35px_100px_rgba(0,0,0,.45)] sm:p-8" role="dialog" aria-modal="true" aria-labelledby="booking-title" aria-describedby="booking-description">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-[90px]" />
            <button onClick={onClose} className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white" aria-label="Close booking form"><X size={18} /></button>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative py-16 text-center" role="status" aria-live="polite">
                <CheckCircle2 className="mx-auto h-16 w-16 text-blue-400" />
                <h3 className="mt-6 font-heading text-2xl font-extrabold">Request received.</h3>
                <p id="booking-description" className="mt-3 text-sm text-slate-400">Our team will follow up using the contact details you provided.</p>
              </motion.div>
            ) : (
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-300">Project enquiry</p>
                <h3 id="booking-title" className="mt-3 pr-12 font-heading text-3xl font-extrabold tracking-[-0.04em]">Let’s discuss your next move.</h3>
                <p id="booking-description" className="mt-3 text-sm leading-6 text-slate-400">Share a few details about the service or package you want to discuss.</p>

                <form onSubmit={handleSubmit} className="mt-7 grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="grid gap-2"><Label htmlFor="booking-name" className="text-xs text-slate-300">Full name <span className="text-slate-500">(required)</span></Label><Input id="booking-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-12 border-white/10 bg-white/5 text-white placeholder:text-slate-600" placeholder="Your name" /></div>
                    <div className="grid gap-2"><Label htmlFor="booking-phone" className="text-xs text-slate-300">Phone number <span className="text-slate-500">(required)</span></Label><Input id="booking-phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="h-12 border-white/10 bg-white/5 text-white placeholder:text-slate-600" placeholder="+94" /></div>
                  </div>
                  <div className="grid gap-2"><Label htmlFor="booking-email" className="text-xs text-slate-300">Email address <span className="text-slate-500">(required)</span></Label><Input id="booking-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-12 border-white/10 bg-white/5 text-white placeholder:text-slate-600" placeholder="you@company.com" /></div>
                  <div className="grid gap-2"><Label htmlFor="booking-service" className="text-xs text-slate-300">Service</Label><Select value={form.service} onValueChange={(value) => setForm({ ...form, service: value })}><SelectTrigger id="booking-service" className="h-12 border-white/10 bg-white/5 text-white"><SelectValue placeholder="Select a service" /></SelectTrigger><SelectContent position="item-aligned" className="z-[100] max-h-72 border-white/10 bg-[#07101f] text-white shadow-2xl">{services.map((service) => <SelectItem key={service.title} value={service.title} className="cursor-pointer focus:bg-blue-500/20 focus:text-white">{service.title}</SelectItem>)}</SelectContent></Select></div>
                  <div className="grid gap-2"><Label htmlFor="booking-package" className="text-xs text-slate-300">Interested package</Label><Select value={form.package} onValueChange={(value) => setForm({ ...form, package: value })}><SelectTrigger id="booking-package" className="h-12 border-white/10 bg-white/5 text-white"><SelectValue placeholder="Select an investment package" /></SelectTrigger><SelectContent position="item-aligned" className="z-[100] max-h-72 border-white/10 bg-[#07101f] text-white shadow-2xl">{pricingPackages.map((pricingPackage) => <SelectItem key={pricingPackage.category} value={pricingPackage.optionLabel} className="cursor-pointer focus:bg-blue-500/20 focus:text-white">{pricingPackage.optionLabel}</SelectItem>)}</SelectContent></Select><p className="text-xs text-slate-500">Choose at least one service or package.</p></div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="grid gap-2"><Label htmlFor="booking-date" className="text-xs text-slate-300">Preferred date <span className="text-slate-500">(optional)</span></Label><Input id="booking-date" type="date" min={new Date().toISOString().split("T")[0]} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="h-12 border-white/10 bg-white/5 text-white [color-scheme:dark]" /></div>
                    <div className="grid gap-2"><Label htmlFor="booking-time" className="text-xs text-slate-300">Preferred time <span className="text-slate-500">(optional)</span></Label><Input id="booking-time" type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="h-12 border-white/10 bg-white/5 text-white [color-scheme:dark]" /></div>
                  </div>
                  <Button type="submit" disabled={loading} className="mt-1 h-13 rounded-xl bg-primary text-sm font-extrabold text-white hover:bg-blue-500">{loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</> : "Send Project Request"}</Button>
                  <p className="text-xs leading-5 text-slate-500">
                    We use these details to respond to your enquiry. Read our <Link to="/privacy" className="font-semibold text-blue-300 hover:text-white">Privacy Policy</Link>.
                    Prefer direct contact? <a href={company.whatsapp} target="_blank" rel="noreferrer" className="font-semibold text-blue-300 hover:text-white">WhatsApp</a> or <a href={`tel:${company.phone}`} className="font-semibold text-blue-300 hover:text-white">call {company.phoneDisplay}</a>.
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
