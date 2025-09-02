import { getDateForBookings } from "../helpers/booking.helper";
import {
    addBooking,
    cancelBooking,
    deleteBooking,
    getAllBookings,
    getBookingByCode,
    getBookingById,
    getBookingsByTimeRange,
    getBookingsByUserEmail,
    getBookingsInMonth,
    updateBooking
} from "../repositories/bookings.repo";

class BookingsService {
    async getAllBookings({ startTime, endTime, month, year }) {
        let bookings = [];
        if (startTime && endTime) {
            bookings = await this.getBookingsByTimeRange({
                startTime,
                endTime
            });
        } else {
            const { safeMonth, safeYear } = getDateForBookings({ month, year });
            bookings = await this.getBookingsInMonth({
                month: safeMonth,
                year: safeYear
            });
        }
        return bookings;
    }
    async getBookingById(bookingId) {
        const booking = await getBookingById(bookingId);
        if (!booking) throw new Error("Booking không tìm thấy");
        return booking;
    }
    async addBooking(data) {
        return await addBooking(data);
    }
    async updateBooking(bookingId, data) {
        const booking = await getBookingById(bookingId);
        if (!booking) throw new Error("Booking không tìm thấy");
        return await updateBooking(bookingId, data);
    }
    async deleteBooking(bookingId) {
        const booking = await getBookingById(bookingId);
        if (!booking) throw new Error("Booking không tìm thấy");
        return await deleteBooking(bookingId);
    }
    async getBookingsByUserEmail({ email = "", ...query }) {
        const bookings = await getBookingsByUserEmail({ email, ...query });
        if (!bookings) throw new Error("Booking không tìm thấy");
        return bookings;
    }
    async getBookingsInMonth({ month, year }) {
        const bookings = await getBookingsInMonth({ month, year });
        if (!bookings) throw new Error("Booking không tìm thấy");
        return bookings;
    }
    async getBookingsByTimeRange({ startTime, endTime }) {
        const bookings = await getBookingsByTimeRange({ startTime, endTime });
        if (!bookings) throw new Error("Booking không tìm thấy");
        return bookings;
    }
    async cancelBooking(bookingId) {
        const booking = await getBookingById(bookingId);
        if (!booking) throw new Error("Booking không tìm thấy");
        return await cancelBooking(bookingId);
    }
    async getBookingByCode(code) {
        const booking = await getBookingByCode(code);
        if (!booking) throw new Error("Booking không tìm thấy");
        return booking;
    }
}
export const bookingsService = new BookingsService();