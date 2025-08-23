import createError from "http-errors";
import { createAccessToken, createRefreshToken } from "../helpers/authToken.helper";

// create refresh and access token
export async function responseToken(email) {
    const accessToken = await createAccessToken(email);
    if (!accessToken) {
        throw createError.BadRequest("Bạn không thể tạo access token");
    }
    const refreshToken = await createRefreshToken(email);
    if (!refreshToken) {
        throw createError.BadRequest("Bạn không thể tạo refresh token");
    }
    return { refreshToken, accessToken };
}
