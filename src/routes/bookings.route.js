import express from 'express';
const bookingsRouter = express.Router();
import { bookingsController } from '../controllers/bookings.controller';
import { verifyAccessTokenMiddleware } from '../middlewares/verifyToken.middleware';

bookingsRouter.get('/:bookingId', bookingsController.getBookingById);
bookingsRouter.delete('/:bookingId', verifyAccessTokenMiddleware, bookingsController.deleteBooking);
bookingsRouter.patch('/:bookingId', verifyAccessTokenMiddleware, bookingsController.updateBooking);
bookingsRouter.get('/', bookingsController.getAllBookings);
bookingsRouter.post('/', bookingsController.addBooking);

export { bookingsRouter }
