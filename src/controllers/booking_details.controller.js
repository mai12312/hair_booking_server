"use strict"
import { bookingDetailsService } from "../services/booking_details.service";

class BookingDetailsController {
    async getAllBookingDetails(req, res, next) {
        try {
            const details = await bookingDetailsService.getAllBookingDetails(req.query);
            res.status(200).json({ status: 200, message: "ok", datas: { details } });
        } catch (error) { next(error); }
    }
    async getBookingDetailById(req, res, next) {
        try {
            const detail = await bookingDetailsService.getBookingDetailById(req.params.detailId);
            res.status(200).json({ status: 200, message: "ok", datas: { detail } });
        } catch (error) { next(error); }
    }
    async deleteBookingDetail(req, res, next) {
        try {
            await bookingDetailsService.deleteBookingDetail(req.params.detailId);
            res.json({ status: 201, message: "Deleted!", data: null });
        } catch (error) { next(error); }
    }
    async addBookingDetail(req, res, next) {
        try {
            const id = await bookingDetailsService.addBookingDetail(req.body);
            res.json({ status: 201, message: "Created!", data: { id } });
        } catch (error) { next(error); }
    }
    async updateBookingDetail(req, res, next) {
        try {
            await bookingDetailsService.updateBookingDetail(req.params.detailId, req.body);
            res.json({ status: 200, message: "Updated!", data: { id: req.params.detailId } });
        } catch (error) { next(error); }
    }
}
export const bookingDetailsController = new BookingDetailsController();
