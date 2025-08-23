import { verifyRefreshToken } from "../helpers/authToken.helper";
import createError from "http-errors";
import { createUser, getRefreshToken, updateTokenAdmin, checkAccountAdminExists, removeRefreshToken, isExistsAdmin } from "../repositories/auth.repo";
import { validateUserSignIn, validateUserSignUp } from "../validators/user.validator";
import { responseToken } from "../utils/auth.util";
import { comparePassword, hashPassword } from "../helpers/password.helper";

class AuthService {
    /**
     * @desc sign in for admin
     * @param {string} email
     * @param {string} password
     * @returns
     */
    async signIn(email, password) {
        // Get and store data that user is typed in variables
        await validateUserSignIn.validateAsync({ email, password });
        // Hash password that user is typed to login
        const user = await isExistsAdmin(email);
        // Check if user was registered
        if(!user.length > 0) {
            throw createError.Conflict('Tài khoản không tồn tại!');
        }
        const match = await comparePassword(password, user[0].password);
        // create access token and refresh token
        if(!match) {
            throw createError.Unauthorized('Tài khoản hoặc mật khẩu không chính xác!');
        }
        const { accessToken, refreshToken } = await responseToken(email);
        // res.setHeader('Authorization', 'Bearer' + ' ' + accessToken);

        // update refresh token
        await updateTokenAdmin(refreshToken, email);
        // server response headers for client
        return { accessToken };
    }
    /**
     * @desc sign up for admin
     * @param {string} email
     * @param {string} password
     * @param {string} phone
     * @param {string} fullname
     * @param {string} avatar
     * @returns
     */
    async signUp({ email, password, phone, fullname, avatar }) {
        // Validate data that user is typed
        await validateUserSignUp.validateAsync({
            email,
            password
        });

        // Check account before insert into database
        await checkAccountAdminExists(email);

        // // Hash password that user is typed to login
        const hashPass = await hashPassword(password);

        // // create new user
        await createUser(
            fullname,
            email,
            hashPass,
            phone,
            avatar
        );
    }
    /**
     * @desc refresh token for admin
     * @returns
     */
    async refreshToken({ email, password }) {
        const user = await isExistsAdmin(email);
        // Check if user was registered
        if(!user.length > 0) {
            throw createError.Conflict('Tài khoản không tồn tại!');
        }
        const match = await comparePassword(password, user[0].password);
        if(!match) {
            throw createError.Unauthorized('Tài khoản hoặc mật khẩu không chính xác!');
        }
        // Get refresh token from database
        const refresh = await getRefreshToken(email);
        if(!refresh) {
            throw createError.BadRequest("Bạn phải đăng nhập lại");
        }
        // verify the refresh token
        await verifyRefreshToken(refresh);

        // create access token and refresh token
        const { accessToken, refreshToken } = await responseToken(email);
        await updateTokenAdmin(refreshToken, email);
        // await res.setHeader('Authorization', Bearer + ' ' + accessToken);
        return { accessToken };
    }
    /**
     * @desc log out for admin
     * @param {string} email
     * @param {string} password
     * @returns
     */
    async logOut({email, password}) {
        const user = await isExistsAdmin(email);
        const match = await comparePassword(password, user[0].password);
        // create access token and refresh token
        if(!match) {
            throw createError.Unauthorized('Bạn không có quyền!');
        }
        const refresh = await getRefreshToken(email);
        if(!refresh) {
            throw createError.BadRequest("Bạn phải đăng nhập lại");
        }
        await removeRefreshToken(email);
    }
}
export const authService = new AuthService();