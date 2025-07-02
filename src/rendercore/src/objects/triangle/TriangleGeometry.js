import { MeshGeometry } from "../mesh/MeshGeometry.js";
import { TriangleBaseGeometry } from "./TriangleBaseGeometry.js";


export class TriangleGeometry extends MeshGeometry {


	static DEFAULT = {
		TYPE: "TriangleGeometry",
		NAME: "",

		INDEXED: false,
		BASE_GEOMETRY: new TriangleBaseGeometry(),
	};
	

	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : TriangleGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : TriangleGeometry.DEFAULT.NAME,

				indexed: (args.indexed !== undefined) ? args.indexed : TriangleGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : TriangleGeometry.DEFAULT.BASE_GEOMETRY.clone(),

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


	static #args(args = {}) {
		return {
			...args,

			indexed: (args.indexed !== undefined) ? args.indexed : (console.warn("ARGS: DEFAULT"), TriangleGeometry.DEFAULT.INDEXED),
			baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : (console.warn("ARGS: DEFAULT"), TriangleGeometry.DEFAULT.BASE_GEOMETRY.clone()),
		};
	}

	static createIndicesArrayBuffer(args = {}) {
		return MeshGeometry.createIndicesArrayBuffer(TriangleGeometry.#args(args));
	}
	static createIndicesAttributeLocation(indicesArrayBuffer, args = {}) {
		return super.createIndicesAttributeLocation(
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "triangle indices buffer",
			}
		);
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		super.setValueIndices(
			indicesAttributeLocation,
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "triangle indices",
			}
			);
	}
	static assembleIndices(args = {}) {
		const indicesArrayBuffer = TriangleGeometry.createIndicesArrayBuffer(args);
		const indicesAttributeLocation = TriangleGeometry.createIndicesAttributeLocation(indicesArrayBuffer, args);
		TriangleGeometry.setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args);


		return args.indexed ? indicesAttributeLocation : null;
	}

	static createVerticesArrayBuffer(args = {}) {
		return MeshGeometry.createVerticesArrayBuffer(TriangleGeometry.#args(args));
	}
	static createVerticesAttributeLocation(verticesArrayBuffer, args = {}) {
		return super.createVerticesAttributeLocation(
			verticesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "triangle vertices buffer",
			}
		);
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		super.setValueVertices(
			verticesAttributeLocation,
			verticesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "triangle vertices",
			}
		);
	}
	static assembleVertices(args = {}) {
		const verticesArrayBuffer = TriangleGeometry.createVerticesArrayBuffer(args);
		const verticesAttributeLocation = TriangleGeometry.createVerticesAttributeLocation(verticesArrayBuffer, args);
		TriangleGeometry.setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args);


		return verticesAttributeLocation;
	}

	static createNormalsArrayBuffer(args = {}) {
		return MeshGeometry.createNormalsArrayBuffer(TriangleGeometry.#args(args));
	}
	static createNormalsAttributeLocation(normalsArrayBuffer, args = {}) {
		return super.createNormalsAttributeLocation(
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "triangle normals buffer",
			}
		);
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		super.setValueNormals(
			normalsAttributeLocation,
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "triangle normals",
			}
		);
	}
	static assembleNormals(args = {}) {
		const normalsArrayBuffer = TriangleGeometry.createNormalsArrayBuffer(args);
		const normalsAttributeLocation = TriangleGeometry.createNormalsAttributeLocation(normalsArrayBuffer, args);
		TriangleGeometry.setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args);


		return normalsAttributeLocation;
	}
	
	static createUVsArrayBuffer(args = {}) {
		return MeshGeometry.createUVsArrayBuffer(TriangleGeometry.#args(args));
	}
	static createUVsAttributeLocation(uvsArrayBuffer, args = {}) {
		return super.createUVsAttributeLocation(
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "triangle uvs buffer",
			}
		);
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		super.setValueUVs(
			uvsAttributeLocation,
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "triangle uvs",
			}
		);
	}
	static assembleUVs(args = {}) {
		const uvsArrayBuffer = TriangleGeometry.createUVsArrayBuffer(args);
		const uvsAttributeLocation = TriangleGeometry.createUVsAttributeLocation(uvsArrayBuffer, args);
		TriangleGeometry.setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args);


		return uvsAttributeLocation;
	}
};
