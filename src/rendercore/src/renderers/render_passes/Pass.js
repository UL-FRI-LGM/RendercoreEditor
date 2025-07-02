import { ObjectBase } from "../../core/ObjectBase.js";
import { MapT2 } from "../../core/MapT2.js";
import { BufferBindingLayout } from "../../core/RC/resource_binding/BufferBindingLayout.js";
import { BufferBindingType } from "../../core/RC/resource_binding/BufferBindingType.js";
import { BufferDescriptor } from "../../core/RC/buffers/BufferDescriptor.js";
import { BufferUsage } from "../../core/RC/buffers/BufferUsage.js";
import { BindGroupEntry } from "../../core/RC/resource_binding/BindGroupEntry.js";
import { BindGroupLayoutEntry } from "../../core/RC/resource_binding/BindGroupLayoutEntry.js";
import { ShaderStage } from "../../core/RC/resource_binding/ShaderStage.js";
import { RCBufferBindingResource } from "../../core/RCBufferBindingResource.js";
import { ResourceBinding } from "../../core/data_layouts/ResourceBinding.js";
import { ResourcePack } from "../../core/data_layouts/ResourcePack.js";
import { InstructionCache } from "../../core/data_layouts/InstructionCache.js";


export class Pass extends ObjectBase { //pass base


	static DEFAULT = {
		TYPE: "Pass",
		NAME: "",

		INITIALIZED: false,
		EXTERNAL: {
			INITIALIZE: (args = {}) => { return true; },
			PREPROCESS: (args = {}) => { return null; },
			PROCESS: (args = {}) => { return null; },
			POSTPROCESS: (args = {}) => { return null; },
		},

		INSTRUCTION_CACHE: new InstructionCache({ name: "IC - PASS" }),
		RESOURCE_PACK: new ResourcePack(
			{
				name: "RP - PASS",

				maxLocationGroups: 1,
				maxBindingGroups: 4,

				// resourceLocations: new MapT2({}),
				// resourceBindingGroups: new MapT2({}),
			}
		),

		ACTIVE_PIPELINE: null,
	};


	#renderer;

	#initialized;
	#initializeExternal;
	#preprocessExternal;
	#processExternal;
	#postprocessExternal;

	#instructionCache;
	#resourcePack;

	#activePipeline;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : Pass.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : Pass.DEFAULT.NAME,
			}
		);

		this.initialized = (args.initialized !== undefined) ? args.initialized : Pass.DEFAULT.INITIALIZED;
		this.initializeExternal = (args.initializeExternal !== undefined) ? args.initializeExternal : Pass.DEFAULT.EXTERNAL.INITIALIZE;
		this.preprocessExternal = (args.preprocessExternal !== undefined) ? args.preprocessExternal : Pass.DEFAULT.EXTERNAL.PREPROCESS;
		this.processExternal = (args.processExternal !== undefined) ? args.processExternal : Pass.DEFAULT.EXTERNAL.PROCESS;
		this.postprocessExternal = (args.postprocessExternal !== undefined) ? args.postprocessExternal : Pass.DEFAULT.EXTERNAL.POSTPROCESS;

		this.instructionCache = (args.instructionCache !== undefined) ? args.instructionCache : Pass.DEFAULT.INSTRUCTION_CACHE.clone();
		this.resourcePack = (args.resourcePack !== undefined) ? args.resourcePack : Pass.DEFAULT.RESOURCE_PACK.clone();

		this.activePipeline = (args.activePipeline !== undefined) ? args.activePipeline : Pass.DEFAULT.ACTIVE_PIPELINE;


		this.resourcePack.setResourceBindingInternal(
			0,
			1,
			new ResourceBinding(
				{
					number: 1,
					arrayBuffer: new Float32Array(2*4),

					resourceDescriptor: new BufferDescriptor(
						{
							label: "viewport buffer",
							size: 2*4,
							usage: BufferUsage.UNIFORM | BufferUsage.COPY_DST,
							mappedAtCreation: false,					
						}
					),
					bindGroupLayoutEntry: new BindGroupLayoutEntry(
						{
							binding: 1,
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
							binding: 1,
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
		);
	}


	get renderer() {
		return this.#renderer;
	}
	set renderer(renderer) {
		this.#renderer = renderer;
		this.canvas = renderer.canvas;
		this.context = renderer.context;
		this.CONTEXT = renderer.CONTEXT;

		this.renderPassManager = renderer.processPassManager;
		this.bufferManager = this.renderer.contextManager.bufferManager;
		this.textureManager = this.renderer.contextManager.textureManager;
		this.samplerManager = this.renderer.contextManager.samplerManager;
		this.bindGroupLayoutManager = this.renderer.contextManager.bindGroupLayoutManager;
		this.bindGroupManager = this.renderer.contextManager.bindGroupManager;
		this.pipelineLayoutManager = this.renderer.contextManager.pipelineLayoutManager;

		this.renderPipelineManager = this.renderer.contextManager.renderPipelineManager;
		this.computePipelineManager = this.renderer.contextManager.computePipelineManager;

		this.attributeLocationManager = this.renderer.contextManager.attributeLocationManager;
		this.uniformGroupManager = this.renderer.contextManager.uniformGroupManager;
	}

	get initialized() { return this.#initialized; }
	set initialized(initialized) { this.#initialized = initialized; }
	get initializeExternal() { return this.#initializeExternal; }
	set initializeExternal(initializeExternal) { this.#initializeExternal = initializeExternal; }
	get preprocessExternal() { return this.#preprocessExternal; }
	set preprocessExternal(preprocessExternal) { this.#preprocessExternal = preprocessExternal; }
	get processExternal() { return this.#processExternal; }
	set processExternal(processExternal) { this.#processExternal = processExternal; }
	get postprocessExternal() { return this.#postprocessExternal; }
	set postprocessExternal(postprocessExternal) { this.#postprocessExternal = postprocessExternal; }

	get instructionCache() { return this.#instructionCache; }
	set instructionCache(instructionCache) { this.#instructionCache = instructionCache; }
	get resourcePack() { return this.#resourcePack; }
	set resourcePack(resourcePack) { this.#resourcePack = resourcePack; }

	get activePipeline() { return this.#activePipeline; }
	set activePipeline(activePipeline) { this.#activePipeline = activePipeline; }

	initializeInternal(args = {}) { return { ...args, ...this.initializeExternal(args) }; }
	preprocessInternal(args = {}) {
		this.activePipeline = null;


		return { ...args, ...this.preprocessExternal(args) };
	}
	processInternal(args = {}) { return { ...args, ...this.processExternal(args) }; }
	postprocessInternal(args = {}) { return { ...args, ...this.postprocessExternal(args) }; }
	processMain(args = {}) {
		// INITIALIZE
		if (!this.initialized) {
			this.initializeInternal(args);
			this.initialized = true;
		}

		// PREPROCESS
		const argsOut1 = this.preprocessInternal(args);

		// PROCESS
		const argsOut2 = this.processInternal(argsOut1);

		// POSTPROCESS
		const argsOut3 = this.postprocessInternal(argsOut2);
	}
};
