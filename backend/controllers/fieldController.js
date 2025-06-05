const FieldModel = require('../models/fieldModel');

exports.getAllFields = async (req, res) => {
  try {
    const idChusan = req.user.id;
    const fields = await FieldModel.getAllFields(idChusan);
    res.status(200).json(fields);
  } catch (error) {
    console.error('Lỗi lấy danh sách sân:', error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.getFieldById = async (req, res) => {
  try {
    const { id } = req.params;
    const idChusan = req.user.id;
    const field = await FieldModel.get
FieldById(id, idChusan);
    if (!field) {
      return res.status(404).json({ message: 'Sân không tồn tại hoặc không thuộc chủ sân' });
    }
    res.status(200).json(field);
  } catch (error) {
    console.error('Lỗi lấy thông眨 tin sân theo ID:', error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.createField = async (req, res) => {
  try {
    const { tenSan, loaiSan, diaChi, khungGio, giaSan, trangThai } = req.body;
    const idChusan = req.user.id;
    if (!tenSan || !loaiSan || !diaChi || !giaSan || !trangThai) {
      return res.status(400).json({ message: 'Thiếu trường bắt buộc' });
    }
    const newField = await FieldModel.createField({ tenSan, loaiSan, diaChi, khungGio, giaSan, trangThai, idChusan });
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
    const idChusan = req.user.id;
    if (!tenSan || !loaiSan || !diaChi || !giaSan || !trangThai) {
      return res.status(400).json({ message: 'Thiếu trường bắt buộc' });
    }
    const updatedField = await FieldModel.updateField(id, { tenSan, loaiSan, diaChi, khungGio, giaSan, trangThai }, idChusan);
    if (!updatedField) {
      return res.status(404).json({ message: 'Sân không tồn tại hoặc không thuộc chủ sân' });
    }
    res.status(200).json(updatedField);
  } catch (error) {
    console.error('Lỗi cập nhật sân:', error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteField = async (req, res) => {
  try {
    const { id } = req.params;
    const idChusan = req.user.id;
    const deleted = await FieldModel.deleteField(id, idChusan);
    if (!deleted) {
      return res.status(404).json({ message: 'Sân không tồn tại hoặc không thuộc chủ sân' });
    }
    res.status(200).json({ message: 'Sân đã được xóa thành công' });
  } catch (error) {
    console.error('Lỗi xóa sân:', error.message);
    res.status(500).json({ message: error.message });
  }
};
