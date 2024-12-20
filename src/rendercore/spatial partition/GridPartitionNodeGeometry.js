import { SpatialPartitionNodeGeometry } from "./SpatialPartitionNodeGeometry.js";
import { BoxGeometry } from "../objects/BoxGeometry.js";
import { Vector3 } from "../math/Vector3.js";


export class GridPartitionNodeGeometry extends SpatialPartitionNodeGeometry {


	static DEFAULT = {
		TYPE: "GridPartitionNodeGeometry",
		NAME: "",

		BOUNDING_SPHERE: null,
		BOUNDING_BOX: null,

		INDEXED: false,
		BASE_GEOMETRY: {
			elements: [
				{
					position: {
						elementspace: null,
						objectspace: new Vector3(0, 0, 0)
					},

					dimension: {
						elementspace: { min: new Vector3(-1, -1, -1), max: new Vector3(+1, +1, +1) },
						objectspace: null
					},
				}
			]
		},
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : GridPartitionNodeGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : GridPartitionNodeGeometry.DEFAULT.NAME,

				boundingSphere: (args.boundingSphere !== undefined) ? args.boundingSphere : GridPartitionNodeGeometry.DEFAULT.BOUNDING_SPHERE,
				boundingBox: (args.boundingBox !== undefined) ? args.boundingBox : GridPartitionNodeGeometry.DEFAULT.BOUNDING_BOX,

				indexed: (args.indexed !== undefined) ? args.indexed : GridPartitionNodeGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : GridPartitionNodeGeometry.DEFAULT.BASE_GEOMETRY,

				indices: (args.indices !== undefined) ? args.indices : GridPartitionNodeGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : GridPartitionNodeGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : GridPartitionNodeGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : GridPartitionNodeGeometry.assembleUVs(args),
				MMats: (args.MMats !== undefined) ? args.MMats : null,
				translations: (args.translations !== undefined) ? args.translations : null,
			}
		);
	}


	static #convertBaseGeometry(baseGeometry) {
		return baseGeometry;
	}

	static createIndicesArrayBuffer(args = {}) {
		return super.createIndicesArrayBuffer(
			{
				...args,

				indexed: (args.indexed !== undefined) ? args.indexed : BoxGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? GridPartitionNodeGeometry.#convertBaseGeometry(args.baseGeometry) : BoxGeometry.DEFAULT.BASE_GEOMETRY,
			}
		);
	}
	static createIndicesAttributeLocation(indicesArrayBuffer, args = {}) {
		return super.createIndicesAttributeLocation(
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : GridPartitionNodeGeometry.DEFAULT.TYPE + ' ' + "indices buffer",
			}
		);
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		super.setValueIndices(
			indicesAttributeLocation,
			indicesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : GridPartitionNodeGeometry.DEFAULT.TYPE + ' ' + "indices",
			}
		);
	}
	static assembleIndices(args = {}) {
		const indicesArrayBuffer = GridPartitionNodeGeometry.createIndicesArrayBuffer(args);
		const indicesAttributeLocation = GridPartitionNodeGeometry.createIndicesAttributeLocation(indicesArrayBuffer, args);
		GridPartitionNodeGeometry.setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args);


		return args.indexed ? indicesAttributeLocation : null;
	}

	static createVerticesArrayBuffer(args = {}) {
		return super.createVerticesArrayBuffer(
			{
				...args,

				indexed: (args.indexed !== undefined) ? args.indexed : BoxGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? GridPartitionNodeGeometry.#convertBaseGeometry(args.baseGeometry) : BoxGeometry.DEFAULT.BASE_GEOMETRY,
			}
		);
	}
	static createVerticesAttributeLocation(verticesArrayBuffer, args = {}) {
		return super.createVerticesAttributeLocation(
			verticesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : GridPartitionNodeGeometry.DEFAULT.TYPE + ' ' + "vertices buffer",
			}
		);
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		super.setValueVertices(
			verticesAttributeLocation,
			verticesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : GridPartitionNodeGeometry.DEFAULT.TYPE + ' ' + "vertices",
			}
		);
	}
	static assembleVertices(args = {}) {
		const verticesArrayBuffer = GridPartitionNodeGeometry.createVerticesArrayBuffer(args);
		const verticesAttributeLocation = GridPartitionNodeGeometry.createVerticesAttributeLocation(verticesArrayBuffer, args);
		GridPartitionNodeGeometry.setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args);


		return verticesAttributeLocation;
	}

	static createNormalsArrayBuffer(args = {}) {
		return super.createNormalsArrayBuffer(
			{
				...args,

				indexed: (args.indexed !== undefined) ? args.indexed : BoxGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? GridPartitionNodeGeometry.#convertBaseGeometry(args.baseGeometry) : BoxGeometry.DEFAULT.BASE_GEOMETRY,
			}
		);
	}
	static createNormalsAttributeLocation(normalsArrayBuffer, args = {}) {
		return super.createNormalsAttributeLocation(
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : GridPartitionNodeGeometry.DEFAULT.TYPE + ' ' + "normals buffer",
			}
		);
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		super.setValueNormals(
			normalsAttributeLocation,
			normalsArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : GridPartitionNodeGeometry.DEFAULT.TYPE + ' ' + "normals",
			}
		);
	}
	static assembleNormals(args = {}) {
		const normalsArrayBuffer = GridPartitionNodeGeometry.createNormalsArrayBuffer(args);
		const normalsAttributeLocation = GridPartitionNodeGeometry.createNormalsAttributeLocation(normalsArrayBuffer, args);
		GridPartitionNodeGeometry.setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args);


		return normalsAttributeLocation;
	}

	static createUVsArrayBuffer(args = {}) {
		return super.createUVsArrayBuffer(
			{
				...args,

				indexed: (args.indexed !== undefined) ? args.indexed : BoxGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? GridPartitionNodeGeometry.#convertBaseGeometry(args.baseGeometry) : BoxGeometry.DEFAULT.BASE_GEOMETRY,
			}
		);
	}
	static createUVsAttributeLocation(uvsArrayBuffer, args = {}) {
		return super.createUVsAttributeLocation(
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : GridPartitionNodeGeometry.DEFAULT.TYPE + ' ' + "uvs buffer",
			}
		);
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		super.setValueUVs(
			uvsAttributeLocation,
			uvsArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : GridPartitionNodeGeometry.DEFAULT.TYPE + ' ' + "uvs",
			}
		);
	}
	static assembleUVs(args = {}) {
		const uvsArrayBuffer = GridPartitionNodeGeometry.createUVsArrayBuffer(args);
		const uvsAttributeLocation = GridPartitionNodeGeometry.createUVsAttributeLocation(uvsArrayBuffer, args);
		GridPartitionNodeGeometry.setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args);


		return uvsAttributeLocation;
	}
};
