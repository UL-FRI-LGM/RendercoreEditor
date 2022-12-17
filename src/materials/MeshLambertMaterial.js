import { CustomShaderMaterial } from "./CustomShaderMaterial.js";
import { Color4 } from "../math/Color4.js";
import { GPUBufferDescriptor } from "../core/DICTS/GPUBufferDescriptor.js";
import { GPUBindGroupLayoutEntry } from "../core/DICTS/GPUBindGroupLayoutEntry.js";
import { GPUBufferBindingLayout } from "../core/DICTS/GPUBufferBindingLayout.js";
import { GPUBufferUsage } from "../core/NAMESPACE/GPUBufferUsage.js";
import { GPUBufferBindingType } from "../core/ENUM/GPUBufferBindingType.js";
import { GPUShaderStage } from "../core/NAMESPACE/GPUShaderStage.js";
import { GPUBindGroupEntry } from "../core/DICTS/GPUBindGroupEntry.js";
import { RCBufferBindingResource } from "../core/RCBufferBindingResource.js";
import { GPUBindGroupLayoutDescriptor } from "../core/DICTS/GPUBindGroupLayoutDescriptor.js";
import { GPUBindGroupDescriptor } from "../core/DICTS/GPUBindGroupDescriptor.js";


export class MeshLambertMaterial extends CustomShaderMaterial {
	static DEFAULT = {
		NAME: "",
		TYPE: "MeshLambertMaterial",

		SHADER_PATH: "/src/shaders/lambert/",
		PROGRAM_NAME: "lambert_smooth",

		GROUP: 3,
		BINDING: 0,
		SIZE: 2*4*4,
	};


	#bufferDescriptor;

	#emissive;
	#diffuse;


	constructor(args = {}) {
		super(
			{
				...args,
				name: (args.name !== undefined) ? args.name : MeshLambertMaterial.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : MeshLambertMaterial.DEFAULT.TYPE,

				shaderPath: MeshLambertMaterial.DEFAULT.SHADER_PATH,
				programName: MeshLambertMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : new Map(),
				attributes: (args.attributes !== undefined) ? args.attributes : new Map(),
			},
		);

		this.emissive = (args.emissive !== undefined) ? args.emissive : new Color4(0, 0, 0, 0);
		this.diffuse = (args.diffuse !== undefined) ? args.diffuse : new Color4(Math.random(), Math.random(), Math.random(), Math.random());
	
		this.bufferDescriptor = new GPUBufferDescriptor(
			{
				size: 2*4*4,
				usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
				mappedAtCreation: false,
			}
		);
		this.bindGroupLayoutEntry = new GPUBindGroupLayoutEntry(
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
		);
		this.bindGroupLayoutDescriptor = new GPUBindGroupLayoutDescriptor(
			{
				entries: [
					this.bindGroupLayoutEntry,
				],
			}
		);
		this.bindGroupEntry = new GPUBindGroupEntry(
			{
				binding: 0,
				resource: new RCBufferBindingResource(
					{
						buffer: null,
						offset: 0,
						size: 4*4*2,
					}
				),
			}
		);
		this.bindGroupDescriptor = new GPUBindGroupDescriptor(
			{
				label: "mesh lambert material bind group",
				layout: null,
				entries: [
					this.bindGroupEntry,
				],
			}
		);
	}


	get bufferDescriptor() { return this.#bufferDescriptor; }
	set bufferDescriptor(bufferDescriptor) { this.#bufferDescriptor = bufferDescriptor; }

	get emissive() { return this.#emissive; }
	set emissive(emissive) { 
		this.#emissive = emissive;
		this.setUniform("emissive", {bufferOffset: 0*4*4, data: emissive.arrayBuffer.buffer, dataOffset: 0, size: 4*4});
	}
	get diffuse() { return this.#diffuse; }
	set diffuse(diffuse) { 
		this.#diffuse = diffuse;
		this.setUniform("diffuse", {bufferOffset: 1*4*4, data: diffuse.arrayBuffer.buffer, dataOffset: 0, size: 4*4});
	}
};