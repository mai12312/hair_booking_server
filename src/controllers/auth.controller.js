"use strict";
import { verifyAccessToken } from "../helpers/authToken.helper";
import { mapAdminInfo } from "../helpers/mapAdminInfo";
import { authService } from "../services/auth.service";

class AuthController {
    /**
     * Route: auth/me
     * method: GET
     */
    async getMe(req, res, next) {
        try {
            const authHeader = req.headers['authorization'];
            const payload = verifyAccessToken(authHeader);
            const admin = await authService.getAdminByEmail(payload.email ?? "");
            res.json({
                status: 200,
                message: 'ok',
                datas: mapAdminInfo(admin)
            })
        } catch (error) {
            next(error);
        }
    }
    /**
     * Route: auth/signin
     * method: POST
     */
    async signIn(req, res, next) {
        try {
            const { email, password } = req.body;
            const { accessToken } = await authService.signIn(email, password);
            const admin = await authService.getAdminByEmail(email ?? "");
            res.setHeader('Authorization', 'Bearer' + ' ' + accessToken);
            res.status(201).json({
                status: 201,
                message: 'ok',
                datas: {
                    accessToken,
                    admin: mapAdminInfo(admin)
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
            const authHeader = req.headers['authorization'];
            const payload = verifyAccessToken(authHeader);
            await authService.logOut({email: payload.email});
            
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