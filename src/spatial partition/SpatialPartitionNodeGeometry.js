import { BoxFrameGeometry } from "../objects/BoxFrameGeometry.js";
import { Vector3 } from "../math/Vector3.js";


export class SpatialPartitionNodeGeometry extends BoxFrameGeometry {


	static DEFAULT = {
		TYPE: "SpatialPartitionNodeGeometry",
		NAME: "",

		BOUNDING_SPHERE: null,
		BOUNDING_BOX: null,

		INDEXED: false,
		BASE_GEOMETRY: {
			positions: [new Vector3(0, 0, 0)],
			dimensions: [{ min: new Vector3(-1, -1, -1), max: new Vector3(+1, +1, +1) }],
		},
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : SpatialPartitionNodeGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SpatialPartitionNodeGeometry.DEFAULT.NAME,

				boundingSphere: (args.boundingSphere !== undefined) ? args.boundingSphere : SpatialPartitionNodeGeometry.DEFAULT.BOUNDING_SPHERE,
				boundingBox: (args.boundingBox !== undefined) ? args.boundingBox : SpatialPartitionNodeGeometry.DEFAULT.BOUNDING_BOX,

				indexed: (args.indexed !== undefined) ? args.indexed : SpatialPartitionNodeGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : SpatialPartitionNodeGeometry.DEFAULT.BASE_GEOMETRY,

				indices: (args.indices !== undefined) ? args.indices : SpatialPartitionNodeGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : SpatialPartitionNodeGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : SpatialPartitionNodeGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : SpatialPartitionNodeGeometry.assembleUVs(args),
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

				label: (args.label !== undefined) ? args.label : SpatialPartitionNodeGeometry.DEFAULT.TYPE + ' ' + "indices buffer",
			}
		);
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		super.setValueIndices(
			indicesAttributeLocation,
			indicesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : SpatialPartitionNodeGeometry.DEFAULT.TYPE + ' ' + "indices",
			}
		);
	}
	static assembleIndices(args = {}) {
		const indicesArrayBuffer = SpatialPartitionNodeGeometry.createIndicesArrayBuffer(args);
		const indicesAttributeLocation = SpatialPartitionNodeGeometry.createIndicesAttributeLocation(indicesArrayBuffer, args);
		SpatialPartitionNodeGeometry.setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args);


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

				label: (args.label !== undefined) ? args.label : SpatialPartitionNodeGeometry.DEFAULT.TYPE + ' ' + "vertices buffer",
			}
		);
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		super.setValueVertices(
			verticesAttributeLocation,
			verticesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : SpatialPartitionNodeGeometry.DEFAULT.TYPE + ' ' + "vertices",
			}
		);
	}
	static assembleVertices(args = {}) {
		const verticesArrayBuffer = SpatialPartitionNodeGeometry.createVerticesArrayBuffer(args);
		const verticesAttributeLocation = SpatialPartitionNodeGeometry.createVerticesAttributeLocation(verticesArrayBuffer, args);
		SpatialPartitionNodeGeometry.setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args);


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

				label: (args.label !== undefined) ? args.label : SpatialPartitionNodeGeometry.DEFAULT.TYPE + ' ' + "normals buffer",
			}
		);
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		super.setValueNormals(
			normalsAttributeLocation,
			normalsArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : SpatialPartitionNodeGeometry.DEFAULT.TYPE + ' ' + "normals",
			}
		);
	}
	static assembleNormals(args = {}) {
		const normalsArrayBuffer = SpatialPartitionNodeGeometry.createNormalsArrayBuffer(args);
		const normalsAttributeLocation = SpatialPartitionNodeGeometry.createNormalsAttributeLocation(normalsArrayBuffer, args);
		SpatialPartitionNodeGeometry.setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args);


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

				label: (args.label !== undefined) ? args.label : SpatialPartitionNodeGeometry.DEFAULT.TYPE + ' ' + "uvs buffer",
			}
		);
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		super.setValueUVs(
			uvsAttributeLocation,
			uvsArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : SpatialPartitionNodeGeometry.DEFAULT.TYPE + ' ' + "uvs",
			}
		);
	}
	static assembleUVs(args = {}) {
		const uvsArrayBuffer = SpatialPartitionNodeGeometry.createUVsArrayBuffer(args);
		const uvsAttributeLocation = SpatialPartitionNodeGeometry.createUVsAttributeLocation(uvsArrayBuffer, args);
		SpatialPartitionNodeGeometry.setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args);


		return uvsAttributeLocation;
	}
};
