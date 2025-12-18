import Link from 'next/link';
import { FaFacebookF, FaGithub, FaInstagram, FaPinterestP, FaYoutube } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa6';

export default function Footer() {
    const icons = [
        { icon: <FaFacebookF />, href: "#" },
        { icon: <FaInstagram />, href: "#" },
        { icon: <FaYoutube />, href: "#" },
        { icon: <FaPinterestP />, href: "#" },
        { icon: <FaTwitter />, href: "#" },

    ];
    return (
        <footer className="bg-white text-black border-t border-gray-200">
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="bg-blue-600 text-white px-4 py-2 rounded font-bold text-lg mb-4 inline-block">
                            MyTransport
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            My Transport Services was founded in 2013, as a specialized arm of an Organization expertise in handling the customized shipping, Logistics & FTL Service Punjab, Haryana, Himachal to thousands of customers across the country.
                        </p>
                    </div>


                    <div>
                        <h3 className="text-black font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/About" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/Contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-black font-bold text-lg mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="text-sm text-gray-600">
                                Vill, Ram Nagar Sainian<br />Punjab 140417
                            </li>
                            <li>
                                <a href="tel:+911234567890" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                    +91 1234567890
                                </a>
                            </li>
                            <li>
                                <a href="tel:+910987654321" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                    +91 0987654321
                                </a>
                            </li>
                            <li>
                                <a href="mailto:contact@mytransport.com" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                    contact@mytransport.com
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* Social Media */}
                    <div>
                        <h3 className="text-black font-bold text-lg mb-4">Connect With Us</h3>
                        
                        <div className="flex items-center gap-3">
                            {icons.map((item, i) => (
                                <a
                                    key={i}
                                    href={item.href}
                                    className="flex items-center justify-center h-10 w-10 rounded bg-gray-100 text-black hover:bg-blue-600 hover:text-white transition-colors"
                                >
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
            <div className="border-t border-gray-200 bg-gray-50">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-4">
                        <p className="text-gray-600">
                            &copy; {new Date().getFullYear()} My Transport Services. All rights reserved.
                        </p>
                        <a 
                            href="https://topntech.com/" 
                            className="text-gray-600 hover:text-blue-600 transition-colors" 
                            target='_blank'
                            rel="noopener noreferrer"
                        >
                            Developed by <span className="font-semibold">TopNTech Solutions</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
