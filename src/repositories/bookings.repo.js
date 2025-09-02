import { formatDateTime, handleOrderByBookings } from "../helpers/booking.helper";
import { generateCodeBooking } from "../helpers/generateCodeBooking.helper";
import { queryArgument } from "../models";

export const getAllBookings = async ({
    startTime,
    endTime,
    month,
    year,
    limit = 1000,
    offset = 0,
    sortBy = 'created_at',
    order = 'desc'
} = {}) => {
    // Build SQL with optional filters
    let sql = "select * from bookings";
    const params = [];
    const where = [];
    if (startTime) {
        where.push("start_time >= ?");
        params.push(startTime);
    }
    if (endTime) {
        where.push("end_time <= ?");
        params.push(endTime);
    }
    if (month && year) {
        where.push("MONTH(start_time) = ? AND YEAR(start_time) = ?");
        params.push(month, year);
    }
    if (where.length > 0) {
        sql += " where " + where.join(" and ");
    }
    sql += ` order by ${sortBy} ${order} limit ? offset ?`;
    params.push(limit, offset);
    return await queryArgument(sql, ...params);
}
export const getBookingById = async (bookingId) => {
    const sql = "select * from bookings where id = ?";
    const result = await queryArgument(sql, bookingId);
    return result[0];
}
export const getBookingByCode = async (code) => {
    const sql = "select * from bookings where code = ?";
    const result = await queryArgument(sql, code);
    return result[0];
}
export const addBooking = async ({
    customerEmail,
    status = "pending",
    startTime,
    endTime,
    totalPrice = 0,
    totalDuration = 0,
    createdByAdminId = null
}) => {
    const code = await generateCodeBooking();
    const sql = "insert into bookings (customer_email, status, start_time, end_time, total_price, total_duration, created_by_admin_id, code) values (?, ?, ?, ?, ?, ?, ?, ?)";
    const result = await queryArgument(sql, customerEmail, status, startTime, endTime, totalPrice, totalDuration, createdByAdminId, code);
    return {
        id: result.insertId,
        code
    };
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
export function getBookingsByUserEmail({ 
    email = "", 
    limit = 10,
    offset = 0,
    sortBy = 'created_at',
    order = 'asc'
 }) {
    const allowedSortBy = ['id', 'created_at', 'start_time', 'customer_email'];
    const allowedOrder = ['asc', 'desc'];
    const sortColumn = allowedSortBy.includes(sortBy) ? sortBy : 'created_at';
    const sortDirection = allowedOrder.includes(order.toLowerCase()) ? order.toLowerCase() : 'asc';

    const sql = `select * from bookings where customer_email = ? order by ${sortColumn} ${sortDirection} limit ? offset ?`;
    return queryArgument(sql, email, limit, offset);
}
export const getBookingsInMonth = async ({
    month,
    year
}) => {
    const startDate = `${year}-${String(month).padStart(2, "0")}-01 00:00:00`;
    const lastDay = new Date(year, month, 0).getDate();
    const endDate = `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")} 23:59:59`;
    const sql = `select * from bookings where start_time >= ? and end_time <= ?`;
    return await queryArgument(sql, startDate, endDate);
}

export const getBookingsByTimeRange = async ({
    startTime,
    endTime
}) => {
    const sql = `select * from bookings where start_time >= ? and end_time <= ?`;
    return await queryArgument(sql, formatDateTime(startTime), formatDateTime(endTime));
}

export const cancelBooking = async (bookingId) => {
    const sql = "update bookings set status = 'canceled' where id = ?";
    const result = await queryArgument(sql, bookingId);
    return result.affectedRows > 0;
}