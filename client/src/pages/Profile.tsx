import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const Profile: React.FC = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);

    if (!userInfo) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h2>
                <Link to="/login">
                    <Button>Go to Login</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-heading font-bold text-[#1E6F5C] mb-8">My Profile</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h2 className="text-xl font-bold text-[#7A4A2E] mb-4">Account Information</h2>
                        <div className="space-y-3">
                            <div>
                                <span className="text-sm font-medium text-gray-500">Name</span>
                                <p className="text-gray-800">{userInfo.name || 'Not provided'}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-500">Email</span>
                                <p className="text-gray-800">{userInfo.email || 'Not provided'}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-500">Phone</span>
                                <p className="text-gray-800">{userInfo.phone}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-500">Account Type</span>
                                <p className="text-gray-800">{userInfo.isAdmin ? 'Admin' : 'Customer'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h2 className="text-xl font-bold text-[#7A4A2E] mb-4">Quick Links</h2>
                        <div className="space-y-2">
                            <Link to="/orders" className="block text-[#1E6F5C] hover:underline">My Orders</Link>
                            <Link to="/cart" className="block text-[#1E6F5C] hover:underline">Shopping Cart</Link>
                            <Link to="/shipping" className="block text-[#1E6F5C] hover:underline">Saved Addresses</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
