import { Float32ArrayObjectBase } from "./Float32ArrayObjectBase.js";


export class Float32ArrayT2 extends Float32ArrayObjectBase {


	static DEFAULT = {
		TYPE: "Float32ArrayT2",
		NAME: "",
	};


	constructor(args = {}, ...rest) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : Float32ArrayT2.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : Float32ArrayT2.DEFAULT.NAME,
			},
			...rest
		);
	}


	// clone(cloneValues = true) {
	// 	return new Float32ArrayT2(
	// 		{
	// 			type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
	// 			name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
	// 		},
	// 		[...this.entries()].map(([k, v]) => { return cloneValues ? ((v === Object(v)) ? v.clone() : v) : v; })
	// 	);
	// }
	clone() {
		return new Float32ArrayT2(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
			},
			this
		);
	}
};
