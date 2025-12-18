"use client";

import { Truck, Star, MapPin, Users, TrendingUp } from "lucide-react";

const stats = [
  {
    id: 1,
    value: "1 Lakh +",
    label: "Transporters",
    icon: <Truck size={28} />,
    description: "Active partners"
  },
  {
    id: 2,
    value: "4.5★",
    label: "Playstore Rating",
    icon: <Star size={28} />,
    description: "Customer satisfaction"
  },
  {
    id: 3,
    value: "100+",
    label: "Cities Covered",
    icon: <MapPin size={28} />,
    description: "Nationwide reach"
  },
  {
    id: 4,
    value: "3.23K",
    label: "Total Users",
    icon: <Users size={28} />,
    description: "Growing community"
  },
];

export default function ModernStatsSection() {
  return (
    <section className="w-full py-16 bg-white relative overflow-hidden">

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-800 font-medium text-sm mb-6">
            <TrendingUp size={16} />
            Our Performance
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-black bg-clip-text">
              Trusted by Thousands
            </span>
          </h2>
          
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Join our growing community and experience the difference of working with industry leaders
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-green-100/50"
            >
              
              {/* Icon Container */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-green-700 to-green-900 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-white">
                  {item.icon}
                </span>
              </div>

              {/* Stats Value */}
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                {item.value}
              </h3>

              {/* Stats Label */}
              <p className="text-lg font-semibold text-gray-800 mb-2">
                {item.label}
              </p>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-green-200 transition-all duration-300"></div>
              
              {/* Subtle Background Gradient on Hover */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-green-50/0 to-emerald-50/0 group-hover:from-green-50/50 group-hover:to-emerald-50/50 transition-all duration-500 -z-10"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-green-700 to-green-900 hover:from-green-800 hover:to-green-950 text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group">
            <span>Start Your Journey</span>
            <TrendingUp size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}