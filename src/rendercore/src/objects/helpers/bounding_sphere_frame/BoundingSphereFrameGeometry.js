import { SphereFrameGeometry } from "../../sphere_frame/SphereFrameGeometry.js";
import { Vector3 } from "../../../math/Vector3.js";
import { BoundingSphereFrameBaseGeometry } from "./BoundingSphereFrameBaseGeometry.js";


export class BoundingSphereFrameGeometry extends SphereFrameGeometry {


	static DEFAULT = {
		TYPE: "BoundingSphereFrameGeometry",
		NAME: "",

		INDEXED: false,
		BASE_GEOMETRY: new BoundingSphereFrameBaseGeometry(),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : BoundingSphereFrameGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : BoundingSphereFrameGeometry.DEFAULT.NAME,

				indexed: (args.indexed !== undefined) ? args.indexed : BoundingSphereFrameGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : BoundingSphereFrameGeometry.DEFAULT.BASE_GEOMETRY.clone(),

				indices: (args.indices !== undefined) ? args.indices : BoundingSphereFrameGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : BoundingSphereFrameGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : BoundingSphereFrameGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : BoundingSphereFrameGeometry.assembleUVs(args),
				MMats: (args.MMats !== undefined) ? args.MMats : null,
				translations: (args.translations !== undefined) ? args.translations : null,
			}
		);
	}


	static #args(args = {}) {
		return {
			...args,

			indexed: (args.indexed !== undefined) ? args.indexed : (console.warn("ARGS: DEFAULT"), BoundingSphereFrameGeometry.DEFAULT.INDEXED),
			baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : (console.warn("ARGS: DEFAULT"), BoundingSphereFrameGeometry.DEFAULT.BASE_GEOMETRY.clone()),
		};
	}

	static createIndicesArrayBuffer(args = {}) {
		return SphereFrameGeometry.createIndicesArrayBuffer(BoundingSphereFrameGeometry.#args(args));
	}
	static createIndicesAttributeLocation(indicesArrayBuffer, args = {}) {
		return super.createIndicesAttributeLocation(
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "bounding sphere frame indices buffer",
			}
		);
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		super.setValueIndices(
			indicesAttributeLocation,
			indicesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "bounding sphere frame indices",
			}
		);
	}
	static assembleIndices(args = {}) {
		const indicesArrayBuffer = BoundingSphereFrameGeometry.createIndicesArrayBuffer(args);
		const indicesAttributeLocation = BoundingSphereFrameGeometry.createIndicesAttributeLocation(indicesArrayBuffer, args);
		BoundingSphereFrameGeometry.setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args);


		return args.indexed ? indicesAttributeLocation : null;
	}
	// static assembleIndices(args = {}) {
	// 	return super.assembleIndices(
	// 		{
	// 			...args,

	// 			indexed: (args.indexed !== undefined) ? args.indexed : SphereFrameGeometry.DEFAULT.INDEXED,
	// 			baseGeometry: (args.baseGeometry !== undefined) ? {
	// 				positions: [new Vector3(0, 0, 0)],
	// 				centers: [args.baseGeometry.mesh.bounding.sphere.global.objectspace.center],
	// 				radiuses: [args.baseGeometry.mesh.bounding.sphere.global.objectspace.radius],
	// 				nPoints: SphereFrameGeometry.DEFAULT.BASE_GEOMETRY.nPoints,
	// 			} : SphereFrameGeometry.DEFAULT.BASE_GEOMETRY,
	// 		}
	// 	);
	// }

	static createVerticesArrayBuffer(args = {}) {
		return SphereFrameGeometry.createVerticesArrayBuffer(BoundingSphereFrameGeometry.#args(args));
	}
	static createVerticesAttributeLocation(verticesArrayBuffer, args = {}) {
		return super.createVerticesAttributeLocation(
			verticesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "bounding sphere frame vertices buffer",
			}
		);
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		super.setValueVertices(
			verticesAttributeLocation,
			verticesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "bounding sphere frame vertices",
			}
		);
	}
	static assembleVertices(args = {}) {
		const verticesArrayBuffer = BoundingSphereFrameGeometry.createVerticesArrayBuffer(args);
		const verticesAttributeLocation = BoundingSphereFrameGeometry.createVerticesAttributeLocation(verticesArrayBuffer, args);
		BoundingSphereFrameGeometry.setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args);


		return verticesAttributeLocation;
	}
	// static assembleVertices(args = {}) {
	// 	return super.assembleVertices(
	// 		{
	// 			...args,

	// 			indexed: (args.indexed !== undefined) ? args.indexed : SphereFrameGeometry.DEFAULT.INDEXED,
	// 			baseGeometry: (args.baseGeometry !== undefined) ? {
	// 				positions: [new Vector3(0, 0, 0)],
	// 				centers: [args.baseGeometry.mesh.bounding.sphere.global.objectspace.center],
	// 				radiuses: [args.baseGeometry.mesh.bounding.sphere.global.objectspace.radius],
	// 				nPoints: SphereFrameGeometry.DEFAULT.BASE_GEOMETRY.nPoints,
	// 			} : SphereFrameGeometry.DEFAULT.BASE_GEOMETRY,
	// 		}
	// 	);
	// }

	static createNormalsArrayBuffer(args = {}) {
		return SphereFrameGeometry.createNormalsArrayBuffer(BoundingSphereFrameGeometry.#args(args));

	}
	static createNormalsAttributeLocation(normalsArrayBuffer, args = {}) {
		return super.createNormalsAttributeLocation(
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "bounding sphere frame normals buffer",
			}
		);
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		super.setValueNormals(
			normalsAttributeLocation,
			normalsArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "bounding sphere frame normals",
			}
		);
	}
	static assembleNormals(args = {}) {
		const normalsArrayBuffer = BoundingSphereFrameGeometry.createNormalsArrayBuffer(args);
		const normalsAttributeLocation = BoundingSphereFrameGeometry.createNormalsAttributeLocation(normalsArrayBuffer, args);
		BoundingSphereFrameGeometry.setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args);


		return normalsAttributeLocation;
	}
	// static assembleNormals(args = {}) {
	// 	return super.assembleNormals(
	// 		{
	// 			...args,

	// 			indexed: (args.indexed !== undefined) ? args.indexed : SphereFrameGeometry.DEFAULT.INDEXED,
	// 			baseGeometry: (args.baseGeometry !== undefined) ? {
	// 				positions: [new Vector3(0, 0, 0)],
	// 				centers: [args.baseGeometry.mesh.bounding.sphere.global.objectspace.center],
	// 				radiuses: [args.baseGeometry.mesh.bounding.sphere.global.objectspace.radius],
	// 				nPoints: SphereFrameGeometry.DEFAULT.BASE_GEOMETRY.nPoints,
	// 			} : SphereFrameGeometry.DEFAULT.BASE_GEOMETRY,
	// 		}
	// 	);
	// }

	static createUVsArrayBuffer(args = {}) {
		return SphereFrameGeometry.createUVsArrayBuffer(BoundingSphereFrameGeometry.#args(args));
	}
	static createUVsAttributeLocation(uvsArrayBuffer, args = {}) {
		return super.createUVsAttributeLocation(
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "bounding sphere frame uvs buffer",
			}
		);
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		super.setValueUVs(
			uvsAttributeLocation,
			uvsArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "bounding sphere frame uvs",
			}
		);
	}
	static assembleUVs(args = {}) {
		const uvsArrayBuffer = BoundingSphereFrameGeometry.createUVsArrayBuffer(args);
		const uvsAttributeLocation = BoundingSphereFrameGeometry.createUVsAttributeLocation(uvsArrayBuffer, args);
		BoundingSphereFrameGeometry.setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args);


		return uvsAttributeLocation;
	}
	// static assembleUVs(args = {}) {
	// 	return super.assembleUVs(
	// 		{
	// 			...args,

	// 			indexed: (args.indexed !== undefined) ? args.indexed : SphereFrameGeometry.DEFAULT.INDEXED,
	// 			baseGeometry: (args.baseGeometry !== undefined) ? {
	// 				positions: [new Vector3(0, 0, 0)],
	// 				centers: [args.baseGeometry.mesh.bounding.sphere.global.objectspace.center],
	// 				radiuses: [args.baseGeometry.mesh.bounding.sphere.global.objectspace.radius],
	// 				nPoints: SphereFrameGeometry.DEFAULT.BASE_GEOMETRY.nPoints,
	// 			} : SphereFrameGeometry.DEFAULT.BASE_GEOMETRY,
	// 		}
	// 	);
	// }
};
