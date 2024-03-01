import { SpatialPartitionGeometry } from "./SpatialPartitionGeometry.js";
import { Vector3 } from "../math/Vector3.js";


export class CellPartitionGeometry extends SpatialPartitionGeometry {


	static DEFAULT = {
		TYPE: "CellPartitionGeometry",
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

				type: (args.type !== undefined) ? args.type : CellPartitionGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : CellPartitionGeometry.DEFAULT.NAME,

				indexed: (args.indexed !== undefined) ? args.indexed : CellPartitionGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : CellPartitionGeometry.DEFAULT.BASE_GEOMETRY,

				indices: (args.indices !== undefined) ? args.indices : CellPartitionGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : CellPartitionGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : CellPartitionGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : CellPartitionGeometry.assembleUVs(args),
				MMats: (args.MMats !== undefined) ? args.MMats : null,
				translations: (args.translations !== undefined) ? args.translations : null,
			}
		);
	}
};
