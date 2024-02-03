import { DiaryService } from "../services/Diary.service";
import { Request, Response } from "express";
import {Diary} from "@prisma/client";
import { OptionsService } from "../services/options.service.";
import { ResponseBody } from "../../commom/responses/responses";
import { IPrismaPagination } from "../../commom/interfaces/interfaces";


const diaryService = new DiaryService();
const optionsService = new OptionsService();

export class DiaryController {
	getAll = async(req: Request, res: Response) => {
		try {
			const diary: ResponseBody<Diary[]> = await diaryService.getAll();
            
			return res.status(diary.statusCode).json(diary.response);
		}
		catch (e) {
			return res.status(500).json(e);
		}
	};

	getByFilter = async(req: Request, res: Response) => {
		try {
			const {userID} = req.params;
			const {thoughts, subemotion} = req.body;
			const {skip, take, ...otherFilters} = req.query;
			const filter: Partial<Diary> = {...otherFilters, userID, thoughts, subemotion};
			const pagination: IPrismaPagination = {skip: skip? Number(skip): undefined, take: take? Number(take): undefined};
			const diary: ResponseBody<Diary[]> = await diaryService.getByFilter(filter, pagination);
            
			return res.status(diary.statusCode).json(diary.response);
		}
		catch (e) {
			return res.status(500).json(e);
		}
	};

	getById = async(req: Request, res: Response) => {
		try {
          
			const {id} = req.params;
			const diary: ResponseBody<Diary> = await diaryService.getUnique(id);

			return res.status(diary.statusCode).json(diary.response);
		}
		catch (e) {
			return res.status(500).json(e);
		}
        
	};

	getOptions = async(req: Request, res: Response) => {
		try {
          
			const {type} = req.params;
			const options: ResponseBody<Diary> = await optionsService.getByType(type);

			return res.status(options.statusCode).json(options.response);
		}
		catch (e) {
			return res.status(500).json(e);
		}
        
	};

	register = async(req: Request, res: Response) => {
		try {
			const fields: Omit<Diary, "id"> = req.body;
			const diary: ResponseBody<Diary> = await diaryService.addRegister(fields);
			return res.status(diary.statusCode).json(diary.response);
		}
		catch (e) {
			return res.status(500).json(e);
		}
        
	};

	update = async(req: Request, res: Response) => {
		try {
			const {id} = req.params;
			const fields = req.body;
			const diary: ResponseBody<Diary> = await diaryService.update(id, fields);

			return res.status(diary.statusCode).json(diary.response);
		}
		catch (e) {
			return res.status(500).json(e);
		}
        
	};

	delete = async(req: Request, res: Response) => {
		try {
			const {id} = req.params;
			const diary: ResponseBody<Diary> = await diaryService.delete(id);

			return res.status(diary.statusCode).json(diary.response);
		}
		catch (e) {
			return res.status(500).json(e);
		}
        
	};
}