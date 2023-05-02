import { BufferDescriptor } from "../core/RC/buffers/BufferDescriptor.js";
import { MeshGeometry } from "./MeshGeometry.js";
import { AttributeLocation } from "../core/data layouts/AttributeLocation.js";
import { VertexBufferLayout } from "../core/RC/pipeline/vertex state/VertexBufferLayout.js";
import { VertexStepMode } from "../core/RC/pipeline/vertex state/VertexStepMode.js";
import { VertexAttribute } from "../core/RC/pipeline/vertex state/VertexAttribute.js";
import { VertexFormat } from "../core/RC/pipeline/vertex state/VertexFormat.js";
import { BufferUsage } from "../core/RC/buffers/BufferUsage.js";
import { BufferSetInstruction } from "../core/data layouts/BufferSetInstruction.js";


export class LineGeometry extends MeshGeometry {


	static DEFAULT = {
		TYPE: "LineGeometry",
		NAME: "",

		INDEXED: false,
	};
	

	constructor(args = {}) {
		super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : LineGeometry.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : LineGeometry.DEFAULT.TYPE,

				indexed: (args.indexed !== undefined) ? args.indexed : LineGeometry.DEFAULT.INDEXED,

				indices: (args.indices !== undefined) ? args.indices : LineGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : LineGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : LineGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : LineGeometry.assembleUVs(args),
				MMats: (args.MMats !== undefined) ? args.MMats : null,
				translations: (args.translations !== undefined) ? args.translations : null,
			}
		);
	}


	static assembleIndices(args = {}) {
		const baseGeometry = args.baseGeometry;
		const indexed = args.indexed;

		if (indexed) {
			//TODO
		} else {
			return null;
		}
	}
	static assembleVertices(args = {}) {
		const baseGeometry = args.baseGeometry;
		const indexed = args.indexed;
		const positions = baseGeometry.positions;

		if (indexed) {

		} else {
			let verticesArray = new Array();

			for (let p = 0; p < positions.length; p+=2) {
				const array = new Array(2 * 3);
				const position1 = positions[p];
				const position2 = positions[p + 1];
				const px1 = position1.x;
				const py1 = position1.y;
				const pz1 = position1.z;
				const px2 = position2.x;
				const py2 = position2.y;
				const pz2 = position2.z;


				array[0] = px1; array[1] = py1; array[2] = pz1;
				array[3] = px2; array[4] = py2; array[5] = pz2;


				verticesArray = verticesArray.concat(array);
			}

			const verticesArrayBuffer = new Float32Array(verticesArray);
			const verticesAttributeLocation = new AttributeLocation(
				{
					itemSize: 3,
					arrayBuffer: verticesArrayBuffer,
					bufferDescriptor: new BufferDescriptor(
						{
							label: "line vertices buffer",
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
				"line vertices",
				new BufferSetInstruction(
					{
						label: "line vertices",
	
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
	}
	static assembleNormals(args = {}) {
		const baseGeometry = args.baseGeometry;
		const indexed = args.indexed;
		const positions = baseGeometry.positions;

		if (indexed) {
			//TODO
		} else {
			let normalsArray = new Array();

			for (let p = 0; p < positions.length; p+=2) {
				const array = new Array(2 * 3);


				array[0] = +0; array[1] = +0; array[2] = +1;
				array[3] = +0; array[4] = +0; array[5] = +1;


				normalsArray = normalsArray.concat(array);
			}

			const normalsArrayBuffer = new Float32Array(normalsArray);
			const normalsAttributeLocation = new AttributeLocation(
				{
					itemSize: 3,
					arrayBuffer: normalsArrayBuffer,
					bufferDescriptor: new BufferDescriptor(
						{
							label: "line normals buffer",
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
				"line normals",
				new BufferSetInstruction(
					{
						label: "line normals",
	
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
	}
	static assembleUVs(args = {}) {
		const baseGeometry = args.baseGeometry;
		const indexed = args.indexed;
		const positions = baseGeometry.positions;

		if (indexed) {
			//TODO
		} else {
			let uvsArray = new Array();

			for (let p = 0; p < positions.length; p+=2) {
				const array = new Array(2 * 2);


				array[0] = +0; array[1] = +0;
				array[2] = +0; array[3] = +0;


				uvsArray = uvsArray.concat(array);
			}

			const uvsArrayBuffer = new Float32Array(uvsArray);
			const uvsAttributeLocation = new AttributeLocation(
				{
					itemSize: 2,
					arrayBuffer: uvsArrayBuffer,
					bufferDescriptor: new BufferDescriptor(
						{
							label: "line uvs buffer",
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
				"line uvs",
				new BufferSetInstruction(
					{
						label: "line uvs",
	
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
	}
};