import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetOrderDetailsQuery } from '../redux/api/ordersApiSlice';
import { Loader2, ArrowLeft, Package, MapPin, CreditCard } from 'lucide-react';

const OrderDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: order, isLoading, error } = useGetOrderDetailsQuery(id!);

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

    if (error || !order) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <p className="text-red-600 mb-4">Order not found</p>
                <button
                    onClick={() => navigate('/orders')}
                    className="text-[#1E6F5C] hover:underline"
                >
                    Back to My Orders
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => navigate('/orders')}
                    className="flex items-center gap-2 text-gray-600 hover:text-[#1E6F5C] mb-4"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Orders
                </button>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-heading font-bold text-[#1E6F5C]">
                            Order #{order._id.slice(-8).toUpperCase()}
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <span className={`px-4 py-2 rounded-lg font-bold ${statusColors[(order as any).status || 'Pending']}`}>
                            {(order as any).status || 'Pending'}
                        </span>
                        <span className={`px-4 py-2 rounded-lg font-bold ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {order.isPaid ? 'Paid' : 'Payment Pending'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Order Items & Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Order Items */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Package className="h-5 w-5 text-[#1E6F5C]" />
                            <h2 className="text-xl font-bold text-gray-800">Order Items</h2>
                        </div>
                        <div className="space-y-4">
                            {order.orderItems.map((item: any, index: number) => (
                                <div key={index} className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                                        <p className="text-sm text-gray-500">Quantity: {item.qty}</p>
                                        <p className="text-sm font-medium text-gray-700">₹{item.price} each</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900">₹{(item.price * item.qty).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <MapPin className="h-5 w-5 text-[#1E6F5C]" />
                            <h2 className="text-xl font-bold text-gray-800">Shipping Address</h2>
                        </div>
                        <div className="text-gray-700">
                            <p className="font-medium">{order.user?.name}</p>
                            <p>{order.shippingAddress.address}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                            <p>{order.shippingAddress.country}</p>
                            {order.shippingAddress.phone && (
                                <p className="mt-2 text-sm">
                                    <span className="text-gray-500">Phone: </span>
                                    {order.shippingAddress.phone}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column - Summary & Payment */}
                <div className="space-y-6">
                    {/* Order Summary */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between text-gray-700">
                                <span>Items</span>
                                <span>₹{order.itemsPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span>Shipping</span>
                                <span>₹{order.shippingPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span>Tax</span>
                                <span>₹{order.taxPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                                <span>Total</span>
                                <span className="text-[#1E6F5C]">₹{order.totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <CreditCard className="h-5 w-5 text-[#1E6F5C]" />
                            <h2 className="text-xl font-bold text-gray-800">Payment</h2>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500">Payment Method</p>
                                <p className="font-medium text-gray-900">{order.paymentMethod}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Payment Status</p>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {order.isPaid ? 'Paid' : 'Pending'}
                                </span>
                            </div>
                            {order.isPaid && order.paidAt && (
                                <div>
                                    <p className="text-sm text-gray-500">Paid On</p>
                                    <p className="font-medium text-gray-900">
                                        {new Date(order.paidAt).toLocaleDateString('en-IN', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Delivery Information */}
                    {order.isDelivered && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                            <h2 className="text-lg font-bold text-green-900 mb-2">Delivered!</h2>
                            <p className="text-sm text-green-700">
                                Your order was delivered on{' '}
                                {new Date(order.deliveredAt).toLocaleDateString('en-IN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsPage;
