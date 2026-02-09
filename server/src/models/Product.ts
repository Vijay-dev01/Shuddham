import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    images: [{ type: String }], // Multiple images
    description: { type: String, required: true },
    benefits: { type: String }, // Product benefits
    usage: { type: String }, // Usage instructions
    storage: { type: String }, // Storage instructions
    category: { type: String, required: true },
    subCategory: { type: String }, // e.g., Turmeric, Chilli
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    reviews: [reviewSchema],
    weight: { type: String, required: true, default: '100g' },
    isActive: { type: Boolean, default: true }, // For admin to enable/disable products
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product;
