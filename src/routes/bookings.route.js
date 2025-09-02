import express from 'express';
const bookingsRouter = express.Router();
import { bookingsController } from '../controllers/bookings.controller';
import { verifyAccessTokenMiddleware } from '../middlewares/verifyToken.middleware';

bookingsRouter.get('/:bookingId', bookingsController.getBookingById);
bookingsRouter.delete('/:bookingId', bookingsController.cancelBooking);
bookingsRouter.patch('/:bookingId', verifyAccessTokenMiddleware, bookingsController.updateBooking);
bookingsRouter.get('/', verifyAccessTokenMiddleware, bookingsController.getAllBookings);
bookingsRouter.get('/user', bookingsController.getBookingCustomer);
bookingsRouter.post('/', bookingsController.addBooking);

export { bookingsRouter }