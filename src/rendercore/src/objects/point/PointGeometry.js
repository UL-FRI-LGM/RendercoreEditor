import { MeshGeometry } from "../mesh/MeshGeometry.js";
import { PointBaseGeometry } from "./PointBaseGeometry.js";


export class PointGeometry extends MeshGeometry {


	static DEFAULT = {
		TYPE: "PointGeometry",
		NAME: "",

		INDEXED: false,
		BASE_GEOMETRY: new PointBaseGeometry(),
	};
	

	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : PointGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : PointGeometry.DEFAULT.NAME,

				indexed: (args.indexed !== undefined) ? args.indexed : PointGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : PointGeometry.DEFAULT.BASE_GEOMETRY.clone(),

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


	static #args(args = {}) {
		return {
			...args,

			indexed: (args.indexed !== undefined) ? args.indexed : (console.warn("ARGS: DEFAULT"), PointGeometry.DEFAULT.INDEXED),
			baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : (console.warn("ARGS: DEFAULT"), PointGeometry.DEFAULT.BASE_GEOMETRY.clone()),
		};
	}

	static createIndicesArrayBuffer(args = {}) {
		return MeshGeometry.createIndicesArrayBuffer(PointGeometry.#args(args));
	}
	static createIndicesAttributeLocation(indicesArrayBuffer, args = {}) {
		return super.createIndicesAttributeLocation(
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "point indices buffer",
			}
		);
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		super.setValueIndices(
			indicesAttributeLocation,
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "point indices",
			}
			);
	}
	static assembleIndices(args = {}) {
		const indicesArrayBuffer = PointGeometry.createIndicesArrayBuffer(args);
		const indicesAttributeLocation = PointGeometry.createIndicesAttributeLocation(indicesArrayBuffer, args);
		PointGeometry.setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args);


		return args.indexed ? indicesAttributeLocation : null;
	}

	static createVerticesArrayBuffer(args = {}) {
		return MeshGeometry.createVerticesArrayBuffer(PointGeometry.#args(args));
	}
	static createVerticesAttributeLocation(verticesArrayBuffer, args = {}) {
		return super.createVerticesAttributeLocation(
			verticesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "point vertices buffer",
			}
		);
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		super.setValueVertices(
			verticesAttributeLocation,
			verticesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "point vertices",
			}
		);
	}
	static assembleVertices(args = {}) {
		const verticesArrayBuffer = PointGeometry.createVerticesArrayBuffer(args);
		const verticesAttributeLocation = PointGeometry.createVerticesAttributeLocation(verticesArrayBuffer, args);
		PointGeometry.setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args);


		return verticesAttributeLocation;
	}

	static createNormalsArrayBuffer(args = {}) {
		return MeshGeometry.createNormalsArrayBuffer(PointGeometry.#args(args));
	}
	static createNormalsAttributeLocation(normalsArrayBuffer, args = {}) {
		return super.createNormalsAttributeLocation(
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "point normals buffer",
			}
		);
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		super.setValueNormals(
			normalsAttributeLocation,
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "point normals",
			}
		);
	}
	static assembleNormals(args = {}) {
		const normalsArrayBuffer = PointGeometry.createNormalsArrayBuffer(args);
		const normalsAttributeLocation = PointGeometry.createNormalsAttributeLocation(normalsArrayBuffer, args);
		PointGeometry.setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args);


		return normalsAttributeLocation;
	}
	
	static createUVsArrayBuffer(args = {}) {
		return MeshGeometry.createUVsArrayBuffer(PointGeometry.#args(args));
	}
	static createUVsAttributeLocation(uvsArrayBuffer, args = {}) {
		return super.createUVsAttributeLocation(
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "point uvs buffer",
			}
		);
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		super.setValueUVs(
			uvsAttributeLocation,
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "point uvs",
			}
		);
	}
	static assembleUVs(args = {}) {
		const uvsArrayBuffer = PointGeometry.createUVsArrayBuffer(args);
		const uvsAttributeLocation = PointGeometry.createUVsAttributeLocation(uvsArrayBuffer, args);
		PointGeometry.setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args);


		return uvsAttributeLocation;
	}
};
