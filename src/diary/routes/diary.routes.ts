import {Router} from "express";
import {DiaryController} from "../controllers/diary.controller";
import { diaryValidator } from "../../commom/validators/diary.validator";
import { validationErrors } from "../../commom/validators/validation-errors";


export const diaryRoute = Router();

const diaryController = new DiaryController();

diaryRoute.get("/", diaryController.getAll);
diaryRoute.get("/:userID", diaryController.getByFilter);
diaryRoute.get("/register/:id", diaryController.getById);
diaryRoute.post("/", diaryValidator, validationErrors, diaryController.register);
diaryRoute.put("/:id", diaryController.update);
diaryRoute.delete("/:id", diaryController.delete);

diaryRoute.get("/options/:type", diaryController.getOptions);

//TODO: diary batch route (add registros em lote)



