import { Color3 } from "../math/Color3.js";
import { Color4 } from "../math/Color4.js";
import { Vector3 } from "../math/Vector3.js";
import { Vector4 } from "../math/Vector4.js";
import { Light } from "./Light.js";


export class PointLight extends Light {
	static DEFAULT = {
		NAME: "",
		TYPE: "PointLight",

		COLOR_INTENSITY: new Color4(1.0, 1.0, 1.0, 1.0),
		COLOR: new Color3(1.0, 1.0, 1.0),
		INTENSITY: 1.0,

		FRUSTUM_CULLED: false,

		DECAY_DISTANCE: new Vector4(1.0, 0.01, 0.0001, 0.0),
		DECAY: new Vector3(1.0, 0.01, 0.0001),
		DISTANCE: 0.0,
	};


	constructor (args = {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : PointLight.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : PointLight.DEFAULT.TYPE,

				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : PointLight.DEFAULT.FRUSTUM_CULLED,

				colorIntensity: (args.colorIntensity !== undefined) ? args.colorIntensity : PointLight.DEFAULT.COLOR_INTENSITY,
				color: (args.color !== undefined) ? args.color : PointLight.DEFAULT.COLOR,
				intensity: (args.intensity !== undefined) ? args.intensity : PointLight.DEFAULT.INTENSITY,

				decayDistance: (args.decayDistance !== undefined) ? args.decayDistance : PointLight.DEFAULT.DECAY_DISTANCE,
				decay: (args.decay !== undefined) ? args.decay : PointLight.DEFAULT.DECAY,
				distance: (args.distance !== undefined) ? args.distance : PointLight.DEFAULT.DISTANCE,
			}
		);
	}
};