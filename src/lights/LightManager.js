import { GPUBindGroupDescriptor } from "../core/DICTS/resource binding/GPUBindGroupDescriptor.js";
import { GPUBindGroupEntry } from "../core/DICTS/resource binding/GPUBindGroupEntry.js";
import { GPUBindGroupLayoutDescriptor } from "../core/DICTS/resource binding/GPUBindGroupLayoutDescriptor.js";
import { GPUBindGroupLayoutEntry } from "../core/DICTS/resource binding/GPUBindGroupLayoutEntry.js";
import { GPUBufferBindingLayout } from "../core/DICTS/GPUBufferBindingLayout.js";
import { GPUBufferBindingType } from "../core/ENUM/GPUBufferBindingType.js";
import { GPUShaderStage } from "../core/NAMESPACE/resource binding/GPUShaderStage.js";
import { ObjectBase } from "../core/ObjectBase.js";
import { BufferDescriptor } from "../core/RC/buffers/BufferDescriptor.js";
import { BufferUsage } from "../core/RC/buffers/BufferUsage.js";
import { RCBufferBindingResource } from "../core/RCBufferBindingResource.js";
import { AmbientLight } from "./AmbientLight.js";
import { DirectionalLight } from "./DirectionalLight.js";
import { PointLight } from "./PointLight.js";
import { SpotLight } from "./SpotLight.js";
import { UniformDescriptor } from "../core/data layouts/UniformDescriptor.js";
import { BindGroupLayoutEntry } from "../core/RC/resource binding/BindGroupLayoutEntry.js";
import { BindGroupLayoutDescriptor } from "../core/RC/resource binding/BindGroupLayoutDescriptor.js";
import { ShaderStage } from "../core/RC/resource binding/ShaderStage.js";
import { BindGroupEntry } from "../core/RC/resource binding/BindGroupEntry.js";
import { BindGroupDescriptor } from "../core/RC/resource binding/BindGroupDescriptor.js";


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

		this.lights = new Map([
			[AmbientLight.DEFAULT.TYPE, new Set()],
			[DirectionalLight.DEFAULT.TYPE, new Set()],
			[PointLight.DEFAULT.TYPE, new Set()],
			[SpotLight.DEFAULT.TYPE, new Set()],
		]);
		this.maxLights = (args.maxLights !== undefined) ? args.maxLights : LightManager.DEFAULT.MAX_LIGHTS;

		this.uniformDescriptor = new UniformDescriptor(
			{
				resourceDescriptors: [
					new BufferDescriptor(
						{
							label: "light manager buffer",
							size: (4) * this.maxLights + (4+4+4 + 1+1+1+1) * this.maxLights,
							usage: BufferUsage.UNIFORM | BufferUsage.COPY_DST,
							mappedAtCreation: false,
						}
					)
				],
				bindGroupLayoutDescriptor: new BindGroupLayoutDescriptor(
					{
						label: "light manager bing group layout",
						entries: [
							new BindGroupLayoutEntry(
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
						],
					}
				),
				bindGroupDescriptor: new BindGroupDescriptor(
					{
						label: "light manager bind group",
						layout: null,
						entries: [
							new BindGroupEntry(
								{
									binding: 10,
									resource: new RCBufferBindingResource(
										{
											buffer: null,
											offset: 0,
											size: ((4) * this.maxLights + (4+4+4 + 1+1+1+1) * this.maxLights) * 4,
										}
									),
								}
							),
						],
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


		// }


	}
	update(scene, renderer) {
		const lights = this.lights;

	}
};