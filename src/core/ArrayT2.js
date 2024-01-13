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


	// clone() {
	// 	return new ArrayT2(this, ...this);
	// }

	clone(cloneEntries = true) {
		// return this.map((x) => { return (x === Object(x)) ? x.clone() : x; });
		return new ArrayT2(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
			},
			// ...this.map((x) => { return cloneEntries ? ((x === Object(x)) ? x.clone() : x) : x; })
			...[...this.entries()].map(([k, v]) => { return cloneEntries ? ((v === Object(v)) ? v.clone() : v) : v; })
		);
	}
};
