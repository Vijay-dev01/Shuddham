import express from 'express';
import { createReview, getProductReviews, getReviews, deleteReview, getTopReviews } from '../controllers/reviewController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/top', getTopReviews);

router.route('/')
    .post(protect, createReview)
    .get(protect, admin, getReviews);

router.route('/:id')
    .delete(protect, admin, deleteReview);

router.route('/product/:productId')
    .get(getProductReviews);

export default router;
