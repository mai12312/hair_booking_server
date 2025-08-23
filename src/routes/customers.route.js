import express from 'express';
const customersRouter = express.Router();
import { customersController } from '../controllers/customers.controller';
import { verifyAccessToken } from '../helpers/authToken.helper';

customersRouter.get('/:customerId', customersController.getCustomerById);
customersRouter.delete('/:customerId', verifyAccessToken, customersController.deleteCustomer);
customersRouter.patch('/:customerId', verifyAccessToken, customersController.updateCustomer);
customersRouter.get('/', customersController.getAllCustomers);
customersRouter.post('/', customersController.addCustomer);

export { customersRouter }
