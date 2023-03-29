import { ObjectBase } from "../ObjectBase.js";


export class Resource extends ObjectBase { //resource base


	static DEFAULT = {
		NAME: "",
		TYPE: "Resource",
	};


	constructor(args = {}) {
        super(
			{
				...args,
				
                name: (args.name !== undefined) ? args.name : Resource.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Resource.DEFAULT.TYPE,
            }
		);
	}
};