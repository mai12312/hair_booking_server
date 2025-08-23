import { authRouter } from "./auth.route";
import { categoriesRouter } from "./categories.route";
import { servicesRouter } from "./services.route";
// import { imageRouter } from "./images.route";
// import { userRouter } from "./users.route";

export function routes(app) {
    app.use('/services', servicesRouter);
    app.use('/service-categories', categoriesRouter);
    // app.use('/images', imageRouter);
    app.use('/auth', authRouter);
}