import { MeshBasicMaterial } from "./MeshBasicMaterial.js";
import { Color4 } from "../math/Color4.js";


export class VertexNormalBasicMaterial extends MeshBasicMaterial {
	static DEFAULT = {
		NAME: "",
		TYPE: "VertexNormalBasicMaterial",

		SHADER_PATH: "/src/shaders/basic/vn/",
		PROGRAM_NAME: "basic_vn_flat",

		EMISSIVE: new Color4(0, 0, 0, 0),
		DIFFUSE: new Color4(Math.random(), Math.random(), Math.random(), Math.random()),
	};


	constructor(args = {}) {
		super(
			{
				...args,
				name: (args.name !== undefined) ? args.name : VertexNormalBasicMaterial.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : VertexNormalBasicMaterial.DEFAULT.TYPE,

				shaderPath: VertexNormalBasicMaterial.DEFAULT.SHADER_PATH,
				programName: VertexNormalBasicMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : new Map(),
				attributes: (args.attributes !== undefined) ? args.attributes : new Map(),

				emissive: (args.emissive !== undefined) ? args.emissive : VertexNormalBasicMaterial.DEFAULT.EMISSIVE.clone(),
				diffuse: (args.diffuse !== undefined) ? args.diffuse : VertexNormalBasicMaterial.DEFAULT.DIFFUSE.clone(),
			},
		);
	}
};
