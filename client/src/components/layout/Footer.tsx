import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#1E6F5C] text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

                    {/* Column 1: Brand */}
                    <div>
                        <h3 className="text-2xl font-heading font-bold mb-4">Shuddham</h3>
                        <p className="text-gray-200 mb-4 leading-relaxed">
                            Bringing pure, farm-fresh spices and cold-pressed oils directly to your kitchen. No chemicals, no preservatives.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-[#F2B705] transition-colors"><Facebook className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-[#F2B705] transition-colors"><Instagram className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-[#F2B705] transition-colors"><Twitter className="h-5 w-5" /></a>
                        </div>
                    </div>

                    {/* Column 2: Policies */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-[#F2B705]">Policies</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Terms & Conditions</a></li>
                            <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Shipping Policy</a></li>
                            <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Refund Policy</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-[#F2B705]">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="/about" className="text-gray-200 hover:text-white transition-colors">About Us</a></li>
                            <li><a href="/spices" className="text-gray-200 hover:text-white transition-colors">Shop Spices</a></li>
                            <li><a href="/oils" className="text-gray-200 hover:text-white transition-colors">Shop Oils</a></li>
                            <li><a href="/contact" className="text-gray-200 hover:text-white transition-colors">Contact Support</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-[#F2B705]">Get in Touch</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-gray-200">
                                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                                <span>123, Green Farm Road,<br />Coimbatore, Tamil Nadu - 641001</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-200">
                                <Phone className="h-5 w-5 shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-200">
                                <Mail className="h-5 w-5 shrink-0" />
                                <span>hello@shuddham.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-[#155d4c] pt-8 text-center text-gray-300 text-sm">
                    <p>&copy; {new Date().getFullYear()} Shuddham. All rights reserved.</p>
                    <p className="mt-2 text-xs opacity-70">FSSAI License No: 12345678901234</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
