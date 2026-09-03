import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import paymentRoutes from './routes/payment';
import orderRoutes from './routes/order';
import productRoutes from './routes/product';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:5173', 'https://localhost:5173'], // 👈 ALLOWS BOTH protocols
  credentials: true
}));
app.use(express.json());

// API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);

// CRITICAL: This active listener keeps the process alive indefinitely
app.listen(PORT, () => {
  console.log(`🚀 [Server]: Engine active and running on port ${PORT}`);
});
