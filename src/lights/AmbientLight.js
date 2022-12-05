import { Color3 } from "../math/Color3.js";
import { Color4 } from "../math/Color4.js";
import { Light } from "./Light.js";


export class AmbientLight extends Light {
	static DEFAULT = {
		NAME: "",
		TYPE: "AmbientLight",

		FRUSTUM_CULLED: false,

		COLOR_INTENSITY: new Color4(1.0, 1.0, 1.0, 0.1),
		COLOR: new Color3(1.0, 1.0, 1.0),
		INTENSITY: 0.1,
	};


	constructor (args = {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : AmbientLight.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : AmbientLight.DEFAULT.TYPE,

				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : AmbientLight.DEFAULT.FRUSTUM_CULLED,

				colorIntensity: (args.colorIntensity !== undefined) ? args.colorIntensity : AmbientLight.DEFAULT.COLOR_INTENSITY,
				// color: (args.color !== undefined) ? args.color : AmbientLight.DEFAULT.COLOR,
				// intensity: (args.intensity !== undefined) ? args.intensity : AmbientLight.DEFAULT.INTENSITY,
			}
		);
	}
};