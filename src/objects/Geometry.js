import { ObjectBase } from "../core/ObjectBase.js";


export class Geometry extends ObjectBase {


	static DEFAULT = {
		NAME: "",
		TYPE: "Geometry",
	};

	
	constructor(args = {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : Geometry.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Geometry.DEFAULT.TYPE,
			}
		);
	}
};