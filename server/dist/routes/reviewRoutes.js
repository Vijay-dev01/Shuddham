"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewController_1 = require("../controllers/reviewController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/top', reviewController_1.getTopReviews);
router.route('/')
    .post(authMiddleware_1.protect, reviewController_1.createReview)
    .get(authMiddleware_1.protect, authMiddleware_1.admin, reviewController_1.getReviews);
router.route('/:id')
    .delete(authMiddleware_1.protect, authMiddleware_1.admin, reviewController_1.deleteReview);
router.route('/product/:productId')
    .get(reviewController_1.getProductReviews);
exports.default = router;
