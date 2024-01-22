import { MeshGeometry } from "./MeshGeometry.js";
import { Vector3 } from "../math/Vector3.js";
import { BufferDescriptor } from "../core/RC/buffers/BufferDescriptor.js";
import { VertexAttribute } from "../core/RC/pipeline/vertex state/VertexAttribute.js";
import { VertexBufferLayout } from "../core/RC/pipeline/vertex state/VertexBufferLayout.js";
import { VertexFormat } from "../core/RC/pipeline/vertex state/VertexFormat.js";
import { VertexStepMode } from "../core/RC/pipeline/vertex state/VertexStepMode.js";
import { AttributeLocation } from "../core/data layouts/AttributeLocation.js";
import { BufferUsage } from "../core/RC/buffers/BufferUsage.js";
import { BufferSetInstruction } from "../core/data layouts/BufferSetInstruction.js";


export class SpriteGeometry extends MeshGeometry {


	static DEFAULT = {
		TYPE: "SpriteGeometry",
		NAME: "",

		INDEXED: false,
		BASE_GEOMETRY: {
			positions: [new Vector3(0, 0, 0)],
		},
	};
	

	#deltaOffsets;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : SpriteGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SpriteGeometry.DEFAULT.NAME,

				indexed: (args.indexed !== undefined) ? args.indexed : SpriteGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : SpriteGeometry.DEFAULT.BASE_GEOMETRY,

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


	static createIndicesArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;

		const instanceStride = 4;
		const instanceIndexStride = (2 * 3) * 1;
		const instanceVertexStride = (2 * 3) * 1;

		const indicesArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


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

				label: (args.label !== undefined) ? args.label : "sprite indices buffer",
			}
		);
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		super.setValueIndices(
			indicesAttributeLocation,
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "sprite indices",
			}
			);
	}
	static assembleIndices(args = {}) {
		const indicesArrayBuffer = SpriteGeometry.createIndicesArrayBuffer(args);
		const indicesAttributeLocation = SpriteGeometry.createIndicesAttributeLocation(indicesArrayBuffer, args);
		SpriteGeometry.setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args);


		return args.indexed ? indicesAttributeLocation : null;
	}

	static createVerticesArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;

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


				array[0  ] = px; array[1  ] = py; array[2  ] = pz; //vertex 0
				array[3  ] = px; array[4  ] = py; array[5  ] = pz; //vertex 1
				array[6  ] = px; array[7  ] = py; array[8  ] = pz; //vertex 2
				array[9  ] = px; array[10 ] = py; array[11 ] = pz; //vertex 3
		
		
				verticesArray.push(...array);
			}
		} else {
			const array = new Array(instanceVertexStride);


			for (let p = 0; p < positions.length; p++) {
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

				label: (args.label !== undefined) ? args.label : "sprite vertices buffer",
			}
		);
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		super.setValueVertices(
			verticesAttributeLocation,
			verticesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "sprite vertices",
			}
		);
	}
	static assembleVertices(args = {}) {
		const verticesArrayBuffer = SpriteGeometry.createVerticesArrayBuffer(args);
		const verticesAttributeLocation = SpriteGeometry.createVerticesAttributeLocation(verticesArrayBuffer, args);
		SpriteGeometry.setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args);


		return verticesAttributeLocation;
	}

	static createNormalsArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;

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
		
		
				normalsArray.push(...array);
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

				label: (args.label !== undefined) ? args.label : "sprite normals buffer",
			}
		);
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		super.setValueNormals(
			normalsAttributeLocation,
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "sprite normals",
			}
		);
	}
	static assembleNormals(args = {}) {
		const normalsArrayBuffer = SpriteGeometry.createNormalsArrayBuffer(args);
		const normalsAttributeLocation = SpriteGeometry.createNormalsAttributeLocation(normalsArrayBuffer, args);
		SpriteGeometry.setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args);


		return normalsAttributeLocation;
	}
	
	static createUVsArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;

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

				label: (args.label !== undefined) ? args.label : "sprite uvs buffer",
			}
		);
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		super.setValueUVs(
			uvsAttributeLocation,
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "sprite uvs",
			}
		);
	}
	static assembleUVs(args = {}) {
		const uvsArrayBuffer = SpriteGeometry.createUVsArrayBuffer(args);
		const uvsAttributeLocation = SpriteGeometry.createUVsAttributeLocation(uvsArrayBuffer, args);
		SpriteGeometry.setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args);


		return uvsAttributeLocation;
	}

	static createDirectionsArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;

		const instanceStride = 4;
		const instanceIndexStride = (4) * 2;
		const instanceVertexStride = (2 * 3) * 2;

		const directionsArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < positions.length; p++) {
				const position = positions[p];
				const px = position.x;
				const py = position.y;
				const pz = position.z;


				array[0  ] = -1; array[1  ] = -1; //vertex 0
				array[2  ] = +1; array[3  ] = -1; //vertex 1
				array[4  ] = -1; array[5  ] = +1; //vertex 2
				array[6  ] = +1; array[7  ] = +1; //vertex 3
		
		
				directionsArray.push(...array);
			}
		} else {
			const array = new Array(instanceVertexStride);


			for (let p = 0; p < positions.length; p++) {
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
		
		
				directionsArray.push(...array);
			}
		}


		return new Float32Array(directionsArray);
	}
	static createDirectionsAttributeLocation(directionsArrayBuffer, args = {}) {
		const label = (args.label !== undefined) ? args.label : "sprite directions buffer";


		return new AttributeLocation(
			{
				itemSize: 2,
				arrayBuffer: directionsArrayBuffer,
				bufferDescriptor: new BufferDescriptor(
					{
						label: label,
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
	}
	static setValueDirections(directionsAttributeLocation, directionsArrayBuffer, args = {}) {
		const label = (args.label !== undefined) ? args.label : "sprite directions";


		directionsAttributeLocation.setValue(
			label,
			new BufferSetInstruction(
				{
					label: label,

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
	}
	static assembleDirections(args = {}) {
		const directionsArrayBuffer = SpriteGeometry.createDirectionsArrayBuffer(args);
		const directionsAttributeLocation = SpriteGeometry.createDirectionsAttributeLocation(directionsArrayBuffer, args);
		SpriteGeometry.setValueDirections(directionsAttributeLocation, directionsArrayBuffer, args);


		return directionsAttributeLocation;
	}
};
