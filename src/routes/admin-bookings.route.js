import express from 'express';
const adminBookingsRouter = express.Router();
import { bookingsController } from '../controllers/bookings.controller';
import { verifyAccessTokenMiddleware } from '../middlewares/verifyToken.middleware';

adminBookingsRouter.get('/', verifyAccessTokenMiddleware, bookingsController.getAllBookings);
adminBookingsRouter.delete('/:bookingId', verifyAccessTokenMiddleware, bookingsController.deleteBooking);
adminBookingsRouter.get('/export', bookingsController.exportBookings);

export { adminBookingsRouter }