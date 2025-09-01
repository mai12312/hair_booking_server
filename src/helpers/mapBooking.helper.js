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