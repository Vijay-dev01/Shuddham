"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultipleImages = exports.uploadImage = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// Type assertion to bypass multer request type issues if necessary
exports.uploadImage = (0, express_async_handler_1.default)(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error('No file uploaded');
    }
    res.json({ url: `/uploads/${req.file.filename}` });
});
exports.uploadMultipleImages = (0, express_async_handler_1.default)(async (req, res) => {
    if (!req.files || req.files.length === 0) {
        res.status(400);
        throw new Error('No files uploaded');
    }
    const urls = req.files.map((file) => `/uploads/${file.filename}`);
    res.json({ urls });
});
