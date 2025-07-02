import { BoxGeometry } from "../box/BoxGeometry.js";
import { CubeBaseGeometry } from "./CubeBaseGeometry.js";


export class CubeGeometry extends BoxGeometry {


	static DEFAULT = {
		TYPE: "CubeGeometry",
		NAME: "",

		INDEXED: false,
		BASE_GEOMETRY: new CubeBaseGeometry(),
	};
	

	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : CubeGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : CubeGeometry.DEFAULT.NAME,

				indexed: (args.indexed !== undefined) ? args.indexed : CubeGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : CubeGeometry.DEFAULT.BASE_GEOMETRY.clone(),

				indices: (args.indices !== undefined) ? args.indices : CubeGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : CubeGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : CubeGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : CubeGeometry.assembleUVs(args),
				MMats: (args.MMats !== undefined) ? args.MMats : null,
				translations: (args.translations !== undefined) ? args.translations : null,
			}
		);
	}


	static #args(args = {}) {
		return {
			...args,

			indexed: (args.indexed !== undefined) ? args.indexed : (console.warn("ARGS: DEFAULT"), CubeGeometry.DEFAULT.INDEXED),
			baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : (console.warn("ARGS: DEFAULT"), CubeGeometry.DEFAULT.BASE_GEOMETRY.clone()),
		};
	}

	static createIndicesArrayBuffer(args = {}) {
		return BoxGeometry.createIndicesArrayBuffer(CubeGeometry.#args(args));
	}
	static createIndicesAttributeLocation(indicesArrayBuffer, args = {}) {
		return super.createIndicesAttributeLocation(
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "cube indices buffer",
			}
		);
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		super.setValueIndices(
			indicesAttributeLocation,
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "cube indices",
			}
			);
	}
	static assembleIndices(args = {}) {
		const indicesArrayBuffer = CubeGeometry.createIndicesArrayBuffer(args);
		const indicesAttributeLocation = CubeGeometry.createIndicesAttributeLocation(indicesArrayBuffer, args);
		CubeGeometry.setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args);


		return args.indexed ? indicesAttributeLocation : null;
	}

	static createVerticesArrayBuffer(args = {}) {
		return BoxGeometry.createVerticesArrayBuffer(CubeGeometry.#args(args));
	}
	static createVerticesAttributeLocation(verticesArrayBuffer, args = {}) {
		return super.createVerticesAttributeLocation(
			verticesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "cube vertices buffer",
			}
		);
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		super.setValueVertices(
			verticesAttributeLocation,
			verticesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "cube vertices",
			}
		);
	}
	static assembleVertices(args = {}) {
		const verticesArrayBuffer = CubeGeometry.createVerticesArrayBuffer(args);
		const verticesAttributeLocation = CubeGeometry.createVerticesAttributeLocation(verticesArrayBuffer, args);
		CubeGeometry.setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args);


		return verticesAttributeLocation;
	}

	static createNormalsArrayBuffer(args = {}) {
		return BoxGeometry.createNormalsArrayBuffer(CubeGeometry.#args(args));
	}
	static createNormalsAttributeLocation(normalsArrayBuffer, args = {}) {
		return super.createNormalsAttributeLocation(
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "cube normals buffer",
			}
		);
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		super.setValueNormals(
			normalsAttributeLocation,
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "cube normals",
			}
		);
	}
	static assembleNormals(args = {}) {
		const normalsArrayBuffer = CubeGeometry.createNormalsArrayBuffer(args);
		const normalsAttributeLocation = CubeGeometry.createNormalsAttributeLocation(normalsArrayBuffer, args);
		CubeGeometry.setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args);


		return normalsAttributeLocation;
	}
	
	static createUVsArrayBuffer(args = {}) {
		return BoxGeometry.createUVsArrayBuffer(CubeGeometry.#args(args));
	}
	static createUVsAttributeLocation(uvsArrayBuffer, args = {}) {
		return super.createUVsAttributeLocation(
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "cube uvs buffer",
			}
		);
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		super.setValueUVs(
			uvsAttributeLocation,
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "cube uvs",
			}
		);
	}
	static assembleUVs(args = {}) {
		const uvsArrayBuffer = CubeGeometry.createUVsArrayBuffer(args);
		const uvsAttributeLocation = CubeGeometry.createUVsAttributeLocation(uvsArrayBuffer, args);
		CubeGeometry.setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args);


		return uvsAttributeLocation;
	}
};
