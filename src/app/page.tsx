import EventJsonLd from "@/app/(components)/EventJsonLd";
import CTABar from "@/app/(layouts)/CTABar";
import SiteFooter from "@/app/(layouts)/SiteFooter";
import SiteHeader from "@/app/(layouts)/SiteHeader";
import AboutSection from "@/app/(sections)/AboutSection";
import HeroSection from "@/app/(sections)/HeroSection";
import IntroSection from "@/app/(sections)/IntroSection";
import PricingSection from "@/app/(sections)/PricingSection";
import ProgramSection from "@/app/(sections)/ProgramSection";
import SpeakersSection from "@/app/(sections)/SpeakersSection";
import SponsorsSection from "@/app/(sections)/SponsorsSection";
import SubmitSection from "@/app/(sections)/SubmitSection";
import VenueSection from "@/app/(sections)/VenueSection";
import ContactSection from "@/app/(sections)/ContactSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <EventJsonLd />
      <SiteHeader />
      <main>
        <HeroSection />
        <IntroSection />
        <AboutSection />
        <SpeakersSection />
        <ProgramSection />
        <SubmitSection />
        <PricingSection />
        <VenueSection />
        <SponsorsSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <CTABar />
    </div>
  );
}
