"use client";

import {
  BadgeCheck,
  Briefcase,
  Users,
  Search,
  Settings,
  UserCheck,
} from "lucide-react";

const services = [
  {
    id: "01",
    icon: <Briefcase size={42} />,
    title: "Permanent Recruitment",
    description:
      "Full-cycle recruitment for permanent positions, from entry-level to executive roles.",
  },
  {
    id: "02",
    icon: <UserCheck size={42} />,
    title: "Contract Staffing",
    description:
      "Flexible staffing solutions for projects, seasonal work, or temporary coverage.",
  },
  {
    id: "03",
    icon: <Users size={42} />,
    title: "HR Consulting",
    description:
      "Strategic HR guidance to optimize your talent acquisition and management.",
  },
  {
    id: "04",
    icon: <Search size={42} />,
    title: "Executive Search",
    description:
      "Specialized recruitment for C-level, VP, and senior director positions.",
  },
  {
    id: "05",
    icon: <Settings size={42} />,
    title: "RPO Solutions",
    description:
      "End-to-end recruitment process outsourcing for high-volume hiring needs.",
  },
  {
    id: "06",
    icon: <BadgeCheck size={42} />,
    title: "Talent Mapping",
    description:
      "Proactive identification of talent for current and future hiring needs.",
  },
];

export default function ServiceCards2() {
  return (
    <section className="pb-20">
      <div className="container mx-auto px-6">

        {/* Heading Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            What We Offer
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-base md:text-lg">
            Reliable, secure and on-time logistics services designed to move your
            goods with complete confidence and safety.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service) => (
            <div
              key={service.id}
              className="relative group bg-white p-8 rounded-2xl shadow-md border border-gray-200
                         transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
            >
              {/* Number Badge */}
              <span
                className="absolute top-5 left-5 bg-primary text-white text-sm font-bold px-3 py-1 rounded-full
                           badge-animate"
              >
                {service.id}
              </span>

              {/* Icon Circle */}
              <div className="flex justify-end mb-6">
                <div
                  className="h-28 w-28 rounded-full border border-gray-300 flex items-center justify-center bg-white
                             transition-all duration-300 group-hover:bg-primary group-hover:border-primary
                             group-hover:text-white group-hover:scale-110"
                >
                  {service.icon}
                </div>
              </div>

              {/* Title */}

              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Button */}
              <button
                className="mt-6 border border-primary px-5 py-2 rounded-md font-medium text-gray-900 
                           hover:bg-primary hover:text-white transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
