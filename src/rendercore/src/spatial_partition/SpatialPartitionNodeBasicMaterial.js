import { BoxBasicMaterial } from "../materials/BoxBasicMaterial.js";
import { MapT2 } from "../core/MapT2.js";
import { Color4 } from "../math/Color4.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";
import { InstructionCache } from "../core/data_layouts/InstructionCache.js";


export class SpatialPartitionNodeBasicMaterial extends BoxBasicMaterial {


	static DEFAULT = {
		TYPE: "SpatialPartitionNodeBasicMaterial",
		NAME: "",

		RESOURCE_PACK: new ResourcePack({ name: "RP - SPATIAL PARTITION NODE BASIC MATERIAL" }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: "IC - SPATIAL PARTITION NODE BASIC MATERIAL" },
			[
				...BoxBasicMaterial.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),

		SHADER_PATH: "/src/rendercore/src/shaders/basic/",
		PROGRAM_NAME: "basic_smooth",

		UNIFORMS: new MapT2({ name: "spatial partition node basic material uniforms" }),
		ATTRIBUTES: new MapT2({ name: "spatial partition node basic material attributes" }),

		EMISSIVE: new Color4(0.0, 0.0, 0.0, 0.0),
		DIFFUSE: new Color4(1.0, 1.0, 1.0, 0.125),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : SpatialPartitionNodeBasicMaterial.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SpatialPartitionNodeBasicMaterial.DEFAULT.NAME,

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : SpatialPartitionNodeBasicMaterial.DEFAULT.RESOURCE_PACK.clone(),

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : SpatialPartitionNodeBasicMaterial.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : SpatialPartitionNodeBasicMaterial.DEFAULT.INSTRUCTION_CACHE.clone(),

				shaderPath: (args.shaderPath !== undefined) ? args.shaderPath : SpatialPartitionNodeBasicMaterial.DEFAULT.SHADER_PATH,
				programName: (args.programName !== undefined) ? args.programName : SpatialPartitionNodeBasicMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : SpatialPartitionNodeBasicMaterial.DEFAULT.UNIFORMS.clone(),
				attributes: (args.attributes !== undefined) ? args.attributes : SpatialPartitionNodeBasicMaterial.DEFAULT.ATTRIBUTES.clone(),

				emissive: (args.emissive !== undefined) ? args.emissive : SpatialPartitionNodeBasicMaterial.DEFAULT.EMISSIVE.clone(),
				diffuse: (args.diffuse !== undefined) ? args.diffuse : SpatialPartitionNodeBasicMaterial.DEFAULT.DIFFUSE.clone(),
			},
		);
	}
};
