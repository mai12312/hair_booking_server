import { queryArgument } from "../models";

export const getAllServices = async ({
    limit = 10,
    offset = 0,
    sortBy = 'created_at',
    order = 'asc'
}) => {
    const sql = "select * from services order by ? ? limit ? offset ?";
    const result = await queryArgument(sql, sortBy, order, limit, offset);
    return result;
}

export const getServiceById = async (serviceId) => {
    const sql = "select * from services where id = ?";
    const result = await queryArgument(sql, serviceId);
    return result[0];
}

export const addService = async (data) => {
    const sql = `insert into services 
        (name, admin_id, category_id, status, image, duration, price, description) 
        values (?, ?, ?, ?, ?, ?, ?, ?)`;
    const result = await queryArgument(
        sql,
        data.name,
        data.admin_id,
        data.category_id,
        data.status,
        data.image,
        data.duration,
        data.price,
        data.description
    );
    return result.insertId;
}

export const updateService = async (serviceId, data) => {
    const sql = `update services set 
        name = ?, admin_id = ?, category_id = ?, status = ?, image = ?, duration = ?, price = ?, description = ?
        where id = ?`;
    const result = await queryArgument(
        sql,
        data.name,
        data.admin_id,
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
