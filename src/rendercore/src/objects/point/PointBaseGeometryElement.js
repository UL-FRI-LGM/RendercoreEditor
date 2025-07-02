import { MeshBaseGeometryElement } from "../mesh/MeshBaseGeometryElement.js";
import { Euler, Vector3 } from "../../RenderCore.js";
import { Transform } from "../../math/Transform.js";
import { MeshGeometryIndicesArray } from "../geometry/MeshGeometryIndicesArray.js";
import { MeshGeometryVerticesMap } from "../geometry/MeshGeometryVerticesMap.js";
import { GeometryArray } from "../geometry/GeometryArray.js";
import { Line3 } from "../../math/line/Line3.js";


export class PointBaseGeometryElement extends MeshBaseGeometryElement {


	static DEFAULT = {
		TYPE: `${PointBaseGeometryElement.name}`,
		NAME: "",

		TRANSFORM: new Transform(
			{
				translation: new Vector3(0, 0, 0),
				rotation: new Euler(0, 0, 0, "XYZ"),
				scaling: new Vector3(1, 1, 1),
			}
		),

		INDEXED: false,

		INDICES: PointBaseGeometryElement.assembleIndicesArray(
			{
				indexed: false,
				point: new Line3(
					new Vector3(+0.0, +0.0, +0.0),
				)
			}
		),
		VERTICES: PointBaseGeometryElement.assembleVerticesMap(
			{
				indexed: false,
				point: new Line3(
					new Vector3(+0.0, +0.0, +0.0),
				)
			}
		),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : PointBaseGeometryElement.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : PointBaseGeometryElement.DEFAULT.NAME,

				transform: (args.transform !== undefined) ? args.transform : PointBaseGeometryElement.DEFAULT.TRANSFORM.clone(),

				indexed: (args.indexed !== undefined) ? args.indexed : PointBaseGeometryElement.DEFAULT.INDEXED,

				indices: (args.indices !== undefined) ? args.indices : PointBaseGeometryElement.DEFAULT.INDICES.clone(),
				vertices: (args.vertices !== undefined) ? args.vertices : PointBaseGeometryElement.DEFAULT.VERTICES.clone(),
			}
		);
	}


	clone() {
		return new PointBaseGeometryElement(
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
		const indicesCount = (args.indexed) ? (1) : (1);
		const verticesCount = (args.indexed) ? (1) : (1);

		const array = new Array(indicesCount * itemSize);


		if (args.indexed) {
			array[0] = 0; //vertex 0
		} else {
			array[0] = 0; //vertex 0
		}


		return new MeshGeometryIndicesArray(
			{ 
				name: `INDICES - ${PointBaseGeometryElement.name}`,

				itemSize: 1,
			},
			...array
		);
	}
	static #assemblePositionsGeometryArray(args = {}) {
		const itemSize = 3;
		const indicesCount = (args.indexed) ? (1) : (1);
		const verticesCount = (args.indexed) ? (1) : (1);

		const array = new Array(verticesCount * itemSize);

		const point = args.point;
		const p1 = point.a;


		if (args.indexed) {
			array[0] = p1.x; array[1] = p1.y; array[2] = p1.z; //vertex 0
		} else {
			array[0] = p1.x; array[1] = p1.y; array[2] = p1.z; //vertex 0
		}


		return new GeometryArray(
			{
				name: `VERTICES - POSITIONS - ${PointBaseGeometryElement.name}`,

				itemSize: 3,
			},
			...array
		);
	}
	static #assembleNormalsGeometryArray(args = {}) {
		const itemSize = 3;
		const indicesCount = (args.indexed) ? (1) : (1);
		const verticesCount = (args.indexed) ? (1) : (1);

		const array = new Array(verticesCount * itemSize);

		const point = args.point;
		const p1 = point.a;


		if (args.indexed) {
			array[0] = +0; array[1] = +0; array[2] = +0; //vertex 0
		} else {
			array[0] = +0; array[1] = +0; array[2] = +0; //vertex 0
		}


		return new GeometryArray(
			{
				name: `VERTICES - NORMALS - ${PointBaseGeometryElement.name}`,

				itemSize: 3,
			},
			...array
		);
	}
	static #assembleUVsGeometryArray(args = {}) {
		const itemSize = 2;
		const indicesCount = (args.indexed) ? (1) : (1);
		const verticesCount = (args.indexed) ? (1) : (1);

		const array = new Array(verticesCount * itemSize);


		if (args.indexed) {
			array[0] = +0; array[1] = +0; //vertex 0
		} else {
			array[0] = +0; array[1] = +0; //vertex 0
		}


		return new GeometryArray(
			{
				name: `VERTICES - UVS - ${PointBaseGeometryElement.name}`,

				itemSize: 2,
			},
			...array
		);
	}
	static assembleVerticesMap(args = {}) {
		return new MeshGeometryVerticesMap(
			{ name: `VERTICES - ${PointBaseGeometryElement.name}` },
			[
				["positions", PointBaseGeometryElement.#assemblePositionsGeometryArray(args)],
				["normals", PointBaseGeometryElement.#assembleNormalsGeometryArray(args)],
				["uvs", PointBaseGeometryElement.#assembleUVsGeometryArray(args)],
			]
		);
	}
};
