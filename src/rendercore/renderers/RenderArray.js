import { ArrayT2 } from "../core/ArrayT2.js";


export class RenderArray extends ArrayT2 {


	static DEFAULT = {
		TYPE: "RenderArray",
		NAME: "",
	};


	constructor(args = {}, ...rest) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : RenderArray.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : RenderArray.DEFAULT.NAME,
			},
			...rest
		);
	}


	clone(cloneValues = true) {
		return new RenderArray(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
			},
			// ...this.map((x) => { return cloneValues ? ((x === Object(x)) ? x.clone() : x) : x; })
			...[...this.entries()].map(([k, v]) => { return cloneValues ? ((v === Object(v)) ? v.clone() : v) : v; })
		);
	}
};
