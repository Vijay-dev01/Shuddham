import { Request, Response } from 'express';
import Product from '../models/Product';
import asyncHandler from 'express-async-handler';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req: Request, res: Response) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export { getProducts, getProductById };
