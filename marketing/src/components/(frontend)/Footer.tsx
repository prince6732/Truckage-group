import { Facebook, Linkedin, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#0f0f0f] text-gray-300">
            <div className="container mx-auto px-6 py-16">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

                    {/* LEFT LOGO + APP BUTTONS */}
                    <div className="space-y-6 col-span-1">
                        <h2 className="text-4xl font-bold ">Truckage.in</h2>

                        <div className="space-y-4">
                            <a href="#">
                                <img
                                    src="/images/google-play-badge1.png"
                                    alt="Google Play"
                                    className="h-12 w-45 border border-white rounded-md  object-cover mb-4"
                                />
                            </a>
                            <a href="#">
                                <img
                                    src="/images/apple-store1.png"
                                    alt="App Store"
                                    className="h-12 w-45 border border-white rounded-md  object-cover"
                                />
                            </a>
                        </div>
                    </div>

                    {/* USE CASES */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Use Cases</h4>

                        <ul className="space-y-2">
                            <li>Pizza</li>
                            <li>Quick service restaurants</li>
                            <li>Grocery & Prepared meals</li>
                            <li>Local delivery services</li>
                        </ul>
                    </div>

                    {/* PRODUCT */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Product</h4>

                        <ul className="space-y-2">
                            <li>Pricing</li>
                            <li>Partners</li>
                            <li>Integrations</li>
                            <li>FAQ</li>
                        </ul>
                    </div>

                    {/* LEARN */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Learn</h4>

                        <ul className="space-y-2">
                            <li>Blog</li>
                            <li>API Docs</li>
                        </ul>
                    </div>

                    {/* COMPANY */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>

                        <ul className="space-y-2">
                            <li>Contact sales</li>
                            <li>Terms of service</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                    {/* CONTACT US */}
                    <div className="lg:col-span-1">
                        <h4 className="text-white font-semibold mb-2">Contact us</h4>

                        <ul className="space-y-2">
                            <a href="mailto:topntechofficial@gmail.com">
                                <li>topntechofficial@gmail.com</li>
                            </a>
                            <a href="tel:+919914327671">
                                <li>Call us +91-99143-27671</li>
                            </a>
                        </ul>
                    </div>
                </div>

                {/* Horizontal Line */}
                <div className="border border-gray-700 my-2"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between">

                    {/* Language Selector */}
                    <div className="flex items-center justify-between text-gray-400 text-sm py-2">
                        <p>© {new Date().getFullYear()} Copyright & Powered by <a href="https://topntech.com/">TopNTech</a> </p>

                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center space-x-4">
                        <a href="#" aria-label="Facebook" className="p-2 rounded-md bg-gray-800 hover:bg-primary transition">
                            <Facebook className="w-5 h-5 text-gray-200" />
                        </a>
                        <a href="#" aria-label="LinkedIn" className="p-2 rounded-md bg-gray-800 hover:bg-primary transition">
                            <Linkedin className="w-5 h-5 text-gray-200" />
                        </a>
                        <a href="#" aria-label="Twitter" className="p-2 rounded-md bg-gray-800 hover:bg-primary transition">
                            <Twitter className="w-5 h-5 text-gray-200" />
                        </a>
                        <a href="#" aria-label="Instagram" className="p-2 rounded-md bg-gray-800 hover:bg-primary transition">
                            <Instagram className="w-5 h-5 text-gray-200" />
                        </a>
                        <a href="#" aria-label="YouTube" className="p-2 rounded-md bg-gray-800 hover:bg-primary transition">
                            <Youtube className="w-5 h-5 text-gray-200" />
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
}
