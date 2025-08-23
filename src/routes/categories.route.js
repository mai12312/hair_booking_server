
import express from 'express';
const categoriesRouter = express.Router();
import { categoriesController } from '../controllers/categories.controller';
import { verifyAccessToken } from '../helpers/authToken.helper';

categoriesRouter.get('/:categoryId', categoriesController.getCategoryById); // get one
categoriesRouter.delete('/:categoryId', verifyAccessToken, categoriesController.deleteCategory); // delete one
categoriesRouter.patch('/:categoryId', verifyAccessToken, categoriesController.updateCategory); //update
categoriesRouter.get('/', categoriesController.getAllCategories); // get all
categoriesRouter.post('/', categoriesController.addCategory); // create new

export {
    categoriesRouter
}