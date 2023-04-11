import { MeshMaterial } from "./MeshMaterial.js";
import { Color4 } from "../math/Color4.js";
import { GPUBufferBindingLayout } from "../core/DICTS/GPUBufferBindingLayout.js";
import { GPUBufferBindingType } from "../core/ENUM/GPUBufferBindingType.js";
import { RCBufferBindingResource } from "../core/RCBufferBindingResource.js";
import { GPUSamplerBindingLayout } from "../core/DICTS/GPUSamplerBindingLayout.js";
import { GPUSamplerBindingType } from "../core/ENUM/GPUSamplerBindingType.js";
import { GPUTextureBindingLayout } from "../core/DICTS/GPUTextureBindingLayout.js";
import { GPUTextureSamplingType } from "../core/ENUM/GPUTextureSamplingType.js";
import { GPUTextureViewDimension } from "../core/ENUM/GPUTextureViewDimension.js";
import { BufferDescriptor } from "../core/RC/buffers/BufferDescriptor.js";
import { BindGroupLayoutDescriptor } from "../core/RC/resource binding/BindGroupLayoutDescriptor.js";
import { TextureDescriptor } from "../core/RC/textures/TextureDescriptor.js";
import { GPUExtent3D } from "../core/DICTS/GPUExtent3D.js";
import { GPUTextureFormat } from "../core/ENUM/GPUTextureFormat.js";
import { GPUTextureUsage } from "../core/NAMESPACE/GPUTextureUsage.js";
import { SamplerDescriptor } from "../core/RC/samplers/SamplerDescriptor.js";
import { FilterMode } from "../core/RC/samplers/FilterMode.js";
import { BufferUsage } from "../core/RC/buffers/BufferUsage.js";
import { UniformGroupDescriptor } from "../core/data layouts/UniformGroupDescriptor.js";
import { BindGroupLayoutEntry } from "../core/RC/resource binding/BindGroupLayoutEntry.js";
import { BindGroupDescriptor } from "../core/RC/resource binding/BindGroupDescriptor.js";
import { BindGroupEntry } from "../core/RC/resource binding/BindGroupEntry.js";
import { ShaderStage } from "../core/RC/resource binding/ShaderStage.js";
import { ResourceBinding } from "../core/data layouts/ResourceBinding.js";
import { BufferSetInstruction } from "../core/data layouts/BufferSetInstruction.js";


export class MeshLambertMaterial extends MeshMaterial {
	
	
	static DEFAULT = {
		NAME: "",
		TYPE: "MeshLambertMaterial",

		SHADER_PATH: "/src/shaders/lambert/",
		PROGRAM_NAME: "lambert_smooth",
	};


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

		this.uniformGroupDescriptor = new UniformGroupDescriptor(
			{
				label: "mesh lambert material resource group",
				number: 3,
				resourceBindings: new Map(
					[
						[
							0,
							new ResourceBinding(
								{
									number: 0,
									arrayBuffer: new Float32Array(2*4),
									resourceDescriptor: new BufferDescriptor(
										{
											label: "mesh lambert material buffer",
											size: (2*4),
											usage: BufferUsage.UNIFORM | BufferUsage.COPY_DST,
											mappedAtCreation: false,					
										}
									),
									bindGroupLayoutEntry: new BindGroupLayoutEntry(
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
											label: "mesh lambert material texture 0",
											size: new GPUExtent3D({ width: 1, height: 1, depthOrArrayLayers: 1 }),
											format: GPUTextureFormat.RGBA_8_UNORM,
											usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,				
										}
									),
									bindGroupLayoutEntry: new BindGroupLayoutEntry(
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
							20,
							new ResourceBinding(
								{
									number: 20,
									arrayBuffer: null,
									
									resourceDescriptor: new SamplerDescriptor(
										{
											label: "mesh lambert material sampler 0",
											magFilter: FilterMode.LINEAR,
											minFilter: FilterMode.LINEAR,
											mipmapFilter: FilterMode.LINEAR,
										}
									),
									bindGroupLayoutEntry: new BindGroupLayoutEntry(
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
				resourceBindingsExteral: new Map(),

				// bindingDescriptors: new Array(),
				bindGroupLayoutDescriptor: new BindGroupLayoutDescriptor(
					{
						label: "mesh lambert material bind group layout [MLM]",
						entries: new Array(),
					}
				),
				// bindGroupLayoutDescriptor: BindGroupLayoutDescriptor.CONFIGURATION.G03_M,
				bindGroupDescriptor: new BindGroupDescriptor(
					{
						label: "mesh lambert material bind group [MLM]",
						layout: null,
						entries: new Array(),
					}
				)
			}
		);

		this.emissive = (args.emissive !== undefined) ? args.emissive : new Color4(0, 0, 0, 0);
		this.diffuse = (args.diffuse !== undefined) ? args.diffuse : new Color4(Math.random(), Math.random(), Math.random(), Math.random());
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

		this.setUniform("emissive", instruction);
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

		this.setUniform("diffuse", instruction);
	}
};