import express from 'express';
const customersRouter = express.Router();
import { customersController } from '../controllers/customers.controller';
import { verifyAccessTokenMiddleware } from '../middlewares/verifyToken.middleware';

customersRouter.get('/:customerId', customersController.getCustomerById);
customersRouter.delete('/:customerId', verifyAccessTokenMiddleware, customersController.deleteCustomer);
customersRouter.patch('/:customerId', verifyAccessTokenMiddleware, customersController.updateCustomer);
customersRouter.get('/', customersController.getAllCustomers);
customersRouter.post('/', customersController.addCustomer);

export { customersRouter }
