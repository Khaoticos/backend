import { BadRequest, OK, ResponseBody } from "../../commom/responses/responses";
import { OptionsTypes } from "../enums/emotions.enum";




export class OptionsService {
	getByType = async(type: string): Promise<ResponseBody<any>> => {
		
		const allowedTypes = Object.keys(OptionsTypes);

		if (allowedTypes.includes(type)) {
			let arr: any;
			switch(type) {
			case "EMOTIONS":
				arr = Object.keys(OptionsTypes.EMOTIONS);
				break;
				
			case "THOUGHTS":
				arr = Object.values(OptionsTypes.THOUGHTS);
				break;

			case "MEDO":
				arr = Object.values(OptionsTypes.EMOTIONS.MEDO);
				break;

			case "ALEGRIA":
				arr = Object.values(OptionsTypes.EMOTIONS.ALEGRIA);
				break;

			case "TRISTEZA":
				arr = Object.values(OptionsTypes.EMOTIONS.TRISTEZA);
				break;

			case "RAIVA":
				arr = Object.values(OptionsTypes.EMOTIONS.RAIVA);
				break;

			case "NOJO":
				arr = Object.values(OptionsTypes.EMOTIONS.NOJO);
				break;

			case "SURPRESA":
				arr = Object.values(OptionsTypes.EMOTIONS.SURPRESA);
				break;

			case "SOCIAL":
				arr = Object.values(OptionsTypes.EMOTIONS.SOCIAL);
				break;

			default:
				arr = Object.values(OptionsTypes);
			}

			return new OK(arr);
		} else {
			return new BadRequest(`${type} is not of type ${allowedTypes}`);
		}
		
	};
}

	
