import Navbar from "../../components/Navbar";
import HeroSlider from "../../components/HeroSlider";
import ServiceCards from "../../components/ServiceCards";
import Footer from "../../components/Footer";
import Pricing from "../../components/Pricing";
import Pricing1 from "../../components/Pricing1";

import ModernStatsSection from "../../components/ModernStatsSection";
import TestimonialSlider from "../../components/TestimonialSlider";
import VideoSection from "../../components/VideoSection";

export default function Home() {
  return (
    <div className="relative">
      <HeroSlider />      
      <ModernStatsSection />
      <ServiceCards />      
      <Pricing />
      <Pricing1 />
      <TestimonialSlider />
      <VideoSection />
    </div>
  );
}
