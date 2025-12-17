"use client";

import { usePathname, useRouter } from "next/navigation";
import { FiHome, FiInfo, FiTruck, FiBriefcase, FiPhoneCall, FiCheck } from "react-icons/fi";
import { useEffect, useState } from "react";

const steps = [
  {
    id: 1,
    label: "Website Home",
    shortLabel: "Home",
    path: "/website-management",
    description: "Main landing page content",
    icon: <FiHome size={28} />,
  },
  {
    id: 2,
    label: "About Company",
    shortLabel: "About",
    path: "/website-management/about",
    description: "Company information & history",
    icon: <FiInfo size={28} />,
  },
  {
    id: 3,
    label: "Our Services",
    shortLabel: "Services",
    path: "/website-management/services",
    description: "Transportation services offered",
    icon: <FiTruck size={28} />,
  },
  {
    id: 4,
    label: "Career Jobs",
    shortLabel: "Jobs",
    path: "/website-management/jobs",
    description: "Available job opportunities",
    icon: <FiBriefcase size={28} />,
  },
  {
    id: 5,
    label: "Contact Information",
    shortLabel: "Contact",
    path: "/website-management/contact-us",
    description: "Get in touch with us",
    icon: <FiPhoneCall size={28} />,
  },
];

export default function StepsNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="w-full max-w-8xl mx-auto px-4 py-5">
      <div className="p-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Website Content Management
          </h2>
          <p className="text-gray-600">
            Manage different sections of your transport website
          </p>
        </div>

        <div className="flex items-start justify-between w-full relative">
          {steps.map((step, index) => {
            const activeIndex = steps.findIndex((s) => s.path === pathname);
            const isActive = pathname === step.path;
            const isCompleted = activeIndex > index;
            const isCurrent = activeIndex === index;

            return (
              <div key={step.id} className="flex flex-col items-center relative flex-1 group">
                {/* Step Circle */}
                <div
                  onClick={() => router.push(step.path)}
                  className={`
                    w-16 h-16 rounded-full flex items-center justify-center cursor-pointer
                    border-3 transition-all duration-300 ease-in-out transform relative z-10
                    ${
                      isCurrent
                        ? "scale-110 shadow-2xl bg-blue-600 border-blue-600 text-white ring-4 ring-blue-200"
                        : isCompleted
                        ? "bg-green-500 border-green-500 text-white shadow-lg hover:scale-105"
                        : "bg-white border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-400 hover:scale-105"
                    }
                    group-hover:shadow-xl
                  `}
                  title={step.description}
                >
                  <span className="text-2xl">
                    {isCompleted ? <FiCheck size={26} /> : step.icon}
                  </span>
                </div>

                {/* Step Number Badge */}
                <div
                  className={`
                    absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold
                    flex items-center justify-center z-20
                    ${
                      isCurrent
                        ? "bg-blue-800 text-white"
                        : isCompleted
                        ? "bg-green-600 text-white"
                        : "bg-gray-400 text-white"
                    }
                  `}
                >
                  {step.id}
                </div>

                {/* Step Content */}
                <div className="text-center mt-4 px-2">
                  <h3
                    className={`
                      text-sm font-bold mb-1 transition-all duration-300
                      ${
                        isCurrent
                          ? "text-blue-600"
                          : isCompleted
                          ? "text-green-600"
                          : "text-gray-700"
                      }
                    `}
                  >
                    {step.label}
                  </h3>

                  <p
                    className={`
                      text-xs transition-all duration-300 leading-tight
                      ${
                        isCurrent
                          ? "text-blue-500"
                          : isCompleted
                          ? "text-green-500"
                          : "text-gray-500"
                      }
                    `}
                  >
                    {step.description}
                  </p>

                  {/* Status Badge */}
                  <div className="mt-2">
                    <span
                      className={`
                        inline-block px-2 py-1 rounded-full text-xs font-medium
                        ${
                          isCurrent
                            ? "bg-blue-100 text-blue-800"
                            : isCompleted
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }
                      `}
                    >
                      {isCurrent ? "Current" : isCompleted ? "Completed" : "Pending"}
                    </span>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-1/2 transform translate-x-8 hidden lg:block">
                    <div
                      className={`
                        w-24 h-1 rounded-full transition-all duration-500
                        ${
                          isCompleted
                            ? "bg-linear-to-r from-green-500 to-blue-500"
                            : "bg-gray-200"
                        }
                      `}
                    />

                    {/* Animated Progress Dots */}
                    <div className="flex justify-center mt-2 space-x-1">
                      {[...Array(3)].map((_, dotIndex) => (
                        <div
                          key={dotIndex}
                          className={`
                            w-1 h-1 rounded-full transition-all duration-300
                            ${
                              isCompleted
                                ? "bg-blue-400 animate-pulse"
                                : "bg-gray-300"
                            }
                          `}
                          style={{
                            animationDelay: `${dotIndex * 200}ms`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile View */}
        <div className="lg:hidden mt-6">
          <div className="flex items-center justify-center space-x-2">
            {steps.map((step, index) => {
              const isActive = pathname === step.path;
              const isCompleted = steps.findIndex((s) => s.path === pathname) > index;

              return (
                <button
                  key={step.id}
                  onClick={() => router.push(step.path)}
                  className={`
                    w-3 h-3 rounded-full transition-all duration-300
                    ${
                      isActive
                        ? "bg-blue-600 ring-4 ring-blue-200 scale-125"
                        : isCompleted
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }
                  `}
                  title={step.label}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
