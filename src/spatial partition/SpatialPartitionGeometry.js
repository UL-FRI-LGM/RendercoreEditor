import { BoxFrameGeometry } from "../objects/BoxFrameGeometry.js";
import { Vector3 } from "../math/Vector3.js";
import { Vector3F32 } from "../math/vector/Vector3F32.js";
import { Euler, Matrix4, Quaternion } from "../RenderCore.js";


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
			position: {
				elementspace: null,
				objectspace: new Vector3(0, 0, 0)
			},

			dimension: {
				elementspace: { min: new Vector3(-4, -4, -4), max: new Vector3(+4, +4, +4) },
				objectspace: null
			},
			resolution: {
				elementspace: new Vector3(1, 1, 1),
				objectspace: null
			},
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
	set baseGeometry(baseGeometry) { super.baseGeometry = SpatialPartitionGeometry.expandBaseGeometry(baseGeometry); }


	static expandBaseGeometry(baseGeometry) {
		const position_os = baseGeometry.position.objectspace;
		const rotation_os = new Euler(0.0, 0.0, 0.0, "XYZ");
		const quaternion_os = new Quaternion(0.0, 0.0, 0.0, 1.0, false).setFromEuler(rotation_os);
		const scaling_os = new Vector3(1.0, 1.0, 1.0);

		const M = new Matrix4().compose(position_os, quaternion_os, scaling_os);


		const dimension_es = baseGeometry.dimension.elementspace;
		const dimension_os = {
			min: dimension_es.min.clone().applyMatrix4(M),
			max: dimension_es.max.clone().applyMatrix4(M),
		};
		const center_es = dimension_es.min.clone().add(dimension_es.max.clone().sub(dimension_es.min).divideScalar(2.0));
		const center_os = center_es.clone().applyMatrix4(M);

		const size_es = dimension_es.max.clone().sub(dimension_es.min);
		const size_os = size_es.clone();
		const resolution_es = baseGeometry.resolution.elementspace;
		const resolution_os = resolution_es.clone();
		const resolutionOverSize_es = resolution_es.clone().divide(size_es);
		const resolutionOverSize_os = resolutionOverSize_es.clone();
		const resolutionMinusOne_es = resolution_es.clone().sub(Vector3F32.ONE);
		const resolutionMinusOne_os = resolutionMinusOne_es.clone();


		return {
			position: {
				objectspace: position_os
			},
			rotation: {
				objectspace: rotation_os
			},
			scaling: {
				objectspace: scaling_os
			},
	

			dimension: {
				elementspace: dimension_es,
				objectspace: dimension_os
			},
			center: {
				elementspace: center_es,
				objectspace: center_os
			},
	
			size: {
				elementspace: size_es,
				objectspace: size_os
			},
			resolution: {
				elementspace: resolution_es,
				objectspace: resolution_os
			},
			resolutionOverSize: {
				elementspace: resolutionOverSize_es,
				objectspace: resolutionOverSize_os,
			},
			resolutionMinusOne: {
				elementspace: resolutionMinusOne_es,
				objectspace: resolutionMinusOne_os
			}
		};
	}

	static convertBaseGeometry(baseGeometry) {
		baseGeometry = SpatialPartitionGeometry.expandBaseGeometry(baseGeometry);

		const gridSize_es = baseGeometry.size.elementspace;
		const gridSize_os = baseGeometry.size.objectspace;
		const gridResolution_es = baseGeometry.resolution.elementspace;
		const gridResolution_os = baseGeometry.resolution.objectspace;
		const gridCenter_os = baseGeometry.center.objectspace;


		const positions = [...new Array(gridResolution_os.z).keys().reduce((accz, vz) => {
			return (accz.push(...[...new Array(gridResolution_os.y).keys().reduce((accy, vy) => {
				return (accy.push(...[...new Array(gridResolution_os.x).keys().reduce((accx, vx) => {
					const indexCell_os = new Vector3(vx, vy, vz);

					const cellPosition_os = indexCell_os.clone()
					.multiply(gridSize_os).divide(gridResolution_os)
					.add(gridSize_os.clone().divide(gridResolution_os).divideScalar(2.0))
					.add(new Vector3().subVectors(gridCenter_os, gridSize_os.clone().divideScalar(2.0)));


					return (accx.push(cellPosition_os), accx);
				}, [])]), accy);
			}, [])]), accz);
		}, [])];
		const dimensions = [...new Array(gridResolution_os.z).keys().reduce((accz, vz) => {
			return (accz.push(...[...new Array(gridResolution_os.y).keys().reduce((accy, vy) => {
				return (accy.push(...[...new Array(gridResolution_os.x).keys().reduce((accx, vx) => {
					const cellDimension_es = {
						min: gridSize_es.clone().divide(gridResolution_es).divideScalar(-2.0),
						max: gridSize_es.clone().divide(gridResolution_es).divideScalar(+2.0)
					};

					
					const dimension = {
						min: cellDimension_es.min.clone(),
						max: cellDimension_es.max.clone()
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
					const spatialPartitionBaseGeometry = SpatialPartitionGeometry.convertBaseGeometry(args.baseGeometry);


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
					const spatialPartitionBaseGeometry = SpatialPartitionGeometry.convertBaseGeometry(args.baseGeometry);


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
					const spatialPartitionBaseGeometry = SpatialPartitionGeometry.convertBaseGeometry(args.baseGeometry);


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
					const spatialPartitionBaseGeometry = SpatialPartitionGeometry.convertBaseGeometry(args.baseGeometry);


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
