import { BoxFrameGeometry } from "../BoxFrameGeometry.js";
import { Vector3 } from "../../math/Vector3.js";
import { Cube } from "../Cube.js";


export class BoundingBoxFrameGeometry extends BoxFrameGeometry {


	static DEFAULT = {
		TYPE: "BoundingBoxFrameGeometry",
		NAME: "",

		INDEXED: false,
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


	static assembleIndices(args = {}) {
		return super.assembleIndices(
			{
				...args,

				indexed: (args.indexed !== undefined) ? args.indexed : false,
				baseGeometry: {
					positions: [new Vector3(0, 0, 0)],
					dimensions: [
						{
							min: args.baseGeometry.mesh.bounding.box.worldspace.min,
							max: args.baseGeometry.mesh.bounding.box.worldspace.max
						}
					],
				},
			}
		);
	}
	static assembleVertices(args = {}) {
		return super.assembleVertices(
			{
				...args,

				indexed: (args.indexed !== undefined) ? args.indexed : false,
				baseGeometry: {
					positions: [new Vector3(0, 0, 0)],
					dimensions: [
						{
							min: args.baseGeometry.mesh.bounding.box.worldspace.min,
							max: args.baseGeometry.mesh.bounding.box.worldspace.max
						}
					],
				},
			}
		);
	}
	static assembleNormals(args = {}) {
		return super.assembleNormals(
			{
				...args,

				indexed: (args.indexed !== undefined) ? args.indexed : false,
				baseGeometry: {
					positions: [new Vector3(0, 0, 0)],
					dimensions: [
						{
							min: args.baseGeometry.mesh.bounding.box.worldspace.min,
							max: args.baseGeometry.mesh.bounding.box.worldspace.max
						}
					],
				},
			}
		);
	}
	static assembleUVs(args = {}) {
		return super.assembleUVs(
			{
				...args,

				indexed: (args.indexed !== undefined) ? args.indexed : false,
				baseGeometry: {
					positions: [new Vector3(0, 0, 0)],
					dimensions: [
						{
							min: args.baseGeometry.mesh.bounding.box.worldspace.min,
							max: args.baseGeometry.mesh.bounding.box.worldspace.max
						}
					],
				},
			}
		);
	}
};
