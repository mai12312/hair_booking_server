"use strict"
import { bookingsService } from "../services/bookings.service";

class BookingsController {
    /**
     * Route: GET /bookings
     * method: GET
     */
    async getAllBookings(req, res, next) {
        try {
            const bookings = await bookingsService.getAllBookings(req.query);
            res.status(200).json({ status: 200, message: "ok", datas: { bookings } });
        } catch (error) { next(error); }
    }
    /**
     * Route: GET /bookings/:bookingId
     * method: GET
     */
    async getBookingById(req, res, next) {
        try {
            const booking = await bookingsService.getBookingById(req.params.bookingId);
            res.status(200).json({ status: 200, message: "ok", datas: { booking } });
        } catch (error) { next(error); }
    }
    /**
     * Route: DELETE /bookings/:bookingId
     * method: DELETE
     */
    async deleteBooking(req, res, next) {
        try {
            await bookingsService.deleteBooking(req.params.bookingId);
            res.json({ status: 201, message: "Deleted!", data: null });
        } catch (error) { next(error); }
    }
    /**
     * Route: POST /bookings
     * method: POST
     */
    async addBooking(req, res, next) {
        try {
            const id = await bookingsService.addBooking(req.body);
            res.json({ status: 201, message: "Created!", data: { id } });
        } catch (error) { next(error); }
    }
    /**
     * Route: PATCH /bookings/:bookingId
     * method: PATCH
     */
    async updateBooking(req, res, next) {
        try {
            await bookingsService.updateBooking(req.params.bookingId, req.body);
            res.json({ status: 200, message: "Updated!", data: { id: req.params.bookingId } });
        } catch (error) { next(error); }
    }
}
export const bookingsController = new BookingsController();
