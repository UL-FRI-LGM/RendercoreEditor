import { SpatialPartitionGeometry } from "./SpatialPartitionGeometry.js";
import { Vector3 } from "../math/Vector3.js";


export class GridPartitionGeometry extends SpatialPartitionGeometry {


	static DEFAULT = {
		TYPE: "GridPartitionGeometry",
		NAME: "",

		BOUNDING_SPHERE: null,
		BOUNDING_BOX: null,

		INDEXED: false,
		BASE_GEOMETRY: {
			// positions: [new Vector3(0, 0, 0)],
			// dimensions: [{ min: new Vector3(-4, -4, -4), max: new Vector3(+4, +4, +4) }],
			elements: [
				{
					position: {
						elementspace: null,
						objectspace: new Vector3(0, 0, 0)
					},

					dimension: {
						elementspace: { min: new Vector3(-4, -4, -4), max: new Vector3(+4, +4, +4) },
						objectspace: null
					},
					resolution: {
						elementspace: new Vector3(8, 8, 8),
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

				type: (args.type !== undefined) ? args.type : GridPartitionGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : GridPartitionGeometry.DEFAULT.NAME,

				boundingSphere: (args.boundingSphere !== undefined) ? args.boundingSphere : GridPartitionGeometry.DEFAULT.BOUNDING_SPHERE,
				boundingBox: (args.boundingBox !== undefined) ? args.boundingBox : GridPartitionGeometry.DEFAULT.BOUNDING_BOX,
			
				indexed: (args.indexed !== undefined) ? args.indexed : GridPartitionGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : GridPartitionGeometry.DEFAULT.BASE_GEOMETRY,

				indices: (args.indices !== undefined) ? args.indices : GridPartitionGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : GridPartitionGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : GridPartitionGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : GridPartitionGeometry.assembleUVs(args),
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

				label: (args.label !== undefined) ? args.label : GridPartitionGeometry.DEFAULT.TYPE + ' ' + "indices buffer",
			}
		);
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		super.setValueIndices(
			indicesAttributeLocation,
			indicesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : GridPartitionGeometry.DEFAULT.TYPE + ' ' + "indices",
			}
		);
	}
	static assembleIndices(args = {}) {
		const indicesArrayBuffer = GridPartitionGeometry.createIndicesArrayBuffer(args);
		const indicesAttributeLocation = GridPartitionGeometry.createIndicesAttributeLocation(indicesArrayBuffer, args);
		GridPartitionGeometry.setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args);


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

				label: (args.label !== undefined) ? args.label : GridPartitionGeometry.DEFAULT.TYPE + ' ' + "vertices buffer",
			}
		);
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		super.setValueVertices(
			verticesAttributeLocation,
			verticesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : GridPartitionGeometry.DEFAULT.TYPE + ' ' + "vertices",
			}
		);
	}
	static assembleVertices(args = {}) {
		const verticesArrayBuffer = GridPartitionGeometry.createVerticesArrayBuffer(args);
		const verticesAttributeLocation = GridPartitionGeometry.createVerticesAttributeLocation(verticesArrayBuffer, args);
		GridPartitionGeometry.setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args);


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

				label: (args.label !== undefined) ? args.label : GridPartitionGeometry.DEFAULT.TYPE + ' ' + "normals buffer",
			}
		);
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		super.setValueNormals(
			normalsAttributeLocation,
			normalsArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : GridPartitionGeometry.DEFAULT.TYPE + ' ' + "normals",
			}
		);
	}
	static assembleNormals(args = {}) {
		const normalsArrayBuffer = GridPartitionGeometry.createNormalsArrayBuffer(args);
		const normalsAttributeLocation = GridPartitionGeometry.createNormalsAttributeLocation(normalsArrayBuffer, args);
		GridPartitionGeometry.setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args);


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

				label: (args.label !== undefined) ? args.label : GridPartitionGeometry.DEFAULT.TYPE + ' ' + "uvs buffer",
			}
		);
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		super.setValueUVs(
			uvsAttributeLocation,
			uvsArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : GridPartitionGeometry.DEFAULT.TYPE + ' ' + "uvs",
			}
		);
	}
	static assembleUVs(args = {}) {
		const uvsArrayBuffer = GridPartitionGeometry.createUVsArrayBuffer(args);
		const uvsAttributeLocation = GridPartitionGeometry.createUVsAttributeLocation(uvsArrayBuffer, args);
		GridPartitionGeometry.setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args);


		return uvsAttributeLocation;
	}
};
