import { GPUBindGroupDescriptor } from "../core/DICTS/GPUBindGroupDescriptor.js";
import { GPUBindGroupEntry } from "../core/DICTS/GPUBindGroupEntry.js";
import { GPUBindGroupLayoutDescriptor } from "../core/DICTS/GPUBindGroupLayoutDescriptor.js";
import { GPUBindGroupLayoutEntry } from "../core/DICTS/GPUBindGroupLayoutEntry.js";
import { GPUBufferBindingLayout } from "../core/DICTS/GPUBufferBindingLayout.js";
import { GPUBufferDescriptor } from "../core/DICTS/GPUBufferDescriptor.js";
import { GPUBufferBindingType } from "../core/ENUM/GPUBufferBindingType.js";
import { GPUBufferUsage } from "../core/NAMESPACE/GPUBufferUsage.js";
import { GPUShaderStage } from "../core/NAMESPACE/GPUShaderStage.js";
import { ObjectBase } from "../core/ObjectBase.js";
import { RCBufferBindingResource } from "../core/RCBufferBindingResource.js";
import { AmbientLight } from "./AmbientLight.js";
import { DirectionalLight } from "./DirectionalLight.js";
import { PointLight } from "./PointLight.js";
import { SpotLight } from "./SpotLight.js";


export class LightManager extends ObjectBase {


	static DEFAULT = {
        NAME: "",
		TYPE: "LightManager",

		MAX_LIGHTS: 128,
    };


	#context;

	#lights;
	#maxLights;


	constructor(context, args = {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : LightManager.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : LightManager.DEFAULT.TYPE,
			}
		);

		this.context = context;

		this.lights = new Map([
			[AmbientLight.DEFAULT.TYPE, new Set()],
			[DirectionalLight.DEFAULT.TYPE, new Set()],
			[PointLight.DEFAULT.TYPE, new Set()],
			[SpotLight.DEFAULT.TYPE, new Set()],
		]);
		this.maxLights = (args.maxLights !== undefined) ? args.maxLights : LightManager.DEFAULT.MAX_LIGHTS;

		this.uniformBufferSize = 4 * ((4) * 1 + (4+4+4 + 1+1+1+1) * 1);
		console.error(this);

		this.uniformBufferSize = ((4) * this.maxLights + (4+4+4 + 1+1+1+1) * this.maxLights) * 4;
		this.bufferDescriptor = new GPUBufferDescriptor(
			{
				size: this.uniformBufferSize,
				usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
				mappedAtCreation: false,
			}
		);

		this.bindGroupLayoutEntry = new GPUBindGroupLayoutEntry(
			{
				binding: 10,
				visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
				buffer: new GPUBufferBindingLayout(
					{
						type: GPUBufferBindingType.UNIFORM,
						hasDynamicOffset: false,
						minBindingSize: 0,
					}
				),
			}
		);
		this.bindGroupLayoutDescriptor = new GPUBindGroupLayoutDescriptor(
			{
				label: "light manager bing group layout",
				entries: [
					this.bindGroupLayoutEntry,
				],
			}
		);

		this.bufferBindGroupEntry = new GPUBindGroupEntry(
			{
				binding: 10,
				resource: new RCBufferBindingResource(
					{
						buffer: null,
						offset: 0,
						size: this.uniformBufferSize,
					}
				),
			}
		);
		this.bindGroupDescriptor = new GPUBindGroupDescriptor(
			{
				label: "light manager bind group",
				layout: null,
				entries: [
					this.bufferBindGroupEntry,
				],
			}
		);
	}


	get context() { return this.#context; }
    set context(context) { this.#context = context; }

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

	setupContex(renderer) {
		// if (this.buffer) this.buffer.destroy();
		// this.buffer = this.context.createBuffer(this.bufferDescriptor);
		// this.bufferBindGroupEntry.resource.buffer = this.buffer;

		// this.bindGroupLayout = this.context.createBindGroupLayout(LightManager.bindGroupLayoutDescriptor);
		// this.bindGroupDescriptor.layout = this.bindGroupLayout;

		// this.bindGroup = this.context.createBindGroup(this.bindGroupDescriptor);
	}
	setup(scene, renderer) {
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


		// 		//LCOAL CONTEXT SETUP
		// 		light.setupContex(this.context);
		// 	}
		// }


		if (!this.contextSet){
			this.setupContex(renderer);
			this.contextSet = true;
		}
	}
	updateContext(scene) {

		// let offset = (0) * 4;
		// if (scene.descendants.has(AmbientLight.DEFAULT.TYPE))
		// for(const aLight of scene.descendants.get(AmbientLight.DEFAULT.TYPE)) {
		// 	this.context.queue.writeBuffer(this.buffer, offset, aLight.colorIntensity.arrayBuffer);
		// 	offset += (4) * 4;
		// }
		// if (scene.descendants.has(PointLight.DEFAULT.TYPE))
		// for(const pLight of scene.descendants.get(PointLight.DEFAULT.TYPE)) {
		// 	this.context.queue.writeBuffer(this.buffer, offset + 0      , new Float32Array(pLight.position.toArray()));
		// 	this.context.queue.writeBuffer(this.buffer, offset + 1*4 * 4, new Float32Array(pLight.position.toArray()));
		// 	this.context.queue.writeBuffer(this.buffer, offset + 2*4 * 4, pLight.colorIntensity.arrayBuffer);
		// 	this.context.queue.writeBuffer(this.buffer, offset + 3*4 * 4, new Float32Array(pLight.decayDistance.toArray()));
		
		// 	offset += (4 + 4 + 4 + 4) * 4;
		// }
	}
	update(scene, renderer) {
		const lights = this.lights;


		this.updateContext(scene, renderer);
	}
};