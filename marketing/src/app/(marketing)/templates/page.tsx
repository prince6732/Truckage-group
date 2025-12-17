"use client";

import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Heading from "@/components/ui/heading";
import { TemplateData } from "@/common/interface";
import { templatesService } from "@/services/templates.service";

const imageBaseUrl = process.env.NEXT_PUBLIC_UPLOAD_BASE || "http://localhost:8080";

export default function Templates() {
    const [templatesData, setTemplatesData] = useState<TemplateData[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
    const mainSwiperRef = useRef<SwiperType | null>(null);

    useEffect(() => {
        templatesService
            .getAllTemplates({ page: 1, limit: 100 })
            .then((response) => {
                if (response.data) setTemplatesData(response.data);
            })
            .catch((err) => console.error("Error fetching templates:", err));
    }, []);

    const handleCardHover = (isHovering: boolean) => {
        if (mainSwiperRef.current?.autoplay) {
            if (isHovering) {
                mainSwiperRef.current.autoplay.stop();
            } else {
                mainSwiperRef.current.autoplay.start();
            }
        }
    };
    return (
        <section className="bg-gray-50 py-12">
            <Heading
                title="Choose Your Perfect Template"
                description="Browse our collection of beautiful, responsive templates. Select the one that matches your vision and get started in minutes."
            />

            <div className="container mx-auto px-6 mt-8">
                <Swiper
                    modules={[Pagination, Navigation, Autoplay]}
                    onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
                    spaceBetween={30}
                    navigation={{
                        nextEl: ".swiper-button-next-custom",
                        prevEl: ".swiper-button-prev-custom",
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: false }}
                    loop={templatesData.length > 3}
                    className="pb-14!"
                >
                    {templatesData.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div
                                onMouseEnter={() => handleCardHover(true)}
                                onMouseLeave={() => handleCardHover(false)}
                                onClick={() => setSelectedTemplate(String(item.id))}
                                className={`cursor-pointer bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 ${selectedTemplate === String(item.id) ? "border-primary" : "border-transparent"
                                    }`}
                            >
                                <div className="relative h-64 group">
                                    <Swiper
                                        modules={[Navigation, Pagination, Autoplay]}
                                        navigation
                                        pagination={{ clickable: true }}
                                        autoplay={{ delay: 2500 }}
                                        loop
                                        className="h-full rounded-t-3xl"
                                    >
                                        {[item.image, ...(item.additional_images ?? [])].map((img, i) => (
                                            <SwiperSlide key={i}>
                                                <img
                                                    src={img && img.startsWith("http") ? img : img ? `${imageBaseUrl}${img}` : ""}
                                                    alt={item.title}
                                                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-3xl"></div>
                                </div>

                                <div className="p-5 space-y-2">
                                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{item.title}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-1">
                                        <span className="font-medium text-gray-700">{item.description}</span>
                                    </p>
                                    <div className="flex items-center gap-2 mt-3">
                                        <button
                                            onClick={() => window.open(item.button1_url, "_blank")}
                                            className="btn-primary flex-1 text-sm py-2"
                                        >
                                            {item.button1_text || "Preview"}
                                        </button>
                                        <button
                                            onClick={() => window.open(item.button2_url, "_blank")}
                                            className="btn-secondary flex-1 text-sm py-2"
                                        >
                                            {item.button2_text || "Select"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
