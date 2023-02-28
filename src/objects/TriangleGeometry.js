import { BufferDescriptor } from "../core/RC/buffers/BufferDescriptor.js";
import { Vector3 } from "../math/Vector3.js";
import { MeshGeometry } from "./MeshGeometry.js";
import { VertexFormat } from "../core/RC/pipeline/vertex state/VertexFormat.js";
import { VertexStepMode } from "../core/RC/pipeline/vertex state/VertexStepMode.js";
import { AttributeDescriptor } from "../core/data layouts/AttributeDescriptor.js";
import { VertexBufferLayout } from "../core/RC/pipeline/vertex state/VertexBufferLayout.js";
import { VertexAttribute } from "../core/RC/pipeline/vertex state/VertexAttribute.js";


export class TriangleGeometry extends MeshGeometry {


	static DEFAULT = {
		TYPE: "TriangleGeometry",
		NAME: "",
	};
	

	constructor(args = {}) {
		super(
			{
				...args,
				name: (args.name !== undefined) ? args.name : TriangleGeometry.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : TriangleGeometry.DEFAULT.TYPE,

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

			for (let p = 0; p < positions.length; p+=3) {
				const array = new Array(3 * 3);
				const p1 = positions[p + 0];
				const p2 = positions[p + 1];
				const p3 = positions[p + 2];


				array[0] = p1.x; array[1] = p1.y; array[2] = p1.z;
				array[3] = p2.x; array[4] = p2.y; array[5] = p2.z;
				array[6] = p3.x; array[7] = p3.y; array[8] = p3.z;


				verticesArray = verticesArray.concat(array);
			}

			const verticesArrayBuffer = new Float32Array(verticesArray);
			const verticesBufferDescriptor = new BufferDescriptor(
                {
					label: "triangle vertices buffer",
					size: verticesArrayBuffer.length,
                    itemSize: 3,

					arrayBuffer: verticesArrayBuffer,
                }
            );
			const verticesAttributeDescriptor = new AttributeDescriptor(
				{
					bufferDescriptor: verticesBufferDescriptor,
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


			return verticesAttributeDescriptor;
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
			const a = new Vector3();
			const b = new Vector3();
			const n = new Vector3();

			for (let p = 0; p < positions.length; p+=3) {
				const array = new Array(3 * 3);
				const p1 = positions[p + 0];
				const p2 = positions[p + 1];
				const p3 = positions[p + 2];

				a.subVectors(p2, p1);
				b.subVectors(p3, p1);
				n.set(a.y*b.z - a.z*b.y, a.z*b.x - a.x*b.z, a.x*b.y - a.y*b.x);


				array[0] = n.x; array[1] = n.y; array[2] = n.z;
				array[3] = n.x; array[4] = n.y; array[5] = n.z;
				array[6] = n.x; array[7] = n.y; array[8] = n.z;


				normalsArray = normalsArray.concat(array);
			}

			const normalsArrayBuffer = new Float32Array(normalsArray);
			const normalsBufferDescriptor = new BufferDescriptor(
                {
					label: "triangle normals buffer",
					size: normalsArrayBuffer.length,
                    itemSize: 3,

					arrayBuffer: normalsArrayBuffer,
                }
            );
			normalsBufferDescriptor.normalize();
			const normalsAttributeDescriptor = new AttributeDescriptor(
				{
					bufferDescriptor: normalsBufferDescriptor,
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


			return normalsAttributeDescriptor;
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

			for (let p = 0; p < positions.length; p+=3) {
				const array = new Array(3 * 2);


				array[0] = +0; array[1] = +1;
				array[2] = +0; array[3] = +0;
				array[4] = +1; array[5] = +0;


				uvsArray = uvsArray.concat(array);
			}

			const uvsArrayBuffer = new Float32Array(uvsArray);
			const uvsBufferDescriptor = new BufferDescriptor(
                {
					label: "triangle uvs buffer",
					size: uvsArrayBuffer.length,
                    itemSize: 2,

					arrayBuffer: uvsArrayBuffer,
                }
            );
			const uvsAttributeDescriptor = new AttributeDescriptor(
				{
					bufferDescriptor: uvsBufferDescriptor,
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


			return uvsAttributeDescriptor;
		}
	}
};