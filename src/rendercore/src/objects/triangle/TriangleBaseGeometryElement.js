import { MeshBaseGeometryElement } from "../mesh/MeshBaseGeometryElement.js";
import { Euler, Vector3 } from "../../RenderCore.js";
import { Transform } from "../../math/Transform.js";
import { MeshGeometryIndicesArray } from "../geometry/MeshGeometryIndicesArray.js";
import { MeshGeometryVerticesMap } from "../geometry/MeshGeometryVerticesMap.js";
import { GeometryArray } from "../geometry/GeometryArray.js";
import { Triangle3 } from "../../math/triangle/Triangle3.js";


export class TriangleBaseGeometryElement extends MeshBaseGeometryElement {


	static DEFAULT = {
		TYPE: `${TriangleBaseGeometryElement.name}`,
		NAME: "",

		TRANSFORM: new Transform(
			{
				translation: new Vector3(0, 0, 0),
				rotation: new Euler(0, 0, 0, "XYZ"),
				scaling: new Vector3(1, 1, 1),
			}
		),

		INDEXED: false,

		INDICES: TriangleBaseGeometryElement.assembleIndicesArray(
			{
				indexed: false,
				triangle: new Triangle3(
					new Vector3(-1.0, -1.0, +0.0),
					new Vector3(+1.0, -1.0, +0.0),
					new Vector3(+0.0, +1.0, +0.0),
				)
			}
		),
		VERTICES: TriangleBaseGeometryElement.assembleVerticesMap(
			{
				indexed: false,
				triangle: new Triangle3(
					new Vector3(-1.0, -1.0, +0.0),
					new Vector3(+1.0, -1.0, +0.0),
					new Vector3(+0.0, +1.0, +0.0),
				)
			}
		),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : TriangleBaseGeometryElement.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : TriangleBaseGeometryElement.DEFAULT.NAME,

				transform: (args.transform !== undefined) ? args.transform : TriangleBaseGeometryElement.DEFAULT.TRANSFORM.clone(),

				indexed: (args.indexed !== undefined) ? args.indexed : TriangleBaseGeometryElement.DEFAULT.INDEXED,

				indices: (args.indices !== undefined) ? args.indices : TriangleBaseGeometryElement.DEFAULT.INDICES.clone(),
				vertices: (args.vertices !== undefined) ? args.vertices : TriangleBaseGeometryElement.DEFAULT.VERTICES.clone(),
			}
		);
	}


	clone() {
		return new TriangleBaseGeometryElement(
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
		const indicesCount = (args.indexed) ? (3) : (3);
		const verticesCount = (args.indexed) ? (3) : (3);

		const array = new Array(indicesCount * itemSize);


		if (args.indexed) {
			array[0] = 0; //vertex 0
			array[1] = 1; //vertex 1
			array[2] = 2; //vertex 2
		} else {
			array[0] = 0; //vertex 0
			array[1] = 1; //vertex 1
			array[2] = 2; //vertex 2
		}


		return new MeshGeometryIndicesArray(
			{ 
				name: `INDICES - ${TriangleBaseGeometryElement.name}`,

				itemSize: 1,
			},
			...array
		);
	}
	static #assemblePositionsGeometryArray(args = {}) {
		const itemSize = 3;
		const indicesCount = (args.indexed) ? (3) : (3);
		const verticesCount = (args.indexed) ? (3) : (3);

		const array = new Array(verticesCount * itemSize);

		const triangle = args.triangle;
		const p1 = triangle.a;
		const p2 = triangle.b;
		const p3 = triangle.c;


		if (args.indexed) {
			array[0] = p1.x; array[1] = p1.y; array[2] = p1.z; //vertex 0
			array[3] = p2.x; array[4] = p2.y; array[5] = p2.z; //vertex 1
			array[6] = p3.x; array[7] = p3.y; array[8] = p3.z; //vertex 2
		} else {
			array[0] = p1.x; array[1] = p1.y; array[2] = p1.z; //vertex 0
			array[3] = p2.x; array[4] = p2.y; array[5] = p2.z; //vertex 1
			array[6] = p3.x; array[7] = p3.y; array[8] = p3.z; //vertex 2
		}


		return new GeometryArray(
			{
				name: `VERTICES - POSITIONS - ${TriangleBaseGeometryElement.name}`,

				itemSize: 3,
			},
			...array
		);
	}
	static #assembleNormalsGeometryArray(args = {}) {
		const itemSize = 3;
		const indicesCount = (args.indexed) ? (3) : (3);
		const verticesCount = (args.indexed) ? (3) : (3);

		const array = new Array(verticesCount * itemSize);

		const triangle = args.triangle;
		const n = triangle.computeNormal();


		if (args.indexed) {
			array[0] = n.x; array[1] = n.y; array[2] = n.z; //vertex 0
			array[3] = n.x; array[4] = n.y; array[5] = n.z; //vertex 1
			array[6] = n.x; array[7] = n.y; array[8] = n.z; //vertex 2
		} else {
			array[0] = n.x; array[1] = n.y; array[2] = n.z; //vertex 0
			array[3] = n.x; array[4] = n.y; array[5] = n.z; //vertex 1
			array[6] = n.x; array[7] = n.y; array[8] = n.z; //vertex 2
		}


		return new GeometryArray(
			{
				name: `VERTICES - NORMALS - ${TriangleBaseGeometryElement.name}`,

				itemSize: 3,
			},
			...array
		);
	}
	static #assembleUVsGeometryArray(args = {}) {
		const itemSize = 2;
		const indicesCount = (args.indexed) ? (3) : (3);
		const verticesCount = (args.indexed) ? (3) : (3);

		const array = new Array(verticesCount * itemSize);


		if (args.indexed) {
			array[0] = +0; array[1] = +1; //vertex 0
			array[2] = +0; array[3] = +0; //vertex 1
			array[4] = +1; array[5] = +0; //vertex 2
		} else {
			array[0] = +0; array[1] = +1; //vertex 0
			array[2] = +0; array[3] = +0; //vertex 1
			array[4] = +1; array[5] = +0; //vertex 2
		}


		return new GeometryArray(
			{
				name: `VERTICES - UVS - ${TriangleBaseGeometryElement.name}`,

				itemSize: 2,
			},
			...array
		);
	}
	static assembleVerticesMap(args = {}) {
		return new MeshGeometryVerticesMap(
			{ name: `VERTICES - ${TriangleBaseGeometryElement.name}` },
			[
				["positions", TriangleBaseGeometryElement.#assemblePositionsGeometryArray(args)],
				["normals", TriangleBaseGeometryElement.#assembleNormalsGeometryArray(args)],
				["uvs", TriangleBaseGeometryElement.#assembleUVsGeometryArray(args)],
			]
		);
	}
};
