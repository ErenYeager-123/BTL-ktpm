const pool = require('../config/db');
const bcrypt = require('bcryptjs');

class CustomerModel {
  static async findByEmail(email) {
    try {
      const [rows] = await pool.query('SELECT * FROM khachhang WHERE email = ?', [email]);
      return rows[0];
    } catch (error) {
      throw new Error(`Lỗi tìm khách hàng theo email: ${error.message}`);
    }
  }

  static async createCustomer(customerData) {
    try {
      const { hoTen, email, soDienThoai, matKhau, role = 'customer' } = customerData;
      const hashedPassword = await bcrypt.hash(matKhau, 10);
      const [result] = await pool.query(
        'INSERT INTO khachhang (hoTen, email, soDienThoai, matKhau, role) VALUES (?, ?, ?, ?, ?)',
        [hoTen, email, soDienThoai, hashedPassword, role]
      );
      return { idKhachHang: result.insertId, hoTen, email, soDienThoai, role };
    } catch (error) {
      throw new Error(`Lỗi tạo khách hàng: ${error.message}`);
    }
  }

  static async getBookingsByCustomer(customerId) {
    try {
      const [rows] = await pool.query(
        'SELECT ds.*, sb.tenSan, sb.diaChi FROM datsan ds ' +
        'JOIN sanbong sb ON ds.idSan = sb.idSan ' +
        'WHERE ds.idKhachHang = ?',
        [customerId]
      );
      return rows;
    } catch (error) {
      throw new Error(`Lỗi lấy danh sách đặt sân: ${error.message}`);
    }
  }
}

module.exports = CustomerModel;