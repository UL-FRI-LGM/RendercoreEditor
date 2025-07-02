import { MeshGeometry } from "../mesh/MeshGeometry.js";
import { BoxFrameBaseGeometry } from "./BoxFrameBaseGeometry.js";


export class BoxFrameGeometry extends MeshGeometry {


	static DEFAULT = {
		TYPE: "BoxFrameGeometry",
		NAME: "",

		INDEXED: false,
		BASE_GEOMETRY: new BoxFrameBaseGeometry(),
	};
	

	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : BoxFrameGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : BoxFrameGeometry.DEFAULT.NAME,

				indexed: (args.indexed !== undefined) ? args.indexed : BoxFrameGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : BoxFrameGeometry.DEFAULT.BASE_GEOMETRY.clone(),

				indices: (args.indices !== undefined) ? args.indices : BoxFrameGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : BoxFrameGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : BoxFrameGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : BoxFrameGeometry.assembleUVs(args),
				MMats: (args.MMats !== undefined) ? args.MMats : null,
				translations: (args.translations !== undefined) ? args.translations : null,
			}
		);
	}


	static #args(args = {}) {
		return {
			...args,

			indexed: (args.indexed !== undefined) ? args.indexed : (console.warn("ARGS: DEFAULT"), BoxFrameGeometry.DEFAULT.INDEXED),
			baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : (console.warn("ARGS: DEFAULT"), BoxFrameGeometry.DEFAULT.BASE_GEOMETRY.clone()),
		};
	}

	static createIndicesArrayBuffer(args = {}) {
		return MeshGeometry.createIndicesArrayBuffer(BoxFrameGeometry.#args(args));
	}
	static createIndicesAttributeLocation(indicesArrayBuffer, args = {}) {
		return super.createIndicesAttributeLocation(
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "box frame indices buffer",
			}
		);
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		super.setValueIndices(
			indicesAttributeLocation,
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "box frame indices",
			}
			);
	}
	static assembleIndices(args = {}) {
		const indicesArrayBuffer = BoxFrameGeometry.createIndicesArrayBuffer(args);
		const indicesAttributeLocation = BoxFrameGeometry.createIndicesAttributeLocation(indicesArrayBuffer, args);
		BoxFrameGeometry.setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args);


		return args.indexed ? indicesAttributeLocation : null;
	}

	static createVerticesArrayBuffer(args = {}) {
		return MeshGeometry.createVerticesArrayBuffer(BoxFrameGeometry.#args(args));
	}
	static createVerticesAttributeLocation(verticesArrayBuffer, args = {}) {
		return super.createVerticesAttributeLocation(
			verticesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "box frame vertices buffer",
			}
		);
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		super.setValueVertices(
			verticesAttributeLocation,
			verticesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "box frame vertices",
			}
		);
	}
	static assembleVertices(args = {}) {
		const verticesArrayBuffer = BoxFrameGeometry.createVerticesArrayBuffer(args);
		const verticesAttributeLocation = BoxFrameGeometry.createVerticesAttributeLocation(verticesArrayBuffer, args);
		BoxFrameGeometry.setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args);


		return verticesAttributeLocation;
	}

	static createNormalsArrayBuffer(args = {}) {
		return MeshGeometry.createNormalsArrayBuffer(BoxFrameGeometry.#args(args));
	}
	static createNormalsAttributeLocation(normalsArrayBuffer, args = {}) {
		return super.createNormalsAttributeLocation(
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "box frame normals buffer",
			}
		);
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		super.setValueNormals(
			normalsAttributeLocation,
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "box frame normals",
			}
		);
	}
	static assembleNormals(args = {}) {
		const normalsArrayBuffer = BoxFrameGeometry.createNormalsArrayBuffer(args);
		const normalsAttributeLocation = BoxFrameGeometry.createNormalsAttributeLocation(normalsArrayBuffer, args);
		BoxFrameGeometry.setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args);


		return normalsAttributeLocation;
	}
	
	static createUVsArrayBuffer(args = {}) {
		return MeshGeometry.createUVsArrayBuffer(BoxFrameGeometry.#args(args));
	}
	static createUVsAttributeLocation(uvsArrayBuffer, args = {}) {
		return super.createUVsAttributeLocation(
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "box frame uvs buffer",
			}
		);
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		super.setValueUVs(
			uvsAttributeLocation,
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "box frame uvs",
			}
		);
	}
	static assembleUVs(args = {}) {
		const uvsArrayBuffer = BoxFrameGeometry.createUVsArrayBuffer(args);
		const uvsAttributeLocation = BoxFrameGeometry.createUVsAttributeLocation(uvsArrayBuffer, args);
		BoxFrameGeometry.setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args);


		return uvsAttributeLocation;
	}
};
