"use client"

import * as React from "react"

interface LogoCarouselProps {
  logos: string[]
}

export function LogoCarousel({ logos }: LogoCarouselProps) {
  // Triple the logos for truly seamless infinite scroll
  const extendedLogos = [...logos, ...logos, ...logos]
  
  return (
    <div className="w-full overflow-hidden py-8">
      {/* Infinite Scrolling Container */}
      <div className="relative">
        <div className="flex animate-scroll">
          {extendedLogos.map((logo, index) => (
            <div
              key={`logo-${index}`}
              className="shrink-0 mx-4 group"
              style={{ minWidth: '200px' }}
            >
              <div className="flex items-center justify-center p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-lg hover:border-blue-200 transition-all duration-300 h-20 group">
                <img
                  src={logo}
                  alt="Trusted Client Logo"
                  className="h-12 w-auto object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 max-w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        .animate-scroll {
          animation: scroll 60s linear infinite;
          width: fit-content;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        
        /* Fade edges for smooth appearance */
        .relative::before,
        .relative::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100px;
          z-index: 2;
          pointer-events: none;
        }
        
        .relative::before {
          left: 0;
          background: linear-gradient(to right, white, transparent);
        }
        
        .relative::after {
          right: 0;
          background: linear-gradient(to left, white, transparent);
        }
      `}</style>
    </div>
  )
}
