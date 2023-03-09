import { Color3 } from "../math/Color3.js";
import { Color4 } from "../math/Color4.js";
import { Vector3 } from "../math/Vector3.js";
import { Vector4 } from "../math/Vector4.js";
import { Light } from "./Light.js";


export class DirectionalLight extends Light {


	static DEFAULT = {
		NAME: "",
		TYPE: "DirectionalLight",

		COLOR_INTENSITY: new Color4(1.0, 1.0, 1.0, 1.0),
		COLOR: new Color3(1.0, 1.0, 1.0),
		INTENSITY: 1.0,

		FRUSTUM_CULLED: false,

		DIRECTION: new Vector3(0.0, 0.0, -1.0),
	};


	#direction;


	constructor(args = {}) {
		super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : DirectionalLight.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : DirectionalLight.DEFAULT.TYPE,

				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : DirectionalLight.DEFAULT.FRUSTUM_CULLED,

				colorIntensity: (args.colorIntensity !== undefined) ? args.colorIntensity : DirectionalLight.DEFAULT.COLOR_INTENSITY,
				// color: (args.color !== undefined) ? args.color : DirectionalLight.DEFAULT.COLOR,
				// intensity: (args.intensity !== undefined) ? args.intensity : DirectionalLight.DEFAULT.INTENSITY,
			}
		);

		this.direction = (args.direction !== undefined) ? args.direction : DirectionalLight.DEFAULT.DIRECTION;
	}


	get direction() { return this.#direction; }
	set direction(direction) { this.#direction = direction; }
};