import { SpatialPartitionBasicMaterial } from "./SpatialPartitionBasicMaterial.js";
import { Color4 } from "../math/Color4.js";


export class GridPartitionBasicMaterial extends SpatialPartitionBasicMaterial {


	static DEFAULT = {
		TYPE: "GridPartitionBasicMaterial",
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

				type: (args.type !== undefined) ? args.type : GridPartitionBasicMaterial.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : GridPartitionBasicMaterial.DEFAULT.NAME,

				shaderPath: GridPartitionBasicMaterial.DEFAULT.SHADER_PATH,
				programName: GridPartitionBasicMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : new Map(GridPartitionBasicMaterial.DEFAULT.UNIFORMS), //copy
				attributes: (args.attributes !== undefined) ? args.attributes : new Map(GridPartitionBasicMaterial.DEFAULT.ATTRIBUTES), //copy

				emissive: (args.emissive !== undefined) ? args.emissive : GridPartitionBasicMaterial.DEFAULT.EMISSIVE.clone(),
				diffuse: (args.diffuse !== undefined) ? args.diffuse : GridPartitionBasicMaterial.DEFAULT.DIFFUSE.clone(),
			},
		);
	}
};
