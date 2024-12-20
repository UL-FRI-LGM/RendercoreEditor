import { MeshGeometry } from "./MeshGeometry.js";
import { Vector3 } from "../math/Vector3.js";


export class BoxFrameGeometry extends MeshGeometry {


	static DEFAULT = {
		TYPE: "BoxFrameGeometry",
		NAME: "",

		INDEXED: false,
		BASE_GEOMETRY: {
			positions: [new Vector3(0, 0, 0)],
			dimensions: [{ min: new Vector3(-1, -1, -1), max: new Vector3(+1, +1, +1)}],
		},
	};
	

	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : BoxFrameGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : BoxFrameGeometry.DEFAULT.NAME,

				indexed: (args.indexed !== undefined) ? args.indexed : BoxFrameGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : BoxFrameGeometry.DEFAULT.BASE_GEOMETRY,

				indices: (args.indices !== undefined) ? args.indices : BoxFrameGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : BoxFrameGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : BoxFrameGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : BoxFrameGeometry.assembleUVs(args),
				MMats: (args.MMats !== undefined) ? args.MMats : null,
				translations: (args.translations !== undefined) ? args.translations : null,
			}
		);
	}


	static createIndicesArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;
		const dimensions = baseGeometry.dimensions;

		const instanceStride = 8;
		const instanceIndexStride = (12 * 2) * 1;
		const instanceVertexStride = (12 * 2) * 1;

		const indicesArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < positions.length; p++) {
				const instanceOffset = instanceStride * p;


				array[0 ] = instanceOffset+0; //vertex 0 //front
				array[1 ] = instanceOffset+1; //vertex 1
				array[2 ] = instanceOffset+1; //vertex 1
				array[3 ] = instanceOffset+3; //vertex 3
				array[4 ] = instanceOffset+3; //vertex 3
				array[5 ] = instanceOffset+2; //vertex 2
				array[6 ] = instanceOffset+2; //vertex 2
				array[7 ] = instanceOffset+0; //vertex 0
		
				array[8 ] = instanceOffset+5; //vertex 5 //back
				array[9 ] = instanceOffset+4; //vertex 4
				array[10] = instanceOffset+4; //vertex 4
				array[11] = instanceOffset+6; //vertex 6
				array[12] = instanceOffset+6; //vertex 6
				array[13] = instanceOffset+7; //vertex 7
				array[14] = instanceOffset+7; //vertex 7
				array[15] = instanceOffset+5; //vertex 5

				array[16] = instanceOffset+0; //vertex 0 //sides
				array[17] = instanceOffset+4; //vertex 4
				array[18] = instanceOffset+1; //vertex 1
				array[19] = instanceOffset+5; //vertex 5
				array[20] = instanceOffset+2; //vertex 2
				array[21] = instanceOffset+6; //vertex 6
				array[22] = instanceOffset+3; //vertex 3
				array[23] = instanceOffset+7; //vertex 7


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

				label: (args.label !== undefined) ? args.label : "box frame indices buffer",
			}
		);
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		super.setValueIndices(
			indicesAttributeLocation,
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "box frame indices",
			}
			);
	}
	static assembleIndices(args = {}) {
		const indicesArrayBuffer = BoxFrameGeometry.createIndicesArrayBuffer(args);
		const indicesAttributeLocation = BoxFrameGeometry.createIndicesAttributeLocation(indicesArrayBuffer, args);
		BoxFrameGeometry.setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args);


		return args.indexed ? indicesAttributeLocation : null;
	}

	static createVerticesArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;
		const dimensions = baseGeometry.dimensions;

		const instanceStride = 8;
		const instanceIndexStride = (8) * 3;
		const instanceVertexStride = (12 * 2) * 3;

		const verticesArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < positions.length; p++) {
				const position = positions[p];
				const px = position.x;
				const py = position.y;
				const pz = position.z;
				const dimension = dimensions[p];
				const dmin = dimension.min;
				const dmax = dimension.max;


				array[0  ] = px+dmin.x; array[1  ] = py+dmin.y; array[2  ] = pz+dmax.z; //vertex 0
				array[3  ] = px+dmax.x; array[4  ] = py+dmin.y; array[5  ] = pz+dmax.z; //vertex 1
				array[6  ] = px+dmin.x; array[7  ] = py+dmax.y; array[8  ] = pz+dmax.z; //vertex 2
				array[9  ] = px+dmax.x; array[10 ] = py+dmax.y; array[11 ] = pz+dmax.z; //vertex 3
				array[12 ] = px+dmin.x; array[13 ] = py+dmin.y; array[14 ] = pz+dmin.z; //vertex 4		
				array[15 ] = px+dmax.x; array[16 ] = py+dmin.y; array[17 ] = pz+dmin.z; //vertex 5
				array[18 ] = px+dmin.x; array[19 ] = py+dmax.y; array[20 ] = pz+dmin.z; //vertex 6
				array[21 ] = px+dmax.x; array[22 ] = py+dmax.y; array[23 ] = pz+dmin.z; //vertex 7


				verticesArray.push(...array);
			}
		} else {
			const array = new Array(instanceVertexStride);


			for (let p = 0; p < positions.length; p++) {
				const position = positions[p];
				const px = position.x;
				const py = position.y;
				const pz = position.z;
				const dimension = dimensions[p];
				const dmin = dimension.min;
				const dmax = dimension.max;


				array[0  ] = px+dmin.x; array[1  ] = py+dmin.y; array[2  ] = pz+dmax.z; //vertex 0 //front
				array[3  ] = px+dmax.x; array[4  ] = py+dmin.y; array[5  ] = pz+dmax.z; //vertex 1
				array[6  ] = px+dmax.x; array[7  ] = py+dmin.y; array[8  ] = pz+dmax.z; //vertex 1
				array[9  ] = px+dmax.x; array[10 ] = py+dmax.y; array[11 ] = pz+dmax.z; //vertex 3
				array[12 ] = px+dmax.x; array[13 ] = py+dmax.y; array[14 ] = pz+dmax.z; //vertex 3
				array[15 ] = px+dmin.x; array[16 ] = py+dmax.y; array[17 ] = pz+dmax.z; //vertex 2
				array[18 ] = px+dmin.x; array[19 ] = py+dmax.y; array[20 ] = pz+dmax.z; //vertex 2
				array[21 ] = px+dmin.x; array[22 ] = py+dmin.y; array[23 ] = pz+dmax.z; //vertex 0


				array[24 ] = px+dmax.x; array[25 ] = py+dmin.y; array[26 ] = pz+dmin.z; //vertex 5 //back
				array[27 ] = px+dmin.x; array[28 ] = py+dmin.y; array[29 ] = pz+dmin.z; //vertex 4
				array[30 ] = px+dmin.x; array[31 ] = py+dmin.y; array[32 ] = pz+dmin.z; //vertex 4
				array[33 ] = px+dmin.x; array[34 ] = py+dmax.y; array[35 ] = pz+dmin.z; //vertex 6
				array[36 ] = px+dmin.x; array[37 ] = py+dmax.y; array[38 ] = pz+dmin.z; //vertex 6
				array[39 ] = px+dmax.x; array[40 ] = py+dmax.y; array[41 ] = pz+dmin.z; //vertex 7
				array[42 ] = px+dmax.x; array[43 ] = py+dmax.y; array[44 ] = pz+dmin.z; //vertex 7
				array[45 ] = px+dmax.x; array[46 ] = py+dmin.y; array[47 ] = pz+dmin.z; //vertex 5


				array[48 ] = px+dmin.x; array[49 ] = py+dmin.y; array[50 ] = pz+dmax.z; //vertex 0 //sides
				array[51 ] = px+dmin.x; array[52 ] = py+dmin.y; array[53 ] = pz+dmin.z; //vertex 4
				array[54 ] = px+dmax.x; array[55 ] = py+dmin.y; array[56 ] = pz+dmax.z; //vertex 1
				array[57 ] = px+dmax.x; array[58 ] = py+dmin.y; array[59 ] = pz+dmin.z; //vertex 5
				array[60 ] = px+dmin.x; array[61 ] = py+dmax.y; array[62 ] = pz+dmax.z; //vertex 2
				array[63 ] = px+dmin.x; array[64 ] = py+dmax.y; array[65 ] = pz+dmin.z; //vertex 6
				array[66 ] = px+dmax.x; array[67 ] = py+dmax.y; array[68 ] = pz+dmax.z; //vertex 3
				array[69 ] = px+dmax.x; array[70 ] = py+dmax.y; array[71 ] = pz+dmin.z; //vertex 7


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

				label: (args.label !== undefined) ? args.label : "box frame vertices buffer",
			}
		);
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		super.setValueVertices(
			verticesAttributeLocation,
			verticesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "box frame vertices",
			}
		);
	}
	static assembleVertices(args = {}) {
		const verticesArrayBuffer = BoxFrameGeometry.createVerticesArrayBuffer(args);
		const verticesAttributeLocation = BoxFrameGeometry.createVerticesAttributeLocation(verticesArrayBuffer, args);
		BoxFrameGeometry.setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args);


		return verticesAttributeLocation;
	}

	static createNormalsArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;
		const dimensions = baseGeometry.dimensions;

		const instanceStride = 8;
		const instanceIndexStride = (8) * 3;
		const instanceVertexStride = (12 * 2) * 3;

		const normalsArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < positions.length; p++) {
				array[0  ] = -1/Math.sqrt(3); array[1  ] = -1/Math.sqrt(3); array[2  ] = +1/Math.sqrt(3); //vertex 0
				array[3  ] = +1/Math.sqrt(3); array[4  ] = -1/Math.sqrt(3); array[5  ] = +1/Math.sqrt(3); //vertex 1
				array[6  ] = -1/Math.sqrt(3); array[7  ] = +1/Math.sqrt(3); array[8  ] = +1/Math.sqrt(3); //vertex 2
				array[9  ] = +1/Math.sqrt(3); array[10 ] = +1/Math.sqrt(3); array[11 ] = +1/Math.sqrt(3); //vertex 3
				array[12 ] = -1/Math.sqrt(3); array[13 ] = -1/Math.sqrt(3); array[14 ] = -1/Math.sqrt(3); //vertex 4		
				array[15 ] = +1/Math.sqrt(3); array[16 ] = -1/Math.sqrt(3); array[17 ] = -1/Math.sqrt(3); //vertex 5
				array[18 ] = -1/Math.sqrt(3); array[19 ] = +1/Math.sqrt(3); array[20 ] = -1/Math.sqrt(3); //vertex 6
				array[21 ] = +1/Math.sqrt(3); array[22 ] = +1/Math.sqrt(3); array[23 ] = -1/Math.sqrt(3); //vertex 7


				normalsArray.push(...array);
			}
		} else {
			const array = new Array(instanceVertexStride);


			for (let p = 0; p < positions.length; p++) {
				array[0  ] = +0; array[1  ] = +0; array[2  ] = +1; //vertex 0 //front
				array[3  ] = +0; array[4  ] = +0; array[5  ] = +1; //vertex 1
				array[6  ] = +0; array[7  ] = +0; array[8  ] = +1; //vertex 1
				array[9  ] = +0; array[10 ] = +0; array[11 ] = +1; //vertex 3
				array[12 ] = +0; array[13 ] = +0; array[14 ] = +1; //vertex 3
				array[15 ] = +0; array[16 ] = +0; array[17 ] = +1; //vertex 2
				array[18 ] = +0; array[19 ] = +0; array[20 ] = +1; //vertex 2
				array[21 ] = +0; array[22 ] = +0; array[23 ] = +1; //vertex 0 


				array[24 ] = +0; array[25 ] = +0; array[26 ] = -1; //vertex 5 //back
				array[27 ] = +0; array[28 ] = +0; array[29 ] = -1; //vertex 4
				array[30 ] = +0; array[31 ] = +0; array[32 ] = -1; //vertex 4
				array[33 ] = +0; array[34 ] = +0; array[35 ] = -1; //vertex 6
				array[36 ] = +0; array[37 ] = +0; array[38 ] = -1; //vertex 6
				array[39 ] = +0; array[40 ] = +0; array[41 ] = -1; //vertex 7
				array[42 ] = +0; array[43 ] = +0; array[44 ] = -1; //vertex 7
				array[45 ] = +0; array[46 ] = +0; array[47 ] = -1; //vertex 5


				array[48 ] = -1; array[49 ] = +0; array[50 ] = +0; //vertex 0 //sides
				array[51 ] = +0; array[52 ] = +0; array[53 ] = -1; //vertex 4
				array[54 ] = +0; array[55 ] = +0; array[56 ] = +1; //vertex 1
				array[57 ] = +0; array[58 ] = -1; array[59 ] = +0; //vertex 5
				array[60 ] = +0; array[61 ] = +0; array[62 ] = +1; //vertex 2
				array[63 ] = +0; array[64 ] = +1; array[65 ] = +0; //vertex 6
				array[66 ] = +0; array[67 ] = +1; array[68 ] = +0; //vertex 3
				array[69 ] = +0; array[70 ] = +1; array[71 ] = +0; //vertex 7


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

				label: (args.label !== undefined) ? args.label : "box frame normals buffer",
			}
		);
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		super.setValueNormals(
			normalsAttributeLocation,
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "box frame normals",
			}
		);
	}
	static assembleNormals(args = {}) {
		const normalsArrayBuffer = BoxFrameGeometry.createNormalsArrayBuffer(args);
		const normalsAttributeLocation = BoxFrameGeometry.createNormalsAttributeLocation(normalsArrayBuffer, args);
		BoxFrameGeometry.setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args);


		return normalsAttributeLocation;
	}
	
	static createUVsArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;
		const dimensions = baseGeometry.dimensions;

		const instanceStride = 8;
		const instanceIndexStride = (8) * 2;
		const instanceVertexStride = (12 * 2) * 2;

		const uvsArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < positions.length; p++) {
				array[0  ] = +0; array[1  ] = +0; //vertex 0 //front
				array[2  ] = +1; array[3  ] = +0; //vertex 1
				array[4  ] = +0; array[5  ] = +1; //vertex 2
				array[6  ] = +1; array[7  ] = +1; //vertex 3
				array[8  ] = +1; array[9  ] = +0; //vertex 4
				array[10 ] = +1; array[11 ] = +0; //vertex 5
				array[12 ] = +1; array[13 ] = +1; //vertex 6
				array[14 ] = +1; array[15 ] = +1; //vertex 7


				uvsArray.push(...array);
			}
		} else {
			const array = new Array(instanceVertexStride);


			for (let p = 0; p < positions.length; p++) {
				array[0  ] = +0; array[1  ] = +0; //vertex 0 //front
				array[2  ] = +1; array[3  ] = +0; //vertex 1
				array[4  ] = +1; array[3  ] = +0; //vertex 1
				array[6  ] = +1; array[7  ] = +1; //vertex 3
				array[8  ] = +1; array[9  ] = +1; //vertex 3
				array[10 ] = +0; array[11 ] = +1; //vertex 2
				array[12 ] = +0; array[13 ] = +1; //vertex 2
				array[14 ] = +0; array[15 ] = +0; //vertex 0


				array[16 ] = +0; array[17 ] = +0; //vertex 5 //back
				array[18 ] = +1; array[19 ] = +0; //vertex 4
				array[20 ] = +1; array[21 ] = +0; //vertex 4
				array[22 ] = +1; array[23 ] = +1; //vertex 6
				array[24 ] = +1; array[25 ] = +1; //vertex 6
				array[26 ] = +0; array[27 ] = +1; //vertex 7
				array[28 ] = +0; array[29 ] = +1; //vertex 7
				array[30 ] = +0; array[31 ] = +0; //vertex 5


				array[32 ] = +1; array[33 ] = +0; //vertex 0 //sides
				array[34 ] = +0; array[35 ] = +0; //vertex 4
				array[36 ] = +1; array[37 ] = +0; //vertex 1
				array[38 ] = +1; array[39 ] = +0; //vertex 5
				array[40 ] = +0; array[41 ] = +0; //vertex 2
				array[42 ] = +0; array[43 ] = +1; //vertex 6
				array[44 ] = +1; array[45 ] = +0; //vertex 3
				array[46 ] = +1; array[47 ] = +1; //vertex 7


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

				label: (args.label !== undefined) ? args.label : "box frame uvs buffer",
			}
		);
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		super.setValueUVs(
			uvsAttributeLocation,
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "box frame uvs",
			}
		);
	}
	static assembleUVs(args = {}) {
		const uvsArrayBuffer = BoxFrameGeometry.createUVsArrayBuffer(args);
		const uvsAttributeLocation = BoxFrameGeometry.createUVsAttributeLocation(uvsArrayBuffer, args);
		BoxFrameGeometry.setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args);


		return uvsAttributeLocation;
	}
};
