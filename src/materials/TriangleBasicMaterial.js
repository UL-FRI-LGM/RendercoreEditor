import { MeshBasicMaterial } from "./MeshBasicMaterial.js";
import { Color4 } from "../math/Color4.js";


export class TriangleBasicMaterial extends MeshBasicMaterial {
	
	
	static DEFAULT = {
		TYPE: "TriangleBasicMaterial",
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

				type: (args.type !== undefined) ? args.type : TriangleBasicMaterial.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : TriangleBasicMaterial.DEFAULT.NAME,

				shaderPath: TriangleBasicMaterial.DEFAULT.SHADER_PATH,
				programName: TriangleBasicMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : new Map(),
				attributes: (args.attributes !== undefined) ? args.attributes : new Map(),

				emissive: (args.emissive !== undefined) ? args.emissive : TriangleBasicMaterial.DEFAULT.EMISSIVE.clone(),
				diffuse: (args.diffuse !== undefined) ? args.diffuse : TriangleBasicMaterial.DEFAULT.DIFFUSE.clone(),
			},
		);
	}
};
