import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import Button from '../ui/Button';

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
    weight: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, image, rating, weight }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden group">
            <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs font-bold text-[#EAB308] flex items-center shadow-sm">
                    <Star className="w-3 h-3 fill-current mr-1" />
                    {rating}
                </div>
            </div>

            <div className="p-4">
                <div className="text-xs text-gray-500 mb-1">{weight}</div>
                <h3 className="font-heading font-bold text-lg text-[#1E6F5C] mb-2 truncate">{name}</h3>

                <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-[#7A4A2E]">₹{price}</span>
                    <Button size="sm" variant="outline" className="rounded-full px-3 hover:bg-[#1E6F5C] hover:text-white border-[#1E6F5C]">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
