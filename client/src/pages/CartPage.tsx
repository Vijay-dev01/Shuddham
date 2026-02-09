import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import Button from '../components/ui/Button';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';
import type { RootState } from '../redux/store';

const CartPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler = (product: any, qty: number) => {
        dispatch(addToCart({ ...product, qty }));
    };

    const removeFromCartHandler = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-heading font-bold text-[#1E6F5C] mb-8">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
                    <Link to="/">
                        <Button>Go Shopping</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item: any) => (
                            <div key={item._id} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                                <div className="flex-1">
                                    <Link to={`/product/${item._id}`} className="font-bold text-[#7A4A2E] hover:underline">
                                        {item.name}
                                    </Link>
                                    <div className="text-sm text-gray-500">{item.weight}</div>
                                </div>
                                <div className="font-bold text-[#1E6F5C]">₹{item.price}</div>
                                <select
                                    value={item.qty}
                                    onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                    className="px-2 py-1 border border-gray-300 rounded outline-none"
                                >
                                    {[...Array(item.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => removeFromCartHandler(item._id)}
                                    className="text-red-500 hover:text-red-700 p-2"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-24">
                            <h2 className="text-xl font-bold text-[#7A4A2E] mb-4">Order Summary</h2>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                                <span className="font-bold">
                                    ₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
                                </span>
                            </div>
                            <div className="border-t border-gray-200 my-4"></div>
                            <Button className="w-full" onClick={checkoutHandler} disabled={cartItems.length === 0}>
                                Proceed to Checkout
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
