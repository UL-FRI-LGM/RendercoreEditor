import { ObjectBase } from "../core/ObjectBase.js";


export class Material extends ObjectBase {


	static DEFAULT = {
		NAME: "",
		TYPE: "Material",
	};


	constructor(args = {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : Material.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Material.DEFAULT.TYPE,
			}
		);
	}
};