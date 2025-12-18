"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiPhone, FiClock, FiSearch, FiMenu } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP, FaTwitter } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import GradientSubmitButton from "./GradientSubmitButton";

export default function EditableNavbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hideTopBar, setHideTopBar] = useState(false);
    const [addShadow, setAddShadow] = useState(false);

    useEffect(() => {
        let lastScrollY = 0;

        const handleScroll = () => {
            const currentScroll = window.scrollY;

            if (currentScroll > lastScrollY && currentScroll > 80) {
                setHideTopBar(true);
            } else {
                setHideTopBar(false);
            }

            setAddShadow(currentScroll > 50);

            lastScrollY = currentScroll;
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const icons = [
        { icon: <FaFacebookF />, href: "#" },
        { icon: <FaInstagram />, href: "#" },
        { icon: <FaYoutube />, href: "#" },
        { icon: <FaPinterestP />, href: "#" },
        { icon: <FaTwitter />, href: "#" },
    ];

    return (
        <header className="w-full fixed left-0 z-50 bg-white shadow-sm">

            <div
                className={`w-full bg-blue-600 border-b py-2 hidden md:block transition-all duration-300 ${hideTopBar ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"
                    }`}
            >
                <div className="container mx-auto px-4 flex justify-between items-center text-sm text-white">

                    <div className="flex items-center gap-6">
                        <a href="tel:+01234567890" className="hover:text-blue-200 transition-colors">
                            <p className="flex items-center gap-2 font-medium">
                                <FiPhone className="text-white" />
                                +01234567890
                            </p>
                        </a>

                        <p className="flex items-center gap-2">
                            <FiClock className="text-white" />
                            Mon to Fri:
                            <span className="font-medium">9:00am – 6:00pm</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/career" className="text-white hover:text-blue-200 transition-colors">Career</Link>
                        <Link href="/terms" className="text-white hover:text-blue-200 transition-colors">Terms & Conditions</Link>

                        <div className="flex items-center gap-3">
                            {icons.map((item, i) => (
                                <Link
                                    key={i}
                                    href={item.href}
                                    className="text-white hover:text-blue-200 transition-colors"
                                >
                                    {item.icon}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <nav className="w-full bg-white py-4 shadow-sm">
                <div className="container mx-auto px-4 flex items-center justify-between">

                    <Link href="/" className="text-2xl font-bold text-black hover:text-blue-600 transition-colors">
                        <span className="text-blue-600">Truck</span>
                        <span className="text-black">age</span>
                    </Link>



                    <ul className="hidden lg:flex items-center gap-8">
                        <li><Link href="/website-content-management/" className="text-black font-medium text-base hover:text-blue-600 transition-colors">Home</Link></li>
                        <li><Link href="/website-content-management/about" className="text-black font-medium text-base hover:text-blue-600 transition-colors">About Us</Link></li>
                        <li><Link href="/website-content-management/services" className="text-black font-medium text-base hover:text-blue-600 transition-colors">Services</Link></li>
                        <li><Link href="/website-content-management/jobs" className="text-black font-medium text-base hover:text-blue-600 transition-colors">Jobs & Career</Link></li>
                        <li><Link href="/website-content-management/contact-us" className="text-black font-medium text-base hover:text-blue-600 transition-colors">Contact Us</Link></li>
                        <li><Link href="/website-content-management/blogs" className="text-black font-medium text-base hover:text-blue-600 transition-colors">Blog & News</Link></li>
                    </ul>

                    <div className="hidden lg:flex items-center gap-4">
                        <button className="p-2 text-black hover:text-blue-600 transition-colors">
                            <FiSearch className="text-xl" />
                        </button>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors font-medium">
                            Track Your Order
                        </button>
                    </div>

                    <button
                        className="lg:hidden text-2xl text-black"
                        onClick={() => setMobileOpen(true)}
                    >
                        <FiMenu />
                    </button>
                </div>

                {mobileOpen && (
                    <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setMobileOpen(false)}>
                        <div
                            className="absolute top-0 right-0 w-80 h-full bg-white shadow-2xl p-6 flex flex-col gap-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="text-2xl ml-auto mb-4 text-black" onClick={() => setMobileOpen(false)}>
                                <FaX />
                            </button>

                            <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2">
                                <FiSearch className="text-black text-lg" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="outline-none w-full text-sm text-black"
                                />
                            </div>

                            <ul className="flex flex-col gap-4 text-lg">
                                <li><Link href="/website-content-management" className="text-black hover:text-blue-600 transition-colors font-medium">Home</Link></li>
                                <li><Link href="/website-content-management/about" className="text-black hover:text-blue-600 transition-colors font-medium">About Us</Link></li>
                                <li><Link href="/website-content-management/service" className="text-black hover:text-blue-600 transition-colors font-medium">Services</Link></li>
                                <li><Link href="/website-content-management/jobs" className="text-black hover:text-blue-600 transition-colors font-medium">Jobs & Career</Link></li>
                                <li><Link href="/website-content-management/contact-us" className="text-black hover:text-blue-600 transition-colors font-medium">Contact Us</Link></li>
                                <li><Link href="/website-content-management/blogs" className="text-black hover:text-blue-600 transition-colors font-medium">Blog & News</Link></li>
                            </ul>

                            <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors font-medium">
                                Track Your Order
                            </button>

                            <div className="flex items-center gap-4 mt-6 text-black text-xl">
                                <FaFacebookF className="hover:text-blue-600 transition-colors" />
                                <FaInstagram className="hover:text-blue-600 transition-colors" />
                                <FaYoutube className="hover:text-blue-600 transition-colors" />
                                <FaPinterestP className="hover:text-blue-600 transition-colors" />
                                <FaTwitter className="hover:text-blue-600 transition-colors" />
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
