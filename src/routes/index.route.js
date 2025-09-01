import { authRouter } from "./auth.route";
import { bookingDetailsRouter } from "./booking_details.route";
import { bookingReasonsRouter } from "./booking_reasons.route";
import { bookingsRouter } from "./bookings.route";
import { categoriesRouter } from "./categories.route";
import { customersRouter } from "./customers.route";
import { mediaRouter } from "./media.route";
import { servicesRouter } from "./services.route";

export function routes(app) {
    app.use('/api/services', servicesRouter);
    app.use('/api/service-categories', categoriesRouter);
    app.use('/api/bookings', bookingsRouter);
    app.use('/api/admin/bookings', bookingsRouter);
    app.use('/api/booking-details', bookingDetailsRouter);
    app.use('/api/booking-reasons', bookingReasonsRouter);
    app.use('/api/customers', customersRouter);
    app.use('/api/media', mediaRouter);
    app.use('/api/auth', authRouter);
}