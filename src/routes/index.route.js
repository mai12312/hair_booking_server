import { authRouter } from "./auth.route";
import { bookingDetailsRouter } from "./booking_details.route";
import { bookingReasonsRouter } from "./booking_reasons.route";
import { bookingsRouter } from "./bookings.route";
import { categoriesRouter } from "./categories.route";
import { customersRouter } from "./customers.route";
import { servicesRouter } from "./services.route";
// import { imageRouter } from "./images.route";
// import { userRouter } from "./users.route";

export function routes(app) {
    app.use('/services', servicesRouter);
    app.use('/service-categories', categoriesRouter);
    app.use('/bookings', bookingsRouter);
    app.use('/booking-details', bookingDetailsRouter);
    app.use('/booking-reasons', bookingReasonsRouter);
    app.use('/customers', customersRouter);
    // app.use('/images', imageRouter);
    app.use('/auth', authRouter);
}