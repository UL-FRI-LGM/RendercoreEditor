import { BoxFrameGeometry } from "../objects/BoxFrameGeometry.js";
import { Vector3 } from "../math/Vector3.js";
import { Vector3F32 } from "../math/vector/Vector3F32.js";


export class SpatialPartitionGeometry extends BoxFrameGeometry {


	static DEFAULT = {
		TYPE: "SpatialPartitionGeometry",
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

				type: (args.type !== undefined) ? args.type : SpatialPartitionGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SpatialPartitionGeometry.DEFAULT.NAME,

				boundingSphere: (args.boundingSphere !== undefined) ? args.boundingSphere : SpatialPartitionGeometry.DEFAULT.BOUNDING_SPHERE,
				boundingBox: (args.boundingBox !== undefined) ? args.boundingBox : SpatialPartitionGeometry.DEFAULT.BOUNDING_BOX,

				indexed: (args.indexed !== undefined) ? args.indexed : SpatialPartitionGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : SpatialPartitionGeometry.DEFAULT.BASE_GEOMETRY,

				indices: (args.indices !== undefined) ? args.indices : SpatialPartitionGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : SpatialPartitionGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : SpatialPartitionGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : SpatialPartitionGeometry.assembleUVs(args),
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

		const positionGrid_ws = baseGeometry.position;
		const rotationGrid_ws = baseGeometry.rotation;
		const scalingGrid_ws = baseGeometry.scaling;


		const dimensionGrid_ps = baseGeometry.dimension;
		const dimensionGrid_ws = {
			min: positionGrid_ws.clone().add(dimensionGrid_ps.min),
			max: positionGrid_ws.clone().add(dimensionGrid_ps.max),
		};

		const sizeGrid_ps = new Vector3().subVectors(dimensionGrid_ps.max, dimensionGrid_ps.min);
		const sizeGrid_ws = sizeGrid_ps.clone();

		const resolutionGrid_ps = baseGeometry.resolution;
		const resolutionGrid_ws = resolutionGrid_ps.clone();

		const centerGrid_ps = dimensionGrid_ps.min.clone().add(sizeGrid_ps.clone().divideScalar(2.0));
		const centerGrid_ws = positionGrid_ws.clone().add(centerGrid_ps);

		const dimensionCell_ps = {
			min: sizeGrid_ps.clone().divide(resolutionGrid_ps).divideScalar(-2.0),
			max: sizeGrid_ps.clone().divide(resolutionGrid_ps).divideScalar(+2.0)
		};


		const positions = [...new Array(resolutionGrid_ws.z).keys().reduce((accz, vz) => {
			return (accz.push(...[...new Array(resolutionGrid_ws.y).keys().reduce((accy, vy) => {
				return (accy.push(...[...new Array(resolutionGrid_ws.x).keys().reduce((accx, vx) => {
					const indexCell_ws = new Vector3(vx, vy, vz);

					const positionCell_ws = indexCell_ws.clone()
					.multiply(sizeGrid_ws).divide(resolutionGrid_ws)
					.add(sizeGrid_ws.clone().divide(resolutionGrid_ws).divideScalar(2.0))
					.add(new Vector3().subVectors(centerGrid_ws, sizeGrid_ws.clone().divideScalar(2.0)));


					return (accx.push(positionCell_ws), accx);
				}, [])]), accy);
			}, [])]), accz);
		}, [])];
		const dimensions = [...new Array(resolutionGrid_ws.z).keys().reduce((accz, vz) => {
			return (accz.push(...[...new Array(resolutionGrid_ws.y).keys().reduce((accy, vy) => {
				return (accy.push(...[...new Array(resolutionGrid_ws.x).keys().reduce((accx, vx) => {
					const dimension = {
						min: dimensionCell_ps.min.clone(),
						max: dimensionCell_ps.max.clone()
					};


					return (accx.push(dimension), accx);
				}, [])]), accy);
			}, [])]), accz);
		}, [])];


		return {
			positions: positions,
			dimensions: dimensions
		};
	}

	static createIndicesArrayBuffer(args = {}) {
		return super.createIndicesArrayBuffer(
			{
				...args,

				indexed: (args.indexed !== undefined) ? args.indexed : BoxFrameGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? (() => {
					const spatialPartitionBaseGeometry = SpatialPartitionGeometry.convertBaseGeometry(args);


					return {
						positions: spatialPartitionBaseGeometry.positions,
						dimensions: spatialPartitionBaseGeometry.dimensions,
					};
				})() : BoxFrameGeometry.DEFAULT.BASE_GEOMETRY,
			}
		);
	}
	static createIndicesAttributeLocation(indicesArrayBuffer, args = {}) {
		return super.createIndicesAttributeLocation(
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : SpatialPartitionGeometry.DEFAULT.TYPE + ' ' + "indices buffer",
			}
		);
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		super.setValueIndices(
			indicesAttributeLocation,
			indicesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : SpatialPartitionGeometry.DEFAULT.TYPE + ' ' + "indices",
			}
		);
	}
	static assembleIndices(args = {}) {
		const indicesArrayBuffer = SpatialPartitionGeometry.createIndicesArrayBuffer(args);
		const indicesAttributeLocation = SpatialPartitionGeometry.createIndicesAttributeLocation(indicesArrayBuffer, args);
		SpatialPartitionGeometry.setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args);


		return args.indexed ? indicesAttributeLocation : null;
	}

	static createVerticesArrayBuffer(args = {}) {
		return super.createVerticesArrayBuffer(
			{
				...args,

				indexed: (args.indexed !== undefined) ? args.indexed : BoxFrameGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? (() => {
					const spatialPartitionBaseGeometry = SpatialPartitionGeometry.convertBaseGeometry(args);


					return {
						positions: spatialPartitionBaseGeometry.positions,
						dimensions: spatialPartitionBaseGeometry.dimensions,
					};
				})() : BoxFrameGeometry.DEFAULT.BASE_GEOMETRY,
			}
		);
	}
	static createVerticesAttributeLocation(verticesArrayBuffer, args = {}) {
		return super.createVerticesAttributeLocation(
			verticesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : SpatialPartitionGeometry.DEFAULT.TYPE + ' ' + "vertices buffer",
			}
		);
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		super.setValueVertices(
			verticesAttributeLocation,
			verticesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : SpatialPartitionGeometry.DEFAULT.TYPE + ' ' + "vertices",
			}
		);
	}
	static assembleVertices(args = {}) {
		const verticesArrayBuffer = SpatialPartitionGeometry.createVerticesArrayBuffer(args);
		const verticesAttributeLocation = SpatialPartitionGeometry.createVerticesAttributeLocation(verticesArrayBuffer, args);
		SpatialPartitionGeometry.setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args);


		return verticesAttributeLocation;
	}

	static createNormalsArrayBuffer(args = {}) {
		return super.createNormalsArrayBuffer(
			{
				...args,

				indexed: (args.indexed !== undefined) ? args.indexed : BoxFrameGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? (() => {
					const spatialPartitionBaseGeometry = SpatialPartitionGeometry.convertBaseGeometry(args);


					return {
						positions: spatialPartitionBaseGeometry.positions,
						dimensions: spatialPartitionBaseGeometry.dimensions,
					};
				})() : BoxFrameGeometry.DEFAULT.BASE_GEOMETRY,
			}
		);
	}
	static createNormalsAttributeLocation(normalsArrayBuffer, args = {}) {
		return super.createNormalsAttributeLocation(
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : SpatialPartitionGeometry.DEFAULT.TYPE + ' ' + "normals buffer",
			}
		);
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		super.setValueNormals(
			normalsAttributeLocation,
			normalsArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : SpatialPartitionGeometry.DEFAULT.TYPE + ' ' + "normals",
			}
		);
	}
	static assembleNormals(args = {}) {
		const normalsArrayBuffer = SpatialPartitionGeometry.createNormalsArrayBuffer(args);
		const normalsAttributeLocation = SpatialPartitionGeometry.createNormalsAttributeLocation(normalsArrayBuffer, args);
		SpatialPartitionGeometry.setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args);


		return normalsAttributeLocation;
	}

	static createUVsArrayBuffer(args = {}) {
		return super.createUVsArrayBuffer(
			{
				...args,

				indexed: (args.indexed !== undefined) ? args.indexed : BoxFrameGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? (() => {
					const spatialPartitionBaseGeometry = SpatialPartitionGeometry.convertBaseGeometry(args);


					return {
						positions: spatialPartitionBaseGeometry.positions,
						dimensions: spatialPartitionBaseGeometry.dimensions,
					};
				})() : BoxFrameGeometry.DEFAULT.BASE_GEOMETRY,
			}
		);
	}
	static createUVsAttributeLocation(uvsArrayBuffer, args = {}) {
		return super.createUVsAttributeLocation(
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : SpatialPartitionGeometry.DEFAULT.TYPE + ' ' + "uvs buffer",
			}
		);
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		super.setValueUVs(
			uvsAttributeLocation,
			uvsArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : SpatialPartitionGeometry.DEFAULT.TYPE + ' ' + "uvs",
			}
		);
	}
	static assembleUVs(args = {}) {
		const uvsArrayBuffer = SpatialPartitionGeometry.createUVsArrayBuffer(args);
		const uvsAttributeLocation = SpatialPartitionGeometry.createUVsAttributeLocation(uvsArrayBuffer, args);
		SpatialPartitionGeometry.setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args);


		return uvsAttributeLocation;
	}
};
