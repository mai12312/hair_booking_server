import { queryArgument } from "../models";

export const getAllServices = async ({
    limit,
    offset,
    sortBy,
    order
}) => {
    const sql = "select * from services order BY ? ? LIMIT ? OFFSET ?";
    const result = await queryArgument(sql, sortBy, order, limit, offset);
    return result;
}

export const getServiceById = async (serviceId) => {
    const sql = "select * from services where id = ?";
    const result = await queryArgument(sql, serviceId);
    return result[0];
}

export const addService = async ({
    name,
    adminId,
    categoryId,
    status,
    image,
    duration,
    price,
    description
}) => {
    const sql = `insert into services 
        (name, admin_id, category_id, status, image, duration, price, description) 
        values (?, ?, ?, ?, ?, ?, ?, ?)`;
    const result = await queryArgument(
        sql,
        name,
        adminId,
        categoryId,
        status,
        image,
        duration,
        price,
        description
    );
    return result.insertId;
}

export const updateService = async (serviceId, data) => {
    const sql = `update services set 
        name = ?, category_id = ?, status = ?, image = ?, duration = ?, price = ?, description = ?
        where id = ?`;
    const result = await queryArgument(
        sql,
        data.name,
        data.category_id,
        data.status,
        data.image,
        data.duration,
        data.price,
        data.description,
        serviceId
    );
    return result.affectedRows > 0;
}

export const deleteService = async (serviceId) => {
    const sql = "delete from services where id = ?";
    const result = await queryArgument(sql, serviceId);
    return result.affectedRows > 0;
}

export const getServicesByCategoryId = async ({
    categoryId,
    limit,
    offset,
    sortBy,
    order
}) => {
    const sql = "select * from services where category_id = ? order by ? ? limit ? offset ?";
    const result = await queryArgument(sql, categoryId, sortBy, order, limit, offset);
    return result;
}

export async function countServicesByCategoryId(categoryId) {
    const sql = "select count(*) as total from services where category_id = ?";
    const result = await queryArgument(sql, categoryId);
    return result[0].total;
}