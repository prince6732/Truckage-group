"use client";
import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiUser, FiMail, FiMessageSquare } from "react-icons/fi";
import GradientSubmitButton from "./GradientSubmitButton";

export default function FAQSection() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        question: ""
    });

    const faqs = [
        {
            question: "Which vehicle is suitable for my cargo?",
            answer: "We have a wide range of vehicles from Mahindra Pickups to 32ft trucks. Our team can recommend the right vehicle based on your cargo size, weight, and distance to ensure safe and efficient transport."
        },
        {
            question: "How do you calculate delivery charges?",
            answer: "Delivery charges are calculated based on distance, vehicle type, cargo size, and weight. For exact pricing, you can provide your shipment details and our team will give you a transparent quote."
        },
        {
            question: "Do you provide interstate transport services?",
            answer: "Yes, we provide nationwide transport services. Whether it's a local delivery or a long-distance shipment across states, our vehicles and professional team ensure timely and secure deliveries."
        },
        {
            question: "Can you handle fragile or sensitive goods?",
            answer: "Absolutely. We take extra care with fragile, sensitive, or high-value items. Our vehicles are equipped and our staff is trained to handle such goods safely during loading, transport, and unloading."
        },
        {
            question: "How long will my delivery take?",
            answer: "Delivery time depends on distance, vehicle type, and route conditions. Typically, local deliveries are completed within 24–48 hours, while interstate shipments are delivered within the agreed timeframe."
        }
    ];

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Thank you! We'll get back to you promptly.");
        setFormData({ name: "", email: "", question: "" });
    };

    return (
        <section className="py-16 lg:py-20 px-6 lg:px-8 bg-linear-to-br from-blue-50 to-white">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-5 py-2 mb-6 shadow-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-600">Help Center</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    Frequently Asked <span className="text-blue-600">Questions</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Find answers to common questions about our logistics services
                </p>
            </div>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
                    {/* FAQ Side */}
                    <div className="order-2 lg:order-1">
                        <div className="mb-8">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                Common Questions
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Find answers to the most frequently asked questions about our transport services, pricing, and logistics solutions.
                            </p>
                        </div>

                        {/* FAQ Accordion */}
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="group bg-white/70 backdrop-blur-sm rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-white/50 hover:border-blue-200/50"
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full px-6 py-5 text-left flex justify-between items-center gap-4"
                                    >
                                        <div className="flex items-start gap-4 flex-1">
                                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                                {index + 1}
                                            </div>
                                            <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                {faq.question}
                                            </span>
                                        </div>
                                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
                                            {openFaq === index ? (
                                                <FiChevronUp className="text-lg" />
                                            ) : (
                                                <FiChevronDown className="text-lg" />
                                            )}
                                        </div>
                                    </button>
                                    
                                    <div
                                        className={`overflow-hidden transition-all duration-500 ${
                                            openFaq === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                    >
                                        <div className="px-6 pb-5 pl-18">
                                            <div className="border-l-2 border-blue-100 pl-6">
                                                <p className="text-gray-600 leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="order-1 lg:order-2">
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 sticky top-24">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <FiMessageSquare className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                                    Ask a Question
                                </h3>
                                <p className="text-gray-600">
                                    Can't find what you're looking for? Send us your question and we'll get back to you promptly.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <FiUser className="text-blue-600" />
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Your Full Name"
                                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/50 focus:bg-white focus:shadow-lg"
                                    />
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <FiMail className="text-blue-600" />
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="Your Email Address"
                                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/50 focus:bg-white focus:shadow-lg"
                                    />
                                </div>

                                {/* Question Field */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <FiMessageSquare className="text-blue-600" />
                                        Your Question
                                    </label>
                                    <textarea
                                        required
                                        value={formData.question}
                                        onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                        placeholder="What would you like to know about our logistics services?"
                                        rows={4}
                                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300 resize-none bg-white/50 focus:bg-white focus:shadow-lg"
                                    />
                                </div>

                                {/* Submit Button */}
                               <GradientSubmitButton>Submit</GradientSubmitButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
