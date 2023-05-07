import { BufferDescriptor } from "../core/RC/buffers/BufferDescriptor.js";
import { Vector3 } from "../math/Vector3.js";
import { MeshGeometry } from "./MeshGeometry.js";
import { VertexFormat } from "../core/RC/pipeline/vertex state/VertexFormat.js";
import { VertexStepMode } from "../core/RC/pipeline/vertex state/VertexStepMode.js";
import { AttributeLocation } from "../core/data layouts/AttributeLocation.js";
import { VertexBufferLayout } from "../core/RC/pipeline/vertex state/VertexBufferLayout.js";
import { VertexAttribute } from "../core/RC/pipeline/vertex state/VertexAttribute.js";
import { BufferUsage } from "../core/RC/buffers/BufferUsage.js";
import { BufferSetInstruction } from "../core/data layouts/BufferSetInstruction.js";


export class TriangleGeometry extends MeshGeometry {


	static DEFAULT = {
		TYPE: "TriangleGeometry",
		NAME: "",

		INDEXED: false,
	};
	

	constructor(args = {}) {
		super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : TriangleGeometry.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : TriangleGeometry.DEFAULT.TYPE,

				indexed: (args.indexed !== undefined) ? args.indexed : TriangleGeometry.DEFAULT.INDEXED,

				indices: (args.indices !== undefined) ? args.indices : TriangleGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : TriangleGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : TriangleGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : TriangleGeometry.assembleUVs(args),
				MMats: (args.MMats !== undefined) ? args.MMats : null,
				translations: (args.translations !== undefined) ? args.translations : null,
			}
		);
	}


	static assembleIndices(args = {}) {
		const baseGeometry = args.baseGeometry;
		const indexed = args.indexed;

		if (indexed) {
			let indicesArray = new Array();

			for (let p = 0; p < positions.length; p++) {
				const instanceIndexSize = 3;
				const instanceVertexSize = 3 * 1;
				const instanceOffset = instanceIndexSize * p;
				const array = new Array(instanceVertexSize);


				array[0] = instanceOffset+0; //vertex 0
				array[1] = instanceOffset+1; //vertex 1
				array[2] = instanceOffset+2; //vertex 2


				indicesArray = indicesArray.concat(array);
			}


			const indicesArrayBuffer = new Uint32Array(indicesArray);
			const indicesAttributeLocation = new AttributeLocation(
				{
					number: null,
					itemSize: 1,
					arrayBuffer: indicesArrayBuffer,

					bufferDescriptor: new BufferDescriptor(
						{
							label: "triangle indices buffer",
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
				"triangle indices",
				new BufferSetInstruction(
					{
						label: "triangle indices",
	
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


			return indicesAttributeLocation;
		} else {
			return null;
		}
	}
	static assembleVertices(args = {}) {
		const baseGeometry = args.baseGeometry;
		const indexed = args.indexed;
		const positions = baseGeometry.positions;

		let verticesArray = new Array();


		if (indexed) {
			for (let p = 0; p < positions.length; p+=3) {
				const array = new Array(3 * 3);
				const p1 = positions[p + 0];
				const p2 = positions[p + 1];
				const p3 = positions[p + 2];


				array[0] = p1.x; array[1] = p1.y; array[2] = p1.z; //vertex 0
				array[3] = p2.x; array[4] = p2.y; array[5] = p2.z; //vertex 1
				array[6] = p3.x; array[7] = p3.y; array[8] = p3.z; //vertex 2


				verticesArray = verticesArray.concat(array);
			}
		} else {
			for (let p = 0; p < positions.length; p+=3) {
				const array = new Array(3 * 3);
				const p1 = positions[p + 0];
				const p2 = positions[p + 1];
				const p3 = positions[p + 2];


				array[0] = p1.x; array[1] = p1.y; array[2] = p1.z; //vertex 0
				array[3] = p2.x; array[4] = p2.y; array[5] = p2.z; //vertex 1
				array[6] = p3.x; array[7] = p3.y; array[8] = p3.z; //vertex 2


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
						label: "triangle vertices buffer",
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
			"triangle vertices",
			new BufferSetInstruction(
				{
					label: "triangle vertices",

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
		const a = new Vector3();
		const b = new Vector3();
		const n = new Vector3();


		if (indexed) {
			for (let p = 0; p < positions.length; p+=3) {
				const array = new Array(3 * 3);
				const p1 = positions[p + 0];
				const p2 = positions[p + 1];
				const p3 = positions[p + 2];

				a.subVectors(p2, p1);
				b.subVectors(p3, p1);
				n.set(a.y*b.z - a.z*b.y, a.z*b.x - a.x*b.z, a.x*b.y - a.y*b.x);


				array[0] = n.x; array[1] = n.y; array[2] = n.z; //vertex 0
				array[3] = n.x; array[4] = n.y; array[5] = n.z; //vertex 1
				array[6] = n.x; array[7] = n.y; array[8] = n.z; //vertex 2


				normalsArray = normalsArray.concat(array);
			}
		} else {
			for (let p = 0; p < positions.length; p+=3) {
				const array = new Array(3 * 3);
				const p1 = positions[p + 0];
				const p2 = positions[p + 1];
				const p3 = positions[p + 2];

				a.subVectors(p2, p1);
				b.subVectors(p3, p1);
				n.set(a.y*b.z - a.z*b.y, a.z*b.x - a.x*b.z, a.x*b.y - a.y*b.x);


				array[0] = n.x; array[1] = n.y; array[2] = n.z; //vertex 0
				array[3] = n.x; array[4] = n.y; array[5] = n.z; //vertex 1
				array[6] = n.x; array[7] = n.y; array[8] = n.z; //vertex 2


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
						label: "triangle normals buffer",
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
		normalsAttributeLocation.normalize();
		normalsAttributeLocation.setValue(
			"triangle normals",
			new BufferSetInstruction(
				{
					label: "triangle normals",

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
			for (let p = 0; p < positions.length; p+=3) {
				const array = new Array(3 * 2);


				array[0] = +0; array[1] = +1; //vertex 0
				array[2] = +0; array[3] = +0; //vertex 1
				array[4] = +1; array[5] = +0; //vertex 2


				uvsArray = uvsArray.concat(array);
			}
		} else {
			for (let p = 0; p < positions.length; p+=3) {
				const array = new Array(3 * 2);


				array[0] = +0; array[1] = +1; //vertex 0
				array[2] = +0; array[3] = +0; //vertex 1
				array[4] = +1; array[5] = +0; //vertex 2


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
						label: "triangle uvs buffer",
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
			"triangle uvs",
			new BufferSetInstruction(
				{
					label: "triangle uvs",

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