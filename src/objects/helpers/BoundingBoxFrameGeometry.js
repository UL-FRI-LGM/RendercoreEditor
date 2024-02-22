import { BoxFrameGeometry } from "../BoxFrameGeometry.js";
import { Vector3 } from "../../math/Vector3.js";
import { Cube } from "../Cube.js";


export class BoundingBoxFrameGeometry extends BoxFrameGeometry {


	static DEFAULT = {
		TYPE: "BoundingBoxFrameGeometry",
		NAME: "",

		INDEXED: false,
		BASE_GEOMETRY: {
			// positions: [new Vector3(0, 0, 0)],
			// dimensions: [{ min: new Vector3(-1, -1, -1), max: new Vector3(+1, +1, +1)}],
			mesh: new Cube(),
		},
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : BoundingBoxFrameGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : BoundingBoxFrameGeometry.DEFAULT.NAME,

				indexed: (args.indexed !== undefined) ? args.indexed : BoundingBoxFrameGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : BoundingBoxFrameGeometry.DEFAULT.BASE_GEOMETRY,

				indices: (args.indices !== undefined) ? args.indices : BoundingBoxFrameGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : BoundingBoxFrameGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : BoundingBoxFrameGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : BoundingBoxFrameGeometry.assembleUVs(args),
				MMats: (args.MMats !== undefined) ? args.MMats : null,
				translations: (args.translations !== undefined) ? args.translations : null,
			}
		);
	}


	static createIndicesArrayBuffer(args = {}) {
		return super.createIndicesArrayBuffer(
			{
				...args,

				indexed: (args.indexed !== undefined) ? args.indexed : BoxFrameGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? {
					positions: [new Vector3(0, 0, 0)],
					dimensions: [
						{
							min: args.baseGeometry.mesh.bounding.box.global.objectspace.min,
							max: args.baseGeometry.mesh.bounding.box.global.objectspace.max
						}
					],
				} : BoxFrameGeometry.DEFAULT.BASE_GEOMETRY,
			}
		);
	}
	static createIndicesAttributeLocation(indicesArrayBuffer, args = {}) {
		return super.createIndicesAttributeLocation(
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "bounding box frame indices buffer",
			}
		);
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		super.setValueIndices(
			indicesAttributeLocation,
			indicesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "bounding box frame indices",
			}
		);
	}
	static assembleIndices(args = {}) {
		const indicesArrayBuffer = BoundingBoxFrameGeometry.createIndicesArrayBuffer(args);
		const indicesAttributeLocation = BoundingBoxFrameGeometry.createIndicesAttributeLocation(indicesArrayBuffer, args);
		BoundingBoxFrameGeometry.setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args);


		return args.indexed ? indicesAttributeLocation : null;
	}
	// static assembleIndices(args = {}) {
	// 	return super.assembleIndices(
	// 		{
	// 			...args,

	// 			indexed: (args.indexed !== undefined) ? args.indexed : BoxFrameGeometry.DEFAULT.INDEXED,
	// 			baseGeometry: (args.baseGeometry !== undefined) ? {
	// 				positions: [new Vector3(0, 0, 0)],
	// 				dimensions: [
	// 					{
	// 						min: args.baseGeometry.mesh.bounding.box.global.objectspace.min,
	// 						max: args.baseGeometry.mesh.bounding.box.global.objectspace.max
	// 					}
	// 				],
	// 			} : BoxFrameGeometry.DEFAULT.BASE_GEOMETRY,
	// 		}
	// 	);
	// }

	static createVerticesArrayBuffer(args = {}) {
		return super.createVerticesArrayBuffer(
			{
				...args,

				indexed: (args.indexed !== undefined) ? args.indexed : BoxFrameGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? {
					positions: [new Vector3(0, 0, 0)],
					dimensions: [
						{
							min: args.baseGeometry.mesh.bounding.box.global.objectspace.min,
							max: args.baseGeometry.mesh.bounding.box.global.objectspace.max
						}
					],
				} : BoxFrameGeometry.DEFAULT.BASE_GEOMETRY,
			}
		);
	}
	static createVerticesAttributeLocation(verticesArrayBuffer, args = {}) {
		return super.createVerticesAttributeLocation(
			verticesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "bounding box frame vertices buffer",
			}
		);
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		super.setValueVertices(
			verticesAttributeLocation,
			verticesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "bounding box frame vertices",
			}
		);
	}
	static assembleVertices(args = {}) {
		const verticesArrayBuffer = BoundingBoxFrameGeometry.createVerticesArrayBuffer(args);
		const verticesAttributeLocation = BoundingBoxFrameGeometry.createVerticesAttributeLocation(verticesArrayBuffer, args);
		BoundingBoxFrameGeometry.setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args);


		return verticesAttributeLocation;
	}
	// static assembleVertices(args = {}) {
	// 	return super.assembleVertices(
	// 		{
	// 			...args,

	// 			indexed: (args.indexed !== undefined) ? args.indexed : BoxFrameGeometry.DEFAULT.INDEXED,
	// 			baseGeometry: (args.baseGeometry !== undefined) ? {
	// 				positions: [new Vector3(0, 0, 0)],
	// 				dimensions: [
	// 					{
	// 						min: args.baseGeometry.mesh.bounding.box.global.objectspace.min,
	// 						max: args.baseGeometry.mesh.bounding.box.global.objectspace.max
	// 					}
	// 				],
	// 			} : BoxFrameGeometry.DEFAULT.BASE_GEOMETRY,
	// 		}
	// 	);
	// }

	static createNormalsArrayBuffer(args = {}) {
		return super.createNormalsArrayBuffer(
			{
				...args,

				indexed: (args.indexed !== undefined) ? args.indexed : BoxFrameGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? {
					positions: [new Vector3(0, 0, 0)],
					dimensions: [
						{
							min: args.baseGeometry.mesh.bounding.box.global.objectspace.min,
							max: args.baseGeometry.mesh.bounding.box.global.objectspace.max
						}
					],
				} : BoxFrameGeometry.DEFAULT.BASE_GEOMETRY,
			}
		);
	}
	static createNormalsAttributeLocation(normalsArrayBuffer, args = {}) {
		return super.createNormalsAttributeLocation(
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "bounding box frame normals buffer",
			}
		);
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		super.setValueNormals(
			normalsAttributeLocation,
			normalsArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "bounding box frame normals",
			}
		);
	}
	static assembleNormals(args = {}) {
		const normalsArrayBuffer = BoundingBoxFrameGeometry.createNormalsArrayBuffer(args);
		const normalsAttributeLocation = BoundingBoxFrameGeometry.createNormalsAttributeLocation(normalsArrayBuffer, args);
		BoundingBoxFrameGeometry.setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args);


		return normalsAttributeLocation;
	}
	// static assembleNormals(args = {}) {
	// 	return super.assembleNormals(
	// 		{
	// 			...args,

	// 			indexed: (args.indexed !== undefined) ? args.indexed : BoxFrameGeometry.DEFAULT.INDEXED,
	// 			baseGeometry: (args.baseGeometry !== undefined) ? {
	// 				positions: [new Vector3(0, 0, 0)],
	// 				dimensions: [
	// 					{
	// 						min: args.baseGeometry.mesh.bounding.box.global.objectspace.min,
	// 						max: args.baseGeometry.mesh.bounding.box.global.objectspace.max
	// 					}
	// 				],
	// 			} : BoxFrameGeometry.DEFAULT.BASE_GEOMETRY,
	// 		}
	// 	);
	// }

	static createUVsArrayBuffer(args = {}) {
		return super.createUVsArrayBuffer(
			{
				...args,

				indexed: (args.indexed !== undefined) ? args.indexed : BoxFrameGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? {
					positions: [new Vector3(0, 0, 0)],
					dimensions: [
						{
							min: args.baseGeometry.mesh.bounding.box.global.objectspace.min,
							max: args.baseGeometry.mesh.bounding.box.global.objectspace.max
						}
					],
				} : BoxFrameGeometry.DEFAULT.BASE_GEOMETRY,
			}
		);
	}
	static createUVsAttributeLocation(uvsArrayBuffer, args = {}) {
		return super.createUVsAttributeLocation(
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "bounding box frame uvs buffer",
			}
		);
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		super.setValueUVs(
			uvsAttributeLocation,
			uvsArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "bounding box frame uvs",
			}
		);
	}
	static assembleUVs(args = {}) {
		const uvsArrayBuffer = BoundingBoxFrameGeometry.createUVsArrayBuffer(args);
		const uvsAttributeLocation = BoundingBoxFrameGeometry.createUVsAttributeLocation(uvsArrayBuffer, args);
		BoundingBoxFrameGeometry.setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args);


		return uvsAttributeLocation;
	}
	// static assembleUVs(args = {}) {
	// 	return super.assembleUVs(
	// 		{
	// 			...args,

	// 			indexed: (args.indexed !== undefined) ? args.indexed : BoxFrameGeometry.DEFAULT.INDEXED,
	// 			baseGeometry: (args.baseGeometry !== undefined) ? {
	// 				positions: [new Vector3(0, 0, 0)],
	// 				dimensions: [
	// 					{
	// 						min: args.baseGeometry.mesh.bounding.box.global.objectspace.min,
	// 						max: args.baseGeometry.mesh.bounding.box.global.objectspace.max
	// 					}
	// 				],
	// 			} : BoxFrameGeometry.DEFAULT.BASE_GEOMETRY,
	// 		}
	// 	);
	// }
};
