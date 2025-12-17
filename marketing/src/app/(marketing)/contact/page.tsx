"use client";


import ContactCards from "@/components/(frontend)/contactCards";
import FAQSection from "@/components/(frontend)/FAQSection";
import SmallHeroSection from "@/components/(sheared)/SmallHeroSection";
import Heading from "@/components/ui/heading";
import React from "react";

export default function ContactSection() {
    return (
        <>
            <SmallHeroSection title="Contact Us" subtitle="Get in touch with us for any inquiries or support." />

            <div className="w-full mx-auto dark:bg-gray-200  py-20" id="contact">
                <Heading
                    title="Contact Us Page"
                    description="Want to contact us? Choose an option below and we'll be happy to show you how we can transform your company’s web experience."
                    align="center"
                />

                <div className="container mx-auto px-4 sm:px-6 lg:px-10 grid md:grid-cols-2 gap-12 lg:gap-16 mt-12">

                    <div className="
                        bg-white dark:bg-gray-800
                        shadow-xl rounded-3xl p-10 
                        border border-gray-200 dark:border-gray-700
                        transition-all duration-500 
                        hover:shadow-2xl hover:-translate-y-2 
                        relative overflow-hidden
                        ">

                        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary/60 via-primary to-primary/60"></div>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Contact Information
                        </h2>

                        <p className="text-gray-600 dark:text-gray-200 leading-relaxed mb-8">
                            Have something to say? We are here to help. Fill up the form or send
                            an email or call our phone number.
                        </p>

                        <div className="space-y-6">

                            <ContactItem
                                icon={
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                                        </svg>
                                    </div>
                                }
                                text="14th avenue glory road"
                            />

                            <ContactItem
                                icon={
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                        </svg>
                                    </div>
                                }
                                text={<a href="mailto:hello@company.com" className="hover:text-primary transition">hello@company.com</a>}
                            />

                            <ContactItem
                                icon={
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                        </svg>
                                    </div>
                                }
                                text={<a href="tel:11111111111" className="hover:text-primary transition">+51 11111111111</a>}
                            />
                        </div>

                        <div className="
                         absolute bottom-0 left-0 w-full h-1 
                         bg-linear-to-r from-transparent via-primary/40 to-transparent
                         opacity-70
                        ">
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 border border-gray-200 dark:border-gray-700 transition-all">

                        <form className="space-y-5">

                            <InputField placeholder="Full Name" name="name" />

                            <InputField
                                type="email"
                                placeholder="Email Address"
                                name="email"
                            />

                            <textarea
                                placeholder="Your Message"
                                className="
                  w-full px-4 py-3 border-2 rounded-md outline-none h-36
                  border-gray-300 dark:border-gray-600
                  placeholder:text-gray-600 dark:placeholder:text-gray-300
                  dark:bg-gray-900 dark:text-white
                  focus:ring-4 focus:border-primary ring-primary/20 dark:ring-0
                "
                                name="message"
                            ></textarea>

                            <button
                                type="submit"
                                className="
                  w-full py-4 font-semibold text-white rounded-md
                  bg-black hover:bg-gray-800 transition-colors
                  focus:outline-none focus:ring-4 focus:ring-primary/30
                "
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <section className="text-gray-600 body-font relative dark:bg-gray-200 py-20">
                <Heading
                    title="Contact Us Page"
                    description="Want to contact us? Choose an option below and we'll be happy to show you how we can transform your company’s web experience."
                    align="center"
                />
                <div className="container px-5 mb-20 mx-auto flex sm:flex-nowrap flex-wrap">

                    <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">

                        <iframe
                            width="100%"
                            height="100%"
                            className="absolute inset-0"
                            frameBorder="0"
                            title="map"

                            scrolling="no"
                            src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=Izmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
                            style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}
                        ></iframe>

                        <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
                            <div className="lg:w-1/2 px-6">
                                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                                    ADDRESS
                                </h2>
                                <p className="mt-1">
                                    Photo booth tattooed prism, portland taiyaki hoodie neutra typewriter.
                                </p>
                            </div>

                            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                                    EMAIL
                                </h2>
                                <a className="text-primary leading-relaxed">example@email.com</a>

                                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                                    PHONE
                                </h2>
                                <p className="leading-relaxed">123-456-7890</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/3 md:w-1/2 w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:ml-auto mt-10 md:mt-0 transition-all">

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Feedback
                        </h2>

                        <p className="text-gray-600 dark:text-gray-200 mb-6 text-sm leading-relaxed">
                            We value your feedback. Share your thoughts and help us improve our services.
                        </p>

                        <div className="mb-5">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="
                            w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                            bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200
                            focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30
                            transition"
                            />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="
                                w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                                bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200
                                focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30
                                transition-all
                            "
                            />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                className="
                                    w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                                    bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200
                                    h-32 resize-none
                                    focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30
                                    transition-all
                                "
                            ></textarea>
                        </div>

                        <button
                            className="
                            w-full py-3 rounded-lg text-white text-lg font-medium
                            bg-primary hover:bg-primary-dark
                            transition-all shadow-md hover:shadow-lg
                            dark:bg-primary dark:hover:bg-primary-dark
                            "
                        >
                            Send Message
                        </button>

                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                            We usually reply within 24 hours.
                        </p>
                    </div>


                </div>
            </section>
            <main className="bg-gray-100 pt-20">
                <ContactCards />
            </main>
            <main className="bg-white pt-20">
                <FAQSection />
            </main>

        </>
    );
}

function ContactItem({ icon, text }: { icon: React.ReactNode; text: React.ReactNode | string }) {
    return (
        <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-200">
            {icon}
            <span className="text-sm">{text}</span>
        </div>
    );
}

function InputField({ placeholder, name, type = "text" }: { placeholder: string; name: string; type?: string }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            autoComplete="off"
            className="
        w-full px-4 py-3 border-2 rounded-md outline-none
        border-gray-300 dark:border-gray-600
        placeholder:text-gray-600 dark:placeholder:text-gray-200
        dark:bg-gray-900 dark:text-white
        focus:ring-4 focus:border-primary ring-primary/20 dark:ring-0
      "
            name={name}
        />
    );
}
