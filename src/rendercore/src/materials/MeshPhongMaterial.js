import { MeshMaterial } from "../RenderCore.js";
import { Color4 } from "../math/Color4.js";
import { BufferBindingLayout } from "../core/RC/resource_binding/BufferBindingLayout.js";
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
import { TextureUsage } from "../core/RC/textures/TextureUsage.js";
import { SamplerDescriptor } from "../core/RC/samplers/SamplerDescriptor.js";
import { FilterMode } from "../core/RC/samplers/FilterMode.js";
import { BufferUsage } from "../core/RC/buffers/BufferUsage.js";
import { BindGroupLayoutEntry } from "../core/RC/resource_binding/BindGroupLayoutEntry.js";
import { BindGroupEntry } from "../core/RC/resource_binding/BindGroupEntry.js";
import { ShaderStage } from "../core/RC/resource_binding/ShaderStage.js";
import { ResourceBinding } from "../core/data_layouts/ResourceBinding.js";
import { BufferSetInstruction } from "../core/data_layouts/BufferSetInstruction.js";
import { TextureSetInstruction } from "../core/data_layouts/TextureSetInstruction.js";
import { TextureAspect } from "../core/RC/textures/TextureAspect.js";
import { TextureFormat } from "../core/RC/textures/TextureFormat.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";
import { InstructionCache } from "../core/data_layouts/InstructionCache.js";


export class MeshPhongMaterial extends MeshMaterial {
	
	
	static DEFAULT = {
		NAME: "",
		TYPE: "MeshPhongMaterial",

		RESOURCE_PACK: new ResourcePack({ name: "RP - MESH PHONG MATERIAL" }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: "IC - MESH PHONG MATERIAL" },
			[
				...MeshMaterial.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),

		SHADER_PATH: "/src/rendercore/src/shaders/phong/",
		PROGRAM_NAME: "phong_smooth",
	};


	#emissive;
	#diffuse;
	#specular;

	#numMaps;


	constructor(args = {}) {
		super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : MeshPhongMaterial.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : MeshPhongMaterial.DEFAULT.TYPE,

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : MeshPhongMaterial.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : MeshPhongMaterial.DEFAULT.INSTRUCTION_CACHE.clone(),

				shaderPath: (args.shaderPath !== undefined) ? args.shaderPath : MeshPhongMaterial.DEFAULT.SHADER_PATH,
				programName: (args.programName !== undefined) ? args.programName : MeshPhongMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : new Map(),
				attributes: (args.attributes !== undefined) ? args.attributes : new Map(),
			},
		);

		this.resourcePack.setResourceBindingInternal(
			3,
			0,
			new ResourceBinding(
				{
					number: 0,
					arrayBuffer: new Float32Array(4*4),
					resourceDescriptor: new BufferDescriptor(
						{
							label: "mesh phong material buffer",
							size: (4*4),
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
									size: (4*4) * 4,
								}
							),
						}
					),
				}
			)
		);
		for (let i = 0; i < 4; i++) {
			this.resourcePack.setResourceBindingInternal(
				3,
				10 + i,
				new ResourceBinding(
					{
						number: 10 + i,
						arrayBuffer: new Uint8ClampedArray([255, 0, 255, 255]),
						
						resourceDescriptor: new TextureDescriptor(
							{
								label: `mesh phong material texture ${i}`,
								size: new Extent3D({ width: 1, height: 1, depthOrArrayLayers: 1 }),
								format: TextureFormat.RGBA_8_UNORM,
								usage: TextureUsage.TEXTURE_BINDING | TextureUsage.COPY_DST,				
							}
						),
						bindGroupLayoutEntry: new BindGroupLayoutEntry(
							{
								binding: 10 + i,
								visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
								texture: new TextureBindingLayout(
									{
										sampleType: TextureSamplingType.FLOAT,
										viewDimension: TextureViewDimension.D2,
										multisampled: false
									}
								),
							}
						),
						bindGroupEntry: new BindGroupEntry(
							{
								binding: 10 + i,
								resource: null,
							}
						),
					}
				)
			);
			this.resourcePack.setResourceBindingValueInternal(
				3,
				10 + i,
				new TextureSetInstruction(
					{
						label: `mesh phong material texture ${i} set`,
			
						number: 10 + i,
						target: ResourceBinding.TARGET.INTERNAL,
				
						source: {
							arrayBuffer: new Uint8ClampedArray([255, 255, 255, 255]),
							layout: {
								offset: 0,
								width: 1,
								height: 1,
							},
						},
						destination: {
							texture: null,
							layout: {
								mipLevel: 0,
								origin: {
									x: 0,
									y: 0,
									z: 0,
								},
								aspect: TextureAspect.ALL,
							}
						},
						size: {
							width: 1,
							height: 1,
							depthOrArrayLayers: 1
						},
					}
				)
			);
		}
		for (let i = 0; i < 4; i++) {
			this.resourcePack.setResourceBindingInternal(
				3,
				20 + i,
				new ResourceBinding(
					{
						number: 20 + i,
						arrayBuffer: null,
						
						resourceDescriptor: new SamplerDescriptor(
							{
								label: `mesh phong material sampler ${i}`,
								magFilter: FilterMode.LINEAR,
								minFilter: FilterMode.LINEAR,
								mipmapFilter: FilterMode.LINEAR,
							}
						),
						bindGroupLayoutEntry: new BindGroupLayoutEntry(
							{
								binding: 20 + i,
								visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
								sampler: new SamplerBindingLayout(
									{
										type: SamplerBindingType.FILTERING
									}
								),
							}
						),
						bindGroupEntry: new BindGroupEntry(
							{
								binding: 20 + i,
								resource: null,
							}
						),
					}
				)
			);
		}
		// this.resourcePack.setResourceBindingInternal(
		// 	3,
		// 	32,
		// 	new ResourceBinding(
		// 		{
		// 			number: 32,
		// 			arrayBuffer: new Uint8ClampedArray([255, 0, 255, 255]),
					
		// 			resourceDescriptor: new TextureDescriptor(
		// 				{
		// 					label: "mesh phong material texture array",
		// 					size: new Extent3D({ width: 1, height: 1, depthOrArrayLayers: 4 }),
		// 					format: TextureFormat.RGBA_8_UNORM,
		// 					usage: TextureUsage.TEXTURE_BINDING | TextureUsage.COPY_DST,				
		// 				}
		// 			),
		// 			bindGroupLayoutEntry: new BindGroupLayoutEntry(
		// 				{
		// 					binding: 32,
		// 					visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
		// 					texture: new TextureBindingLayout(
		// 						{
		// 							sampleType: TextureSamplingType.FLOAT,
		// 							viewDimension: TextureViewDimension.D2_ARRAY,
		// 							multisampled: false
		// 						}
		// 					),
		// 				}
		// 			),
		// 			bindGroupLayoutEntry: BindGroupLayoutEntry.CONFIGURATION.BGLE32_VVF_RT_TF,
		// 			bindGroupEntry: new BindGroupEntry(
		// 				{
		// 					binding: 32,
		// 					resource: null,
		// 				}
		// 			),
		// 		}
		// 	)
		// );

		this.emissive = (args.emissive !== undefined) ? args.emissive : new Color4(0, 0, 0, 0);
		this.diffuse = (args.diffuse !== undefined) ? args.diffuse : new Color4(Math.random(), Math.random(), Math.random(), Math.random());
		this.specular = (args.specular !== undefined) ? args.specular : new Color4(Math.random(), Math.random(), Math.random(), Math.floor(256 * Math.random()));
	}


	get emissive() { return this.#emissive; }
	set emissive(emissive) { 
		this.#emissive = emissive;

		const instruction = this.instructionCache.has("emissive") ? 
		this.instructionCache.get("emissive") : 
		this.instructionCache.set(
			"emissive",
			new BufferSetInstruction(
				{
					label: "emissive",

					number: 0,
					target: ResourceBinding.TARGET.INTERNAL,

					source: {
						arrayBuffer: emissive.arrayBuffer,
						layout: {
							offset: (0),
						}
					},
					destination: {
						buffer: null,
						layout: {
							offset: (0*4)
						}
					},
					size: (4)
				}
			)
		).get("emissive");
		instruction.source.arrayBuffer = emissive.arrayBuffer;

		this.resourcePack.setResourceBindingValueInternal(3, 0, instruction);
	}
	get diffuse() { return this.#diffuse; }
	set diffuse(diffuse) { 
		this.#diffuse = diffuse;

		const instruction = this.instructionCache.has("diffuse") ? 
		this.instructionCache.get("diffuse") : 
		this.instructionCache.set(
			"diffuse",
			new BufferSetInstruction(
				{
					label: "diffuse",

					number: 0,
					target: ResourceBinding.TARGET.INTERNAL,

					source: {
						arrayBuffer: diffuse.arrayBuffer,
						layout: {
							offset: (0),
						}
					},
					destination: {
						buffer: null,
						layout: {
							offset: (1*4)
						}
					},
					size: (4)
				}
			)
		).get("diffuse");
		instruction.source.arrayBuffer = diffuse.arrayBuffer;

		this.resourcePack.setResourceBindingValueInternal(3, 0, instruction);
	}
	get specular() { return this.#specular; }
	set specular(specular) { 
		this.#specular = specular;

		const instruction = this.instructionCache.has("specular") ? 
		this.instructionCache.get("specular") : 
		this.instructionCache.set(
			"specular",
			new BufferSetInstruction(
				{
					label: "specular",

					number: 0,
					target: ResourceBinding.TARGET.INTERNAL,

					source: {
						arrayBuffer: specular.arrayBuffer,
						layout: {
							offset: (0),
						}
					},
					destination: {
						buffer: null,
						layout: {
							offset: (2*4)
						}
					},
					size: (4)
				}
			)
		).get("specular");
		instruction.source.arrayBuffer = specular.arrayBuffer;

		this.resourcePack.setResourceBindingValueInternal(3, 0, instruction);
	}
	get numMaps() { return this.#numMaps; }
	set numMaps(numMaps) {
		this.#numMaps = numMaps;

		const instruction = this.instructionCache.has("numMaps") ? 
		this.instructionCache.get("numMaps") : 
		this.instructionCache.set(
			"numMaps",
			new BufferSetInstruction(
				{
					label: "numMaps",

					number: 0,
					target: ResourceBinding.TARGET.INTERNAL,

					source: {
						arrayBuffer: new Uint32Array([numMaps, 0, 0, 0]),
						layout: {
							offset: (0),
						}
					},
					destination: {
						buffer: null,
						layout: {
							offset: (3*4)
						}
					},
					size: (4)
				}
			)
		).get("numMaps");
		instruction.source.arrayBuffer = new Uint32Array([numMaps, 0, 0, 0]);

		this.resourcePack.setResourceBindingValueInternal(3, 0, instruction);
	}
};
