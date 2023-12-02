/* eslint-disable no-mixed-spaces-and-tabs */
import { Request, Response } from "express";
import { MailerProvider } from "../providers/mailer/mailer.provider";
import { ResponseBody } from "../../commom/responses/responses";

const mailerProvider = new MailerProvider();

export class EmailController {
	send = async(req: Request, res: Response) => {
		try {
			const {emailTo, token} = req.body;
		    await mailerProvider.sendEmail( {emailTo, token} ,(cb: ResponseBody<any>) => {
				return res.status(cb.statusCode).json(cb.response);
			});
           
		}
		catch (e) {
			return res.status(500).json(e);
		}
	};
}