import { BoxFrameBasicMaterial } from "../BoxFrameBasicMaterial.js";
import { Color4 } from "../../math/Color4.js";
import { ResourcePack } from "../../core/data_layouts/ResourcePack.js";


export class BoundingBoxFrameBasicMaterial extends BoxFrameBasicMaterial {

	
	static DEFAULT = {
		TYPE: "BoundingBoxFrameBasicMaterial",
		NAME: "",

		RESOURCE_PACK: new ResourcePack({ name: "RP - BOUNDING BOX FRAME BASIC MATERIAL" }),

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

				type: (args.type !== undefined) ? args.type : BoundingBoxFrameBasicMaterial.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : BoundingBoxFrameBasicMaterial.DEFAULT.NAME,

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : BoundingBoxFrameBasicMaterial.DEFAULT.RESOURCE_PACK.clone(),

				shaderPath: BoundingBoxFrameBasicMaterial.DEFAULT.SHADER_PATH,
				programName: BoundingBoxFrameBasicMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : new Map(BoundingBoxFrameBasicMaterial.DEFAULT.UNIFORMS), //copy
				attributes: (args.attributes !== undefined) ? args.attributes : new Map(BoundingBoxFrameBasicMaterial.DEFAULT.ATTRIBUTES), //copy

				emissive: (args.emissive !== undefined) ? args.emissive : BoundingBoxFrameBasicMaterial.DEFAULT.EMISSIVE.clone(),
				diffuse: (args.diffuse !== undefined) ? args.diffuse : BoundingBoxFrameBasicMaterial.DEFAULT.DIFFUSE.clone(),
			},
		);
	}
};
