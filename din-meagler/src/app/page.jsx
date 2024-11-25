import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import FeaturedProperties from "@/components/sections/FeaturedProperties";
import TeamSection from "@/components/sections/TeamSection";
import AppSection from "@/components/sections/AppSection";
import Footer from "@/components/layout/Footer";
export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <AboutSection />
      <FeaturedProperties />
      <TeamSection />
      <AppSection />
      <Footer />
    </main>
  );
}
