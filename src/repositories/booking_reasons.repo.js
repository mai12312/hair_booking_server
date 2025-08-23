import { queryArgument } from "../models";

export const getAllBookingReasons = async ({
    limit = 10,
    offset = 0,
    sortBy = 'created_at',
    order = 'asc'
}) => {
    const sql = "select * from booking_reasons order by ? ? limit ? offset ?";
    return await queryArgument(sql, sortBy, order, limit, offset);
}
export const getBookingReasonById = async (reasonId) => {
    const sql = "select * from booking_reasons where id = ?";
    const result = await queryArgument(sql, reasonId);
    return result[0];
}
export const addBookingReason = async (data) => {
    const sql = "insert into booking_reasons (booking_id, reason) values (?, ?)";
    const result = await queryArgument(sql, data.booking_id, data.reason);
    return result.insertId;
}
export const updateBookingReason = async (reasonId, data) => {
    const sql = "update booking_reasons set booking_id = ?, reason = ? where id = ?";
    const result = await queryArgument(sql, data.booking_id, data.reason, reasonId);
    return result.affectedRows > 0;
}
export const deleteBookingReason = async (reasonId) => {
    const sql = "delete from booking_reasons where id = ?";
    const result = await queryArgument(sql, reasonId);
    return result.affectedRows > 0;
}
