import express from 'express';
const bookingReasonsRouter = express.Router();
import { bookingReasonsController } from '../controllers/booking_reasons.controller';
import { verifyAccessTokenMiddleware } from '../middlewares/verifyToken.middleware';

bookingReasonsRouter.get('/:reasonId', bookingReasonsController.getBookingReasonById);
bookingReasonsRouter.delete('/:reasonId', verifyAccessTokenMiddleware, bookingReasonsController.deleteBookingReason);
bookingReasonsRouter.patch('/:reasonId', verifyAccessTokenMiddleware, bookingReasonsController.updateBookingReason);
bookingReasonsRouter.get('/', bookingReasonsController.getAllBookingReasons);
bookingReasonsRouter.post('/', verifyAccessTokenMiddleware, bookingReasonsController.addBookingReason);

export { bookingReasonsRouter }
