import React from 'react';

const Customers: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Customers</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="max-w-md mx-auto">
                    <div className="text-6xl mb-4">👥</div>
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">Coming Soon</h2>
                    <p className="text-gray-500">
                        Customer management features will be available in Phase 2.
                        You'll be able to view customer lists, order history, and manage user accounts.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Customers;
