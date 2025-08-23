import {
    addBookingReason,
    deleteBookingReason,
    getAllBookingReasons,
    getBookingReasonById,
    updateBookingReason
} from "../repositories/booking_reasons.repo";

class BookingReasonsService {
    async getAllBookingReasons(query) {
        return await getAllBookingReasons(query);
    }
    async getBookingReasonById(reasonId) {
        const reason = await getBookingReasonById(reasonId);
        if (!reason) throw new Error("Booking reason not found!");
        return reason;
    }
    async addBookingReason(data) {
        return await addBookingReason(data);
    }
    async updateBookingReason(reasonId, data) {
        const reason = await getBookingReasonById(reasonId);
        if (!reason) throw new Error("Booking reason not found!");
        return await updateBookingReason(reasonId, data);
    }
    async deleteBookingReason(reasonId) {
        const reason = await getBookingReasonById(reasonId);
        if (!reason) throw new Error("Booking reason not found!");
        return await deleteBookingReason(reasonId);
    }
}
export const bookingReasonsService = new BookingReasonsService();
