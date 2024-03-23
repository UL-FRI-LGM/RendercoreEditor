import { BoxGeometry } from "../objects/BoxGeometry.js";
import { Vector3 } from "../math/Vector3.js";
import { Euler, Matrix4, Quaternion } from "../RenderCore.js";


export class SpatialPartitionNodeGeometry extends BoxGeometry {


	static DEFAULT = {
		TYPE: "SpatialPartitionNodeGeometry",
		NAME: "",

		BOUNDING_SPHERE: null,
		BOUNDING_BOX: null,

		INDEXED: false,
		BASE_GEOMETRY: {
			nElements: 1,
			positions: [
				{
					elementspace: null,
					objectspace: new Vector3(0, 0, 0)
				}
			],
			dimensions: [
				{
					elementspace: { min: new Vector3(-1, -1, -1), max: new Vector3(+1, +1, +1) },
					objectspace: null
				}
			],
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


	get baseGeometry() { return super.baseGeometry; }
	set baseGeometry(baseGeometry) { super.baseGeometry = SpatialPartitionNodeGeometry.expandBaseGeometry(baseGeometry); }


	static expandBaseGeometry(baseGeometry) {
		const positions = [];
		const rotations = [];
		const scalings = [];

		const dimensions = [];
		const centers = [];

		const sizes = [];


		for (let i = 0; i < baseGeometry.nElements; i++) {
			const position_os = baseGeometry.positions[i].objectspace;
			const rotation_os = new Euler(0.0, 0.0, 0.0, "XYZ");
			const quaternion_os = new Quaternion(0.0, 0.0, 0.0, 1.0, false).setFromEuler(rotation_os);
			const scaling_os = new Vector3(1.0, 1.0, 1.0);
	
			const M = new Matrix4().compose(position_os, quaternion_os, scaling_os);
	
	
			const dimension_es = baseGeometry.dimensions[i].elementspace;
			const dimension_os = {
				min: dimension_es.min.clone().applyMatrix4(M),
				max: dimension_es.max.clone().applyMatrix4(M),
			};
			const center_es = dimension_es.min.clone().add(dimension_es.max.clone().sub(dimension_es.min).divideScalar(2.0));
			const center_os = center_es.clone().applyMatrix4(M);
	
			const size_es = dimension_es.max.clone().sub(dimension_es.min);
			const size_os = size_es.clone();	
	

			positions[i] = {
				objectspace: position_os
			};
			rotations[i] = {
				objectspace: rotation_os
			};
			scalings[i] = {
				objectspace: scaling_os
			};


			dimensions[i] = {
				elementspace: dimension_es,
				objectspace: dimension_os
			};
			centers[i] = {
				elementspace: center_es,
				objectspace: center_os
			};

			sizes[i] = {
				elementspace: size_es,
				objectspace: size_os
			};
			
		}


		return {
			positions: positions,
			rotations: rotations,
			scalings: scalings,
	
			dimensions: dimensions,
			centers: centers,
	
			sizes: sizes,
		};
	}

	static convertBaseGeometry(baseGeometry) {
		baseGeometry = SpatialPartitionNodeGeometry.expandBaseGeometry(baseGeometry);


		return {
			positions: baseGeometry.positions.map((v) => { return v.objectspace; }),

			dimensions: baseGeometry.dimensions.map((v) => { return v.elementspace; }),
		};
	}

	static createIndicesArrayBuffer(args = {}) {
		return super.createIndicesArrayBuffer(
			{
				...args,

				indexed: (args.indexed !== undefined) ? args.indexed : BoxGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? SpatialPartitionNodeGeometry.convertBaseGeometry(args.baseGeometry) : BoxGeometry.DEFAULT.BASE_GEOMETRY,
			}
		);
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
		return super.createVerticesArrayBuffer(
			{
				...args,

				indexed: (args.indexed !== undefined) ? args.indexed : BoxGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? SpatialPartitionNodeGeometry.convertBaseGeometry(args.baseGeometry) : BoxGeometry.DEFAULT.BASE_GEOMETRY,
			}
		);
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
		return super.createNormalsArrayBuffer(
			{
				...args,

				indexed: (args.indexed !== undefined) ? args.indexed : BoxGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? SpatialPartitionNodeGeometry.convertBaseGeometry(args.baseGeometry) : BoxGeometry.DEFAULT.BASE_GEOMETRY,
			}
		);
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
		return super.createUVsArrayBuffer(
			{
				...args,

				indexed: (args.indexed !== undefined) ? args.indexed : BoxGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? SpatialPartitionNodeGeometry.convertBaseGeometry(args.baseGeometry) : BoxGeometry.DEFAULT.BASE_GEOMETRY,
			}
		);
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
