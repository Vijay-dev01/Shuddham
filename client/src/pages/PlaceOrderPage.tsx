import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../components/ui/Button';
import type { RootState } from '../redux/store';
import { useCreateOrderMutation, useVerifyPaymentMutation } from '../redux/api/ordersApiSlice';
import { toast } from 'react-hot-toast';

const PlaceOrderPage: React.FC = () => {
    const navigate = useNavigate();
    const cart = useSelector((state: RootState) => state.cart);



    const itemsPrice = Number(cart.cartItems.reduce((acc: number, item: any) => acc + item.price * item.qty, 0));
    const shippingPrice = itemsPrice > 499 ? 0 : 50;
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();
    const [verifyPayment] = useVerifyPaymentMutation();

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const placeOrderHandler = async () => {
        try {
            const res = await loadRazorpayScript();

            if (!res) {
                toast.error('Razorpay SDK failed to load. Are you online?');
                return;
            }

            const orderData = {
                orderItems: cart.cartItems.map((item: any) => ({
                    ...item,
                    product: item._id,
                })),
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: itemsPrice,
                shippingPrice: shippingPrice,
                taxPrice: taxPrice,
                totalPrice: totalPrice,
            };

            const data = await createOrder(orderData).unwrap();

            const options = {
                key: data.razorpayKeyId, // Enter the Key ID generated from the Dashboard
                amount: data.amount,
                currency: data.currency,
                name: "Shuddham",
                description: "Transaction",
                image: "/logo.png", // Add your logo here
                order_id: data.razorpayOrderId,
                handler: async function (response: any) {
                    try {
                        await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            orderId: data._id
                        }).unwrap();

                        toast.success('Payment Successful!');
                        navigate(`/order/${data._id}`);
                    } catch (err) {
                        toast.error('Payment Verification Failed');
                    }
                },
                prefill: {
                    name: "User Name", // Ideally Fetch from User Info
                    email: "user@example.com",
                    contact: "9999999999"
                },
                notes: {
                    address: "Shuddham Corporate Office"
                },
                theme: {
                    color: "#1E6F5C"
                }
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.open();

        } catch (err: any) {
            toast.error(err?.data?.message || err.error);
        }
    };

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping');
        } else if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-heading font-bold text-[#1E6F5C] mb-8">Place Order</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h2 className="text-xl font-bold text-[#7A4A2E] mb-4">Shipping</h2>
                        <p className="text-gray-600">
                            <strong>Address: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                            {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h2 className="text-xl font-bold text-[#7A4A2E] mb-4">Payment Method</h2>
                        <p className="text-gray-600">
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h2 className="text-xl font-bold text-[#7A4A2E] mb-4">Order Items</h2>
                        {cart.cartItems.length === 0 ? <p>Your cart is empty</p> : (
                            <div className="space-y-4">
                                {cart.cartItems.map((item: any, index: number) => (
                                    <div key={index} className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                        <Link to={`/product/${item._id}`} className="flex-1 hover:underline text-[#1E6F5C] font-medium">
                                            {item.name}
                                        </Link>
                                        <div className="text-gray-600">
                                            {item.qty} x ₹{item.price} = <span className="font-bold">₹{item.qty * item.price}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-24">
                        <h2 className="text-xl font-bold text-[#7A4A2E] mb-4">Order Summary</h2>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Items</span>
                                <span>₹{itemsPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>₹{shippingPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>₹{taxPrice}</span>
                            </div>
                            <div className="border-t border-gray-200 my-2"></div>
                            <div className="flex justify-between font-bold text-lg text-[#1E6F5C]">
                                <span>Total</span>
                                <span>₹{totalPrice}</span>
                            </div>
                        </div>
                        <Button className="w-full mt-6" onClick={placeOrderHandler} disabled={isLoading}>
                            {isLoading ? 'Processing...' : 'Place Order'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderPage;
