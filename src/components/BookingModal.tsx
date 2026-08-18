import { useEffect, useState } from "react";
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

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: string;
}

const initialForm = { name: "", phone: "", email: "", service: "", package: "", date: "", time: "" };

const BookingModal = ({ isOpen, onClose, selectedPackage = "" }: BookingModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialForm);
  const { toast } = useToast();
  const { packages: pricingPackages } = usePricingData();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) setForm((current) => ({ ...current, package: selectedPackage }));
  }, [isOpen, selectedPackage]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.service && !form.package) {
      toast({ title: "Select an interest", description: "Choose a service or investment package to discuss.", variant: "destructive" });
      return;
    }
    if (form.time && Number(form.time.split(":")[0]) >= 17) {
      toast({ title: "Choose an earlier time", description: "Bookings are available before 5:00 PM.", variant: "destructive" });
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
          <motion.div initial={{ opacity: 0, scale: 0.96, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97, y: 10 }} transition={{ duration: 0.25 }} onMouseDown={(event) => event.stopPropagation()} className="relative my-8 w-full max-w-xl overflow-hidden rounded-[26px] border border-white/10 bg-[#07101f] p-6 text-white shadow-[0_35px_100px_rgba(0,0,0,.45)] sm:p-8" role="dialog" aria-modal="true" aria-labelledby="booking-title">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-[90px]" />
            <button onClick={onClose} className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white" aria-label="Close booking form"><X size={18} /></button>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative py-16 text-center">
                <CheckCircle2 className="mx-auto h-16 w-16 text-blue-400" />
                <h3 className="mt-6 font-heading text-2xl font-extrabold">Request received.</h3>
                <p className="mt-3 text-sm text-slate-400">Our team will contact you shortly.</p>
              </motion.div>
            ) : (
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-300">Project enquiry</p>
                <h3 id="booking-title" className="mt-3 pr-12 font-heading text-3xl font-extrabold tracking-[-0.04em]">Let’s discuss your next move.</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">Share a few details and select a convenient time before 5:00 PM.</p>

                <form onSubmit={handleSubmit} className="mt-7 grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="grid gap-2"><Label htmlFor="booking-name" className="text-xs text-slate-300">Full name</Label><Input id="booking-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-12 border-white/10 bg-white/5 text-white placeholder:text-slate-600" placeholder="Your name" /></div>
                    <div className="grid gap-2"><Label htmlFor="booking-phone" className="text-xs text-slate-300">Phone number</Label><Input id="booking-phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="h-12 border-white/10 bg-white/5 text-white placeholder:text-slate-600" placeholder="+94" /></div>
                  </div>
                  <div className="grid gap-2"><Label htmlFor="booking-email" className="text-xs text-slate-300">Email address</Label><Input id="booking-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-12 border-white/10 bg-white/5 text-white placeholder:text-slate-600" placeholder="you@company.com" /></div>
                  <div className="grid gap-2"><Label className="text-xs text-slate-300">Service</Label><Select value={form.service} onValueChange={(value) => setForm({ ...form, service: value })}><SelectTrigger className="h-12 border-white/10 bg-white/5 text-white"><SelectValue placeholder="Select a service" /></SelectTrigger><SelectContent position="item-aligned" className="z-[100] max-h-72 border-white/10 bg-[#07101f] text-white shadow-2xl">{services.map((service) => <SelectItem key={service.title} value={service.title} className="cursor-pointer focus:bg-blue-500/20 focus:text-white">{service.title}</SelectItem>)}</SelectContent></Select></div>
                  <div className="grid gap-2"><Label className="text-xs text-slate-300">Interested Package</Label><Select value={form.package} onValueChange={(value) => setForm({ ...form, package: value })}><SelectTrigger className="h-12 border-white/10 bg-white/5 text-white"><SelectValue placeholder="Select an investment package" /></SelectTrigger><SelectContent position="item-aligned" className="z-[100] max-h-72 border-white/10 bg-[#07101f] text-white shadow-2xl">{pricingPackages.map((pricingPackage) => <SelectItem key={pricingPackage.category} value={pricingPackage.optionLabel} className="cursor-pointer focus:bg-blue-500/20 focus:text-white">{pricingPackage.optionLabel}</SelectItem>)}</SelectContent></Select></div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="grid gap-2"><Label htmlFor="booking-date" className="text-xs text-slate-300">Preferred date</Label><Input id="booking-date" type="date" required min={new Date().toISOString().split("T")[0]} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="h-12 border-white/10 bg-white/5 text-white [color-scheme:dark]" /></div>
                    <div className="grid gap-2"><Label htmlFor="booking-time" className="text-xs text-slate-300">Preferred time</Label><Input id="booking-time" type="time" required max="16:59" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="h-12 border-white/10 bg-white/5 text-white [color-scheme:dark]" /></div>
                  </div>
                  <Button type="submit" disabled={loading} className="mt-1 h-13 rounded-xl bg-primary text-sm font-extrabold text-white hover:bg-blue-500">{loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</> : "Send Project Request"}</Button>
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
