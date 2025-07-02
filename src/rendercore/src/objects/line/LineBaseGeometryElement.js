import { MeshBaseGeometryElement } from "../mesh/MeshBaseGeometryElement.js";
import { Euler, Vector3 } from "../../RenderCore.js";
import { Transform } from "../../math/Transform.js";
import { MeshGeometryIndicesArray } from "../geometry/MeshGeometryIndicesArray.js";
import { MeshGeometryVerticesMap } from "../geometry/MeshGeometryVerticesMap.js";
import { GeometryArray } from "../geometry/GeometryArray.js";
import { Line3 } from "../../math/line/Line3.js";


export class LineBaseGeometryElement extends MeshBaseGeometryElement {


	static DEFAULT = {
		TYPE: `${LineBaseGeometryElement.name}`,
		NAME: "",

		TRANSFORM: new Transform(
			{
				translation: new Vector3(0, 0, 0),
				rotation: new Euler(0, 0, 0, "XYZ"),
				scaling: new Vector3(1, 1, 1),
			}
		),

		INDEXED: false,

		INDICES: LineBaseGeometryElement.assembleIndicesArray(
			{
				indexed: false,
				line: new Line3(
					new Vector3(-1.0, -1.0, +0.0),
					new Vector3(+1.0, +1.0, +0.0),
				)
			}
		),
		VERTICES: LineBaseGeometryElement.assembleVerticesMap(
			{
				indexed: false,
				line: new Line3(
					new Vector3(-1.0, -1.0, +0.0),
					new Vector3(+1.0, +1.0, +0.0),
				)
			}
		),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : LineBaseGeometryElement.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : LineBaseGeometryElement.DEFAULT.NAME,

				transform: (args.transform !== undefined) ? args.transform : LineBaseGeometryElement.DEFAULT.TRANSFORM.clone(),

				indexed: (args.indexed !== undefined) ? args.indexed : LineBaseGeometryElement.DEFAULT.INDEXED,

				indices: (args.indices !== undefined) ? args.indices : LineBaseGeometryElement.DEFAULT.INDICES.clone(),
				vertices: (args.vertices !== undefined) ? args.vertices : LineBaseGeometryElement.DEFAULT.VERTICES.clone(),
			}
		);
	}


	clone() {
		return new LineBaseGeometryElement(
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

	static assembleIndicesArray(args = {}) {
		const itemSize = 1;
		const indicesCount = (args.indexed) ? (2) : (2);
		const verticesCount = (args.indexed) ? (2) : (2);

		const array = new Array(indicesCount * itemSize);


		if (args.indexed) {
			array[0] = 0; //vertex 0
			array[1] = 1; //vertex 1
		} else {
			array[0] = 0; //vertex 0
			array[1] = 1; //vertex 1
		}


		return new MeshGeometryIndicesArray(
			{ 
				name: `INDICES - ${LineBaseGeometryElement.name}`,

				itemSize: 1,
			},
			...array
		);
	}
	static #assemblePositionsGeometryArray(args = {}) {
		const itemSize = 3;
		const indicesCount = (args.indexed) ? (2) : (2);
		const verticesCount = (args.indexed) ? (2) : (2);

		const array = new Array(verticesCount * itemSize);

		const line = args.line;
		const p1 = line.a;
		const p2 = line.b;


		if (args.indexed) {
			array[0] = p1.x; array[1] = p1.y; array[2] = p1.z; //vertex 0
			array[3] = p2.x; array[4] = p2.y; array[5] = p2.z; //vertex 1
		} else {
			array[0] = p1.x; array[1] = p1.y; array[2] = p1.z; //vertex 0
			array[3] = p2.x; array[4] = p2.y; array[5] = p2.z; //vertex 1
		}


		return new GeometryArray(
			{
				name: `VERTICES - POSITIONS - ${LineBaseGeometryElement.name}`,

				itemSize: 3,
			},
			...array
		);
	}
	static #assembleNormalsGeometryArray(args = {}) {
		const itemSize = 3;
		const indicesCount = (args.indexed) ? (2) : (2);
		const verticesCount = (args.indexed) ? (2) : (2);

		const array = new Array(verticesCount * itemSize);

		const line = args.line;
		const p1 = line.a;
		const p2 = line.b;


		if (args.indexed) {
			array[0] = p1.x; array[1] = p1.y; array[2] = p1.z; //vertex 0
			array[3] = p2.x; array[4] = p2.y; array[5] = p2.z; //vertex 1
		} else {
			array[0] = p1.x; array[1] = p1.y; array[2] = p1.z; //vertex 0
			array[3] = p2.x; array[4] = p2.y; array[5] = p2.z; //vertex 1
		}


		return new GeometryArray(
			{
				name: `VERTICES - NORMALS - ${LineBaseGeometryElement.name}`,

				itemSize: 3,
			},
			...array
		);
	}
	static #assembleUVsGeometryArray(args = {}) {
		const itemSize = 2;
		const indicesCount = (args.indexed) ? (2) : (2);
		const verticesCount = (args.indexed) ? (2) : (2);

		const array = new Array(verticesCount * itemSize);


		if (args.indexed) {
			array[0] = +0; array[1] = +0; //vertex 0
			array[2] = +1; array[3] = +1; //vertex 1
		} else {
			array[0] = +0; array[1] = +0; //vertex 0
			array[2] = +1; array[3] = +1; //vertex 1
		}


		return new GeometryArray(
			{
				name: `VERTICES - UVS - ${LineBaseGeometryElement.name}`,

				itemSize: 2,
			},
			...array
		);
	}
	static assembleVerticesMap(args = {}) {
		return new MeshGeometryVerticesMap(
			{ name: `VERTICES - ${LineBaseGeometryElement.name}` },
			[
				["positions", LineBaseGeometryElement.#assemblePositionsGeometryArray(args)],
				["normals", LineBaseGeometryElement.#assembleNormalsGeometryArray(args)],
				["uvs", LineBaseGeometryElement.#assembleUVsGeometryArray(args)],
			]
		);
	}
};
