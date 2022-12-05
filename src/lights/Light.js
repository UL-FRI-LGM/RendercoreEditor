import { Object3D } from "../objects/Object3D.js";
import { Color3 } from "../math/Color3.js";
import { Color4 } from "../math/Color4.js";


export class Light extends Object3D {
	static DEFAULT = {
		NAME: "",
		TYPE: "Light",

		FRUSTUM_CULLED: false,

		COLOR_INTENSITY: new Color4(1.0, 1.0, 1.0, 1.0),
		COLOR: new Color3(1.0, 1.0, 1.0),
		INTENSITY: 1.0,
	};


	#colorIntensity = Light.DEFAULT.COLOR_INTENSITY.clone();
	#color = Light.DEFAULT.COLOR.clone();
	#intensity = Light.DEFAULT.INTENSITY;


	constructor(args = {}) {
		super(
			{
				...args,
				name: (args.name !== undefined) ? args.name : Light.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Light.DEFAULT.TYPE,

				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : Light.DEFAULT.FRUSTUM_CULLED,
			}
		);

		this.colorIntensity = (args.colorIntensity !== undefined) ? args.colorIntensity : this.colorIntensity;
		this.color = (args.color !== undefined) ? args.color : this.color;
		this.intensity  = (args.intensity !== undefined) ? args.intensity : this.intensity;
	}


	get colorIntensity() { return this.#colorIntensity; }
	set colorIntensity(colorIntensity) { 
		this.#colorIntensity.copy(colorIntensity);
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
		this.#color.copy(color);
	}
	get intensity() { return this.#intensity; }
	set intensity(intensity) {
		this.#colorIntensity.a = intensity;
		this.#intensity = intensity;
	}
};