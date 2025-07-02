import { MeshBaseGeometryElement } from "../../mesh/MeshBaseGeometryElement.js";
import { CubeBaseGeometryElement } from "../../cube/CubeBaseGeometryElement.js";
import { MeshGeometryIndicesArray } from "../../geometry/MeshGeometryIndicesArray.js";
import { MeshGeometryVerticesMap } from "../../geometry/MeshGeometryVerticesMap.js";
import { GeometryArray } from "../../geometry/GeometryArray.js";


export class VertexNormalBaseGeometryElement extends MeshBaseGeometryElement {


	static DEFAULT = {
		TYPE: `${VertexNormalBaseGeometryElement.name}`,
		NAME: "",

		TRANSFORM: VertexNormalBaseGeometryElement.assembleTransform(
			{
				indexed: false,
				element: new CubeBaseGeometryElement()
			}
		),

		INDEXED: false,

		INDICES: VertexNormalBaseGeometryElement.assembleIndicesArray(
			{
				indexed: false,
				element: new CubeBaseGeometryElement()
			}
		),
		VERTICES: VertexNormalBaseGeometryElement.assembleVerticesMap(
			{
				indexed: false,
				element: new CubeBaseGeometryElement()
			}
		),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : VertexNormalBaseGeometryElement.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : VertexNormalBaseGeometryElement.DEFAULT.NAME,

				transform: (args.transform !== undefined) ? args.transform : VertexNormalBaseGeometryElement.DEFAULT.TRANSFORM.clone(),

				indexed: (args.indexed !== undefined) ? args.indexed : VertexNormalBaseGeometryElement.DEFAULT.INDEXED,

				indices: (args.indices !== undefined) ? args.indices : VertexNormalBaseGeometryElement.DEFAULT.INDICES.clone(),
				vertices: (args.vertices !== undefined) ? args.vertices : VertexNormalBaseGeometryElement.DEFAULT.VERTICES.clone(),
			}
		);
	}


	clone() {
		return new VertexNormalBaseGeometryElement(
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

	static assembleTransform(args = {}) {
		const targetElement = args.element;
		const targetElementTransform = targetElement.transform;

		return targetElementTransform.clone();
	}

	static assembleIndicesArray(args = {}) {
		const targetElement = args.element;
		const targetElementIndices = targetElement.indices;
		const targetElementVertices = targetElement.vertices;


		const itemSize = 1;
		const indicesCount = (targetElement.indexed) ? (targetElementIndices.count * 2) : (targetElementVertices.count * 2);
		const verticesCount = (targetElement.indexed) ? (targetElementVertices.count * 2) : (targetElementVertices.count * 2);


		const array = new Array(indicesCount * itemSize);


		if (targetElement.indexed) {
			for (let i = 0; i < array.length/2/itemSize; i++) {
				array[i*2 + 0] = i*2 + 0; //vertex 0
				array[i*2 + 1] = i*2 + 1; //vertex 1
			}
		} else {
			for (let i = 0; i < array.length/2/itemSize; i++) {
				array[i*2 + 0] = i*2 + 0; //vertex 0
				array[i*2 + 1] = i*2 + 1; //vertex 1
			}
		}


		return new MeshGeometryIndicesArray(
			{ 
				name: `INDICES - ${VertexNormalBaseGeometryElement.name}`,

				itemSize: 1,
			},
			...array
		);
	}
	static #assemblePositionsGeometryArray(args = {}) {
		const targetElement = args.element;
		const targetElementIndices = targetElement.indices;
		const targetElementVertices = targetElement.vertices;


		const itemSize = 3;
		const indicesCount = (targetElement.indexed) ? (targetElementIndices.count * 2) : (targetElementVertices.count * 2);
		const verticesCount = (targetElement.indexed) ? (targetElementVertices.count * 2) : (targetElementVertices.count * 2);


		const array = new Array(verticesCount * itemSize);


		if (targetElement.indexed) {
			for (let v = 0; v < array.length/2/itemSize; v++) {
				array[v*2*itemSize + 0] = targetElementVertices.positions[targetElementIndices[v]*itemSize + 0];
				array[v*2*itemSize + 1] = targetElementVertices.positions[targetElementIndices[v]*itemSize + 1];
				array[v*2*itemSize + 2] = targetElementVertices.positions[targetElementIndices[v]*itemSize + 2]; //vertex 0
				array[v*2*itemSize + 3] = targetElementVertices.positions[targetElementIndices[v]*itemSize + 0];
				array[v*2*itemSize + 4] = targetElementVertices.positions[targetElementIndices[v]*itemSize + 1];
				array[v*2*itemSize + 5] = targetElementVertices.positions[targetElementIndices[v]*itemSize + 2]; //vertex 1
			}
		} else {
			for (let v = 0; v < array.length/2/itemSize; v++) {
				array[v*2*itemSize + 0] = targetElementVertices.positions[v*itemSize + 0];
				array[v*2*itemSize + 1] = targetElementVertices.positions[v*itemSize + 1];
				array[v*2*itemSize + 2] = targetElementVertices.positions[v*itemSize + 2]; //vertex 0
				array[v*2*itemSize + 3] = targetElementVertices.positions[v*itemSize + 0];
				array[v*2*itemSize + 4] = targetElementVertices.positions[v*itemSize + 1];
				array[v*2*itemSize + 5] = targetElementVertices.positions[v*itemSize + 2]; //vertex 1
			}
		}


		return new GeometryArray(
			{
				name: `VERTICES - POSITIONS - ${VertexNormalBaseGeometryElement.name}`,

				itemSize: 3,
			},
			...array
		);
	}
	static #assembleNormalsGeometryArray(args = {}) {
		const targetElement = args.element;
		const targetElementIndices = targetElement.indices;
		const targetElementVertices = targetElement.vertices;


		const itemSize = 3;
		const indicesCount = (targetElement.indexed) ? (targetElementIndices.count * 2) : (targetElementVertices.count * 2);
		const verticesCount = (targetElement.indexed) ? (targetElementVertices.count * 2) : (targetElementVertices.count * 2);


		const array = new Array(verticesCount * itemSize);


		if (targetElement.indexed) {
			for (let v = 0; v < array.length/2/itemSize; v++) {
				array[v*2*itemSize + 0] = 0;
				array[v*2*itemSize + 1] = 0;
				array[v*2*itemSize + 2] = 0; //vertex 0
				array[v*2*itemSize + 3] = 0;
				array[v*2*itemSize + 4] = 0;
				array[v*2*itemSize + 5] = 0; //vertex 1
			}
		} else {
			for (let v = 0; v < array.length/2/itemSize; v++) {
				array[v*2*itemSize + 0] = 0;
				array[v*2*itemSize + 1] = 0;
				array[v*2*itemSize + 2] = 0; //vertex 0
				array[v*2*itemSize + 3] = 0;
				array[v*2*itemSize + 4] = 0;
				array[v*2*itemSize + 5] = 0; //vertex 1
			}
		}


		return new GeometryArray(
			{
				name: `VERTICES - NORMALS - ${VertexNormalBaseGeometryElement.name}`,

				itemSize: 3,
			},
			...array
		);
	}
	static #assembleUVsGeometryArray(args = {}) {
		const targetElement = args.element;
		const targetElementIndices = targetElement.indices;
		const targetElementVertices = targetElement.vertices;


		const itemSize = 2;
		const indicesCount = (targetElement.indexed) ? (targetElementIndices.count * 2) : (targetElementVertices.count * 2);
		const verticesCount = (targetElement.indexed) ? (targetElementVertices.count * 2) : (targetElementVertices.count * 2);


		const array = new Array(verticesCount * itemSize);


		if (targetElement.indexed) {
			for (let v = 0; v < array.length/2/itemSize; v++) {
				array[v*2*itemSize + 0] = 0;
				array[v*2*itemSize + 1] = 0; //vertex 0
				array[v*2*itemSize + 2] = 1;
				array[v*2*itemSize + 3] = 1; //vertex 1
			}
		} else {
			for (let v = 0; v < array.length/2/itemSize; v++) {
				array[v*2*itemSize + 0] = 0;
				array[v*2*itemSize + 1] = 0; //vertex 0
				array[v*2*itemSize + 2] = 1;
				array[v*2*itemSize + 3] = 1; //vertex 1
			}
		}


		return new GeometryArray(
			{
				name: `VERTICES - UVS - ${VertexNormalBaseGeometryElement.name}`,

				itemSize: 2,
			},
			...array
		);
	}
	static #assembleIndicatorsGeometryArray(args = {}) {
		const targetElement = args.element;
		const targetElementIndices = targetElement.indices;
		const targetElementVertices = targetElement.vertices;


		const itemSize = 1;
		const indicesCount = (targetElement.indexed) ? (targetElementIndices.count * 2) : (targetElementVertices.count * 2);
		const verticesCount = (targetElement.indexed) ? (targetElementVertices.count * 2) : (targetElementVertices.count * 2);


		const array = new Array(verticesCount * itemSize);


		if (targetElement.indexed) {
			for (let v = 0; v < array.length/2/itemSize; v++) {
				array[v*2*itemSize + 0] = 0; //vertex 0
				array[v*2*itemSize + 1] = 1; //vertex 1
			}
		} else {
			for (let v = 0; v < array.length/2/itemSize; v++) {
				array[v*2*itemSize + 0] = 0; //vertex 0
				array[v*2*itemSize + 1] = 1; //vertex 1
			}
		}


		return new GeometryArray(
			{
				name: `VERTICES - INDICATORS - ${VertexNormalBaseGeometryElement.name}`,

				itemSize: 1,
			},
			...array
		);
	}
	static assembleVerticesMap(args = {}) {
		return new MeshGeometryVerticesMap(
			{ name: `VERTICES - ${VertexNormalBaseGeometryElement.name}` },
			[
				["positions", VertexNormalBaseGeometryElement.#assemblePositionsGeometryArray(args)],
				["normals", VertexNormalBaseGeometryElement.#assembleNormalsGeometryArray(args)],
				["uvs", VertexNormalBaseGeometryElement.#assembleUVsGeometryArray(args)],
				
				["indicators", VertexNormalBaseGeometryElement.#assembleIndicatorsGeometryArray(args)],
			]
		);
	}
};
