import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import express from "express";
import cors from "cors";
import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';
import { dbConnect } from './configs/database.config';
import orderRouter from './routers/order.router';
import paymentRouter from './routers/payment.routes';
import feedbackRouter from './routers/feedback.routes';
import tableBookingRouter from './routers/table-booking.routes';

dbConnect();

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200", "https://<your-netlify-site>.netlify.app"]
}));

// ✅ Fix: API routes should be registered before static file handling
app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter); 
app.use('/api/payments', paymentRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/table-bookings', tableBookingRouter); 


// ✅ Fix: Move static file serving below API routes
app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server running on http://localhost:" + port);
});
