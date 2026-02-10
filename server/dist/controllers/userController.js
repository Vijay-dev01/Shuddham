"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.registerUser = exports.authUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_1 = __importDefault(require("../models/User"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { phone, password } = req.body;
    // Ideally, verify password or OTP here. For dummy purpose, check phone.
    // Assuming password auth for now as per schema
    const user = await User_1.default.findOne({ phone });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            token: (0, generateToken_1.default)(user._id.toString()),
        });
    }
    else {
        res.status(401);
        throw new Error('Invalid phone or password');
    }
});
exports.authUser = authUser;
// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { name, email, phone, password } = req.body;
    const userExists = await User_1.default.findOne({ phone });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User_1.default.create({
        name,
        email,
        phone,
        password,
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            token: (0, generateToken_1.default)(user._id.toString()),
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});
exports.registerUser = registerUser;
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = (0, express_async_handler_1.default)(async (req, res) => {
    // req.user is set by authMiddleware
    const user = await User_1.default.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
        });
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
});
exports.getUserProfile = getUserProfile;
