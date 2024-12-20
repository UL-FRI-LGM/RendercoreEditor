import { MeshBasicMaterial } from "./MeshBasicMaterial.js";
import { Color4 } from "../math/Color4.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";


export class BoxFrameBasicMaterial extends MeshBasicMaterial {

	
	static DEFAULT = {
		TYPE: "BoxFrameBasicMaterial",
		NAME: "",

		RESOURCE_PACK: new ResourcePack({ name: "RP - BOX FRAME BASIC MATERIAL" }),

		SHADER_PATH: "/src/rendercore/shaders/basic/",
		PROGRAM_NAME: "basic_flat",

		UNIFORMS: new Map(),
		ATTRIBUTES: new Map(),

		EMISSIVE: new Color4(0, 0, 0, 0),
		DIFFUSE: new Color4(Math.random(), Math.random(), Math.random(), Math.random()),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : BoxFrameBasicMaterial.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : BoxFrameBasicMaterial.DEFAULT.NAME,

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : BoxFrameBasicMaterial.DEFAULT.RESOURCE_PACK.clone(),

				shaderPath: BoxFrameBasicMaterial.DEFAULT.SHADER_PATH,
				programName: BoxFrameBasicMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : new Map(BoxFrameBasicMaterial.DEFAULT.UNIFORMS), //copy
				attributes: (args.attributes !== undefined) ? args.attributes : new Map(BoxFrameBasicMaterial.DEFAULT.ATTRIBUTES), //copy

				emissive: (args.emissive !== undefined) ? args.emissive : BoxFrameBasicMaterial.DEFAULT.EMISSIVE.clone(),
				diffuse: (args.diffuse !== undefined) ? args.diffuse : BoxFrameBasicMaterial.DEFAULT.DIFFUSE.clone(),
			},
		);
	}
};
