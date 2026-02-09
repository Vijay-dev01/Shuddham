import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/Order';

// @desc    Get all orders (Admin)
// @route   GET /api/admin/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req: Request, res: Response) => {
    const orders = await Order.find({})
        .populate('user', 'name email phone')
        .sort({ createdAt: -1 });
    res.json(orders);
});

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

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
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard/stats
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req: Request, res: Response) => {
    const totalOrders = await Order.countDocuments({});

    // Today's orders
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayOrders = await Order.countDocuments({
        createdAt: { $gte: today }
    });

    // Total revenue
    const revenueData = await Order.aggregate([
        { $match: { isPaid: true } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

    // Pending shipments (paid but not delivered)
    const pendingShipments = await Order.countDocuments({
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

export {
    getAllOrders,
    updateOrderStatus,
    getDashboardStats
};
