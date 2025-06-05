const FieldModel = require('../models/fieldModel');

exports.getAllFields = async (req, res) => {
  try {
    const fields = await FieldModel.getAllFields();
    res.status(200).json(fields);
  } catch (error) {
    console.error('Lỗi lấy danh sách sân:', error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.getFieldById = async (req, res) => {
  try {
    const { id } = req.params;
    const field = await FieldModel.getFieldById(id);
    if (!field) {
      return res.status(404).json({ message: 'Sân không tồn tại' });
    }
    res.status(200).json(field);
  } catch (error) {
    console.error('Lỗi lấy thông tin sân theo ID:', error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.createField = async (req, res) => {
  try {
    const { tenSan, loaiSan, diaChi, khungGio, giaSan, trangThai } = req.body;
    if (!tenSan || !loaiSan || !diaChi || !giaSan || !trangThai) {
      return res.status(400).json({ message: 'Thiếu trường bắt buộc' });
    }
    const newField = await FieldModel.createField({ tenSan, loaiSan, diaChi, khungGio, giaSan, trangThai });
    res.status(201).json(newField);
  } catch (error) {
    console.error('Lỗi tạo sân:', error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.updateField = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenSan, loaiSan, diaChi, khungGio, giaSan, trangThai } = req.body;
    if (!tenSan || !loaiSan || !diaChi || !giaSan || !trangThai) {
      return res.status(400).json({ message: 'Thiếu trường bắt buộc' });
    }
    const updatedField = await FieldModel.updateField(id, { tenSan, loaiSan, diaChi, khungGio, giaSan, trangThai });
    res.status(200).json(updatedField);
  } catch (error) {
    console.error('Lỗi cập nhật sân:', error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteField = async (req, res) => {
  try {
    const { id } = req.params;
    await FieldModel.deleteField(id);
    res.status(200).json({ message: 'Sân đã được xóa thành công' });
  } catch (error) {
    console.error('Lỗi xóa sân:', error.message);
    res.status(500).json({ message: error.message });
  }
};