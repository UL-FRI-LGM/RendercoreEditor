import { ArrayObjectBase } from "./ArrayObjectBase.js";


export class ArrayT2 extends ArrayObjectBase {


	static DEFAULT = {
		TYPE: "ArrayT2",
		NAME: "",
	};


	constructor(args = {}, ...rest) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : ArrayT2.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : ArrayT2.DEFAULT.NAME,
			},
			...rest
		);
	}


	clone() {
		return this.map((x) => { return (x === Object(x)) ? x.clone() : x; });
	}
};
