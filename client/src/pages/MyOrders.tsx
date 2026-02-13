import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetMyOrdersQuery } from '../redux/api/ordersApiSlice';
import { Loader2, Package, Eye } from 'lucide-react';

const MyOrders: React.FC = () => {
    const navigate = useNavigate();
    const { data: orders, isLoading, error } = useGetMyOrdersQuery({});

    const statusColors: Record<string, string> = {
        Pending: 'bg-yellow-100 text-yellow-700',
        Confirmed: 'bg-blue-100 text-blue-700',
        Packed: 'bg-purple-100 text-purple-700',
        Shipped: 'bg-indigo-100 text-indigo-700',
        Delivered: 'bg-green-100 text-green-700',
        Cancelled: 'bg-red-100 text-red-700',
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-16 flex justify-center items-center">
                <Loader2 className="h-10 w-10 animate-spin text-[#1E6F5C]" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <p className="text-red-600">Error loading orders. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-heading font-bold text-[#1E6F5C] mb-2">My Orders</h1>
                <p className="text-gray-600">Track and manage your orders</p>
            </div>

            {!orders || orders.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-800 mb-2">No Orders Yet</h2>
                    <p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-[#1E6F5C] text-white rounded-lg hover:bg-[#165a47] transition-colors"
                    >
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order: any) => (
                        <div
                            key={order._id}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                {/* Order Info */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-bold text-gray-900">
                                            Order #{order._id.slice(-8).toUpperCase()}
                                        </h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[(order as any).status || 'Pending']}`}>
                                            {(order as any).status || 'Pending'}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {order.isPaid ? 'Paid' : 'Payment Pending'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {order.orderItems.length} item(s) • Total: <span className="font-bold text-gray-900">₹{order.totalPrice}</span>
                                    </p>
                                </div>

                                {/* Order Items Preview */}
                                <div className="flex items-center gap-2">
                                    {order.orderItems.slice(0, 3).map((item: any, index: number) => (
                                        <img
                                            key={index}
                                            src={item.image}
                                            alt={item.name}
                                            className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                                        />
                                    ))}
                                    {order.orderItems.length > 3 && (
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-xs text-gray-600 font-medium">
                                            +{order.orderItems.length - 3}
                                        </div>
                                    )}
                                </div>

                                {/* View Button */}
                                <button
                                    onClick={() => navigate(`/orders/${order._id}`)}
                                    className="flex items-center gap-2 px-4 py-2 bg-[#1E6F5C] text-white rounded-lg hover:bg-[#165a47] transition-colors"
                                >
                                    <Eye className="h-4 w-4" />
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
