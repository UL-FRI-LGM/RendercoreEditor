import { SpatialPartitionBasicMaterial } from "./SpatialPartitionBasicMaterial.js";
import { MapT2 } from "../core/MapT2.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";
import { Color4 } from "../math/Color4.js";
import { InstructionCache } from "../core/data_layouts/InstructionCache.js";


export class GridPartitionBasicMaterial extends SpatialPartitionBasicMaterial {


	static DEFAULT = {
		TYPE: "GridPartitionBasicMaterial",
		NAME: "",

		RESOURCE_PACK: new ResourcePack({ name: "RP - GRID PARTITION BASIC MATERIAL" }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: "IC - GRID PARTITION BASIC MATERIAL" },
			[
				...SpatialPartitionBasicMaterial.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),

		SHADER_PATH: "/src/rendercore/src/shaders/basic/",
		PROGRAM_NAME: "basic_smooth",

		UNIFORMS: new MapT2({ name: "grid partition basic material uniforms" }),
		ATTRIBUTES: new MapT2({ name: "grid partition basic material attributes" }),

		EMISSIVE: new Color4(0.0, 0.0, 0.0, 0.0),
		DIFFUSE: new Color4(1.0, 1.0, 1.0, 0.125),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : GridPartitionBasicMaterial.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : GridPartitionBasicMaterial.DEFAULT.NAME,

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : GridPartitionBasicMaterial.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : GridPartitionBasicMaterial.DEFAULT.INSTRUCTION_CACHE.clone(),

				shaderPath: (args.shaderPath !== undefined) ? args.shaderPath : GridPartitionBasicMaterial.DEFAULT.SHADER_PATH,
				programName: (args.programName !== undefined) ? args.programName : GridPartitionBasicMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : GridPartitionBasicMaterial.DEFAULT.UNIFORMS.clone(),
				attributes: (args.attributes !== undefined) ? args.attributes : GridPartitionBasicMaterial.DEFAULT.ATTRIBUTES.clone(),

				emissive: (args.emissive !== undefined) ? args.emissive : GridPartitionBasicMaterial.DEFAULT.EMISSIVE.clone(),
				diffuse: (args.diffuse !== undefined) ? args.diffuse : GridPartitionBasicMaterial.DEFAULT.DIFFUSE.clone(),
			},
		);
	}
};
