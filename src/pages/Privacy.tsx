import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { company } from "@/data/siteData";

const Privacy = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white">
      <Navbar onBookCall={() => setBookingOpen(true)} />
      <main>
        <section className="bg-[#030713] pb-20 pt-40 text-white"><div className="site-container"><p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-300">Legal</p><h1 className="mt-5 font-heading text-5xl font-extrabold tracking-[-0.05em] sm:text-6xl">Privacy Policy</h1><p className="mt-5 max-w-2xl text-slate-300">How Sky Designers handles information submitted through this website.</p></div></section>
        <section className="section-space"><article className="site-container max-w-4xl space-y-8 text-sm leading-7 text-slate-600">
          <div><h2 className="font-heading text-2xl font-bold text-slate-950">Information we collect</h2><p className="mt-3">We may collect contact details, project enquiry information, booking preferences, and job application information that you choose to submit through our forms.</p></div>
          <div><h2 className="font-heading text-2xl font-bold text-slate-950">How we use it</h2><p className="mt-3">We use submitted information to respond to enquiries, manage bookings, review applications, and communicate about services or opportunities relevant to your request.</p></div>
          <div><h2 className="font-heading text-2xl font-bold text-slate-950">Job applications</h2><p className="mt-3">Application details and CV files are used only for recruitment review and follow-up. Do not submit sensitive information that is not required for evaluating your application.</p></div>
          <div><h2 className="font-heading text-2xl font-bold text-slate-950">Contact</h2><p className="mt-3">For privacy questions, contact <a className="font-bold text-primary" href={`mailto:${company.email}`}>{company.email}</a>.</p></div>
        </article></section>
      </main>
      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
};

export default Privacy;
