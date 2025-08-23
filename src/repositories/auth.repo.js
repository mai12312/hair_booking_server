import { queryArgument } from "../models";

export const isExistsAdmin = async( email ) => {
    const sql = "select * from admins where email = ?";
    return await queryArgument(sql, email);
}

export const createUser = async (
    fullname,
    email,
    password,
    phone,
    avatar
) => {
    const sql = "insert into admins ( fullname, email, password, phone, avatar) values(?, ?, ?, ?, ?)";
    await queryArgument(sql, fullname, email, password, phone, avatar);
}

export const updateTokenAdmin = async (refreshToken, email) => {
    const sql = "update admins set refresh_token = ? where email = ?";
    await queryArgument(sql, refreshToken, email);
}

export const checkAuthAdmin = async (email, password) => {
    const sql = "select * from admins where email = ? and password = ?";
    return await queryArgument(sql, email, password);
}

export const getRefreshToken = async (email) => {
    
    const sql = "select refresh_token from admins where email = ?";
    const result = await queryArgument(sql, email);
    return result[0]?.refresh_token;
}
export const removeRefreshToken = async (email) => {
    const sql = "update admins set refresh_token = null where email = ?";
    const result = await queryArgument(sql, email);
    return result.affectedRows > 0;
}
export const checkAccountAdminExists = async (email) => {
    const isAdmin = await isExistsAdmin(email);
    if(isAdmin.length > 0) {
        throw createError.Conflict('Tài khoản này đã tồn tại!');
    }
}