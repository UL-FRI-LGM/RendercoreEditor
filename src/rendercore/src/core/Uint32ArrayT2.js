import { Uint32ArrayObjectBase } from "./Uint32ArrayObjectBase.js";
import { ErrorT2 } from "../ErrorT2.js";


export class Uint32ArrayT2 extends Uint32ArrayObjectBase {


	static DEFAULT = {
		TYPE: "Uint32ArrayT2",
		NAME: "",
	};


	constructor(args = {}, ...rest) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : Uint32ArrayT2.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : Uint32ArrayT2.DEFAULT.NAME,
			},
			...rest
		);
	}


	// copy(uint32ArrayT2, copyValues = true) {
	// 	if (!(uint32ArrayT2 instanceof Uint32ArrayT2)) ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE,{ cause: this.type });

	// 	super.copy(uint32ArrayT2).forEach((v, k) => { this[k] = copyValues ? Utility.copyValue(v) : v; });


	// 	return this;
	// }
	copy(uint32ArrayT2, copyValues = true) {
		if (!(uint32ArrayT2 instanceof Uint32ArrayT2)) ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE,{ cause: this.type });

		return copyValues ? this.reduce((acc_this, v, k) => {
			return acc_this.replace(k, uint32ArrayT2[k]);
		}, super.copy(uint32ArrayT2)) : super.copy(uint32ArrayT2);
	}
	// clone(cloneValues = true) {
	// 	return new Uint32ArrayT2(
	// 		{
	// 			type: Utility.cloneValue(this.type),
	// 			name: Utility.cloneValue(this.name),
	// 		},
	// 		this.entries().map(([k, v], i) => { return cloneValues ? Utility.cloneValue(v) : v; })
	// 	);
	// }
	clone() {
		return new Uint32ArrayT2(
			Object.assign(super.clone(), {}),
			this
		);
	}

	replace(key, value) {
		return (this[key] = value, this);
	}
};
