import { SetObjectBase } from "./SetObjectBase.js";


export class SetT2 extends SetObjectBase {


	static DEFAULT = {
		TYPE: "SetT2",
		NAME: "",
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : SetT2.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SetT2.DEFAULT.NAME,
			}
		);
	}


	clone() {
		const originalSet = this;
		const clonedSet = new SetT2();

		originalSet.forEach((value, key) => {
			// const clonedKey = (key === Object(key)) ? x.clone() : key;
			const clonedValue = (value === Object(value)) ? value.clone() : value;

			clonedSet.add(clonedValue);
		});
	

		return clonedSet;
	}
};
