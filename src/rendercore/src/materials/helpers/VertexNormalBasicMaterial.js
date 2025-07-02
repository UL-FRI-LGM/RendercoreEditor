import { MeshBasicMaterial } from "../MeshBasicMaterial.js";
import { Color4 } from "../../math/Color4.js";
import { ResourcePack } from "../../core/data_layouts/ResourcePack.js";


export class VertexNormalBasicMaterial extends MeshBasicMaterial {


	static DEFAULT = {
		TYPE: "VertexNormalBasicMaterial",
		NAME: "",

		RESOURCE_PACK: new ResourcePack({ name: "RP - VERTEX NORMAL BASIC MATERIAL" }),

		SHADER_PATH: "/src/rendercore/src/shaders/basic/vn/",
		PROGRAM_NAME: "basic_vn_flat",

		EMISSIVE: new Color4(0, 0, 0, 0),
		DIFFUSE: new Color4(Math.random(), Math.random(), Math.random(), Math.random()),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : VertexNormalBasicMaterial.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : VertexNormalBasicMaterial.DEFAULT.NAME,

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : VertexNormalBasicMaterial.DEFAULT.RESOURCE_PACK.clone(),

				shaderPath: (args.shaderPath !== undefined) ? args.shaderPath : VertexNormalBasicMaterial.DEFAULT.SHADER_PATH,
				programName: (args.programName !== undefined) ? args.programName : VertexNormalBasicMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : new Map(),
				attributes: (args.attributes !== undefined) ? args.attributes : new Map(),

				emissive: (args.emissive !== undefined) ? args.emissive : VertexNormalBasicMaterial.DEFAULT.EMISSIVE.clone(),
				diffuse: (args.diffuse !== undefined) ? args.diffuse : VertexNormalBasicMaterial.DEFAULT.DIFFUSE.clone(),
			},
		);
	}
};
