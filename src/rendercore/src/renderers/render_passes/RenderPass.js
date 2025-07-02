import { LoadOp } from "../../core/RC/LoadOp.js";
import { Color4 } from "../../math/Color4.js";
import { RenderTarget } from "../RenderTarget.js";
import { RenderPassDescriptor } from "./RenderPassDescriptor.js";
import { Extent3D } from "../../core/RC/textures/Extent3D.js";
import { RenderPipelineManager } from "../../core/RC/pipeline/RenderPipelineManager.js";
import { Pass } from "./Pass.js";
import { StoreOp } from "../../core/RC/StoreOp.js";
import { Viewport } from "./Viewport.js";
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
import { ScissorRectangle } from "./ScissorRectangle.js";
import { StoreOperation } from "../StoreOperation.js";
import { AttachmentReadOnly } from "../AttachmentReadOnly.js";
import { AttachmentTextureDescriptor } from "../AttachmentTextureDescriptor.js";
import { TextureDescriptor } from "../../core/RC/textures/TextureDescriptor.js";
import { TextureDimension } from "../../core/RC/textures/TextureDimension.js";
import { TextureFormat } from "../../core/RC/textures/TextureFormat.js";
import { TextureUsage } from "../../core/RC/textures/TextureUsage.js";
import { AttachmentTextureViewDescriptor } from "../AttachmentTextureViewDescriptor.js";
import { TextureViewDescriptor } from "../../core/RC/textures/TextureViewDescriptor.js";
import { TextureView } from "../../core/RC/textures/TextureView.js";
import { CanvasDescriptor } from "../../canvas/CanvasDescriptor.js";


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
							size: (6)
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
		SCISSOR_RECTANGLE: new ScissorRectangle({ x: 0, y: 0, width: 1280, height: 720 }),

		CLEAR_VALUE: new ClearValue({ color: new ArrayT2({}, new Color4(0, 0, 0, 1)), depth: 1, stencil: 0 }),
		LOAD_OPERATION: new LoadOperation({ color: new ArrayT2({}, LoadOp.CLEAR), depth: LoadOp.CLEAR, stencil: LoadOp.CLEAR }),
		STORE_OPERATION: new StoreOperation({ color: new ArrayT2({}, StoreOp.STORE), depth: StoreOp.STORE, stencil: StoreOp.STORE }),
		ATTACHMENT_READ_ONLY: new AttachmentReadOnly({ color: new ArrayT2({}, null), depth: false, stencil: false }),
		ATTACHMENT_TEXTURE_DESCRIPTOR: new AttachmentTextureDescriptor(
			{
				color: new ArrayT2({},
					new TextureDescriptor(
						{
							label: `${RenderPass.name}`,
							size: new Extent3D({ width: 1280, height: 720 }),
							mipLevelCount: 1,
							sampleCount: 1,
							dimension: TextureDimension.D2,
							format: TextureFormat.BGRA_8_UNORM,
							usage: TextureUsage.RENDER_ATTACHMENT | TextureUsage.TEXTURE_BINDING,
							viewFormats: new ArrayT2({}),
						}
					)
				),
				depthStencil: new TextureDescriptor(
					{
						label: `${RenderPass.name}`,
						size: new Extent3D({ width: 1280, height: 720 }),
						mipLevelCount: 1,
						sampleCount: 1,
						dimension: TextureDimension.D2,
						format: TextureFormat.DEPTH_24_PLUS_STENCIL_8,
						usage: TextureUsage.RENDER_ATTACHMENT | TextureUsage.TEXTURE_BINDING,
						viewFormats: new ArrayT2({}),
					}
				)
			}
		),
		ATTACHMENT_TEXTURE_VIEW_DESCRIPTOR: new AttachmentTextureViewDescriptor(
			{
				color: new ArrayT2({},
					new TextureViewDescriptor(
						{
							label: `${RenderPass.name}`,
							format: TextureFormat.BGRA_8_UNORM,
							dimension: TextureView.DIMENSION.D2,
							aspect: TextureView.ASPECT.ALL,
							baseMipLevel: 0,
							mipLevelCount: 1,
							baseArrayLayer: 0,
							arrayLayerCount: 1,
						}
					)
				),
				depthStencil: new TextureViewDescriptor(
					{
						label: `${RenderPass.name}`,
						format: TextureView.FORMAT.DEPTH_24_PLUS_STENCIL_8,
						dimension: TextureView.DIMENSION.D2,
						aspect: TextureView.ASPECT.ALL,
						baseMipLevel: 0,
						mipLevelCount: 1,
						baseArrayLayer: 0,
						arrayLayerCount: 1,
					}
				)
			}
		),

		PIXEL_RATIO: window.devicePixelRatio || 1,

		COMMAND_ENCODER: null,
		RENDER_PASS_ENCODER: null,
		RENDER_BUNDLE_ENCODER: null,
	};


	// #type;
	#target;
	#viewport = RenderPass.DEFAULT.VIEWPORT.clone()
	#scissorRectangle = RenderPass.DEFAULT.SCISSOR_RECTANGLE.clone();

	#clearValue = RenderPass.DEFAULT.CLEAR_VALUE.clone();
	#loadOperation = RenderPass.DEFAULT.LOAD_OPERATION.clone();
	#storeOperation = RenderPass.DEFAULT.STORE_OPERATION.clone();
	#attachmentReadOnly = RenderPass.DEFAULT.ATTACHMENT_READ_ONLY.clone();
	#attachmentTextureDescriptor = RenderPass.DEFAULT.ATTACHMENT_TEXTURE_DESCRIPTOR.clone();
	#attachmentTextureViewDescriptor = RenderPass.DEFAULT.ATTACHMENT_TEXTURE_VIEW_DESCRIPTOR.clone();

	#pixelRatio = RenderPass.DEFAULT.PIXEL_RATIO;

	#colorAttachments;
    #depthStencilAttachment;
    #occlusionQuerySet;
    #timestampWrites;
    #maxDrawCount;

	#commandEncoder;
	#renderPassEncoder;
	#renderBundleEncoder;


	constructor(args = {}) {
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

        this.colorAttachments = (args.colorAttachments !== undefined) ? args.colorAttachments : RenderPass.DEFAULT.COLOR_ATTACHMENTS;
        this.depthStencilAttachment = (args.depthStencilAttachment !== undefined) ? args.depthStencilAttachment : RenderPass.DEFAULT.DEPTH_STENCIL_ATTACHMENT;
        this.occlusionQuerySet = (args.occlusionQuerySet !== undefined) ? args.occlusionQuerySet : RenderPass.DEFAULT.OCCLUSION_QUERY_SET;
        this.timestampWrites = (args.timestampWrites !== undefined) ? args.timestampWrites : RenderPass.DEFAULT.TIMESTAMP_WRITES;
        this.maxDrawCount = (args.maxDrawCount !== undefined) ? args.maxDrawCount : RenderPass.DEFAULT.MAX_DRAW_COUNT;
		this.renderTarget = (args.renderTarget !== undefined && args.renderTarget !== null) ? args.renderTarget : this.#assembleRendertarget();

		// this.type = (args.type !== undefined) ? args.type : RenderPass.DEFAULT.TYPE;
		this.target = (args.target !== undefined) ? args.target : RenderPass.DEFAULT.TARGET;
		this.viewport = (args.viewport !== undefined) ? args.viewport : RenderPass.DEFAULT.VIEWPORT.clone();
		this.scissorRectangle = (args.scissorRectangle !== undefined) ? args.scissorRectangle : RenderPass.DEFAULT.SCISSOR_RECTANGLE.clone();

		this.clearValue = (args.clearValue !== undefined) ? args.clearValue : RenderPass.DEFAULT.CLEAR_VALUE.clone();
		this.loadOperation = (args.loadOperation !== undefined) ? args.loadOperation : RenderPass.DEFAULT.LOAD_OPERATION.clone();
		this.storeOperation = (args.storeOperation !== undefined) ? args.storeOperation : RenderPass.DEFAULT.STORE_OPERATION.clone();
		this.attachmentReadOnly = (args.attachmentReadOnly !== undefined) ? args.attachmentReadOnly : RenderPass.DEFAULT.ATTACHMENT_READ_ONLY.clone(),
		this.attachmentTextureDescriptor = (args.attachmentTextureDescriptor !== undefined) ? args.attachmentTextureDescriptor : RenderPass.DEFAULT.ATTACHMENT_TEXTURE_DESCRIPTOR.clone(),
		this.attachmentTextureViewDescriptor = (args.attachmentTextureViewDescriptor !== undefined) ? args.attachmentTextureViewDescriptor : RenderPass.DEFAULT.ATTACHMENT_TEXTURE_VIEW_DESCRIPTOR.clone(),

		this.pixelRatio = (args.pixelRatio !== undefined) ? args.pixelRatio : RenderPass.DEFAULT.PIXEL_RATIO;
	
		this.commandEncoder = (args.commandEncoder !== undefined) ? args.commandEncoder : RenderPass.DEFAULT.COMMAND_ENCODER;
		this.renderPassEncoder = (args.renderPassEncoder !== undefined) ? args.renderPassEncoder : RenderPass.DEFAULT.RENDER_PASS_ENCODER;
		this.renderBundleEncoder = (args.renderBundleEncoder !== undefined) ? args.renderBundleEncoder : RenderPass.DEFAULT.RENDER_BUNDLE_ENCODER;



		this._outDepthID = null;
		this._outTextures = [];
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
	get scissorRectangle() { return this.#scissorRectangle; }
	set scissorRectangle(scissorRectangle) { this.#scissorRectangle = scissorRectangle; }

	get clearValue() { return this.renderTarget.clearValue; }
	set clearValue(clearValue) { this.renderTarget.clearValue = clearValue; }
	get loadOperation() { return this.renderTarget.loadOperation; }
	set loadOperation(loadOperation) { this.renderTarget.loadOperation = loadOperation; }
	get storeOperation() { return this.renderTarget.storeOperation; }
	set storeOperation(storeOperation) { this.renderTarget.storeOperation = storeOperation; }
	get attachmentReadOnly() { return this.renderTarget.attachmentReadOnly; }
	set attachmentReadOnly(attachmentReadOnly) { this.renderTarget.attachmentReadOnly = attachmentReadOnly; }
	get attachmentTextureDescriptor() { return this.renderTarget.attachmentTextureDescriptor; }
	set attachmentTextureDescriptor(attachmentTextureDescriptor) { this.renderTarget.attachmentTextureDescriptor = attachmentTextureDescriptor; }
	get attachmentTextureViewDescriptor() { return this.renderTarget.attachmentTextureViewDescriptor; }
	set attachmentTextureViewDescriptor(attachmentTextureViewDescriptor) { this.renderTarget.attachmentTextureViewDescriptor = attachmentTextureViewDescriptor; }
	get attachmentSize() { return this.renderTarget.attachmentSize; }
	set attachmentSize(attachmentSize) { this.renderTarget.attachmentSize = attachmentSize; }

	get pixelRatio() { return this.renderTarget.pixelRatio; }
	set pixelRatio(pixelRatio) { this.renderTarget.pixelRatio = pixelRatio; }

	get commandEncoder() { return this.#commandEncoder; }
	set commandEncoder(commandEncoder) { this.#commandEncoder = commandEncoder; }
	get renderPassEncoder() { return this.#renderPassEncoder; }
	set renderPassEncoder(renderPassEncoder) { this.#renderPassEncoder = renderPassEncoder; }
	get renderBundleEncoder() { return this.#renderBundleEncoder; }
	set renderBundleEncoder(renderBundleEncoder) { this.#renderBundleEncoder = renderBundleEncoder; }

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

			if (colorAttachmentTextureDescriptor instanceof CanvasDescriptor) {
				// canvas
				// const texture = this.canvas.getCurrentTexture();
				// const view = texture.createView();

				// this.renderer.contextManager.canvasManager.setCanvas(colorAttachmentTextureDescriptor, this.canvas);
				this.renderer.contextManager.canvasManager.updateCanvas(colorAttachmentTextureDescriptor);

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
		this.renderPassEncoder.setScissorRect(this.scissorRectangle.x, this.scissorRectangle.y, this.scissorRectangle.width, this.scissorRectangle.height);
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
		const RPM_textureDescriptorMap = args.textureDescriptorMap;

		const colorAttachments = this.renderTarget.colorAttachments;
		for (let ca = 0; ca < colorAttachments.length; ca++) {
			const colorAttachment = colorAttachments[ca];
			const colorAttachmentTextureDescriptor = colorAttachment.textureDescriptor;
			const colorAttachmentViewDescriptor = colorAttachment.textureViewDescriptor;

			RPM_textureDescriptorMap.set(colorAttachmentTextureDescriptor.label, colorAttachmentTextureDescriptor);
		}

		const depthStencilAttachment = this.renderTarget.depthStencilAttachment;
		const depthStencilAttachmentTextureDescriptor = depthStencilAttachment.textureDescriptor;
		const depthStencilAttachmentViewDescriptor = depthStencilAttachment.textureViewDescriptor;

		RPM_textureDescriptorMap.set(depthStencilAttachmentTextureDescriptor.label, depthStencilAttachmentTextureDescriptor);
	

		return argsOut;
	}
	processMain(args = {}) {
		super.processMain(args);
	}
};
