import {Router} from "express";
import { EmailController } from "../../notification/controllers/email.controllers";


const emailController = new EmailController();

export const notificationRoute = Router();

notificationRoute.post("/mail", emailController.send);
