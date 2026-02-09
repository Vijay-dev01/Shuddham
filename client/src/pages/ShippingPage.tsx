import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { saveShippingAddress } from '../redux/slices/cartSlice';
import type { RootState } from '../redux/store';

const ShippingPage: React.FC = () => {
    const cart = useSelector((state: RootState) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    };

    return (
        <div className="container mx-auto px-4 py-8 flex justify-center">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-heading font-bold text-[#1E6F5C] mb-8">Shipping Address</h1>

                <form onSubmit={submitHandler} className="space-y-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                            type="text"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1E6F5C] outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1E6F5C] outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                        <input
                            type="text"
                            required
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1E6F5C] outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <input
                            type="text"
                            required
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1E6F5C] outline-none"
                        />
                    </div>

                    <Button type="submit" className="w-full mt-4">Continue to Payment</Button>
                </form>
            </div>
        </div>
    );
};

export default ShippingPage;
