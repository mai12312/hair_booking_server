import { generateCodeBooking } from "../helpers/generateCodeBooking.helper";
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
export const addBooking = async ({
    customerEmail,
    status,
    startTime,
    endTime,
    totalPrice = 0,
    totalDuration = 0,
    createdByAdminId = null
}) => {
    const code = await generateCodeBooking();
    const sql = "insert into bookings (customer_email, status, start_time, end_time, total_price, total_duration, created_by_admin_id, code) values (?, ?, ?, ?, ?, ?, ?, ?)";
    const result = await queryArgument(sql, customerEmail, status, startTime, endTime, totalPrice, totalDuration, createdByAdminId, code);
    return result.insertId;
}
export const updateBooking = async (bookingId, {
    customerEmail,
    status,
    startTime,
    endTime,
    totalPrice,
    totalDuration
}) => {
    const sql = "update bookings set customer_email = ?, status = ?, start_time = ?, end_time = ?, total_price = ?, total_duration = ?, updated_at = ? where id = ?";
    const result = await queryArgument(sql, customerEmail, status, startTime, endTime, totalPrice, totalDuration, new Date(), bookingId);
    return result.affectedRows > 0;
}
export const deleteBooking = async (bookingId) => {
    const sql = "delete from bookings where id = ?";
    const result = await queryArgument(sql, bookingId);
    return result.affectedRows > 0;
}
