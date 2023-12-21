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


	clone() {
		console.warn("clone map", this.size);
		const originalMap = this;
		const clonedMap = new MapT2();

		originalMap.forEach((value, key) => {
			const clonedKey = (key === Object(key)) ? x.clone() : key;
			const clonedValue = (value === Object(value)) ? value.clone() : value;

			clonedMap.set(clonedKey, clonedValue);
		});
	

		return clonedMap;
	}
};
