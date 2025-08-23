import { queryArgument } from "../models";

export const getAllCustomers = async ({
    limit = 10,
    offset = 0,
    sortBy = 'created_at',
    order = 'asc'
}) => {
    const sql = "select * from customers order by ? ? limit ? offset ?";
    return await queryArgument(sql, sortBy, order, limit, offset);
}
export const getCustomerById = async (customerId) => {
    const sql = "select * from customers where id = ?";
    const result = await queryArgument(sql, customerId);
    return result[0];
}
export const addCustomer = async (data) => {
    const sql = "insert into customers (email, phone, name) values (?, ?, ?)";
    const result = await queryArgument(sql, data.email, data.phone, data.name);
    return result.insertId;
}
export const updateCustomer = async (customerId, data) => {
    const sql = "update customers set email = ?, phone = ?, name = ? where id = ?";
    const result = await queryArgument(sql, data.email, data.phone, data.name, customerId);
    return result.affectedRows > 0;
}
export const deleteCustomer = async (customerId) => {
    const sql = "delete from customers where id = ?";
    const result = await queryArgument(sql, customerId);
    return result.affectedRows > 0;
}
