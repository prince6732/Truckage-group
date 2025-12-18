"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroSlider() {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const slides = [
    {
      title: (
        <>
          PASSENGER <br /> TRANSPORT
        </>
      ),
      description:
        "Air conditioned, movie stocked library, fine dining experience and friendly staff your ride will be a joy.",
      bg: "/images/4.png",
      btn1: "BUY NOW",
      btn2: "GET A QUOTE",
    },
    {
      title: (
        <>
          CORPORATE <br /> TRAVEL SOLUTIONS
        </>
      ),
      description:
        "Premium buses for meetings, corporate events, and office travel with guaranteed comfort and punctuality.",
      bg: "/images/imageslider.png",
      btn1: "BOOK NOW",
      btn2: "LEARN MORE",
    },
    {
      title: (
        <>
          LUXURY <br /> BUS RENTAL
        </>
      ),
      description:
        "Perfect for weddings, school trips, tourism, and out-station travel equipped with modern amenities.",
      bg: "/images/statement1.jpg",
      btn1: "RENT NOW",
      btn2: "VIEW FLEET",
    },
  ];

  return (
    <section className="w-full  relative overflow-hidden">
      <button
        ref={prevRef}
        className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-30
                   bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-md
                   border border-white/40 transition"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        ref={nextRef}
        className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-30
                   bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-md
                   border border-white/40 transition"
      >
        <ChevronRight size={28} />
      </button>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000 }}
        loop
        navigation={{ nextEl: nextRef.current, prevEl: prevRef.current }}
        onBeforeInit={(swiper: any) => {
          if (swiper?.params?.navigation && typeof swiper.params.navigation !== "boolean") {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        className="h-[650px] w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full w-full bg-cover bg-center flex items-center"
              style={{ backgroundImage: `url('${slide.bg}')` }}
            >
              <div className="container mx-auto px-6 lg:px-20 text-white space-y-6">

                <h1 className="text-4xl md:text-6xl font-bold leading-tight opacity-0 fade-up">
                  {slide.title}
                </h1>

                <p className="mt-4 max-w-lg text-lg opacity-0 fade-up-delay-1">
                  {slide.description}
                </p>

                <div className="mt-6 flex space-x-4 opacity-0 fade-up-delay-2">
                  <button className="px-6 py-3 bg-primary hover:bg-primary-dark rounded text-white font-semibold transition">
                    {slide.btn1}
                  </button>

                  <button className="px-6 py-3 border border-white hover:border-primary rounded text-white font-semibold hover:bg-primary  transition">
                    {slide.btn2}
                  </button>
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
