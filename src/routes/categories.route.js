
import express from 'express';
const categoriesRouter = express.Router();
import { categoriesController } from '../controllers/categories.controller';
import { verifyAccessTokenMiddleware } from '../middlewares/verifyToken.middleware';

categoriesRouter.get('/:categoryId', categoriesController.getCategoryById); // get one
categoriesRouter.delete('/:categoryId', verifyAccessTokenMiddleware, categoriesController.deleteCategory); // delete one
categoriesRouter.patch('/:categoryId', verifyAccessTokenMiddleware, categoriesController.updateCategory); //update
categoriesRouter.get('/', categoriesController.getAllCategories); // get all
categoriesRouter.post('/', verifyAccessTokenMiddleware, categoriesController.addCategory); // create new
categoriesRouter.get('/:categoryId/services', categoriesController.getServicesByCategoryId);

export {
    categoriesRouter
}