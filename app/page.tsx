import Hero from "@/components/sections/Hero";
import WhyIWroteThis from "@/components/sections/WhyIWroteThis";
import AboutAuthor from "@/components/sections/AboutAuthor";
import Endorsement from "@/components/sections/Endorsement";
import FreeSample from "@/components/sections/FreeSample";
import VideoEmbed from "@/components/sections/VideoEmbed";
import BuySection from "@/components/BuySection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "(un)Fit by Jeffrey Hughes Jr.",
  description: "An honest conversation on brokenness, purpose, grace, and a God who uses imperfect people",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-[var(--color-primary)] selection:text-white">
      <Hero />
      <WhyIWroteThis />
      <AboutAuthor />
      <Endorsement />
      <FreeSample />
      <VideoEmbed />
      <BuySection />
      <Footer />
    </main>
  );
}
