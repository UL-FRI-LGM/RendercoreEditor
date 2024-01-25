import { ObjectBase } from "../core/ObjectBase.js";
import { Vector3 } from "../math/Vector3.js";
import { BoundingSphere } from "../math/BoundingSphere.js";
import { BoundingBox } from "../math/BoundingBox.js";


export class Geometry extends ObjectBase {


	static DEFAULT = {
		TYPE: "Geometry",
		NAME: "",
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
		this.boundingBox = null;
		this.boundingSphere = null;
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
