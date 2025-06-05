const pool = require('../config/db');

class BookingModel {
  static async checkAvailability(fieldId, startTime, endTime) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM datsan WHERE idSan = ? AND ' +
        '(thoigianBatDau < ? AND thoigianKetThuc > ?)',
        [fieldId, endTime, startTime]
      );
      return rows.length === 0;
    } catch (error) {
      throw new Error(`Lỗi kiểm tra tình trạng sân: ${error.message}`);
    }
  }

  static async createBooking(bookingData) {
    try {
      const { idKhachHang, idSan, thoigianBatDau, thoigianKetThuc, trangThai } = bookingData;
      const [result] = await pool.query(
        'INSERT INTO datsan (idKhachHang, idSan, thoigianBatDau, thoigianKetThuc, trangThai) VALUES (?, ?, ?, ?, ?)',
        [idKhachHang, idSan, thoigianBatDau, thoigianKetThuc, trangThai]
      );
      return { idDatSan: result.insertId, ...bookingData };
    } catch (error) {
      throw new Error(`Lỗi tạo đặt sân: ${error.message}`);
    }
  }
}

module.exports = BookingModel;