"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminProductController_1 = require("../controllers/adminProductController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const adminMiddleware_1 = require("../middleware/adminMiddleware");
const router = express_1.default.Router();
router.route('/')
    .get(authMiddleware_1.protect, adminMiddleware_1.isAdmin, adminProductController_1.getProducts)
    .post(authMiddleware_1.protect, adminMiddleware_1.isAdmin, adminProductController_1.createProduct);
router.route('/:id')
    .put(authMiddleware_1.protect, adminMiddleware_1.isAdmin, adminProductController_1.updateProduct)
    .delete(authMiddleware_1.protect, adminMiddleware_1.isAdmin, adminProductController_1.deleteProduct);
router.route('/:id/status')
    .patch(authMiddleware_1.protect, adminMiddleware_1.isAdmin, adminProductController_1.toggleProductStatus);
exports.default = router;
