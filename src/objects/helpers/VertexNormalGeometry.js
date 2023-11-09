import { BufferDescriptor } from "../../core/RC/buffers/BufferDescriptor.js";
import { MeshGeometry } from "../MeshGeometry.js";
import { AttributeLocation } from "../../core/data layouts/AttributeLocation.js";
import { VertexBufferLayout } from "../../core/RC/pipeline/vertex state/VertexBufferLayout.js";
import { VertexStepMode } from "../../core/RC/pipeline/vertex state/VertexStepMode.js";
import { VertexAttribute } from "../../core/RC/pipeline/vertex state/VertexAttribute.js";
import { VertexFormat } from "../../core/RC/pipeline/vertex state/VertexFormat.js";
import { BufferUsage } from "../../core/RC/buffers/BufferUsage.js";
import { BufferSetInstruction } from "../../core/data layouts/BufferSetInstruction.js";


export class VertexNormalGeometry extends MeshGeometry {


	static DEFAULT = {
		TYPE: "VertexNormalGeometry",
		NAME: "",

		INDEXED: false,
	};
	

	#indicators;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : VertexNormalGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : VertexNormalGeometry.DEFAULT.NAME,

				indexed: (args.indexed !== undefined) ? args.indexed : VertexNormalGeometry.DEFAULT.INDEXED,

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


	static assembleIndices(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const mesh = baseGeometry.mesh;
		const attributeLocation = mesh.geometry.normals;
		const arrayBuffer = attributeLocation.arrayBuffer;

		const instanceStride = 2;
		const instanceIndexStride = (2) * 1;
		const instanceVertexStride = (2) * 1;


		return null;
	}
	static assembleVertices(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const mesh = baseGeometry.mesh;
		const attributeLocation = mesh.geometry.vertices;
		const arrayBuffer = attributeLocation.arrayBuffer;

		const instanceStride = 2;
		const instanceIndexStride = (2) * 3;
		const instanceVertexStride = (2) * 3;

		const verticesArray = new Array();
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


		const verticesArrayBuffer = new Float32Array(verticesArray);
		const verticesAttributeLocation = new AttributeLocation(
			{
				itemSize: 3,
				arrayBuffer: verticesArrayBuffer,
				bufferDescriptor: new BufferDescriptor(
					{
						label: "vertex normal vertices buffer",
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
			"vertex normal vertices",
			new BufferSetInstruction(
				{
					label: "vertex normal vertices",

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
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const mesh = baseGeometry.mesh;
		const attributeLocation = mesh.geometry.normals;
		const arrayBuffer = attributeLocation.arrayBuffer;

		const instanceStride = 2;
		const instanceIndexStride = (2) * 3;
		const instanceVertexStride = (2) * 3;

		const normalsArray = new Array();
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


		const normalsArrayBuffer = new Float32Array(normalsArray);
		const normalsAttributeLocation = new AttributeLocation(
			{
				itemSize: 3,
				arrayBuffer: normalsArrayBuffer,
				bufferDescriptor: new BufferDescriptor(
					{
						label: "vertex normal normals buffer",
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
			"vertex normal normals",
			new BufferSetInstruction(
				{
					label: "vertex normal normals",

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
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const mesh = baseGeometry.mesh;
		const attributeLocation = mesh.geometry.uvs;
		const arrayBuffer = attributeLocation.arrayBuffer;

		const instanceStride = 2;
		const instanceIndexStride = (2) * 2;
		const instanceVertexStride = (2) * 2;

		const uvsArray = new Array();
		const array = new Array(instanceVertexStride);


		for (let p = 0; p < attributeLocation.count(); p++) {
			array[0] = arrayBuffer[p*2 + 0];
			array[1] = arrayBuffer[p*2 + 1]; //vertex 0
			
			array[2] = arrayBuffer[p*2 + 0];
			array[3] = arrayBuffer[p*2 + 1]; //vertex 1


			uvsArray.push(...array);
		}


		const uvsArrayBuffer = new Float32Array(uvsArray);
		const uvsAttributeLocation = new AttributeLocation(
			{
				itemSize: 2,
				arrayBuffer: uvsArrayBuffer,
				bufferDescriptor: new BufferDescriptor(
					{
						label: "vertex normal uvs buffer",
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
			"vertex normal uvs",
			new BufferSetInstruction(
				{
					label: "vertex normal uvs",

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

	static assembleIndicators(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const mesh = baseGeometry.mesh;
		const attributeLocation = mesh.geometry.vertices;
		const arrayBuffer = attributeLocation.arrayBuffer;

		const instanceStride = 2;
		const instanceIndexStride = (2) * 1;
		const instanceVertexStride = (2) * 1;

		const indicatorsArray = new Array();
		const array = new Array(instanceVertexStride);


		for (let p = 0; p < attributeLocation.count(); p++) {
			array[0] = 0; //vertex 0
			
			array[1] = 1; //vertex 1


			indicatorsArray.push(...array);
		}


		const indicatosArrayBuffer = new Float32Array(indicatorsArray);
		const indicatorsAttributeLocation = new AttributeLocation(
			{
				itemSize: 1,
				arrayBuffer: indicatosArrayBuffer,
				bufferDescriptor: new BufferDescriptor(
					{
						label: "vertex normal indicators buffer",
						size: indicatosArrayBuffer.length,
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
		indicatorsAttributeLocation.setValue(
			"vertex normal indicators",
			new BufferSetInstruction(
				{
					label: "vertex normal indicators",

					number: 3,

					source: {
						arrayBuffer: indicatosArrayBuffer,
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
					size: indicatosArrayBuffer.length
				}
			)
		);


		return indicatorsAttributeLocation;
	}
};
