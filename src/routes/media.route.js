import express from 'express';
import { upload } from '../middlewares/multer.middleware';
import { MediaController } from '../controllers/media.controller';

const mediaRouter = express.Router()

const mediaController = new MediaController();

mediaRouter.post('/upload', upload.single("image"), mediaController.uploadImage);
mediaRouter.get('/:filename', mediaController.getImage);
mediaRouter.get('/', mediaController.getAllImages);

export {
    mediaRouter
}