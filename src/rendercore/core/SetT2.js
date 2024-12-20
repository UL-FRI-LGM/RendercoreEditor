import { SetObjectBase } from "./SetObjectBase.js";


export class SetT2 extends SetObjectBase {


	static DEFAULT = {
		TYPE: "SetT2",
		NAME: "",
	};


	constructor(args = {}, iterable = undefined) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : SetT2.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SetT2.DEFAULT.NAME,
			},
			iterable
		);
	}


	// clone() {
	// 	// return new SetT2(this, [...this]);
	// 	return new SetT2(this, this);
	// }

	clone(cloneValues = true) {
		// const originalSet = this;
		// const clonedSet = new SetT2();

		// originalSet.forEach((value, key) => {
		// 	// const clonedKey = (key === Object(key)) ? x.clone() : key;
		// 	const clonedValue = (value === Object(value)) ? value.clone() : value;

		// 	clonedSet.add(clonedValue);
		// });
	

		// return clonedSet;
		return new SetT2(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
			},
			// [...this].map((x) => { return cloneValues ? ((x === Object(x)) ? x.clone() : x) : x; })
			[...this.entries()].map(([k, v]) => { return cloneValues ? ((v === Object(v)) ? v.clone() : v) : v; })
		);
	}
};
