const express = require('express');
const cors = require('cors');
const customerRoutes = require('./routes/customerRoutes');
const fieldRoutes = require('./routes/fieldRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug log để kiểm tra route
console.log('Đang tải route...');
console.log('customerRoutes:', typeof customerRoutes);
console.log('fieldRoutes:', typeof fieldRoutes);
console.log('bookingRoutes:', typeof bookingRoutes);
console.log('paymentRoutes:', typeof paymentRoutes);
console.log('ownerRoutes:', typeof ownerRoutes);

// Sử dụng route
app.use('/api/customers', customerRoutes);
app.use('/api/fields', fieldRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/owners', ownerRoutes);

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Máy chủ đang chạy trên cổng ${PORT}`);
});