import {Diary, PrismaClient} from "@prisma/client";
import { v4 } from "uuid";

const prisma = new PrismaClient();

export class DiaryRepository {

	getAll = async(filter: Partial<Diary>) => {
		const diary = await prisma.diary.findMany({
			where: filter
		});
		return diary;
	};

	getById = async(id: string): Promise<Diary | null> => {
		const diary = await prisma.diary.findUnique({
			where: {id}
		});
		return diary;
	};
    
	register = async(fields: Omit<Diary, "id">) => {
		const {userID, emotion, subemotion, socialEmotion, emotionalRange, emotionDescription, thoughts, thoughtsDescription, thoughtsOrigin, thoughtsFactsDescription, behaviourDescription } = fields;
		const diary = await prisma.diary.create({
			data: {
				id: v4(),
				userID,
				emotion,
				subemotion,
				socialEmotion,
				emotionalRange,
				emotionDescription,
				thoughts,
				thoughtsDescription,
				thoughtsOrigin,
				thoughtsFactsDescription,
				behaviourDescription,
				createdAt: new Date(),
				updatedAt: new Date(),
			}
		});
		return diary;
	};

	update = async(id: string, fields: Omit<Diary, "id">) => {
		fields.updatedAt = new Date();
		const diary = await prisma.diary.update({
			data: fields,
			where: {id}
		});
		return diary;
	};

	delete = async(id: string) => {
		const diary = await prisma.diary.delete({
			where: {id}
		});
		return diary;
	};

}

