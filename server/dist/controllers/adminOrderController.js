"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = exports.updateOrderStatus = exports.getAllOrders = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Order_1 = __importDefault(require("../models/Order"));
// @desc    Get all orders (Admin)
// @route   GET /api/admin/orders
// @access  Private/Admin
const getAllOrders = (0, express_async_handler_1.default)(async (req, res) => {
    const orders = await Order_1.default.find({})
        .populate('user', 'name email phone')
        .sort({ createdAt: -1 });
    res.json(orders);
});
exports.getAllOrders = getAllOrders;
// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = (0, express_async_handler_1.default)(async (req, res) => {
    const { status } = req.body;
    const order = await Order_1.default.findById(req.params.id);
    if (order) {
        // Update isDelivered if status is 'Delivered'
        if (status === 'Delivered') {
            order.isDelivered = true;
            order.deliveredAt = new Date();
        }
        // You can add a custom status field to Order model if needed
        // order.status = status;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    }
    else {
        res.status(404);
        throw new Error('Order not found');
    }
});
exports.updateOrderStatus = updateOrderStatus;
// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard/stats
// @access  Private/Admin
const getDashboardStats = (0, express_async_handler_1.default)(async (req, res) => {
    const totalOrders = await Order_1.default.countDocuments({});
    // Today's orders
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayOrders = await Order_1.default.countDocuments({
        createdAt: { $gte: today }
    });
    // Total revenue
    const revenueData = await Order_1.default.aggregate([
        { $match: { isPaid: true } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;
    // Pending shipments (paid but not delivered)
    const pendingShipments = await Order_1.default.countDocuments({
        isPaid: true,
        isDelivered: false
    });
    res.json({
        totalOrders,
        todayOrders,
        totalRevenue,
        pendingShipments
    });
});
exports.getDashboardStats = getDashboardStats;
