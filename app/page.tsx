// app/page.tsx
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import GallerySection from "@/components/sections/GallerySection";
import ApplicationForm from "@/components/sections/ApplicationForm";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      {/* <AboutSection /> */}
      <FeaturesSection />
      {/* <GallerySection /> */}
      <ApplicationForm />
      <ContactSection />
    </main>
  );
}
