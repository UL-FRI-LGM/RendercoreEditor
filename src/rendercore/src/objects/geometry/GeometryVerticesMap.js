import { GeometryMap } from "./GeometryMap.js";
import { ArrayT2 } from "../../core/ArrayT2.js";


export class GeometryVerticesMap extends GeometryMap {


	static DEFAULT = {
		TYPE: "GeometryVerticesMap",
		NAME: "",

		ENTRIES: new ArrayT2(
			{ name: `ENTRIES - ${GeometryVerticesMap.name}` },
			...GeometryMap.DEFAULT.ENTRIES.clone(),
		),
	};


	constructor(args = {}, entries = undefined) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : GeometryVerticesMap.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : GeometryVerticesMap.DEFAULT.NAME,
			},
			(entries !== undefined) ? entries : GeometryVerticesMap.DEFAULT.ENTRIES.clone()
		);
	}


	clone(cloneValues = true) {
		return new GeometryVerticesMap(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
			},
			[...this.entries()].map(([k, v]) => { return cloneValues ? ([k, (v === Object(v)) ? v.clone() : v]) : [k, v]; }),
		);
	}
};
