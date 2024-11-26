import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import FeaturedProperties from "@/components/sections/FeaturedProperties";
import TeamSection from "@/components/sections/TeamSection";
import AppSection from "@/components/sections/AppSection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <FeaturedProperties />
      <TeamSection />
      <AppSection />
    </>
  );
}
