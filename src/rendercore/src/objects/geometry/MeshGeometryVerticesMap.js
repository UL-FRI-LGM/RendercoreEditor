import { GeometryVerticesMap } from "./GeometryVerticesMap.js";
import { ArrayT2 } from "../../core/ArrayT2.js";


export class MeshGeometryVerticesMap extends GeometryVerticesMap {


	static DEFAULT = {
		TYPE: "MeshGeometryVerticesMap",
		NAME: "",

		ENTRIES: new ArrayT2(
			{ name: `ENTRIES - ${MeshGeometryVerticesMap.name}` },
			...GeometryVerticesMap.DEFAULT.ENTRIES.clone(),
		),
	};


	constructor(args = {}, entries = undefined) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : MeshGeometryVerticesMap.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : MeshGeometryVerticesMap.DEFAULT.NAME,
			},
			(entries !== undefined) ? entries : MeshGeometryVerticesMap.DEFAULT.ENTRIES.clone()
		);
	}


	get positions() { return this.get("positions"); }
	set positions(positions) { this.set("positions", positions); }
	get normals() { return this.get("normals"); }
	set normals(normals) { this.set("normals", normals); }
	get uvs() { return this.get("uvs"); }
	set uvs(uvs) { this.set("uvs", uvs); }


	clone(cloneValues = true) {
		return new MeshGeometryVerticesMap(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
			},
			[...this.entries()].map(([k, v]) => { return cloneValues ? ([k, (v === Object(v)) ? v.clone() : v]) : [k, v]; }),
		);
	}
};
