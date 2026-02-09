import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/Product';

// @desc    Get all products (Admin)
// @route   GET /api/admin/products
// @access  Private/Admin
const getProducts = asyncHandler(async (req: Request, res: Response) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc    Create a product
// @route   POST /api/admin/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req: Request, res: Response) => {
    const {
        name,
        image,
        images,
        description,
        benefits,
        usage,
        storage,
        category,
        subCategory,
        price,
        countInStock,
        weight
    } = req.body;

    const product = new Product({
        name,
        image,
        images: images || [],
        description,
        benefits,
        usage,
        storage,
        category,
        subCategory,
        price,
        countInStock,
        weight,
        isActive: true
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const {
        name,
        image,
        images,
        description,
        benefits,
        usage,
        storage,
        category,
        subCategory,
        price,
        countInStock,
        weight
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.image = image || product.image;
        product.images = images || product.images;
        product.description = description || product.description;
        product.benefits = benefits || product.benefits;
        product.usage = usage || product.usage;
        product.storage = storage || product.storage;
        product.category = category || product.category;
        product.subCategory = subCategory || product.subCategory;
        product.price = price !== undefined ? price : product.price;
        product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
        product.weight = weight || product.weight;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Delete a product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Toggle product active status
// @route   PATCH /api/admin/products/:id/status
// @access  Private/Admin
const toggleProductStatus = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        product.isActive = !product.isActive;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus
};
