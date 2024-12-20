import { BufferSetInstruction } from "../core/data_layouts/BufferSetInstruction.js";
import { ResourceBinding } from "../core/data_layouts/ResourceBinding.js";
import { Color3 } from "../math/Color3.js";
import { Color4 } from "../math/Color4.js";
import { Vector3 } from "../math/Vector3.js";
import { Vector4 } from "../math/Vector4.js";
import { PointLight } from "./PointLight.js";
import { InstructionCache } from "../core/data_layouts/InstructionCache.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";
import { MapT2 } from "../core/MapT2.js";
import { Source } from "../core/data_layouts/Source.js";
import { Float32ArrayT2 } from "../core/Float32ArrayT2.js";
import { Layout } from "../core/data_layouts/Layout.js";
import { Destination } from "../core/data_layouts/Destination.js";


export class SpotLight extends PointLight {


	static DEFAULT = {
		NAME: "",
		TYPE: "SpotLight",

		FRUSTUM_CULLED: false,

		RESOURCE_PACK: new ResourcePack({ name: "RP - SPOT LIGHT" }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: "IC - SPOT LIGHT" },
			[
				...PointLight.DEFAULT.INSTRUCTION_CACHE.clone(),

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
				],
				[
					"INNER_CUTOFF",
					new BufferSetInstruction(
						{
							label: "INNER_CUTOFF",

							number: 10,
							target: ResourceBinding.TARGET.INTERNAL,

							source: new Source(
								{
									arrayBuffer: new Float32ArrayT2({}, 1),
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
											offset: (4*4 + 0),
										}
									)
								}
							),
							size: (1)
						}
					)
				],
				[
					"OUTER_CUTOFF",
					new BufferSetInstruction(
						{
							label: "OUTER_CUTOFF",

							number: 10,
							target: ResourceBinding.TARGET.INTERNAL,

							source: new Source(
								{
									arrayBuffer: new Float32ArrayT2({}, 1),
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
											offset: (4*4 + 1),
										}
									)
								}
							),
							size: (1)
						}
					)
				]
			]
		),
		DIRTY_CACHE: new MapT2(
			{ name: "DC - SPOT LIGHT" },
			[
				...PointLight.DEFAULT.DIRTY_CACHE.clone(),
			]
		),

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

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : SpotLight.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : SpotLight.DEFAULT.INSTRUCTION_CACHE.clone(),
				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : SpotLight.DEFAULT.DIRTY_CACHE.clone(),

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
	set direction(direction) {
		this.#direction.copy(direction);


		const instruction = this.instructionCache.get("DIRECTION");
		instruction.source.arrayBuffer.set(this.direction.toArray());

		this.dirtyCache.set("DIRECTION", instruction);
	}

    get innerCutoff() { return this.#innerCutoff; }
    set innerCutoff(innerCutoff) {
		this.#innerCutoff = innerCutoff;


		const instruction = this.instructionCache.get("INNER_CUTOFF");
		instruction.source.arrayBuffer.set(this.direction.toArray());

		this.dirtyCache.set("INNER_CUTOFF", instruction);
	}
    get outerCutoff() { return this.#outerCutoff; }
    set outerCutoff(outerCutoff) {
		this.#outerCutoff = outerCutoff;


		const instruction = this.instructionCache.get("OUTER_CUTOFF");
		instruction.source.arrayBuffer.set(this.direction.toArray());

		this.dirtyCache.set("OUTER_CUTOFF", instruction);
	}
};