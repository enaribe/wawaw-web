import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { CatalogSection } from '@/components/landing/CatalogSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { EventsSection } from '@/components/landing/EventsSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { AppDownloadSection } from '@/components/landing/AppDownloadSection';
import { Footer } from '@/components/landing/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CatalogSection />
        <HowItWorksSection />
        <PricingSection />
        <EventsSection />
        <TestimonialsSection />
        <AppDownloadSection />
      </main>
      <Footer />
    </>
  );
}
