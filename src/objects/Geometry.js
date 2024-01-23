import { ObjectBase } from "../core/ObjectBase.js";


export class Geometry extends ObjectBase {


	static DEFAULT = {
		TYPE: "Geometry",
		NAME: "",
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : Geometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : Geometry.DEFAULT.NAME,
			}
		);
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
