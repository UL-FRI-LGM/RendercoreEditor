import { MeshBaseGeometryElement } from "../mesh/MeshBaseGeometryElement.js";
import { Euler, Vector2, Vector3 } from "../../RenderCore.js";
import { Transform } from "../../math/Transform.js";
import { MeshGeometryIndicesArray } from "../geometry/MeshGeometryIndicesArray.js";
import { MeshGeometryVerticesMap } from "../geometry/MeshGeometryVerticesMap.js";
import { GeometryArray } from "../geometry/GeometryArray.js";
import { Dimension } from "../../math/Dimension.js";


export class QuadBaseGeometryElement extends MeshBaseGeometryElement {


	static DEFAULT = {
		TYPE: `${QuadBaseGeometryElement.name}`,
		NAME: "",

		TRANSFORM: new Transform(
			{
				translation: new Vector3(0, 0, 0),
				rotation: new Euler(0, 0, 0, "XYZ"),
				scaling: new Vector3(1, 1, 1),
			}
		),

		INDEXED: false,

		INDICES: QuadBaseGeometryElement.assembleIndicesArray(
			{
				indexed: false,
				dimension: new Dimension(new Vector2(-1.0, -1.0), new Vector2(+1.0, +1.0))
			}
		),
		VERTICES: QuadBaseGeometryElement.assembleVerticesMap(
			{
				indexed: false,
				dimension: new Dimension(new Vector2(-1.0, -1.0), new Vector2(+1.0, +1.0))
			}
		),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : QuadBaseGeometryElement.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : QuadBaseGeometryElement.DEFAULT.NAME,

				transform: (args.transform !== undefined) ? args.transform : QuadBaseGeometryElement.DEFAULT.TRANSFORM.clone(),

				indexed: (args.indexed !== undefined) ? args.indexed : QuadBaseGeometryElement.DEFAULT.INDEXED,

				indices: (args.indices !== undefined) ? args.indices : QuadBaseGeometryElement.DEFAULT.INDICES.clone(),
				vertices: (args.vertices !== undefined) ? args.vertices : QuadBaseGeometryElement.DEFAULT.VERTICES.clone(),
			}
		);
	}


	clone() {
		return new QuadBaseGeometryElement(
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
		const indicesCount = (args.indexed) ? (6) : (6);
		const verticesCount = (args.indexed) ? (4) : (6);

		const array = new Array(indicesCount * itemSize);


		if (args.indexed) {
			array[0] = 0; //vertex 0
			array[1] = 1; //vertex 1
			array[2] = 2; //vertex 2
			array[3] = 2; //vertex 2
			array[4] = 1; //vertex 1
			array[5] = 3; //vertex 3
		} else {
			array[0] = 0; //vertex 0
			array[1] = 1; //vertex 1
			array[2] = 2; //vertex 2
			array[3] = 3; //vertex 2
			array[4] = 4; //vertex 1
			array[5] = 5; //vertex 3
		}


		return new MeshGeometryIndicesArray(
			{ 
				name: `INDICES - ${QuadBaseGeometryElement.name}`,

				itemSize: 1,
			},
			...array
		);
	}
	static #assemblePositionsGeometryArray(args = {}) {
		const itemSize = 3;
		const indicesCount = (args.indexed) ? (6) : (6);
		const verticesCount = (args.indexed) ? (4) : (6);

		const array = new Array(verticesCount * itemSize);

		const dimension = args.dimension;
		const dmin = dimension.min;
		const dmax = dimension.max;


		if (args.indexed) {
			array[0 ] = dmin.x; array[1 ] = dmin.y; array[2 ] = 0; //vertex 0
			array[3 ] = dmax.x; array[4 ] = dmin.y; array[5 ] = 0; //vertex 1
			array[6 ] = dmin.x; array[7 ] = dmax.y; array[8 ] = 0; //vertex 2
			array[9 ] = dmax.x; array[10] = dmax.y; array[11] = 0; //vertex 3
		} else {
			array[0 ] = dmin.x; array[1 ] = dmin.y; array[2 ] = 0; //vertex 0
			array[3 ] = dmax.x; array[4 ] = dmin.y; array[5 ] = 0; //vertex 1
			array[6 ] = dmin.x; array[7 ] = dmax.y; array[8 ] = 0; //vertex 2
			array[9 ] = dmin.x; array[10] = dmax.y; array[11] = 0; //vertex 2
			array[12] = dmax.x; array[13] = dmin.y; array[14] = 0; //vertex 1
			array[15] = dmax.x; array[16] = dmax.y; array[17] = 0; //vertex 3
		}


		return new GeometryArray(
			{
				name: `VERTICES - POSITIONS - ${QuadBaseGeometryElement.name}`,

				itemSize: 3,
			},
			...array
		);
	}
	static #assembleNormalsGeometryArray(args = {}) {
		const itemSize = 3;
		const indicesCount = (args.indexed) ? (36) : (36);
		const verticesCount = (args.indexed) ? (8) : (36);

		const array = new Array(verticesCount * itemSize);


		if (args.indexed) {
			array[0 ] = +0; array[1 ] = +0; array[2 ] = +1; //vertex 0
			array[3 ] = +0; array[4 ] = +0; array[5 ] = +1; //vertex 1
			array[6 ] = +0; array[7 ] = +0; array[8 ] = +1; //vertex 2
			array[9 ] = +0; array[10] = +0; array[11] = +1; //vertex 3
		} else {
			array[0 ] = +0; array[1 ] = +0; array[2 ] = +1; //vertex 0
			array[3 ] = +0; array[4 ] = +0; array[5 ] = +1; //vertex 1
			array[6 ] = +0; array[7 ] = +0; array[8 ] = +1; //vertex 2
			array[9 ] = +0; array[10] = +0; array[11] = +1; //vertex 2
			array[12] = +0; array[13] = +0; array[14] = +1; //vertex 1
			array[15] = +0; array[16] = +0; array[17] = +1; //vertex 3
		}


		return new GeometryArray(
			{
				name: `VERTICES - NORMALS - ${QuadBaseGeometryElement.name}`,

				itemSize: 3,
			},
			...array
		);
	}
	static #assembleUVsGeometryArray(args = {}) {
		const itemSize = 2;
		const indicesCount = (args.indexed) ? (6) : (6);
		const verticesCount = (args.indexed) ? (4) : (6);

		const array = new Array(verticesCount * itemSize);


		if (args.indexed) {
			array[0 ] = +0; array[1 ] = +0; //vertex 0
			array[2 ] = +1; array[3 ] = +0; //vertex 1
			array[4 ] = +0; array[5 ] = +1; //vertex 2
			array[6 ] = +1; array[7 ] = +1; //vertex 3
		} else {
			array[0 ] = +0; array[1 ] = +0; //vertex 0
			array[2 ] = +1; array[3 ] = +0; //vertex 1
			array[4 ] = +0; array[5 ] = +1; //vertex 2
			array[6 ] = +0; array[7 ] = +1; //vertex 2
			array[8 ] = +1; array[9 ] = +0; //vertex 1
			array[10] = +1; array[11] = +1; //vertex 3
		}


		return new GeometryArray(
			{
				name: `VERTICES - UVS - ${QuadBaseGeometryElement.name}`,

				itemSize: 2,
			},
			...array
		);
	}
	static assembleVerticesMap(args = {}) {
		return new MeshGeometryVerticesMap(
			{ name: `VERTICES - ${QuadBaseGeometryElement.name}` },
			[
				["positions", QuadBaseGeometryElement.#assemblePositionsGeometryArray(args)],
				["normals", QuadBaseGeometryElement.#assembleNormalsGeometryArray(args)],
				["uvs", QuadBaseGeometryElement.#assembleUVsGeometryArray(args)],
			]
		);
	}
};
