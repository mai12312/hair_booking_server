import { formatDate, formatDateTime } from "./booking.helper";

/**
 * Maps a booking object to a camelCase version.
 * @param {*} booking 
 * @returns 
 */
export function mapBookingToCamelCase(booking) {
    if (!booking) return booking;
    return {
        id: booking.id,
        code: booking.code,
        customerEmail: booking.customer_email,
        startTime: booking.start_time,
        endTime: booking.end_time,
        totalDuration: booking.total_duration,
        status: booking.status
    };
}
/**
 * Maps an array of booking objects to their camelCase versions.
 * @param {*} bookings 
 * @returns 
 */
export function mapBookingsToCamelCase(bookings) {
    if (!Array.isArray(bookings)) return [];
    return bookings.map(mapBookingToCamelCase);
}

export function mapBookingForExportExcel(booking, user) {
    if (!booking) return booking;
    return {
        ...mapBookingToCamelCase(booking),
        startTime: formatDate(booking.start_time),
        endTime: formatDate(booking.end_time),
        customerName: user.name || booking.customerName,
        customerPhone: phoneNumberRight(user.phone) || phoneNumberRight(booking.customerPhone),
        totalPrice: booking.total_price || booking.totalPrice,
        totalDuration: booking.total_duration || booking.totalDuration,
        createdAt: formatDate(booking.created_at) || (booking.createdAt ? formatDate(booking.createdAt) : null),
        updatedAt: formatDate(booking.updated_at) || (booking.updatedAt ? formatDate(booking.updatedAt) : null)
    };
}

export function phoneNumberRight(phoneNumber) {
    if (!phoneNumber) return null;
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, "");
    return cleaned.length >= 10 ? cleaned : null;
}