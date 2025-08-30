import express from 'express';
const bookingDetailsRouter = express.Router();
import { bookingDetailsController } from '../controllers/booking_details.controller';
import { verifyAccessTokenMiddleware } from '../middlewares/verifyToken.middleware';

bookingDetailsRouter.get('/:detailId', bookingDetailsController.getBookingDetailById);
bookingDetailsRouter.delete('/:detailId', verifyAccessTokenMiddleware, bookingDetailsController.deleteBookingDetail);
bookingDetailsRouter.patch('/:detailId', verifyAccessTokenMiddleware, bookingDetailsController.updateBookingDetail);
bookingDetailsRouter.get('/', bookingDetailsController.getAllBookingDetails);
bookingDetailsRouter.post('/', verifyAccessTokenMiddleware, bookingDetailsController.addBookingDetail);

export { bookingDetailsRouter }
