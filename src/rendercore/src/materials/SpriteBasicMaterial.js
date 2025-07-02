import { QuadBasicMaterial } from "./QuadBasicMaterial.js";
import { Color4 } from "../math/Color4.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";
import { InstructionCache } from "../core/data_layouts/InstructionCache.js";
import { BufferSetInstruction } from "../core/data_layouts/BufferSetInstruction.js";
import { Destination } from "../core/data_layouts/Destination.js";
import { Layout } from "../core/data_layouts/Layout.js";
import { ResourceBinding } from "../core/data_layouts/ResourceBinding.js";
import { Source } from "../core/data_layouts/Source.js";
import { Float32ArrayT2 } from "../core/Float32ArrayT2.js";
import { BufferDescriptor } from "../core/RC/buffers/BufferDescriptor.js";
import { BufferUsage } from "../core/RC/buffers/BufferUsage.js";
import { BindGroupEntry } from "../core/RC/resource_binding/BindGroupEntry.js";
import { BindGroupLayoutEntry } from "../core/RC/resource_binding/BindGroupLayoutEntry.js";
import { BufferBindingLayout } from "../core/RC/resource_binding/BufferBindingLayout.js";
import { BufferBindingType } from "../core/RC/resource_binding/BufferBindingType.js";
import { ShaderStage } from "../core/RC/resource_binding/ShaderStage.js";
import { RCBufferBindingResource } from "../core/RCBufferBindingResource.js";


export class SpriteBasicMaterial extends QuadBasicMaterial {


	static SPACE = {
		VIEW: 0.0,
		SCREEN: 1.0,
	};

	static DEFAULT = {
		TYPE: "SpriteBasicMaterial",
		NAME: "",

		RESOURCE_PACK: new ResourcePack({ name: "RP - SPRITE BASIC MATERIAL" }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: "IC - SPRITE BASIC MATERIAL" },
			[
				...QuadBasicMaterial.DEFAULT.INSTRUCTION_CACHE.clone(),

				[
					"SPACE",
					new BufferSetInstruction(
						{
							label: "SPACE",

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
											offset: (3*4)
										}
									)
								}
							),
							size: (1)
						}
					)
				],
			]
		),

		SHADER_PATH: "/src/rendercore/src/shaders/basic/sprite/",
		PROGRAM_NAME: "basic_sprite_smooth",

		EMISSIVE: new Color4(0, 0, 0, 0),
		DIFFUSE: new Color4(Math.random(), Math.random(), Math.random(), Math.random()),

		SPACE: SpriteBasicMaterial.SPACE.VIEW,
	};


	#SPACE;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : SpriteBasicMaterial.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SpriteBasicMaterial.DEFAULT.NAME,

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : SpriteBasicMaterial.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : SpriteBasicMaterial.DEFAULT.INSTRUCTION_CACHE.clone(),

				shaderPath: (args.shaderPath !== undefined) ? args.shaderPath : SpriteBasicMaterial.DEFAULT.SHADER_PATH,
				programName: (args.programName !== undefined) ? args.programName : SpriteBasicMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : new Map(),
				attributes: (args.attributes !== undefined) ? args.attributes : new Map(),

				emissive: (args.emissive !== undefined) ? args.emissive : SpriteBasicMaterial.DEFAULT.EMISSIVE.clone(),
				diffuse: (args.diffuse !== undefined) ? args.diffuse : SpriteBasicMaterial.DEFAULT.DIFFUSE.clone(),
			},
		);

		this.resourcePack.setResourceBindingInternal(
			3,
			0,
			new ResourceBinding(
				{
					number: 0,
					arrayBuffer: new Float32Array(3*4 + 4),
					
					resourceDescriptor: new BufferDescriptor(
						{
							label: "sprite basic material buffer",
							size: (3*4 + 4),
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
									size: (3*4 + 4) * 4,
								}
							),
						}
					),
				}
			)
		);

		this.SPACE = (args.SPACE !== undefined) ? args.SPACE : SpriteBasicMaterial.DEFAULT.SPACE;
	}


	get SPACE() { return this.#SPACE; }
	set SPACE(SPACE) { 
		this.#SPACE = SPACE;

		const instruction = this.instructionCache.get("SPACE");
		instruction.source.arrayBuffer.set([SPACE]);


		this.resourcePack.setResourceBindingValueInternal(3, 0, instruction);
	}
};
