import express from 'express';
import cors from 'cors';
import dontenv from 'dotenv';
import connectDB from './db/dbconnect.js';
import connectCloudinary from './db/Cloudinary.js';
dontenv.config();

//import routes
import userRoutes from './routes/userR.js';
import proRoutes from './routes/productR.js';
import catRoutes from './routes/categoryR.js';
import rewRoutes from './routes/reviewR.js';
import adminRoutes from './routes/adminAuth.js';
import searchRoutes from './routes/searchR.js';
import orderRoutes from './routes/orderR.js';

const app = express();
app.use(express.json());
const PORT = 3000;
app.use(cors());
connectDB();
connectCloudinary();

//routes
app.use('/api/user', userRoutes);
app.use('/api/product', proRoutes);
app.use('/api/category', catRoutes);
app.use('/api/review', rewRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/order', orderRoutes);
app.use('/api', searchRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});