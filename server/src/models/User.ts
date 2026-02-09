import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
    name?: string;
    email?: string;
    phone: string;
    password?: string;
    isAdmin: boolean;
    addresses?: Array<{
        street?: string;
        city?: string;
        state?: string;
        zip?: string;
        country?: string;
    }>;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
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

userSchema.methods.matchPassword = async function (this: IUser, enteredPassword: string) {
    if (!this.password) return false;
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (this: IUser) {
    if (!this.isModified('password') || !this.password) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
