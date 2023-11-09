import { BufferDescriptor } from "../core/RC/buffers/BufferDescriptor.js";
import { VertexAttribute } from "../core/RC/pipeline/vertex state/VertexAttribute.js";
import { VertexBufferLayout } from "../core/RC/pipeline/vertex state/VertexBufferLayout.js";
import { VertexFormat } from "../core/RC/pipeline/vertex state/VertexFormat.js";
import { VertexStepMode } from "../core/RC/pipeline/vertex state/VertexStepMode.js";
import { AttributeLocation } from "../core/data layouts/AttributeLocation.js";
import { MeshGeometry } from "./MeshGeometry.js";
import { BufferUsage } from "../core/RC/buffers/BufferUsage.js";
import { BufferSetInstruction } from "../core/data layouts/BufferSetInstruction.js";


export class QuadGeometry extends MeshGeometry {


	static DEFAULT = {
		TYPE: "QuadGeometry",
		NAME: "",

		INDEXED: false,
	};
	

	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : QuadGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : QuadGeometry.DEFAULT.NAME,

				indexed: (args.indexed !== undefined) ? args.indexed : QuadGeometry.DEFAULT.INDEXED,

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


	static assembleIndices(args = {}) {
		const baseGeometry = args.baseGeometry;
		const indexed = args.indexed;
		const positions = baseGeometry.positions;

		const instanceIndexSize = 4;
		const instanceVertexSize = 1 * 2 * 3 * 1;

		const indicesArray = new Array();


		if (indexed) {
			const array = new Array(instanceVertexSize);


			for (let p = 0; p < positions.length; p++) {
				const instanceOffset = instanceIndexSize * p;


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


		const indicesArrayBuffer = new Uint32Array(indicesArray);
		const indicesAttributeLocation = new AttributeLocation(
			{
				number: null,
				itemSize: 1,
				arrayBuffer: indicesArrayBuffer,

				bufferDescriptor: new BufferDescriptor(
					{
						label: "quad indices buffer",
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
			"quad indices",
			new BufferSetInstruction(
				{
					label: "quad indices",

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
		const sizes = baseGeometry.sizes;

		const verticesArray = new Array();


		if (indexed) {
			const array = new Array(4 * 3);


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
			const array = new Array(2 * 3 * 3);


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


		const verticesArrayBuffer = new Float32Array(verticesArray);
		const verticesAttributeLocation = new AttributeLocation(
			{
				itemSize: 3,
				arrayBuffer: verticesArrayBuffer,
				bufferDescriptor: new BufferDescriptor(
					{
						label: "quad vertices buffer",
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
			"quad vertices",
			new BufferSetInstruction(
				{
					label: "quad vertices",

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
			const array = new Array(4 * 3);


			for (let p = 0; p < positions.length; p++) {
				array[0  ] = +0; array[1  ] = +0; array[2  ] = +1; //vertex 0
				array[3  ] = +0; array[4  ] = +0; array[5  ] = +1; //vertex 1
				array[6  ] = +0; array[7  ] = +0; array[8  ] = +1; //vertex 2
				array[9  ] = +0; array[10 ] = +0; array[11 ] = +1; //vertex 3
		
		
				verticesArray.push(...array);
			}
		} else {
			const array = new Array(2 * 3 * 3);


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


		const normalsArrayBuffer = new Float32Array(normalsArray);
		const normalsAttributeLocation = new AttributeLocation(
			{
				itemSize: 3,
				arrayBuffer: normalsArrayBuffer,
				bufferDescriptor: new BufferDescriptor(
					{
						label: "quad normals buffer",
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
			"quad normals",
			new BufferSetInstruction(
				{
					label: "quad normals",

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
			const array = new Array(4 * 2);


			for (let p = 0; p < positions.length; p++) {
				array[0  ] = +0; array[1  ] = +0; //vertex 0
				array[2  ] = +1; array[3  ] = +0; //vertex 1
				array[4  ] = +0; array[5  ] = +1; //vertex 2
				array[6  ] = +1; array[7  ] = +1; //vertex 3
		
		
				uvsArray.push(...array);
			}
		} else {
			const array = new Array(2 * 3 * 2);


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


		const uvsArrayBuffer = new Float32Array(uvsArray);
		const uvsAttributeLocation = new AttributeLocation(
			{
				itemSize: 2,
				arrayBuffer: uvsArrayBuffer,
				bufferDescriptor: new BufferDescriptor(
					{
						label: "quad uvs buffer",
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
			"quad uvs",
			new BufferSetInstruction(
				{
					label: "quad uvs",

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
