import { SpatialPartitionNodeBasicMaterial } from "./SpatialPartitionNodeBasicMaterial.js";
import { MapT2 } from "../core/MapT2.js";
import { Color4 } from "../math/Color4.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";
import { InstructionCache } from "../core/data_layouts/InstructionCache.js";


export class CellPartitionNodeBasicMaterial extends SpatialPartitionNodeBasicMaterial {


	static DEFAULT = {
		TYPE: "CellPartitionNodeBasicMaterial",
		NAME: "",

		RESOURCE_PACK: new ResourcePack({ name: "RP - CELL PARTITION NODE BASIC MATERIAL" }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: "IC - CELL PARTITION NODE BASIC MATERIAL" },
			[
				...SpatialPartitionNodeBasicMaterial.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),

		SHADER_PATH: "/src/rendercore/src/shaders/basic/",
		PROGRAM_NAME: "basic_smooth",

		UNIFORMS: new MapT2({ name: "cell partition node basic material uniforms" }),
		ATTRIBUTES: new MapT2({ name: "cell partition node basic material attributes" }),

		EMISSIVE: new Color4(0.0, 0.0, 0.0, 0.0),
		DIFFUSE: new Color4(1.0, 1.0, 1.0, 0.125),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : CellPartitionNodeBasicMaterial.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : CellPartitionNodeBasicMaterial.DEFAULT.NAME,

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : CellPartitionNodeBasicMaterial.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : CellPartitionNodeBasicMaterial.DEFAULT.INSTRUCTION_CACHE.clone(),

				shaderPath: (args.shaderPath !== undefined) ? args.shaderPath : CellPartitionNodeBasicMaterial.DEFAULT.SHADER_PATH,
				programName: (args.programName !== undefined) ? args.programName : CellPartitionNodeBasicMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : CellPartitionNodeBasicMaterial.DEFAULT.UNIFORMS.clone(),
				attributes: (args.attributes !== undefined) ? args.attributes : CellPartitionNodeBasicMaterial.DEFAULT.ATTRIBUTES.clone(),

				emissive: (args.emissive !== undefined) ? args.emissive : CellPartitionNodeBasicMaterial.DEFAULT.EMISSIVE.clone(),
				diffuse: (args.diffuse !== undefined) ? args.diffuse : CellPartitionNodeBasicMaterial.DEFAULT.DIFFUSE.clone(),
			},
		);
	}
};
