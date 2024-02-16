import { body } from "express-validator";

export const diaryValidator = [
	body("userID")
		.exists({ values: "falsy" }).withMessage("userID é obrigatório"),
	body("emotion")
		.exists({ values: "falsy" }).withMessage("emotion é obrigatório")
		.isString().withMessage("emotion deve ser uma string"),
	body("subemotion")
		.exists({ values: "falsy" }).withMessage("subemotion é obrigatório")
		.isArray().withMessage("subemotion deve ser uma array de strings"),
	body("socialEmotion")
		.optional({ values: "falsy"}).isString().withMessage("socialEmotin deve ser uma string"),
	body("emotionalRange")
		.exists({ values: "falsy" }).withMessage("emotionalRange é obrigatório")
		.isArray().withMessage("emotionalRange deve ser um array de inteiros"),
	body("emotionalDescription")
		.optional({ values: "falsy"}).isString().withMessage("emotionalDescription deve ser uma string"),
	body("thoughts")
		.optional({ values: "falsy"})
		.isArray().withMessage("thoughts deve ser uma array de strings"),
	body("thoughtsDescription")
		.optional({ values: "falsy"}).isString().withMessage("thoughtsDescription deve ser uma string"),
	body("thoughtsOrigin")
		.optional({ values: "falsy"}).isString().withMessage("thoughtsOrigin deve ser uma string"),
	body("thoughtsFactsDescription")
		.optional({ values: "falsy"}).isString().withMessage("thoughtsFactsDescription deve ser uma string"),
	body("behaviourDescription")
		.optional({ values: "falsy"}).isString().withMessage("behaviourDescription deve ser uma string")
];