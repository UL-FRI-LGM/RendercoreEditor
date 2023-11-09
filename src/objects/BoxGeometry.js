import { BufferDescriptor } from "../core/RC/buffers/BufferDescriptor.js";
import { VertexAttribute } from "../core/RC/pipeline/vertex state/VertexAttribute.js";
import { VertexBufferLayout } from "../core/RC/pipeline/vertex state/VertexBufferLayout.js";
import { VertexFormat } from "../core/RC/pipeline/vertex state/VertexFormat.js";
import { VertexStepMode } from "../core/RC/pipeline/vertex state/VertexStepMode.js";
import { AttributeLocation } from "../core/data layouts/AttributeLocation.js";
import { MeshGeometry } from "./MeshGeometry.js";
import { BufferUsage } from "../core/RC/buffers/BufferUsage.js";
import { BufferSetInstruction } from "../core/data layouts/BufferSetInstruction.js";


export class BoxGeometry extends MeshGeometry {


	static DEFAULT = {
		TYPE: "BoxGeometry",
		NAME: "",

		INDEXED: false,
	};
	

	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : BoxGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : BoxGeometry.DEFAULT.NAME,

				indexed: (args.indexed !== undefined) ? args.indexed : BoxGeometry.DEFAULT.INDEXED,

				indices: (args.indices !== undefined) ? args.indices : BoxGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : BoxGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : BoxGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : BoxGeometry.assembleUVs(args),
				MMats: (args.MMats !== undefined) ? args.MMats : null,
				translations: (args.translations !== undefined) ? args.translations : null,
			}
		);
	}


	static assembleIndices(args = {}) {
		const baseGeometry = args.baseGeometry;
		const indexed = args.indexed;
		const positions = baseGeometry.positions;

		const instanceIndexSize = 8;
		const instanceVertexSize = 6 * 2 * 3 * 1;

		const indicesArray = new Array();


		if (indexed) {
			const array = new Array(instanceVertexSize);


			for (let p = 0; p < positions.length; p++) {
				const instanceOffset = instanceIndexSize * p;


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


		const indicesArrayBuffer = new Uint32Array(indicesArray);
		const indicesAttributeLocation = new AttributeLocation(
			{
				number: null,
				itemSize: 1,
				arrayBuffer: indicesArrayBuffer,

				bufferDescriptor: new BufferDescriptor(
					{
						label: "box indices buffer",
						size: indicesArrayBuffer.length,
						usage:  BufferUsage.INDEX | BufferUsage.COPY_DST,
						mappedAtCreation: false
					}
				),
				// vertexBufferLayoutDescriptor: new VertexBufferLayout(
				// 	{
				// 		arrayStride: 1 * 4,
				// 		stepMode: VertexStepMode.VERTEX,
				// 		attributes: [
				// 			new VertexAttribute(
				// 				{
				// 					format: VertexFormat.UINT_32,
				// 					offset: 0,
				// 					shaderLocation: 0,
				// 				}
				// 			)
				// 		],			
				// 	}
				// )
				vertexBufferLayoutDescriptor: null
			}
		);
		indicesAttributeLocation.setValue(
			"box indices",
			new BufferSetInstruction(
				{
					label: "box indices",

					number: null,

					source: {
						arrayBuffer: indicesArrayBuffer,
						layout: {
							offset: (0),
						}
					},
					destination: {
						buffer: null,
						layout: {
							offset: (0)
						}
					},
					size: indicesArrayBuffer.length
				}
			)
		);


		return indexed ? indicesAttributeLocation : null;
	}
	static assembleVertices(args = {}) {
		const baseGeometry = args.baseGeometry;
		const indexed = args.indexed;
		const positions = baseGeometry.positions;
		const dimensions = baseGeometry.dimensions;

		const verticesArray = new Array();


		if (indexed) {
			const array = new Array(8 * 3);


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
			const array = new Array(6 * 2 * 3 * 3);


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
				array[6  ] = px+dmin.x; array[7  ] = py+dmax.y; array[8  ] = pz+dmax.z; //vertex 2
		
				array[9  ] = px+dmin.x; array[10 ] = py+dmax.y; array[11 ] = pz+dmax.z; //vertex 2
				array[12 ] = px+dmax.x; array[13 ] = py+dmin.y; array[14 ] = pz+dmax.z; //vertex 1
				array[15 ] = px+dmax.x; array[16 ] = py+dmax.y; array[17 ] = pz+dmax.z; //vertex 3
		
		
				array[18 ] = px+dmax.x; array[19 ] = py+dmin.y; array[20 ] = pz+dmax.z; //vertex 1 //right
				array[21 ] = px+dmax.x; array[22 ] = py+dmin.y; array[23 ] = pz+dmin.z; //vertex 5
				array[24 ] = px+dmax.x; array[25 ] = py+dmax.y; array[26 ] = pz+dmax.z; //vertex 3
		
				array[27 ] = px+dmax.x; array[28 ] = py+dmax.y; array[29 ] = pz+dmax.z; //vertex 3
				array[30 ] = px+dmax.x; array[31 ] = py+dmin.y; array[32 ] = pz+dmin.z; //vertex 5
				array[33 ] = px+dmax.x; array[34 ] = py+dmax.y; array[35 ] = pz+dmin.z; //vertex 7
		
		
				array[36 ] = px+dmax.x; array[37 ] = py+dmin.y; array[38 ] = pz+dmin.z; //vertex 5 //back
				array[39 ] = px+dmin.x; array[40 ] = py+dmin.y; array[41 ] = pz+dmin.z; //vertex 4
				array[42 ] = px+dmax.x; array[43 ] = py+dmax.y; array[44 ] = pz+dmin.z; //vertex 7
		
				array[45 ] = px+dmax.x; array[46 ] = py+dmax.y; array[47 ] = pz+dmin.z; //vertex 7
				array[48 ] = px+dmin.x; array[49 ] = py+dmin.y; array[50 ] = pz+dmin.z; //vertex 4
				array[51 ] = px+dmin.x; array[52 ] = py+dmax.y; array[53 ] = pz+dmin.z; //vertex 6
		
		
				array[54 ] = px+dmin.x; array[55 ] = py+dmin.y; array[56 ] = pz+dmin.z; //vertex 4 //left
				array[57 ] = px+dmin.x; array[58 ] = py+dmin.y; array[59 ] = pz+dmax.z; //vertex 0
				array[60 ] = px+dmin.x; array[61 ] = py+dmax.y; array[62 ] = pz+dmin.z; //vertex 6
		
				array[63 ] = px+dmin.x; array[64 ] = py+dmax.y; array[65 ] = pz+dmin.z; //vertex 6
				array[66 ] = px+dmin.x; array[67 ] = py+dmin.y; array[68 ] = pz+dmax.z; //vertex 0
				array[69 ] = px+dmin.x; array[70 ] = py+dmax.y; array[71 ] = pz+dmax.z; //vertex 2
		
		
				array[72 ] = px+dmin.x; array[73 ] = py+dmax.y; array[74 ] = pz+dmax.z; //vertex 2 //up
				array[75 ] = px+dmax.x; array[76 ] = py+dmax.y; array[77 ] = pz+dmax.z; //vertex 3
				array[78 ] = px+dmin.x; array[79 ] = py+dmax.y; array[80 ] = pz+dmin.z; //vertex 6
		
				array[81 ] = px+dmin.x; array[82 ] = py+dmax.y; array[83 ] = pz+dmin.z; //vertex 6
				array[84 ] = px+dmax.x; array[85 ] = py+dmax.y; array[86 ] = pz+dmax.z; //vertex 3
				array[87 ] = px+dmax.x; array[88 ] = py+dmax.y; array[89 ] = pz+dmin.z; //vertex 7
		
		
				array[90 ] = px+dmin.x; array[91 ] = py+dmin.y; array[92 ] = pz+dmin.z; //vertex 4 //down
				array[93 ] = px+dmax.x; array[94 ] = py+dmin.y; array[95 ] = pz+dmin.z; //vertex 5
				array[96 ] = px+dmin.x; array[97 ] = py+dmin.y; array[98 ] = pz+dmax.z; //vertex 0
		
				array[99 ] = px+dmin.x; array[100] = py+dmin.y; array[101] = pz+dmax.z; //vertex 0
				array[102] = px+dmax.x; array[103] = py+dmin.y; array[104] = pz+dmin.z; //vertex 5
				array[105] = px+dmax.x; array[106] = py+dmin.y; array[107] = pz+dmax.z; //vertex 1


				verticesArray.push(...array);
			}
		}


		const verticesArrayBuffer = new Float32Array(verticesArray);
		const verticesAttributeLocation = new AttributeLocation(
			{
				number: 0,
				itemSize: 3,
				arrayBuffer: verticesArrayBuffer,

				bufferDescriptor: new BufferDescriptor(
					{
						label: "box vertices buffer",
						size: verticesArrayBuffer.length,
						usage: BufferUsage.VERTEX | BufferUsage.COPY_DST,
						mappedAtCreation: false
					}
				),
				vertexBufferLayoutDescriptor: new VertexBufferLayout(
					{
						arrayStride: 3 * 4,
						stepMode: VertexStepMode.VERTEX,
						attributes: [
							new VertexAttribute(
								{
									format: VertexFormat.FLOAT_32x3,
									offset: 0,
									shaderLocation: 0,
								}
							)
						],
					}
				)
			}
		);
		verticesAttributeLocation.setValue(
			"box vertices",
			new BufferSetInstruction(
				{
					label: "box vertices",

					number: 0,

					source: {
						arrayBuffer: verticesArrayBuffer,
						layout: {
							offset: (0),
						}
					},
					destination: {
						buffer: null,
						layout: {
							offset: (0)
						}
					},
					size: verticesArrayBuffer.length
				}
			)
		);


		return verticesAttributeLocation;
	}
	static assembleNormals(args = {}) {
		const baseGeometry = args.baseGeometry;
		const indexed = args.indexed;
		const positions = baseGeometry.positions;

		const normalsArray = new Array();


		if (indexed) {
			const array = new Array(8 * 3);


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
			const array = new Array(6 * 2 * 3 * 3);


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


		const normalsArrayBuffer = new Float32Array(normalsArray);
		const normalsAttributeLocation = new AttributeLocation(
			{
				itemSize: 3,
				arrayBuffer: normalsArrayBuffer,
				bufferDescriptor: new BufferDescriptor(
					{
						label: "box normals buffer",
						size: normalsArrayBuffer.length,
						usage: BufferUsage.VERTEX | BufferUsage.COPY_DST,
						mappedAtCreation: false
					}
				),
				vertexBufferLayoutDescriptor: new VertexBufferLayout(
					{
						arrayStride: 3 * 4,
						stepMode: VertexStepMode.VERTEX,
						attributes: [
							new VertexAttribute(
								{
									format: VertexFormat.FLOAT_32x3,
									offset: 0,
									shaderLocation: 1,
								}
							)
						],						
					}
				)
			}
		);
		// normalsAttributeLocation.normalize(); // no need to normalize for this configuration
		normalsAttributeLocation.setValue(
			"box normals",
			new BufferSetInstruction(
				{
					label: "box normals",

					number: 1,

					source: {
						arrayBuffer: normalsArrayBuffer,
						layout: {
							offset: (0),
						}
					},
					destination: {
						buffer: null,
						layout: {
							offset: (0)
						}
					},
					size: normalsArrayBuffer.length
				}
			)
		);


		return normalsAttributeLocation;
	}
	static assembleUVs(args = {}) {
		const baseGeometry = args.baseGeometry;
		const indexed = args.indexed;
		const positions = baseGeometry.positions;

		const uvsArray = new Array();


		if (indexed) {
			const array = new Array(8 * 2);


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
			const array = new Array(6 * 2 * 3 * 2);

			
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


		const uvsArrayBuffer = new Float32Array(uvsArray);
		const uvsAttributeLocation = new AttributeLocation(
			{
				itemSize: 2,
				arrayBuffer: uvsArrayBuffer,
				bufferDescriptor: new BufferDescriptor(
					{
						label: "box uvs buffer",
						size: uvsArrayBuffer.length,
						usage: BufferUsage.VERTEX | BufferUsage.COPY_DST,
						mappedAtCreation: false
					}
				),
				vertexBufferLayoutDescriptor: new VertexBufferLayout(
					{
						arrayStride: 2 * 4,
						stepMode: VertexStepMode.VERTEX,
						attributes: [
							new VertexAttribute(
								{
									format: VertexFormat.FLOAT_32x2,
									offset: 0,
									shaderLocation: 2,
								}
							)
						],
					}
				)
			}
		);
		uvsAttributeLocation.setValue(
			"box uvs",
			new BufferSetInstruction(
				{
					label: "box uvs",

					number: 2,

					source: {
						arrayBuffer: uvsArrayBuffer,
						layout: {
							offset: (0),
						}
					},
					destination: {
						buffer: null,
						layout: {
							offset: (0)
						}
					},
					size: uvsArrayBuffer.length
				}
			)
		);


		return uvsAttributeLocation;
	}
};
