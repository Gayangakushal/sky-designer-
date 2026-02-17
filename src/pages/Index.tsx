import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TrustedBrandsSection from "@/components/TrustedBrandsSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import MetaAdsSection from "@/components/MetaAdsSection";
import PortfolioSection from "@/components/PortfolioSection";
import TeamSection from "@/components/TeamSection";
import ReviewsSection from "@/components/ReviewsSection";
import LocationSection from "@/components/LocationSection";
import BookingModal from "@/components/BookingModal";
import Footer from "@/components/Footer";

const Index = () => {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onBookCall={() => setBookingOpen(true)} />
      <HeroSection onBookCall={() => setBookingOpen(true)} />
      <AboutSection />
      <TrustedBrandsSection />
      <ServicesSection onBookCall={() => setBookingOpen(true)} />
      <StatsSection />
      <MetaAdsSection onBookCall={() => setBookingOpen(true)} />
      <PortfolioSection />
      <TeamSection />
      <ReviewsSection />
      <LocationSection />
      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
};

export default Index;
