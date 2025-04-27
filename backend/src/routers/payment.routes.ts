import express from 'express';
import asyncHandler from 'express-async-handler';
import Payment from '../models/payment.model';

const router = express.Router();

// @route POST /api/payments
// @desc  Save a payment
router.post(
    '/',
    asyncHandler(async (req, res) => {
      // console.log('💥 Payment route hit!', req.body); // <--- Add this line
  
      const { orderId, cardNumber, expiry, cvv, paymentId, userId } = req.body;

if (!orderId || !cardNumber || !expiry || !cvv || !paymentId || !userId) {
  res.status(400).json({ message: 'All fields are required' });
  return;
}

const payment = await Payment.create({
  orderId,
  userId,  // ✅ Save userId to the DB
  cardNumber,
  expiry,
  cvv,
  paymentId,
});
  
      res.status(201).json(payment);
    })
  );
    
export default router;
