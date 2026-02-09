import React from 'react';
import Button from '../ui/Button';

const Hero: React.FC = () => {
    return (
        <section className="relative h-[600px] flex items-center justify-center bg-[#1E6F5C] overflow-hidden">
            {/* Overlay/Image Placeholder */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-[#FAFAF7] mb-6 drop-shadow-lg">
                    Pure. Natural. From Farm to Your Kitchen.
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow-md">
                    Experience the authentic taste of cold-pressed oils and stone-ground spices, made without compromise.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="primary" size="lg" className="bg-[#F2B705] text-[#7A4A2E] hover:bg-[#d9a404] font-bold">
                        Shop Spices
                    </Button>
                    <Button variant="outline" size="lg" className="border-[#FAFAF7] text-[#FAFAF7] hover:bg-[#FAFAF7]/20">
                        Shop Pure Oils
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
