import { MeshGeometry } from "../mesh/MeshGeometry.js";
import { QuadBaseGeometry } from "./QuadBaseGeometry.js";


export class QuadGeometry extends MeshGeometry {


	static DEFAULT = {
		TYPE: "QuadGeometry",
		NAME: "",

		INDEXED: false,
		BASE_GEOMETRY: new QuadBaseGeometry(),
	};
	

	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : QuadGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : QuadGeometry.DEFAULT.NAME,

				indexed: (args.indexed !== undefined) ? args.indexed : QuadGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : QuadGeometry.DEFAULT.BASE_GEOMETRY.clone(),

				indices: (args.indices !== undefined) ? args.indices : QuadGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : QuadGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : QuadGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : QuadGeometry.assembleUVs(args),
				MMats: (args.MMats !== undefined) ? args.MMats : null,
				translations: (args.translations !== undefined) ? args.translations : null,
			}
		);
	}


	static #args(args = {}) {
		return {
			...args,

			indexed: (args.indexed !== undefined) ? args.indexed : (console.warn("ARGS: DEFAULT"), QuadGeometry.DEFAULT.INDEXED),
			baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : (console.warn("ARGS: DEFAULT"), QuadGeometry.DEFAULT.BASE_GEOMETRY.clone()),
		};
	}

	static createIndicesArrayBuffer(args = {}) {
		return MeshGeometry.createIndicesArrayBuffer(QuadGeometry.#args(args));
	}
	static createIndicesAttributeLocation(indicesArrayBuffer, args = {}) {
		return super.createIndicesAttributeLocation(
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "quad indices buffer",
			}
		);
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		super.setValueIndices(
			indicesAttributeLocation,
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "quad indices",
			}
			);
	}
	static assembleIndices(args = {}) {
		const indicesArrayBuffer = QuadGeometry.createIndicesArrayBuffer(args);
		const indicesAttributeLocation = QuadGeometry.createIndicesAttributeLocation(indicesArrayBuffer, args);
		QuadGeometry.setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args);


		return args.indexed ? indicesAttributeLocation : null;
	}

	static createVerticesArrayBuffer(args = {}) {
		return MeshGeometry.createVerticesArrayBuffer(QuadGeometry.#args(args));
	}
	static createVerticesAttributeLocation(verticesArrayBuffer, args = {}) {
		return super.createVerticesAttributeLocation(
			verticesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "quad vertices buffer",
			}
		);
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		super.setValueVertices(
			verticesAttributeLocation,
			verticesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "quad vertices",
			}
		);
	}
	static assembleVertices(args = {}) {
		const verticesArrayBuffer = QuadGeometry.createVerticesArrayBuffer(args);
		const verticesAttributeLocation = QuadGeometry.createVerticesAttributeLocation(verticesArrayBuffer, args);
		QuadGeometry.setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args);


		return verticesAttributeLocation;
	}

	static createNormalsArrayBuffer(args = {}) {
		return MeshGeometry.createNormalsArrayBuffer(QuadGeometry.#args(args));
	}
	static createNormalsAttributeLocation(normalsArrayBuffer, args = {}) {
		return super.createNormalsAttributeLocation(
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "quad normals buffer",
			}
		);
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		super.setValueNormals(
			normalsAttributeLocation,
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "quad normals",
			}
		);
	}
	static assembleNormals(args = {}) {
		const normalsArrayBuffer = QuadGeometry.createNormalsArrayBuffer(args);
		const normalsAttributeLocation = QuadGeometry.createNormalsAttributeLocation(normalsArrayBuffer, args);
		QuadGeometry.setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args);


		return normalsAttributeLocation;
	}
	
	static createUVsArrayBuffer(args = {}) {
		return MeshGeometry.createUVsArrayBuffer(QuadGeometry.#args(args));
	}
	static createUVsAttributeLocation(uvsArrayBuffer, args = {}) {
		return super.createUVsAttributeLocation(
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "quad uvs buffer",
			}
		);
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		super.setValueUVs(
			uvsAttributeLocation,
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "quad uvs",
			}
		);
	}
	static assembleUVs(args = {}) {
		const uvsArrayBuffer = QuadGeometry.createUVsArrayBuffer(args);
		const uvsAttributeLocation = QuadGeometry.createUVsAttributeLocation(uvsArrayBuffer, args);
		QuadGeometry.setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args);


		return uvsAttributeLocation;
	}
};
