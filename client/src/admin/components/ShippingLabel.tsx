import React from 'react';

interface ShippingLabelProps {
    order: any;
}

const ShippingLabel: React.FC<ShippingLabelProps> = ({ order }) => {
    return (
        <div style={{
            padding: '30px',
            maxWidth: '600px',
            margin: '0 auto',
            fontFamily: 'Arial, sans-serif',
            border: '3px solid #000'
        }}>
            {/* Company Header */}
            <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '15px', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '28px', margin: '0 0 5px 0', fontWeight: 'bold' }}>SHUDDHAM</h1>
                <p style={{ margin: 0, fontSize: '12px' }}>Your trusted e-commerce partner</p>
            </div>

            {/* From Section */}
            <div style={{ marginBottom: '25px' }}>
                <h2 style={{
                    fontSize: '14px',
                    backgroundColor: '#000',
                    color: '#fff',
                    padding: '8px',
                    margin: '0 0 10px 0'
                }}>
                    FROM:
                </h2>
                <div style={{ paddingLeft: '10px' }}>
                    <p style={{ margin: '5px 0', fontWeight: 'bold', fontSize: '16px' }}>Shuddham</p>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}>Your Company Address</p>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}>City, State, PIN</p>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}>Phone: +91 XXXXXXXXXX</p>
                </div>
            </div>

            {/* To Section */}
            <div style={{ marginBottom: '25px' }}>
                <h2 style={{
                    fontSize: '14px',
                    backgroundColor: '#000',
                    color: '#fff',
                    padding: '8px',
                    margin: '0 0 10px 0'
                }}>
                    SHIP TO:
                </h2>
                <div style={{ paddingLeft: '10px' }}>
                    <p style={{ margin: '5px 0', fontWeight: 'bold', fontSize: '18px' }}>
                        {order.user?.name || 'N/A'}
                    </p>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}>{order.shippingAddress.address}</p>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}>
                        {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                    </p>
                    <p style={{ margin: '5px 0', fontSize: '14px', fontWeight: 'bold' }}>
                        {order.shippingAddress.country}
                    </p>
                    {(order.shippingAddress.phone || order.user?.phone) && (
                        <p style={{ margin: '8px 0 0 0', fontSize: '16px', fontWeight: 'bold' }}>
                            📞 {order.shippingAddress.phone || order.user?.phone}
                        </p>
                    )}
                </div>
            </div>

            {/* Order Details */}
            <div style={{ borderTop: '2px solid #000', paddingTop: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div>
                        <p style={{ margin: '5px 0', fontSize: '12px', color: '#666' }}>ORDER ID</p>
                        <p style={{ margin: '0', fontSize: '16px', fontWeight: 'bold', fontFamily: 'monospace' }}>
                            #{order._id.slice(-8).toUpperCase()}
                        </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: '5px 0', fontSize: '12px', color: '#666' }}>ORDER DATE</p>
                        <p style={{ margin: '0', fontSize: '14px', fontWeight: 'bold' }}>
                            {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div style={{ marginTop: '15px' }}>
                    <p style={{ margin: '5px 0', fontSize: '12px', color: '#666' }}>TOTAL ITEMS</p>
                    <p style={{ margin: '0', fontSize: '18px', fontWeight: 'bold' }}>
                        {order.orderItems.reduce((acc: number, item: any) => acc + item.qty, 0)} Items
                    </p>
                </div>

                {order.isPaid && (
                    <div style={{
                        marginTop: '15px',
                        padding: '10px',
                        backgroundColor: '#22c55e',
                        color: '#fff',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '14px'
                    }}>
                        ✓ PAYMENT RECEIVED
                    </div>
                )}
            </div>

            {/* Barcode Area (Placeholder) */}
            <div style={{
                marginTop: '20px',
                padding: '15px',
                border: '2px dashed #ccc',
                textAlign: 'center'
            }}>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>TRACKING CODE</p>
                <div style={{
                    margin: '10px 0',
                    fontFamily: 'monospace',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    letterSpacing: '2px'
                }}>
                    {order._id.slice(-12).toUpperCase()}
                </div>
            </div>
        </div>
    );
};

export default ShippingLabel;
