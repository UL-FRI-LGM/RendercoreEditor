import { BufferBindingLayout } from "../core/RC/resource_binding/BufferBindingLayout.js";
import { BufferBindingType } from "../core/RC/resource_binding/BufferBindingType.js";
import { ObjectBase } from "../core/ObjectBase.js";
import { BufferDescriptor } from "../core/RC/buffers/BufferDescriptor.js";
import { BufferUsage } from "../core/RC/buffers/BufferUsage.js";
import { RCBufferBindingResource } from "../core/RCBufferBindingResource.js";
import { AmbientLight } from "./AmbientLight.js";
import { DirectionalLight } from "./DirectionalLight.js";
import { PointLight } from "./PointLight.js";
import { SpotLight } from "./SpotLight.js";
import { BindGroupLayoutEntry } from "../core/RC/resource_binding/BindGroupLayoutEntry.js";
import { ShaderStage } from "../core/RC/resource_binding/ShaderStage.js";
import { BindGroupEntry } from "../core/RC/resource_binding/BindGroupEntry.js";
import { ResourceBinding } from "../core/data_layouts/ResourceBinding.js";
import { BufferSetInstruction } from "../core/data_layouts/BufferSetInstruction.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";
import { InstructionCache } from "../core/data_layouts/InstructionCache.js";
import { MapT2 } from "../core/MapT2.js";
import { SetT2 } from "../core/SetT2.js";
import { Source } from "../core/data_layouts/Source.js";
import { Uint32ArrayT2 } from "../core/Uint32ArrayT2.js";
import { Layout } from "../core/data_layouts/Layout.js";
import { Destination } from "../core/data_layouts/Destination.js";
import { Float32ArrayT2 } from "../core/Float32ArrayT2.js";


export class LightManager extends ObjectBase {


	static DEFAULT = {
		TYPE: "LightManager",
		NAME: "",

		RESOURCE_PACK: new ResourcePack({ name: "RP - LIGHT MANAGER" }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: "IC - LIGHT MANAGER" },
			[
				[
					"NUMBER_LIGHTS",
					new BufferSetInstruction(
						{
							label: "NUMBER_LIGHTS",
		
							number: 10,
							target: ResourceBinding.TARGET.INTERNAL,
		
							source: new Source(
								{
									arrayBuffer: new Uint32ArrayT2({}, 4),
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
											offset: (0),
										}
									)
								}
							),
							size: (4)
						}
					)
				]
			],
		),
		DIRTY_CACHE: new MapT2({ name: "DC - LIGHT MANAGER" }),

		LIGHTS: new MapT2(
			{ name: "LIGHTS - LIGHT MANAGER" },
			[
				[AmbientLight.DEFAULT.TYPE, new SetT2({})],
				[DirectionalLight.DEFAULT.TYPE, new SetT2({})],
				[PointLight.DEFAULT.TYPE, new SetT2({})],
				[SpotLight.DEFAULT.TYPE, new SetT2({})],
			]
		),
		MAX_LIGHTS: 128,
	};


	#resourcePack;
	#instructionCache;
	#dirtyCache;

	#lights;
	#maxLights;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : LightManager.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : LightManager.DEFAULT.NAME,
			}
		);

		this.resourcePack = (args.resourcePack !== undefined) ? args.resourcePack : LightManager.DEFAULT.RESOURCE_PACK.clone();
		this.instructionCache = (args.instructionCache !== undefined) ? args.instructionCache : LightManager.DEFAULT.INSTRUCTION_CACHE.clone(),
		this.dirtyCache = (args.dirtyCache !== undefined) ? args.dirtyCache : LightManager.DEFAULT.DIRTY_CACHE.clone(),

		this.lights = (args.light !== undefined) ? args.lights : LightManager.DEFAULT.LIGHTS.clone();
		this.maxLights = (args.maxLights !== undefined) ? args.maxLights : LightManager.DEFAULT.MAX_LIGHTS;

		this.resourcePack.setResourceBindingInternal(
			1,
			10,
			new ResourceBinding(
				{
					number: 10,
					arrayBuffer: new Float32Array((1+1+1+1) + (4+4+4) * this.maxLights + (4+4+4) * this.maxLights + (4+4+4 + 1+1+1+1) * this.maxLights + (4+4+4 + 1+1+1+1 +1+1+2) * this.maxLights),
					
					resourceDescriptor: new BufferDescriptor(
						{
							label: "light manager buffer",
							size: (1+1+1+1) + (4+4+4) * this.maxLights + (4+4+4) * this.maxLights + (4+4+4 + 1+1+1+1) * this.maxLights + (4+4+4 + 1+1+1+1 +1+1+2) * this.maxLights,
							usage: BufferUsage.UNIFORM | BufferUsage.COPY_DST,
							mappedAtCreation: false,
						}
					),
					bindGroupLayoutEntry: new BindGroupLayoutEntry(
						{
							binding: 10,
							visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
							buffer: new BufferBindingLayout(
								{
									type: BufferBindingType.UNIFORM,
									hasDynamicOffset: false,
									minBindingSize: 0,
								}
							),
						}
					),
					bindGroupEntry: new BindGroupEntry(
						{
							binding: 10,
							resource: new RCBufferBindingResource(
								{
									buffer: null,
									offset: 0,
									size: ((1+1+1+1) + (4+4+4) * this.maxLights + (4+4+4) * this.maxLights + (4+4+4 + 1+1+1+1) * this.maxLights + (4+4+4 + 1+1+1+1 +1+1+2) * this.maxLights) * 4,
								}
							),
						}
					),
				}
			)
		);
	}


	get resourcePack() { return this.#resourcePack; }
	set resourcePack(resourcePack) { this.#resourcePack = resourcePack; }
	get instructionCache() { return this.#instructionCache; }
	set instructionCache(instructionCache) { this.#instructionCache = instructionCache; }
	get dirtyCache() { return this.#dirtyCache; }
	set dirtyCache(dirtyCache) { this.#dirtyCache = dirtyCache; }

	get lights() { return this.#lights; }
	set lights(lights) { this.#lights = lights; }
	get maxLights() { return this.#maxLights; }
	set maxLights(maxLights) { this.#maxLights = maxLights; }

	get numALights() { return this.lights.get(AmbientLight.DEFAULT.TYPE).size; }
	get numDLights() { return this.lights.get(DirectionalLight.DEFAULT.TYPE).size; }
	get numPLights() { return this.lights.get(PointLight.DEFAULT.TYPE).size; }
	get numSLights() { return this.lights.get(SpotLight.DEFAULT.TYPE).size; }
	get numLights() { return this.numALights + this.numDLights + this.numPLights + this.numSLights; }

	get flags() {
		const flags = new Set();
		if (this.numALights > 0) flags.add("ALIGHTS");
		if (this.numDLights > 0) flags.add("DLIGHTS");
		if (this.numPLights > 0) flags.add("PLIGHTS");
		if (this.numSLights > 0) flags.add("SLIGHTS");


		return flags; 
	}
	get values() {
		const values = new Map();
		values.set("MAX_LIGHTS", this.maxLights);

		values.set("NUM_ALIGHTS", this.numALights);
		values.set("NUM_DLIGHTS", this.numDLights);
		values.set("NUM_PLIGHTS", this.numPLights);
		values.set("NUM_SLIGHTS", this.numSLights);


		return values;
	}


	addLight(light) {
		this.lights.get(light.type).add(light);
	}
	removeLight(light) {
		this.lights.get(light.type).delete(light);
	}
	clearLights() {
		this.lights.get(AmbientLight.DEFAULT.TYPE).clear();
		this.lights.get(DirectionalLight.DEFAULT.TYPE).clear();
		this.lights.get(PointLight.DEFAULT.TYPE).clear();
		this.lights.get(SpotLight.DEFAULT.TYPE).clear();
	}

	setup(scene) {
		const lights = this.lights;


		//LOCAL SETUP
		this.clearLights();

		// add first n lights from the scene, that are visible (active), till the maximum number is reached
		if (scene.descendants.has(AmbientLight.DEFAULT.TYPE))
		for(const ALight of scene.descendants.get(AmbientLight.DEFAULT.TYPE)) {
			if (this.numALights >= this.maxLights) break;
			if (ALight.visible) this.addLight(ALight);
		}

		if (scene.descendants.has(DirectionalLight.DEFAULT.TYPE))
		for(const DLight of scene.descendants.get(DirectionalLight.DEFAULT.TYPE)) {
			if (this.numDLights >= this.maxLights) break;
			if (DLight.visible) this.addLight(DLight);
		}

		if (scene.descendants.has(PointLight.DEFAULT.TYPE))
		for(const PLight of scene.descendants.get(PointLight.DEFAULT.TYPE)) {
			if (this.numPLights >= this.maxLights) break;
			if (PLight.visible) this.addLight(PLight);
		}

		if (scene.descendants.has(SpotLight.DEFAULT.TYPE))
		for(const SLight of scene.descendants.get(SpotLight.DEFAULT.TYPE)) {
			if (this.numSLights >= this.maxLights) break;
			if (SLight.visible) this.addLight(SLight);
		}

		// for (const [lightType, lightTypeSet] of lights) {
		// 	for (const light of lightTypeSet) {
		// 		//LOCAL SETUP


		// }
	}
	update(scene) {
		const lights = this.lights;


		// const L_UGD = lightManager.uniformGroupDescriptor;
		// const L_B = bufferManager.getBuffer(L_UGD.bindingDescriptors[0].resourceDescriptor);

		// let offset = (0) * 4;

		// for(const ALight of lightManager.lights.get(AmbientLight.DEFAULT.TYPE)) {
		// 	this.context.queue.writeBuffer(L_B, offset, ALight.colorIntensity.arrayBuffer);

		// 	offset += (4) * 4;
		// }

		// for(const PLight of lightManager.lights.get(PointLight.DEFAULT.TYPE)) {
		// 	this.context.queue.writeBuffer(L_B, offset + (0*4) * 4, new Float32Array(PLight.position.toArray()));
		// 	this.context.queue.writeBuffer(L_B, offset + (1*4) * 4, new Float32Array(PLight.position.toArray()));
		// 	this.context.queue.writeBuffer(L_B, offset + (2*4) * 4, PLight.colorIntensity.arrayBuffer);
		// 	this.context.queue.writeBuffer(L_B, offset + (3*4) * 4, new Float32Array(PLight.decayDistance.toArray()));
		
		// 	offset += (4 + 4 + 4 + 4) * 4;
		// }

		let offset = (0) * 4;
		let i = 0;

		const i_numberLights = this.instructionCache.get("NUMBER_LIGHTS");
		i_numberLights.source.arrayBuffer.set([this.numALights, this.numDLights, this.numPLights, this.numSLights]);
		this.resourcePack.setResourceBindingValueInternal(1, 10, i_numberLights);
		

		i = 0;
		offset = (1+1+1+1);

		for (const ALight of this.lights.get(AmbientLight.DEFAULT.TYPE)) {
			for (const [k_instructionAL, v_instructionAL] of ALight.dirtyCache) {

				if (k_instructionAL === "local transform") continue;

				const k_instructionLM = i + "|ALight|" + k_instructionAL;
				const instruction = this.instructionCache.has(k_instructionLM) ? 
				this.instructionCache.get(k_instructionLM) : 
				this.instructionCache.set(
					k_instructionLM,
					new BufferSetInstruction(
						{
							label: k_instructionLM,

							number: 10,
							target: ResourceBinding.TARGET.INTERNAL,

							source: null,
							destination: new Destination(
								{
									buffer: null,
									layout: new Layout(
										{
											offset: offset
										}
									)
								}
							),
							size: null
						}
					)
				).get(k_instructionLM);
				instruction.source = v_instructionAL.source;
				instruction.destination.layout.offset = offset + v_instructionAL.destination.layout.offset;
				instruction.size = v_instructionAL.size;

				this.resourcePack.setResourceBindingValueInternal(1, 10, instruction);
			}
			// ALight.dirtyCache.clear();

			offset += (4 + 4 + 4);
			i++;
		}


		i = 0;
		offset = (1+1+1+1) + this.maxLights*(4+4+4);

		for (const DLight of this.lights.get(DirectionalLight.DEFAULT.TYPE)) {
			for (const [k_instructionDL, v_instructionDL] of DLight.dirtyCache) {

				if (k_instructionDL === "local transform") continue;

				const k_instructionLM = i + "|DLight|" + k_instructionDL;
				const instruction = this.instructionCache.has(k_instructionLM) ? 
				this.instructionCache.get(k_instructionLM) : 
				this.instructionCache.set(
					k_instructionLM,
					new BufferSetInstruction(
						{
							label: k_instructionLM,

							number: 10,
							target: ResourceBinding.TARGET.INTERNAL,

							source: null,
							destination: new Destination(
								{
									buffer: null,
									layout: {
										offset: offset
									}
								}
							),
							size: null
						}
					)
				).get(k_instructionLM);
				instruction.source = v_instructionDL.source;
				instruction.destination.layout.offset = offset + v_instructionDL.destination.layout.offset;
				instruction.size = v_instructionDL.size;

				this.resourcePack.setResourceBindingValueInternal(1, 10, instruction);
			}
			// DLight.dirtyCache.clear();

			offset += (4 + 4 + 4);
			i++;
		}


		i = 0;
		offset = (1+1+1+1) + this.maxLights*(4+4+4) + this.maxLights*(4+4+4);

		for(const PLight of this.lights.get(PointLight.DEFAULT.TYPE)) {
			for (const [k_instructionPL, v_instructionPL] of PLight.dirtyCache) {

				if (k_instructionPL === "local transform") continue;

				const k_instructionLM = i + "|PLight|" + k_instructionPL;
				const instruction = this.instructionCache.has(k_instructionLM) ? 
				this.instructionCache.get(k_instructionLM) : 
				this.instructionCache.set(
					k_instructionLM,
					new BufferSetInstruction(
						{
							label: k_instructionLM,

							number: 10,
							target: ResourceBinding.TARGET.INTERNAL,

							source: null,
							destination: new Destination(
								{
									buffer: null,
									layout: {
										offset: offset
									}
								}
							),
							size: null
						}
					)
				).get(k_instructionLM);
				instruction.source = v_instructionPL.source;
				instruction.destination.layout.offset = offset + v_instructionPL.destination.layout.offset;
				instruction.size = v_instructionPL.size;

				this.resourcePack.setResourceBindingValueInternal(1, 10, instruction);
			}
			// PLight.dirtyCache.clear();
		
			offset += (4 + 4 + 4 + 4);
			i++;
		}


		i = 0;
		offset = (1+1+1+1) + this.maxLights*(4+4+4) + this.maxLights*(4+4+4) + this.maxLights*(4+4+4 + 4);

		for(const SLight of this.lights.get(SpotLight.DEFAULT.TYPE)) {
			for (const [k_instructionSL, v_instructionSL] of SLight.dirtyCache) {

				if (k_instructionSL === "local transform") continue;

				const k_instructionLM = i + "|SLight|" + k_instructionSL;
				const instruction = this.instructionCache.has(k_instructionLM) ? 
				this.instructionCache.get(k_instructionLM) : 
				this.instructionCache.set(
					k_instructionLM,
					new BufferSetInstruction(
						{
							label: k_instructionLM,

							number: 10,
							target: ResourceBinding.TARGET.INTERNAL,

							source: null,
							destination: new Destination(
								{
									buffer: null,
									layout: {
										offset: offset
									}
								}
							),
							size: null
						}
					)
				).get(k_instructionLM);
				instruction.source = v_instructionSL.source;
				instruction.destination.layout.offset = offset + v_instructionSL.destination.layout.offset;
				instruction.size = v_instructionSL.size;

				this.resourcePack.setResourceBindingValueInternal(1, 10, instruction);
			}
			// SLight.dirtyCache.clear();
		
			offset += (4 + 4 + 4 + 4 + (2+2));
			i++;
		}


		i = 0;
		offset = (1+1+1+1) + this.maxLights*(4+4+4) + this.maxLights*(4+4+4) + this.maxLights*(4+4+4 + 4) + this.maxLights*(4+4+4 + 4 + 4);
	}
};
