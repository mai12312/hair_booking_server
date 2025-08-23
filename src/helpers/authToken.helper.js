import jwt from 'jsonwebtoken';
import createError from "http-errors";
/**
 * function to create access token
 */
export function createAccessToken(email) {
    return new Promise((resolve, reject) => {
        const payload = {
            email
        }
        const options = {
            expiresIn: 60 * 60
        }
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        console.log("accessTokenSecret: ", accessTokenSecret);
        jwt.sign(payload, accessTokenSecret, options, (err, token) => {
            if(err) reject(err)
            resolve(token)
        })
    })
}

/**
 *  function to create refresh token
 */
export function createRefreshToken(email) {
    return new Promise((resolve, reject) => {
        const payload = {
            email
        }
        const options = {
            expiresIn: 60 * 60 * 24 * 30
        }
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
        console.log("refreshTokenSecret: ", refreshTokenSecret);
        jwt.sign(payload, refreshTokenSecret, options, async(err, token) => {
            if(err) reject(err);
            // await client.set(email, token, {'EX': 30 * 24 * 60 * 60});
            resolve(token);
        })
    })
}

/**
 * function to verify access token
 */

export const verifyAccessToken = (req, res, next) => {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const accessToken = bearerToken[1];
    if(!accessToken) {
        return next(createError.Unauthorized());
    }
    // start verify token
    jwt.verify(accessToken, accessTokenSecret, (err, payload) => {
        if(err) {
            console.log("Error verifying access token:", err.code);
            if(err.code === 'JsonWebTokenError') {
                return next(createError.Unauthorized());
            }
            if(err.message === 'jwt expired') {
                console.log("Access token has expired");
            }
            return next(createError.Unauthorized(err.message));
        };
        req.payload = payload;
        next();
    })
}

/**
 * function to verify refresh token
 */

export const verifyRefreshToken = async (refreshToken) => {
    return new Promise((resolve, reject) => {
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
        jwt.verify(refreshToken, refreshTokenSecret, async(err, payload) => {
            if(err) reject(createError.Unauthorized());
            resolve(payload);
        })
    })
}