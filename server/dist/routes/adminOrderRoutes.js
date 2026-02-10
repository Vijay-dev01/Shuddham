"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminOrderController_1 = require("../controllers/adminOrderController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const adminMiddleware_1 = require("../middleware/adminMiddleware");
const router = express_1.default.Router();
// Dashboard stats route must come BEFORE /:id routes
router.route('/dashboard/stats')
    .get(authMiddleware_1.protect, adminMiddleware_1.isAdmin, adminOrderController_1.getDashboardStats);
router.route('/')
    .get(authMiddleware_1.protect, adminMiddleware_1.isAdmin, adminOrderController_1.getAllOrders);
router.route('/:id/status')
    .put(authMiddleware_1.protect, adminMiddleware_1.isAdmin, adminOrderController_1.updateOrderStatus);
exports.default = router;
