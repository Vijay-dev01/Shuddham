import React from 'react';
import { Sprout, ShieldCheck, Ban, Leaf } from 'lucide-react';

const features = [
    {
        icon: <Sprout className="h-8 w-8 text-[#1E6F5C]" />,
        title: 'Direct from Farmers',
        description: 'We source our raw materials directly from trusted organic farmers.',
    },
    {
        icon: <Leaf className="h-8 w-8 text-[#1E6F5C]" />,
        title: 'Cold-Pressed & Stone-Ground',
        description: 'Traditional methods to retain natural aroma, nutrients, and flavor.',
    },
    {
        icon: <Ban className="h-8 w-8 text-[#1E6F5C]" />,
        title: 'No Chemicals',
        description: '100% natural. No added colors, preservatives, or artificial flavors.',
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-[#1E6F5C]" />,
        title: 'Lab Tested Quality',
        description: 'Every batch is tested for purity and safety standards.',
    },
];

const Features: React.FC = () => {
    return (
        <section className="py-16 bg-[#FAFAF7]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-heading font-bold text-[#1E6F5C] mb-4">Why Choose Shuddham?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We believe in transparency and tradition. Here is what makes our products stand out.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center border border-gray-100">
                            <div className="bg-[#1E6F5C]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-[#7A4A2E] mb-2">{feature.title}</h3>
                            <p className="text-gray-600 custom-text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
