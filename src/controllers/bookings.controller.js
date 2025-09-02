"use strict"
import { checkCustomerByEmail } from "../helpers/customer.helper";
import { bookingDetailsService } from "../services/booking_details.service";
import { bookingsService } from "../services/bookings.service";
import { customersService } from "../services/customers.service";
import { servicesService } from "../services/services.service";
import { calculatorEndTime, findServiceById, getTotalDuration, getTotalPrice } from "../helpers/booking.helper";
import { exportBookingsToCSV, sendEmailForCustomer } from "../utils/booking.util";
import { mapBookingForExportExcel, mapBookingsToCamelCase, mapBookingToCamelCase } from "../helpers/mapBooking.helper";

class BookingsController {
    /**
     * Route: GET /bookings
     * method: GET
     */
    async getAllBookings(req, res, next) {
        try {
            const { month, year, startTime, endTime } = req.query;
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
                email: email || ""
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
     * Route: DELETE /admin/bookings/:bookingId
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
                    price: findServiceById(services, serviceId).price || 0,
                    duration: findServiceById(services, serviceId).duration || 0
                });
            }

            // send email to booking
            await sendEmailForCustomer({
                customerEmail: customer.email,
                customerName: customer.name,
                services,
                totalPrice,
                startTime,
                bookingId: id,
                code
            });

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
    /**
     * Route: DELETE /bookings/:bookingId
     * method: DELETE
     */
    async cancelBooking(req, res, next) {
        try {
            const { code } = req.query;
            if (code) {
                const booking = await bookingsService.getBookingByCode(code);
                if (!booking) {
                    return res.status(404).json({
                        status: 404,
                        message: "Không tìm thấy booking với mã code này!",
                        data: null
                    });
                }
                if (!booking.code) {
                    return res.status(400).json({
                        status: 400,
                        message: "Booking không có mã code!",
                        data: null
                    });
                }
                if(booking.status == "canceled") {
                    return res.status(417).json({
                        status: 417,
                        message: "Booking đã được hủy trước đó!",
                        data: null
                    });
                }
            }
            await bookingsService.cancelBooking(req.params.bookingId);
            res.json({
                status: 201,
                message: "Đã hủy lịch cắt thành công!",
                data: null
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Route: GET /admin/bookings/export
     * method: GET
     */
    async exportBookings(req, res, next) {
        try {
            // Get all bookings (you can add filters if needed)
            const { month, year, startTime, endTime } = req.query;

            const bookings = await bookingsService.getAllBookings({month, year, startTime, endTime});
            // Map bookings to flat objects for CSV
            const flatBookings = await Promise.all(bookings.map(async (b) => {
                const user = await customersService.getCustomerByEmail(b.customerEmail || b.customer_email);

                return mapBookingForExportExcel(b, user);
            }));

            await exportBookingsToCSV(flatBookings, "booking_export.csv", res);
        } catch (error) {
            next(error);
        }
    }
}
export const bookingsController = new BookingsController();