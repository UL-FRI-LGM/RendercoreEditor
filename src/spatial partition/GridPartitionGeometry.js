import { SpatialPartitionGeometry } from "./SpatialPartitionGeometry.js";
import { Vector3 } from "../math/Vector3.js";
import { Vector3F32 } from "../math/vector/Vector3F32.js";


export class GridPartitionGeometry extends SpatialPartitionGeometry {


	static DEFAULT = {
		TYPE: "GridPartitionGeometry",
		NAME: "",

		INDEXED: false,
		BASE_GEOMETRY: {
			// positions: [new Vector3(0, 0, 0)],
			// dimensions: [{ min: new Vector3(-1, -1, -1), max: new Vector3(+1, +1, +1)}],
			dimension: { min: new Vector3(-10, -10, -10), max: new Vector3(+10, +10, +10) },
			resolution: new Vector3(20, 20, 20),
		},
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : GridPartitionGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : GridPartitionGeometry.DEFAULT.NAME,

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


	get baseGeometry() { return super.baseGeometry; }
	set baseGeometry(baseGeometry) {
		super.baseGeometry = baseGeometry;

		this.baseGeometry.size = new Vector3().subVectors(this.baseGeometry.dimension.max, this.baseGeometry.dimension.min);
		this.baseGeometry.resolutionOverSize = new Vector3().copy(this.baseGeometry.resolution).divide(this.baseGeometry.size);
	
		this.baseGeometry.resolutionMinusOne = new Vector3().subVectors(this.baseGeometry.resolution, Vector3F32.ONE);
	}


	static convertBaseGeometry(args = {}) {
		const baseGeometry = args.baseGeometry;

		const dimensionGrid = baseGeometry.dimension;
		const resolutionGrid = baseGeometry.resolution;
		const sizeGrid = new Vector3().subVectors(dimensionGrid.max, dimensionGrid.min);
		
		const dimensionCell = {
			min: new Vector3(-sizeGrid.x/resolutionGrid.x/2.0, -sizeGrid.y/resolutionGrid.y/2.0, -sizeGrid.z/resolutionGrid.z/2.0),
			max: new Vector3(+sizeGrid.x/resolutionGrid.x/2.0, +sizeGrid.y/resolutionGrid.y/2.0, +sizeGrid.z/resolutionGrid.z/2.0)
		};
		const sizeCell = new Vector3().subVectors(dimensionCell.max, dimensionCell.min);

		const dimensionPosition = {
			min: dimensionGrid.min.clone().sub(dimensionCell.min),
			max: dimensionGrid.max.clone().sub(dimensionCell.max)
		};


		const positions = [...new Array(resolutionGrid.x * resolutionGrid.y * resolutionGrid.z)].map((v) => {
			return new Vector3(0, 0, 0);
		}).reduce((acc, v) => {
			acc.positions.push(v.copy(acc.positionCurr));

			acc.positionCurr.x = acc.positionCurr.x + sizeCell.x;
			acc.positionCurr.y = (acc.positionCurr.x > dimensionPosition.max.x) ? acc.positionCurr.y + sizeCell.y : acc.positionCurr.y;
			acc.positionCurr.z = (acc.positionCurr.y > dimensionPosition.max.y) ? acc.positionCurr.z + sizeCell.z : acc.positionCurr.z;

			acc.positionCurr.x = (acc.positionCurr.x <= dimensionPosition.max.x) ? acc.positionCurr.x : dimensionPosition.min.x;
			acc.positionCurr.y = (acc.positionCurr.y <= dimensionPosition.max.y) ? acc.positionCurr.y : dimensionPosition.min.y;
			acc.positionCurr.z = (acc.positionCurr.z <= dimensionPosition.max.z) ? acc.positionCurr.z : dimensionPosition.min.z;


			return acc;
		}, { positions: [], positionCurr: dimensionPosition.min.clone() }).positions;

		const dimensions = [...new Array(resolutionGrid.x * resolutionGrid.y * resolutionGrid.z)].map((v) => {
			return {
				min: dimensionCell.min.clone(),
				max: dimensionCell.max.clone()
			};
		});


		return {
			positions: positions,
			dimensions: dimensions
		};
	}

	static createIndicesArrayBuffer(args = {}) {
		return super.createIndicesArrayBuffer(
			{
				...args,

				indexed: (args.indexed !== undefined) ? args.indexed : SpatialPartitionGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? (() => {
					const spatialPartitionBaseGeometry = this.convertBaseGeometry(args);


					return {
						positions: spatialPartitionBaseGeometry.positions,
						dimensions: spatialPartitionBaseGeometry.dimensions,
					};
				})() : SpatialPartitionGeometry.DEFAULT.BASE_GEOMETRY,
			}
		);
	}
	static createIndicesAttributeLocation(indicesArrayBuffer, args = {}) {
		return super.createIndicesAttributeLocation(
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "grid partition indices buffer",
			}
		);
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		super.setValueIndices(
			indicesAttributeLocation,
			indicesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "grid partition indices",
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
		return super.createVerticesArrayBuffer(
			{
				...args,

				indexed: (args.indexed !== undefined) ? args.indexed : SpatialPartitionGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? (() => {
					const spatialPartitionBaseGeometry = this.convertBaseGeometry(args);


					return {
						positions: spatialPartitionBaseGeometry.positions,
						dimensions: spatialPartitionBaseGeometry.dimensions,
					};
				})() : SpatialPartitionGeometry.DEFAULT.BASE_GEOMETRY,
			}
		);
	}
	static createVerticesAttributeLocation(verticesArrayBuffer, args = {}) {
		return super.createVerticesAttributeLocation(
			verticesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "grid partition vertices buffer",
			}
		);
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		super.setValueVertices(
			verticesAttributeLocation,
			verticesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "grid partition vertices",
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
		return super.createNormalsArrayBuffer(
			{
				...args,

				indexed: (args.indexed !== undefined) ? args.indexed : SpatialPartitionGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? (() => {
					const spatialPartitionBaseGeometry = this.convertBaseGeometry(args);


					return {
						positions: spatialPartitionBaseGeometry.positions,
						dimensions: spatialPartitionBaseGeometry.dimensions,
					};
				})() : SpatialPartitionGeometry.DEFAULT.BASE_GEOMETRY,
			}
		);
	}
	static createNormalsAttributeLocation(normalsArrayBuffer, args = {}) {
		return super.createNormalsAttributeLocation(
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "grid partition normals buffer",
			}
		);
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		super.setValueNormals(
			normalsAttributeLocation,
			normalsArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "grid partition normals",
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
		return super.createUVsArrayBuffer(
			{
				...args,

				indexed: (args.indexed !== undefined) ? args.indexed : SpatialPartitionGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? (() => {
					const spatialPartitionBaseGeometry = this.convertBaseGeometry(args);


					return {
						positions: spatialPartitionBaseGeometry.positions,
						dimensions: spatialPartitionBaseGeometry.dimensions,
					};
				})() : SpatialPartitionGeometry.DEFAULT.BASE_GEOMETRY,
			}
		);
	}
	static createUVsAttributeLocation(uvsArrayBuffer, args = {}) {
		return super.createUVsAttributeLocation(
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "grid partition uvs buffer",
			}
		);
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		super.setValueUVs(
			uvsAttributeLocation,
			uvsArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "grid partition uvs",
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
