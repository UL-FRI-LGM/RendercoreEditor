import { MeshMaterial } from "./MeshMaterial.js";
import { Color4 } from "../math/Color4.js";
import { GPUBufferBindingLayout } from "../core/DICTS/GPUBufferBindingLayout.js";
import { GPUBufferBindingType } from "../core/ENUM/GPUBufferBindingType.js";
import { RCBufferBindingResource } from "../core/RCBufferBindingResource.js";
import { BufferDescriptor } from "../core/RC/buffers/BufferDescriptor.js";
import { TextureDescriptor } from "../core/RC/textures/TextureDescriptor.js";
import { GPUExtent3D } from "../core/DICTS/GPUExtent3D.js";
import { GPUTextureFormat } from "../core/ENUM/GPUTextureFormat.js";
import { GPUTextureUsage } from "../core/NAMESPACE/GPUTextureUsage.js";
import { GPUSamplerBindingLayout } from "../core/DICTS/GPUSamplerBindingLayout.js";
import { GPUSamplerBindingType } from "../core/ENUM/GPUSamplerBindingType.js";
import { GPUTextureBindingLayout } from "../core/DICTS/GPUTextureBindingLayout.js";
import { GPUTextureSamplingType } from "../core/ENUM/GPUTextureSamplingType.js";
import { GPUTextureViewDimension } from "../core/ENUM/GPUTextureViewDimension.js";
import { SamplerDescriptor } from "../core/RC/samplers/SamplerDescriptor.js";
import { FilterMode } from "../core/RC/samplers/FilterMode.js";
import { BufferUsage } from "../core/RC/buffers/BufferUsage.js";
import { UniformDescriptor } from "../core/data layouts/UniformDescriptor.js";
import { BindGroupDescriptor } from "../core/RC/resource binding/BindGroupDescriptor.js";
import { BindGroupLayoutEntry } from "../core/RC/resource binding/BindGroupLayoutEntry.js";
import { BindGroupLayoutDescriptor } from "../core/RC/resource binding/BindGroupLayoutDescriptor.js";
import { BindGroupEntry } from "../core/RC/resource binding/BindGroupEntry.js";
import { ShaderStage } from "../core/RC/resource binding/ShaderStage.js";


export class MeshBasicMaterial extends MeshMaterial {
	
	
	static DEFAULT = {
		NAME: "",
		TYPE: "MeshBasicMaterial",

		SHADER_PATH: "/src/shaders/basic/",
		PROGRAM_NAME: "basic_flat",
	};


	#emissive;
	#diffuse;


	constructor(args = {}) {
		super(
			{
				...args,
				
				name: (args.name !== undefined) ? args.name : MeshBasicMaterial.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : MeshBasicMaterial.DEFAULT.TYPE,

				shaderPath: (args.shaderPath !== undefined) ? args.shaderPath : MeshBasicMaterial.DEFAULT.SHADER_PATH,
				programName: (args.programName !== undefined) ? args.programName : MeshBasicMaterial.DEFAULT.PROGRAM_NAME,
			
				uniforms: (args.uniforms !== undefined) ? args.uniforms : new Map(),
				attributes: (args.attributes !== undefined) ? args.attributes : new Map(),
			},
		);

		this.emissive = (args.emissive !== undefined) ? args.emissive : new Color4(0, 0, 0, 0);
		this.diffuse = (args.diffuse !== undefined) ? args.diffuse : new Color4(Math.random(), Math.random(), Math.random(), Math.random());
	
		this.uniformDescriptor = new UniformDescriptor(
			{
				resourceDescriptors: [
					new BufferDescriptor(
						{
							label: "mesh basic material buffer",
							// size: (2*4) * 4,
							size: (2*4),
							usage: BufferUsage.UNIFORM | BufferUsage.COPY_DST,
							mappedAtCreation: false,
			
							arrayBuffer: new Float32Array(2*4),
						}
					),
					new TextureDescriptor(
						{
							label: "mesh basic material texture 0",
							size: new GPUExtent3D({ width: 1, height: 1, depthOrArrayLayers: 1 }),
							// format: GPUTextureFormat.RGBA_8_UNORM_SRGB,
							format: GPUTextureFormat.RGBA_8_UNORM,
							usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
				
							arrayBuffer: new Uint8ClampedArray([255, 0, 255, 255]),
						}
					),
					new TextureDescriptor(
						{
							label: "mesh basic material texture 1",
							size: new GPUExtent3D({ width: 1, height: 1, depthOrArrayLayers: 1 }),
							// format: GPUTextureFormat.RGBA_8_UNORM_SRGB,
							format: GPUTextureFormat.RGBA_8_UNORM,
							usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
				
							arrayBuffer: new Uint8ClampedArray([255, 0, 255, 255]),
						}
					),
					new TextureDescriptor(
						{
							label: "mesh basic material texture 2",
							size: new GPUExtent3D({ width: 1, height: 1, depthOrArrayLayers: 1 }),
							// format: GPUTextureFormat.RGBA_8_UNORM_SRGB,
							format: GPUTextureFormat.RGBA_8_UNORM,
							usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
				
							arrayBuffer: new Uint8ClampedArray([255, 0, 255, 255]),
						}
					),
					new TextureDescriptor(
						{
							label: "mesh basic material texture 3",
							size: new GPUExtent3D({ width: 1, height: 1, depthOrArrayLayers: 1 }),
							// format: GPUTextureFormat.RGBA_8_UNORM_SRGB,
							format: GPUTextureFormat.RGBA_8_UNORM,
							usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
				
							arrayBuffer: new Uint8ClampedArray([255, 0, 255, 255]),
						}
					),
					new SamplerDescriptor(
						{
							label: "mesh basic material sampler 0",
							magFilter: FilterMode.LINEAR,
							minFilter: FilterMode.LINEAR,
							mipmapFilter: FilterMode.LINEAR,
						}
					),
					new SamplerDescriptor(
						{
							label: "mesh basic material sampler 1",
							magFilter: FilterMode.LINEAR,
							minFilter: FilterMode.LINEAR,
							mipmapFilter: FilterMode.LINEAR,
						}
					),
					new SamplerDescriptor(
						{
							label: "mesh basic material sampler 2",
							magFilter: FilterMode.LINEAR,
							minFilter: FilterMode.LINEAR,
							mipmapFilter: FilterMode.LINEAR,
						}
					),
					new SamplerDescriptor(
						{
							label: "mesh basic material sampler 3",
							magFilter: FilterMode.LINEAR,
							minFilter: FilterMode.LINEAR,
							mipmapFilter: FilterMode.LINEAR,
						}
					)
				],
				bindGroupLayoutDescriptor: new BindGroupLayoutDescriptor(
					{
						label: "mesh basic material bind group layout",
						entries: [
							new BindGroupLayoutEntry(
								{
									binding: 0,
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
							new BindGroupLayoutEntry(
								{
									binding: 10,
									visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
									texture: new GPUTextureBindingLayout(
										{
											sampleType: GPUTextureSamplingType.FLOAT,
											viewDimension: GPUTextureViewDimension.D2,
											multisampled: false
										}
									),
								}
							),
							new BindGroupLayoutEntry(
								{
									binding: 11,
									visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
									texture: new GPUTextureBindingLayout(
										{
											sampleType: GPUTextureSamplingType.FLOAT,
											viewDimension: GPUTextureViewDimension.D2,
											multisampled: false
										}
									),
								}
							),
							new BindGroupLayoutEntry(
								{
									binding: 12,
									visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
									texture: new GPUTextureBindingLayout(
										{
											sampleType: GPUTextureSamplingType.FLOAT,
											viewDimension: GPUTextureViewDimension.D2,
											multisampled: false
										}
									),
								}
							),
							new BindGroupLayoutEntry(
								{
									binding: 13,
									visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
									texture: new GPUTextureBindingLayout(
										{
											sampleType: GPUTextureSamplingType.FLOAT,
											viewDimension: GPUTextureViewDimension.D2,
											multisampled: false
										}
									),
								}
							),
							new BindGroupLayoutEntry(
								{
									binding: 20,
									visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
									sampler: new GPUSamplerBindingLayout(
										{
											type: GPUSamplerBindingType.FILTERING
										}
									),
								}
							),
							new BindGroupLayoutEntry(
								{
									binding: 21,
									visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
									sampler: new GPUSamplerBindingLayout(
										{
											type: GPUSamplerBindingType.FILTERING
										}
									),
								}
							),
							new BindGroupLayoutEntry(
								{
									binding: 22,
									visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
									sampler: new GPUSamplerBindingLayout(
										{
											type: GPUSamplerBindingType.FILTERING
										}
									),
								}
							),
							new BindGroupLayoutEntry(
								{
									binding: 23,
									visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
									sampler: new GPUSamplerBindingLayout(
										{
											type: GPUSamplerBindingType.FILTERING
										}
									),
								}
							),
						],
					}
				),
				bindGroupDescriptor: new BindGroupDescriptor(
					{
						label: "mesh basic material bind group",
						layout: null,
						entries: [
							new BindGroupEntry(
								{
									binding: 0,
									resource: new RCBufferBindingResource(
										{
											buffer: null,
											offset: 0,
											size: (2*4) * 4,
										}
									),
								}
							),
							new BindGroupEntry(
								{
									binding: 10,
									resource: null,
								}
							),
							new BindGroupEntry(
								{
									binding: 11,
									resource: null,
								}
							),
							new BindGroupEntry(
								{
									binding: 12,
									resource: null,
								}
							),
							new BindGroupEntry(
								{
									binding: 13,
									resource: null,
								}
							),
							new BindGroupEntry(
								{
									binding: 20,
									resource: null,
								}
							),
							new BindGroupEntry(
								{
									binding: 21,
									resource: null,
								}
							),
							new BindGroupEntry(
								{
									binding: 22,
									resource: null,
								}
							),
							new BindGroupEntry(
								{
									binding: 23,
									resource: null,
								}
							),
						],
					}
				)
			}
		);
	}


	get emissive() { return this.#emissive; }
	set emissive(emissive) { 
		this.#emissive = emissive;
		this.setUniform("emissive", {bufferOffset: 0*4*4, data: emissive.arrayBuffer.buffer, dataOffset: 0, size: 4*4});
	}
	get diffuse() { return this.#diffuse; }
	set diffuse(diffuse) { 
		this.#diffuse = diffuse;
		this.setUniform("diffuse",  {bufferOffset: 1*4*4, data: diffuse.arrayBuffer.buffer, dataOffset: 0, size: 4*4});
	}
};