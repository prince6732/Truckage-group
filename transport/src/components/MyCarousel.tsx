"use client";


import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { FaStar, FaRegStar } from "react-icons/fa6";

interface CarouselItemType {
    image: string;
    title: string;
    desc: string;
}

export default function ThreeColCarousel({ items }: { items: CarouselItemType[] }) {
    return (
        <div>
            <div className="w-full py-10">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 2500,
                            jump: false,
                        }),
                    ]}
                    className="w-full"
                >
                    <CarouselContent>
                        {items.map((item, i) => (
                            <CarouselItem
                                key={i}
                                className="basis-full sm:basis-1/2 lg:basis-1/3 px-3 flex h-full py-2 mb-2"
                            >
                                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 max-w-md flex flex-col h-full transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:border-indigo-300">

                                    {/* Stars */}
                                    <div className="flex space-x-1 text-yellow-400 mb-4">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaRegStar />
                                    </div>

                                    {/* Review Text */}
                                    <p className="text-gray-600 italic leading-relaxed">
                                        "{item.desc}"
                                    </p>

                                    {/* User Info */}
                                    <div className="flex items-center mt-6">
                                        <img
                                            src={item.image}
                                            alt="Emma"
                                            className="w-14 h-14 rounded-full object-cover border-2 border-indigo-100"
                                        />
                                        <div className="ml-4">
                                            <h4 className="font-semibold text-gray-800 text-lg">{item.title}</h4>
                                            <p className="text-gray-500 text-sm">CEO, DesignHub</p>
                                        </div>
                                    </div>
                                </div>

                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>

            <div className="w-full py-16 bg-linear-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">

                {/* Soft background shapes */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-200/30 blur-3xl rounded-full -z-10"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200/30 blur-3xl rounded-full -z-10"></div>

                <Carousel
                    opts={{ align: "start", loop: true }}
                    plugins={[Autoplay({ delay: 2500, jump: false })]}
                    className="w-full"
                >
                    <CarouselContent className="py-6">
                        {items.map((item, i) => (
                            <CarouselItem
                                key={i}
                                className="basis-full sm:basis-1/2 lg:basis-1/3 px-4"
                            >
                                <div className="
                                bg-white/70 backdrop-blur-xl 
                                shadow-[0_8px_30px_rgb(0,0,0,0.06)]
                                border border-indigo-200 
                                p-8 rounded-3xl relative                                 
                                transition-all duration-300 
                                hover:-translate-y-2 hover:shadow-2xl
                                hover:border-indigo-500 hover:border
                                 ">

                                    {/* User */}
                                    <div className="flex items-center mb-6">
                                        <div className="relative">
                                            <img
                                                src={item.image}
                                                alt="user"
                                                className="w-14 h-14 rounded-full object-cover border-4 border-white shadow-md"
                                            />
                                            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
                                        </div>

                                        <div className="ml-4">
                                            <h4 className="font-semibold text-gray-800 text-lg">{item.title}</h4>
                                            <p className="text-gray-500 text-sm">CEO, DesignHub</p>
                                        </div>
                                    </div>

                                    {/* Quote */}
                                    <p className="text-gray-600 leading-relaxed text-[15px] mb-3">
                                        “{item.desc}”
                                    </p>


                                    {/* Stars */}
                                    <div className="flex mb-0 text-yellow-500 text-lg">
                                        <FaStar /><FaStar /><FaStar /><FaStar /><FaRegStar />
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>


        </div>
    );
}
