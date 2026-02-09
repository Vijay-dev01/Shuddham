import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true }
}, {
    timestamps: true
});

const productSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Admin user
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true }, // 'spices' or 'oils'
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: false },
    countInStock: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    reviews: [reviewSchema],
    weight: { type: String, required: true },
    benefits: [{ type: String }]
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product;
