import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/ui/Button';
import { useLoginMutation } from '../redux/api/usersApiSlice';
import { setCredentials } from '../redux/slices/authSlice';
import type { RootState } from '../redux/store';
import { Loader2 } from 'lucide-react';

const Login: React.FC = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect') || '/';

    const [login, { isLoading }] = useLoginMutation();
    const { userInfo } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await login({ phone, password }).unwrap();
            dispatch(setCredentials(res));
            navigate(redirect);
        } catch (err: any) {
            alert(err?.data?.message || err.error || 'Login failed');
        }
    };

    return (
        <div className="container mx-auto px-4 py-16 flex justify-center">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 w-full max-w-md">
                <h2 className="text-2xl font-heading font-bold text-[#1E6F5C] text-center mb-6">
                    Login
                </h2>

                <form onSubmit={submitHandler} className="space-y-6">
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
                                className="flex-1 px-4 py-2 rounded-r-lg border border-gray-300 focus:ring-2 focus:ring-[#1E6F5C] focus:border-transparent outline-none"
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
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1E6F5C] focus:border-transparent outline-none"
                            placeholder="Enter password"
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
                                Logging in...
                            </>
                        ) : (
                            'Login'
                        )}
                    </Button>

                    <div className="text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <a href="/register" className="text-[#1E6F5C] hover:underline font-medium">
                            Sign up
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
