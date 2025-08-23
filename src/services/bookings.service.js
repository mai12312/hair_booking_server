import {
    addBooking,
    deleteBooking,
    getAllBookings,
    getBookingById,
    updateBooking
} from "../repositories/bookings.repo";

class BookingsService {
    async getAllBookings(query) {
        return await getAllBookings(query);
    }
    async getBookingById(bookingId) {
        const booking = await getBookingById(bookingId);
        if (!booking) throw new Error("Booking not found!");
        return booking;
    }
    async addBooking(data) {
        return await addBooking(data);
    }
    async updateBooking(bookingId, data) {
        const booking = await getBookingById(bookingId);
        if (!booking) throw new Error("Booking not found!");
        return await updateBooking(bookingId, data);
    }
    async deleteBooking(bookingId) {
        const booking = await getBookingById(bookingId);
        if (!booking) throw new Error("Booking not found!");
        return await deleteBooking(bookingId);
    }
}
export const bookingsService = new BookingsService();
