import {Router} from "express";
import { userRoute } from "./user/routes/user.routes";
import { authRoutes } from "./auth/routes/auth.routes";
import { notificationRoute } from "./notification/routes/index.routes";
import { diaryRoute } from "./diary/routes/diary.routes";

export const routes = Router();

routes.get("/", (req, res) => {
   return res.status(200).json({"ok": "foi caraiooo!"})
})
routes.use("/auth", authRoutes);
routes.use("/user", userRoute);
routes.use("/notification", notificationRoute);
routes.use("/diary", diaryRoute);
