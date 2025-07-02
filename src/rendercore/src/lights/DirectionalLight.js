import { Color3 } from "../math/Color3.js";
import { Color4 } from "../math/Color4.js";
import { Vector3 } from "../math/Vector3.js";
import { Vector4 } from "../math/Vector4.js";
import { Light } from "./Light.js";
import { InstructionCache } from "../core/data_layouts/InstructionCache.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";
import { MapT2 } from "../core/MapT2.js";
import { BufferSetInstruction } from "../core/data_layouts/BufferSetInstruction.js";
import { ResourceBinding } from "../core/data_layouts/ResourceBinding.js";
import { Source } from "../core/data_layouts/Source.js";
import { Float32ArrayT2 } from "../core/Float32ArrayT2.js";
import { Layout } from "../core/data_layouts/Layout.js";
import { Destination } from "../core/data_layouts/Destination.js";


export class DirectionalLight extends Light {


	static DEFAULT = {
		NAME: "",
		TYPE: "DirectionalLight",

		COLOR_INTENSITY: new Color4(1.0, 1.0, 1.0, 1.0),
		COLOR: new Color3(1.0, 1.0, 1.0),
		INTENSITY: 1.0,

		FRUSTUM_CULLED: false,

		RESOURCE_PACK: new ResourcePack({ name: "RP - DIRECTIONAL LIGHT" }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: "IC - DIRECTIONAL LIGHT" },
			[
				...Light.DEFAULT.INSTRUCTION_CACHE.clone(),

				[
					"DIRECTION",
					new BufferSetInstruction(
						{
							label: "DIRECTION",
		
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
											offset: (1*4),
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
			{ name: "DC - DIRECTIONAL LIGHT" },
			[
				...Light.DEFAULT.DIRTY_CACHE.clone(),
			]
		),

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

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : DirectionalLight.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : DirectionalLight.DEFAULT.INSTRUCTION_CACHE.clone(),
				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : DirectionalLight.DEFAULT.DIRTY_CACHE.clone(),

				colorIntensity: (args.colorIntensity !== undefined) ? args.colorIntensity : DirectionalLight.DEFAULT.COLOR_INTENSITY,
				// color: (args.color !== undefined) ? args.color : DirectionalLight.DEFAULT.COLOR,
				// intensity: (args.intensity !== undefined) ? args.intensity : DirectionalLight.DEFAULT.INTENSITY,
			}
		);

		this.direction = (args.direction !== undefined) ? args.direction : DirectionalLight.DEFAULT.DIRECTION;
	}


	get direction() { return this.#direction; }
	set direction(direction) {
		this.#direction = direction;


		const instruction = this.instructionCache.get("DIRECTION");
		instruction.source.arrayBuffer.set(this.direction.toArray());

		this.dirtyCache.set("DIRECTION", instruction);
	}
};