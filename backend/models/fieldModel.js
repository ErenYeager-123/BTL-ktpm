const db = require('../config/db');

module.exports.getAllFields = async (idChusan) => {
  const query = `
    SELECT f.id, f.tenSan, ft.tenLoaiSan, f.diaChi, f.khungGio, f.giaSan, f.trangThai
    FROM fields f
    JOIN field_types ft ON f.loaiSan = ft.id
    WHERE f.idChusan = ?;
  `;
  const [rows] = await db.execute(query, [idChusan]);
  return rows;
};

module.exports.getFieldById = async (id, idChusan) => {
  const query = `
    SELECT f.id, f.tenSan, ft.tenLoaiSan, f.diaChi, f.khungGio, f.giaSan, f.trangThai
    FROM fields f
    JOIN field_types ft ON f.loaiSan = ft.id
    WHERE f.id = ? AND f.idChusan = ?;
  `;
  const [rows] = await db.execute(query, [id, idChusan]);
  return rows.length > 0 ? rows[0] : null;
};

module.exports.createField = async ({ tenSan, loaiSan, diaChi, khungGio, giaSan, trangThai, idChusan }) => {
  const query = `
    INSERT INTO fields (tenSan, loaiSan, diaChi, khungGio, giaSan, trangThai, idChusan)
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `;
  const [result] = await db.execute(query, [tenSan, loaiSan, diaChi, khungGio, giaSan, trangThai, idChusan]);
  return { id: result.insertId, tenSan, loaiSan, diaChi, khungGio, giaSan, trangThai };
};

module.exports.updateField = async (id, { tenSan, loaiSan, diaChi, khungGio, giaSan, trangThai }, idChusan) => {
  const checkQuery = `
    SELECT id FROM fields WHERE id = ? AND idChusan = ?;
  `;
  const [rows] = await db.execute(checkQuery, [id, idChusan]);
  if (rows.length === 0) {
    return null; // Sân không tồn tại hoặc không thuộc chủ sân
  }

  const updateQuery = `
    UPDATE fields
    SET tenSan = ?, loaiSan = ?, diaChi = ?, khungGio = ?, giaSan = ?, trangThai = ?
    WHERE id = ?;
  `;
  await db.execute(updateQuery, [tenSan, loaiSan, diaChi, khungGio, giaSan, trangThai, id]);
  return { id, tenSan, loaiSan, diaChi, khungGio, giaSan, trangThai };
};

module.exports.deleteField = async (id, idChusan) => {
  const checkQuery = `
    SELECT id FROM fields WHERE id = ? AND idChusan = ?;
  `;
  const [rows] = await db.execute(checkQuery, [id, idChusan]);
  if (rows.length === 0) {
    return false; // Sân không tồn tại hoặc không thuộc chủ sân
  }

  const deleteQuery = `DELETE FROM fields WHERE id = ?;`;
  await db.execute(deleteQuery, [id]);
  return true;
};

module.exports.getAllFieldsPublic = async () => {
  const query = `
    SELECT f.id, f.tenSan, ft.tenLoaiSan, f.diaChi, f.khungGio, f.giaSan, f.trangThai
    FROM fields f
    JOIN field_types ft ON f.loaiSan = ft.id;
  `;
  const [rows] = await db.execute(query);
  return rows;
};

module.exports.getFieldByIdPublic = async (id) => {
  const query = `
    SELECT f.id, f.tenSan, ft.tenLoaiSan, f.diaChi, f.khungGio, f.giaSan, f.trangThai
    FROM fields f
    JOIN field_types ft ON f.loaiSan = ft.id
    WHERE f.id = ?;
  `;
  const [rows] = await db.execute(query, [id]);
  return rows.length > 0 ? rows[0] : null;
};
