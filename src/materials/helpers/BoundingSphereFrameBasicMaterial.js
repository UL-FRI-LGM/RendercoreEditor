import { SphereFrameBasicMaterial } from "../SphereFrameBasicMaterial.js";
import { Color4 } from "../../math/Color4.js";


export class BoundingSphereFrameBasicMaterial extends SphereFrameBasicMaterial {

	
	static DEFAULT = {
		TYPE: "BoundingSphereFrameBasicMaterial",
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

				type: (args.type !== undefined) ? args.type : BoundingSphereFrameBasicMaterial.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : BoundingSphereFrameBasicMaterial.DEFAULT.NAME,

				shaderPath: BoundingSphereFrameBasicMaterial.DEFAULT.SHADER_PATH,
				programName: BoundingSphereFrameBasicMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : new Map(BoundingSphereFrameBasicMaterial.DEFAULT.UNIFORMS), //copy
				attributes: (args.attributes !== undefined) ? args.attributes : new Map(BoundingSphereFrameBasicMaterial.DEFAULT.ATTRIBUTES), //copy

				emissive: (args.emissive !== undefined) ? args.emissive : BoundingSphereFrameBasicMaterial.DEFAULT.EMISSIVE.clone(),
				diffuse: (args.diffuse !== undefined) ? args.diffuse : BoundingSphereFrameBasicMaterial.DEFAULT.DIFFUSE.clone(),
			},
		);
	}
};
