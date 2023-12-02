import {Router} from "express";
import { AuthController } from "../controllers/auth.controller";
import { googleRoutes } from "./google.auth.routes";
import { refreshTokenMiddleware } from "../middlewares/refreshToken.middleware";
import { loginValidator } from "../../commom/validators/auth.validator";
import { validationErrors } from "../../commom/validators/validation-errors";


export const authRoutes = Router();

const authController = new AuthController();

authRoutes.post("/login",loginValidator, validationErrors, authController.login);
authRoutes.post("/refreshtoken", refreshTokenMiddleware, authController.refreshToken);
authRoutes.post("/logout", authController.logout);

//CHANGE PASSWORD
authRoutes.post("/send/:mail/token", authController.sendToken);
authRoutes.post("/validate/:mail/token/:token", authController.validateToken);
authRoutes.patch("/password/update", authController.passwordUpdate);

authRoutes.use("/google", googleRoutes);

