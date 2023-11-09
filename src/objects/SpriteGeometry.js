import { BufferDescriptor } from "../core/RC/buffers/BufferDescriptor.js";
import { VertexAttribute } from "../core/RC/pipeline/vertex state/VertexAttribute.js";
import { VertexBufferLayout } from "../core/RC/pipeline/vertex state/VertexBufferLayout.js";
import { VertexFormat } from "../core/RC/pipeline/vertex state/VertexFormat.js";
import { VertexStepMode } from "../core/RC/pipeline/vertex state/VertexStepMode.js";
import { AttributeLocation } from "../core/data layouts/AttributeLocation.js";
import { MeshGeometry } from "./MeshGeometry.js";
import { BufferUsage } from "../core/RC/buffers/BufferUsage.js";
import { BufferSetInstruction } from "../core/data layouts/BufferSetInstruction.js";


export class SpriteGeometry extends MeshGeometry {


	static DEFAULT = {
		TYPE: "SpriteGeometry",
		NAME: "",

		INDEXED: false,
	};
	

	#deltaOffsets;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : SpriteGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SpriteGeometry.DEFAULT.NAME,

				indexed: (args.indexed !== undefined) ? args.indexed : SpriteGeometry.DEFAULT.INDEXED,

				indices: (args.indices !== undefined) ? args.indices : SpriteGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : SpriteGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : SpriteGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : SpriteGeometry.assembleUVs(args),
				MMats: (args.MMats !== undefined) ? args.MMats : null,
				translations: (args.translations !== undefined) ? args.translations : null,
			}
		);

		this.deltaOffsets = (args.deltaOffsets !== undefined) ? args.deltaOffsets : SpriteGeometry.assembleDirections(args);
	}


	get deltaOffsets() { return this.#deltaOffsets; }
	set deltaOffsets(deltaOffsets) { 
		this.#deltaOffsets = deltaOffsets;
		this.attributeLocationDescriptors.set("deltaOffsets", deltaOffsets);
	}


	static assembleIndices(args = {}) {
		const baseGeometry = args.baseGeometry;
		const indexed = args.indexed;
		const positions = baseGeometry.positions;

		const instanceIndexSize = 4;
		const instanceVertexSize = 1 * 2 * 3 * 1;

		let indicesArray = new Array();


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


				indicesArray = indicesArray.concat(array);
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
						label: "sprite indices buffer",
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
			"sprite indices",
			new BufferSetInstruction(
				{
					label: "sprite indices",

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

		let verticesArray = new Array();


		if (indexed) {
			for (let p = 0; p < positions.length; p++) {
				const array = new Array(4 * 3);
				const position = positions[p];
				const px = position.x;
				const py = position.y;
				const pz = position.z;


				array[0  ] = px; array[1  ] = py; array[2  ] = pz; //vertex 0
				array[3  ] = px; array[4  ] = py; array[5  ] = pz; //vertex 1
				array[6  ] = px; array[7  ] = py; array[8  ] = pz; //vertex 2
				array[9  ] = px; array[10 ] = py; array[11 ] = pz; //vertex 3
		
		
				verticesArray = verticesArray.concat(array);
			}
		} else {
			for (let p = 0; p < positions.length; p++) {
				const array = new Array(2 * 3 * 3);
				const position = positions[p];
				const px = position.x;
				const py = position.y;
				const pz = position.z;


				array[0  ] = px; array[1  ] = py; array[2  ] = pz; //vertex 0
				array[3  ] = px; array[4  ] = py; array[5  ] = pz; //vertex 1
				array[6  ] = px; array[7  ] = py; array[8  ] = pz; //vertex 2
		
				array[9  ] = px; array[10 ] = py; array[11 ] = pz; //vertex 2
				array[12 ] = px; array[13 ] = py; array[14 ] = pz; //vertex 1
				array[15 ] = px; array[16 ] = py; array[17 ] = pz; //vertex 3
		
		
				verticesArray = verticesArray.concat(array);
			}
		}


		const verticesArrayBuffer = new Float32Array(verticesArray);
		const verticesAttributeLocation = new AttributeLocation(
			{
				itemSize: 3,
				arrayBuffer: verticesArrayBuffer,
				bufferDescriptor: new BufferDescriptor(
					{
						label: "sprite vertices buffer",
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
			"sprite vertices",
			new BufferSetInstruction(
				{
					label: "sprite vertices",

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

		let normalsArray = new Array();


		if (indexed) {
			for (let p = 0; p < positions.length; p++) {
				const array = new Array(4 * 3);


				array[0  ] = +0; array[1  ] = +0; array[2  ] = +1; //vertex 0
				array[3  ] = +0; array[4  ] = +0; array[5  ] = +1; //vertex 1
				array[6  ] = +0; array[7  ] = +0; array[8  ] = +1; //vertex 2
				array[9  ] = +0; array[10 ] = +0; array[11 ] = +1; //vertex 3
		
		
				normalsArray = normalsArray.concat(array);
			}
		} else {
			for (let p = 0; p < positions.length; p++) {
				const array = new Array(2 * 3 * 3);


				array[0  ] = +0; array[1  ] = +0; array[2  ] = +1; //vertex 0
				array[3  ] = +0; array[4  ] = +0; array[5  ] = +1; //vertex 1
				array[6  ] = +0; array[7  ] = +0; array[8  ] = +1; //vertex 2
		
				array[9  ] = +0; array[10 ] = +0; array[11 ] = +1; //vertex 2
				array[12 ] = +0; array[13 ] = +0; array[14 ] = +1; //vertex 1
				array[15 ] = +0; array[16 ] = +0; array[17 ] = +1; //vertex 3
		
		
				normalsArray = normalsArray.concat(array);
			}
		}


		const normalsArrayBuffer = new Float32Array(normalsArray);
		const normalsAttributeLocation = new AttributeLocation(
			{
				itemSize: 3,
				arrayBuffer: normalsArrayBuffer,
				bufferDescriptor: new BufferDescriptor(
					{
						label: "sprite normals buffer",
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
			"sprite normals",
			new BufferSetInstruction(
				{
					label: "sprite normals",

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

		let uvsArray = new Array();


		if (indexed) {
			for (let p = 0; p < positions.length; p++) {
				const array = new Array(4 * 2);


				array[0  ] = +0; array[1  ] = +0; //vertex 0
				array[2  ] = +1; array[3  ] = +0; //vertex 1
				array[4  ] = +0; array[5  ] = +1; //vertex 2
				array[6  ] = +1; array[7  ] = +1; //vertex 3
		
		
				uvsArray = uvsArray.concat(array);
			}
		} else {
			for (let p = 0; p < positions.length; p++) {
				const array = new Array(2 * 3 * 2);


				array[0  ] = +0; array[1  ] = +0; //vertex 0
				array[2  ] = +1; array[3  ] = +0; //vertex 1
				array[4  ] = +0; array[5  ] = +1; //vertex 2
		
				array[6  ] = +0; array[7  ] = +1; //vertex 2
				array[8  ] = +1; array[9  ] = +0; //vertex 1
				array[10 ] = +1; array[11 ] = +1; //vertex 3
		
		
				uvsArray = uvsArray.concat(array);
			}
		}


		const uvsArrayBuffer = new Float32Array(uvsArray);
		const uvsAttributeLocation = new AttributeLocation(
			{
				itemSize: 2,
				arrayBuffer: uvsArrayBuffer,
				bufferDescriptor: new BufferDescriptor(
					{
						label: "sprite uvs buffer",
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
			"sprite uvs",
			new BufferSetInstruction(
				{
					label: "sprite uvs",

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

	static assembleDirections(args = {}) {
		const baseGeometry = args.baseGeometry;
		const indexed = args.indexed;
		const positions = baseGeometry.positions;

		let directionsArray = new Array();


		if (indexed) {
			for (let p = 0; p < positions.length; p++) {
				const array = new Array(4* 2);
				const position = positions[p];
				const px = position.x;
				const py = position.y;
				const pz = position.z;


				array[0  ] = -1; array[1  ] = -1; //vertex 0
				array[2  ] = +1; array[3  ] = -1; //vertex 1
				array[4  ] = -1; array[5  ] = +1; //vertex 2
				array[6  ] = +1; array[7  ] = +1; //vertex 3
		
		
				directionsArray = directionsArray.concat(array);
			}
		} else {
			for (let p = 0; p < positions.length; p++) {
				const array = new Array(2 * 3 * 2);
				const position = positions[p];
				const px = position.x;
				const py = position.y;
				const pz = position.z;


				array[0  ] = -1; array[1  ] = -1; //vertex 0
				array[2  ] = +1; array[3  ] = -1; //vertex 1
				array[4  ] = -1; array[5  ] = +1; //vertex 2
		
				array[6  ] = -1; array[7  ] = +1; //vertex 2
				array[8  ] = +1; array[9  ] = -1; //vertex 1
				array[10 ] = +1; array[11 ] = +1; //vertex 3
		
		
				directionsArray = directionsArray.concat(array);
			}
		}


		const directionsArrayBuffer = new Float32Array(directionsArray);
		const directionsAttributeLocation = new AttributeLocation(
			{
				itemSize: 2,
				arrayBuffer: directionsArrayBuffer,
				bufferDescriptor: new BufferDescriptor(
					{
						label: "sprite directions buffer",
						size: directionsArrayBuffer.length,
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
									shaderLocation: 3,
								}
							)
						],						
					}
				)
			}
		);
		directionsAttributeLocation.setValue(
			"sprite vertices",
			new BufferSetInstruction(
				{
					label: "sprite vertices",

					number: 3,

					source: {
						arrayBuffer: directionsArrayBuffer,
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
					size: directionsArrayBuffer.length
				}
			)
		);


		return directionsAttributeLocation;
	}
};
