"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const adminProductRoutes_1 = __importDefault(require("./routes/adminProductRoutes"));
const adminOrderRoutes_1 = __importDefault(require("./routes/adminOrderRoutes"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
(0, db_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Serve static files from the uploads directory
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../public/uploads')));
app.get('/', (req, res) => {
    res.send('API is running...');
});
app.use('/api/products', productRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/orders', orderRoutes_1.default);
app.use('/api/admin/products', adminProductRoutes_1.default);
app.use('/api/admin/orders', adminOrderRoutes_1.default);
app.use('/api/upload', uploadRoutes_1.default);
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
