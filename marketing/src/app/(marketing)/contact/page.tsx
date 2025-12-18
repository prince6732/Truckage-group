"use client";

import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 🔹 Later you can connect API here
    setTimeout(() => {
      setLoading(false);
      alert("Thank you! We will contact you shortly.");
    }, 1500);
  };

  return (
    <main className="bg-white text-gray-800">

      {/* HERO */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact <span className="text-green-700">Truckage Group</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Have questions about fleet management, load tracking, or pricing?
            Our team is here to help you.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14">

        {/* LEFT INFO */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Whether you manage a small fleet or a large logistics operation,
            Truckage Group provides modern tools for load management, POD tracking,
            expense monitoring, and fleet analytics.
          </p>

          <div className="space-y-5 text-gray-700">
            <div>
              <p className="font-semibold text-gray-900">Email</p>
              <p>topntechofficial@gmail.com</p>
            </div>

            <div>
              <p className="font-semibold text-gray-900">Phone</p>
              <p>+91 99143 27671</p>
            </div>

            <div>
              <p className="font-semibold text-gray-900">Business Hours</p>
              <p>Monday – Saturday: 9:00 AM – 7:00 PM</p>
            </div>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Send Us a Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Optional"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows={4}
                required
                placeholder="Tell us how we can help you"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-medium
                bg-linear-to-r from-green-700 to-green-600
                hover:from-green-800 hover:to-green-700 transition
                disabled:opacity-70"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Let’s Build Smarter Logistics Together
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join transport businesses across India using Truckage Group to
            streamline fleet and logistics operations.
          </p>
        </div>
      </section>

    </main>
  );
}
