import { BufferSetInstruction } from "../core/data layouts/BufferSetInstruction.js";
import { ResourceBinding } from "../core/data layouts/ResourceBinding.js";
import { Color3 } from "../math/Color3.js";
import { Color4 } from "../math/Color4.js";
import { Vector3 } from "../math/Vector3.js";
import { Vector4 } from "../math/Vector4.js";
import { Light } from "./Light.js";


export class PointLight extends Light {


	static DEFAULT = {
		NAME: "",
		TYPE: "PointLight",

		FRUSTUM_CULLED: false,

		COLOR_INTENSITY: new Color4(1.0, 1.0, 1.0, 1.0),
		COLOR: new Color3(1.0, 1.0, 1.0),
		INTENSITY: 1.0,

		DECAY_DISTANCE: new Vector4(1.0, 0.01, 0.0001, 0.0),
		DECAY: new Vector3(1.0, 0.01, 0.0001),
		DISTANCE: 0.0,
	};


	#decayDistance = PointLight.DEFAULT.DECAY_DISTANCE.clone();
	#decay = PointLight.DEFAULT.DECAY.clone();
	#distance = PointLight.DEFAULT.DISTANCE;
	

	constructor (args = {}) {
		super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : PointLight.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : PointLight.DEFAULT.TYPE,

				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : PointLight.DEFAULT.FRUSTUM_CULLED,

				colorIntensity: (args.colorIntensity !== undefined) ? args.colorIntensity : PointLight.DEFAULT.COLOR_INTENSITY,
				// color: (args.color !== undefined) ? args.color : PointLight.DEFAULT.COLOR,
				// intensity: (args.intensity !== undefined) ? args.intensity : PointLight.DEFAULT.INTENSITY,
			}
		);

		this.decayDistance = (args.decayDistance !== undefined) ? args.decayDistance : this.decayDistance;
		this.decay = (args.decay !== undefined) ? args.decay : this.decay;
		this.distance = (args.distance !== undefined) ? args.distance : this.distance;
	}


	get position() { return super.position; }
	set position(position) {
		super.position = position;

		this.dirtyCache.set(
			"DIRECTION",
			new BufferSetInstruction(
				{
					label: "DIRECTION",

					number: 10,
					target: ResourceBinding.TARGET.INTERNAL,

					source: {
						arrayBuffer: new Float32Array(this.position.toArray()),
						layout: {
							offset: (0),
						}
					},
					destination: {
						buffer: null,
						layout: {
							offset: (0*4)
						}
					},
					size: (4)
				}
			)
		);
	}
	
	get decayDistance() { return this.#decayDistance; }
	set decayDistance(decayDistance) {
		this.#decayDistance.copy(decayDistance);
		this.#decay.x = decayDistance.x;
		this.#decay.y = decayDistance.y;
		this.#decay.z = decayDistance.z;
		this.#distance = decayDistance.w;

		this.dirtyCache.set(
			"DECAY_DISTANCE", 
			new BufferSetInstruction(
				{
					label: "DECAY_DISTANCE",

					number: 10,
					target: ResourceBinding.TARGET.INTERNAL,

					source: {
						arrayBuffer: new Float32Array(this.decayDistance.toArray()),
						layout: {
							offset: (0),
						}
					},
					destination: {
						buffer: null,
						layout: {
							offset: (3*4)
						}
					},
					size: (4)
				}
			)
		);
	}
	get decay() { return this.#decay; }
	set decay(decay) {
		this.#decayDistance.x = decay.x;
		this.#decayDistance.y = decay.y;
		this.#decayDistance.z = decay.z;
		this.#decay.copy(decay);

		this.dirtyCache.set(
			"DECAY_DISTANCE", 
			new BufferSetInstruction(
				{
					label: "DECAY_DISTANCE",

					number: 10,
					target: ResourceBinding.TARGET.INTERNAL,

					source: {
						arrayBuffer: new Float32Array(this.decayDistance.toArray()),
						layout: {
							offset: (0),
						}
					},
					destination: {
						buffer: null,
						layout: {
							offset: (3*4)
						}
					},
					size: (4)
				}
			)
		);
	}
	get distance() { return this.#distance; }
	set distance(distance) { 
		this.#decayDistance.w = distance;
		this.#distance = distance;

		this.dirtyCache.set(
			"DECAY_DISTANCE", 
			new BufferSetInstruction(
				{
					label: "DECAY_DISTANCE",

					number: 10,
					target: ResourceBinding.TARGET.INTERNAL,

					source: {
						arrayBuffer: new Float32Array(this.decayDistance.toArray()),
						layout: {
							offset: (0),
						}
					},
					destination: {
						buffer: null,
						layout: {
							offset: (3*4)
						}
					},
					size: (4)
				}
			)
		);
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