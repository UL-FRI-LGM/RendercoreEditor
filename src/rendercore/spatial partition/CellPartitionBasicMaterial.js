import { SpatialPartitionBasicMaterial } from "./SpatialPartitionBasicMaterial.js";
import { MapT2 } from "../core/MapT2.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";
import { Color4 } from "../math/Color4.js";
import { InstructionCache } from "../core/data_layouts/InstructionCache.js";


export class CellPartitionBasicMaterial extends SpatialPartitionBasicMaterial {


	static DEFAULT = {
		TYPE: "CellPartitionBasicMaterial",
		NAME: "",

		RESOURCE_PACK: new ResourcePack({ name: "RP - CELL PARTITION BASIC MATERIAL" }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: "cell partition basic material instruction cache" },
			[
				...SpatialPartitionBasicMaterial.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),

		SHADER_PATH: "/src/rendercore/shaders/basic/",
		PROGRAM_NAME: "basic_flat",

		UNIFORMS: new MapT2({ name: "cell partition basic material uniforms" }),
		ATTRIBUTES: new MapT2({ name: "cell partition basic material attributes" }),

		EMISSIVE: new Color4(0.0, 0.0, 0.0, 0.0),
		DIFFUSE: new Color4(1.0, 1.0, 1.0, 0.125),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : CellPartitionBasicMaterial.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : CellPartitionBasicMaterial.DEFAULT.NAME,

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : CellPartitionBasicMaterial.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : CellPartitionBasicMaterial.DEFAULT.INSTRUCTION_CACHE.clone(),

				shaderPath: CellPartitionBasicMaterial.DEFAULT.SHADER_PATH,
				programName: CellPartitionBasicMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : CellPartitionBasicMaterial.DEFAULT.UNIFORMS.clone(),
				attributes: (args.attributes !== undefined) ? args.attributes : CellPartitionBasicMaterial.DEFAULT.ATTRIBUTES.clone(),

				emissive: (args.emissive !== undefined) ? args.emissive : CellPartitionBasicMaterial.DEFAULT.EMISSIVE.clone(),
				diffuse: (args.diffuse !== undefined) ? args.diffuse : CellPartitionBasicMaterial.DEFAULT.DIFFUSE.clone(),
			},
		);
	}
};
