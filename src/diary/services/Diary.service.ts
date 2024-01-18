
import { BadRequest, Created, NotFound, OK, ResponseBody } from "../../commom/responses/responses";
import logger from "../../config/logger";
import { UserService } from "../../user/services/user.service";
import { DiaryRepository } from "../repositories/diary.repository";
import {Diary} from "@prisma/client";



const diaryRepository = new DiaryRepository();
const userService = new UserService();

export class DiaryService {
	getAll = async(): Promise<ResponseBody<Diary[]>> => {
		const diary = await diaryRepository.getAll();

		if (diary.length == 0) return new NotFound("Nenhum diário encontrado");
		return new OK(diary) ;
	};

	getByFilter = async(filter:  Partial<Diary>): Promise<ResponseBody<Diary[]>> => {
		const diary = await diaryRepository.getByFilter(filter);

		if (diary.length == 0) return new NotFound("Nenhum diário encontrado");
		return new OK(diary) ;
	};

	getUnique = async(id: string): Promise<ResponseBody<Diary>> => {
		const diary = await diaryRepository.getById(id);

		if (!diary) return new NotFound("Nenhum diário encontrado");
		return new OK(diary);
	};

	addRegister = async(fields: Omit<Diary, "id">): Promise<ResponseBody<Diary>> => {
		const userExists = await userService.exists({id: fields.userID});
		if (!userExists) return new BadRequest("Usuário não encontrado");

		const diary = await diaryRepository.register(fields);
		if (!diary) return new BadRequest("Não foi possível adicionar registro ao diário");
		logger.info("DiaryService::addRegister::created", diary);
		return new Created(diary);

	};

	update = async(id: string, fields: Omit<Diary, "id">): Promise<ResponseBody<Diary>> => {
		const diaryExists = await diaryRepository.getById(id);
		if (!diaryExists) return new NotFound("diário não encontrado");

		const diary = await diaryRepository.update(id, fields);

		if (!diary) return new BadRequest("Não foi possível modificar o registro");

		logger.info("DiaryService::update::ok", diary);
		return new OK(diary);
	};

	delete = async(id: string): Promise<ResponseBody<Diary>> => {
		const diaryExists = await diaryRepository.getById(id);
		if (!diaryExists) return new NotFound("diário não encontrado");

		const diary = await diaryRepository.delete(id);
		if (!diary) return new BadRequest("Não foi possível deletar o registro");
		return new OK("registro deletado");
	};
        
}