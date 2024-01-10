import { MapObjectBase } from "./MapObjectBase.js";


export class MapT2 extends MapObjectBase {


	static DEFAULT = {
		TYPE: "MapT2",
		NAME: "",
	};


	constructor(args = {}, iterable = undefined) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : MapT2.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : MapT2.DEFAULT.NAME,
			},
			iterable
		);
	}


	// clone() {
	// 	// return new MapT2(this, [...this]);
	// 	return new MapT2(this, this);
	// }

	clone() {
		// const originalMap = this;
		// const clonedMap = new MapT2();

		// originalMap.forEach((value, key) => {
		// 	const clonedKey = (key === Object(key)) ? x.clone() : key;
		// 	const clonedValue = (value === Object(value)) ? value.clone() : value;

		// 	clonedMap.set(clonedKey, clonedValue);
		// });
	

		// return clonedMap;
		return new MapT2(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
			},
			// [...this].map((e) => { return [(e[0] === Object(e[0])) ? e[0].clone() : e[0], (e[1] === Object(e[1])) ? e[1].clone() : e[1]]; })
			[...this.entries()].map((e) => { return [(e[0] === Object(e[0])) ? e[0].clone() : e[0], (e[1] === Object(e[1])) ? e[1].clone() : e[1]]; })
		);
	}
};
