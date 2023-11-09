import { MeshBasicMaterial } from "./MeshBasicMaterial.js";
import { Color4 } from "../math/Color4.js";


export class QuadBasicMaterial extends MeshBasicMaterial {


	static DEFAULT = {
		TYPE: "QuadBasicMaterial",
		NAME: "",

		SHADER_PATH: "/src/shaders/basic/",
		PROGRAM_NAME: "basic_flat",

		EMISSIVE: new Color4(0, 0, 0, 0),
		DIFFUSE: new Color4(Math.random(), Math.random(), Math.random(), Math.random()),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : QuadBasicMaterial.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : QuadBasicMaterial.DEFAULT.NAME,

				shaderPath: QuadBasicMaterial.DEFAULT.SHADER_PATH,
				programName: QuadBasicMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : new Map(),
				attributes: (args.attributes !== undefined) ? args.attributes : new Map(),

				emissive: (args.emissive !== undefined) ? args.emissive : QuadBasicMaterial.DEFAULT.EMISSIVE.clone(),
				diffuse: (args.diffuse !== undefined) ? args.diffuse : QuadBasicMaterial.DEFAULT.DIFFUSE.clone(),
			},
		);
	}
};
