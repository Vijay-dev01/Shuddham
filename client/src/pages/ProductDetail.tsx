import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Truck, ShieldCheck, Loader2 } from 'lucide-react';
import Button from '../components/ui/Button';
import { useGetProductDetailsQuery } from '../redux/api/productsApiSlice';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data: product, isLoading, error } = useGetProductDetailsQuery(id);
    const [qty, setQty] = useState(1);

    const addToCartHandler = () => {
        if (product) {
            dispatch(addToCart({ ...product, qty }));
            navigate('/cart');
        }
    };

    if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-[#1E6F5C]" /></div>;
    if (error) return <div className="text-center py-20 text-red-500">Error loading product</div>;
    if (!product) return <div className="text-center py-20">Product not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Product Image */}
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto rounded-lg object-cover aspect-square"
                    />
                </div>

                {/* Product Info */}
                <div>
                    <div className="text-sm text-[#1E6F5C] font-bold mb-2 uppercase tracking-wide">{product.category}</div>
                    <h1 className="text-4xl font-heading font-bold text-[#7A4A2E] mb-2">{product.name}</h1>

                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-[#F2B705]">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating || 0) ? 'fill-current' : ''}`} />
                            ))}
                        </div>
                        <span className="text-gray-500 text-sm">({product.numReviews} reviews)</span>
                    </div>

                    <div className="flex items-end gap-3 mb-6">
                        <span className="text-3xl font-bold text-[#1E6F5C]">₹{product.price}</span>
                        {product.originalPrice && (
                            <>
                                <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                                <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                </span>
                            </>
                        )}
                    </div>

                    <div className="prose text-gray-600 mb-8">
                        {product.description}
                    </div>

                    {/* Selector */}
                    <div className="mb-8">
                        <span className="font-bold text-gray-800 block mb-2">Net Weight</span>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 border-2 border-[#1E6F5C] bg-[#1E6F5C]/10 text-[#1E6F5C] font-bold rounded-lg">{product.weight}</button>
                        </div>
                    </div>

                    <div className="mb-8">
                        <span className="font-bold text-gray-800 block mb-2">Quantity</span>
                        <select
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                            className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#1E6F5C]"
                        >
                            {[...Array(product.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-4 mb-8">
                        <Button size="lg" className="flex-1 text-lg" onClick={addToCartHandler} disabled={product.countInStock === 0}>
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Truck className="h-5 w-5 text-[#1E6F5C]" />
                            <span>Free Delivery above ₹499</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-[#1E6F5C]" />
                            <span>Certified Organic</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
