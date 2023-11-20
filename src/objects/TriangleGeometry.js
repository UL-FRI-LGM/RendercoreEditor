import { MeshGeometry } from "./MeshGeometry.js";
import { Vector3 } from "../math/Vector3.js";


export class TriangleGeometry extends MeshGeometry {


	static DEFAULT = {
		TYPE: "TriangleGeometry",
		NAME: "",

		INDEXED: false,
		BASE_GEOMETRY: {
			positions: [new Vector3(0, 1, 0), new Vector3(-1, -1, 0), new Vector3(1, -1, 0)],
		},
	};
	

	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : TriangleGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : TriangleGeometry.DEFAULT.NAME,

				indexed: (args.indexed !== undefined) ? args.indexed : TriangleGeometry.DEFAULT.INDEXED,

				indices: (args.indices !== undefined) ? args.indices : TriangleGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : TriangleGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : TriangleGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : TriangleGeometry.assembleUVs(args),
				MMats: (args.MMats !== undefined) ? args.MMats : null,
				translations: (args.translations !== undefined) ? args.translations : null,
			}
		);
	}


	static createIndicesArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;

		const instanceStride = 3;
		const instanceIndexStride = (3) * 1;
		const instanceVertexStride = (3) * 1;

		const indicesArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < positions.length; p++) {
				const instanceOffset = instanceStride * p;


				array[0] = instanceOffset+0; //vertex 0
				array[1] = instanceOffset+1; //vertex 1
				array[2] = instanceOffset+2; //vertex 2


				indicesArray.push(...array);
			}
		} else {
			//noop
		}


		return new Uint32Array(indicesArray);
	}
	static createIndicesAttributeLocation(indicesArrayBuffer, args = {}) {
		return super.createIndicesAttributeLocation(
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "triangle indices buffer",
			}
		);
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		super.setValueIndices(
			indicesAttributeLocation,
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "triangle indices",
			}
			);
	}
	static assembleIndices(args = {}) {
		const indicesArrayBuffer = TriangleGeometry.createIndicesArrayBuffer(args);
		const indicesAttributeLocation = TriangleGeometry.createIndicesAttributeLocation(indicesArrayBuffer, args);
		TriangleGeometry.setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args);


		return args.indexed ? indicesAttributeLocation : null;
	}

	static createVerticesArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;

		const instanceStride = 3;
		const instanceIndexStride = (3) * 3;
		const instanceVertexStride = (3) * 3;

		const verticesArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < positions.length; p+=3) {
				const p1 = positions[p + 0];
				const p2 = positions[p + 1];
				const p3 = positions[p + 2];


				array[0] = p1.x; array[1] = p1.y; array[2] = p1.z; //vertex 0
				array[3] = p2.x; array[4] = p2.y; array[5] = p2.z; //vertex 1
				array[6] = p3.x; array[7] = p3.y; array[8] = p3.z; //vertex 2


				verticesArray.push(...array);
			}
		} else {
			const array = new Array(instanceVertexStride);


			for (let p = 0; p < positions.length; p+=3) {
				const p1 = positions[p + 0];
				const p2 = positions[p + 1];
				const p3 = positions[p + 2];


				array[0] = p1.x; array[1] = p1.y; array[2] = p1.z; //vertex 0
				array[3] = p2.x; array[4] = p2.y; array[5] = p2.z; //vertex 1
				array[6] = p3.x; array[7] = p3.y; array[8] = p3.z; //vertex 2


				verticesArray.push(...array);
			}
		}


		return new Float32Array(verticesArray);
	}
	static createVerticesAttributeLocation(verticesArrayBuffer, args = {}) {
		return super.createVerticesAttributeLocation(
			verticesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "triangle vertices buffer",
			}
		);
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		super.setValueVertices(
			verticesAttributeLocation,
			verticesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "triangle vertices",
			}
		);
	}
	static assembleVertices(args = {}) {
		const verticesArrayBuffer = TriangleGeometry.createVerticesArrayBuffer(args);
		const verticesAttributeLocation = TriangleGeometry.createVerticesAttributeLocation(verticesArrayBuffer, args);
		TriangleGeometry.setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args);


		return verticesAttributeLocation;
	}

	static createNormalsArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;

		const instanceStride = 3;
		const instanceIndexStride = (3) * 3;
		const instanceVertexStride = (3) * 3;

		const normalsArray = new Array();

		const a = new Vector3();
		const b = new Vector3();
		const n = new Vector3();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < positions.length; p+=3) {
				const p1 = positions[p + 0];
				const p2 = positions[p + 1];
				const p3 = positions[p + 2];

				a.subVectors(p2, p1);
				b.subVectors(p3, p1);
				n.set(a.y*b.z - a.z*b.y, a.z*b.x - a.x*b.z, a.x*b.y - a.y*b.x);


				array[0] = n.x; array[1] = n.y; array[2] = n.z; //vertex 0
				array[3] = n.x; array[4] = n.y; array[5] = n.z; //vertex 1
				array[6] = n.x; array[7] = n.y; array[8] = n.z; //vertex 2


				normalsArray.push(...array);
			}
		} else {
			const array = new Array(instanceVertexStride);


			for (let p = 0; p < positions.length; p+=3) {
				const p1 = positions[p + 0];
				const p2 = positions[p + 1];
				const p3 = positions[p + 2];

				a.subVectors(p2, p1);
				b.subVectors(p3, p1);
				n.set(a.y*b.z - a.z*b.y, a.z*b.x - a.x*b.z, a.x*b.y - a.y*b.x);


				array[0] = n.x; array[1] = n.y; array[2] = n.z; //vertex 0
				array[3] = n.x; array[4] = n.y; array[5] = n.z; //vertex 1
				array[6] = n.x; array[7] = n.y; array[8] = n.z; //vertex 2


				normalsArray.push(...array);
			}
		}


		return new Float32Array(normalsArray);
	}
	static createNormalsAttributeLocation(normalsArrayBuffer, args = {}) {
		return super.createNormalsAttributeLocation(
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "triangle normals buffer",
			}
		);
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		super.setValueNormals(
			normalsAttributeLocation,
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "triangle normals",
			}
		);
	}
	static assembleNormals(args = {}) {
		const normalsArrayBuffer = TriangleGeometry.createNormalsArrayBuffer(args);
		const normalsAttributeLocation = TriangleGeometry.createNormalsAttributeLocation(normalsArrayBuffer, args);
		TriangleGeometry.setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args);


		return normalsAttributeLocation;
	}
	
	static createUVsArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;

		const instanceStride = 3;
		const instanceIndexStride = (3) * 2;
		const instanceVertexStride = (3) * 2;

		const uvsArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < positions.length; p+=3) {
				array[0] = +0; array[1] = +1; //vertex 0
				array[2] = +0; array[3] = +0; //vertex 1
				array[4] = +1; array[5] = +0; //vertex 2


				uvsArray.push(...array);
			}
		} else {
			const array = new Array(instanceVertexStride);


			for (let p = 0; p < positions.length; p+=3) {
				array[0] = +0; array[1] = +1; //vertex 0
				array[2] = +0; array[3] = +0; //vertex 1
				array[4] = +1; array[5] = +0; //vertex 2


				uvsArray.push(...array);
			}
		}


		return new Float32Array(uvsArray);
	}
	static createUVsAttributeLocation(uvsArrayBuffer, args = {}) {
		return super.createUVsAttributeLocation(
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "triangle uvs buffer",
			}
		);
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		super.setValueUVs(
			uvsAttributeLocation,
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "triangle uvs",
			}
		);
	}
	static assembleUVs(args = {}) {
		const uvsArrayBuffer = TriangleGeometry.createUVsArrayBuffer(args);
		const uvsAttributeLocation = TriangleGeometry.createUVsAttributeLocation(uvsArrayBuffer, args);
		TriangleGeometry.setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args);


		return uvsAttributeLocation;
	}
};
