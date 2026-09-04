import { lazy, Suspense, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import TrustedBrandsSection from "@/components/TrustedBrandsSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import ProcessSection from "@/components/ProcessSection";
import LatestWorkSection from "@/components/LatestWorkSection";
import LatestInsightsSection from "@/components/LatestInsightsSection";
import PricingSection from "@/components/PricingSection";
import TeamSection from "@/components/TeamSection";
import ReviewsSection from "@/components/ReviewsSection";
import CtaSection from "@/components/CtaSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";

const BookingModal = lazy(() => import("@/components/BookingModal"));

const Index = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");

  const openBooking = (packageName = "") => {
    setSelectedPackage(packageName);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onBookCall={() => openBooking()} />
      <main>
        <HeroSection onBookCall={() => openBooking()} />
        <TrustedBrandsSection />
        <AboutSection />
        <WhoWeAreSection />
        <ServicesSection onBookCall={() => openBooking()} />
        <LatestWorkSection />
        <StatsSection />
        <ProcessSection />
        <LatestInsightsSection />
        <PricingSection onSelectPackage={openBooking} />
        <TeamSection />
        <ReviewsSection />
        <CtaSection onBookCall={() => openBooking()} />
        <LocationSection />
      </main>
      <Footer />
      {bookingOpen && (
        <Suspense fallback={null}>
          <BookingModal
            isOpen
            onClose={() => setBookingOpen(false)}
            selectedPackage={selectedPackage}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Index;
