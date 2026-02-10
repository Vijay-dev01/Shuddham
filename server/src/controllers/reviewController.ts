import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Review from '../models/Review';
import Product from '../models/Product';

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private
const createReview = asyncHandler(async (req: any, res: Response) => {
    const { rating, comment, productId } = req.body;

    const product = await Product.findById(productId);

    if (product) {
        const alreadyReviewed = await Review.findOne({
            user: req.user._id,
            product: productId
        });

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const review = await Review.create({
            user: req.user._id,
            product: productId,
            rating: Number(rating),
            comment
        });

        // Update product rating and numReviews
        const reviews = await Review.find({ product: productId });
        product.numReviews = reviews.length;
        product.rating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

        // Also update the embedded reviews array in Product if we want to keep it in sync, 
        // OR just rely on the separate Review model. 
        // Given existing code had embedded reviews, let's optionaly push there or just leave it.
        // For now, I will NOT push to product.reviews to avoid duplication of truth, 
        // unless I see frontend using product.reviews directly.
        // But since I saw product.reviews in Product model, I should probably use it or remove it.
        // The safest bet for now is to update the aggregates (rating, numReviews) on Product.

        await product.save();

        res.status(201).json(review);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Get reviews for a product
// @route   GET /api/reviews/:productId
// @access  Public
const getProductReviews = asyncHandler(async (req: Request, res: Response) => {
    const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name');
    res.json(reviews);
});

// @desc    Get all reviews (Admin)
// @route   GET /api/reviews
// @access  Private/Admin
const getReviews = asyncHandler(async (req: Request, res: Response) => {
    const reviews = await Review.find({}).populate('user', 'name').populate('product', 'name');
    res.json(reviews);
});

// @desc    Get top rated reviews
// @route   GET /api/reviews/top
// @access  Public
const getTopReviews = asyncHandler(async (req: Request, res: Response) => {
    const reviews = await Review.find({}).sort({ rating: -1 }).limit(3).populate('user', 'name').populate('product', 'name');
    res.json(reviews);
});

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private/Admin
const deleteReview = asyncHandler(async (req: Request, res: Response) => {
    const review = await Review.findById(req.params.id);

    if (review) {
        await Review.deleteOne({ _id: req.params.id });

        // Recalculate product rating handled optimally by just re-fetching or straightforward logic.
        // Just calling save on product might be enough if we had a pre-save hook, but we don't.
        // Let's manually update product stats.
        const product = await Product.findById(review.product);
        if (product) {
            const reviews = await Review.find({ product: review.product });
            product.numReviews = reviews.length;
            product.rating = reviews.length > 0 ? reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length : 0;
            await product.save();
        }

        res.json({ message: 'Review removed' });
    } else {
        res.status(404);
        throw new Error('Review not found');
    }
});

export { createReview, getProductReviews, getReviews, deleteReview, getTopReviews };
