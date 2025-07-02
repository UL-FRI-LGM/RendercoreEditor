import { GeometryIndicesArray } from "./GeometryIndicesArray.js";
import { ArrayT2 } from "../../core/ArrayT2.js";


export class MeshGeometryIndicesArray extends GeometryIndicesArray {


	static DEFAULT = {
		TYPE: "MeshGeometryIndicesArray",
		NAME: "",

		ENTRIES: new ArrayT2(
			{ name: `ENTRIES - ${MeshGeometryIndicesArray.name}` },
			...GeometryIndicesArray.DEFAULT.ENTRIES.clone(),
		),

		ITEM_SIZE: 1,
	};


	constructor(args = {}, ...rest) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : MeshGeometryIndicesArray.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : MeshGeometryIndicesArray.DEFAULT.NAME,

				itemSize: (args.itemSize !== undefined) ? args.itemSize : MeshGeometryIndicesArray.DEFAULT.ITEM_SIZE,
			},
			...((rest !== undefined) ? rest : MeshGeometryIndicesArray.DEFAULT.ENTRIES.clone())
		);
	}


	clone(cloneValues = true) {
		return new MeshGeometryIndicesArray(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,

				itemSize: (this.itemSize === Object(this.itemSize)) ? this.itemSize.clone() : this.itemSize,
			},
			// ...this.map((x) => { return cloneValues ? ((x === Object(x)) ? x.clone() : x) : x; })
			...[...this.entries()].map(([k, v]) => { return cloneValues ? ((v === Object(v)) ? v.clone() : v) : v; })
		);
	}
};
