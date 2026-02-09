import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../redux/slices/cartSlice';
import Button from '../ui/Button';

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    image: string;
    rating?: number;
    weight?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, rating = 0, weight = '100g' }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // Add product to cart with qty 1 and redirect to cart
        dispatch(addToCart({ _id: id, name, price, image, qty: 1, countInStock: 10 }));
        navigate('/cart');
    };

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden group cursor-pointer">
            <a href={`/product/${id}`} className="block">
                <div className="relative overflow-hidden bg-gray-50 aspect-square">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {rating >= 4 && (
                        <div className="absolute top-2 right-2 bg-[#F2B705] text-[#7A4A2E] text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" />
                            {rating}
                        </div>
                    )}
                </div>

                <div className="p-4">
                    <div className="text-xs text-gray-500 mb-1">{weight}</div>
                    <h3 className="font-heading font-bold text-lg text-[#1E6F5C] mb-2 truncate">{name}</h3>

                    <div className="flex items-center justify-between mt-4">
                        <span className="text-xl font-bold text-[#7A4A2E]">₹{price}</span>
                        <Button
                            size="sm"
                            variant="outline"
                            className="rounded-full px-3 hover:bg-[#1E6F5C] hover:text-white border-[#1E6F5C]"
                            onClick={handleAddToCart}
                        >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add
                        </Button>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default ProductCard;
