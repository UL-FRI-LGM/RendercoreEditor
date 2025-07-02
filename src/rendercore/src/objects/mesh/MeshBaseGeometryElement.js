import { GroupBaseGeometryElement } from "../group/GroupBaseGeometryElement.js";
import { Euler, Vector3 } from "../../RenderCore.js";
import { Transform } from "../../math/Transform.js";
import { MeshGeometryIndicesArray } from "../geometry/MeshGeometryIndicesArray.js";
import { MeshGeometryVerticesMap } from "../geometry/MeshGeometryVerticesMap.js";


export class MeshBaseGeometryElement extends GroupBaseGeometryElement {


	static DEFAULT = {
		TYPE: `${MeshBaseGeometryElement.name}`,
		NAME: "",

		TRANSFORM: new Transform(
			{
				translation: new Vector3(0, 0, 0),
				rotation: new Euler(0, 0, 0, "XYZ"),
				scaling: new Vector3(1, 1, 1),
			}
		),

		INDEXED: false,

		INDICES: new MeshGeometryIndicesArray(),
		VERTICES: new MeshGeometryVerticesMap(),
	};


	#indexed;

	#indices;
	#vertices;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : MeshBaseGeometryElement.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : MeshBaseGeometryElement.DEFAULT.NAME,

				transform: (args.transform !== undefined) ? args.transform : MeshBaseGeometryElement.DEFAULT.TRANSFORM.clone(),
			}
		);
		this.indexed = (args.indexed !== undefined) ? args.indexed : MeshBaseGeometryElement.DEFAULT.INDEXED;

		this.indices = (args.indices !== undefined) ? args.indices : MeshBaseGeometryElement.DEFAULT.INDICES.clone();
		this.vertices = (args.vertices !== undefined) ? args.vertices : MeshBaseGeometryElement.DEFAULT.VERTICES.clone();
	}


	get indexed() { return this.#indexed; }
	set indexed(indexed) { this.#indexed = indexed; }

	get indices() { return this.#indices; }
	set indices(indices) { this.#indices = indices; }
	get vertices() { return this.#vertices; }
	set vertices(vertices) { this.#vertices = vertices; }


	clone() {
		return new MeshBaseGeometryElement(
			{
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				transform: (this.transform === Object(this.transform)) ? this.transform.clone() : this.transform,

				indexed: (this.indexed === Object(this.indexed)) ? this.indexed.clone() : this.indexed,

				indices: (this.indices === Object(this.indices)) ? this.indices.clone() : this.indices,
				vertices: (this.vertices === Object(this.vertices)) ? this.vertices.clone() : this.vertices,
			}
		);
	}
};
