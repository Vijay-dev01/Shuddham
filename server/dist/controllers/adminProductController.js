"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleProductStatus = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProducts = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Product_1 = __importDefault(require("../models/Product"));
// @desc    Get all products (Admin)
// @route   GET /api/admin/products
// @access  Private/Admin
const getProducts = (0, express_async_handler_1.default)(async (req, res) => {
    const products = await Product_1.default.find({});
    res.json(products);
});
exports.getProducts = getProducts;
// @desc    Create a product
// @route   POST /api/admin/products
// @access  Private/Admin
const createProduct = (0, express_async_handler_1.default)(async (req, res) => {
    const { name, image, images, description, benefits, usage, storage, category, subCategory, price, countInStock, weight } = req.body;
    const product = new Product_1.default({
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
exports.createProduct = createProduct;
// @desc    Update a product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
const updateProduct = (0, express_async_handler_1.default)(async (req, res) => {
    const { name, image, images, description, benefits, usage, storage, category, subCategory, price, countInStock, weight } = req.body;
    const product = await Product_1.default.findById(req.params.id);
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
    }
    else {
        res.status(404);
        throw new Error('Product not found');
    }
});
exports.updateProduct = updateProduct;
// @desc    Delete a product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
const deleteProduct = (0, express_async_handler_1.default)(async (req, res) => {
    const product = await Product_1.default.findById(req.params.id);
    if (product) {
        await product.deleteOne();
        res.json({ message: 'Product removed' });
    }
    else {
        res.status(404);
        throw new Error('Product not found');
    }
});
exports.deleteProduct = deleteProduct;
// @desc    Toggle product active status
// @route   PATCH /api/admin/products/:id/status
// @access  Private/Admin
const toggleProductStatus = (0, express_async_handler_1.default)(async (req, res) => {
    const product = await Product_1.default.findById(req.params.id);
    if (product) {
        product.isActive = !product.isActive;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    }
    else {
        res.status(404);
        throw new Error('Product not found');
    }
});
exports.toggleProductStatus = toggleProductStatus;
