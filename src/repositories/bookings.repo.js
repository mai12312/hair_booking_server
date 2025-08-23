import { queryArgument } from "../models";

export const getAllBookings = async ({
    limit = 10,
    offset = 0,
    sortBy = 'created_at',
    order = 'asc'
}) => {
    const sql = "select * from bookings order by ? ? limit ? offset ?";
    return await queryArgument(sql, sortBy, order, limit, offset);
}
export const getBookingById = async (bookingId) => {
    const sql = "select * from bookings where id = ?";
    const result = await queryArgument(sql, bookingId);
    return result[0];
}
export const addBooking = async (data) => {
    const sql = "insert into bookings (customer_id, status, start_time, end_time, total_price, total_duration) values (?, ?, ?, ?, ?, ?)";
    const result = await queryArgument(sql, data.customer_id, data.status, data.start_time, data.end_time, data.total_price, data.total_duration);
    return result.insertId;
}
export const updateBooking = async (bookingId, data) => {
    const sql = "update bookings set customer_id = ?, status = ?, start_time = ?, end_time = ?, total_price = ?, total_duration = ? where id = ?";
    const result = await queryArgument(sql, data.customer_id, data.status, data.start_time, data.end_time, data.total_price, data.total_duration, bookingId);
    return result.affectedRows > 0;
}
export const deleteBooking = async (bookingId) => {
    const sql = "delete from bookings where id = ?";
    const result = await queryArgument(sql, bookingId);
    return result.affectedRows > 0;
}
