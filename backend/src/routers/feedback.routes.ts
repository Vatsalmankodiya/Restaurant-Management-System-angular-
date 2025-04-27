import express from 'express';
import asyncHandler from 'express-async-handler';
import { FeedbackModel } from '../models/feedback.model';

const router = express.Router();

// POST /api/feedback
router.post('/', asyncHandler(async (req, res) => {
    try {
        const { userId, rating, comment, date } = req.body;  // Removed orderId from here

        // console.log('Received feedback:', req.body);  // Log the feedback data

        const feedback = new FeedbackModel({ userId, rating, comment, date });  // Don't include orderId
        await feedback.save();

        res.status(201).send({ message: 'Feedback submitted successfully' });
    } catch (error) {
        console.error('Error saving feedback:', error);  // Log the error
        res.status(500).send({ message: 'Server error', error });
    }
}));

  
export default router;