const BookingModel = require('../models/bookingModel');

exports.checkAvailability = async (req, res) => {
  try {
    const { fieldId, startTime, endTime } = req.body;
    const isAvailable = await BookingModel.checkAvailability(fieldId, startTime, endTime);
    res.status(200).json({ isAvailable });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { idSan, thoigianBatDau, thoigianKetThuc, trangThai } = req.body;
    const isAvailable = await BookingModel.checkAvailability(idSan, thoigianBatDau, thoigianKetThuc);
    if (!isAvailable) {
      return res.status(400).json({ message: 'Field is not available at this time' });
    }
    const bookingData = {
      idKhachHang: req.user.id,
      idSan,
      thoigianBatDau,
      thoigianKetThuc,
      trangThai
    };
    const newBooking = await BookingModel.createBooking(bookingData);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};