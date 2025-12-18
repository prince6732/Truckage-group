"use client";

import { Truck, Star, MapPin, Users } from "lucide-react";

const stats = [
  { icon: <Truck size={28} />, value: "1 Lakh +", label: "Transporters" },
  { icon: <Star size={28} />, value: "4.5/5", label: "Playstore rating" },
  { icon: <MapPin size={28} />, value: "100+", label: "Cities Covered" },
  { icon: <Users size={28} />, value: "3.23K", label: "Total Users" },
];

export default function StatsSection() {
  return (
    <>
      <section className="w-full bg-gray-100 py-10 px-6">

        {/* ---- SECTION HEADER ---- */}
        <div className="container mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Why Choose Us
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-base md:text-lg">
            We are committed to delivering excellence in logistics with a focus on
            reliability, safety, and customer satisfaction.
          </p>
        </div>

        {/* ---- TWO CARDS WRAPPER ---- */}
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* ---------- CARD 1 (Left Text) ---------- */}
          <div
            className="
              bg-white rounded-[35px] border border-gray-200 px-10 md:px-14 py-12
              shadow-md hover:shadow-2xl transition-all duration-500 
              hover:-translate-y-2 hover:border-primary
              relative overflow-hidden group
            ">
            {/* Glow Hover Effect */}
            <div className="
              absolute inset-0 opacity-0 group-hover:opacity-30 
              bg-linear-to-br from-primary/15 to-purple-300 blur-2xl  
              transition-all duration-500
            "></div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-snug relative z-10">
              Let’s build something great.
            </h2>

            <p className="text-gray-600 mt-5 leading-relaxed text-base md:text-lg relative z-10">
              Enim sed faucibus turpis in eu mi bibendum neque egestas.
              Mi bibendum neque egestas congue quisque egestas diam in arcu.
              Elit pellentesque habitant.
            </p>
          </div>

          {/* ---------- CARD 2 (Stats) ---------- */}
          <div
            className="
              bg-white rounded-[35px] border border-gray-200 px-10 md:px-14 py-12
              shadow-md hover:shadow-2xl transition-all duration-500 
              hover:-translate-y-2 hover:border-primary
              relative overflow-hidden group
            "
          >
            {/* Glow Hover Effect */}
            <div className="
             absolute inset-0 opacity-0 group-hover:opacity-30 
              bg-linear-to-br from-primary/15 to-purple-300 blur-2xl  
              transition-all duration-500
            "></div>

            <div className="grid grid-cols-2 gap-10 relative z-10">
              {stats.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-3">

                  {/* Icon Animation */}
                  <div className="
                    text-primary bg-gray-100 p-3 rounded-full shadow-sm 
                    transition-all duration-500 group-hover:scale-110 group-hover:shadow-md
                  ">
                    {item.icon}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {item.value}
                  </h3>

                  <p className="text-gray-600 text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
