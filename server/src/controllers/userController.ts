import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/User';
import generateToken from '../utils/generateToken';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req: Request, res: Response) => {
    const { phone, password } = req.body;

    // Ideally, verify password or OTP here. For dummy purpose, check phone.
    // Assuming password auth for now as per schema
    const user = await User.findOne({ phone });

    if (user && (await (user as any).matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            token: generateToken(user._id.toString()),
        });
    } else {
        res.status(401);
        throw new Error('Invalid phone or password');
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, phone, password } = req.body;

    const userExists = await User.findOne({ phone });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
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
            token: generateToken(user._id.toString()),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
    // req.user is set by authMiddleware
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export { authUser, registerUser, getUserProfile };
