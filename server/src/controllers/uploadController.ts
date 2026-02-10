import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

// Type assertion to bypass multer request type issues if necessary
export const uploadImage = asyncHandler(async (req: any, res: Response) => {
    if (!req.file) {
        res.status(400);
        throw new Error('No file uploaded');
    }
    res.json({ url: `/uploads/${req.file.filename}` });
});

export const uploadMultipleImages = asyncHandler(async (req: any, res: Response) => {
    if (!req.files || req.files.length === 0) {
        res.status(400);
        throw new Error('No files uploaded');
    }
    const urls = req.files.map((file: any) => `/uploads/${file.filename}`);
    res.json({ urls });
});
