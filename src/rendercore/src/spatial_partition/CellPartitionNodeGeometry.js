import { SpatialPartitionNodeGeometry } from "./SpatialPartitionNodeGeometry.js";
import { Vector3 } from "../math/Vector3.js";


export class CellPartitionNodeGeometry extends SpatialPartitionNodeGeometry {


	static DEFAULT = {
		TYPE: "CellPartitionNodeGeometry",
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

				type: (args.type !== undefined) ? args.type : CellPartitionNodeGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : CellPartitionNodeGeometry.DEFAULT.NAME,

				boundingSphere: (args.boundingSphere !== undefined) ? args.boundingSphere : CellPartitionNodeGeometry.DEFAULT.BOUNDING_SPHERE,
				boundingBox: (args.boundingBox !== undefined) ? args.boundingBox : CellPartitionNodeGeometry.DEFAULT.BOUNDING_BOX,

				indexed: (args.indexed !== undefined) ? args.indexed : CellPartitionNodeGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : CellPartitionNodeGeometry.DEFAULT.BASE_GEOMETRY,

				indices: (args.indices !== undefined) ? args.indices : CellPartitionNodeGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : CellPartitionNodeGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : CellPartitionNodeGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : CellPartitionNodeGeometry.assembleUVs(args),
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

				indexed: (args.indexed !== undefined) ? args.indexed : SpatialPartitionNodeGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? CellPartitionNodeGeometry.#convertBaseGeometry(args.baseGeometry) : SpatialPartitionNodeGeometry.DEFAULT.BASE_GEOMETRY,
			}
		);
	}
	static createIndicesAttributeLocation(indicesArrayBuffer, args = {}) {
		return super.createIndicesAttributeLocation(
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : CellPartitionNodeGeometry.DEFAULT.TYPE + ' ' + "indices buffer",
			}
		);
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		super.setValueIndices(
			indicesAttributeLocation,
			indicesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : CellPartitionNodeGeometry.DEFAULT.TYPE + ' ' + "indices",
			}
		);
	}
	static assembleIndices(args = {}) {
		const indicesArrayBuffer = CellPartitionNodeGeometry.createIndicesArrayBuffer(args);
		const indicesAttributeLocation = CellPartitionNodeGeometry.createIndicesAttributeLocation(indicesArrayBuffer, args);
		CellPartitionNodeGeometry.setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args);


		return args.indexed ? indicesAttributeLocation : null;
	}

	static createVerticesArrayBuffer(args = {}) {
		return super.createVerticesArrayBuffer(
			{
				...args,

				indexed: (args.indexed !== undefined) ? args.indexed : SpatialPartitionNodeGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? CellPartitionNodeGeometry.#convertBaseGeometry(args.baseGeometry) : SpatialPartitionNodeGeometry.DEFAULT.BASE_GEOMETRY,
			}
		);
	}
	static createVerticesAttributeLocation(verticesArrayBuffer, args = {}) {
		return super.createVerticesAttributeLocation(
			verticesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : CellPartitionNodeGeometry.DEFAULT.TYPE + ' ' + "vertices buffer",
			}
		);
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		super.setValueVertices(
			verticesAttributeLocation,
			verticesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : CellPartitionNodeGeometry.DEFAULT.TYPE + ' ' + "vertices",
			}
		);
	}
	static assembleVertices(args = {}) {
		const verticesArrayBuffer = CellPartitionNodeGeometry.createVerticesArrayBuffer(args);
		const verticesAttributeLocation = CellPartitionNodeGeometry.createVerticesAttributeLocation(verticesArrayBuffer, args);
		CellPartitionNodeGeometry.setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args);


		return verticesAttributeLocation;
	}

	static createNormalsArrayBuffer(args = {}) {
		return super.createNormalsArrayBuffer(
			{
				...args,

				indexed: (args.indexed !== undefined) ? args.indexed : SpatialPartitionNodeGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? CellPartitionNodeGeometry.#convertBaseGeometry(args.baseGeometry) : SpatialPartitionNodeGeometry.DEFAULT.BASE_GEOMETRY,
			}
		);
	}
	static createNormalsAttributeLocation(normalsArrayBuffer, args = {}) {
		return super.createNormalsAttributeLocation(
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : CellPartitionNodeGeometry.DEFAULT.TYPE + ' ' + "normals buffer",
			}
		);
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		super.setValueNormals(
			normalsAttributeLocation,
			normalsArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : CellPartitionNodeGeometry.DEFAULT.TYPE + ' ' + "normals",
			}
		);
	}
	static assembleNormals(args = {}) {
		const normalsArrayBuffer = CellPartitionNodeGeometry.createNormalsArrayBuffer(args);
		const normalsAttributeLocation = CellPartitionNodeGeometry.createNormalsAttributeLocation(normalsArrayBuffer, args);
		CellPartitionNodeGeometry.setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args);


		return normalsAttributeLocation;
	}

	static createUVsArrayBuffer(args = {}) {
		return super.createUVsArrayBuffer(
			{
				...args,

				indexed: (args.indexed !== undefined) ? args.indexed : SpatialPartitionNodeGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? CellPartitionNodeGeometry.#convertBaseGeometry(args.baseGeometry) : SpatialPartitionNodeGeometry.DEFAULT.BASE_GEOMETRY,
			}
		);
	}
	static createUVsAttributeLocation(uvsArrayBuffer, args = {}) {
		return super.createUVsAttributeLocation(
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : CellPartitionNodeGeometry.DEFAULT.TYPE + ' ' + "uvs buffer",
			}
		);
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		super.setValueUVs(
			uvsAttributeLocation,
			uvsArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : CellPartitionNodeGeometry.DEFAULT.TYPE + ' ' + "uvs",
			}
		);
	}
	static assembleUVs(args = {}) {
		const uvsArrayBuffer = CellPartitionNodeGeometry.createUVsArrayBuffer(args);
		const uvsAttributeLocation = CellPartitionNodeGeometry.createUVsAttributeLocation(uvsArrayBuffer, args);
		CellPartitionNodeGeometry.setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args);


		return uvsAttributeLocation;
	}
};
