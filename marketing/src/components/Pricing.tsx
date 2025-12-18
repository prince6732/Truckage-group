"use client";

import { Check } from "lucide-react";

const plans = [
  {
    badge: "Personal",
    title: "Free",
    price: "₹0",
    desc: "To discover our product and its features",
    features: [
      "Unlimited Projects",
      "Share with 5 team members",
      "Sync across devices",
      "20GB individual data each user",
    ],
    button: "Learn more",
    highlight: false,
  },
  {
    badge: "Personal Pro",
    title: "₹999",
    priceSuffix: "/ month",
    desc: "The best option for individual note-takers",
    features: [
      "Unlimited Projects",
      "Share with 25 team members",
      "Sync across devices",
      "50GB individual data each user",
    ],
    button: "Try for free",
    highlight: true,
  },
  {
    badge: "Team",
    title: "₹1999",
    priceSuffix: "/ month",
    desc: "Best suited for larger teams",
    features: [
      "Unlimited Projects",
      "Unlimited team members",
      "Sync across devices",
      "Unlimited individual data",
    ],
    button: "Try for free",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-6xl w-full text-center">
        {/* Header */}
        <span className="inline-block mb-4 rounded-full border border-yellow-500/40 px-4 py-1 text-sm text-yellow-400">
          Pricing
        </span>

        <h2 className="text-4xl font-bold text-white mb-3">
          Choose the plan that fits your needs.
        </h2>
        <p className="text-gray-400 mb-12 max-w-xl mx-auto">
          Flexible pricing options designed for individuals and teams of all sizes.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl border p-8 backdrop-blur-lg transition-all
                ${
                  plan.highlight
                    ? "border-yellow-400 bg-linear-to-b from-yellow-400/10 to-transparent scale-105"
                    : "border-white/10 bg-white/5"
                }`}
            >
              {/* Badge */}
              <span
                className={`inline-block mb-4 rounded-full px-3 py-1 text-xs font-medium
                  ${
                    plan.highlight
                      ? "bg-yellow-400 text-black"
                      : "bg-white/10 text-white"
                  }`}
              >
                {plan.badge}
              </span>

              {/* Price */}
              <h3 className="text-4xl font-bold text-white">
                {plan.title}
                {plan.priceSuffix && (
                  <span className="text-sm text-gray-400">
                    {plan.priceSuffix}
                  </span>
                )}
              </h3>

              <p className="text-gray-400 mt-2 mb-6">{plan.desc}</p>

              {/* Features */}
              <ul className="space-y-3 text-left mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-300">
                    <Check
                      className={`w-5 h-5 ${
                        plan.highlight ? "text-yellow-400" : "text-gray-400"
                      }`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                className={`w-full rounded-xl py-3 font-medium transition
                  ${
                    plan.highlight
                      ? "bg-yellow-400 text-black hover:bg-yellow-500"
                      : "bg-white text-black hover:bg-gray-200"
                  }`}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
