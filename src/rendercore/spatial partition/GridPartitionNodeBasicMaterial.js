import { SpatialPartitionNodeBasicMaterial } from "./SpatialPartitionNodeBasicMaterial.js";
import { MapT2 } from "../core/MapT2.js";
import { Color4 } from "../math/Color4.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";
import { InstructionCache } from "../core/data_layouts/InstructionCache.js";


export class GridPartitionNodeBasicMaterial extends SpatialPartitionNodeBasicMaterial {


	static DEFAULT = {
		TYPE: "GridPartitionNodeBasicMaterial",
		NAME: "",

		RESOURCE_PACK: new ResourcePack({ name: "RP - GRID PARTITION NODE BASIC MATERIAL" }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: "grid partition node basic material instruction cache" },
			[
				...SpatialPartitionNodeBasicMaterial.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),

		SHADER_PATH: "/src/rendercore/shaders/basic/",
		PROGRAM_NAME: "basic_flat",

		UNIFORMS: new MapT2({ name: "grid partition node basic material uniforms" }),
		ATTRIBUTES: new MapT2({ name: "grid partition node basic material attributes" }),

		EMISSIVE: new Color4(0.0, 0.0, 0.0, 0.0),
		DIFFUSE: new Color4(1.0, 1.0, 1.0, 0.125),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : GridPartitionNodeBasicMaterial.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : GridPartitionNodeBasicMaterial.DEFAULT.NAME,

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : GridPartitionNodeBasicMaterial.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : GridPartitionNodeBasicMaterial.DEFAULT.INSTRUCTION_CACHE.clone(),

				shaderPath: GridPartitionNodeBasicMaterial.DEFAULT.SHADER_PATH,
				programName: GridPartitionNodeBasicMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : GridPartitionNodeBasicMaterial.DEFAULT.UNIFORMS.clone(),
				attributes: (args.attributes !== undefined) ? args.attributes : GridPartitionNodeBasicMaterial.DEFAULT.ATTRIBUTES.clone(),

				emissive: (args.emissive !== undefined) ? args.emissive : GridPartitionNodeBasicMaterial.DEFAULT.EMISSIVE.clone(),
				diffuse: (args.diffuse !== undefined) ? args.diffuse : GridPartitionNodeBasicMaterial.DEFAULT.DIFFUSE.clone(),
			},
		);
	}
};
