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
export const addCategory = async ({
    name,
    adminId,
    displayOrder = 9999,
    status = '0'
}) => {
    const sql = "insert into categories (name, admin_id, display_order, status) values (?, ?, ?, ?)";
    const result = await queryArgument(sql, name, adminId, displayOrder, status);
    return result.insertId;
}
export const updateCategory = async ({
    categoryId,
    data
}) => {
    const sql = "update categories set name = ?, display_order = ?, status = ? where id = ?";
    const result = await queryArgument(sql, data.name, data.displayOrder, data.status, categoryId);
    return result.affectedRows > 0;
}
export const deleteCategory = async (categoryId) => {
    const sql = "delete from categories where id = ?";
    const result = await queryArgument(sql, categoryId);
    return result.affectedRows > 0;
}
