import {Router} from "express";
import { userRoute } from "./user/routes/user.routes";
import { authRoutes } from "./auth/routes/auth.routes";
import { notificationRoute } from "./notification/routes/index.routes";

export const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/user", userRoute);
routes.use("/notification", notificationRoute);
