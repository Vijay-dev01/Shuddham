import React, { useState } from 'react';
import Button from '../components/ui/Button';

const Login: React.FC = () => {
    const [step, setStep] = useState<'phone' | 'otp'>('phone');

    return (
        <div className="container mx-auto px-4 py-16 flex justify-center">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 w-full max-w-md">
                <h2 className="text-2xl font-heading font-bold text-[#1E6F5C] text-center mb-6">
                    {step === 'phone' ? 'Login / Signup' : 'Verify OTP'}
                </h2>

                {step === 'phone' ? (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                    +91
                                </span>
                                <input
                                    type="tel"
                                    className="flex-1 px-4 py-2 rounded-r-lg border border-gray-300 focus:ring-2 focus:ring-[#1E6F5C] focus:border-transparent outline-none"
                                    placeholder="Enter 10 digit number"
                                />
                            </div>
                        </div>
                        <Button className="w-full" onClick={() => setStep('otp')}>Get OTP</Button>
                        <div className="text-center text-sm text-gray-500">
                            By continuing, you agree to our Terms & Privacy Policy.
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <p className="text-center text-gray-600 text-sm">
                            We have sent a verification code to +91 XXXXX XXXXX
                        </p>
                        <div className="flex justify-center gap-2">
                            {[...Array(6)].map((_, i) => (
                                <input
                                    key={i}
                                    type="text"
                                    maxLength={1}
                                    className="w-10 h-10 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E6F5C] outline-none text-lg font-bold"
                                />
                            ))}
                        </div>
                        <Button className="w-full">Verify & Login</Button>
                        <div className="text-center">
                            <button onClick={() => setStep('phone')} className="text-sm text-[#1E6F5C] hover:underline">
                                Change Number
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
