import { Group } from "../objects/Group.js";
import { ResourceBinding } from "../core/data layouts/ResourceBinding.js";
import { Color3 } from "../math/Color3.js";
import { Color4 } from "../math/Color4.js";


export class Light extends Group {


	static DEFAULT = {
		NAME: "",
		TYPE: "Light",

		VISIBLE: true,
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

				visible: (args.visible !== undefined) ? args.visible : Light.DEFAULT.VISIBLE,
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

		this.dirtyCache.set(
			"COLOR_INTENSITY",
			{
				bindingNumber: 10,
				target: ResourceBinding.TARGET.INTERNAL,

				bufferOffset: (2*4) * 4,
				data: this.colorIntensity.arrayBuffer.buffer,
				dataOffset: 0,
				size: (4) * 4
			}
		);
	}
	get color() { return this.#color; }
	set color(color) {
		this.#colorIntensity.r = color.r;
		this.#colorIntensity.g = color.g;
		this.#colorIntensity.b = color.b;
		this.#color.copy(color);

		this.dirtyCache.set(
			"COLOR_INTENSITY",
			{
				bindingNumber: 10,
				target: ResourceBinding.TARGET.INTERNAL,

				bufferOffset: (2*4) * 4,
				data: this.colorIntensity.arrayBuffer.buffer,
				dataOffset: 0,
				size: (4) * 4
			}
		);
	}
	get intensity() { return this.#intensity; }
	set intensity(intensity) {
		this.#colorIntensity.a = intensity;
		this.#intensity = intensity;

		this.dirtyCache.set(
			"COLOR_INTENSITY",
			{
				bindingNumber: 10,
				target: ResourceBinding.TARGET.INTERNAL,

				bufferOffset: (2*4) * 4,
				data: this.colorIntensity.arrayBuffer.buffer,
				dataOffset: 0,
				size: (4) * 4
			}
		);
	}

	get position() { return super.position; }
	set position(position) {
		super.position = position;

		this.dirtyCache.set(
			"POSITION",
			{
				bindingNumber: 10,
				target: ResourceBinding.TARGET.INTERNAL,

				bufferOffset: (0*4) * 4,
				data: new Float32Array(this.position.toArray()).buffer,
				dataOffset: 0,
				size: (4) * 4
			}
		);
	}
};