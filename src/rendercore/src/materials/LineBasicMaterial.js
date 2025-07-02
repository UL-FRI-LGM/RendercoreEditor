import { MeshBasicMaterial } from "./MeshBasicMaterial.js";
import { Color4 } from "../math/Color4.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";
import { InstructionCache } from "../core/data_layouts/InstructionCache.js";


export class LineBasicMaterial extends MeshBasicMaterial {
	
	
	static DEFAULT = {
		TYPE: "LineBasicMaterial",
		NAME: "",

		RESOURCE_PACK: new ResourcePack({ name: "RP - LINE BASIC MATERIAL" }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: "IC - POINT BASIC MATERIAL" },
			[
				...MeshBasicMaterial.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),

		SHADER_PATH: "/src/rendercore/src/shaders/basic/",
		PROGRAM_NAME: "basic_smooth",

		EMISSIVE: new Color4(0, 0, 0, 0),
		DIFFUSE: new Color4(Math.random(), Math.random(), Math.random(), Math.random()),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : LineBasicMaterial.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : LineBasicMaterial.DEFAULT.NAME,

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : LineBasicMaterial.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : LineBasicMaterial.DEFAULT.INSTRUCTION_CACHE.clone(),

				shaderPath: (args.shaderPath !== undefined) ? args.shaderPath : LineBasicMaterial.DEFAULT.SHADER_PATH,
				programName: (args.programName !== undefined) ? args.programName : LineBasicMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : new Map(),
				attributes: (args.attributes !== undefined) ? args.attributes : new Map(),

				emissive: (args.emissive !== undefined) ? args.emissive : LineBasicMaterial.DEFAULT.EMISSIVE.clone(),
				diffuse: (args.diffuse !== undefined) ? args.diffuse : LineBasicMaterial.DEFAULT.DIFFUSE.clone(),
			},
		);
	}
};
