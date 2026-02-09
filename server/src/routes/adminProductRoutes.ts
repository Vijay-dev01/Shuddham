import express from 'express';
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus
} from '../controllers/adminProductController';
import { protect } from '../middleware/authMiddleware';
import { isAdmin } from '../middleware/adminMiddleware';

const router = express.Router();

router.route('/')
    .get(protect, isAdmin, getProducts)
    .post(protect, isAdmin, createProduct);

router.route('/:id')
    .put(protect, isAdmin, updateProduct)
    .delete(protect, isAdmin, deleteProduct);

router.route('/:id/status')
    .patch(protect, isAdmin, toggleProductStatus);

export default router;
