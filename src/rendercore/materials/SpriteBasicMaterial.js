import { MeshBasicMaterial } from "./MeshBasicMaterial.js";
import { Color4 } from "../math/Color4.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";


export class SpriteBasicMaterial extends MeshBasicMaterial {


	static DEFAULT = {
		TYPE: "SpriteBasicMaterial",
		NAME: "",

		RESOURCE_PACK: new ResourcePack({ name: "RP - SPRITE BASIC MATERIAL" }),

		SHADER_PATH: "/src/rendercore/shaders/basic/sprite/",
		PROGRAM_NAME: "basic_sprite_smooth",

		EMISSIVE: new Color4(0, 0, 0, 0),
		DIFFUSE: new Color4(Math.random(), Math.random(), Math.random(), Math.random()),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : SpriteBasicMaterial.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SpriteBasicMaterial.DEFAULT.NAME,

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : SpriteBasicMaterial.DEFAULT.RESOURCE_PACK.clone(),

				shaderPath: SpriteBasicMaterial.DEFAULT.SHADER_PATH,
				programName: SpriteBasicMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : new Map(),
				attributes: (args.attributes !== undefined) ? args.attributes : new Map(),

				emissive: (args.emissive !== undefined) ? args.emissive : SpriteBasicMaterial.DEFAULT.EMISSIVE.clone(),
				diffuse: (args.diffuse !== undefined) ? args.diffuse : SpriteBasicMaterial.DEFAULT.DIFFUSE.clone(),
			},
		);
	}
};
