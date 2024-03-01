import { BoxFrameBasicMaterial } from "../materials/BoxFrameBasicMaterial.js";
import { Color4 } from "../math/Color4.js";



export class SpatialPartitionBasicMaterial extends BoxFrameBasicMaterial {


	static DEFAULT = {
		TYPE: "SpatialPartitionBasicMaterial",
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

				type: (args.type !== undefined) ? args.type : SpatialPartitionBasicMaterial.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SpatialPartitionBasicMaterial.DEFAULT.NAME,

				shaderPath: SpatialPartitionBasicMaterial.DEFAULT.SHADER_PATH,
				programName: SpatialPartitionBasicMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : new Map(SpatialPartitionBasicMaterial.DEFAULT.UNIFORMS), //copy
				attributes: (args.attributes !== undefined) ? args.attributes : new Map(SpatialPartitionBasicMaterial.DEFAULT.ATTRIBUTES), //copy

				emissive: (args.emissive !== undefined) ? args.emissive : SpatialPartitionBasicMaterial.DEFAULT.EMISSIVE.clone(),
				diffuse: (args.diffuse !== undefined) ? args.diffuse : SpatialPartitionBasicMaterial.DEFAULT.DIFFUSE.clone(),
			},
		);
	}
};
