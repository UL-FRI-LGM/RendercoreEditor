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
import { GPUSamplerBindingLayout } from "../core/DICTS/GPUSamplerBindingLayout.js";
import { GPUTextureBindingLayout } from "../core/DICTS/GPUTextureBindingLayout.js";
import { GPUSamplerBindingType } from "../core/ENUM/GPUSamplerBindingType.js";
import { GPUTextureSamplingType } from "../core/ENUM/GPUTextureSamplingType.js";
import { GPUTextureViewDimension } from "../core/ENUM/GPUTextureViewDimension.js";
import { ShaderInterpreter } from "../program_management/ShaderInterpreter.js";
import { MeshMaterial } from "./MeshMaterial.js";


export class MeshCustomMaterial extends MeshMaterial {
	static DEFAULT = {
		NAME: "",
		TYPE: "MeshCustomMaterial",

		SHADER_PATH: "/src/shaders/custom/",
		PROGRAM_NAME: "custom",
	};


	#uniforms;
	#attributes;
	#maps;

	#dirtyCache;


	constructor(args = {}) {
		super(
			{
				...args,
				name: (args.name !== undefined) ? args.name : MeshCustomMaterial.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : MeshCustomMaterial.DEFAULT.TYPE,

				shaderPath: (args.shaderPath !== undefined) ? args.shaderPath : MeshCustomMaterial.DEFAULT.SHADER_PATH,
				programName: (args.programName !== undefined) ? args.programName : MeshCustomMaterial.DEFAULT.PROGRAM_NAME,
			}	
		);

		this.uniforms = (args.uniforms !== undefined) ? args.uniforms : new Map();
		this.attributes = (args.attributes !== undefined) ? args.attributes : new Map();
		this.maps = new Map();
		
		this.dirtyCache = new Map();
	}

	
	get uniforms() { return this.#uniforms; }
	set uniforms(uniforms) { this.#uniforms = uniforms; }
	get attributes() { return this.#attributes; }
	set attributes(attributes) { this.#attributes = attributes; }
	get maps() { return this.#maps; }
	set maps(maps) { this.#maps = maps; }
	
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

	getMap(name) {
		return this.maps.get(name);
	}
	setMap(name, textureDescriptor) {
		this.requiredProgramTemplate = null;
		this.maps.set(name, textureDescriptor);

		this.addSBFlag("TEXTURES");
		this.addSBValue("NUM_TEXTURES", this.maps.size);
	}
	removeMap(name) {
		this.requiredProgramTemplate = null;
		this.maps.delete(name);

		if (this.maps.size === 0) this.rmSBFlag("TEXTURES");
		this.addSBValue("NUM_TEXTURES", this.maps.size);
	}
	clearMaps() {
		this.requiredProgramTemplate = null;
		this.maps.clear();

		this.rmSBFlag("TEXTURES");
		this.addSBValue("NUM_TEXTURES", this.maps.size);
	}

	// generateBuffer(context) {
	// 	if (this.buffer) this.buffer.destroy();
	// 	this.buffer = context.createBuffer(this.bufferDescriptor);
	// 	this.bindGroupEntry.resource.buffer = this.buffer;

	// }
	// generateTexture(context, descriptor) {
	// 	const textureDescriptor = descriptor;
	// 	textureDescriptor.setup(context);
	// 	textureDescriptor.updateBufferObject(context);

	// 	const samplerBindGroupLayoutEntry = new GPUBindGroupLayoutEntry(
	// 		{
	// 			binding: textureDescriptor.samplerBinding,
	// 			visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
	// 			sampler: new GPUSamplerBindingLayout(
	// 				{
	// 					type: GPUSamplerBindingType.FILTERING
	// 				}
	// 			),
	// 		}
	// 	);
	// 	this.bindGroupLayoutDescriptor.entries.push(samplerBindGroupLayoutEntry);
		
	// 	const samplerBindGroupEntry = new GPUBindGroupEntry(
	// 		{
	// 			binding: textureDescriptor.samplerBinding,
	// 			resource: textureDescriptor.sampler,
	// 		}
	// 	);
	// 	this.bindGroupDescriptor.entries.push(samplerBindGroupEntry);


	// 	const textureViewBindGroupLayoutEntry = new GPUBindGroupLayoutEntry(
	// 		{
	// 			binding: textureDescriptor.textureBinding,
	// 			visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
	// 			texture: new GPUTextureBindingLayout(
	// 				{
	// 					sampleType: GPUTextureSamplingType.FLOAT,
	// 					viewDimension: GPUTextureViewDimension.D2,
	// 					multisampled: false
	// 				}
	// 			),
	// 		}
	// 	);
	// 	this.bindGroupLayoutDescriptor.entries.push(textureViewBindGroupLayoutEntry);

	// 	const textureViewBindGroupEntry = new GPUBindGroupEntry(
	// 		{
	// 			binding: textureDescriptor.textureBinding,
	// 			resource: textureDescriptor.texture.createView(),
	// 		}
	// 	);
	// 	this.bindGroupDescriptor.entries.push(textureViewBindGroupEntry);
	// }
	setup(context) {
		

		// this.generateBuffer(context);

		// for (const [name, descriptor] of this.maps) {
		// 	this.generateTexture(context, descriptor);
		// }

		// this.bindGroupLayout = context.createBindGroupLayout(this.bindGroupLayoutDescriptor);
		// this.bindGroupDescriptor.layout = this.bindGroupLayout;

		// this.bindGroup = context.createBindGroup(this.bindGroupDescriptor);
	}
	update(context) {
		// for (const [name, desc] of this.dirtyCache) {
		// 	context.queue.writeBuffer(this.buffer, desc.bufferOffset, desc.data, desc.dataOffset, desc.size);
		// }
		// this.dirtyCache.clear();
	}
};