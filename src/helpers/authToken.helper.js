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
        jwt.sign(payload, refreshTokenSecret, options, async(err, token) => {
            if(err) reject(err);
            // await client.set(email, token, {'EX': 30 * 24 * 60 * 60});
            resolve(token);
        })
    })
}

/**
 * Verify token
 */
export const verifyAccessToken = (authHeader) => {
    if(!authHeader) {
        throw createError.Unauthorized("Bạn không có quyền truy cập");
    }
    const bearerToken = authHeader.split(' ');
    const accessToken = bearerToken[1];
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if(!accessToken) {
        throw createError.Unauthorized("Bạn không có quyền truy cập");
    }
    let payloadData; 
    // start verify token
    jwt.verify(accessToken, accessTokenSecret, (err, payload) => {
        if(err) {
            if(err.code === 'JsonWebTokenError') {
                throw createError.Unauthorized("Bạn không có quyền truy cập");
            }
            throw createError.Unauthorized(err.message);
        };
        payloadData = payload;
    })
    return payloadData;
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