"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: false },
    email: { type: String, required: false, unique: true, sparse: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    isAdmin: { type: Boolean, required: true, default: false },
    addresses: [{
            street: String,
            city: String,
            state: String,
            zip: String,
            country: String
        }]
}, {
    timestamps: true
});
userSchema.methods.matchPassword = async function (enteredPassword) {
    if (!this.password)
        return false;
    return await bcryptjs_1.default.compare(enteredPassword, this.password);
};
userSchema.pre('save', async function () {
    if (!this.isModified('password') || !this.password) {
        return;
    }
    const salt = await bcryptjs_1.default.genSalt(10);
    this.password = await bcryptjs_1.default.hash(this.password, salt);
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
