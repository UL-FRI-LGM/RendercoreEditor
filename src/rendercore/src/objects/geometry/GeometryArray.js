import { ArrayT2 } from "../../core/ArrayT2.js";


export class GeometryArray extends ArrayT2 {


	static DEFAULT = {
		TYPE: "GeometryArray",
		NAME: "",

		ENTRIES: new ArrayT2({ name: `ENTRIES - ${GeometryArray.name}` }),

		ITEM_SIZE: 1,
	};


	#itemSize = GeometryArray.DEFAULT.ITEM_SIZE;


	constructor(args = {}, ...rest) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : GeometryArray.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : GeometryArray.DEFAULT.NAME,
			},
			...((rest !== undefined) ? rest : GeometryArray.DEFAULT.ENTRIES.clone())
		);

		this.itemSize = (args.itemSize !== undefined) ? args.itemSize : this.itemSize;
	}


	get itemSize() { return this.#itemSize; }
	set itemSize(itemSize) { this.#itemSize = itemSize; }

	get count() { return (this.length / this.itemSize); }
	// set count(count) { this.#count = count; }


	clone(cloneValues = true) {
		return new GeometryArray(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,

				itemSize: (this.itemSize === Object(this.itemSize)) ? this.itemSize.clone() : this.itemSize,
			},
			// ...this.map((x) => { return cloneValues ? ((x === Object(x)) ? x.clone() : x) : x; })
			...[...this.entries()].map(([k, v]) => { return cloneValues ? ((v === Object(v)) ? v.clone() : v) : v; }),
		);
	}


	// getItemAt(itemIndex) {
	// 	const item = new Array(this.itemSize);

	// 	for (let ki = 0; ki < this.itemSize; ki++) {
	// 		item[ki] = this[itemIndex * this.itemSize + ki];
	// 	}


	// 	return item;
	// }
	getItemAt(itemIndex) {
		return [...new Array(this.itemSize)].map((vi, ki) => {
			return this[itemIndex * this.itemSize + ki]
		});
	}
};
