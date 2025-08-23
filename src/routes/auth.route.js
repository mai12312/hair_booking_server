import express from 'express';
const authRouter = express.Router();
// import { verifyAccessToken } from '../app/middleware/auth.middleware');
import {authController} from '../controllers/auth.controller';

authRouter.post('/signin', authController.signIn);
authRouter.post('/signup', authController.signUp);
authRouter.post('/refresh-token', authController.refreshToken);
authRouter.post('/logout', authController.logOut);

export {authRouter}