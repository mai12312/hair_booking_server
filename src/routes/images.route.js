import express from 'express';
import { StorageController } from '../controllers/storage.controller';
import { upload } from '../middlewares/multer.middleware';

const imageRouter = express.Router()

const storageController = new StorageController();

imageRouter.post('/upload', upload.single("thumbnail"), storageController.uploadImage);
imageRouter.get('/:filename', storageController.getImage);

export {
    imageRouter
}