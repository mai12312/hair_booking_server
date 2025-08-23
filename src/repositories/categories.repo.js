import { queryArgument } from "../models";

export const getAllCategories = async ({
    limit = 10,
    offset = 0,
    sortBy = 'created_at',
    order = 'asc'
}) => {
    const sql = "select * from categories order by ? ? limit ? offset ?";
    const result = await queryArgument(sql, sortBy, order, limit, offset);
    return result;
}
export const getCategoryById = async (categoryId) => {
    const sql = "select * from categories where id = ?";
    const result = await queryArgument(sql, categoryId);
    return result[0];
}
export const addCategory = async (data) => {
    const sql = "insert into categories (name, admin_id) values (?, ?)";
    const result = await queryArgument(sql, data.name, data.admin_id);
    return result.insertId;
}
export const updateCategory = async (categoryId, data) => {
    const sql = "update categories set name = ?, admin_id = ? where id = ?";
    const result = await queryArgument(sql, data.name, data.admin_id, categoryId);
    return result.affectedRows > 0;
}
export const deleteCategory = async (categoryId) => {
    const sql = "delete from categories where id = ?";
    const result = await queryArgument(sql, categoryId);
    return result.affectedRows > 0;
}
