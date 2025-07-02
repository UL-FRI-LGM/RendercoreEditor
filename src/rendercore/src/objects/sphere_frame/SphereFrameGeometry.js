import { MeshGeometry } from "../mesh/MeshGeometry.js";
import { _Math } from "../../RenderCore.js";
import { SphereFrameBaseGeometry } from "./SphereFrameBaseGeometry.js";


export class SphereFrameGeometry extends MeshGeometry {


	static DEFAULT = {
		TYPE: "SphereFrameGeometry",
		NAME: "",

		INDEXED: false,
		BASE_GEOMETRY: new SphereFrameBaseGeometry(),
	};
	

	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : SphereFrameGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SphereFrameGeometry.DEFAULT.NAME,

				indexed: (args.indexed !== undefined) ? args.indexed : SphereFrameGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : SphereFrameGeometry.DEFAULT.BASE_GEOMETRY.clone(),

				indices: (args.indices !== undefined) ? args.indices : SphereFrameGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : SphereFrameGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : SphereFrameGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : SphereFrameGeometry.assembleUVs(args),
				MMats: (args.MMats !== undefined) ? args.MMats : null,
				translations: (args.translations !== undefined) ? args.translations : null,
			}
		);
	}


	static #args(args = {}) {
		return {
			...args,

			indexed: (args.indexed !== undefined) ? args.indexed : (console.warn("ARGS: DEFAULT"), SphereFrameGeometry.DEFAULT.INDEXED),
			baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : (console.warn("ARGS: DEFAULT"), SphereFrameGeometry.DEFAULT.BASE_GEOMETRY.clone()),
		};
	}

	static createIndicesArrayBuffer(args = {}) {
		return MeshGeometry.createIndicesArrayBuffer(SphereFrameGeometry.#args(args));
	}
	static createIndicesAttributeLocation(indicesArrayBuffer, args = {}) {
		return super.createIndicesAttributeLocation(
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "sphere frame indices buffer",
			}
		);
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		super.setValueIndices(
			indicesAttributeLocation,
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "sphere frame indices",
			}
			);
	}
	static assembleIndices(args = {}) {
		const indicesArrayBuffer = SphereFrameGeometry.createIndicesArrayBuffer(args);
		const indicesAttributeLocation = SphereFrameGeometry.createIndicesAttributeLocation(indicesArrayBuffer, args);
		SphereFrameGeometry.setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args);


		return args.indexed ? indicesAttributeLocation : null;
	}

	static createVerticesArrayBuffer(args = {}) {
		return MeshGeometry.createVerticesArrayBuffer(SphereFrameGeometry.#args(args));
	}
	static createVerticesAttributeLocation(verticesArrayBuffer, args = {}) {
		return super.createVerticesAttributeLocation(
			verticesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "sphere frame vertices buffer",
			}
		);
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		super.setValueVertices(
			verticesAttributeLocation,
			verticesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "sphere frame vertices",
			}
		);
	}
	static assembleVertices(args = {}) {
		const verticesArrayBuffer = SphereFrameGeometry.createVerticesArrayBuffer(args);
		const verticesAttributeLocation = SphereFrameGeometry.createVerticesAttributeLocation(verticesArrayBuffer, args);
		SphereFrameGeometry.setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args);


		return verticesAttributeLocation;
	}

	static createNormalsArrayBuffer(args = {}) {
		return MeshGeometry.createNormalsArrayBuffer(SphereFrameGeometry.#args(args));
	}
	static createNormalsAttributeLocation(normalsArrayBuffer, args = {}) {
		return super.createNormalsAttributeLocation(
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "sphere frame normals buffer",
			}
		);
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		super.setValueNormals(
			normalsAttributeLocation,
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "sphere frame normals",
			}
		);
	}
	static assembleNormals(args = {}) {
		const normalsArrayBuffer = SphereFrameGeometry.createNormalsArrayBuffer(args);
		const normalsAttributeLocation = SphereFrameGeometry.createNormalsAttributeLocation(normalsArrayBuffer, args);
		SphereFrameGeometry.setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args);


		return normalsAttributeLocation;
	}
	
	static createUVsArrayBuffer(args = {}) {
		return MeshGeometry.createUVsArrayBuffer(SphereFrameGeometry.#args(args));
	}
	static createUVsAttributeLocation(uvsArrayBuffer, args = {}) {
		return super.createUVsAttributeLocation(
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "sphere frame uvs buffer",
			}
		);
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		super.setValueUVs(
			uvsAttributeLocation,
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "sphere frame uvs",
			}
		);
	}
	static assembleUVs(args = {}) {
		const uvsArrayBuffer = SphereFrameGeometry.createUVsArrayBuffer(args);
		const uvsAttributeLocation = SphereFrameGeometry.createUVsAttributeLocation(uvsArrayBuffer, args);
		SphereFrameGeometry.setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args);


		return uvsAttributeLocation;
	}
};
