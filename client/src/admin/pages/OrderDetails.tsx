import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetOrderByIdQuery, useUpdateOrderStatusMutation } from '../api/adminApiSlice';
import { Loader2, ArrowLeft, Printer, Package } from 'lucide-react';
import OrderInvoice from '../components/OrderInvoice';
import ShippingLabel from '../components/ShippingLabel';

const OrderDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const invoiceRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);

    const { data: order, isLoading, refetch } = useGetOrderByIdQuery(id!);
    const [updateStatus, { isLoading: updating }] = useUpdateOrderStatusMutation();

    const handleStatusChange = async (status: string) => {
        try {
            await updateStatus({ id: id!, status }).unwrap();
            refetch();
            alert('Order status updated successfully');
        } catch (err: any) {
            alert(err?.data?.message || 'Failed to update status');
        }
    };

    const handlePrintInvoice = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow && invoiceRef.current) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Invoice - Order ${order?._id}</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            @media print {
                                body { padding: 0; }
                            }
                        </style>
                    </head>
                    <body>
                        ${invoiceRef.current.innerHTML}
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }
    };

    const handlePrintLabel = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow && labelRef.current) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Shipping Label - Order ${order?._id}</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            @media print {
                                body { padding: 0; margin: 0; }
                            }
                        </style>
                    </head>
                    <body>
                        ${labelRef.current.innerHTML}
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-10 w-10 animate-spin text-[#1E6F5C]" />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Order not found</p>
                <button
                    onClick={() => navigate('/admin/orders')}
                    className="mt-4 text-[#1E6F5C] hover:underline"
                >
                    Back to Orders
                </button>
            </div>
        );
    }

    const statusColors: Record<string, string> = {
        Pending: 'bg-yellow-100 text-yellow-700',
        Confirmed: 'bg-blue-100 text-blue-700',
        Packed: 'bg-purple-100 text-purple-700',
        Shipped: 'bg-indigo-100 text-indigo-700',
        Delivered: 'bg-green-100 text-green-700',
        Cancelled: 'bg-red-100 text-red-700',
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin/orders')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Order Details</h1>
                        <p className="text-sm text-gray-500 mt-1">Order ID: #{order._id}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handlePrintInvoice}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1E6F5C] text-white rounded-lg hover:bg-[#165a47] transition-colors"
                    >
                        <Printer className="h-4 w-4" />
                        Print Invoice
                    </button>
                    <button
                        onClick={handlePrintLabel}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <Package className="h-4 w-4" />
                        Print Label
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Order Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Customer Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Customer Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Name</p>
                                <p className="font-medium text-gray-900">{order.user?.name || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium text-gray-900">{order.user?.email || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-medium text-gray-900">{order.user?.phone || order.shippingAddress?.phone || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Order Date</p>
                                <p className="font-medium text-gray-900">
                                    {new Date(order.createdAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Shipping Address</h2>
                        <div className="text-gray-700">
                            <p>{order.shippingAddress.address}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                            <p>{order.shippingAddress.country}</p>
                            {order.shippingAddress.phone && (
                                <p className="mt-2">
                                    <span className="text-gray-500">Phone: </span>
                                    {order.shippingAddress.phone}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Order Items</h2>
                        <div className="space-y-4">
                            {order.orderItems.map((item: any, index: number) => (
                                <div key={index} className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                                        <p className="text-sm text-gray-500">Quantity: {item.qty}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900">₹{item.price}</p>
                                        <p className="text-sm text-gray-500">Total: ₹{item.price * item.qty}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between text-gray-700">
                                <span>Items Price</span>
                                <span>₹{order.itemsPrice}</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span>Shipping Price</span>
                                <span>₹{order.shippingPrice}</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span>Tax</span>
                                <span>₹{order.taxPrice}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                                <span>Total</span>
                                <span>₹{order.totalPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Status & Payment */}
                <div className="space-y-6">
                    {/* Order Status */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Order Status</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-2">Current Status</p>
                                <span className={`px-3 py-2 rounded-lg font-bold text-sm inline-block ${statusColors[(order as any).status || 'Pending']}`}>
                                    {(order as any).status || 'Pending'}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-2">Update Status</p>
                                <select
                                    value={(order as any).status || 'Pending'}
                                    onChange={(e) => handleStatusChange(e.target.value)}
                                    disabled={updating}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E6F5C] outline-none"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Packed">Packed</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Information</h2>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500">Payment Method</p>
                                <p className="font-medium text-gray-900">{order.paymentMethod}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Payment Status</p>
                                <span className={`px-3 py-1 rounded-full text-sm font-bold ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {order.isPaid ? 'Paid' : 'Pending'}
                                </span>
                            </div>
                            {order.isPaid && order.paidAt && (
                                <div>
                                    <p className="text-sm text-gray-500">Paid At</p>
                                    <p className="font-medium text-gray-900">
                                        {new Date(order.paidAt).toLocaleString()}
                                    </p>
                                </div>
                            )}
                            {order.paymentResult?.razorpay_payment_id && (
                                <div>
                                    <p className="text-sm text-gray-500">Payment ID</p>
                                    <p className="font-mono text-xs text-gray-900 break-all">
                                        {order.paymentResult.razorpay_payment_id}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Delivery Information */}
                    {order.isDelivered && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Delivery Information</h2>
                            <div>
                                <p className="text-sm text-gray-500">Delivered At</p>
                                <p className="font-medium text-gray-900">
                                    {new Date(order.deliveredAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Hidden components for printing */}
            <div style={{ display: 'none' }}>
                <div ref={invoiceRef}>
                    <OrderInvoice order={order} />
                </div>
                <div ref={labelRef}>
                    <ShippingLabel order={order} />
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
