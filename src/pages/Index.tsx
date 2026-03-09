import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollProgress from "@/components/ScrollProgress";
import GrainOverlay from "@/components/GrainOverlay";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const ProcessSection = lazy(() => import("@/components/ProcessSection"));
const PortfolioSection = lazy(() => import("@/components/PortfolioSection"));
const WhyChooseSection = lazy(() => import("@/components/WhyChooseSection"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-background">
      <GrainOverlay />
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <Suspense fallback={null}>
        <ServicesSection />
        <ProcessSection />
        <PortfolioSection />
        <WhyChooseSection />
        <PricingSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </Suspense>
      <WhatsAppButton />
    </div>
  );
};

export default Index;
