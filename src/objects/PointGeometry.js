import { BufferDescriptor } from "../core/RC/buffers/BufferDescriptor.js";
import { MeshGeometry } from "./MeshGeometry.js";
import { AttributeLocation } from "../core/data layouts/AttributeLocation.js";
import { VertexBufferLayout } from "../core/RC/pipeline/vertex state/VertexBufferLayout.js";
import { VertexStepMode } from "../core/RC/pipeline/vertex state/VertexStepMode.js";
import { VertexAttribute } from "../core/RC/pipeline/vertex state/VertexAttribute.js";
import { VertexFormat } from "../core/RC/pipeline/vertex state/VertexFormat.js";
import { BufferUsage } from "../core/RC/buffers/BufferUsage.js";
import { BufferSetInstruction } from "../core/data layouts/BufferSetInstruction.js";


export class PointGeometry extends MeshGeometry {


	static DEFAULT = {
		TYPE: "PointGeometry",
		NAME: "",

		INDEXED: false,
	};
	

	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : PointGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : PointGeometry.DEFAULT.NAME,

				indexed: (args.indexed !== undefined) ? args.indexed : PointGeometry.DEFAULT.INDEXED,

				indices: (args.indices !== undefined) ? args.indices : PointGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : PointGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : PointGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : PointGeometry.assembleUVs(args),
				MMats: (args.MMats !== undefined) ? args.MMats : null,
				translations: (args.translations !== undefined) ? args.translations : null,
			}
		);
	}


	static assembleIndices(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;

		const instanceStride = 1;
		const instanceIndexStride = (1) * 1;
		const instanceVertexStride = (1) * 1;

		const indicesArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < positions.length; p++) {
				const instanceOffset = instanceStride * p;


				array[0] = instanceOffset+0; //vertex 0


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
						label: "point indices buffer",
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
			"point indices",
			new BufferSetInstruction(
				{
					label: "point indices",

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
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;

		const instanceStride = 1;
		const instanceIndexStride = (1) * 3;
		const instanceVertexStride = (1) * 3;

		const verticesArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < positions.length; p++) {
				const position = positions[p];
				const px = position.x;
				const py = position.y;
				const pz = position.z;


				array[0] = px; array[1] = py; array[2] = pz; //vertex 0


				verticesArray.push(...array);
			}
		} else {
			const array = new Array(instanceVertexStride);


			for (let p = 0; p < positions.length; p++) {
				const position = positions[p];
				const px = position.x;
				const py = position.y;
				const pz = position.z;


				array[0] = px; array[1] = py; array[2] = pz; //vertex 0


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
							label: "point vertices buffer",
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
				"point vertices",
				new BufferSetInstruction(
					{
						label: "point vertices",
	
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
		const positions = baseGeometry.positions;

		const instanceStride = 1;
		const instanceIndexStride = (1) * 3;
		const instanceVertexStride = (1) * 3;

		const normalsArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < positions.length; p++) {
				array[0] = +0; array[1] = +0; array[2] = +1; //vertex 0


				normalsArray.push(...array);
			}
		} else {
			const array = new Array(instanceVertexStride);


			for (let p = 0; p < positions.length; p++) {
				array[0] = +0; array[1] = +0; array[2] = +1; //vertex 0


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
						label: "point normals buffer",
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
			"point normals",
			new BufferSetInstruction(
				{
					label: "point normals",

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
		const positions = baseGeometry.positions;

		const instanceStride = 1;
		const instanceIndexStride = (1) * 2;
		const instanceVertexStride = (1) * 2;

		const uvsArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < positions.length; p++) {
				array[0] = +0; array[1] = +0; //vertex 0


				uvsArray.push(...array);
			}
		} else {
			const array = new Array(instanceVertexStride);


			for (let p = 0; p < positions.length; p++) {
				array[0] = +0; array[1] = +0; //vertex 0


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
						label: "point uvs buffer",
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
			"point uvs",
			new BufferSetInstruction(
				{
					label: "point uvs",

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
