"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = (0, express_async_handler_1.default)(async (req, res) => {
    const products = await Product_1.default.find({});
    res.json(products);
});
exports.getProducts = getProducts;
// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = (0, express_async_handler_1.default)(async (req, res) => {
    const product = await Product_1.default.findById(req.params.id);
    if (product) {
        res.json(product);
    }
    else {
        res.status(404);
        throw new Error('Product not found');
    }
});
exports.getProductById = getProductById;
