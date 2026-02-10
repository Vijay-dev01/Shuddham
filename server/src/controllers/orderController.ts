import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/Order';
import Razorpay from 'razorpay';
import crypto from 'crypto';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req: any, res: Response) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();

        console.log("PAYMENT DEBUG: Checking Keys");
        console.log("Key ID:", process.env.RAZORPAY_KEY_ID);
        console.log("Key Secret Exists:", !!process.env.RAZORPAY_KEY_SECRET);

        // Initialize Razorpay
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID || '',
            key_secret: process.env.RAZORPAY_KEY_SECRET || '',
        });

        const options = {
            amount: Math.round(totalPrice * 100), // Amount in paise
            currency: 'INR',
            receipt: createdOrder._id.toString(),
        };

        const razorpayOrder = await razorpay.orders.create(options);

        res.status(201).json({
            ...createdOrder.toObject(),
            razorpayOrderId: razorpayOrder.id,
            razorpayKeyId: process.env.RAZORPAY_KEY_ID
        });
    }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    );

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Verify Razorpay Payment
// @route   POST /api/orders/verify
// @access  Private
const verifyPayment = asyncHandler(async (req: Request, res: Response) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || '')
        .update(sign.toString())
        .digest("hex");

    if (razorpay_signature === expectedSign) {
        const order = await Order.findById(orderId);

        if (order) {
            order.isPaid = true;
            order.paidAt = new Date();
            order.paymentResult = {
                id: razorpay_payment_id,
                status: 'COMPLETED',
                update_time: new Date().toISOString(),
                email_address: '',
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            };

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order not found');
        }
    } else {
        res.status(400);
        throw new Error('Invalid signature');
    }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = new Date();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, verifyPayment };
