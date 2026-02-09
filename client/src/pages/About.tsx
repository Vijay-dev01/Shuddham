import React from 'react';

const About: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl font-heading font-bold text-[#1E6F5C] mb-6">Our Story</h1>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    Shuddham was born from a simple promise: to bring the authentic taste of nature back to your table.
                    In a world full of adulterated food, we stand for purity.
                </p>

                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-left mb-12">
                    <h2 className="text-2xl font-bold text-[#7A4A2E] mb-4">Our Mission</h2>
                    <p className="text-gray-600 mb-6">
                        To support local farmers and provide chemical-free, nutrient-rich food to every household.
                        We believe that food should be medicine, not poison.
                    </p>

                    <h2 className="text-2xl font-bold text-[#7A4A2E] mb-4">The Process</h2>
                    <p className="text-gray-600">
                        Our spices are sun-dried and stone-ground to retain their natural oils and aroma.
                        Our oils are cold-pressed (Chekku/Ghani) at low temperatures to preserve nutrients.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
