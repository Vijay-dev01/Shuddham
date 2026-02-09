import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/ui/Button';
import { useRegisterMutation } from '../redux/api/usersApiSlice';
import { setCredentials } from '../redux/slices/authSlice';
import type { RootState } from '../redux/store';
import { Loader2 } from 'lucide-react';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [register, { isLoading }] = useRegisterMutation();
    const { userInfo } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const res = await register({ name, email, phone, password }).unwrap();
            dispatch(setCredentials(res));
            navigate('/');
        } catch (err: any) {
            alert(err?.data?.message || err.error || 'Registration failed');
        }
    };

    return (
        <div className="container mx-auto px-4 py-16 flex justify-center">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 w-full max-w-md">
                <h2 className="text-2xl font-heading font-bold text-[#1E6F5C] text-center mb-6">
                    Sign Up
                </h2>

                <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1E6F5C] outline-none"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1E6F5C] outline-none"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                +91
                            </span>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                className="flex-1 px-4 py-2 rounded-r-lg border border-gray-300 focus:ring-2 focus:ring-[#1E6F5C] outline-none"
                                placeholder="Enter 10 digit number"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1E6F5C] outline-none"
                            placeholder="Enter password"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1E6F5C] outline-none"
                            placeholder="Confirm password"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating account...
                            </>
                        ) : (
                            'Sign Up'
                        )}
                    </Button>

                    <div className="text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <a href="/login" className="text-[#1E6F5C] hover:underline font-medium">
                            Login
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
