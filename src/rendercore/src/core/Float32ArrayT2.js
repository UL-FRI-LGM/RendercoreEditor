import { Float32ArrayObjectBase } from "./Float32ArrayObjectBase.js";
import { ErrorT2 } from "../ErrorT2.js";


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


	// copy(float32ArrayT2, copyValues = true) {
	// 	if (!(float32ArrayT2 instanceof Float32ArrayT2)) ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });

	// 	super.copy(float32ArrayT2).forEach((v, k) => { this[k] = copyValues ? Utility.copyValue(v) : v; });


	// 	return this;
	// }
	copy(float32ArrayT2, copyValues = true) {
		if (!(float32ArrayT2 instanceof Float32ArrayT2)) ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });

		return copyValues ? this.reduce((acc_this, v, k) => {
			return acc_this.replace(k, float32ArrayT2[k]);
		}, super.copy(float32ArrayT2)) : super.copy(float32ArrayT2);
	}
	// clone(cloneValues = true) {
	// 	return new Float32ArrayT2(
	// 		{
	// 			type: Utility.cloneValue(this.type)
	// 			name: Utility.cloneValue(this.name),
	// 		},
	// 		this.entries().map(([k, v], i) => { return cloneValues ? Utility.cloneValue(v) : v; })
	// 	);
	// }
	clone() {
		return new Float32ArrayT2(
			Object.assign(super.clone(), {}),
			this
		);
	}

	replace(key, value) {
		return (this[key] = value, this);
	}
};
