import jwt from "jsonwebtoken";
import createError from "http-errors";

/**
 * function to verify access token
 */

export const verifyAccessTokenMiddleware = (req, res, next) => {
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
