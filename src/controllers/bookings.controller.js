"use strict"
import { checkCustomerByEmail } from "../helpers/customer.helper";
import { bookingDetailsService } from "../services/booking_details.service";
import { bookingsService } from "../services/bookings.service";
import { customersService } from "../services/customers.service";
import { servicesService } from "../services/services.service";
import { calculatorEndTime, findServiceById, getTotalDuration, getTotalPrice } from "../helpers/booking.helper";
import { sendEmailForCustomer } from "../utils/booking.util";

class BookingsController {
    /**
     * Route: GET /bookings
     * method: GET
     */
    async getAllBookings(req, res, next) {
        try {
             const {
                limit,
                offset,
                order,
                sortBy
            } = req.query;
            const bookings = await bookingsService.getAllBookings({
                limit: Number(isNaN(limit) ? "10" : limit),
                offset: Number(isNaN(offset) ? "0" : offset),
                order: order === "desc" ? "desc" : "asc",
                sortBy
            });
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
//     {
//     "customerEmail": "adsdasdas@gmail.com",
//     "customerPhone": "123123123",
//     "customerName": "casdcsa",
//     "serviceIds": [
//         5,
//         9
//     ],
//     "startTime": "2025-08-24T20:20:00"
// }
    async addBooking(req, res, next) {
        try {
            const { customerEmail, customerPhone, customerName, serviceIds, startTime } = req.body;
            // Check if customer exists
            const customer = await checkCustomerByEmail(customerEmail);
            if (!customer) {
                // create new customer if customer not found
                customersService.addCustomer({
                    email: customerEmail,
                    phone: customerPhone,
                    name: customerName
                });
            }
            console.log("startTime: ", startTime);
            // check service is exists
            const services = [];
            for (const serviceId of serviceIds) {
                const service = await servicesService.getServiceById(serviceId);
                if (!service) throw new Error(`Có dịch vụ không tồn tại!`);
                services.push(service);
            }
            const totalDuration = getTotalDuration(services);
            const totalPrice = getTotalPrice(services);

            // create new booking
            const id = await bookingsService.addBooking({
                customerEmail,
                startTime,
                totalPrice,
                totalDuration,
                endTime: calculatorEndTime(startTime, totalDuration)
            });

            // create booking details
            for (const serviceId of serviceIds) {
                await bookingDetailsService.addBookingDetail({
                    service_id: serviceId,
                    booking_id: id,
                    price: findServiceById(services, serviceId)?.price ?? 0,
                    duration: findServiceById(services, serviceId)?.duration ?? 0
                });
            }

            // send email to booking
            await sendEmailForCustomer(serviceIds);

            res.json({ status: 201, message: "Đặt lịch thành công!", data: { id } });
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
