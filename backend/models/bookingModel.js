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

  static async getBookingsByUser(userId) {
    try {
      const [rows] = await pool.query(
        `SELECT d.*, 
                f.tenSan AS fieldName, f.diaChi AS fieldLocation, f.giaSan AS fieldPrice
         FROM datsan d
         JOIN fields f ON d.idSan = f.id
         WHERE d.idKhachHang = ?
         ORDER BY d.thoigianBatDau DESC`,
        [userId]
      );
      // Optionally map to match your frontend's expected structure
      return rows.map(row => ({
        id: row.idDatSan,
        status: row.trangThai,
        date: row.thoigianBatDau.split("T")[0],
        startTime: row.thoigianBatDau.split("T")[1]?.slice(0,5),
        endTime: row.thoigianKetThuc.split("T")[1]?.slice(0,5),
        totalPrice: row.fieldPrice, // or calculate based on duration
        field: {
          name: row.fieldName,
          location: row.fieldLocation,
          price: row.fieldPrice,
        }
      }));
    } catch (error) {
      throw new Error(`Lỗi lấy lịch sử đặt sân: ${error.message}`);
    }
  }
}

module.exports = BookingModel;