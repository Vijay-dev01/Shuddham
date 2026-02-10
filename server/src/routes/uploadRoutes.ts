import express from 'express';
import { uploadImage, uploadMultipleImages } from '../controllers/uploadController';
import upload from '../middleware/uploadMiddleware';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, admin, upload.single('image'), uploadImage);
router.post('/multiple', protect, admin, upload.array('images', 5), uploadMultipleImages);

export default router;
