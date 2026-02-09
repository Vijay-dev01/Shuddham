import React from 'react';

const Settings: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="max-w-md mx-auto">
                    <div className="text-6xl mb-4">⚙️</div>
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">Coming Soon</h2>
                    <p className="text-gray-500 mb-6">
                        Settings page will be available in Phase 3.
                        You'll be able to configure website settings, payment gateways, and more.
                    </p>
                    <div className="text-left bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 font-semibold mb-2">Planned Features:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Website name & logo</li>
                            <li>• Contact information</li>
                            <li>• Social media links</li>
                            <li>• Razorpay API keys</li>
                            <li>• GST & FSSAI details</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
