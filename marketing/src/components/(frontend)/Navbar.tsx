"use client";
import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 py-3 w-full">
      <div className="container mx-auto flex items-center justify-between px-6">

        {/* LEFT SECTION */}
        <div className="flex items-center space-x-10">
          <a href="/" className="text-2xl font-semibold text-primary">
            Truckage.in
          </a>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex space-x-8 text-gray-700 font-medium">
            <li><a href="/" className="hover:text-primary">Home</a></li>
            <li><a href="/about" className="hover:text-primary">About</a></li>
            <li><a href="/pricing" className="hover:text-primary">Pricing</a></li>
            <li><a href="/blog" className="hover:text-primary">Blog</a></li>
            <li><a href="/contact" className="hover:text-primary">Contact Us</a></li>
          </ul>
        </div>

        {/* DESKTOP RIGHT */}
        <div className="hidden lg:flex items-center space-x-6">
          <a href="tel:+919914327671" className="flex items-center text-primary font-medium hover:underline">
            <Phone className="w-5 h-5 mr-1" />
            +91 9914327671
          </a>

          <a
            href="#"
            className="btn-primary py-2 bg-primary text-white p-4 rounded-lg font-semibold hover:bg-primary-dark transition"
          >
            Start free
          </a>
        </div>

        {/* MOBILE BUTTONS (Start Free + Toggle) */}
        <div className="flex items-center space-x-3 lg:hidden">

          {/* Start Free beside toggle */}
          <a
            href="#"
            className="btn-primary py-2 bg-primary text-white p-4 rounded-lg font-semibold hover:bg-primary-dark transition"
          >
            Start free
          </a>

          {/* Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="lg:hidden px-6 pb-6 pt-2 space-y-4 text-gray-700 font-medium">
          <a href="/" className="block hover:text-primary">Home</a>
          <a href="/about" className="block hover:text-primary">About</a>
          <a href="/pricing" className="block hover:text-primary">Pricing</a>
          <a href="/blog" className="block hover:text-primary">Blog</a>
          <a href="/contact" className="block hover:text-primary">Contact Us</a>

          <hr className="border-gray-300" />

          <a href="tel:+919914327671" className="block text-primary">
            +91 9914327671
          </a>
        </div>
      )}
    </nav>
  );
}
