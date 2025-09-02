import {
    addBookingDetail,
    deleteBookingDetail,
    getAllBookingDetails,
    getBookingDetailById,
    updateBookingDetail
} from "../repositories/booking_details.repo";

class BookingDetailsService {
    async getAllBookingDetails(query) {
        const limit = query.limit || 10;
        const offset = query.offset || 0;
        const sortBy = query.sortBy || 'created_at';
        const order = query.order || 'asc';
        return await getAllBookingDetails({ ...query, sortBy, order, limit, offset });
    }
    async getBookingDetailById(detailId) {
        const detail = await getBookingDetailById(detailId);
        if (!detail) throw new Error("Booking detail not found!");
        return detail;
    }
    async addBookingDetail(data) {
        return await addBookingDetail(data);
    }
    async updateBookingDetail(detailId, data) {
        const detail = await getBookingDetailById(detailId);
        if (!detail) throw new Error("Booking detail not found!");
        return await updateBookingDetail(detailId, data);
    }
    async deleteBookingDetail(detailId) {
        const detail = await getBookingDetailById(detailId);
        if (!detail) throw new Error("Booking detail not found!");
        return await deleteBookingDetail(detailId);
    }
}
export const bookingDetailsService = new BookingDetailsService();
