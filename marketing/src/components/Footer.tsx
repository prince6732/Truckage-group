import {
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import logo from "../../public/logo_white.png";

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* BRAND */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src={logo}
                alt="Truckage Logo"
                width={42}
                height={42}
                className="object-contain"
              />
              <h2 className="text-2xl font-bold text-white">
                Truckage
              </h2>
            </div>

            <p className="text-sm leading-relaxed text-gray-400">
              Smart fleet & logistics management platform helping businesses
              track, manage, and scale operations efficiently.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Information</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy-policy" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="/dmca-notice" className="hover:text-white">DMCA Notice</a></li>
              <li><a href="/refund-cancellation" className="hover:text-white">Refund & Cancellation</a></li>
              <li><a href="/terms-conditions" className="hover:text-white">Terms & Conditions</a></li>
              <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Upcoming Features</h4>
            <ul className="space-y-2 text-sm">
              <li>Live Vehicle Tracking</li>
              <li>AI Route Optimization</li>
              <li>Driver Performance Analytics</li>
              <li>Fuel & Expense Reports</li>
              <li>Mobile App (Android & iOS)</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:info@truckage.com"
                  className="hover:text-white transition"
                >
                  info@truckage.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+910000000000"
                  className="hover:text-white transition"
                >
                  +91 0000 0000 00
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 my-10" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* COPYRIGHT */}
          <p className="text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} Truckage Group. All rights reserved.
          </p>

          {/* SOCIAL LINKS */}
          <div className="flex items-center gap-4">
            {[
              { icon: Facebook, label: "Facebook" },
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Twitter, label: "Twitter" },
              { icon: Instagram, label: "Instagram" },
              { icon: Youtube, label: "YouTube" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
              >
                <Icon className="w-5 h-5 text-gray-300 hover:text-white transition" />
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}
