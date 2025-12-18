"use client";

import { Truck, FileText, DollarSign, Route, Settings, Users, ArrowRight, Cog } from "lucide-react";

const services = [
  {
    icon: <Truck size={40} />,
    title: "Load Management",
    description:
      "Efficiently manage and track all your cargo loads with real-time monitoring, scheduling, and optimization features.",
  },
  {
    icon: <FileText size={40} />,
    title: "LR Management",
    description:
      "Digital lorry receipt management system for seamless documentation, billing, and tracking of transport receipts.",
  },
  {
    icon: <DollarSign size={40} />,
    title: "Expense Management",
    description:
      "Track and control all transport-related expenses including fuel, maintenance, toll charges, and driver allowances.",
  },
  {
    icon: <Route size={40} />,
    title: "Trip Management",
    description:
      "Plan, monitor, and optimize routes for maximum efficiency while tracking real-time trip progress and delivery status.",
  },
  {
    icon: <Settings size={40} />,
    title: "Truck Management",
    description:
      "Complete fleet management solution with maintenance scheduling, insurance tracking, and vehicle performance analytics.",
  },
  {
    icon: <Users size={40} />,
    title: "Driver Management",
    description:
      "Manage driver profiles, licenses, performance tracking, attendance, and salary management in one unified system.",
  },
];

export default function ServiceCards() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-800 font-medium text-sm mb-6">
          <Cog size={16} />
          Our Software Features
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          <span className="text-black bg-clip-text">
            Complete Transport Management
          </span>
        </h2>

        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Streamline your entire transport business with our comprehensive software solution designed for efficiency and growth.
        </p>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((item, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-green-100/50"
          >
            {/* Icon Container */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-green-700 to-green-900 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-white">
                {item.icon}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-700 transition-colors duration-300">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              {item.description}
            </p>

            {/* Learn More Button */}
            <button className="inline-flex items-center gap-2 text-green-700 font-semibold text-sm hover:text-green-900 transition-colors duration-300 group">
              Learn More
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-green-200 transition-all duration-300"></div>
            
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-green-50/0 to-emerald-50/0 group-hover:from-green-50/30 group-hover:to-emerald-50/30 transition-all duration-500 -z-10"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
