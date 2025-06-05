const pool = require('../config/db');

class PaymentModel {
  static async createPayment(paymentData) {
    try {
      const { idDatSan, soTien, phuongThuc, thoigianThanhToan } = paymentData;
      const [result] = await pool.query(
        'INSERT INTO thanhtoan (idDatSan, soTien, phuongThuc, thoigianThanhToan) VALUES (?, ?, ?, ?)',
        [idDatSan, soTien, phuongThuc, thoigianThanhToan]
      );
      return { idThanhToan: result.insertId, ...paymentData };
    } catch (error) {
      throw new Error(`Lỗi tạo thanh toán: ${error.message}`);
    }
  }

  static async getPaymentsByCustomer(customerId) {
    try {
      const [rows] = await pool.query(
        'SELECT tt.*, ds.thoigianBatDau, ds.thoigianKetThuc, sb.tenSan FROM thanhtoan tt ' +
        'JOIN datsan ds ON tt.idDatSan = ds.idDatSan ' +
        'JOIN sanbong sb ON ds.idSan = sb.idSan ' +
        'WHERE ds.idKhachHang = ?',
        [customerId]
      );
      return rows;
    } catch (error) {
      throw new Error(`Lỗi lấy danh sách thanh toán: ${error.message}`);
    }
  }
}

module.exports = PaymentModel;