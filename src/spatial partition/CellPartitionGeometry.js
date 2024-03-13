import { SpatialPartitionGeometry } from "./SpatialPartitionGeometry.js";
import { Vector3 } from "../math/Vector3.js";


export class CellPartitionGeometry extends SpatialPartitionGeometry {


	static DEFAULT = {
		TYPE: "CellPartitionGeometry",
		NAME: "",

		BOUNDING_SPHERE: null,
		BOUNDING_BOX: null,

		INDEXED: false,
		BASE_GEOMETRY: {
			// positions: [new Vector3(0, 0, 0)],
			// dimensions: [{ min: new Vector3(-4, -4, -4), max: new Vector3(+4, +4, +4) }],
			position: new Vector3(0, 0, 0),
			dimension: { min: new Vector3(-4, -4, -4), max: new Vector3(+4, +4, +4) },
			resolution: new Vector3(1, 1, 1),
		},
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : CellPartitionGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : CellPartitionGeometry.DEFAULT.NAME,

				boundingSphere: (args.boundingSphere !== undefined) ? args.boundingSphere : CellPartitionGeometry.DEFAULT.BOUNDING_SPHERE,
				boundingBox: (args.boundingBox !== undefined) ? args.boundingBox : CellPartitionGeometry.DEFAULT.BOUNDING_BOX,

				indexed: (args.indexed !== undefined) ? args.indexed : CellPartitionGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : CellPartitionGeometry.DEFAULT.BASE_GEOMETRY,

				indices: (args.indices !== undefined) ? args.indices : CellPartitionGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : CellPartitionGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : CellPartitionGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : CellPartitionGeometry.assembleUVs(args),
				MMats: (args.MMats !== undefined) ? args.MMats : null,
				translations: (args.translations !== undefined) ? args.translations : null,
			}
		);
	}


	static createIndicesArrayBuffer(args = {}) {
		return super.createIndicesArrayBuffer(args);
	}
	static createIndicesAttributeLocation(indicesArrayBuffer, args = {}) {
		return super.createIndicesAttributeLocation(
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : CellPartitionGeometry.DEFAULT.TYPE + ' ' + "indices buffer",
			}
		);
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		super.setValueIndices(
			indicesAttributeLocation,
			indicesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : CellPartitionGeometry.DEFAULT.TYPE + ' ' + "indices",
			}
		);
	}
	static assembleIndices(args = {}) {
		const indicesArrayBuffer = CellPartitionGeometry.createIndicesArrayBuffer(args);
		const indicesAttributeLocation = CellPartitionGeometry.createIndicesAttributeLocation(indicesArrayBuffer, args);
		CellPartitionGeometry.setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args);


		return args.indexed ? indicesAttributeLocation : null;
	}

	static createVerticesArrayBuffer(args = {}) {
		return super.createVerticesArrayBuffer(args);
	}
	static createVerticesAttributeLocation(verticesArrayBuffer, args = {}) {
		return super.createVerticesAttributeLocation(
			verticesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : CellPartitionGeometry.DEFAULT.TYPE + ' ' + "vertices buffer",
			}
		);
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		super.setValueVertices(
			verticesAttributeLocation,
			verticesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : CellPartitionGeometry.DEFAULT.TYPE + ' ' + "vertices",
			}
		);
	}
	static assembleVertices(args = {}) {
		const verticesArrayBuffer = CellPartitionGeometry.createVerticesArrayBuffer(args);
		const verticesAttributeLocation = CellPartitionGeometry.createVerticesAttributeLocation(verticesArrayBuffer, args);
		CellPartitionGeometry.setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args);


		return verticesAttributeLocation;
	}

	static createNormalsArrayBuffer(args = {}) {
		return super.createNormalsArrayBuffer(args);
	}
	static createNormalsAttributeLocation(normalsArrayBuffer, args = {}) {
		return super.createNormalsAttributeLocation(
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : CellPartitionGeometry.DEFAULT.TYPE + ' ' + "normals buffer",
			}
		);
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		super.setValueNormals(
			normalsAttributeLocation,
			normalsArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : CellPartitionGeometry.DEFAULT.TYPE + ' ' + "normals",
			}
		);
	}
	static assembleNormals(args = {}) {
		const normalsArrayBuffer = CellPartitionGeometry.createNormalsArrayBuffer(args);
		const normalsAttributeLocation = CellPartitionGeometry.createNormalsAttributeLocation(normalsArrayBuffer, args);
		CellPartitionGeometry.setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args);


		return normalsAttributeLocation;
	}

	static createUVsArrayBuffer(args = {}) {
		return super.createUVsArrayBuffer(args);
	}
	static createUVsAttributeLocation(uvsArrayBuffer, args = {}) {
		return super.createUVsAttributeLocation(
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : CellPartitionGeometry.DEFAULT.TYPE + ' ' + "uvs buffer",
			}
		);
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		super.setValueUVs(
			uvsAttributeLocation,
			uvsArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : CellPartitionGeometry.DEFAULT.TYPE + ' ' + "uvs",
			}
		);
	}
	static assembleUVs(args = {}) {
		const uvsArrayBuffer = CellPartitionGeometry.createUVsArrayBuffer(args);
		const uvsAttributeLocation = CellPartitionGeometry.createUVsAttributeLocation(uvsArrayBuffer, args);
		CellPartitionGeometry.setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args);


		return uvsAttributeLocation;
	}
};
