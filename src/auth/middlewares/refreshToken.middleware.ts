import { Request, Response, NextFunction } from "express";
import  Jwt  from "jsonwebtoken";
import { refreshSecret } from "../../config/token.config";
import { Unauthorized } from "../../commom/responses/responses";



export function refreshTokenMiddleware(req: Request, res: Response, next: NextFunction) {
	const {refreshToken} = req.body;
	try {
		if (!refreshToken) {
			throw new Unauthorized("Nenhum token foi passado");
		}

		Jwt.verify(refreshToken, refreshSecret, (err: any, decoded: any) => {
			if (err) throw new Unauthorized(`refresh token expired::${err}`);
			if (decoded) {
				next();
			} else {
				throw new Unauthorized("Token inválido ou expirado");
			}
		});
	} catch (err: any) {
		return res.status(401).json({ Error: err });
	}
}







