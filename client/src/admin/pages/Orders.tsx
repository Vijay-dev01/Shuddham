import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAdminOrdersQuery, useUpdateOrderStatusMutation } from '../api/adminApiSlice';
import { Loader2, Eye, Search } from 'lucide-react';

const Orders: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const { data: orders, isLoading, refetch } = useGetAdminOrdersQuery({});
    const [updateStatus, { isLoading: updating }] = useUpdateOrderStatusMutation();

    const filteredOrders = orders?.filter((order: any) => {
        const matchesSearch =
            order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.user?.phone?.includes(searchQuery);

        const matchesFilter =
            filterStatus === 'all' ||
            (filterStatus === 'paid' && order.isPaid) ||
            (filterStatus === 'pending' && !order.isPaid) ||
            (filterStatus === 'delivered' && order.isDelivered) ||
            (filterStatus === 'processing' && !order.isDelivered);

        return matchesSearch && matchesFilter;
    }) || [];

    const handleStatusChange = async (orderId: string, status: string) => {
        try {
            await updateStatus({ id: orderId, status }).unwrap();
            refetch();
            alert('Order status updated');
        } catch (err: any) {
            alert(err?.data?.message || 'Failed to update status');
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-10 w-10 animate-spin text-[#1E6F5C]" />
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Orders</h1>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by order ID, customer name, or phone..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E6F5C] outline-none"
                        />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E6F5C] outline-none"
                    >
                        <option value="all">All Orders</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Payment Pending</option>
                        <option value="delivered">Delivered</option>
                        <option value="processing">Processing</option>
                    </select>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Order ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Customer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Contact
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Total
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Payment
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Delivery
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                                        No orders found
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order: any) => (
                                    <tr key={order._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-mono text-gray-900">
                                            #{order._id.slice(-8)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {order.user?.name || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {order.user?.phone || order.user?.email || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">
                                            ₹{order.totalPrice}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2 py-1 text-xs font-bold rounded-full ${order.isPaid
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-yellow-100 text-yellow-700'
                                                    }`}
                                            >
                                                {order.isPaid ? 'Paid' : 'Pending'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {order.isPaid ? (
                                                <select
                                                    value={order.isDelivered ? 'Delivered' : 'Processing'}
                                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                    disabled={updating}
                                                    className="text-xs font-bold px-2 py-1 rounded-lg border-0 focus:ring-2 focus:ring-[#1E6F5C] outline-none bg-blue-100 text-blue-700"
                                                >
                                                    <option value="Processing">Processing</option>
                                                    <option value="Delivered">Delivered</option>
                                                </select>
                                            ) : (
                                                <span className="px-2 py-1 text-xs font-bold rounded-full bg-gray-100 text-gray-600">
                                                    Awaiting Payment
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => navigate(`/admin/orders/${order._id}`)}
                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors inline-flex items-center gap-2 text-sm text-[#1E6F5C]"
                                            >
                                                <Eye className="h-4 w-4" />
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;
