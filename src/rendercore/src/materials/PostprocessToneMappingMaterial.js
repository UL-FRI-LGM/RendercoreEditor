import { MeshMaterial } from "./MeshMaterial.js";
import { BufferBindingType } from "../core/RC/resource_binding/BufferBindingType.js";
import { RCBufferBindingResource } from "../core/RCBufferBindingResource.js";
import { SamplerBindingLayout } from "../core/RC/resource_binding/SamplerBindingLayout.js";
import { SamplerBindingType } from "../core/RC/resource_binding/SamplerBindingType.js";
import { TextureBindingLayout } from "../core/RC/resource_binding/TextureBindingLayout.js";
import { TextureSamplingType } from "../core/RC/resource_binding/TextureSamplingType.js";
import { TextureViewDimension } from "../core/RC/resource_binding/TextureViewDimension.js";
import { BufferDescriptor } from "../core/RC/buffers/BufferDescriptor.js";
import { TextureDescriptor } from "../core/RC/textures/TextureDescriptor.js";
import { Extent3D } from "../core/RC/textures/Extent3D.js";
import { SamplerDescriptor } from "../core/RC/samplers/SamplerDescriptor.js";
import { FilterMode } from "../core/RC/samplers/FilterMode.js";
import { BufferUsage } from "../core/RC/buffers/BufferUsage.js";
import { BindGroupLayoutEntry } from "../core/RC/resource_binding/BindGroupLayoutEntry.js";
import { BindGroupEntry } from "../core/RC/resource_binding/BindGroupEntry.js";
import { ShaderStage } from "../core/RC/resource_binding/ShaderStage.js";
import { ResourceBinding } from "../core/data_layouts/ResourceBinding.js";
import { BufferSetInstruction } from "../core/data_layouts/BufferSetInstruction.js";
import { TextureFormat } from "../core/RC/textures/TextureFormat.js";
import { BufferBindingLayout } from "../core/RC/resource_binding/BufferBindingLayout.js";
import { TextureUsage } from "../core/RC/textures/TextureUsage.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";
import { InstructionCache } from "../core/data_layouts/InstructionCache.js";
import { Float32ArrayT2 } from "../core/Float32ArrayT2.js";
import { Layout } from "../core/data_layouts/Layout.js";
import { Source } from "../core/data_layouts/Source.js";
import { Destination } from "../core/data_layouts/Destination.js";


export class PostprocessToneMappingMaterial extends MeshMaterial {


	static MODE = {
		REINHARD: 0.0,
		EXPOSURE: 1.0,
	};

	static DEFAULT = {
		TYPE: "PostprocessToneMappingMaterial",
		NAME: "",

		RESOURCE_PACK: new ResourcePack({ name: "RP - POSTPROCESS TONE MAPPING MATERIAL" }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: "IC - POINT BASIC MATERIAL" },
			[
				...MeshMaterial.DEFAULT.INSTRUCTION_CACHE.clone(),

				[
					"MODE",
					new BufferSetInstruction(
						{
							label: "MODE",

							number: 0,
							target: ResourceBinding.TARGET.INTERNAL,

							source: new Source(
								{
									arrayBuffer: new Float32ArrayT2({}, 1),
									layout: new Layout(
										{
											offset: (0),
										}
									)
								}
							),
							destination: new Destination(
								{
									buffer: null,
									layout: new Layout(
										{
											offset: (0)
										}
									)
								}
							),
							size: (1)
						}
					)
				],
				[
					"gamma",
					new BufferSetInstruction(
						{
							label: "gamma",

							number: 0,
							target: ResourceBinding.TARGET.INTERNAL,

							source: new Source(
								{
									arrayBuffer: new Float32ArrayT2({}, 1),
									layout: new Layout(
										{
											offset: (0),
										}
									)
								}
							),
							destination: new Destination(
								{
									buffer: null,
									layout: new Layout(
										{
											offset: (1)
										}
									)
								}
							),
							size: (1)
						}
					)
				],
				[
					"exposure",
					new BufferSetInstruction(
						{
							label: "exposure",

							number: 0,
							target: ResourceBinding.TARGET.INTERNAL,

							source: new Source(
								{
									arrayBuffer: new Float32ArrayT2({}, 1),
									layout: new Layout(
										{
											offset: (0),
										}
									)
								}
							),
							destination: new Destination(
								{
									buffer: null,
									layout: new Layout(
										{
											offset: (2)
										}
									)
								}
							),
							size: (1)
						}
					)
				]
			]
		),

		SHADER_PATH: "/src/rendercore/src/shaders/post_process/",
		PROGRAM_NAME: "toneMapping",

		MODE: PostprocessToneMappingMaterial.MODE.REINHARD,
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

				type: (args.type !== undefined) ? args.type : PostprocessToneMappingMaterial.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : PostprocessToneMappingMaterial.DEFAULT.NAME,

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : PostprocessToneMappingMaterial.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : PostprocessToneMappingMaterial.DEFAULT.INSTRUCTION_CACHE.clone(),

				shaderPath: (args.shaderPath !== undefined) ? args.shaderPath : PostprocessToneMappingMaterial.DEFAULT.SHADER_PATH,
				programName: (args.programName !== undefined) ? args.programName : PostprocessToneMappingMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : new Map(),
				attributes: (args.attributes !== undefined) ? args.attributes : new Map(),

				maxBuffers: 1,
				maxTextures: 1,
				maxSamplers: 1,
			},
		);

		this.resourcePack.setResourceBindingInternal(
			3,
			0,
			new ResourceBinding(
				{
					number: 0,
					arrayBuffer: new Float32Array(1*4),
					
					resourceDescriptor: new BufferDescriptor(
						{
							label: "mesh tone mapping material buffer",
							size: (1*4),
							usage: BufferUsage.UNIFORM | BufferUsage.COPY_DST,
							mappedAtCreation: false,					
						}
					),
					bindGroupLayoutEntry: new BindGroupLayoutEntry(
						{
							binding: 0,
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
							binding: 0,
							resource: new RCBufferBindingResource(
								{
									buffer: null,
									offset: 0,
									size: (1*4) * 4,
								}
							),
						}
					),
				}
			)
		);
		this.resourcePack.setResourceBindingInternal(
			3,
			10,
			new ResourceBinding(
				{
					number: 10,
					arrayBuffer: new Uint8ClampedArray([255, 0, 255, 255]),
					
					resourceDescriptor: new TextureDescriptor(
						{
							label: "mesh tone mapping material texture 0",
							size: new Extent3D({ width: 1, height: 1, depthOrArrayLayers: 1 }),
							format: TextureFormat.RGBA_8_UNORM,
							usage: TextureUsage.TEXTURE_BINDING | TextureUsage.COPY_DST,				
						}
					),
					bindGroupLayoutEntry: new BindGroupLayoutEntry(
						{
							binding: 10,
							visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
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
		);
		this.resourcePack.setResourceBindingInternal(
			3,
			20,
			new ResourceBinding(
				{
					number: 20,
					arrayBuffer: null,
					
					resourceDescriptor: new SamplerDescriptor(
						{
							label: "mesh tone mapping material sampler 0",
							magFilter: FilterMode.LINEAR,
							minFilter: FilterMode.LINEAR,
							mipmapFilter: FilterMode.LINEAR,
						}
					),
					bindGroupLayoutEntry: new BindGroupLayoutEntry(
						{
							binding: 20,
							visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
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
		);

		this.MODE = (args.MODE !== undefined) ? args.MODE : PostprocessToneMappingMaterial.DEFAULT.MODE;
		this.gamma = (args.gamma !== undefined) ? args.gamma : PostprocessToneMappingMaterial.DEFAULT.GAMMA;
		this.exposure = (args.exposure !== undefined) ? args.exposure : PostprocessToneMappingMaterial.DEFAULT.EXPOSURE;
	}


	get MODE() { return this.#MODE; }
	set MODE(MODE) { 
		this.#MODE = MODE;

		const instruction = this.instructionCache.get("MODE");
		instruction.source.arrayBuffer.set([MODE]);


		this.resourcePack.setResourceBindingValueInternal(3, 0, instruction);
	}
	get gamma() { return this.#gamma; }
	set gamma(gamma) { 
		this.#gamma = gamma;

		const instruction = this.instructionCache.get("gamma");
		instruction.source.arrayBuffer.set([gamma]);


		this.resourcePack.setResourceBindingValueInternal(3, 0, instruction);
	}
	get exposure() { return this.#exposure; }
	set exposure(exposure) { 
		this.#exposure = exposure;

		const instruction = this.instructionCache.get("exposure");
		instruction.source.arrayBuffer.set([exposure]);


		this.resourcePack.setResourceBindingValueInternal(3, 0, instruction);
	}
};
