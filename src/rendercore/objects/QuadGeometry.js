import { MeshGeometry } from "./MeshGeometry.js";
import { Vector2 } from "../math/Vector2.js";
import { Vector3 } from "../math/Vector3.js";


export class QuadGeometry extends MeshGeometry {


	static DEFAULT = {
		TYPE: "QuadGeometry",
		NAME: "",

		INDEXED: false,
		BASE_GEOMETRY: {
			positions: [new Vector3(0, 0, 0)],
			sizes: [new Vector2(1, 1)],
		},
	};
	

	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : QuadGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : QuadGeometry.DEFAULT.NAME,

				indexed: (args.indexed !== undefined) ? args.indexed : QuadGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : QuadGeometry.DEFAULT.BASE_GEOMETRY,

				indices: (args.indices !== undefined) ? args.indices : QuadGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : QuadGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : QuadGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : QuadGeometry.assembleUVs(args),
				MMats: (args.MMats !== undefined) ? args.MMats : null,
				translations: (args.translations !== undefined) ? args.translations : null,
			}
		);
	}


	static createIndicesArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;
		const sizes = baseGeometry.sizes;

		const instanceStride = 4;
		const instanceIndexStride = (2 * 3) * 1;
		const instanceVertexStride = (2 * 3) * 1;

		const indicesArray = new Array();


		if (indexed) {
			const array = new Array(instanceVertexStride);


			for (let p = 0; p < positions.length; p++) {
				const instanceOffset = instanceStride * p;


				array[0] = instanceOffset+0; //vertex 0
				array[1] = instanceOffset+1; //vertex 1
				array[2] = instanceOffset+2; //vertex 2
		
				array[3] = instanceOffset+2; //vertex 2
				array[4] = instanceOffset+1; //vertex 1
				array[5] = instanceOffset+3; //vertex 3


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

				label: (args.label !== undefined) ? args.label : "quad indices buffer",
			}
		);
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		super.setValueIndices(
			indicesAttributeLocation,
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "quad indices",
			}
			);
	}
	static assembleIndices(args = {}) {
		const indicesArrayBuffer = QuadGeometry.createIndicesArrayBuffer(args);
		const indicesAttributeLocation = QuadGeometry.createIndicesAttributeLocation(indicesArrayBuffer, args);
		QuadGeometry.setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args);


		return args.indexed ? indicesAttributeLocation : null;
	}

	static createVerticesArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;
		const sizes = baseGeometry.sizes;

		const instanceStride = 4;
		const instanceIndexStride = (4) * 3;
		const instanceVertexStride = (2 * 3) * 3;

		const verticesArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < positions.length; p++) {
				const position = positions[p];
				const px = position.x;
				const py = position.y;
				const pz = position.z;
				const size = sizes[p];
				const sx = 1 * size.x;
				const sy = 1 * size.y;
				const sz = 0;


				array[0  ] = px-sx; array[1  ] = py-sy; array[2  ] = pz+sz; //vertex 0
				array[3  ] = px+sx; array[4  ] = py-sy; array[5  ] = pz+sz; //vertex 1
				array[6  ] = px-sx; array[7  ] = py+sy; array[8  ] = pz+sz; //vertex 2
				array[9  ] = px+sx; array[10 ] = py+sy; array[11 ] = pz+sz; //vertex 3
		
		
				verticesArray.push(...array);
			}
		} else {
			const array = new Array(instanceVertexStride);


			for (let p = 0; p < positions.length; p++) {
				const position = positions[p];
				const px = position.x;
				const py = position.y;
				const pz = position.z;
				const size = sizes[p];
				const sx = 1 * size.x;
				const sy = 1 * size.y;
				const sz = 0;


				array[0  ] = px-sx; array[1  ] = py-sy; array[2  ] = pz+sz; //vertex 0
				array[3  ] = px+sx; array[4  ] = py-sy; array[5  ] = pz+sz; //vertex 1
				array[6  ] = px-sx; array[7  ] = py+sy; array[8  ] = pz+sz; //vertex 2
		
				array[9  ] = px-sx; array[10 ] = py+sy; array[11 ] = pz+sz; //vertex 2
				array[12 ] = px+sx; array[13 ] = py-sy; array[14 ] = pz+sz; //vertex 1
				array[15 ] = px+sx; array[16 ] = py+sy; array[17 ] = pz+sz; //vertex 3
		
		
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

				label: (args.label !== undefined) ? args.label : "quad vertices buffer",
			}
		);
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		super.setValueVertices(
			verticesAttributeLocation,
			verticesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "quad vertices",
			}
		);
	}
	static assembleVertices(args = {}) {
		const verticesArrayBuffer = QuadGeometry.createVerticesArrayBuffer(args);
		const verticesAttributeLocation = QuadGeometry.createVerticesAttributeLocation(verticesArrayBuffer, args);
		QuadGeometry.setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args);


		return verticesAttributeLocation;
	}

	static createNormalsArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;
		const sizes = baseGeometry.sizes;

		const instanceStride = 4;
		const instanceIndexStride = (4) * 3;
		const instanceVertexStride = (2 * 3) * 3;

		const normalsArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < positions.length; p++) {
				array[0  ] = +0; array[1  ] = +0; array[2  ] = +1; //vertex 0
				array[3  ] = +0; array[4  ] = +0; array[5  ] = +1; //vertex 1
				array[6  ] = +0; array[7  ] = +0; array[8  ] = +1; //vertex 2
				array[9  ] = +0; array[10 ] = +0; array[11 ] = +1; //vertex 3
		
		
				verticesArray.push(...array);
			}
		} else {
			const array = new Array(instanceVertexStride);


			for (let p = 0; p < positions.length; p++) {
				array[0  ] = +0; array[1  ] = +0; array[2  ] = +1; //vertex 0
				array[3  ] = +0; array[4  ] = +0; array[5  ] = +1; //vertex 1
				array[6  ] = +0; array[7  ] = +0; array[8  ] = +1; //vertex 2
		
				array[9  ] = +0; array[10 ] = +0; array[11 ] = +1; //vertex 2
				array[12 ] = +0; array[13 ] = +0; array[14 ] = +1; //vertex 1
				array[15 ] = +0; array[16 ] = +0; array[17 ] = +1; //vertex 3
		
		
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

				label: (args.label !== undefined) ? args.label : "quad normals buffer",
			}
		);
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		super.setValueNormals(
			normalsAttributeLocation,
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "quad normals",
			}
		);
	}
	static assembleNormals(args = {}) {
		const normalsArrayBuffer = QuadGeometry.createNormalsArrayBuffer(args);
		const normalsAttributeLocation = QuadGeometry.createNormalsAttributeLocation(normalsArrayBuffer, args);
		QuadGeometry.setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args);


		return normalsAttributeLocation;
	}
	
	static createUVsArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;
		const sizes = baseGeometry.sizes;

		const instanceStride = 4;
		const instanceIndexStride = (4) * 2;
		const instanceVertexStride = (2 * 3) * 2;

		const uvsArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < positions.length; p++) {
				array[0  ] = +0; array[1  ] = +0; //vertex 0
				array[2  ] = +1; array[3  ] = +0; //vertex 1
				array[4  ] = +0; array[5  ] = +1; //vertex 2
				array[6  ] = +1; array[7  ] = +1; //vertex 3
		
		
				uvsArray.push(...array);
			}
		} else {
			const array = new Array(instanceVertexStride);


			for (let p = 0; p < positions.length; p++) {
				array[0  ] = +0; array[1  ] = +0; //vertex 0
				array[2  ] = +1; array[3  ] = +0; //vertex 1
				array[4  ] = +0; array[5  ] = +1; //vertex 2
		
				array[6  ] = +0; array[7  ] = +1; //vertex 2
				array[8  ] = +1; array[9  ] = +0; //vertex 1
				array[10 ] = +1; array[11 ] = +1; //vertex 3
		
		
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

				label: (args.label !== undefined) ? args.label : "quad uvs buffer",
			}
		);
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		super.setValueUVs(
			uvsAttributeLocation,
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "quad uvs",
			}
		);
	}
	static assembleUVs(args = {}) {
		const uvsArrayBuffer = QuadGeometry.createUVsArrayBuffer(args);
		const uvsAttributeLocation = QuadGeometry.createUVsAttributeLocation(uvsArrayBuffer, args);
		QuadGeometry.setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args);


		return uvsAttributeLocation;
	}
};
