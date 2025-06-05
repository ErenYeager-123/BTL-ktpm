const CustomerModel = require('../models/customerModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { hoTen, email, soDienThoai, matKhau } = req.body;
    const existingCustomer = await CustomerModel.findByEmail(email);
    if (existingCustomer) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const newCustomer = await CustomerModel.createCustomer({ hoTen, email, soDienThoai, matKhau });
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await CustomerModel.findByEmail(email);
    if (!customer) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, customer.matKhau);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: customer.idKhachHang, role: customer.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, customer: { id: customer.idKhachHang, email: customer.email, name: customer.hoTen, role: customer.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const customerId = req.user.id;
    const bookings = await CustomerModel.getBookingsByCustomer(customerId);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};