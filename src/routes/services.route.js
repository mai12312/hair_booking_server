import express from 'express';
const servicesRouter = express.Router();
import { servicesController } from '../controllers/services.controller';
import { verifyAccessToken } from '../helpers/authToken.helper';

servicesRouter.get('/:serviceId', servicesController.getServiceById); // get one
servicesRouter.delete('/:serviceId', verifyAccessToken, servicesController.deleteService); // delete one
servicesRouter.patch('/:serviceId', verifyAccessToken, servicesController.updateService); // update
servicesRouter.get('/', servicesController.getAllServices); // get all
servicesRouter.post('/', verifyAccessToken, servicesController.addService); // create new

export {
    servicesRouter
}