"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function TeamSection() {
  const team = [
    {
      img: "https://picsum.photos/seed/team1/400/400",
      name: "John Top",
      role: "CEO",
      socials: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      img: "https://picsum.photos/seed/team2/400/400",
      name: "Paul King",
      role: "Dispatching",
      socials: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      img: "https://picsum.photos/seed/team3/400/400",
      name: "George Road",
      role: "Driver Manager",
      socials: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      img: "https://picsum.photos/seed/team4/400/400",
      name: "John Stors",
      role: "Warehouse Manager",
      socials: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
      },
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          Our Team
        </h2>

        {/* Navigation Buttons */}
        <div className="relative">
          <button
            className="
              team-prev absolute -left-4 top-1/2 z-20 
              w-8 h-8 flex items-center justify-center 
              bg-white dark:bg-gray-700 shadow rounded-full
              hover:bg-primary hover:text-white transition
            "
          >
            ‹
          </button>

          <button
            className="
              team-next absolute -right-4 top-1/2 z-20 
              w-8 h-8 flex items-center justify-center 
              bg-white dark:bg-gray-700 shadow rounded-full
              hover:bg-primary hover:text-white transition
            "
          >
            ›
          </button>

          {/* Swiper Slider */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              nextEl: ".team-next",
              prevEl: ".team-prev",
            }}
            autoplay={{ delay: 2500 }}
            pagination={{ clickable: true }}
            spaceBetween={40}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            style={
              {
                ["--swiper-pagination-color"]: "rgb(13, 148, 136)",      // Tailwind primary
                ["--swiper-pagination-bullet-inactive-color"]: "#d1d5db",
                ["--swiper-pagination-bullet-size"]: "8px",
                ["--swiper-pagination-bullet-inactive-opacity"]: "0.5",
                paddingBottom: "3rem",
              } as React.CSSProperties
            }
            className="py-12"
          >
            {team.map((member, index) => (
              <SwiperSlide key={index}>
                <div className="text-center group relative">

                  {/* Profile Image */}
                  <div className="relative w-40 h-40 mx-auto">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="
                        w-40 h-40 rounded-full object-cover 
                        shadow-md mx-auto transition-transform
                        group-hover:scale-105
                      "
                    />

                    {/* Hover Overlay Icons */}
                    <div
                      className="
                        absolute inset-0 rounded-full 
                        bg-black/50 opacity-0 group-hover:opacity-100
                        transition flex items-center justify-center gap-3
                      "
                    >
                      <a href={member.socials.facebook} className="text-white hover:text-primary text-xl">🌐</a>
                      <a href={member.socials.twitter} className="text-white hover:text-primary text-xl">🐦</a>
                      <a href={member.socials.linkedin} className="text-white hover:text-primary text-xl">💼</a>
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-semibold mt-4 text-gray-900 dark:text-white">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {member.role}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
