"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logo from '../../public/logo.png';

import {
    Facebook,
    Instagram,
    Youtube,
    Twitter,
    Phone,
    Clock,
    Menu,
    Search,
    X,
    Mail
} from "lucide-react";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [addShadow, setAddShadow] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [hideTopBar, setHideTopBar] = useState(false);

    useEffect(() => {

        const handleScroll = () => {
            const currentScroll = window.scrollY;
            const heroThreshold = window.innerHeight * 0.5;

            if (currentScroll <= heroThreshold) {
                setHideTopBar(false);
                setIsScrolled(false);
                setAddShadow(false);
            } else {
                setHideTopBar(true);
                setIsScrolled(true);
                setAddShadow(true);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const icons = [
        { icon: <Facebook size={14} />, href: "#" },
        { icon: <Instagram size={14} />, href: "#" },
        { icon: <Youtube size={14} />, href: "#" },
        { icon: <Twitter size={14} />, href: "#" },
    ];

    return (
        <header className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white' : 'bg-transparent'
            }`}>

            <div
                className={`w-full py-2 border-b md:flex md:items-center transform transition-all duration-300 ${hideTopBar ? 'max-h-0 opacity-0 -translate-y-full py-0 overflow-hidden' : 'max-h-20 opacity-100 translate-y-0'} ${isScrolled ? 'bg-white border-gray-200' : 'bg-white/90 backdrop-blur-sm border-white/20'} hidden`}
            >
                <div className="container mx-auto px-4 flex justify-between items-center text-sm">

                    <div className="flex items-center gap-3 text-xs md:text-sm lg:text-base">


                        <div className="flex items-center flex-wrap gap-2 mt-2">
                            {icons.map((item, i) => (
                                <a
                                    key={i}
                                    href={item.href}
                                    className="
                                        flex items-center justify-center 
                                        h-8 w-8 md:h-6 md:w-6 rounded-full border border-gray-200 
                                        text-gray-600 text-sm md:text-lg
                                        transition-all duration-300
                                        hover:text-primary hover:border-primary hover:scale-110
                                    "
                                >
                                    {item.icon}
                                </a>
                            ))}
                        </div>

                    </div>

                    <div className="flex items-center gap-5">


                        <p className="flex items-center gap-2 text-[14px]">
                            <Clock size={12} />
                            Mon to Sat: <span>9:00am – 6:00pm</span>
                        </p>

                        <a href="tel:+910000000000">
                            <p className="flex items-center gap-2 text-[14px]">
                                <Phone size={12} />
                                +91 0000000000</p>
                        </a>
                    </div>

                    <div className="flex items-center text[14px]">
                        <a href="tel:+01234567890">
                            <p className="flex items-center gap-2">
                                <Mail size={12} />
                                info@truckage.com
                            </p>
                        </a>


                    </div>

                </div>
            </div>

            <nav className={`w-full transition-all duration-300 ${addShadow ? "shadow-md" : ""} ${isScrolled ? 'pb-4 bg-white' : 'pt-4 bg-transparent'}`}>
                <div className="container mx-auto flex items-center justify-between px-4">

                    <a href="#" className="flex items-center gap-3">
                        <Image
                            src={logo}
                            alt="Truckage Logo"
                            width={40}
                            height={40}
                            className="w-8 h-8 md:w-10 md:h-10"
                            priority
                        />
                        <span className={`text-2xl md:text-3xl font-bold transition-colors duration-300 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                            Truckage
                        </span>
                    </a>


                    <ul className={`hidden lg:flex items-center gap-8 transition-colors duration-300 ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
                        <li><a href="/" className="cursor-pointer hover:underline text-base xl:text-xl lg:text-[15px] font-semibold">Home</a></li>
                        <li><a href="/about" className="cursor-pointer hover:underline text-base xl:text-xl lg:text-[15px] font-semibold">About</a></li>

                        <li><a href="/faq" className="cursor-pointer hover:underline text-base xl:text-xl lg:text-[15px] font-semibold">FAQ</a></li>
                        <li><a href="/contact" className="cursor-pointer hover:underline text-base xl:text-xl lg:text-[15px] font-semibold">Contact us</a></li>
                    </ul>

                    <div className="hidden lg:flex items-center gap-4"></div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`lg:hidden text-3xl transition-colors duration-300 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
                        onClick={() => setMobileOpen(true)}
                    >
                        <Menu size={28} />
                    </button>
                </div>

                {/* ----------- Mobile Menu Overlay ----------- */}
                {mobileOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 z-50"
                        onClick={() => setMobileOpen(false)}
                    >
                        <div
                            className="absolute top-0 right-0 w-72 h-full bg-white shadow-lg p-6 flex flex-col gap-6 animate-slide-left"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button className="text-2xl ml-auto mb-4" onClick={() => setMobileOpen(false)}>
                                <X size={28} />
                            </button>

                            {/* Search Inside Mobile Menu (Lucide Search) */}
                            <div className="flex items-center gap-2 border rounded-md px-3 py-2">
                                <Search size={18} className="text-gray-600" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="outline-none w-full text-sm"
                                />
                            </div>

                            {/* Mobile Links */}
                            <ul className="flex flex-col gap-4 text-lg font-semibold">
                                <li><a href="/" className="hover:text-primary">Home</a></li>
                                <li><a href="/about" className="hover:text-primary">About</a></li>
                                <li><a href="/faq" className="hover:text-primary">FAQ</a></li>
                                <li><a href="/contact" className="hover:text-primary">Contact us</a></li>
                            </ul>

                            {/* Social Icons in Mobile Menu */}
                            <div className="flex items-center gap-4 mt-6 text-gray-600 text-xl">
                                <a href="#" className="hover:text-primary transition-colors">
                                    <Facebook size={20} />
                                </a>
                                <a href="#" className="hover:text-primary transition-colors">
                                    <Instagram size={20} />
                                </a>
                                <a href="#" className="hover:text-primary transition-colors">
                                    <Youtube size={20} />
                                </a>
                                <a href="#" className="hover:text-primary transition-colors">
                                    <Twitter size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

        </header>
    );
}
