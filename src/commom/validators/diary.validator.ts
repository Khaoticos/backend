import { body } from "express-validator";

export const diaryValidator = [
	body("userID")
		.exists({ values: "falsy" }).withMessage("userID é obrigatório"),
	body("emotion")
		.exists({ values: "falsy" }).withMessage("emotion é obrigatório")
		.isString().withMessage("emotion deve ser uma string"),
	body("subemotion")
		.exists({ values: "falsy" }).withMessage("subemotion é obrigatório")
		.isString().withMessage("subemotion deve ser uma string"),
	body("socialEmotion")
		.optional({ values: "falsy"}).isString().withMessage("socialEmotin deve ser uma string"),
	body("emotionalRange")
		.optional({ values: "falsy"}).isString().withMessage("emotionalRange deve ser uma string"),
	body("emotionalDescription")
		.optional({ values: "falsy"}).isString().withMessage("emotionalDescription deve ser uma string"),
	body("thoughts")
		.optional({ values: "falsy"}).isString().withMessage("thoughts deve ser uma string"),
	body("thoughtsDescription")
		.optional({ values: "falsy"}).isString().withMessage("thoughtsDescription deve ser uma string"),
	body("thoughtsOrigin")
		.optional({ values: "falsy"}).isString().withMessage("thoughtsOrigin deve ser uma string"),
	body("thoughtsFactsDescription")
		.optional({ values: "falsy"}).isString().withMessage("thoughtsFactsDescription deve ser uma string"),
	body("behaviourDescription")
		.optional({ values: "falsy"}).isString().withMessage("behaviourDescription deve ser uma string")
];