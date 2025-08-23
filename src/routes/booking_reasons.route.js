import express from 'express';
const bookingReasonsRouter = express.Router();
import { bookingReasonsController } from '../controllers/booking_reasons.controller';
import { verifyAccessToken } from '../helpers/authToken.helper';

bookingReasonsRouter.get('/:reasonId', bookingReasonsController.getBookingReasonById);
bookingReasonsRouter.delete('/:reasonId', verifyAccessToken, bookingReasonsController.deleteBookingReason);
bookingReasonsRouter.patch('/:reasonId', verifyAccessToken, bookingReasonsController.updateBookingReason);
bookingReasonsRouter.get('/', bookingReasonsController.getAllBookingReasons);
bookingReasonsRouter.post('/', verifyAccessToken, bookingReasonsController.addBookingReason);

export { bookingReasonsRouter }
