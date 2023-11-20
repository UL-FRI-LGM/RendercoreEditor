import { MeshGeometry } from "./MeshGeometry.js";
import { Vector3 } from "../math/Vector3.js";


export class CubeGeometry extends MeshGeometry {


	static DEFAULT = {
		TYPE: "CubeGeometry",
		NAME: "",

		INDEXED: false,
		BASE_GEOMETRY: {
			positions: [new Vector3(0, 0, 0)],
		},
	};
	

	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : CubeGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : CubeGeometry.DEFAULT.NAME,

				indexed: (args.indexed !== undefined) ? args.indexed : CubeGeometry.DEFAULT.INDEXED,

				indices: (args.indices !== undefined) ? args.indices : CubeGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : CubeGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : CubeGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : CubeGeometry.assembleUVs(args),
				MMats: (args.MMats !== undefined) ? args.MMats : null,
				translations: (args.translations !== undefined) ? args.translations : null,
			}
		);
	}


	static createIndicesArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;

		const instanceStride = 8;
		const instanceIndexStride = (6 * 2 * 3) * 1;
		const instanceVertexStride = (6 * 2 * 3) * 1;

		const indicesArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < positions.length; p++) {
				const instanceOffset = instanceStride * p;


				array[0 ] = instanceOffset+0; //vertex 0 //front
				array[1 ] = instanceOffset+1; //vertex 1
				array[2 ] = instanceOffset+2; //vertex 2
		
				array[3 ] = instanceOffset+2; //vertex 2
				array[4 ] = instanceOffset+1; //vertex 1
				array[5 ] = instanceOffset+3; //vertex 3


				array[6 ] = instanceOffset+1; //vertex 1 //right
				array[7 ] = instanceOffset+5; //vertex 5
				array[8 ] = instanceOffset+3; //vertex 3
		
				array[9 ] = instanceOffset+3; //vertex 3
				array[10] = instanceOffset+5; //vertex 5
				array[11] = instanceOffset+7; //vertex 7
		
		
				array[12] = instanceOffset+5; //vertex 5 //back
				array[13] = instanceOffset+4; //vertex 4
				array[14] = instanceOffset+7; //vertex 7
		
				array[15] = instanceOffset+7; //vertex 7
				array[16] = instanceOffset+4; //vertex 4
				array[17] = instanceOffset+6; //vertex 6
		
		
				array[18] = instanceOffset+4; //vertex 4 //left
				array[19] = instanceOffset+0; //vertex 0
				array[20] = instanceOffset+6; //vertex 6
		
				array[21] = instanceOffset+6; //vertex 6
				array[22] = instanceOffset+0; //vertex 0
				array[23] = instanceOffset+2; //vertex 2
		
		
				array[24] = instanceOffset+2; //vertex 2 //up
				array[25] = instanceOffset+3; //vertex 3
				array[26] = instanceOffset+6; //vertex 6
		
				array[27] = instanceOffset+6; //vertex 6
				array[28] = instanceOffset+3; //vertex 3
				array[29] = instanceOffset+7; //vertex 7
		
		
				array[30] = instanceOffset+4; //vertex 4 //down
				array[31] = instanceOffset+5; //vertex 5
				array[32] = instanceOffset+0; //vertex 0
		
				array[33] = instanceOffset+0; //vertex 0
				array[34] = instanceOffset+5; //vertex 5
				array[35] = instanceOffset+1; //vertex 1


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

				label: (args.label !== undefined) ? args.label : "cube indices buffer",
			}
		);
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		super.setValueIndices(
			indicesAttributeLocation,
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "cube indices",
			}
			);
	}
	static assembleIndices(args = {}) {
		const indicesArrayBuffer = CubeGeometry.createIndicesArrayBuffer(args);
		const indicesAttributeLocation = CubeGeometry.createIndicesAttributeLocation(indicesArrayBuffer, args);
		CubeGeometry.setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args);


		return args.indexed ? indicesAttributeLocation : null;
	}

	static createVerticesArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;

		const instanceStride = 8;
		const instanceIndexStride = (8) * 3;
		const instanceVertexStride = (6 * 2 * 3) * 3;

		const verticesArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < positions.length; p++) {
				const position = positions[p];
				const px = position.x;
				const py = position.y;
				const pz = position.z;


				array[0  ] = px-1; array[1  ] = py-1; array[2  ] = pz+1; //vertex 0
				array[3  ] = px+1; array[4  ] = py-1; array[5  ] = pz+1; //vertex 1
				array[6  ] = px-1; array[7  ] = py+1; array[8  ] = pz+1; //vertex 2
				array[9  ] = px+1; array[10 ] = py+1; array[11 ] = pz+1; //vertex 3
				array[12 ] = px-1; array[13 ] = py-1; array[14 ] = pz-1; //vertex 4		
				array[15 ] = px+1; array[16 ] = py-1; array[17 ] = pz-1; //vertex 5
				array[18 ] = px-1; array[19 ] = py+1; array[20 ] = pz-1; //vertex 6
				array[21 ] = px+1; array[22 ] = py+1; array[23 ] = pz-1; //vertex 7


				verticesArray.push(...array);
			}
		} else {
			const array = new Array(instanceVertexStride);


			for (let p = 0; p < positions.length; p++) {
				const position = positions[p];
				const px = position.x;
				const py = position.y;
				const pz = position.z;


				array[0  ] = px-1; array[1  ] = py-1; array[2  ] = pz+1; //vertex 0 //front
				array[3  ] = px+1; array[4  ] = py-1; array[5  ] = pz+1; //vertex 1
				array[6  ] = px-1; array[7  ] = py+1; array[8  ] = pz+1; //vertex 2
		
				array[9  ] = px-1; array[10 ] = py+1; array[11 ] = pz+1; //vertex 2
				array[12 ] = px+1; array[13 ] = py-1; array[14 ] = pz+1; //vertex 1
				array[15 ] = px+1; array[16 ] = py+1; array[17 ] = pz+1; //vertex 3
		
		
				array[18 ] = px+1; array[19 ] = py-1; array[20 ] = pz+1; //vertex 1 //right
				array[21 ] = px+1; array[22 ] = py-1; array[23 ] = pz-1; //vertex 5
				array[24 ] = px+1; array[25 ] = py+1; array[26 ] = pz+1; //vertex 3
		
				array[27 ] = px+1; array[28 ] = py+1; array[29 ] = pz+1; //vertex 3
				array[30 ] = px+1; array[31 ] = py-1; array[32 ] = pz-1; //vertex 5
				array[33 ] = px+1; array[34 ] = py+1; array[35 ] = pz-1; //vertex 7
		
		
				array[36 ] = px+1; array[37 ] = py-1; array[38 ] = pz-1; //vertex 5 //back
				array[39 ] = px-1; array[40 ] = py-1; array[41 ] = pz-1; //vertex 4
				array[42 ] = px+1; array[43 ] = py+1; array[44 ] = pz-1; //vertex 7
		
				array[45 ] = px+1; array[46 ] = py+1; array[47 ] = pz-1; //vertex 7
				array[48 ] = px-1; array[49 ] = py-1; array[50 ] = pz-1; //vertex 4
				array[51 ] = px-1; array[52 ] = py+1; array[53 ] = pz-1; //vertex 6
		
		
				array[54 ] = px-1; array[55 ] = py-1; array[56 ] = pz-1; //vertex 4 //left
				array[57 ] = px-1; array[58 ] = py-1; array[59 ] = pz+1; //vertex 0
				array[60 ] = px-1; array[61 ] = py+1; array[62 ] = pz-1; //vertex 6
		
				array[63 ] = px-1; array[64 ] = py+1; array[65 ] = pz-1; //vertex 6
				array[66 ] = px-1; array[67 ] = py-1; array[68 ] = pz+1; //vertex 0
				array[69 ] = px-1; array[70 ] = py+1; array[71 ] = pz+1; //vertex 2
		
		
				array[72 ] = px-1; array[73 ] = py+1; array[74 ] = pz+1; //vertex 2 //up
				array[75 ] = px+1; array[76 ] = py+1; array[77 ] = pz+1; //vertex 3
				array[78 ] = px-1; array[79 ] = py+1; array[80 ] = pz-1; //vertex 6
		
				array[81 ] = px-1; array[82 ] = py+1; array[83 ] = pz-1; //vertex 6
				array[84 ] = px+1; array[85 ] = py+1; array[86 ] = pz+1; //vertex 3
				array[87 ] = px+1; array[88 ] = py+1; array[89 ] = pz-1; //vertex 7
		
		
				array[90 ] = px-1; array[91 ] = py-1; array[92 ] = pz-1; //vertex 4 //down
				array[93 ] = px+1; array[94 ] = py-1; array[95 ] = pz-1; //vertex 5
				array[96 ] = px-1; array[97 ] = py-1; array[98 ] = pz+1; //vertex 0
		
				array[99 ] = px-1; array[100] = py-1; array[101] = pz+1; //vertex 0
				array[102] = px+1; array[103] = py-1; array[104] = pz-1; //vertex 5
				array[105] = px+1; array[106] = py-1; array[107] = pz+1; //vertex 1


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

				label: (args.label !== undefined) ? args.label : "cube vertices buffer",
			}
		);
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		super.setValueVertices(
			verticesAttributeLocation,
			verticesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "cube vertices",
			}
		);
	}
	static assembleVertices(args = {}) {
		const verticesArrayBuffer = CubeGeometry.createVerticesArrayBuffer(args);
		const verticesAttributeLocation = CubeGeometry.createVerticesAttributeLocation(verticesArrayBuffer, args);
		CubeGeometry.setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args);


		return verticesAttributeLocation;
	}

	static createNormalsArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;

		const instanceStride = 8;
		const instanceIndexStride = (8) * 3;
		const instanceVertexStride = (6 * 2 * 3) * 3;

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
				array[6  ] = +0; array[7  ] = +0; array[8  ] = +1; //vertex 2
		
				array[9  ] = +0; array[10 ] = +0; array[11 ] = +1; //vertex 2
				array[12 ] = +0; array[13 ] = +0; array[14 ] = +1; //vertex 1
				array[15 ] = +0; array[16 ] = +0; array[17 ] = +1; //vertex 3
		
		
				array[18 ] = +1; array[19 ] = +0; array[20 ] = +0; //vertex 1 //right
				array[21 ] = +1; array[22 ] = +0; array[23 ] = +0; //vertex 5
				array[24 ] = +1; array[25 ] = +0; array[26 ] = +0; //vertex 3
		
				array[27 ] = +1; array[28 ] = +0; array[29 ] = +0; //vertex 3
				array[30 ] = +1; array[31 ] = +0; array[32 ] = +0; //vertex 5
				array[33 ] = +1; array[34 ] = +0; array[35 ] = +0; //vertex 7
		
		
				array[36 ] = +0; array[37 ] = +0; array[38 ] = -1; //vertex 5 //back
				array[39 ] = +0; array[40 ] = +0; array[41 ] = -1; //vertex 4
				array[42 ] = +0; array[43 ] = +0; array[44 ] = -1; //vertex 7
		
				array[45 ] = +0; array[46 ] = +0; array[47 ] = -1; //vertex 7
				array[48 ] = +0; array[49 ] = +0; array[50 ] = -1; //vertex 4
				array[51 ] = +0; array[52 ] = +0; array[53 ] = -1; //vertex 6
		
		
				array[54 ] = -1; array[55 ] = +0; array[56 ] = +0; //vertex 4 //left
				array[57 ] = -1; array[58 ] = +0; array[59 ] = +0; //vertex 0
				array[60 ] = -1; array[61 ] = +0; array[62 ] = +0; //vertex 6
		
				array[63 ] = -1; array[64 ] = +0; array[65 ] = +0; //vertex 6
				array[66 ] = -1; array[67 ] = +0; array[68 ] = +0; //vertex 0
				array[69 ] = -1; array[70 ] = +0; array[71 ] = +0; //vertex 2
		
		
				array[72 ] = +0; array[73 ] = +1; array[74 ] = +0; //vertex 2 //up
				array[75 ] = +0; array[76 ] = +1; array[77 ] = +0; //vertex 3
				array[78 ] = +0; array[79 ] = +1; array[80 ] = +0; //vertex 6
		
				array[81 ] = +0; array[82 ] = +1; array[83 ] = +0; //vertex 6
				array[84 ] = +0; array[85 ] = +1; array[86 ] = +0; //vertex 3
				array[87 ] = +0; array[88 ] = +1; array[89 ] = +0; //vertex 7
		
		
				array[90 ] = +0; array[91 ] = -1; array[92 ] = +0; //vertex 4 //down
				array[93 ] = +0; array[94 ] = -1; array[95 ] = +0; //vertex 5
				array[96 ] = +0; array[97 ] = -1; array[98 ] = +0; //vertex 0
		
				array[99 ] = +0; array[100] = -1; array[101] = +0; //vertex 0
				array[102] = +0; array[103] = -1; array[104] = +0; //vertex 5
				array[105] = +0; array[106] = -1; array[107] = +0; //vertex 1


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

				label: (args.label !== undefined) ? args.label : "cube normals buffer",
			}
		);
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		super.setValueNormals(
			normalsAttributeLocation,
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "cube normals",
			}
		);
	}
	static assembleNormals(args = {}) {
		const normalsArrayBuffer = CubeGeometry.createNormalsArrayBuffer(args);
		const normalsAttributeLocation = CubeGeometry.createNormalsAttributeLocation(normalsArrayBuffer, args);
		CubeGeometry.setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args);


		return normalsAttributeLocation;
	}
	
	static createUVsArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;

		const instanceStride = 8;
		const instanceIndexStride = (8) * 2;
		const instanceVertexStride = (6 * 2 * 3) * 2;

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
				array[4  ] = +0; array[5  ] = +1; //vertex 2
		
				array[6  ] = +0; array[7  ] = +1; //vertex 2
				array[8  ] = +1; array[9  ] = +0; //vertex 1
				array[10 ] = +1; array[11 ] = +1; //vertex 3
		
		
				array[12 ] = +0; array[13 ] = +0; //vertex 1 //right
				array[14 ] = +1; array[15 ] = +0; //vertex 5
				array[16 ] = +0; array[17 ] = +1; //vertex 3
		
				array[18 ] = +0; array[19 ] = +1; //vertex 3
				array[20 ] = +1; array[21 ] = +0; //vertex 5
				array[22 ] = +1; array[23 ] = +1; //vertex 7
		
		
				array[24 ] = +0; array[25 ] = +0; //vertex 5 //back
				array[26 ] = +1; array[27 ] = +0; //vertex 4
				array[28 ] = +0; array[29 ] = +1; //vertex 7
		
				array[30 ] = +0; array[31 ] = +1; //vertex 7
				array[32 ] = +1; array[33 ] = +0; //vertex 4
				array[34 ] = +1; array[35 ] = +1; //vertex 6
		
		
				array[36 ] = +0; array[37 ] = +0; //vertex 4 //left
				array[38 ] = +1; array[39 ] = +0; //vertex 0
				array[40 ] = +0; array[41 ] = +1; //vertex 6
		
				array[42 ] = +0; array[43 ] = +1; //vertex 6
				array[44 ] = +1; array[45 ] = +0; //vertex 0
				array[46 ] = +1; array[47 ] = +1; //vertex 2
		
		
				array[48 ] = +0; array[49 ] = +0; //vertex 2 //up
				array[50 ] = +1; array[51 ] = +0; //vertex 3
				array[52 ] = +0; array[53 ] = +1; //vertex 6
		
				array[54 ] = +0; array[55 ] = +1; //vertex 6
				array[56 ] = +1; array[57 ] = +0; //vertex 3
				array[58 ] = +1; array[59 ] = +1; //vertex 7
		
		
				array[60 ] = +0; array[61 ] = +0; //vertex 4 //down
				array[62 ] = +1; array[63 ] = +0; //vertex 5
				array[64 ] = +0; array[65 ] = +1; //vertex 0
		
				array[66 ] = +0; array[67 ] = +1; //vertex 0
				array[68 ] = +1; array[69 ] = +0; //vertex 5
				array[70 ] = +1; array[71 ] = +1; //vertex 1


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

				label: (args.label !== undefined) ? args.label : "cube uvs buffer",
			}
		);
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		super.setValueUVs(
			uvsAttributeLocation,
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "cube uvs",
			}
		);
	}
	static assembleUVs(args = {}) {
		const uvsArrayBuffer = CubeGeometry.createUVsArrayBuffer(args);
		const uvsAttributeLocation = CubeGeometry.createUVsAttributeLocation(uvsArrayBuffer, args);
		CubeGeometry.setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args);


		return uvsAttributeLocation;
	}
};
