"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.route('/').post(authMiddleware_1.protect, orderController_1.addOrderItems);
router.route('/myorders').get(authMiddleware_1.protect, orderController_1.getMyOrders);
router.route('/verify').post(authMiddleware_1.protect, orderController_1.verifyPayment);
router.route('/:id').get(authMiddleware_1.protect, orderController_1.getOrderById);
router.route('/:id/pay').put(authMiddleware_1.protect, orderController_1.updateOrderToPaid);
exports.default = router;
