"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyOrders = exports.updateOrderToPaid = exports.getOrderById = exports.addOrderItems = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Order_1 = __importDefault(require("../models/Order"));
// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = (0, express_async_handler_1.default)(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, } = req.body;
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
        return;
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
        res.status(201).json(createdOrder);
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
