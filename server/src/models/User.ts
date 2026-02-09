import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type: String, required: false },
    email: { type: String, required: false, unique: true, sparse: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: false }, // For email auth
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

userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
export default User;
