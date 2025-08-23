import jwt from "jsonwebtoken";

/**
 * Verify token
 */
export const verifyToken = (req, res, next) => {
    const tokenSecret = process.env.TOKEN_SECRET;
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const accessToken = bearerToken[1];
    if(!accessToken) {
        return next(createError.Unauthorized());
    }
    // start verify token
    jwt.verify(accessToken, tokenSecret, (err, payload) => {
        if(err) {
            if(err.code === 'JsonWebTokenError') {
                return next(createError.Unauthorized());
            }
            return next(createError.Unauthorized(err.message));
        };
        req.payload = payload;
        next();
    })
}