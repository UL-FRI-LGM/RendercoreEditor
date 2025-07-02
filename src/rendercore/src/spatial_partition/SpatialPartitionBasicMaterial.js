import { BoxFrameBasicMaterial } from "../materials/BoxFrameBasicMaterial.js";
import { MapT2 } from "../core/MapT2.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";
import { Color4 } from "../math/Color4.js";
import { InstructionCache } from "../core/data_layouts/InstructionCache.js";


export class SpatialPartitionBasicMaterial extends BoxFrameBasicMaterial {


	static DEFAULT = {
		TYPE: "SpatialPartitionBasicMaterial",
		NAME: "",

		RESOURCE_PACK: new ResourcePack({ name: "RP - SPATIAL PARTITION BASIC MATERIAL" }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: "IC - SPATIAL PARTITION BASIC MATERIAL" },
			[
				...BoxFrameBasicMaterial.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),

		SHADER_PATH: "/src/rendercore/src/shaders/basic/",
		PROGRAM_NAME: "basic_smooth",

		UNIFORMS: new MapT2({ name: "spatial partition basic material uniforms" }),
		ATTRIBUTES: new MapT2({ name: "spatial partition basic material attributes" }),

		EMISSIVE: new Color4(0.0, 0.0, 0.0, 0.0),
		DIFFUSE: new Color4(1.0, 1.0, 1.0, 0.125),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : SpatialPartitionBasicMaterial.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SpatialPartitionBasicMaterial.DEFAULT.NAME,

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : SpatialPartitionBasicMaterial.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : SpatialPartitionBasicMaterial.DEFAULT.INSTRUCTION_CACHE.clone(),

				shaderPath: (args.shaderPath !== undefined) ? args.shaderPath : SpatialPartitionBasicMaterial.DEFAULT.SHADER_PATH,
				programName: (args.programName !== undefined) ? args.programName : SpatialPartitionBasicMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : SpatialPartitionBasicMaterial.DEFAULT.UNIFORMS.clone(),
				attributes: (args.attributes !== undefined) ? args.attributes : SpatialPartitionBasicMaterial.DEFAULT.ATTRIBUTES.clone(),

				emissive: (args.emissive !== undefined) ? args.emissive : SpatialPartitionBasicMaterial.DEFAULT.EMISSIVE.clone(),
				diffuse: (args.diffuse !== undefined) ? args.diffuse : SpatialPartitionBasicMaterial.DEFAULT.DIFFUSE.clone(),
			},
		);
	}
};
