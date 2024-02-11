import { ObjectBase } from "../core/ObjectBase.js";
import { Vector3 } from "../math/Vector3.js";
import { BoundingSphere } from "../math/BoundingSphere.js";
import { BoundingBox } from "../math/BoundingBox.js";
import { AttributeLocation } from "../core/data layouts/AttributeLocation.js";
import { BufferDescriptor } from "../core/RC/buffers/BufferDescriptor.js";
import { BufferUsage } from "../core/RC/buffers/BufferUsage.js";
import { VertexBufferLayout } from "../core/RC/pipeline/vertex state/VertexBufferLayout.js";
import { VertexStepMode } from "../core/RC/pipeline/vertex state/VertexStepMode.js";
import { VertexAttribute } from "../core/RC/pipeline/vertex state/VertexAttribute.js";
import { VertexFormat } from "../core/RC/pipeline/vertex state/VertexFormat.js";
import { BufferSetInstruction } from "../core/data layouts/BufferSetInstruction.js";


export class Geometry extends ObjectBase {


	static DEFAULT = {
		TYPE: "Geometry",
		NAME: "",

		BOUNDING_SPHERE: null,
		BOUNDING_BOX: null,
	};


	#boundingSphere = null;
	#boundingBox = null;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : Geometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : Geometry.DEFAULT.NAME,
			}
		);

		// Bounding
		this.boundingSphere = (args.boundingSphere !== undefined) ? args.boundingSphere : Geometry.DEFAULT.BOUNDING_SPHERE;
		this.boundingBox = (args.boundingBox !== undefined) ? args.boundingBox : Geometry.DEFAULT.BOUNDING_BOX;
	}


	get boundingSphere() {
		// If the bounding sphere was not yet computed compute it
		if (this.#boundingSphere === null) this.#computeBoundingSphere();

		return this.#boundingSphere;
	}
	set boundingSphere(boundingSphere) { this.#boundingSphere = boundingSphere; }
	get boundingBox() {
		// If the bounding sphere was not yet computed compute it
		if (this.#boundingBox === null) this.#computeBoundingBox();

		return this.#boundingBox;
	}
	set boundingBox(boundingBox) { this.#boundingBox = boundingBox; }


	/**
	 * Compute minimal bounding sphere that encapsulates all triangles.
	 */
	#computeBoundingSphere() {

		// Check if the sphere already exists
		if (this.#boundingSphere === null) {
			this.#boundingSphere = new BoundingSphere();
		}

		// Create new bounding sphere using the vertices
		if (this.vertices) {
			this.boundingSphere.setFromArrayBuffer(this.vertices.arrayBuffer);
		}

		if (isNaN(this.boundingSphere.radius)) {
			console.error("Geometry error: Bounding sphere radius is NaN.");
		}
	}
	/**
	 * Compute minimal bounding box that encapsulates all triangles.
	 */
	#computeBoundingBox() {

		// Check if the bounding box already exist
		if (this.#boundingBox === null) {
			this.#boundingBox = new BoundingBox();
		}

		// Create new bounding box using the vertices
		if (this.vertices) {
			this.boundingBox.setFromArrayBuffer(this.vertices.arrayBuffer);
		}

		if (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) {
			console.error("Geometry error: One or more of bounding box axis min is NaN.");
		}
	}

	// (custom) attribute location
	static createArraybuffer(args = {}) {
		throw new Error("Not implemented!");
	}
	static createAttributeLocation(arrayBuffer, args = {}) {
		return new AttributeLocation(
			{
				number: (args.number !== undefined) ? args.number : 0,
				itemSize: (args.itemSize !== undefined) ? args.itemSize : (4),
				arrayBuffer: arrayBuffer,

				bufferDescriptor: (args.bufferDescriptor !== undefined) ? args.bufferDescriptor : new BufferDescriptor(
					{
						label: (args.label !== undefined) ? args.label : "custom attribute location",
						size: (args.size !== undefined) ? args.size : (arrayBuffer.length),
						usage: (args.usage !== undefined) ? args.usage : (BufferUsage.VERTEX | BufferUsage.COPY_DST),
						mappedAtCreation: (args.mappedAtCreation !== undefined) ? args.mappedAtCreation : false
					}
				),
				vertexBufferLayoutDescriptor: (args.vertexBufferLayoutDescriptor !== undefined) ? args.vertexBufferLayoutDescriptor : new VertexBufferLayout(
					{
						arrayStride: (args.arrayStride !== undefined) ? args.arrayStride : (4) * arrayBuffer.BYTES_PER_ELEMENT,
						stepMode: (args.stepMode !== undefined) ? args.stepMode : VertexStepMode.VERTEX,
						attributes: (args.attributes !== undefined) ? args.attributes : [
							new VertexAttribute(
								{
									format: (args.format !== undefined) ? args.format : VertexFormat.FLOAT_32x4,
									offset: (args.offset !== undefined) ? args.offset : (0) * arrayBuffer.BYTES_PER_ELEMENT,
									shaderLocation: (args.shaderLocation !== undefined) ? args.shaderLocation : 0
								}
							)
						]
					}
				)
			}
		);
	}
	static setValueAttributeLocation(attributeLocation, arrayBuffer, args = {}) {
		attributeLocation.setValue(
			(args.label !== undefined) ? args.label : "custom set value",
			new BufferSetInstruction(
				{
					label: (args.label !== undefined) ? args.label : "custom set value",

					number: (args.number !== undefined) ? args.number : 0,

					source: {
						arrayBuffer: arrayBuffer,
						layout: {
							offset: (args.sourceOffset !== undefined) ? args.sourceOffset : (0)
						}
					},
					destination: {
						buffer: null,
						layout: {
							offset: (args.destinationOffset !== undefined) ? args.destinationOffset : (0)
						}
					},
					size: (args.size !== undefined) ? args.size : arrayBuffer.length
				}
			)
		);
	}
	static assembleAttributeLocation(args = {}) {
		const arrayBuffer = Geometry.createArrayBuffer(args);
		const attributeLocation = Geometry.createAttributeLocation(arrayBuffer, args);
		Geometry.setValueVertices(attributeLocation, arrayBuffer, args);


		return attributeLocation;
	}
	
	static createIndicesArrayBuffer(args = {}) {
		throw new Error("Not implemented!");
	}
	static createIndicesAttributeLocation(indicesArrayBuffer, args = {}) {
		throw new Error("Not implemented!");
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		throw new Error("Not implemented!");
	}
	static assembleIndices(args = {}) {
		throw new Error("Not implemented!");
	}
	#updateIndices(args= {}) {
		const indicesArrayBuffer = this.constructor.createIndicesArrayBuffer(args);
		this.constructor.setValueIndices(this.indices, indicesArrayBuffer, args);
	}

	static createVerticesArrayBuffer(args = {}) {
		throw new Error("Not implemented!");
	}
	static createVerticesAttributeLocation(verticesArrayBuffer, args = {}) {
		throw new Error("Not implemented!");
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		throw new Error("Not implemented!");
	}
	static assembleVertices(args = {}) {
		throw new Error("Not implemented!");
	}
	#updateVertices(args= {}) {
		const verticesArrayBuffer = this.constructor.createVerticesArrayBuffer(args);
		this.constructor.setValueVertices(this.vertices, verticesArrayBuffer, args);
	}

	static createNormalsArrayBuffer(args = {}) {
		throw new Error("Not implemented!");
	}
	static createNormalsAttributeLocation(normalsArrayBuffer, args = {}) {
		throw new Error("Not implemented!");
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		throw new Error("Not implemented!");
	}
	static assembleNormals(args = {}) {
		throw new Error("Not implemented!");
	}
	#updateNormals(args= {}) {
		const normalsArrayBuffer = this.constructor.createNormalsArrayBuffer(args);
		this.constructor.setValueNormals(this.normals, normalsArrayBuffer, args);
	}

	static createUVsArrayBuffer(args = {}) {
		throw new Error("Not implemented!");
	}
	static createUVsAttributeLocation(uvsArrayBuffer, args = {}) {
		throw new Error("Not implemented!");
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		throw new Error("Not implemented!");
	}
	static assembleUVs(args = {}) {
		throw new Error("Not implemented!");
	}
	#updateUVs(args= {}) {
		const uvsArrayBuffer = this.constructor.createUVsArrayBuffer(args);
		this.constructor.setValueUVs(this.uvs, uvsArrayBuffer, args);
	}
};
