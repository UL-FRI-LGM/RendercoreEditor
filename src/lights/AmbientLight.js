import { Color3 } from "../math/Color3.js";
import { Color4 } from "../math/Color4.js";
import { Vector3 } from "../math/Vector3.js";
import { Vector4 } from "../math/Vector4.js";
import { Light } from "./Light.js";


export class AmbientLight extends Light {
	static DEFAULT = {
		NAME: "",
		TYPE: "AmbientLight",

		COLOR_INTENSITY: new Color4(1.0, 1.0, 1.0, 0.1),
		COLOR: new Color3(1.0, 1.0, 1.0),
		INTENSITY: 0.1,

		FRUSTUM_CULLED: false,

		DECAY_DISTANCE: new Vector4(1.0, 0.0, 0.0, 0.0),
		DECAY: new Vector3(1.0, 0.0, 0.0),
		DISTANCE: 0.0,
	};


	constructor (args = {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : AmbientLight.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : AmbientLight.DEFAULT.TYPE,

				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : AmbientLight.DEFAULT.FRUSTUM_CULLED,

				colorIntensity: (args.colorIntensity !== undefined) ? args.colorIntensity : AmbientLight.DEFAULT.COLOR_INTENSITY,
				color: (args.color !== undefined) ? args.color : AmbientLight.DEFAULT.COLOR,
				intensity: (args.intensity !== undefined) ? args.intensity : AmbientLight.DEFAULT.INTENSITY,

				decayDistance: (args.decayDistance !== undefined) ? args.decayDistance : AmbientLight.DEFAULT.DECAY_DISTANCE,
				decay: (args.decay !== undefined) ? args.decay : AmbientLight.DEFAULT.DECAY,
				distance: (args.distance !== undefined) ? args.distance : AmbientLight.DEFAULT.DISTANCE,
			}
		);
	}
};