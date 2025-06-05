const OwnerModel = require('../models/ownerModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const owner = await OwnerModel.findByEmail(email);
    if (!owner) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, owner.matKhau);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: owner.idChusan, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, owner: { id: owner.idChusan, email: owner.email, name: owner.tenChusan } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};