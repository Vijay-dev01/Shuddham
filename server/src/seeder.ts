import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users';
import products from './data/products';
import User from './models/User';
import Product from './models/Product';
import Order from './models/Order';
import connectDB from './config/db';

dotenv.config();

const importData = async () => {
    try {
        await connectDB();

        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product: any) => {
            return { ...product, user: adminUser };
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await connectDB();

        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
