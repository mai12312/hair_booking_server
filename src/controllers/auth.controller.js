"use strict";
import { authService } from "../services/auth.service";

class AuthController {
    /**
     * Route: auth/signin
     * method: POST
     */
    async signIn(req, res, next) {
        try {
            const { email, password } = req.body;
            const { accessToken } = await authService.signIn(email, password);
            res.status(201).json({
                status: 201,
                message: 'ok',
                datas: {
                    accessToken,
                }
            })
        } catch (error) {
            next(error);
        }
    }
    /**
     * Route: auth/signup
     * method: POST
     */
    async signUp(req, res, next) {
        try {
            const { email, password, phone, fullname, avatar } = req.body;
            await authService.signUp({ email, password, phone, fullname, avatar });
            res.status(201).json({
                status: 201,
                message: 'Register is successful!',
                datas: null
            })
        } catch (error) {
            next(error);
        }
    }
    /**
     * Route: auth/refresh-token
     * method: POST
     */
    async refreshToken(req, res, next) {
        try {
            const { email, password } = req.body;
            const { accessToken } = await authService.refreshToken({email, password});
            res.status(301).json({
                status: 301,
                message: 'ok',
                datas: {
                    accessToken
                }
            })
        } catch (error) {
            next(error);
        }
    }

    /**
     * Route: auth/logout
     * method: POST
     */
    async logOut(req, res, next) {
        try {
            const { email, password } = req.body;
            await authService.logOut({email, password});
            res.json({
                status: 204,
                message: 'Logout ok!',
                datas: null
            })
        } catch (error) {
            next(error);
        }
    }
}
export const authController = new AuthController();