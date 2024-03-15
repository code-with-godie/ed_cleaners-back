// imports
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import notFound from './middlewares/notFound.js';
import connectDB from './db/connect.js';
import errorHandlerMiddleware from './middlewares/error-handler.js';
import usersRoutes from './api/v1/routes/userRoutes.js';
import productRoutes from './api/v1/routes/productRoutes.js';
import paymentRoutes from './api/v1/routes/paymentRoute.js';
import orderRoutes from './api/v1/routes/orderRoutes.js';
import Product from './api/v1/models/Product.js';

// app config
dotenv.config();
const app = express();

// extra security packages
app.use(cors());
app.use(helmet());

// middlewares
app.use(express.json({ limit: '10mb' }));

// api routes
app.get('/api/v1/fast-food', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'My fast-food app!!!',
    });
});

// routes for users, products, payment, and orders
app.use('/api/v1/EdPest-Cleaners/users', usersRoutes);
app.use('/api/v1/EdPest-Cleaners/products', productRoutes);
app.use('/api/v1/EdPest-Cleaners/pay', paymentRoutes);
app.use('/api/v1/EdPest-Cleaners/order', orderRoutes);

// not found route
app.use(notFound);

// error handler middleware
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server listening at port ${port}...`));
};

start();
