import { MeshGeometry } from "../mesh/MeshGeometry.js";
import { BoxBaseGeometry } from "./BoxBaseGeometry.js";


export class BoxGeometry extends MeshGeometry {


	static DEFAULT = {
		TYPE: "BoxGeometry",
		NAME: "",

		INDEXED: false,
		BASE_GEOMETRY: new BoxBaseGeometry(),
	};
	

	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : BoxGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : BoxGeometry.DEFAULT.NAME,

				indexed: (args.indexed !== undefined) ? args.indexed : BoxGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : BoxGeometry.DEFAULT.BASE_GEOMETRY.clone(),

				indices: (args.indices !== undefined) ? args.indices : BoxGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : BoxGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : BoxGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : BoxGeometry.assembleUVs(args),
				MMats: (args.MMats !== undefined) ? args.MMats : null,
				translations: (args.translations !== undefined) ? args.translations : null,
			}
		);
	}


	static #args(args = {}) {
		return {
			...args,

			indexed: (args.indexed !== undefined) ? args.indexed : (console.warn("ARGS: DEFAULT"), BoxGeometry.DEFAULT.INDEXED),
			baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : (console.warn("ARGS: DEFAULT"), BoxGeometry.DEFAULT.BASE_GEOMETRY.clone()),
		};
	}

	static createIndicesArrayBuffer(args = {}) {
		return MeshGeometry.createIndicesArrayBuffer(BoxGeometry.#args(args));
	}
	static createIndicesAttributeLocation(indicesArrayBuffer, args = {}) {
		return super.createIndicesAttributeLocation(
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "box indices buffer",
			}
		);
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		super.setValueIndices(
			indicesAttributeLocation,
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "box indices",
			}
			);
	}
	static assembleIndices(args = {}) {
		const indicesArrayBuffer = BoxGeometry.createIndicesArrayBuffer(args);
		const indicesAttributeLocation = BoxGeometry.createIndicesAttributeLocation(indicesArrayBuffer, args);
		BoxGeometry.setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args);


		return args.indexed ? indicesAttributeLocation : null;
	}

	static createVerticesArrayBuffer(args = {}) {
		return MeshGeometry.createVerticesArrayBuffer(BoxGeometry.#args(args));
	}
	static createVerticesAttributeLocation(verticesArrayBuffer, args = {}) {
		return super.createVerticesAttributeLocation(
			verticesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "box vertices buffer",
			}
		);
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		super.setValueVertices(
			verticesAttributeLocation,
			verticesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "box vertices",
			}
		);
	}
	static assembleVertices(args = {}) {
		const verticesArrayBuffer = BoxGeometry.createVerticesArrayBuffer(args);
		const verticesAttributeLocation = BoxGeometry.createVerticesAttributeLocation(verticesArrayBuffer, args);
		BoxGeometry.setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args);


		return verticesAttributeLocation;
	}

	static createNormalsArrayBuffer(args = {}) {
		return MeshGeometry.createNormalsArrayBuffer(BoxGeometry.#args(args));
	}
	static createNormalsAttributeLocation(normalsArrayBuffer, args = {}) {
		return super.createNormalsAttributeLocation(
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "box normals buffer",
			}
		);
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		super.setValueNormals(
			normalsAttributeLocation,
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "box normals",
			}
		);
	}
	static assembleNormals(args = {}) {
		const normalsArrayBuffer = BoxGeometry.createNormalsArrayBuffer(args);
		const normalsAttributeLocation = BoxGeometry.createNormalsAttributeLocation(normalsArrayBuffer, args);
		BoxGeometry.setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args);


		return normalsAttributeLocation;
	}
	
	static createUVsArrayBuffer(args = {}) {
		return MeshGeometry.createUVsArrayBuffer(BoxGeometry.#args(args));
	}
	static createUVsAttributeLocation(uvsArrayBuffer, args = {}) {
		return super.createUVsAttributeLocation(
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "box uvs buffer",
			}
		);
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		super.setValueUVs(
			uvsAttributeLocation,
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "box uvs",
			}
		);
	}
	static assembleUVs(args = {}) {
		const uvsArrayBuffer = BoxGeometry.createUVsArrayBuffer(args);
		const uvsAttributeLocation = BoxGeometry.createUVsAttributeLocation(uvsArrayBuffer, args);
		BoxGeometry.setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args);


		return uvsAttributeLocation;
	}
};
