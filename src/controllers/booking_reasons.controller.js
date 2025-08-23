"use strict"
import { bookingReasonsService } from "../services/booking_reasons.service";

class BookingReasonsController {
    async getAllBookingReasons(req, res, next) {
        try {
            const reasons = await bookingReasonsService.getAllBookingReasons(req.query);
            res.status(200).json({ status: 200, message: "ok", datas: { reasons } });
        } catch (error) { next(error); }
    }
    async getBookingReasonById(req, res, next) {
        try {
            const reason = await bookingReasonsService.getBookingReasonById(req.params.reasonId);
            res.status(200).json({ status: 200, message: "ok", datas: { reason } });
        } catch (error) { next(error); }
    }
    async deleteBookingReason(req, res, next) {
        try {
            await bookingReasonsService.deleteBookingReason(req.params.reasonId);
            res.json({ status: 201, message: "Deleted!", data: null });
        } catch (error) { next(error); }
    }
    async addBookingReason(req, res, next) {
        try {
            const id = await bookingReasonsService.addBookingReason(req.body);
            res.json({ status: 201, message: "Created!", data: { id } });
        } catch (error) { next(error); }
    }
    async updateBookingReason(req, res, next) {
        try {
            await bookingReasonsService.updateBookingReason(req.params.reasonId, req.body);
            res.json({ status: 200, message: "Updated!", data: { id: req.params.reasonId } });
        } catch (error) { next(error); }
    }
}
export const bookingReasonsController = new BookingReasonsController();
