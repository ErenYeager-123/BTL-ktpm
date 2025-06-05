const PaymentModel = require('../models/paymentModel');

exports.createPayment = async (req, res) => {
  try {
    const { idDatSan, soTien, phuongThuc } = req.body;
    const thoigianThanhToan = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const paymentData = { idDatSan, soTien, phuongThuc, thoigianThanhToan };
    const newPayment = await PaymentModel.createPayment(paymentData);
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const customerId = req.user.id;
    const payments = await PaymentModel.getPaymentsByCustomer(customerId);
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};