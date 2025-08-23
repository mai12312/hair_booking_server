import express from 'express';
const bookingDetailsRouter = express.Router();
import { bookingDetailsController } from '../controllers/booking_details.controller';
import { verifyAccessToken } from '../helpers/authToken.helper';

bookingDetailsRouter.get('/:detailId', bookingDetailsController.getBookingDetailById);
bookingDetailsRouter.delete('/:detailId', verifyAccessToken, bookingDetailsController.deleteBookingDetail);
bookingDetailsRouter.patch('/:detailId', verifyAccessToken, bookingDetailsController.updateBookingDetail);
bookingDetailsRouter.get('/', bookingDetailsController.getAllBookingDetails);
bookingDetailsRouter.post('/', verifyAccessToken, bookingDetailsController.addBookingDetail);

export { bookingDetailsRouter }
