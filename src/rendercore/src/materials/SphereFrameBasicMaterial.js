import { MeshBasicMaterial } from "./MeshBasicMaterial.js";
import { Color4 } from "../math/Color4.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";
import { InstructionCache } from "../core/data_layouts/InstructionCache.js";


export class SphereFrameBasicMaterial extends MeshBasicMaterial {

	
	static DEFAULT = {
		TYPE: "SphereFrameBasicMaterial",
		NAME: "",

		RESOURCE_PACK: new ResourcePack({ name: "RP - SPHERE FRAME BASIC MATERIAL" }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: "IC - SPHERE FRAME BASIC MATERIAL" },
			[
				...MeshBasicMaterial.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),

		SHADER_PATH: "/src/rendercore/src/shaders/basic/",
		PROGRAM_NAME: "basic_smooth",

		UNIFORMS: new Map(),
		ATTRIBUTES: new Map(),

		EMISSIVE: new Color4(0, 0, 0, 0),
		DIFFUSE: new Color4(Math.random(), Math.random(), Math.random(), Math.random()),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : SphereFrameBasicMaterial.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SphereFrameBasicMaterial.DEFAULT.NAME,

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : SphereFrameBasicMaterial.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : SphereFrameBasicMaterial.DEFAULT.INSTRUCTION_CACHE.clone(),

				shaderPath: (args.shaderPath !== undefined) ? args.shaderPath : SphereFrameBasicMaterial.DEFAULT.SHADER_PATH,
				programName: (args.programName !== undefined) ? args.programName : SphereFrameBasicMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : new Map(SphereFrameBasicMaterial.DEFAULT.UNIFORMS), //copy
				attributes: (args.attributes !== undefined) ? args.attributes : new Map(SphereFrameBasicMaterial.DEFAULT.ATTRIBUTES), //copy

				emissive: (args.emissive !== undefined) ? args.emissive : SphereFrameBasicMaterial.DEFAULT.EMISSIVE.clone(),
				diffuse: (args.diffuse !== undefined) ? args.diffuse : SphereFrameBasicMaterial.DEFAULT.DIFFUSE.clone(),
			},
		);
	}
};
