"use client";

import { Check, Zap, Star, Crown, Rocket } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      title: "Starter",
      price: "₹499",
      desc: "Best for individuals and small teams getting started.",
      features: [
        "5 Vehicles Tracking",
        "Basic Dashboard Access",
        "Email Support",
        "1 Admin User",
      ],
      highlight: false,
      icon: <Zap size={24} />,
      color: "from-green-600 to-green-700",
    },
    {
      title: "Business",
      price: "₹999",
      desc: "Perfect for growing businesses needing advanced control.",
      features: [
        "20 Vehicles Tracking",
        "Advanced Reports",
        "Priority Support",
        "5 Admin Users",
      ],
      highlight: true,
      icon: <Star size={24} />,
      color: "from-green-700 to-green-800",
    },
    {
      title: "Enterprise",
      price: "₹1,999",
      desc: "For large companies requiring powerful tools & support.",
      features: [
        "Unlimited Vehicles",
        "Full Analytics Suite",
        "24/7 Phone Support",
        "Unlimited Admins",
      ],
      highlight: false,
      icon: <Crown size={24} />,
      color: "from-green-800 to-green-900",
    },
  ];

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium text-sm mb-6 border">
            <Rocket size={16} />
            Choose Your Plan
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            Simple & Transparent Pricing
          </h2>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Choose the perfect plan that fits your business needs and unlock the
            full potential of your fleet management
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-6 transition-all duration-500 hover:-translate-y-3
              ${
                plan.highlight
                  ? "border-2 border-gray-900 shadow-2xl scale-105"
                  : "border border-gray-200 shadow-lg"
              } bg-white`}
            >
              {/* Popular Badge */}
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-linear-to-r from-gray-800 to-black text-white text-xs font-bold px-4 py-2 rounded-full shadow-xl">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className="mb-6">
                <div
                  className={`w-12 h-12 rounded-xl bg-linear-to-br ${plan.color} flex items-center justify-center shadow-lg`}
                >
                  <span className="text-white">{plan.icon}</span>
                </div>
              </div>

              {/* Plan Info */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.title}
                </h3>
                <p className="text-gray-600 text-sm">{plan.desc}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 text-lg">/month</span>
                </div>
                <p className="text-green-600 text-sm font-medium mt-1">
                  Cancel anytime
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 px-3 transition-all duration-300 hover:translate-x-1"
                  >
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-600 shrink-0 mt-0.5">
                      <Check
                        size={14}
                        strokeWidth={3}
                        className="text-white"
                      />
                    </div>
                    <span className="text-gray-800 text-sm font-medium leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105
                ${
                  plan.highlight
                    ? "bg-linear-to-r from-gray-800 to-black text-white shadow-xl"
                    : "bg-linear-to-r from-gray-700 to-gray-900 text-white shadow-lg"
                }`}
              >
                Get Started Now
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">Need a custom solution?</p>
          <button className="px-8 py-4 bg-linear-to-r from-gray-800 to-black text-white font-semibold rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105">
            Contact Sales Team
          </button>
        </div>
      </div>
    </section>
  );
}
