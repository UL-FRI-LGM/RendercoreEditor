import { MapT2 } from "../../core/MapT2.js";
import { ArrayT2 } from "../../core/ArrayT2.js";


export class GeometryMap extends MapT2 {


	static DEFAULT = {
		TYPE: "GeometryMap",
		NAME: "",

		ENTRIES: new ArrayT2({ name: `ENTRIES - ${GeometryMap.name}` }),
	};


	constructor(args = {}, entries = undefined) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : GeometryMap.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : GeometryMap.DEFAULT.NAME,
			},
			(entries !== undefined) ? entries : GeometryMap.DEFAULT.ENTRIES.clone()
		);
	}


	get count() { return [...this.entries()].reduce((acc, [k, v]) => { return Math.min(acc, v.count); }, Infinity); }
	// set count(count) { this.#count = count; }


	clone(cloneValues = true) {
		return new GeometryMap(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
			},
			[...this.entries()].map(([k, v]) => { return cloneValues ? ([k, (v === Object(v)) ? v.clone() : v]) : [k, v]; }),
		);
	}
};
