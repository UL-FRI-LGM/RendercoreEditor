import { BufferSetInstruction } from "../core/data_layouts/BufferSetInstruction.js";
import { ResourceBinding } from "../core/data_layouts/ResourceBinding.js";
import { Color3 } from "../math/Color3.js";
import { Color4 } from "../math/Color4.js";
import { Vector3 } from "../math/Vector3.js";
import { Vector4 } from "../math/Vector4.js";
import { Light } from "./Light.js";
import { InstructionCache } from "../core/data_layouts/InstructionCache.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";
import { MapT2 } from "../core/MapT2.js";
import { Source } from "../core/data_layouts/Source.js";
import { Float32ArrayT2 } from "../core/Float32ArrayT2.js";
import { Layout } from "../core/data_layouts/Layout.js";
import { Destination } from "../core/data_layouts/Destination.js";


export class PointLight extends Light {


	static DEFAULT = {
		NAME: "",
		TYPE: "PointLight",

		FRUSTUM_CULLED: false,

		RESOURCE_PACK: new ResourcePack({ name: "RP - POINT LIGHT" }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: "IC - POINT LIGHT" },
			[
				...Light.DEFAULT.INSTRUCTION_CACHE.clone(),

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
				],
				[
					"DECAY_DISTANCE", 
					new BufferSetInstruction(
						{
							label: "DECAY_DISTANCE",

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
											offset: (3*4),
										}
									)
								}
							),
							size: (4)
						}
					)
				]
			]
		),
		DIRTY_CACHE: new MapT2(
			{ name: "DC - POINT LIGHT" },
			[
				...Light.DEFAULT.DIRTY_CACHE.clone(),
			]
		),

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

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : PointLight.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : PointLight.DEFAULT.INSTRUCTION_CACHE.clone(),
				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : PointLight.DEFAULT.DIRTY_CACHE.clone(),

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


		const instruction = this.instructionCache.get("POSITION");
		instruction.source.arrayBuffer.set(this.position.toArray());

		this.dirtyCache.set("POSITION", instruction);
	}
	
	get decayDistance() { return this.#decayDistance; }
	set decayDistance(decayDistance) {
		this.#decayDistance.copy(decayDistance);
		this.#decay.x = decayDistance.x;
		this.#decay.y = decayDistance.y;
		this.#decay.z = decayDistance.z;
		this.#distance = decayDistance.w;


		const instruction = this.instructionCache.get("DECAY_DISTANCE");
		instruction.source.arrayBuffer.set(this.decayDistance.toArray());

		this.dirtyCache.set("DECAY_DISTANCE", instruction);
	}
	get decay() { return this.#decay; }
	set decay(decay) {
		this.#decayDistance.x = decay.x;
		this.#decayDistance.y = decay.y;
		this.#decayDistance.z = decay.z;
		this.#decay.copy(decay);


		const instruction = this.instructionCache.get("DECAY_DISTANCE");
		instruction.source.arrayBuffer.set(this.decayDistance.toArray());

		this.dirtyCache.set("DECAY_DISTANCE", instruction);
	}
	get distance() { return this.#distance; }
	set distance(distance) { 
		this.#decayDistance.w = distance;
		this.#distance = distance;


		const instruction = this.instructionCache.get("DECAY_DISTANCE");
		instruction.source.arrayBuffer.set(this.decayDistance.toArray());

		this.dirtyCache.set("DECAY_DISTANCE", instruction);
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