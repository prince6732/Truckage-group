"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function LogoSlider() {
  const logos = [
    "/images/logo1.png",
    "/images/logo1.png",
    "/images/logo1.png",
    "/images/logo1.png",
    "/images/logo1.png",
    "/images/logo1.png",
    "/images/logo1.png",
  ];

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={2500}
          loop={true}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          className="flex items-center"
        >
          {logos.map((logo, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center transition"
            >
              <img
                src={logo}
                alt={`Logo ${index}`}
                className="
                  h-20 w-auto object-contain 
                  grayscale 
                  opacity-60
                  hover:grayscale-0 
                  hover:opacity-100 
                  transition-all 
                  duration-300 
                  ease-in-out
                "
              />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
