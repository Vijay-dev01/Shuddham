import React from 'react';

interface OrderInvoiceProps {
    order: any;
}

const OrderInvoice: React.FC<OrderInvoiceProps> = ({ order }) => {
    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            {/* Header */}
            <div style={{ borderBottom: '3px solid #1E6F5C', paddingBottom: '20px', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '32px', color: '#1E6F5C', margin: 0 }}>INVOICE</h1>
                <p style={{ margin: '10px 0 0 0', color: '#666' }}>Order ID: #{order._id}</p>
            </div>

            {/* Company & Customer Info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                <div>
                    <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>From:</h2>
                    <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Shuddham</p>
                    <p style={{ margin: '5px 0', color: '#666' }}>Your Company Address</p>
                    <p style={{ margin: '5px 0', color: '#666' }}>City, State, PIN</p>
                    <p style={{ margin: '5px 0', color: '#666' }}>Phone: +91 XXXXXXXXXX</p>
                </div>
                <div>
                    <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Bill To:</h2>
                    <p style={{ margin: '5px 0', fontWeight: 'bold' }}>{order.user?.name || 'N/A'}</p>
                    <p style={{ margin: '5px 0', color: '#666' }}>{order.shippingAddress.address}</p>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                        {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                    </p>
                    <p style={{ margin: '5px 0', color: '#666' }}>{order.shippingAddress.country}</p>
                    {order.shippingAddress.phone && (
                        <p style={{ margin: '5px 0', color: '#666' }}>Phone: {order.shippingAddress.phone}</p>
                    )}
                </div>
            </div>

            {/* Invoice Details */}
            <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <p style={{ margin: '5px 0' }}>
                        <strong>Invoice Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p style={{ margin: '5px 0' }}>
                        <strong>Payment Method:</strong> {order.paymentMethod}
                    </p>
                </div>
                <div>
                    <p style={{ margin: '5px 0' }}>
                        <strong>Payment Status:</strong>{' '}
                        <span style={{
                            color: order.isPaid ? '#22c55e' : '#eab308',
                            fontWeight: 'bold'
                        }}>
                            {order.isPaid ? 'PAID' : 'PENDING'}
                        </span>
                    </p>
                    {order.isPaid && order.paidAt && (
                        <p style={{ margin: '5px 0' }}>
                            <strong>Paid On:</strong> {new Date(order.paidAt).toLocaleDateString()}
                        </p>
                    )}
                </div>
            </div>

            {/* Items Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #1E6F5C' }}>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Item</th>
                        <th style={{ padding: '12px', textAlign: 'center' }}>Quantity</th>
                        <th style={{ padding: '12px', textAlign: 'right' }}>Price</th>
                        <th style={{ padding: '12px', textAlign: 'right' }}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {order.orderItems.map((item: any, index: number) => (
                        <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                            <td style={{ padding: '12px' }}>{item.name}</td>
                            <td style={{ padding: '12px', textAlign: 'center' }}>{item.qty}</td>
                            <td style={{ padding: '12px', textAlign: 'right' }}>₹{item.price.toFixed(2)}</td>
                            <td style={{ padding: '12px', textAlign: 'right' }}>₹{(item.price * item.qty).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Totals */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ width: '300px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                        <span>Subtotal:</span>
                        <span>₹{order.itemsPrice.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                        <span>Shipping:</span>
                        <span>₹{order.shippingPrice.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                        <span>Tax:</span>
                        <span>₹{order.taxPrice.toFixed(2)}</span>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '12px 0',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        borderTop: '2px solid #1E6F5C',
                        marginTop: '8px'
                    }}>
                        <span>Total:</span>
                        <span style={{ color: '#1E6F5C' }}>₹{order.totalPrice.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div style={{ marginTop: '60px', paddingTop: '20px', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
                <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>Thank you for your business!</p>
                <p style={{ margin: '5px 0', color: '#666', fontSize: '12px' }}>
                    For any questions regarding this invoice, please contact us at support@shuddham.com
                </p>
            </div>
        </div>
    );
};

export default OrderInvoice;
