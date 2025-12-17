"use client";

import { Clock, MapPin, Wallet, ArrowRight } from "lucide-react";

export default function PostJobSection() {
    const jobs = [
        {
            category: "Transport & Logistics",
            title: "Heavy Vehicle Driver",
            desc: "Drive long-route commercial vehicles ensuring safety and timely delivery.",
            type: "Full Time",
           location: "All India",
            salary: "₹25,000 – ₹35,000",
        },
        {
            category: "Local Delivery",
            title: "Light Commercial Driver",
            desc: "Handle local deliveries with responsibility and punctuality.",
            type: "Full Time",
            location: "All India",
            salary: "₹15,000 – ₹22,000",
        },
        {
            category: "Logistics Support",
            title: "Truck Loader & Driver",
            desc: "Assist in loading goods and drive within specified regions.",
            type: "Full Time",
            location: "All India",
            salary: "₹20,000 – ₹30,000",
        },
    ];

    return (
        <section className="py-16 bg-white px-6 md:px-10 lg:px-20">
            <h2 className="text-4xl font-bold text-center mb-12">
                Jobs and Career <span className="text-primary">Opportunities</span>
            </h2>
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                {jobs.map((job, index) => (
                    <div
                        key={index}
                        className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl 
                       transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    >
                        {/* Category */}
                        <div className="inline-block px-4 py-1 text-sm bg-green-100 text-green-700 font-medium rounded-full mb-4">
                            {job.category}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-semibold mb-2">{job.title}</h3>

                        {/* Description */}
                        <p className="text-gray-600 text-sm mb-6 leading-relaxed">{job.desc}</p>

                        {/* Info Row */}
                        <div className="flex flex-wrap items-center gap-4 text-gray-700 text-sm mb-6">
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4 text-primary" /> {job.type}
                            </span>

                            <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4 text-primary" /> {job.location}
                            </span>

                            <span className="flex items-center gap-1">
                                <Wallet className="w-4 h-4 text-primary" /> {job.salary}
                            </span>
                        </div>

                        {/* View Job */}
                        <div className="flex justify-end">
                            <button className="text-primary font-medium flex items-center gap-1 hover:underline">
                                View Job <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
