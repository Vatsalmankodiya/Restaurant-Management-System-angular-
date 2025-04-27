import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import { OrderStatus } from '../constants/order_status';
import { OrderModel } from '../models/order.model';
import auth from '../middlewares/auth.mid';

const router = Router();
router.use(auth);

// POST /create - Create a new order
router.post('/create',
    asyncHandler(async (req: any, res: any) => {
        const requestOrder = req.body;

        // Ensure the cart is not empty
        if (requestOrder.items.length <= 0) {
            res.status(HTTP_BAD_REQUEST).send('Cart Is Empty!');
            return;
        }

        // Delete any existing new order for the current user (this could be part of an order update workflow)
        await OrderModel.deleteOne({
            user: req.user.id,
            status: OrderStatus.NEW
        });

        // Create a new order with the user ID attached
        const newOrder = new OrderModel({ ...requestOrder, user: req.user.id });
        await newOrder.save();

        // Return the new order as the response
        res.send(newOrder);
    })
);

// Route to handle payment (existing)
router.post('/pay', asyncHandler(async (req: any, res: any) => {
    const { paymentId } = req.body;

    if (!paymentId) {
        return res.status(HTTP_BAD_REQUEST).send('Payment ID is required');
    }

    const order = await getNewOrderForCurrentUser(req);
    if (!order) {
        return res.status(HTTP_BAD_REQUEST).send('Order not found!');
    }

    console.log('Payment ID:', paymentId);  // Debug log
    console.log('Order:', order);  // Debug log

    // Update order with payment details and status
    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;  // Ensure this is the correct enum value
    await order.save();

    res.send({
        orderId: order._id,
        status: order.status,
        paymentId: order.paymentId,
        message: 'Payment processed successfully'
    });
}));

// Route to handle payment with specific orderId
// POST /pay/:orderId - Handle payment for a specific order
router.post('/pay/:orderId', asyncHandler(async (req: any, res: any) => {
    const { orderId } = req.params; // Get the orderId from the URL parameter
    const { cardNumber, expiry, cvv } = req.body; // Payment details sent from frontend

    try {
        // Fetch the order from the database using the orderId
        const order = await OrderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the user making the payment is the same user who created the order
        if (order.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized action: You cannot pay for this order' });
        }

        // Simulate processing the payment with card details (you can integrate with a payment service here)
        // Here you would use a payment service API to actually process the payment

        // Update the order with payment details and status
        order.paymentId = `PAYMENT-${new Date().getTime()}`;  // Simulated payment ID, replace with real one
        order.status = OrderStatus.PAYED; // Mark the order as paid
        await order.save(); // Save the updated order in the database

        // Send success response
        return res.status(200).json({
            message: 'Payment processed successfully',
            orderId: order._id,
            status: order.status,
            paymentId: order.paymentId,
        });
    } catch (error) {
        console.error('Error processing payment:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));
router.get(
    '/user/orders',
    asyncHandler(async (req: any, res) => {
        try {
            const userId = req.user.id; // User ID from the authentication middleware
            const orders = await OrderModel.find({ userId }).sort({ createdAt: -1 }); // Find all orders for the user, sorted by creation date (newest first)
            res.send(orders);
        } catch (error) {
            console.error('Error fetching user orders:', error);
            res.status(500).send({ message: 'Failed to fetch order history' });
        }
    })
);

// GET /admin/orders - Get all orders (admin only)
router.get('/admin/orders', asyncHandler(async (req: any, res) => {
    try {
      const orders = await OrderModel.find().sort({ createdAt: -1 });
      res.send(orders);
    } catch (error) {
      console.error('Error fetching all orders:', error);
      res.status(500).send({ message: 'Failed to fetch orders for admin' });
    }
  }));


router.get('/newOrderForCurrentUser', asyncHandler(async (req: any, res) => {
    const order = await getNewOrderForCurrentUser(req);
    if (order) res.send(order);
    else res.status(HTTP_BAD_REQUEST).send();
}));

router.get('/track/:id', asyncHandler(async (req, res): Promise<void> => {
    const order = await OrderModel.findById(req.params.id);
    if (!order) {
        res.status(404).send({ message: 'Order not found' });
        return;
    }
    res.send(order);
}));


export default router;

async function getNewOrderForCurrentUser(req: any) {
    return await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW });
}
