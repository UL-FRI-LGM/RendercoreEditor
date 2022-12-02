import { Object3D } from "../core/Object3D.js";
import { Color3 } from "../math/Color3.js";
import { Color4 } from "../math/Color4.js";
import { Vector3 } from "../math/Vector3.js";
import { Vector4 } from "../math/Vector4.js";


export class Light extends Object3D {
	static DEFAULT = {
		NAME: "",
		TYPE: "Light",

		COLOR_INTENSITY: new Color4(1.0, 1.0, 1.0, 1.0),
		COLOR: new Color3(1.0, 1.0, 1.0),
		INTENSITY: 1.0,

		DECAY_DISTANCE: new Vector4(1.0, 0.01, 0.0001, 0.0),
		DECAY: new Vector3(1.0, 0.01, 0.0001),
		DISTANCE: 0.0,

		FRUSTUM_CULLED: false,
	};


	#colorIntensity = Light.DEFAULT.COLOR_INTENSITY;
	#color = Light.DEFAULT.COLOR;
	#intensity = Light.DEFAULT.INTENSITY;

	#decayDistance = Light.DEFAULT.DECAY_DISTANCE;
	#decay = Light.DEFAULT.DECAY;
	#distance = Light.DEFAULT.DISTANCE;


	constructor(args = {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : Light.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Light.DEFAULT.TYPE,

				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : Light.DEFAULT.FRUSTUM_CULLED,
			}
		);

		this.colorIntensity = (args.colorIntensity !== undefined) ? args.colorIntensity : Light.DEFAULT.COLOR_INTENSITY; 
		this.color = (args.color !== undefined) ? args.color : Light.DEFAULT.COLOR;
		this.intensity  = (args.intensity !== undefined) ? args.intensity : Light.DEFAULT.INTENSITY;

		this.decayDistance = (args.decayDistance !== undefined) ? args.decayDistance : Light.DEFAULT.DECAY_DISTANCE;
		this.decay = (args.decay !== undefined) ? args.decay : Light.DEFAULT.DECAY;
		this.distance = (args.distance !== undefined) ? args.distance : Light.DEFAULT.DISTANCE;
	}


	get colorIntensity() { return this.#colorIntensity; }
	set colorIntensity(colorIntensity) { 
		this.#colorIntensity = colorIntensity;
		this.#color.r = colorIntensity.r;
		this.#color.g = colorIntensity.g;
		this.#color.b = colorIntensity.b;
		this.#intensity = colorIntensity.a;
	}
	get color() { return this.#color; }
	set color(color) {
		this.#colorIntensity.r = color.r;
		this.#colorIntensity.g = color.g;
		this.#colorIntensity.b = color.b;
		this.#color = color;
	}
	get intensity() { return this.#intensity; }
	set intensity(intensity) {
		this.#colorIntensity.a = intensity;
		this.#intensity = intensity;
	}

	get decayDistance() { return this.#decayDistance; }
	set decayDistance(decayDistance) {
		this.#decayDistance = decayDistance;
		this.#decay.x = decayDistance.x;
		this.#decay.y = decayDistance.y;
		this.#decay.z = decayDistance.z;
		this.#distance = decayDistance.w;
	}
	get decay() { return this.#decay; }
	set decay(decay) {
		this.#decayDistance.x = decay.x;
		this.#decayDistance.y = decay.y;
		this.#decayDistance.z = decay.z;
		this.#decay = decay;
	}
	get distance() { return this.#distance; }
	set distance(distance) { 
		this.#decayDistance.w = distance;
		this.#distance = distance;
	}
	// get constant() { return this.#decay.x; }
	// set constant(constant) { 
	// 	this.#decayDistance.x = constant;
	// 	this.#decay.x = constant;
	// }
	// get linear() { return this.#decay.y; }
	// set linear(linear) { 
	// 	this.#decayDistance.y = linear;
	// 	this.#decay.y = linear;
	// }
	// get quadratic() { return this.#decay.z; }
	// set quadratic(quadratic) { 
	// 	this.#decayDistance.z = quadratic;
	// 	this.#decay.z = quadratic;
	// }
};