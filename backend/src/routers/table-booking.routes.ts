import { Router } from 'express';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { TableBookingModel } from '../models/table-booking.model';
import { HTTP_BAD_REQUEST } from '../constants/http_status';

const router = Router();

router.post(
  '/book',
  asyncHandler(async (req, res) => {
    const { name, phoneNumber, email, persons, date, userId } = req.body; // Receive userId from the request

    if (!name || !phoneNumber || !email || !persons || !date) {
      res.status(HTTP_BAD_REQUEST).send('Please fill all the required fields.');
      return;
    }

    try {
      const newBooking = await TableBookingModel.create({
        name,
        phoneNumber,
        email,
        persons,
        date: new Date(date),
        userId: userId, // Use the userId from req.body
      });

      res.status(201).json({ message: 'Table booked successfully!', booking: newBooking });
    } catch (error) {
      console.error('Error creating table booking:', error);
      res.status(500).send({ message: 'Failed to book table. Please try again later.' });
    }
  })
);

router.get(
  '/history',
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.query.userId as string;

    if (!userId) {
      res.status(400).send({ message: 'Missing userId' });
      return;
    }

    const bookings = await TableBookingModel.find({ userId: userId });

    res.status(200).send({
      message: 'Booking history fetched successfully',
      bookings,
    });
  })
);
  // Get all bookings - Admin use
router.get(
  '/admin/bookings',
  asyncHandler(async (_req: Request, res: Response) => {
    try {
      const allBookings = await TableBookingModel.find().sort({ createdAt: -1 });
      res.status(200).send({
        message: 'All bookings fetched successfully',
        bookings: allBookings,
      });
    } catch (error) {
      console.error('Error fetching all bookings:', error);
      res.status(500).send({ message: 'Failed to fetch bookings' });
    }
  })
);

  export default router;