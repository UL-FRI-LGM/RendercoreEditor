import { MeshMaterial } from "./MeshMaterial.js";
import { BufferBindingType } from "../core/RC/resource_binding/BufferBindingType.js";
import { RCBufferBindingResource } from "../core/RCBufferBindingResource.js";
import { SamplerBindingLayout } from "../core/RC/resource_binding/SamplerBindingLayout.js";
import { SamplerBindingType } from "../core/RC/resource_binding/SamplerBindingType.js";
import { TextureBindingLayout } from "../core/RC/resource_binding/TextureBindingLayout.js";
import { TextureSamplingType } from "../core/RC/resource_binding/TextureSamplingType.js";
import { TextureViewDimension } from "../core/RC/resource_binding/TextureViewDimension.js";
import { BufferDescriptor } from "../core/RC/buffers/BufferDescriptor.js";
import { BindGroupLayoutDescriptor } from "../core/RC/resource_binding/BindGroupLayoutDescriptor.js";
import { TextureDescriptor } from "../core/RC/textures/TextureDescriptor.js";
import { Extent3D } from "../core/RC/textures/Extent3D.js";
import { SamplerDescriptor } from "../core/RC/samplers/SamplerDescriptor.js";
import { FilterMode } from "../core/RC/samplers/FilterMode.js";
import { BufferUsage } from "../core/RC/buffers/BufferUsage.js";
import { UniformGroupDescriptor } from "../core/data_layouts/UniformGroupDescriptor.js";
import { BindGroupLayoutEntry } from "../core/RC/resource_binding/BindGroupLayoutEntry.js";
import { BindGroupDescriptor } from "../core/RC/resource_binding/BindGroupDescriptor.js";
import { BindGroupEntry } from "../core/RC/resource_binding/BindGroupEntry.js";
import { ShaderStage } from "../core/RC/resource_binding/ShaderStage.js";
import { StorageTextureBindingLayout } from "../core/RC/resource_binding/StorageTextureBindingLayout.js";
import { ResourceBinding } from "../core/data_layouts/ResourceBinding.js";
import { BufferSetInstruction } from "../core/data_layouts/BufferSetInstruction.js";
import { TextureFormat } from "../core/RC/textures/TextureFormat.js";
import { BufferBindingLayout } from "../core/RC/resource_binding/BufferBindingLayout.js";
import { TextureUsage } from "../core/RC/textures/TextureUsage.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";
import { InstructionCache } from "../core/data_layouts/InstructionCache.js";


export class PostprocessInvertMaterial extends MeshMaterial {
	
	
	static MODE = {
		REINHARD: 0.0,
		EXPOSURE: 1.0,
	};

	static DEFAULT = {
		NAME: "",
		TYPE: "PostprocessInvertMaterial",

		RESOURCE_PACK: new ResourcePack({ name: "RP - POSTPROCESS INVERT MATERIAL" }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: "IC - POINT BASIC MATERIAL" },
			[
				...MeshMaterial.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),

		SHADER_PATH: "/src/rendercore/src/shaders/post_process/",
		PROGRAM_NAME: "invert",

		MODE: PostprocessInvertMaterial.MODE.REINHARD,
		GAMMA: 2.2,
		EXPOSURE: 1.0,
	};


	#MODE;
	#gamma;
	#exposure;


	constructor(args = {}) {
		super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : PostprocessInvertMaterial.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : PostprocessInvertMaterial.DEFAULT.TYPE,

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : PostprocessInvertMaterial.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : PostprocessInvertMaterial.DEFAULT.INSTRUCTION_CACHE.clone(),

				shaderPath: (args.shaderPath !== undefined) ? args.shaderPath : PostprocessInvertMaterial.DEFAULT.SHADER_PATH,
				programName: (args.programName !== undefined) ? args.programName : PostprocessInvertMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : new Map(),
				attributes: (args.attributes !== undefined) ? args.attributes : new Map(),

				maxBuffers: 10,
				maxTextures: 10,
				maxSamplers: 10,
			},
		);

		this.uniformGroupDescriptor = new UniformGroupDescriptor(
			{
				label: "mesh invert material group",
				number: 0,
				resourceBindingsInternal: new Map(
					[
						[
							0,
							new ResourceBinding(
								{
									number: 0,
									arrayBuffer: new Float32Array(2*4),
									resourceDescriptor: new BufferDescriptor(
										{
											label: "mesh invert material buffer",
											size: (2*4),
											usage: BufferUsage.UNIFORM | BufferUsage.COPY_DST,
											mappedAtCreation: false,					
										}
									),
									bindGroupLayoutEntry: new BindGroupLayoutEntry(
										{
											binding: 0,
											visibility: ShaderStage.COMPUTE,
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
								}
							)
						],
						[
							10,
							new ResourceBinding(
								{
									number: 10,
									arrayBuffer: new Uint8ClampedArray([255, 0, 255, 255]),
									resourceDescriptor: new TextureDescriptor(
										{
											label: "mesh invert material texture 0",
											size: new Extent3D({ width: 1, height: 1, depthOrArrayLayers: 1 }),
											format: TextureFormat.RGBA_8_UNORM,
											usage: TextureUsage.TEXTURE_BINDING | TextureUsage.COPY_DST,				
										}
									),
									bindGroupLayoutEntry: new BindGroupLayoutEntry(
										{
											binding: 10,
											visibility: ShaderStage.COMPUTE,
											texture: new TextureBindingLayout(
												{
													sampleType: TextureSamplingType.UNFILTERABLE_FLOAT,
													viewDimension: TextureViewDimension.D2,
													multisampled: false
												}
											),
										}
									),
									bindGroupEntry: new BindGroupEntry(
										{
											binding: 10,
											resource: null,
										}
									),
								}
							)
						],
						[
							11,
							new ResourceBinding(
								{
									number: 11,
									arrayBuffer: new Uint8ClampedArray([255, 0, 255, 255]),
									
									resourceDescriptor: new TextureDescriptor(
										{
											label: "mesh invert material texture out",
											size: new Extent3D({ width: 128, height: 128, depthOrArrayLayers: 1 }),
											format: TextureFormat.RGBA_8_UNORM,
											usage: TextureUsage.TEXTURE_BINDING | TextureUsage.STORAGE_BINDING,				
										}
									),
									bindGroupLayoutEntry: new BindGroupLayoutEntry(
										{
											binding: 11,
											visibility: ShaderStage.COMPUTE,
											storageTexture: new StorageTextureBindingLayout(
												{
													access: "write-only",
													format: TextureFormat.RGBA_8_UNORM,
													viewDimension: TextureViewDimension.D2
												}
											),
										}
									),
									bindGroupEntry: new BindGroupEntry(
										{
											binding: 11,
											resource: null,
										}
									),
								}
							)
						],
						[
							20,
							new ResourceBinding(
								{
									number: 20,
									arrayBuffer: null,
									
									resourceDescriptor: new SamplerDescriptor(
										{
											label: "mesh invert material sampler 0",
											magFilter: FilterMode.LINEAR,
											minFilter: FilterMode.LINEAR,
											mipmapFilter: FilterMode.LINEAR,
										}
									),
									bindGroupLayoutEntry: new BindGroupLayoutEntry(
										{
											binding: 20,
											visibility: ShaderStage.COMPUTE,
											sampler: new SamplerBindingLayout(
												{
													type: SamplerBindingType.NON_FILTERING
												}
											),
										}
									),
									bindGroupEntry: new BindGroupEntry(
										{
											binding: 20,
											resource: null,
										}
									),
								}
							)
						],
					]
				),
				resourceBindingsExternal: new Map(),

				// bindingDescriptors: [
					
				// ],
				bindGroupLayoutDescriptor: new BindGroupLayoutDescriptor(
					{
						label: "mesh invert material bind group layout",
						entries: [
							
						],
					}
				),
				bindGroupDescriptor: new BindGroupDescriptor(
					{
						label: "mesh invert material bind group",
						layout: null,
						entries: [
						
						],
					}
				)
			}
		);

		this.MODE = (args.MODE !== undefined) ? args.MODE : PostprocessInvertMaterial.DEFAULT.MODE;
		this.gamma = (args.gamma !== undefined) ? args.gamma : PostprocessInvertMaterial.DEFAULT.GAMMA;
		this.exposure = (args.exposure !== undefined) ? args.exposure : PostprocessInvertMaterial.DEFAULT.EXPOSURE;
	}


	get MODE() { return this.#MODE; }
	set MODE(MODE) { 
		this.#MODE = MODE;
		this.setUniform(
			"MODE",
			new BufferSetInstruction(
				{
					label: "MODE",

					number: 0,
					target: ResourceBinding.TARGET.INTERNAL,

					source: {
						arrayBuffer: new Float32Array([MODE]),
						layout: {
							offset: (0),
						}
					},
					destination: {
						buffer: null,
						layout: {
							offset: (0)
						}
					},
					size: (1)
				}
			)
		);
	}
	get gamma() { return this.#gamma; }
	set gamma(gamma) { 
		this.#gamma = gamma;
		this.setUniform(
			"gamma",
			new BufferSetInstruction(
				{
					label: "gamma",

					number: 0,
					target: ResourceBinding.TARGET.INTERNAL,

					source: {
						arrayBuffer: new Float32Array([gamma]),
						layout: {
							offset: (0),
						}
					},
					destination: {
						buffer: null,
						layout: {
							offset: (1)
						}
					},
					size: (1)
				}
			)
		);
	}
	get exposure() { return this.#exposure; }
	set exposure(exposure) { 
		this.#exposure = exposure;
		this.setUniform(
			"exposure",
			new BufferSetInstruction(
				{
					label: "exposure",

					number: 0,
					target: ResourceBinding.TARGET.INTERNAL,

					source: {
						arrayBuffer: new Float32Array([exposure]),
						layout: {
							offset: (0),
						}
					},
					destination: {
						buffer: null,
						layout: {
							offset: (2)
						}
					},
					size: (1)
				}
			)
		);
	}
};