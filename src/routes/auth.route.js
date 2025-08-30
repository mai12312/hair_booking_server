import express from 'express';
const authRouter = express.Router();
import {authController} from '../controllers/auth.controller';
import { verifyAccessTokenMiddleware } from '../middlewares/verifyToken.middleware';

authRouter.get('/me', verifyAccessTokenMiddleware, authController.getMe);
authRouter.post('/signin', authController.signIn);
authRouter.post('/signup', authController.signUp);
authRouter.post('/refresh-token', authController.refreshToken);
authRouter.delete('/logout', verifyAccessTokenMiddleware, authController.logOut);

export {authRouter}