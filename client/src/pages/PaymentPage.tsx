import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { savePaymentMethod } from '../redux/slices/cartSlice';
import type { RootState } from '../redux/store';

const PaymentPage: React.FC = () => {
    const cart = useSelector((state: RootState) => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress.address) {
        // navigate('/shipping'); // Ideally should checking in useEffect
    }

    const [paymentMethod, setPaymentMethod] = useState('Razorpay');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <div className="container mx-auto px-4 py-8 flex justify-center">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-heading font-bold text-[#1E6F5C] mb-8">Payment Method</h1>

                <form onSubmit={submitHandler} className="space-y-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="space-y-2">
                        <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                                type="radio"
                                id="Razorpay"
                                name="paymentMethod"
                                value="Razorpay"
                                checked
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="h-4 w-4 text-[#1E6F5C] focus:ring-[#1E6F5C]"
                            />
                            <span className="font-medium">Razorpay / UPI / Cards</span>
                        </label>

                        <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                                type="radio"
                                id="COD"
                                name="paymentMethod"
                                value="COD"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="h-4 w-4 text-[#1E6F5C] focus:ring-[#1E6F5C]"
                            />
                            <span className="font-medium">Cash on Delivery</span>
                        </label>
                    </div>

                    <Button type="submit" className="w-full mt-4">Continue</Button>
                </form>
            </div>
        </div>
    );
};

export default PaymentPage;
