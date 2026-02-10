"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadController_1 = require("../controllers/uploadController");
const uploadMiddleware_1 = __importDefault(require("../middleware/uploadMiddleware"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.protect, authMiddleware_1.admin, uploadMiddleware_1.default.single('image'), uploadController_1.uploadImage);
router.post('/multiple', authMiddleware_1.protect, authMiddleware_1.admin, uploadMiddleware_1.default.array('images', 5), uploadController_1.uploadMultipleImages);
exports.default = router;
