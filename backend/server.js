const express = require('express');
const app = express();
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const foodRoutes = require('./routes/FoodRoutes');
const cartRoutes = require('./routes/CartRoutes');
const orderRoutes = require('./routes/OrderRoutes');
const paymentRoutes = require('./routes/PaymentRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const PORT = process.env.PORT || 4000;
require('dotenv').config();

connectDB();

// CORS configuration
const corsOptions = {
  origin: '*', // Allow all origins (not recommended for production)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Apply CORS middleware globally before any route
app.use(cors(corsOptions));

// Middleware for parsing cookies and request bodies
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/stripe', paymentRoutes);

// Static file serving (e.g., for image uploads)
app.use('/images', express.static('uploads'));

// Handle preflight requests explicitly (just to be sure)
app.options('*', cors());

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
