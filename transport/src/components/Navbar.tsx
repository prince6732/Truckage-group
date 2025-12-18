"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiPhone, FiClock, FiSearch, FiMenu } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP, FaTwitter } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import GradientSubmitButton from "./GradientSubmitButton";

export default function Navbar() {
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
        <header className="w-full fixed left-0 z-50 bg-white transition-all duration-300">

            <div
                className={`w-full bg-white border-b py-1 hidden md:block transition-all duration-300 ${hideTopBar ? "opacity-100 pointer-events-none" : "opacity-100"
                    }`}
            >
                <div className="container mx-auto px-4 flex justify-between items-center text-sm">

                    <div className="flex items-center gap-5">
                        <a href="tel:+01234567890">
                            <p className="flex items-center gap-2 text-base font-bold">
                                <FiPhone />
                                +01234567890
                            </p>
                        </a>

                        <p className="flex items-center gap-2 text-base">
                            <FiClock />
                            Mon to Fri:
                            <span className="font-semibold">9:00am – 6:00pm</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/career" className="hover-text-primary">Career</Link>
                        <Link href="/terms" className="hover-text-primary">Terms & Conditions</Link>

                        <div className="flex items-center gap-2">
                            {icons.map((item, i) => (
                                <Link
                                    key={i}
                                    href={item.href}
                                    className="flex h-7 w-7 items-center justify-center rounded-full 
                                    border border-gray-300 text-gray-600 transition-all 
                                    hover:text-blue-600 hover:border-blue-600 hover:scale-110"
                                >
                                    {item.icon}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <nav
                className={`w-full bg-white py-2 transition-all duration-300 ${addShadow ? "shadow-md" : ""
                    }`}
            >
                <div className="container mx-auto px-4 flex items-center justify-between">

                    <Link href="/" className="text-3xl font-black tracking-tight transition-all">
                        <span className="text-blue-600">Truck</span>
                        <span className="text-blue-800">age</span>
                    </Link>



                    {/* Desktop Menu */}
                    <ul className="hidden lg:flex items-center gap-8 text-gray-700">
                        <li><Link href="/" className="hover-text-primary font-semibold text-[15px] xl:text-xl">Home</Link></li>
                        <li><Link href="/about" className="hover-text-primary font-semibold text-[15px] xl:text-xl">About Us</Link></li>
                        <li><Link href="/services" className="hover-text-primary font-semibold text-[15px] xl:text-xl">Services</Link></li>
                        <li><Link href="/jobs" className="hover-text-primary font-semibold text-[15px] xl:text-xl">Jobs & Career</Link></li>
                        <li><Link href="/contact-us" className="hover-text-primary font-semibold text-[15px] xl:text-xl">Contact Us</Link></li>
                        <li><Link href="/blogs" className="hover-text-primary font-semibold text-[15px] xl:text-xl">Blog & News</Link></li>
                    </ul>

                    {/* Right Desktop */}
                    <div className="hidden lg:flex items-center gap-4">
                        <div className="bg-gray-100 p-2 rounded-full cursor-pointer">
                            <FiSearch className="text-xl" />
                        </div>
                        <GradientSubmitButton>Track Your Order</GradientSubmitButton>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-3xl"
                        onClick={() => setMobileOpen(true)}
                    >
                        <FiMenu />
                    </button>
                </div>

                {/* ---------- MOBILE MENU ---------- */}
                {mobileOpen && (
                    <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setMobileOpen(false)}>
                        <div
                            className="absolute top-0 right-0 w-72 h-full bg-white shadow-lg p-6 flex flex-col gap-6 animate-slide-left"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="text-2xl ml-auto mb-4" onClick={() => setMobileOpen(false)}>
                                <FaX />
                            </button>

                            {/* Search */}
                            <div className="flex items-center gap-2 border rounded-md px-3 py-2">
                                <FiSearch className="text-gray-600 text-lg" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="outline-none w-full text-sm"
                                />
                            </div>

                            {/* Links */}
                            <ul className="flex flex-col gap-4 text-lg font-semibold">
                                <li><Link href="/" className="hover-text-primary">Home</Link></li>
                                <li><Link href="/about" className="hover-text-primary">About Us</Link></li>
                                <li><Link href="/service" className="hover-text-primary">Services</Link></li>
                                <li><Link href="/jobs" className="hover-text-primary">Jobs & Career</Link></li>
                                <li><Link href="/contact-us" className="hover-text-primary">Contact Us</Link></li>
                                <li><Link href="/blogs" className="hover-text-primary">Blog & News</Link></li>
                            </ul>

                            <GradientSubmitButton>Track Your Order</GradientSubmitButton>

                            {/* Social Icons */}
                            <div className="flex items-center gap-4 mt-6 text-gray-600 text-xl">
                                <FaFacebookF />
                                <FaInstagram />
                                <FaYoutube />
                                <FaPinterestP />
                                <FaTwitter />
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
