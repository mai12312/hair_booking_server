import express from 'express';
const servicesRouter = express.Router();
import { servicesController } from '../controllers/services.controller';
import { verifyAccessTokenMiddleware } from '../middlewares/verifyToken.middleware';

servicesRouter.get('/:serviceId', servicesController.getServiceById); // get one
servicesRouter.delete('/:serviceId', verifyAccessTokenMiddleware, servicesController.deleteService); // delete one
servicesRouter.patch('/:serviceId', verifyAccessTokenMiddleware, servicesController.updateService); // update
servicesRouter.get('/', servicesController.getAllServices); // get all
servicesRouter.get('/:serviceId/booking-details', servicesController.getBookingDetailsByServiceId); // get booking detail by service id
servicesRouter.post('/', verifyAccessTokenMiddleware, servicesController.addService); // create new

export {
    servicesRouter
}