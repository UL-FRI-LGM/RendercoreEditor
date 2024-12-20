import { LoadOp } from "../../core/RC/LoadOp.js";
import { Color4 } from "../../math/Color4.js";
import { RenderTarget } from "../RenderTarget.js";
import { RenderPassDescriptor } from "./RenderPassDescriptor.js";
import { Extent3D } from "../../core/RC/textures/Extent3D.js";
import { RenderPipelineManager } from "../../core/RC/pipeline/RenderPipelineManager.js";
import { Pass } from "./Pass.js";
import { StoreOp } from "../../core/RC/StoreOp.js";
import { Viewport } from "./Viewport.js";
import { Size } from "../Size.js";
import { ArrayT2 } from "../../core/ArrayT2.js";
import { ClearValue } from "../ClearValue.js";
import { LoadOperation } from "../LoadOperation.js";
import { BufferSetInstruction } from "../../core/data_layouts/BufferSetInstruction.js";
import { ResourceBinding } from "../../core/data_layouts/ResourceBinding.js";
import { Float32ArrayT2 } from "../../core/Float32ArrayT2.js";
import { Source } from "../../core/data_layouts/Source.js";
import { Destination } from "../../core/data_layouts/Destination.js";
import { Layout } from "../../core/data_layouts/Layout.js";
import { InstructionCache } from "../../core/data_layouts/InstructionCache.js";


export class RenderPass extends Pass { //custom render pass


	static TYPE = {
		BASIC: 0,
		TEXTURE_MERGE: 1,
		POSTPROCESS: 2,
	};
	static TARGET = {
		TEXTURE: 3,
		TEXTURE_CUBE_MAP:3.2,
		SCREEN: 4,
	};

	static MODE = {
		COLOR: 0,
		SHADOW: 1,
		P_SHADOW: 2,
		GEOMETRY: 3,
		PICK: 4
	};

	static DEFAULT = {
		TYPE: "RenderPass",
		NAME: "",

		INITIALIZED: false,
		EXTERNAL: {
			INITIALIZE: (args = {}) => { return true; },
			PREPROCESS: (args = {}) => { return null; },
			PROCESS: (args = {}) => { return null; },
			POSTPROCESS: (args = {}) => { return null; },
		},

		INSTRUCTION_CACHE: new InstructionCache(
			{ name: "IC - RENDER PASS" },
			[
				...Pass.DEFAULT.INSTRUCTION_CACHE.clone(),

				[
					"viewport",
					new BufferSetInstruction(
						{
							label: "viewport",
			
							number: 1,
							target: ResourceBinding.TARGET.INTERNAL,
			
							source: new Source(
								{
									arrayBuffer: new Float32ArrayT2({}, [0, 0, 1280, 720, 0, 1]),
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
											offset: (0),
										}
									)
								}
							),
							size: (4)
						}
					)
				],
			]
		),

		ACTIVE_PIPELINE: null,

		COLOR_ATTACHMENTS: undefined,
		DEPTH_STENCIL_ATTACHMENT: undefined,
		OCCLUSION_QUERY_SET: undefined,
		TIMESTAMP_WRITES: undefined,
		MAX_DRAW_COUNT: undefined,
		RENDER_TARGET: null,

		// TYPE: RenderPass.TYPE.BASIC,
		TARGET: RenderPass.TARGET.SCREEN,
		VIEWPORT: new Viewport({ x: 0, y: 0, width: 1280, height: 720, minDepth: 0, maxDepth: 1 }),

		SIZE: new Size({ color: new ArrayT2({}, new Extent3D({ width: 1280, height: 720 })), depthStencil: new Extent3D({ width: 1280, height: 720 }) }),
		CLEAR_VALUE: new ClearValue({ color: new ArrayT2({}, new Color4(0, 0, 0, 1)), depth: 1, stencil: 0 }),
		LOAD_OPERATION: new LoadOperation({ color: new ArrayT2({}, LoadOp.CLEAR), depth: LoadOp.CLEAR, stencil: LoadOp.CLEAR }),
		PIXEL_RATIO: window.devicePixelRatio || 1,
	};


	// #type;
	#target;
	#viewport = RenderPass.DEFAULT.VIEWPORT.clone()

	#size = RenderPass.DEFAULT.SIZE.clone();
	#clearValue = RenderPass.DEFAULT.CLEAR_VALUE.clone();
	#loadOperation = RenderPass.DEFAULT.LOAD_OPERATION.clone();
	#pixelRatio = RenderPass.DEFAULT.PIXEL_RATIO;

	#colorAttachments;
    #depthStencilAttachment;
    #occlusionQuerySet;
    #timestampWrites;
    #maxDrawCount;


	constructor(renderer, args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : RenderPass.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : RenderPass.DEFAULT.NAME,

				initialized: (args.initialized !== undefined) ? args.initialized : RenderPass.DEFAULT.INITIALIZED,
				initializeExternal: (args.initialize !== undefined) ? args.initialize : RenderPass.DEFAULT.EXTERNAL.INITIALIZE,
				preprocessExternal: (args.preprocess !== undefined) ? args.preprocess : RenderPass.DEFAULT.EXTERNAL.PREPROCESS,
				processExternal: (args.process !== undefined) ? args.process : RenderPass.DEFAULT.EXTERNAL.RENDER,
				postprocessExternal: (args.postprocess !== undefined) ? args.postprocess : RenderPass.DEFAULT.EXTERNAL.POSTPROCESS,

				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : RenderPass.DEFAULT.INSTRUCTION_CACHE.clone(),

				activePipeline: (args.activePipeline !== undefined) ? args.activePipeline : RenderPass.DEFAULT.ACTIVE_PIPELINE,
			}
		);

		this.renderer = renderer;
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

        this.colorAttachments = (args.colorAttachments !== undefined) ? args.colorAttachments : RenderPass.DEFAULT.COLOR_ATTACHMENTS;
        this.depthStencilAttachment = (args.depthStencilAttachment !== undefined) ? args.depthStencilAttachment : RenderPass.DEFAULT.DEPTH_STENCIL_ATTACHMENT;
        this.occlusionQuerySet = (args.occlusionQuerySet !== undefined) ? args.occlusionQuerySet : RenderPass.DEFAULT.OCCLUSION_QUERY_SET;
        this.timestampWrites = (args.timestampWrites !== undefined) ? args.timestampWrites : RenderPass.DEFAULT.TIMESTAMP_WRITES;
        this.maxDrawCount = (args.maxDrawCount !== undefined) ? args.maxDrawCount : RenderPass.DEFAULT.MAX_DRAW_COUNT;
		this.renderTarget = (args.renderTarget !== undefined && args.renderTarget !== null) ? args.renderTarget : this.#assembleRendertarget();

		// this.type = (args.type !== undefined) ? args.type : RenderPass.DEFAULT.TYPE;
		this.target = (args.target !== undefined) ? args.target : RenderPass.DEFAULT.TARGET;
		this.viewport = (args.viewport !== undefined) ? args.viewport : RenderPass.DEFAULT.VIEWPORT.clone();

		this.size = (args.size !== undefined) ? args.size : RenderPass.DEFAULT.SIZE.clone();
		this.clearValue = (args.clearValue !== undefined) ? args.clearValue : RenderPass.DEFAULT.CLEAR_VALUE.clone();
		this.loadOperation = (args.loadOperation !== undefined) ? args.loadOperation : RenderPass.DEFAULT.LOAD_OPERATION.clone();
		this.pixelRatio = (args.pixelRatio !== undefined) ? args.pixelRatio : RenderPass.DEFAULT.PIXEL_RATIO;
	



		this._outDepthID = null;
		this._outTextures = [];


		// this.renderArrayManager = new RenderArrayManager({});
	}


	get colorAttachments() { return this.#colorAttachments; }
    set colorAttachments(colorAttachments) { this.#colorAttachments = colorAttachments; }
    get depthStencilAttachment() { return this.#depthStencilAttachment; }
    set depthStencilAttachment(depthStencilAttachment) { this.#depthStencilAttachment = depthStencilAttachment; }
    get occlusionQuerySet() { return this.#occlusionQuerySet; }
    set occlusionQuerySet(occlusionQuerySet) { this.#occlusionQuerySet = occlusionQuerySet; }
    get timestampWrites() { return this.#timestampWrites; }
    set timestampWrites(timestampWrites) { this.#timestampWrites = timestampWrites; }
    get maxDrawCount() { return this.#maxDrawCount; }
    set maxDrawCount(maxDrawCount) { this.#maxDrawCount = maxDrawCount; }

	// get type() { return this.#type; }
	// set type(type) { this.#type = type; }
	get target() { return this.#target; }
	set target(target) { this.#target = target; }
	get viewport() { return this.#viewport; }
	set viewport(viewport) { this.#viewport = viewport; }

	get size() { return this.renderTarget.size; }
	set size(size) { this.renderTarget.size = size; }
	get clearValue() { return this.renderTarget.clearValue; }
	set clearValue(clearValue) { this.renderTarget.clearValue = clearValue; }
	get loadOperation() { return this.renderTarget.loadOperation; }
	set loadOperation(loadOperation) { this.renderTarget.loadOperation = loadOperation; }
	get pixelRatio() { return this.renderTarget.pixelRatio; }
	set pixelRatio(pixelRatio) { this.renderTarget.pixelRatio = pixelRatio; }


	get outDepthID() {
		return this._outDepthID;
	}
	set outDepthID(value) {
		if (this._type === RenderPass.SCREEN) {
			console.warn("Warning: Setting output depth texture to RenderPass that renders to screen!")
		}

		this._outDepthID = value;
	}
	get outTextures() {
		return this._outTextures;
	}
	set outTextures(value) {
		if (this._type === RenderPass.SCREEN) {
			console.warn("Warning: Setting output color textures to RenderPass that renders to screen!")
		}

		this._outTextures = value;
	}


	#assembleRendertarget() {
		return new RenderTarget(
			this.renderer,
			{
				//TODO fill defaults
			}
		);
	}

	initializeInternal(args = {}) {
		return super.initializeInternal(args);
	}
	preprocessInternal(args = {}) {
		const argsOut = super.preprocessInternal(args);


		const colorAttachments = this.renderTarget.colorAttachments;
		for (let ca = 0; ca < colorAttachments.length; ca++) {
			const colorAttachment = colorAttachments[ca];
			const colorAttachmentTextureDescriptor = colorAttachment.textureDescriptor;
			const colorAttachmentViewDescriptor = colorAttachment.textureViewDescriptor;

			if (colorAttachment.screen) {
				// canvas
				// const texture = this.canvas.getCurrentTexture();
				// const view = texture.createView();
				const texture = this.CONTEXT.getCurrentTexture(colorAttachmentTextureDescriptor);
				const view = texture.createView(colorAttachmentViewDescriptor);
				colorAttachment.view = view;
			} else {
				// texture
				const texture = this.textureManager.getTexture(colorAttachmentTextureDescriptor); // create if not created and get
				const view = texture.createView(colorAttachmentViewDescriptor);
				colorAttachment.view = view;
			}
		}

		const depthStencilAttachment = this.renderTarget.depthStencilAttachment;
		const depthStencilAttachmentTextureDescriptor = depthStencilAttachment.textureDescriptor;
		const depthStencilAttachmentViewDescriptor = depthStencilAttachment.textureViewDescriptor;

		const texture = this.textureManager.getTexture(depthStencilAttachmentTextureDescriptor); // create if not created and get
		// const view = texture.createView();
		const view = texture.createView(depthStencilAttachmentViewDescriptor);
		depthStencilAttachment.view = view;


		// resources
		const instructionViewport = this.instructionCache.get("viewport");
		instructionViewport.setSource(this.viewport.arrayBuffer, 0);

		this.resourcePack.setResourceBindingValueInternal(0, 1, instructionViewport);


		// TODO change this object
		const RPD = new RenderPassDescriptor(
			{
				label: "render pass descriptor",
				colorAttachments: this.renderTarget.colorAttachments,
				depthStencilAttachment: this.renderTarget.depthStencilAttachment,
				occlusionQuerySet: undefined,
				timestampWrites: undefined,
				maxDrawCount: undefined,
			}
		);

		
		// begin
		const renderPassDescriptor = RPD;
		this.commandEncoder = this.context.createCommandEncoder();
		this.renderPassEncoder = this.commandEncoder.beginRenderPass(renderPassDescriptor);

		this.renderPassEncoder.setViewport(this.viewport.x, this.viewport.y, this.viewport.width, this.viewport.height, this.viewport.minDepth, this.viewport.maxDepth);
		//


		return argsOut;
	}
	processInternal(args = {}) {
		return super.processInternal(args);
	}
	postprocessInternal(args = {}) {
		const argsOut = super.postprocessInternal(args);


		// end
		this.renderPassEncoder.end();
		// this.renderPassEncoder.endPass(); //firefox
		const commandBuffer = this.commandEncoder.finish();
		this.context.queue.submit([commandBuffer]);
		//


		// save outputs
		const RPM_textureMap = args.textureMap;

		const colorAttachments = this.renderTarget.colorAttachments;
		for (let ca = 0; ca < colorAttachments.length; ca++) {
			const colorAttachment = colorAttachments[ca];
			const colorAttachmentTextureDescriptor = colorAttachment.textureDescriptor;
			const colorAttachmentViewDescriptor = colorAttachment.textureViewDescriptor;

			if (colorAttachment.screen) {
				// canvas
				RPM_textureMap.set("canvas", colorAttachmentTextureDescriptor);
			} else {
				// texture
				RPM_textureMap.set(colorAttachmentTextureDescriptor.label, colorAttachmentTextureDescriptor);
			}
		}

		const depthStencilAttachment = this.renderTarget.depthStencilAttachment;
		const depthStencilAttachmentTextureDescriptor = depthStencilAttachment.textureDescriptor;
		const depthStencilAttachmentViewDescriptor = depthStencilAttachment.textureViewDescriptor;

		RPM_textureMap.set(depthStencilAttachmentTextureDescriptor.label, depthStencilAttachmentTextureDescriptor);
	

		return argsOut;
	}
	processMain(args = {}) {
		super.processMain(args);
	}
};
