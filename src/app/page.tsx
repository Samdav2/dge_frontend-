import dynamic from 'next/dynamic';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/features/landing/components/HeroSection";
import { CategoriesSection } from "@/features/landing/components/CategoriesSection";
import { AboutUsSection } from "@/features/landing/components/AboutUsSection";
import { ValuePropsSection } from "@/features/landing/components/ValuePropsSection";
import { TestimonialsSection } from "@/features/landing/components/TestimonialsSection";
import { JobListingSection } from "@/features/landing/components/JobListingSection";

import { DrivingSection } from "@/features/landing/components/DrivingSection";

// Dynamic import for FAQ Section to demonstrate lazy loading/code splitting
const FAQSection = dynamic(() => import('@/features/landing/components/FAQSection').then(mod => mod.FAQSection), {
  loading: () => <p className="text-center py-20">Loading FAQs...</p>,
});

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <Header />

      <main className="flex-1">
        <HeroSection />
        <CategoriesSection />
        <AboutUsSection />
        <ValuePropsSection />
        <DrivingSection />
        <TestimonialsSection />
        <JobListingSection />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
