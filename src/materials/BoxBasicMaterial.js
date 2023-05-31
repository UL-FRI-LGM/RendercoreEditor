import { MeshBasicMaterial } from "./MeshBasicMaterial.js";
import { Color4 } from "../math/Color4.js";


export class BoxBasicMaterial extends MeshBasicMaterial {

	
	static DEFAULT = {
		NAME: "",
		TYPE: "BoxBasicMaterial",

		SHADER_PATH: "/src/shaders/basic/",
		PROGRAM_NAME: "basic_flat",

		EMISSIVE: new Color4(0, 0, 0, 0),
		DIFFUSE: new Color4(Math.random(), Math.random(), Math.random(), Math.random()),
	};


	constructor(args = {}) {
		super(
			{
				...args,
				name: (args.name !== undefined) ? args.name : BoxBasicMaterial.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : BoxBasicMaterial.DEFAULT.TYPE,

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
