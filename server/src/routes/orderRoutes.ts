import express from 'express';
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    verifyPayment
} from '../controllers/orderController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/verify').post(protect, verifyPayment);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
