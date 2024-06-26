import { Profile } from "passport-google-oauth20";
import { AuthService } from "../services/auth.service";
import { Request, Response } from "express";
import { IToken, ResponseBody } from "../../commom/responses/responses";

const authService = new AuthService();

const APP_URL= "http://localhost:3000";
export class AuthController {
	login = async(req: Request, res: Response) => {
		try {
			const fields = req.body;
			const login: ResponseBody<IToken> = await authService.login(fields);
			return res.status(login.statusCode).json(login.response);
		}
		catch (e) {
			return res.status(500).json(e);
		}
	};

	google = async(req: Request, res: Response) => {
		try {
			const profile = req.user as Profile;
			const login: ResponseBody<IToken> = await authService.google(profile);

			let params="accessToken=&refreshToken=";

			if(login.statusCode == 200) {
				const token = login.response as IToken;
				params =`accessToken=${token.accessToken}&refreshToken=${token.refreshToken}`;
			} 
			
			res.redirect(`${APP_URL}/registerGoogle?${params}`);
			
			//return res.status(login.statusCode).json(login.response);
		}
		catch (e) {
			return res.status(500).json(e);
		}
	};

	refreshToken = async(req: Request, res: Response) => {
		try {
			const {refreshToken} = req.body;
			const token: ResponseBody<IToken> = await authService.refreshToken(refreshToken);
			return res.status(token.statusCode).json(token.response);
		}
		catch (e) {
			return res.status(500).json(e);
		}
        
	};

	sendToken = async(req: Request, res: Response) => {
		try {
			const {mail} = req.params;
			await authService.sendToken(mail, (cb: ResponseBody<any>) => {
				return res.status(cb.statusCode).json(cb.response);
			});
		}
		catch (e) {
			return res.status(500).json(e);
		}
        
	};

	validateToken = async(req: Request, res: Response) => {
		try {
			const {mail, token} = req.params;

			const isValid: ResponseBody<IToken> = await authService.validateToken(mail, token);
			return res.status(isValid.statusCode).json(isValid.response);
		}
		catch (e) {
			return res.status(500).json(e);
		}
        
	};

	logout = async(req: Request, res: Response) => {
		try {
			const logout: ResponseBody<any> = await authService.logout();
			return res.status(logout.statusCode).json(logout.response);
		}
		catch (e) {
			return res.status(500).json(e);
		}
        
	};

	passwordUpdate = async(req: Request, res: Response) => {
		try {
			const {email, token, password} = req.body;
			const logout: ResponseBody<any> = await authService.updatePassword(email, token, password);
			return res.status(logout.statusCode).json(logout.response);
		}
		catch (e) {
			return res.status(500).json(e);
		}
        
	};

}