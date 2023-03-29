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
import { UniformGroupDescriptor } from "../core/data layouts/UniformGroupDescriptor.js";
import { BindGroupDescriptor } from "../core/RC/resource binding/BindGroupDescriptor.js";
import { BindGroupLayoutEntry } from "../core/RC/resource binding/BindGroupLayoutEntry.js";
import { BindGroupLayoutDescriptor } from "../core/RC/resource binding/BindGroupLayoutDescriptor.js";
import { BindGroupEntry } from "../core/RC/resource binding/BindGroupEntry.js";
import { ShaderStage } from "../core/RC/resource binding/ShaderStage.js";
import { ResourceBinding } from "../core/data layouts/ResourceBinding.js";


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

		this.uniformGroupDescriptor = new UniformGroupDescriptor(
			{
				label: "mesh basic resource material group",
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
											label: "mesh basic material buffer",
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
											label: "mesh basic material texture 0",
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
											label: "mesh basic material sampler 0",
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

				// bindingDescriptors: [

				// ],
				bindGroupLayoutDescriptor: new BindGroupLayoutDescriptor(
					{
						label: "mesh basic material bind group layout",
						entries: [

						],
					}
				),
				bindGroupDescriptor: new BindGroupDescriptor(
					{
						label: "mesh basic material bind group",
						layout: null,
						entries: [

						],
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
		this.setUniform(
			"emissive",
			{
				bindingNumber: 0,
				target: ResourceBinding.TARGET.INTERNAL,

				bufferOffset: (0*4) * 4,
				data: emissive.arrayBuffer.buffer,
				dataOffset: 0,
				size: (4) * 4,

				source: {

				},
				destination: {
					buffer: null,

					bufferOffset: (0*4) * 4,
				}
			}
		);
	}
	get diffuse() { return this.#diffuse; }
	set diffuse(diffuse) { 
		this.#diffuse = diffuse;
		this.setUniform(
			"diffuse",
			{
				bindingNumber: 0,
				target: ResourceBinding.TARGET.INTERNAL,

				bufferOffset: (1*4) * 4,
				data: diffuse.arrayBuffer.buffer,
				dataOffset: 0,
				size: (4) * 4
			}
		);
	}
};