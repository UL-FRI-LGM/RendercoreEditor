import { Material } from "./Material.js";
import { GPUBufferDescriptor } from "../core/DICTS/GPUBufferDescriptor.js";
import { GPUBindGroupLayoutEntry } from "../core/DICTS/GPUBindGroupLayoutEntry.js";
import { GPUBufferBindingLayout } from "../core/DICTS/GPUBufferBindingLayout.js";
import { GPUBufferUsage } from "../core/NAMESPACE/GPUBufferUsage.js";
import { GPUBufferBindingType } from "../core/ENUM/GPUBufferBindingType.js";
import { GPUShaderStage } from "../core/NAMESPACE/GPUShaderStage.js";
import { GPUBindGroupEntry } from "../core/DICTS/GPUBindGroupEntry.js";
import { RCBufferBindingResource } from "../core/RCBufferBindingResource.js";
import { GPUBindGroupLayoutDescriptor } from "../core/DICTS/GPUBindGroupLayoutDescriptor.js";


export class CustomShaderMaterial extends Material {
	static DEFAULT = {
		NAME: "",
		TYPE: "CustomShaderMaterial",

		SHADER_PATH: "/src/shaders/custom/",
		PROGRAM_NAME: "custom",

		BUFFER_DESCRIPTOR: new GPUBufferDescriptor(
			{
				size: 0,
				usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
				mappedAtCreation: false,
			}
		),
		GROUP: 3,
		BINDING: 0,
		BIND_GROUP_LAYOUT_ENTRY: new GPUBindGroupLayoutEntry(
			{
				binding: 0,
				visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
				buffer: new GPUBufferBindingLayout(
					{
						type: GPUBufferBindingType.UNIFORM,
						hasDynamicOffset: false,
						minBindingSize: 0,
					}
				),
			}
		),
		x: new GPUBindGroupEntry(
			{
				binding: 0,
				resource: new RCBufferBindingResource(
					{
						buffer: this._u_MATERIAL_BUFFER,
						offset: 0,
						size: 4*4*2,
					}
				),
			}
		),
	};


	#uniforms;
	#attributes;

	#dirtyCache;


	constructor(args = {}) {
		super(
			{
				...args,
				name: (args.name !== undefined) ? args.name : CustomShaderMaterial.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : CustomShaderMaterial.DEFAULT.TYPE,

				shaderPath: (args.shaderPath !== undefined) ? args.shaderPath : CustomShaderMaterial.DEFAULT.SHADER_PATH,
				programName: (args.programName !== undefined) ? args.programName : CustomShaderMaterial.DEFAULT.PROGRAM_NAME,
			}	
		);

		this.uniforms = (args.uniforms !== undefined) ? args.uniforms : new Map();
		this.attributes = (args.attributes !== undefined) ? args.attributes : new Map();
		
		this.dirtyCache = new Map();
	}

	
	get uniforms() { return this.#uniforms; }
	set uniforms(uniforms) { this.#uniforms = uniforms; }
	get attributes() { return this.#attributes; }
	set attributes(attributes) { this.#attributes = attributes; }
	
	get dirtyCache() { return this.#dirtyCache; }
	set dirtyCache(dirtyCache) { this.#dirtyCache = dirtyCache; }


	getUniform(name) {
		return this.uniforms.get(name);
	}
	setUniform(name, value) {
		this.uniforms.set(name, value);
		this.dirtyCache.set(name, value);
	}
	removeUniform(name) {
		this.uniforms.delete(name);
		this.dirtyCache.delete(name);
	}

	getAttribute(name) {
		return this.attributes.get(name);
	}
	setAttribute(name, value) {
		this.attributes.set(name, value);
		this.dirtyCache.set(name, value);
	}
	removeAttribute(name) {
		this.attributes.delete(name);
		this.dirtyCache.delete(name);
	}

	generate(context) {
		this.buffer = context.createBuffer(this.bufferDescriptor);
		this.bindGroupEntry.resource.buffer = this.buffer;
		this.bindGroupLayout = context.createBindGroupLayout(this.bindGroupLayoutDescriptor);
		this.bindGroupDescriptor.layout = this.bindGroupLayout;
		this.bindGroup = context.createBindGroup(this.bindGroupDescriptor);
	}
	updateBufferObject(context) {
		for (const [name, desc] of this.dirtyCache) {
			context.queue.writeBuffer(this.buffer, desc.bufferOffset, desc.data, desc.dataOffset, desc.size);
		}
		this.dirtyCache.clear();
	}
};