import { SpatialPartitionBasicMaterial } from "./SpatialPartitionBasicMaterial.js";
import { Color4 } from "../math/Color4.js";


export class CellPartitionBasicMaterial extends SpatialPartitionBasicMaterial {


	static DEFAULT = {
		TYPE: "CellPartitionBasicMaterial",
		NAME: "",

		SHADER_PATH: "/src/shaders/basic/",
		PROGRAM_NAME: "basic_flat",

		UNIFORMS: new Map(),
		ATTRIBUTES: new Map(),

		EMISSIVE: new Color4(0, 0, 0, 0),
		DIFFUSE: new Color4(0, 0, 1, 0.125),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : CellPartitionBasicMaterial.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : CellPartitionBasicMaterial.DEFAULT.NAME,

				shaderPath: CellPartitionBasicMaterial.DEFAULT.SHADER_PATH,
				programName: CellPartitionBasicMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : new Map(CellPartitionBasicMaterial.DEFAULT.UNIFORMS), //copy
				attributes: (args.attributes !== undefined) ? args.attributes : new Map(CellPartitionBasicMaterial.DEFAULT.ATTRIBUTES), //copy

				emissive: (args.emissive !== undefined) ? args.emissive : CellPartitionBasicMaterial.DEFAULT.EMISSIVE.clone(),
				diffuse: (args.diffuse !== undefined) ? args.diffuse : CellPartitionBasicMaterial.DEFAULT.DIFFUSE.clone(),
			},
		);
	}
};
