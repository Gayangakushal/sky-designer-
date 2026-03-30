import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const services = [
  "Meta Ads Management",
  "Social Media Handling",
  "Graphic Design",
  "Consultation",
  "Funnel Building",
  "Branding",
];

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", date: "", time: "" });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate time is before 5 PM
    if (form.time) {
      const [hours] = form.time.split(":").map(Number);
      if (hours >= 17) {
        toast({ title: "Invalid Time", description: "Bookings are only available before 5:00 PM.", variant: "destructive" });
        return;
      }
    }

    setLoading(true);

    const { error } = await supabase.from("bookings").insert({
      name: form.name,
      phone: form.phone || null,
      email: form.email,
      service: form.service,
      preferred_date: form.date || null,
      preferred_time: form.time || null,
    });

    setLoading(false);

    if (error) {
      toast({ title: "Error", description: "Failed to submit booking. Please try again.", variant: "destructive" });
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", phone: "", email: "", service: "", date: "", time: "" });
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card glow-primary w-full max-w-md p-8 relative"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X size={20} />
            </button>

            {submitted ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">Booking Confirmed!</h3>
                <p className="text-muted-foreground text-sm">We'll reach out to you shortly.</p>
              </motion.div>
            ) : (
              <>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-1">Book a Call</h3>
                <p className="text-muted-foreground text-sm mb-6">Fill in your details and we'll get back to you.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  />
                  <Input
                    placeholder="Phone Number"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  />
                  <Input
                    placeholder="Email Address"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  />
                  <Select onValueChange={(v) => setForm({ ...form, service: v })}>
                    <SelectTrigger className="bg-secondary border-border text-foreground">
                      <SelectValue placeholder="Select Service" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {services.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="date"
                      required
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="bg-secondary border-border text-foreground"
                    />
                    <Input
                      type="time"
                      required
                      max="16:59"
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                      className="bg-secondary border-border text-foreground"
                    />
                  </div>
                  <p className="text-muted-foreground text-xs">Bookings available before 5:00 PM only</p>
                  <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-primary">
                    {loading ? "Submitting..." : "Confirm Booking"}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
