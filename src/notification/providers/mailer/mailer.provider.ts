import nodemailer from "nodemailer";
import { promises as fs } from "fs";
import * as Handlebars from "handlebars";

import { IEmailerOptions } from "./emailer.interface";
import { BadRequest, OK } from "../../../commom/responses/responses";



export class MailerProvider {
	private transporter: any;


	private createTransport = async () => {
		this.transporter = await nodemailer.createTransport({
			service: process.env.MAILER_SERVICE,
			auth: {
				user: process.env.MAILER_FROM_MAIL,
				pass: process.env.MAILER_FROM_PASSWORD,
			},
		});
	};

	private createTemplate = async (token: string): Promise<string> => {
		const template: string = await fs.readFile(
			"./src/notification/providers/mailer/templates/recoverPasswordTemplate.hbs",
			"utf-8"
		);
		const context = {
			token: token,
		};

		// Compila o template com Handlebars
		const compiledTemplate = Handlebars.compile(template);

		// Aplica o contexto ao template compilado
		const result = compiledTemplate(context);
		return result;
	};

	private mailOption = async (opt: IEmailerOptions) => {

		const template: string = await this.createTemplate(opt.token);

		const mailOptions = await {
			from: process.env.MAILER_FROM_MAIL,
			to: `${opt.emailTo}`,
			subject: "Recuperação de Senha",
			html: template,
		};
		return mailOptions;
	};

	public sendEmail = async (options: IEmailerOptions, callback: any) => {
		const mailOption = await this.mailOption(options);
		await this.createTransport();
		await this.transporter.sendMail(mailOption, (error: any, info: any) => {
			if (error) {
				console.log(error);

				callback(new BadRequest(error));
			} else {
				callback(new OK(info.response));
			}
		});
	};


}
