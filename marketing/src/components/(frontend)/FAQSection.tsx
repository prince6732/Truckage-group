"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Heading from "../ui/heading";

export default function FAQSection() {
    const faqData = [
        {
            q: "How can I get started?",
            a: "Getting started is easy! Sign up for an account, and you'll have access to our platform's features. No credit card required for the initial signup.",
        },
        {
            q: "What is the pricing structure?",
            a: "Our pricing structure is flexible. We offer both free and paid plans. You can choose the one that suits your needs and budget.",
        },
        {
            q: "What kind of support do you provide?",
            a: "We offer comprehensive support through email, chat, and our knowledge base.",
        },
        {
            q: "Can I cancel my subscription anytime?",
            a: "Yes, you can cancel anytime. There are no hidden fees or penalties.",
        },
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (i: number) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    return (
        <section className="py-10 sm:py-16 lg:py-24">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">

                {/* Heading */}

                <Heading
                    title=" Explore Common Questions"
                    description="Find answers to frequently asked questions about our services and offerings."
                    align="center"
                />

                {/* FAQ List */}
                <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">

                    {faqData.map((item, i) => (
                        <div
                            key={i}
                            className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50 rounded-lg"
                        >
                            {/* Question */}
                            <button
                                onClick={() => toggleFAQ(i)}
                                className="flex items-center text-primary justify-between w-full px-4 py-5 sm:p-6"
                            >
                                <span className="text-lg font-semibold text-black">{item.q}</span>

                                <FaChevronDown
                                    className={`w-6 h-6 0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : "rotate-0"
                                        }`}
                                />
                            </button>

                            {/* Answer */}
                            {openIndex === i && (
                                <div className="px-4 pb-5 sm:px-6 sm:pb-6  animate-fadeIn">
                                    <p>{item.a}</p>
                                </div>
                            )}
                        </div>
                    ))}

                </div>

                {/* Footer Text */}
                <p className="text-center text-gray-600 text-base mt-9">
                    Still have questions?{" "}
                    <a href="#" className="cursor-pointer font-medium text-primary transition-all duration-200 hover:underline">
                        Contact our support
                    </a>
                </p>
            </div>
        </section>
    );
}
