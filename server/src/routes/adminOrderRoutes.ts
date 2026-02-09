import express from 'express';
import {
    getAllOrders,
    updateOrderStatus,
    getDashboardStats
} from '../controllers/adminOrderController';
import { protect } from '../middleware/authMiddleware';
import { isAdmin } from '../middleware/adminMiddleware';


const router = express.Router();

// Dashboard stats route must come BEFORE /:id routes
router.route('/dashboard/stats')
    .get(protect, isAdmin, getDashboardStats);

router.route('/')
    .get(protect, isAdmin, getAllOrders);

router.route('/:id/status')
    .put(protect, isAdmin, updateOrderStatus);

export default router;
