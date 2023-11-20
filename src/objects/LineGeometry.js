import { MeshGeometry } from "./MeshGeometry.js";
import { Vector3 } from "../math/Vector3.js";


export class LineGeometry extends MeshGeometry {


	static DEFAULT = {
		TYPE: "LineGeometry",
		NAME: "",

		INDEXED: false,
		BASE_GEOMETRY: {
			positions: [new Vector3(-1, 0, 0), new Vector3(+1, 0, 0)],
		},
	};
	

	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : LineGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : LineGeometry.DEFAULT.NAME,

				indexed: (args.indexed !== undefined) ? args.indexed : LineGeometry.DEFAULT.INDEXED,

				indices: (args.indices !== undefined) ? args.indices : LineGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : LineGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : LineGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : LineGeometry.assembleUVs(args),
				MMats: (args.MMats !== undefined) ? args.MMats : null,
				translations: (args.translations !== undefined) ? args.translations : null,
			}
		);
	}


	static createIndicesArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;

		const instanceStride = 2;
		const instanceIndexStride = (2) * 1;
		const instanceVertexStride = (2) * 1;

		const indicesArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < positions.length; p++) {
				const instanceOffset = instanceStride * p;


				array[0] = instanceOffset+0; //vertex 0
				array[1] = instanceOffset+1; //vertex 1


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

				label: (args.label !== undefined) ? args.label : "line indices buffer",
			}
		);
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		super.setValueIndices(
			indicesAttributeLocation,
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "line indices",
			}
			);
	}
	static assembleIndices(args = {}) {
		const indicesArrayBuffer = LineGeometry.createIndicesArrayBuffer(args);
		const indicesAttributeLocation = LineGeometry.createIndicesAttributeLocation(indicesArrayBuffer, args);
		LineGeometry.setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args);


		return args.indexed ? indicesAttributeLocation : null;
	}

	static createVerticesArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;

		const instanceStride = 2;
		const instanceIndexStride = (2) * 3;
		const instanceVertexStride = (2) * 3;

		const verticesArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < positions.length; p+=2) {
				const position1 = positions[p];
				const position2 = positions[p + 1];
				const px1 = position1.x;
				const py1 = position1.y;
				const pz1 = position1.z;
				const px2 = position2.x;
				const py2 = position2.y;
				const pz2 = position2.z;


				array[0] = px1; array[1] = py1; array[2] = pz1; //vertex 0
				array[3] = px2; array[4] = py2; array[5] = pz2; //vertex 1


				verticesArray.push(...array);
			}
		} else {
			const array = new Array(instanceVertexStride);


			for (let p = 0; p < positions.length; p+=2) {
				const position1 = positions[p];
				const position2 = positions[p + 1];
				const px1 = position1.x;
				const py1 = position1.y;
				const pz1 = position1.z;
				const px2 = position2.x;
				const py2 = position2.y;
				const pz2 = position2.z;


				array[0] = px1; array[1] = py1; array[2] = pz1; //vertex 0
				array[3] = px2; array[4] = py2; array[5] = pz2; //vertex 1


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

				label: (args.label !== undefined) ? args.label : "line vertices buffer",
			}
		);
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		super.setValueVertices(
			verticesAttributeLocation,
			verticesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "line vertices",
			}
		);
	}
	static assembleVertices(args = {}) {
		const verticesArrayBuffer = LineGeometry.createVerticesArrayBuffer(args);
		const verticesAttributeLocation = LineGeometry.createVerticesAttributeLocation(verticesArrayBuffer, args);
		LineGeometry.setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args);


		return verticesAttributeLocation;
	}

	static createNormalsArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;

		const instanceStride = 2;
		const instanceIndexStride = (2) * 3;
		const instanceVertexStride = (2) * 3;

		const normalsArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < positions.length; p+=2) {
				array[0] = +0; array[1] = +0; array[2] = +1; //vertex 0
				array[3] = +0; array[4] = +0; array[5] = +1; //vertex 1


				normalsArray.push(...array);
			}
		} else {
			const array = new Array(instanceVertexStride);


			for (let p = 0; p < positions.length; p+=2) {
				array[0] = +0; array[1] = +0; array[2] = +1; //vertex 0
				array[3] = +0; array[4] = +0; array[5] = +1; //vertex 1


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

				label: (args.label !== undefined) ? args.label : "line normals buffer",
			}
		);
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		super.setValueNormals(
			normalsAttributeLocation,
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "line normals",
			}
		);
	}
	static assembleNormals(args = {}) {
		const normalsArrayBuffer = LineGeometry.createNormalsArrayBuffer(args);
		const normalsAttributeLocation = LineGeometry.createNormalsAttributeLocation(normalsArrayBuffer, args);
		LineGeometry.setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args);


		return normalsAttributeLocation;
	}
	
	static createUVsArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;

		const instanceStride = 2;
		const instanceIndexStride = (2) * 2;
		const instanceVertexStride = (2) * 2;

		const uvsArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < positions.length; p+=2) {
				array[0] = +0; array[1] = +0; //vertex 0
				array[2] = +0; array[3] = +0; //vertex 1


				uvsArray.push(...array);
			}
		} else {
			const array = new Array(instanceVertexStride);


			for (let p = 0; p < positions.length; p+=2) {
				array[0] = +0; array[1] = +0; //vertex 0
				array[2] = +0; array[3] = +0; //vertex 1


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

				label: (args.label !== undefined) ? args.label : "line uvs buffer",
			}
		);
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		super.setValueUVs(
			uvsAttributeLocation,
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "line uvs",
			}
		);
	}
	static assembleUVs(args = {}) {
		const uvsArrayBuffer = LineGeometry.createUVsArrayBuffer(args);
		const uvsAttributeLocation = LineGeometry.createUVsAttributeLocation(uvsArrayBuffer, args);
		LineGeometry.setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args);


		return uvsAttributeLocation;
	}
};
