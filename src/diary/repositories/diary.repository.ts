import {Diary, PrismaClient} from "@prisma/client";
import { v4 } from "uuid";

import logger from "../../config/logger";
import { IPrismaPagination } from "../../commom/interfaces/interfaces";

const prisma = new PrismaClient();

export class DiaryRepository {

	getAll = async() => {
		const diary = await prisma.diary.findMany({
			orderBy: {
				createdAt: "desc"
			}
		});
		return diary;
	};

	getByFilter = async(filter: Partial<Diary>, pagination: IPrismaPagination) => {
		const query = {
			...filter, 
			subemotion: filter.subemotion?.length ? {hasEvery: filter.subemotion} : undefined, 
			thoughts: filter.thoughts?.length ? {hasEvery: filter.thoughts}: undefined
		};
		logger.info("query", query);
		logger.info("pagination", pagination);
		const diary = await prisma.diary.findMany({
			skip: pagination.skip,
			take: pagination.take,
			where: query,
			orderBy: {
				createdAt: "desc"
			}
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
		const data = {
			...fields, 
			id: v4(), 
			createdAt: new Date(),
			updatedAt: new Date()
		};
		
		const diary = await prisma.diary.create({
			data
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

