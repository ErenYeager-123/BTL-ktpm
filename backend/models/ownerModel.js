const pool = require('../config/db');

class OwnerModel {
  static async findByEmail(email) {
    try {
      const [rows] = await pool.query('SELECT * FROM chusan WHERE email = ?', [email]);
      return rows[0];
    } catch (error) {
      throw new Error(`Lỗi tìm chủ sân theo email: ${error.message}`);
    }
  }
}

module.exports = OwnerModel;