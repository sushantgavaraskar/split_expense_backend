const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Custom modules
const connectDB = require('./config/db');
const expenseRoutes = require('./routes/expenses');
const settlementRoutes = require('./routes/settlements');
const analyticsRoutes = require('./routes/analytics');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// API Routes
app.use('/expenses', expenseRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/', settlementRoutes); // Put last if it uses base path

// 404 Not Found Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API endpoint not found' });
});

// Central Error Handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
