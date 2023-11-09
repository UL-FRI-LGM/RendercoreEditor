import { MeshBasicMaterial } from "./MeshBasicMaterial.js";
import { Color4 } from "../math/Color4.js";


export class LineBasicMaterial extends MeshBasicMaterial {
	
	
	static DEFAULT = {
		TYPE: "LineBasicMaterial",
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

				type: (args.type !== undefined) ? args.type : LineBasicMaterial.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : LineBasicMaterial.DEFAULT.NAME,

				shaderPath: LineBasicMaterial.DEFAULT.SHADER_PATH,
				programName: LineBasicMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : new Map(),
				attributes: (args.attributes !== undefined) ? args.attributes : new Map(),

				emissive: (args.emissive !== undefined) ? args.emissive : LineBasicMaterial.DEFAULT.EMISSIVE.clone(),
				diffuse: (args.diffuse !== undefined) ? args.diffuse : LineBasicMaterial.DEFAULT.DIFFUSE.clone(),
			},
		);
	}
};
