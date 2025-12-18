"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ArrowBigLeft, ArrowLeft, ArrowRight, Quote } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function TestimonialSlider() {
    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);
    const testimonials = [
        {
            text: `Working with Gotham Innovations has been a fantastic experience. 
                Their innovative spirit and dedication to excellence truly set them apart. 
    `,
            name: "Emily Harper",
            title: "Lead Scientist at DarkLabs",
            image:
                "/images/profile3.png",
        },
        {
            text: `Outstanding attention to detail and professionalism. 
      The team exceeded expectations and delivered exceptional results.`,
            name: "Michael Trent",
            title: "Founder, NovaTech",
            image:
                "/images/profile2.png",
        },
        {
            text: `A truly remarkable journey. Their solutions transformed our workflow 
      and boosted our operational efficiency significantly.`,
            name: "Sophia Carter",
            title: "CTO, CloudMatrix",
            image:
                "/images/profile1.png",
        },
    ];

    return (
        <section className="relative overflow-hidden bg-gray-50 py-10 pb-30">

             {/* ---- SECTION HEADER ---- */}
        <div className="container mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            What Our Clients Say
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-base md:text-lg">
            Hear from our satisfied clients who have experienced the excellence of our services.
          </p>
        </div>
            <div className="relative mx-auto max-w-3xl px-6">

                {/* Centered bottom navigation arrows */}
                <div className="absolute -bottom-20 left-1/2 z-20 -translate-x-1/2 flex items-start gap-4">
                    <button
                        ref={prevRef}
                        aria-label="Previous testimonial"
                        className="p-2 rounded-full shadow-md"
                        style={{ backgroundColor: 'var(--primary)', color: '#ffffff' }}
                    >
                        <ArrowLeft className="mx-auto h-8 w-8  text-white" />
                    </button>

                    <button
                        ref={nextRef}
                        aria-label="Next testimonial"
                        className="p-2 rounded-full shadow-md"
                        style={{ backgroundColor: 'var(--primary)', color: '#ffffff' }}
                    >
                        <ArrowRight className="mx-auto h-8 w-8 text-white" />
                    </button>
                </div>

                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    autoplay={{ delay: 4000 }}
                    loop
                    navigation={{ nextEl: nextRef.current, prevEl: prevRef.current }}
                    onBeforeInit={(swiper: any) => {
                        if (swiper?.params?.navigation && typeof swiper.params.navigation !== 'boolean') {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                        }
                    }}
                    className="pb-12"
                >
                    {testimonials.map((item, i) => (
                        <SwiperSlide key={i}>
                            <div className="flex flex-col items-center text-center">
                                {/* Icon */}
                                <Quote className="mx-auto h-10 w-10 text-gray-900/10" />

                                {/* Text */}
                                <blockquote className="mt-3 text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                                    <p>{item.text}</p>
                                </blockquote>

                                {/* Author */}
                                <figcaption className="mt-10">
                                    <div className="flex justify-center rounded-full">
                                        <div className="relative">
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-0 h-16 w-16 rounded-full ring-1 ring-inset ring-gray-900/10"
                                            ></span>
                                            <img
                                                alt={item.name}
                                                className="h-16 w-16 rounded-full object-cover"
                                                src={item.image}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4 text-center text-xl font-semibold text-gray-900">
                                        {item.name}
                                    </div>
                                    <div className="text-center text-lg text-gray-600">
                                        {item.title}
                                    </div>
                                </figcaption>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
