import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';
import { notFound, errorHandler } from './middleware/errorMiddleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
