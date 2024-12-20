import { MeshBasicMaterial } from "./MeshBasicMaterial.js";
import { Color4 } from "../math/Color4.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";


export class BoxBasicMaterial extends MeshBasicMaterial {

	
	static DEFAULT = {
		TYPE: "BoxBasicMaterial",
		NAME: "",

		RESOURCE_PACK: new ResourcePack({ name: "RP - BOX BASIC MATERIAL" }),

		SHADER_PATH: "/src/rendercore/shaders/basic/",
		PROGRAM_NAME: "basic_flat",

		EMISSIVE: new Color4(0, 0, 0, 0),
		DIFFUSE: new Color4(Math.random(), Math.random(), Math.random(), Math.random()),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : BoxBasicMaterial.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : BoxBasicMaterial.DEFAULT.NAME,

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : BoxBasicMaterial.DEFAULT.RESOURCE_PACK.clone(),

				shaderPath: BoxBasicMaterial.DEFAULT.SHADER_PATH,
				programName: BoxBasicMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : new Map(),
				attributes: (args.attributes !== undefined) ? args.attributes : new Map(),

				emissive: (args.emissive !== undefined) ? args.emissive : BoxBasicMaterial.DEFAULT.EMISSIVE.clone(),
				diffuse: (args.diffuse !== undefined) ? args.diffuse : BoxBasicMaterial.DEFAULT.DIFFUSE.clone(),
			},
		);
	}
};
