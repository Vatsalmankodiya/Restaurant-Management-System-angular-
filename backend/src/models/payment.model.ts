import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  userId: { type: String, required: true }, // ✅ Include userId
  cardNumber: { type: String, required: true },
  expiry: { type: String, required: true },
  cvv: { type: String, required: true },
  paymentId: { type: String, required: true }
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
