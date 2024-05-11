import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {

	getAll = async(filter: Partial<User>) => {
		const user = await prisma.user.findMany({
			where: filter
		});
		return user;
	};

	getUnique = async(fields: Partial<User>): Promise<User | null> => {
		const user = await prisma.user.findMany({
			where: fields
		});
		if (user.length == 1) return user[0];
		return null;
	};
    
	register = async(fields: Omit<User, "id">) => {
		const {email,name, password } = fields;
		const user = await prisma.user.create({
			data: {
				name,
				login: email,
				email,
				password
			}});
		return user;
	};

	update = async(id: string, fields: Partial<User>) => {
		fields.updatedAt = new Date();
		const user = await prisma.user.update({
			data: fields,
			where: {id}
		});
		return user;
	};

	delete = async(id: string) => {
		const user = await prisma.user.delete({
			where: {id}
		});
		return user;
	};

}

