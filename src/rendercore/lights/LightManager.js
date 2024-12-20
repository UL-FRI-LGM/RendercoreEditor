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


export class LightManager extends ObjectBase {


	static DEFAULT = {
		TYPE: "LightManager",
        NAME: "",

		RESOURCE_PACK: new ResourcePack({ name: "RP - LIGHT MANAGER" }),
		INSTRUCTION_CACHE: new InstructionCache({ name: "IC - LIGHT MANAGER" }),
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
					arrayBuffer: new Float32Array((4+4+4) * this.maxLights + (4+4+4 + 1+1+1+1) * this.maxLights),
					
					resourceDescriptor: new BufferDescriptor(
						{
							label: "light manager buffer",
							size: (4+4+4) * this.maxLights + (4+4+4 + 1+1+1+1) * this.maxLights,
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
									size: ((4+4+4) * this.maxLights + (4+4+4 + 1+1+1+1) * this.maxLights) * 4,
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
		if (scene.descendants.has(AmbientLight.DEFAULT.TYPE))
		for(const aLight of scene.descendants.get(AmbientLight.DEFAULT.TYPE)) {
			this.addLight(aLight);
		}
		if (scene.descendants.has(PointLight.DEFAULT.TYPE))
		for(const pLight of scene.descendants.get(PointLight.DEFAULT.TYPE)) {
			this.addLight(pLight);
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
		
		// for(const aLight of lightManager.lights.get(AmbientLight.DEFAULT.TYPE)) {
		// 	this.context.queue.writeBuffer(L_B, offset, aLight.colorIntensity.arrayBuffer);
			
		// 	offset += (4) * 4;
		// }
		
		// for(const pLight of lightManager.lights.get(PointLight.DEFAULT.TYPE)) {
		// 	this.context.queue.writeBuffer(L_B, offset + (0*4) * 4, new Float32Array(pLight.position.toArray()));
		// 	this.context.queue.writeBuffer(L_B, offset + (1*4) * 4, new Float32Array(pLight.position.toArray()));
		// 	this.context.queue.writeBuffer(L_B, offset + (2*4) * 4, pLight.colorIntensity.arrayBuffer);
		// 	this.context.queue.writeBuffer(L_B, offset + (3*4) * 4, new Float32Array(pLight.decayDistance.toArray()));
		
		// 	offset += (4 + 4 + 4 + 4) * 4;
		// }

		let offset = (0) * 4;
		let i = 0;

		for (const aLight of this.lights.get(AmbientLight.DEFAULT.TYPE)) {
			for (const [key, value] of aLight.dirtyCache) {

				if (key === "local transform") continue;

				const instructionKey = i + "|aLight|" + key;
				const instruction = this.instructionCache.has(instructionKey) ? 
				this.instructionCache.get(instructionKey) : 
				this.instructionCache.set(
					instructionKey,
					new BufferSetInstruction(
						{
							label: instructionKey,
		
							number: value.number,
							target: value.target,
		
							source: {
								arrayBuffer: value.source.arrayBuffer,
								layout: {
									offset: value.source.layout.offset,
								}
							},
							destination: {
								buffer: value.destination.buffer,
								layout: {
									offset: offset + value.destination.layout.offset
								}
							},
							size: value.size
						}
					)
				).get(instructionKey);
				instruction.source.arrayBuffer = value.source.arrayBuffer;

				this.resourcePack.setResourceBindingValueInternal(1, 10, instruction);
			}
			aLight.dirtyCache.clear();

			offset += (4 + 4 + 4);
			i++;
		}

		for(const pLight of this.lights.get(PointLight.DEFAULT.TYPE)) {
			for (const [key, value] of pLight.dirtyCache) {

				if (key === "local transform") continue;

				const instructionKey = i + "|pLight|" + key;
				const instruction = this.instructionCache.has(instructionKey) ? 
				this.instructionCache.get(instructionKey) : 
				this.instructionCache.set(
					instructionKey,
					new BufferSetInstruction(
						{
							instructionKey,
		
							number: value.number,
							target: value.target,
		
							source: {
								arrayBuffer: value.source.arrayBuffer,
								layout: {
									offset: value.source.layout.offset,
								}
							},
							destination: {
								buffer: value.destination.buffer,
								layout: {
									offset: offset + value.destination.layout.offset
								}
							},
							size: value.size
						}
					)
				).get(instructionKey);
				instruction.source.arrayBuffer = value.source.arrayBuffer;

				this.resourcePack.setResourceBindingValueInternal(1, 10, instruction);
			}
			pLight.dirtyCache.clear();
		
			offset += (4 + 4 + 4 + 4) * 4;
			i++;
		}
	}
};
