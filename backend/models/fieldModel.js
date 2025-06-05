const pool = require('../config/db');

class FieldModel {
  static async getAllFields() {
    try {
      const [rows] = await pool.query('SELECT * FROM sanbong WHERE idChusan = ?', [process.env.DEFAULT_OWNER_ID]);
      return rows;
    } catch (error) {
      throw new Error(`Lỗi lấy danh sách sân: ${error.message}`);
    }
  }

  static async getFieldById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM sanbong WHERE idSan = ? AND idChusan = ?', [id, process.env.DEFAULT_OWNER_ID]);
      return rows[0];
    } catch (error) {
      throw new Error(`Lỗi lấy thông tin sân theo ID: ${error.message}`);
    }
  }

  static async createField(fieldData) {
    try {
      const { tenSan, loaiSan, diaChi, khungGio, giaSan, trangThai } = fieldData;
      const [result] = await pool.query(
        'INSERT INTO sanbong (tenSan, loaiSan, diaChi, khungGio, giaSan, trangThai, idChusan) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [tenSan, loaiSan, diaChi, khungGio, giaSan, trangThai, process.env.DEFAULT_OWNER_ID]
      );
      return { idSan: result.insertId, ...fieldData, idChusan: process.env.DEFAULT_OWNER_ID };
    } catch (error) {
      throw new Error(`Lỗi tạo sân: ${error.message}`);
    }
  }

  static async updateField(id, fieldData) {
    try {
      const { tenSan, loaiSan, diaChi, khungGio, giaSan, trangThai } = fieldData;
      const [result] = await pool.query(
        'UPDATE sanbong SET tenSan = ?, loaiSan = ?, diaChi = ?, khungGio = ?, giaSan = ?, trangThai = ? WHERE idSan = ? AND idChusan = ?',
        [tenSan, loaiSan, diaChi, khungGio, giaSan, trangThai, id, process.env.DEFAULT_OWNER_ID]
      );
      if (result.affectedRows === 0) {
        throw new Error('Sân không tồn tại hoặc không được phép');
      }
      return { idSan: id, ...fieldData, idChusan: process.env.DEFAULT_OWNER_ID };
    } catch (error) {
      throw new Error(`Lỗi cập nhật sân: ${error.message}`);
    }
  }

  static async deleteField(id) {
    try {
      const [result] = await pool.query('DELETE FROM sanbong WHERE idSan = ? AND idChusan = ?', [id, process.env.DEFAULT_OWNER_ID]);
      if (result.affectedRows === 0) {
        throw new Error('Sân không tồn tại hoặc không được phép');
      }
    } catch (error) {
      throw new Error(`Lỗi xóa sân: ${error.message}`);
    }
  }
}

module.exports = FieldModel;