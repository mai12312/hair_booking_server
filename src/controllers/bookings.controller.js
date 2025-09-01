"use strict"
import { checkCustomerByEmail } from "../helpers/customer.helper";
import { bookingDetailsService } from "../services/booking_details.service";
import { bookingsService } from "../services/bookings.service";
import { customersService } from "../services/customers.service";
import { servicesService } from "../services/services.service";
import { calculatorEndTime, findServiceById, getDateForBookings, getTotalDuration, getTotalPrice } from "../helpers/booking.helper";
import { sendEmailForCustomer } from "../utils/booking.util";
import { mapBookingsToCamelCase, mapBookingToCamelCase } from "../helpers/mapBooking.helper";

class BookingsController {
    /**
     * Route: GET /bookings
     * method: GET
     */
    async getAllBookings(req, res, next) {
        try {
            const { month, year, startTime, endTime } = req.query;
            console.log({
                month,
                year,
                startTime,
                endTime
            })
            const bookings = await bookingsService.getAllBookings({ startTime, endTime, month, year });
            res.status(200).json({ status: 200, message: "ok", datas: { bookings: mapBookingsToCamelCase(bookings) } });
        } catch (error) { next(error); }
    }
    /**
     * Route: GET /bookings/user
     * method: GET
     */
    async getBookingCustomer(req, res, next) {
        try {
            const {
                limit,
                offset,
                order,
                sortBy,
                email
            } = req.query;
            const bookings = await bookingsService.getBookingsByUserEmail({
                limit: Number(isNaN(limit) ? "10" : limit),
                offset: Number(isNaN(offset) ? "0" : offset),
                order: order === "desc" ? "desc" : "asc",
                sortBy,
                email: email ?? ""
            });
            res.status(200).json({ status: 200, message: "ok", datas: { bookings: mapBookingsToCamelCase(bookings) } });
        } catch (error) { next(error); }
    }
    /**
     * Route: GET /bookings/:bookingId
     * method: GET
     */
    async getBookingById(req, res, next) {
        try {
            const booking = await bookingsService.getBookingById(req.params.bookingId);
            res.status(200).json({ status: 200, message: "ok", datas: { booking: mapBookingToCamelCase(booking) } });
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
            const { customerEmail, customerPhone, customerName, serviceIds, startTime, createdByAdminId } = req.body;
            // Check if customer exists
            const customer = await checkCustomerByEmail(customerEmail);
            if (!customer) {
                // create new customer if customer not found
                customersService.addCustomer({
                    email: customerEmail,
                    phone: customerPhone,
                    name: customerName,
                });
            }
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
            const {id, code} = await bookingsService.addBooking({
                customerEmail,
                startTime,
                totalPrice,
                totalDuration,
                createdByAdminId,
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

            res.json({
                status: 201, 
                message: "Đặt lịch thành công!", 
                datas: {id, code, totalDuration }
            });
        } catch (error) {
            next(error);
        }
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
