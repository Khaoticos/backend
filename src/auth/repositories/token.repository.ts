import { PrismaClient, Token } from "@prisma/client";

const prisma = new PrismaClient();

export class TokenRepository {

	getAll = async(filter: Partial<Token>) => {
		const token = await prisma.token.findMany({
			where: filter
		});
		return token;
	};

	getUnique = async(fields: Partial<Token>): Promise<Token | null> => {
		const token = await prisma.token.findMany({
			where: fields
		});
		if (token.length == 1) return token[0];
		return null;
	};
    
	register = async(fields: Omit<Token, "id">) => {
		const {token, userId, expiresAt } = fields;
		const newToken = await prisma.token.create({
			data: {
				userId,
				token,
				expiresAt
			}});
		return newToken;
	};

	delete = async(token:any) => {
		const deleted = await prisma.token.delete({
			where: token
		});
		return deleted;
	};

}

