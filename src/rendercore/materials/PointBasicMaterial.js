import { MeshBasicMaterial } from "./MeshBasicMaterial.js";
import { Color4 } from "../math/Color4.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";


export class PointBasicMaterial extends MeshBasicMaterial {
	
	
	static DEFAULT = {
		TYPE: "PointBasicMaterial",
		NAME: "",

		RESOURCE_PACK: new ResourcePack({ name: "RP - POINT BASIC MATERIAL" }),

		SHADER_PATH: "/src/rendercore/shaders/basic/",
		PROGRAM_NAME: "basic_flat",

		EMISSIVE: new Color4(0, 0, 0, 0),
		DIFFUSE: new Color4(Math.random(), Math.random(), Math.random(), Math.random()),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : PointBasicMaterial.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : PointBasicMaterial.DEFAULT.NAME,

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : PointBasicMaterial.DEFAULT.RESOURCE_PACK.clone(),

				shaderPath: PointBasicMaterial.DEFAULT.SHADER_PATH,
				programName: PointBasicMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : new Map(),
				attributes: (args.attributes !== undefined) ? args.attributes : new Map(),

				emissive: (args.emissive !== undefined) ? args.emissive : PointBasicMaterial.DEFAULT.EMISSIVE.clone(),
				diffuse: (args.diffuse !== undefined) ? args.diffuse : PointBasicMaterial.DEFAULT.DIFFUSE.clone(),
			},
		);
	}
};
