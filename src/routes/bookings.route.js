import express from 'express';
const bookingsRouter = express.Router();
import { bookingsController } from '../controllers/bookings.controller';
import { verifyAccessToken } from '../helpers/authToken.helper';

bookingsRouter.get('/:bookingId', bookingsController.getBookingById);
bookingsRouter.delete('/:bookingId', verifyAccessToken, bookingsController.deleteBooking);
bookingsRouter.patch('/:bookingId', verifyAccessToken, bookingsController.updateBooking);
bookingsRouter.get('/', bookingsController.getAllBookings);
bookingsRouter.post('/', bookingsController.addBooking);

export { bookingsRouter }
