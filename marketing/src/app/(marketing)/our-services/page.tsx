"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { Card } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { OurServiceData } from "@/common/interface";
import { ourServiceService } from "@/services/ourServices.service";

const imageBaseUrl = process.env.NEXT_PUBLIC_UPLOAD_BASE || "http://localhost:8080";

export default function OurServices() {
    const [ourServiceData, setOurServiceData] = useState<OurServiceData[]>([]);

    useEffect(() => {
        ourServiceService
            .getAllOurServices({ page: 1, limit: 100 })
            .then((response) => {
                if (response.data) setOurServiceData(response.data);
            })
            .catch((err) => {
                console.error("Error fetching our services:", err);
            });
    }, []);

    return (
        <>
            <Heading
                title="What We Provide"
                description="Powerful tools designed to help businesses manage their fleet, deliveries, drivers, and operations all in one smart platform."
            />

            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={16}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: true,
                    pauseOnMouseEnter: true,
                }}
                pagination={{ clickable: true, dynamicBullets: true }}
                style={
                    {
                        ["--swiper-pagination-color"]: "rgb(13, 148, 136)",
                        ["--swiper-pagination-bullet-inactive-color"]: "#d1d5db",
                        ["--swiper-pagination-bullet-size"]: "8px",
                        ["--swiper-pagination-bullet-inactive-opacity"]: "0.5",
                        paddingBottom: "3rem",
                    } as React.CSSProperties
                }
                loop={true}
                className="container mx-auto pb-16"
            >

                {ourServiceData.map((item) => (
                    <SwiperSlide key={item.id}>
                        <Card className="overflow-hidden rounded-xl shadow-lg relative h-100 flex flex-col justify-end">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${imageBaseUrl}${item.image})` }}
                            />
                            <div className="absolute inset-0 bg-black/40" />
                            <div className="absolute bottom-0 w-full text-center text-white px-4 pb-4">
                                <h3 className="text-lg font-semibold">{item.title || "No Title"}</h3>
                                <p className="text-sm opacity-90">{item.description || "No Description"}</p>

                                <div className="flex justify-center gap-3 mt-3">
                                    <button
                                        onClick={() => window.open(item?.button1_url || "#", item?.button1_url && item?.button1_url !== "#" ? "_blank" : "_self")}
                                        className="px-4 py-2 text-sm bg-white text-black rounded-md font-medium hover:bg-gray-200 transition">
                                        {item.button1_text || "Button 1"}
                                    </button>
                                    <button
                                        onClick={() => window.open(item?.button2_url || "#", item?.button2_url && item?.button2_url !== "#" ? "_blank" : "_self")}
                                        className="px-4 py-2 text-sm border border-white rounded-md font-medium hover:bg-white hover:text-black transition">
                                        {item.button2_text || "Button 2"}
                                    </button>
                                </div>
                            </div>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
