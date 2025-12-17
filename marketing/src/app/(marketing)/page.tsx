"use client";

import HeroSection from "./hero-section/page";
import OurServices from "./our-services/page";
import Templates from "./templates/page";


export default function HomeUI() {
  return (
    <div>
      <section className="w-full py-10 md:py-12">
        <HeroSection />
      </section>

      <div className="w-full mx-auto px-6 py-10 bg-gray-100">
        <OurServices />
      </div>

      <div className="w-full mx-auto px-6 py-10 bg-gray-100">
        <Templates />
      </div>
    </div>
  );
}