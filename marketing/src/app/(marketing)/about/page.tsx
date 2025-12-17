

import React from "react";
import { FaCheckCircle, FaShieldAlt, FaUsers, FaLightbulb, FaHandshake } from "react-icons/fa";
import SmallHeroSection from "@/components/(sheared)/SmallHeroSection";
import Heading from "@/components/ui/heading";
import LogoSlider from "@/components/(frontend)/LogoSlider";
import TeamSection from "@/components/(frontend)/teamSection";


export default function About() {
  return (
    <>
      <SmallHeroSection title="About Us" subtitle="Learn more about our mission, vision, and the team behind our success." />
      <section className="relative bg-gray-50 dark:bg-gray-100 py-20 overflow-hidden">

        <div className="absolute inset-0 opacity-40 -z-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 800"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="dots"
                patternUnits="userSpaceOnUse"
                width="40"
                height="40"
              >
                <circle cx="6" cy="6" r="2" fill="#cbd5e1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

          <div>
            <Heading title="About Our Company"  description=" We build intelligent solutions that help businesses track, manage,
                and scale their operations effortlessly. Our mission is to combine
                innovation, technology, and seamless design to transform the way
                companies handle their fleets, deliveries, and teams." align="left" />

            <div className="space-y-6">

              <FeatureCard
                icon={<FaUsers className="text-primary w-6 h-6" />}
                title="Passionate Team"
                text="A dedicated team of experts working tirelessly to deliver the best experience."
              />

              <FeatureCard
                icon={<FaLightbulb className="text-primary w-6 h-6" />}
                title="Innovative Solutions"
                text="We implement advanced technologies to bring modern, effective tools to life."
              />

              <FeatureCard
                icon={<FaHandshake className="text-primary w-6 h-6" />}
                title="Customer First"
                text="Your needs drive our roadmap — we listen, understand, and deliver."
              />

            </div>
          </div>

          <div className="relative rounded-xl shadow-lg overflow-hidden h-80 md:h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=900&q=80"
              alt="About us"

              className="object-cover w-full h-full"
            />

            <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition"></div>
          </div>
        </div>
      </section>

      <LogoSlider />

      <section className="py-20 relative bg-gray-50 dark:bg-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <Heading title="Our Mission & Vision"  description="Driving innovation and excellence in fleet and delivery management." />


          <div className="grid md:grid-cols-2 gap-10">

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To deliver innovative and reliable digital tools that help companies track, manage,
                and optimize their logistics operations with maximum efficiency.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To become the leading platform for fleet and delivery management, powering
                businesses with smart automation and real-time insight across the globe.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="relative bg-gray-50 dark:bg-gray-100 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <Heading title="Why Choose Us"  description="We deliver performance, reliability, and innovation to elevate your business." />


          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

            <div className="p-8 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow hover:shadow-xl transition">
              <div className="p-4 bg-primary/10 rounded-full w-fit mb-4">
                <FaCheckCircle className="text-primary w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Reliable & Fast
              </h3>
              <p className="text-gray-600 dark:text-gray-200">
                Our system ensures smooth, accurate tracking and fast performance for all operations.
              </p>
            </div>

            <div className="p-8 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow hover:shadow-xl transition">
              <div className="p-4 bg-primary/10 rounded-full w-fit mb-4">
                <FaShieldAlt className="text-primary w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Secure Platform
              </h3>
              <p className="text-gray-600 dark:text-gray-200">
                Your data is protected with industry-level encryption and high-grade architecture.
              </p>
            </div>

            <div className="p-8 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow hover:shadow-xl transition">
              <div className="p-4 bg-primary/10 rounded-full w-fit mb-4">
                <FaUsers className="text-primary w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Customer Support
              </h3>
              <p className="text-gray-600 dark:text-gray-200">
                Our team is always ready to help you resolve issues quickly and professionally.
              </p>
            </div>

          </div>
        </div>
      </section>

      <TeamSection />


    </>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

function FeatureCard({ icon, title, text }: FeatureCardProps) {
  return (
    <div className="flex items-start space-x-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition">
      <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full shadow">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-200 text-sm">{text}</p>
      </div>
    </div>
  );
}
