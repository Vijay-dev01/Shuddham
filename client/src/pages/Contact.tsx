import React from 'react';
import Button from '../components/ui/Button';

const Contact: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-heading font-bold text-[#1E6F5C] text-center mb-12">Get in Touch</h1>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-2xl font-bold text-[#7A4A2E] mb-4">Contact Information</h3>
                    <p className="text-gray-600 mb-6">
                        Have questions about our products or your order? We are here to help.
                    </p>

                    <div className="space-y-4">
                        <p className="font-bold text-[#1E6F5C]">Address:</p>
                        <p className="text-gray-600">123, Green Farm Road,<br />Coimbatore, Tamil Nadu - 641001</p>

                        <p className="font-bold text-[#1E6F5C] mt-4">Email:</p>
                        <p className="text-gray-600">hello@shuddham.com</p>

                        <p className="font-bold text-[#1E6F5C] mt-4">WhatsApp / Phone:</p>
                        <p className="text-gray-600">+91 98765 43210</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1E6F5C] focus:border-transparent outline-none" placeholder="Your Name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1E6F5C] focus:border-transparent outline-none" placeholder="your@email.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea rows={4} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1E6F5C] focus:border-transparent outline-none" placeholder="How can we help?"></textarea>
                        </div>
                        <Button className="w-full">Send Message</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
