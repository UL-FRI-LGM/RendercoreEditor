import { MeshBasicMaterial } from "./MeshBasicMaterial.js";
import { Color4 } from "../math/Color4.js";


export class SphereFrameBasicMaterial extends MeshBasicMaterial {

	
	static DEFAULT = {
		TYPE: "SphereFrameBasicMaterial",
		NAME: "",

		SHADER_PATH: "/src/shaders/basic/",
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

				type: (args.type !== undefined) ? args.type : SphereFrameBasicMaterial.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SphereFrameBasicMaterial.DEFAULT.NAME,

				shaderPath: SphereFrameBasicMaterial.DEFAULT.SHADER_PATH,
				programName: SphereFrameBasicMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : new Map(SphereFrameBasicMaterial.DEFAULT.UNIFORMS), //copy
				attributes: (args.attributes !== undefined) ? args.attributes : new Map(SphereFrameBasicMaterial.DEFAULT.ATTRIBUTES), //copy

				emissive: (args.emissive !== undefined) ? args.emissive : SphereFrameBasicMaterial.DEFAULT.EMISSIVE.clone(),
				diffuse: (args.diffuse !== undefined) ? args.diffuse : SphereFrameBasicMaterial.DEFAULT.DIFFUSE.clone(),
			},
		);
	}
};
