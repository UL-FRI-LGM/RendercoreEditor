import { MeshBasicMaterial } from "./MeshBasicMaterial.js";
import { Color4 } from "../math/Color4.js";


export class PointBasicMaterial extends MeshBasicMaterial {
	static DEFAULT = {
		NAME: "",
		TYPE: "PointBasicMaterial",

		SHADER_PATH: "/src/shaders/basic/",
		PROGRAM_NAME: "basic_flat",

		EMISSIVE: new Color4(0, 0, 0, 0),
		DIFFUSE: new Color4(Math.random(), Math.random(), Math.random(), Math.random()),
	};


	constructor(args = {}) {
		super(
			{
				...args,
				name: (args.name !== undefined) ? args.name : PointBasicMaterial.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : PointBasicMaterial.DEFAULT.TYPE,

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