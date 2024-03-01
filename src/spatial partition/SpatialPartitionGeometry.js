import { BoxFrameGeometry } from "../objects/BoxFrameGeometry.js";
import { Vector3 } from "../math/Vector3.js";


export class SpatialPartitionGeometry extends BoxFrameGeometry {


	static DEFAULT = {
		TYPE: "SpatialPartitionGeometry",
		NAME: "",

		INDEXED: false,
		BASE_GEOMETRY: {
			positions: [new Vector3(0, 0, 0)],
			dimensions: [{ min: new Vector3(-10, -10, -10), max: new Vector3(+10, +10, +10)}],
		},
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : SpatialPartitionGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SpatialPartitionGeometry.DEFAULT.NAME,

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
};
