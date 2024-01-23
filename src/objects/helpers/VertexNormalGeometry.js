import { BufferDescriptor } from "../../core/RC/buffers/BufferDescriptor.js";
import { MeshGeometry } from "../MeshGeometry.js";
import { AttributeLocation } from "../../core/data layouts/AttributeLocation.js";
import { VertexBufferLayout } from "../../core/RC/pipeline/vertex state/VertexBufferLayout.js";
import { VertexStepMode } from "../../core/RC/pipeline/vertex state/VertexStepMode.js";
import { VertexAttribute } from "../../core/RC/pipeline/vertex state/VertexAttribute.js";
import { VertexFormat } from "../../core/RC/pipeline/vertex state/VertexFormat.js";
import { BufferUsage } from "../../core/RC/buffers/BufferUsage.js";
import { BufferSetInstruction } from "../../core/data layouts/BufferSetInstruction.js";
import { Vector3 } from "../../math/Vector3.js";
import { Cube } from "../Cube.js";


export class VertexNormalGeometry extends MeshGeometry {


	static DEFAULT = {
		TYPE: "VertexNormalGeometry",
		NAME: "",

		INDEXED: false,
		BASE_GEOMETRY: {
			// positions: [new Vector3(0, 0, 0)],
			mesh: new Cube(),
		},
	};
	

	#indicators;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : VertexNormalGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : VertexNormalGeometry.DEFAULT.NAME,

				indexed: (args.indexed !== undefined) ? args.indexed : VertexNormalGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : VertexNormalGeometry.DEFAULT.BASE_GEOMETRY,

				indices: (args.indices !== undefined) ? args.indices : VertexNormalGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : VertexNormalGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : VertexNormalGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : VertexNormalGeometry.assembleUVs(args),
				MMats: (args.MMats !== undefined) ? args.MMats : null,
				translations: (args.translations !== undefined) ? args.translations : null,
			}
		);

		this.indicators = (args.indicators !== undefined) ? args.indicators : VertexNormalGeometry.assembleIndicators(args);
	}


	get indicators() { return this.#indicators; }
	set indicators(indicators) {
		this.#indicators = indicators;
		this.attributeLocationDescriptors.set("indicators", indicators);
	}


	static createIndicesArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const mesh = baseGeometry.mesh;
		const attributeLocation = mesh.geometry.normals;
		const arrayBuffer = attributeLocation.arrayBuffer;

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

				label: (args.label !== undefined) ? args.label : "vertex normal indices buffer",
			}
		);
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		super.setValueIndices(
			indicesAttributeLocation,
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "vertex normal indices",
			}
			);
	}
	static assembleIndices(args = {}) {
		const indicesArrayBuffer = VertexNormalGeometry.createIndicesArrayBuffer(args);
		const indicesAttributeLocation = VertexNormalGeometry.createIndicesAttributeLocation(indicesArrayBuffer, args);
		VertexNormalGeometry.setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args);


		return args.indexed ? indicesAttributeLocation : null;
	}

	static createVerticesArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const mesh = baseGeometry.mesh;
		const attributeLocation = mesh.geometry.vertices;
		const arrayBuffer = attributeLocation.arrayBuffer;

		const instanceStride = 2;
		const instanceIndexStride = (2) * 3;
		const instanceVertexStride = (2) * 3;

		const verticesArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < attributeLocation.count(); p++) {
				array[0] = arrayBuffer[p*3 + 0];
				array[1] = arrayBuffer[p*3 + 1];
				array[2] = arrayBuffer[p*3 + 2]; //vertex 0
				
				array[3] = arrayBuffer[p*3 + 0];
				array[4] = arrayBuffer[p*3 + 1];
				array[5] = arrayBuffer[p*3 + 2]; //vertex 1
	
	
				verticesArray.push(...array);
			}
		} else {
			const array = new Array(instanceVertexStride);


			for (let p = 0; p < attributeLocation.count(); p++) {
				array[0] = arrayBuffer[p*3 + 0];
				array[1] = arrayBuffer[p*3 + 1];
				array[2] = arrayBuffer[p*3 + 2]; //vertex 0
				
				array[3] = arrayBuffer[p*3 + 0];
				array[4] = arrayBuffer[p*3 + 1];
				array[5] = arrayBuffer[p*3 + 2]; //vertex 1
	
	
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

				label: (args.label !== undefined) ? args.label : "vertex normal vertices buffer",
			}
		);
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		super.setValueVertices(
			verticesAttributeLocation,
			verticesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "vertex normal vertices",
			}
		);
	}
	static assembleVertices(args = {}) {
		const verticesArrayBuffer = VertexNormalGeometry.createVerticesArrayBuffer(args);
		const verticesAttributeLocation = VertexNormalGeometry.createVerticesAttributeLocation(verticesArrayBuffer, args);
		VertexNormalGeometry.setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args);


		return verticesAttributeLocation;
	}

	static createNormalsArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const mesh = baseGeometry.mesh;
		const attributeLocation = mesh.geometry.normals;
		const arrayBuffer = attributeLocation.arrayBuffer;

		const instanceStride = 2;
		const instanceIndexStride = (2) * 3;
		const instanceVertexStride = (2) * 3;

		const normalsArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < attributeLocation.count(); p++) {
				array[0] = arrayBuffer[p*3 + 0];
				array[1] = arrayBuffer[p*3 + 1];
				array[2] = arrayBuffer[p*3 + 2]; //vertex 0
				
				array[3] = arrayBuffer[p*3 + 0];
				array[4] = arrayBuffer[p*3 + 1];
				array[5] = arrayBuffer[p*3 + 2]; //vertex 1
	
	
				normalsArray.push(...array);
			}
		} else {
			const array = new Array(instanceVertexStride);


			for (let p = 0; p < attributeLocation.count(); p++) {
				array[0] = arrayBuffer[p*3 + 0];
				array[1] = arrayBuffer[p*3 + 1];
				array[2] = arrayBuffer[p*3 + 2]; //vertex 0
				
				array[3] = arrayBuffer[p*3 + 0];
				array[4] = arrayBuffer[p*3 + 1];
				array[5] = arrayBuffer[p*3 + 2]; //vertex 1
	
	
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

				label: (args.label !== undefined) ? args.label : "vertex normal normals buffer",
			}
		);
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		super.setValueNormals(
			normalsAttributeLocation,
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "vertex normal normals",
			}
		);
	}
	static assembleNormals(args = {}) {
		const normalsArrayBuffer = VertexNormalGeometry.createNormalsArrayBuffer(args);
		const normalsAttributeLocation = VertexNormalGeometry.createNormalsAttributeLocation(normalsArrayBuffer, args);
		VertexNormalGeometry.setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args);


		return normalsAttributeLocation;
	}
	
	static createUVsArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const mesh = baseGeometry.mesh;
		const attributeLocation = mesh.geometry.uvs;
		const arrayBuffer = attributeLocation.arrayBuffer;

		const instanceStride = 2;
		const instanceIndexStride = (2) * 2;
		const instanceVertexStride = (2) * 2;

		const uvsArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < attributeLocation.count(); p++) {
				array[0] = arrayBuffer[p*2 + 0];
				array[1] = arrayBuffer[p*2 + 1]; //vertex 0
				
				array[2] = arrayBuffer[p*2 + 0];
				array[3] = arrayBuffer[p*2 + 1]; //vertex 1
	
	
				uvsArray.push(...array);
			}
		} else {
			const array = new Array(instanceVertexStride);


			for (let p = 0; p < attributeLocation.count(); p++) {
				array[0] = arrayBuffer[p*2 + 0];
				array[1] = arrayBuffer[p*2 + 1]; //vertex 0
				
				array[2] = arrayBuffer[p*2 + 0];
				array[3] = arrayBuffer[p*2 + 1]; //vertex 1
	
	
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

				label: (args.label !== undefined) ? args.label : "vertex normal uvs buffer",
			}
		);
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		super.setValueUVs(
			uvsAttributeLocation,
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "vertex normal uvs",
			}
		);
	}
	static assembleUVs(args = {}) {
		const uvsArrayBuffer = VertexNormalGeometry.createUVsArrayBuffer(args);
		const uvsAttributeLocation = VertexNormalGeometry.createUVsAttributeLocation(uvsArrayBuffer, args);
		VertexNormalGeometry.setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args);


		return uvsAttributeLocation;
	}

	static createIndicatorsArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const mesh = baseGeometry.mesh;
		const attributeLocation = mesh.geometry.vertices;
		const arrayBuffer = attributeLocation.arrayBuffer;

		const instanceStride = 2;
		const instanceIndexStride = (2) * 1;
		const instanceVertexStride = (2) * 1;

		const indicatorsArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < attributeLocation.count(); p++) {
				array[0] = 0; //vertex 0
				
				array[1] = 1; //vertex 1
	
	
				indicatorsArray.push(...array);
			}
		} else {
			const array = new Array(instanceVertexStride);


			for (let p = 0; p < attributeLocation.count(); p++) {
				array[0] = 0; //vertex 0
				
				array[1] = 1; //vertex 1
	
	
				indicatorsArray.push(...array);
			}
		}


		return new Float32Array(indicatorsArray);
	}
	static createIndicatorsAttributeLocation(indicatorsArrayBuffer, args = {}) {
		const label = (args.label !== undefined) ? args.label : "vertex normal indicators buffer";


		return  new AttributeLocation(
			{
				itemSize: 1,
				arrayBuffer: indicatorsArrayBuffer,
				bufferDescriptor: new BufferDescriptor(
					{
						label: label,
						size: indicatorsArrayBuffer.length,
						usage: BufferUsage.VERTEX | BufferUsage.COPY_DST,
						mappedAtCreation: false
					}
				),
				vertexBufferLayoutDescriptor: new VertexBufferLayout(
					{
						arrayStride: 1 * 4,
						stepMode: VertexStepMode.VERTEX,
						attributes: [
							new VertexAttribute(
								{
									format: VertexFormat.FLOAT_32,
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
	static setValueIndicators(indicatorsAttributeLocation, indicatorsArrayBuffer, args = {}) {
		const label = (args.label !== undefined) ? args.label : "vertex normal indicators";


		indicatorsAttributeLocation.setValue(
			label,
			new BufferSetInstruction(
				{
					label: label,

					number: 3,

					source: {
						arrayBuffer: indicatorsArrayBuffer,
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
					size: indicatorsArrayBuffer.length
				}
			)
		);
	}
	static assembleIndicators(args = {}) {
		const indicatorsArrayBuffer = VertexNormalGeometry.createIndicatorsArrayBuffer(args);
		const indicatorsAttributeLocation = VertexNormalGeometry.createIndicatorsAttributeLocation(indicatorsArrayBuffer, args);
		VertexNormalGeometry.setValueIndicators(indicatorsAttributeLocation, indicatorsArrayBuffer, args);


		return indicatorsAttributeLocation;
	}
};
