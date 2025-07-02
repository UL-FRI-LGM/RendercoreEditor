import { Group } from "../objects/group/Group.js";
import { ResourceBinding } from "../core/data_layouts/ResourceBinding.js";
import { Color3 } from "../math/Color3.js";
import { Color4 } from "../math/Color4.js";
import { BufferSetInstruction } from "../core/data_layouts/BufferSetInstruction.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";
import { InstructionCache } from "../core/data_layouts/InstructionCache.js";
import { MapT2 } from "../core/MapT2.js";
import { Source } from "../core/data_layouts/Source.js";
import { Float32ArrayT2 } from "../core/Float32ArrayT2.js";
import { Layout } from "../core/data_layouts/Layout.js";
import { Destination } from "../core/data_layouts/Destination.js";


export class Light extends Group {


	static DEFAULT = {
		NAME: "",
		TYPE: "Light",

		VISIBLE: true,
		FRUSTUM_CULLED: false,

		RESOURCE_PACK: new ResourcePack({ name: "RP - LIGHT" }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: "IC - LIGHT" },
			[
				...Group.DEFAULT.INSTRUCTION_CACHE.clone(),

				[
					"COLOR_INTENSITY",
					new BufferSetInstruction(
						{
							label: "COLOR_INTENSITY",

							number: 10,
							target: ResourceBinding.TARGET.INTERNAL,

							source: new Source(
								{
									arrayBuffer: new Float32ArrayT2({}, 4),
									layout: new Layout(
										{
											offset: (0),
										}
									)
								}
							),
							destination: new Destination(
								{
									buffer: null,
									layout: new Layout(
										{
											offset: (2*4),
										}
									)
								}
							),
							size: (4)
						}
					)
				],
				[
					"POSITION",
					new BufferSetInstruction(
						{
							label: "POSITION",
		
							number: 10,
							target: ResourceBinding.TARGET.INTERNAL,
		
							source: new Source(
								{
									arrayBuffer: new Float32ArrayT2({}, 3),
									layout: new Layout(
										{
											offset: (0),
										}
									)
								}
							),
							destination: new Destination(
								{
									buffer: null,
									layout: new Layout(
										{
											offset: (0*4),
										}
									)
								}
							),
							size: (3)
						}
					)
				]
			]
		),
		DIRTY_CACHE: new MapT2(
			{ name: "DC - LIGHT" },
			[
				...Group.DEFAULT.DIRTY_CACHE.clone(),
			]
		),

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

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : Light.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : Light.DEFAULT.INSTRUCTION_CACHE.clone(),
				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : Light.DEFAULT.DIRTY_CACHE.clone(),
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


		const instruction = this.instructionCache.get("COLOR_INTENSITY");
		instruction.source.arrayBuffer.set(this.colorIntensity.arrayBuffer);

		// this.resourcePack.setResourceBindingValueInternal(1, 0, instruction);
		this.dirtyCache.set("COLOR_INTENSITY", instruction);
	}
	get color() { return this.#color; }
	set color(color) {
		this.#colorIntensity.r = color.r;
		this.#colorIntensity.g = color.g;
		this.#colorIntensity.b = color.b;
		this.#color.copy(color);


		const instruction = this.instructionCache.get("COLOR_INTENSITY");
		instruction.source.arrayBuffer.set(this.colorIntensity.arrayBuffer);

		this.dirtyCache.set("COLOR_INTENSITY", instruction);
	}
	get intensity() { return this.#intensity; }
	set intensity(intensity) {
		this.#colorIntensity.a = intensity;
		this.#intensity = intensity;


		const instruction = this.instructionCache.get("COLOR_INTENSITY");
		instruction.source.arrayBuffer.set(this.colorIntensity.arrayBuffer);

		this.dirtyCache.set("COLOR_INTENSITY", instruction);
	}

	get position() { return super.position; }
	set position(position) {
		super.position = position;


		const instruction = this.instructionCache.get("POSITION");
		instruction.source.arrayBuffer.set(this.position.toArray());

		this.dirtyCache.set("POSITION", instruction);
	}
};