import { queryArgument } from "../models";

export const getAllBookingDetails = async ({
    limit = 10,
    offset = 0,
    sortBy = 'created_at',
    order = 'asc'
}) => {
    const sql = "select * from booking_details order by ? ? limit ? offset ?";
    return await queryArgument(sql, sortBy, order, limit, offset);
}
export const getBookingDetailById = async (detailId) => {
    const sql = "select * from booking_details where id = ?";
    const result = await queryArgument(sql, detailId);
    return result[0];
}
export const addBookingDetail = async (data) => {
    const sql = "insert into booking_details (service_id, booking_id, price, duration) values (?, ?, ?, ?)";
    const result = await queryArgument(sql, data.service_id, data.booking_id, data.price, data.duration);
    return result.insertId;
}
export const updateBookingDetail = async (detailId, data) => {
    const sql = "update booking_details set service_id = ?, booking_id = ?, price = ?, duration = ? where id = ?";
    const result = await queryArgument(sql, data.service_id, data.booking_id, data.price, data.duration, detailId);
    return result.affectedRows > 0;
}
export const deleteBookingDetail = async (detailId) => {
    const sql = "delete from booking_details where id = ?";
    const result = await queryArgument(sql, detailId);
    return result.affectedRows > 0;
}
export const getBookingDetailsByServiceId = async ({
    serviceId,
    limit = 10,
    offset = 0,
    sortBy = 'created_at',
    order = 'asc'
}) => {
    const sql = "select * from booking_details where service_id = ? order by ? ? limit ? offset ?";
    return await queryArgument(sql, serviceId, sortBy, order, limit, offset);
}