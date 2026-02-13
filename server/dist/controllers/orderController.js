"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = exports.getMyOrders = exports.updateOrderToPaid = exports.getOrderById = exports.addOrderItems = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Order_1 = __importDefault(require("../models/Order"));
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = (0, express_async_handler_1.default)(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, } = req.body;
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    }
    else {
        const order = new Order_1.default({
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
        const razorpay = new razorpay_1.default({
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
exports.addOrderItems = addOrderItems;
// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = (0, express_async_handler_1.default)(async (req, res) => {
    const order = await Order_1.default.findById(req.params.id).populate('user', 'name email');
    if (order) {
        res.json(order);
    }
    else {
        res.status(404);
        throw new Error('Order not found');
    }
});
exports.getOrderById = getOrderById;
// @desc    Verify Razorpay Payment
// @route   POST /api/orders/verify
// @access  Private
const verifyPayment = (0, express_async_handler_1.default)(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto_1.default
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || '')
        .update(sign.toString())
        .digest("hex");
    if (razorpay_signature === expectedSign) {
        const order = await Order_1.default.findById(orderId);
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
        }
        else {
            res.status(404);
            throw new Error('Order not found');
        }
    }
    else {
        res.status(400);
        throw new Error('Invalid signature');
    }
});
exports.verifyPayment = verifyPayment;
// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = (0, express_async_handler_1.default)(async (req, res) => {
    const order = await Order_1.default.findById(req.params.id);
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
    }
    else {
        res.status(404);
        throw new Error('Order not found');
    }
});
exports.updateOrderToPaid = updateOrderToPaid;
// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = (0, express_async_handler_1.default)(async (req, res) => {
    const orders = await Order_1.default.find({ user: req.user._id });
    res.json(orders);
});
exports.getMyOrders = getMyOrders;
