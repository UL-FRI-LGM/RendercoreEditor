import { Color3 } from "../math/Color3.js";
import { Color4 } from "../math/Color4.js";
import { Vector3 } from "../math/Vector3.js";
import { Vector4 } from "../math/Vector4.js";
import { PointLight } from "./PointLight.js";


export class SpotLight extends PointLight {
	static DEFAULT = {
		NAME: "",
		TYPE: "SpotLight",

		FRUSTUM_CULLED: false,

		COLOR_INTENSITY: new Color4(1.0, 1.0, 1.0, 1.0),
		COLOR: new Color3(1.0, 1.0, 1.0),
		INTENSITY: 1.0,

		DECAY_DISTANCE: new Vector4(1.0, 0.01, 0.0001, 0.0),
		DECAY: new Vector3(1.0, 0.01, 0.0001),
		DISTANCE: 0.0,

		DIRECTION: new Vector3(0.0, 0.0, -1.0),

		INNER_CUTOFF: Math.PI/4.0,
		OUTER_CUTOFF: Math.PI/4.0 * 1.1,
	};


	#direction = SpotLight.DEFAULT.DIRECTION.clone();

	#innerCutoff = SpotLight.DEFAULT.INNER_CUTOFF;
	#outerCutoff = SpotLight.DEFAULT.OUTER_CUTOFF;


    constructor(args = {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : SpotLight.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : SpotLight.DEFAULT.TYPE,

				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : SpotLight.DEFAULT.FRUSTUM_CULLED,

				colorIntensity: (args.colorIntensity !== undefined) ? args.colorIntensity : SpotLight.DEFAULT.COLOR_INTENSITY,
				// color: (args.color !== undefined) ? args.color : SpotLight.DEFAULT.COLOR,
				// intensity: (args.intensity !== undefined) ? args.intensity : SpotLight.DEFAULT.INTENSITY,

				decayDistance: (args.decayDistance !== undefined) ? args.decayDistance : SpotLight.DEFAULT.DECAY_DISTANCE,
				// decay: (args.decay !== undefined) ? args.decay : SpotLight.DEFAULT.DECAY,
				// distance: (args.distance !== undefined) ? args.distance : SpotLight.DEFAULT.DISTANCE,
			}
		);

		this.direction = (args.direction !== undefined) ? args.direction : this.direction;

        this.innerCutoff = (args.innerCutoff !== undefined) ? args.innerCutoff : this.innerCutoff;
        this.outerCutoff = (args.outerCutoff !== undefined) ? args.outerCutoff : this.outerCutoff;
    }

	
	get direction() { return this.#direction; }
	set direction(direction) { this.#direction.copy(direction); }

    get innerCutoff() { return this.#innerCutoff; }
    set innerCutoff(innerCutoff) { this.#innerCutoff = innerCutoff; }
    get outerCutoff() { return this.#outerCutoff; }
    set outerCutoff(outerCutoff) { this.#outerCutoff = outerCutoff; }
};