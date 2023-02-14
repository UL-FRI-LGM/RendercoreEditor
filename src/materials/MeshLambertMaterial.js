import { MeshCustomMaterial } from "./MeshCustomMaterial.js";
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
import { MeshGeometry } from "../RenderCore.js";
import { GPUSamplerBindingLayout } from "../core/DICTS/GPUSamplerBindingLayout.js";
import { GPUSamplerBindingType } from "../core/ENUM/GPUSamplerBindingType.js";
import { GPUTextureBindingLayout } from "../core/DICTS/GPUTextureBindingLayout.js";
import { GPUTextureSamplingType } from "../core/ENUM/GPUTextureSamplingType.js";
import { GPUTextureViewDimension } from "../core/ENUM/GPUTextureViewDimension.js";
import { BufferDescriptor } from "../core/RC/buffers/BufferDescriptor.js";
import { BindGroupLayoutDescriptor } from "../core/BindGroupLayoutDescriptor.js";
import { TextureDescriptor } from "../core/RC/textures/TextureDescriptor.js";
import { GPUExtent3D } from "../core/DICTS/GPUExtent3D.js";
import { GPUTextureFormat } from "../core/ENUM/GPUTextureFormat.js";
import { GPUTextureUsage } from "../core/NAMESPACE/GPUTextureUsage.js";
import { GPUFilterMode } from "../core/ENUM/GPUFilterMode.js";


export class MeshLambertMaterial extends MeshCustomMaterial {
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
	
		this.bufferDescriptor = new BufferDescriptor(
			{
				label: "mesh lambert material buffer",
				// size: (2*4) * 4,
				size: (2*4),
				usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
				mappedAtCreation: false,

				arrayBuffer: new Float32Array(2*4),
			}
		);
		//default texture
		this.textureDescriptor = new TextureDescriptor(
			{
				arrayBuffer: new Uint8ClampedArray([255, 0, 255, 255]),
				size: new GPUExtent3D({ width: 1, height: 1, depthOrArrayLayers: 1 }),
				// format: GPUTextureFormat.RGBA_8_UNORM_SRGB,
				format: GPUTextureFormat.RGBA_8_UNORM,
				usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
	
				magFilter: GPUFilterMode.LINEAR,
				minFilter: GPUFilterMode.LINEAR,
				mipmapFilter: GPUFilterMode.LINEAR,
	
				samplerBinding: 10,
				textureBinding: 20,
			}
		);

		this.bufferBindGroupLayoutEntry = new GPUBindGroupLayoutEntry(
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
		this.bindGroupLayoutDescriptor = new BindGroupLayoutDescriptor(
			{
				lable: "mesh lambert material bind group layout",
				entries: [
					this.bufferBindGroupLayoutEntry,
					new GPUBindGroupLayoutEntry(
						{
							binding: 10,
							visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
							sampler: new GPUSamplerBindingLayout(
								{
									type: GPUSamplerBindingType.FILTERING
								}
							),
						}
					),
					new GPUBindGroupLayoutEntry(
						{
							binding: 20,
							visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
							texture: new GPUTextureBindingLayout(
								{
									sampleType: GPUTextureSamplingType.FLOAT,
									viewDimension: GPUTextureViewDimension.D2,
									multisampled: false
								}
							),
						}
					),
				],
			}
		);

		this.bufferBindGroupEntry = new GPUBindGroupEntry(
			{
				binding: this.bufferBindGroupLayoutEntry.binding,
				resource: new RCBufferBindingResource(
					{
						buffer: null,
						offset: 0,
						size: this.bufferDescriptor.size,
					}
				),
			}
		);
		this.bindGroupDescriptor = new GPUBindGroupDescriptor(
			{
				label: "mesh lambert material bind group",
				layout: null,
				entries: [
					this.bufferBindGroupEntry,
					new GPUBindGroupEntry(
						{
							binding: 10,
							resource: null,
						}
					),
					new GPUBindGroupEntry(
						{
							binding: 20,
							resource: null,
						}
					),
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