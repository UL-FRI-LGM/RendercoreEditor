import { GPUBufferBindingLayout } from "../core/DICTS/GPUBufferBindingLayout.js";
import { GPUBufferBindingType } from "../core/ENUM/GPUBufferBindingType.js";
import { ObjectBase } from "../core/ObjectBase.js";
import { BufferDescriptor } from "../core/RC/buffers/BufferDescriptor.js";
import { BufferUsage } from "../core/RC/buffers/BufferUsage.js";
import { RCBufferBindingResource } from "../core/RCBufferBindingResource.js";
import { AmbientLight } from "./AmbientLight.js";
import { DirectionalLight } from "./DirectionalLight.js";
import { PointLight } from "./PointLight.js";
import { SpotLight } from "./SpotLight.js";
import { UniformGroupDescriptor } from "../core/data layouts/UniformGroupDescriptor.js";
import { BindGroupLayoutEntry } from "../core/RC/resource binding/BindGroupLayoutEntry.js";
import { BindGroupLayoutDescriptor } from "../core/RC/resource binding/BindGroupLayoutDescriptor.js";
import { ShaderStage } from "../core/RC/resource binding/ShaderStage.js";
import { BindGroupEntry } from "../core/RC/resource binding/BindGroupEntry.js";
import { BindGroupDescriptor } from "../core/RC/resource binding/BindGroupDescriptor.js";
import { ResourceBinding } from "../core/data layouts/ResourceBinding.js";
import { BufferSetInstruction } from "../core/data layouts/BufferSetInstruction.js";


export class LightManager extends ObjectBase {


	static DEFAULT = {
        NAME: "",
		TYPE: "LightManager",

		MAX_LIGHTS: 128,
    };


	#lights;
	#maxLights;


	constructor(args = {}) {
		super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : LightManager.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : LightManager.DEFAULT.TYPE,
			}
		);

		this.dirtyCache = new Map();
		this.instructionCache = new Map();

		this.lights = new Map([
			[AmbientLight.DEFAULT.TYPE, new Set()],
			[DirectionalLight.DEFAULT.TYPE, new Set()],
			[PointLight.DEFAULT.TYPE, new Set()],
			[SpotLight.DEFAULT.TYPE, new Set()],
		]);
		this.maxLights = (args.maxLights !== undefined) ? args.maxLights : LightManager.DEFAULT.MAX_LIGHTS;

		this.uniformGroupDescriptor = new UniformGroupDescriptor(
			{
				label: "light manager resource group",
				number: 1,
				resourceBindings: new Map(
					[
						[
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
											buffer: new GPUBufferBindingLayout(
												{
													type: GPUBufferBindingType.UNIFORM,
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
						]
					]
				),
				resourceBindingsExteral: new Map(),

				bindGroupLayoutDescriptor: new BindGroupLayoutDescriptor(
					{
						label: "light manager bing group layout",
						entries: new Array(),
					}
				),
				// bindGroupLayoutDescriptor: BindGroupLayoutDescriptor.CONFIGURATION.G01_L,
				bindGroupDescriptor: new BindGroupDescriptor(
					{
						label: "light manager bind group",
						layout: null,
						entries: new Array(),
					}
				)
			}
		);
	}


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

				this.setBufferBinding(instructionKey, instruction);
			}
			aLight.dirtyCache.clear();

			offset += (4 + 4 + 4);
			i++;
		}

		for(const pLight of this.lights.get(PointLight.DEFAULT.TYPE)) {
			for (const [key, value] of pLight.dirtyCache) {

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

				this.setBufferBinding(instructionKey, instruction);
			}
			pLight.dirtyCache.clear();
		
			offset += (4 + 4 + 4 + 4) * 4;
			i++;
		}
	}

	setBufferBinding(name, setInstruction) {
		this.uniformGroupDescriptor.setBufferBinding(name, setInstruction);
	}
};