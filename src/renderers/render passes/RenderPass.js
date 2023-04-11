import { GPULoadOp } from "../../core/ENUM/GPULoadOp.js";
import { Color4 } from "../../math/Color4.js";
import { RenderTarget } from "../RenderTarget.js";
import { GPURenderPassDescriptor } from "../../core/DICTS/GPURenderPassDescriptor.js";
import { GPUExtent3D } from "../../core/DICTS/GPUExtent3D.js";
import { RenderPipelineManager } from "../../core/RC/pipeline/RenderPipelineManager.js";
import { Pass } from "./Pass.js";
import { GPUStoreOp } from "../../core/ENUM/GPUStoreOp.js";


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
		NAME: "",
		TYPE: "RenderPass",

		INITIALIZED: false,
		EXTERNAL: {
			INITIALIZE: (args = {}) => { return true; },
			PREPROCESS: (args = {}) => { return null; },
			PROCESS: (args = {}) => { return null; },
			POSTPROCESS: (args = {}) => { return null; },
		},

		COLOR_ATTACHMENTS: undefined,
		DEPTH_STENCIL_ATTACHMENT: undefined,
		OCCLUSION_QUERY_SET: undefined,
		TIMESTAMP_WRITES: undefined,
		MAX_DRAW_COUNT: undefined,

		// TYPE: RenderPass.TYPE.BASIC,
		TARGET: RenderPass.TARGET.SCREEN,
		VIEWPORT: { x: 0, y: 0, width: 1280, height: 720 },
		CLEAR_VALUE: new Color4(0, 0, 0, 1),
		COLOR_LOAD_OPERATION: GPULoadOp.CLEAR,
	};


	// #type;
	#target;
	// #viewport = { ...RenderPass.DEFAULT.VIEWPORT }; //clone
	#clearValue = RenderPass.DEFAULT.CLEAR_VALUE.clone();
	#colorLoadOperation = RenderPass.DEFAULT.COLOR_LOAD_OPERATION;

	#colorAttachments;
    #depthStencilAttachment;
    #occlusionQuerySet;
    #timestampWrites;
    #maxDrawCount;


	constructor(renderer, args = {}) {
		super(
			{
				...args,
				
				name: (args.name !== undefined) ? args.name : RenderPass.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : RenderPass.DEFAULT.TYPE,

				initialized: (args.initialized !== undefined) ? args.initialized : RenderPass.DEFAULT.INITIALIZED,
				initializeExternal: (args.initialize !== undefined) ? args.initialize : RenderPass.DEFAULT.EXTERNAL.INITIALIZE,
				preprocessExternal: (args.preprocess !== undefined) ? args.preprocess : RenderPass.DEFAULT.EXTERNAL.PREPROCESS,
				processExternal: (args.process !== undefined) ? args.process : RenderPass.DEFAULT.EXTERNAL.RENDER,
				postprocessExternal: (args.postprocess !== undefined) ? args.postprocess : RenderPass.DEFAULT.EXTERNAL.POSTPROCESS,
			}
		);

		this.renderer = renderer;
		this.context = renderer.contextManager.context;
		this.canvas = renderer.canvasManager.canvas;

		this.renderPassManager = renderer.processPassManager;
		this.bufferManager = this.renderer.contextManager.bufferManager;
		this.textureManager = this.renderer.contextManager.textureManager;
		this.samplerManager = this.renderer.contextManager.samplerManager;
		this.bindGroupLayoutManager = this.renderer.contextManager.bindGroupLayoutManager;
		this.bindGroupManager = this.renderer.contextManager.bindGroupManager;
		this.pipelineLayoutManager = this.renderer.contextManager.pipelineLayoutManager;

		this.renderPipelineManager = this.renderer.contextManager.renderPipelineManager;
		this.computePipelineManager = this.renderer.contextManager.computePipelineManager;

	

        this.colorAttachments = (args.colorAttachments !== undefined) ? args.colorAttachments : RenderPass.DEFAULT.COLOR_ATTACHMENTS;
        this.depthStencilAttachment = (args.depthStencilAttachment !== undefined) ? args.depthStencilAttachment : RenderPass.DEFAULT.DEPTH_STENCIL_ATTACHMENT;
        this.occlusionQuerySet = (args.occlusionQuerySet !== undefined) ? args.occlusionQuerySet : RenderPass.DEFAULT.OCCLUSION_QUERY_SET;
        this.timestampWrites = (args.timestampWrites !== undefined) ? args.timestampWrites : RenderPass.DEFAULT.TIMESTAMP_WRITES;
        this.maxDrawCount = (args.maxDrawCount !== undefined) ? args.maxDrawCount : RenderPass.DEFAULT.MAX_DRAW_COUNT;
	


		this.renderTarget = new RenderTarget(renderer, {});
		// this.type = (args.type !== undefined) ? args.type : RenderPass.DEFAULT.TYPE;
		this.target = (args.target !== undefined) ? args.target : RenderPass.DEFAULT.TARGET;
		this.viewport = (args.viewport !== undefined) ? args.viewport : { ...RenderPass.DEFAULT.VIEWPORT }; //copy
		this.clearValue = (args.clearValue !== undefined) ? args.clearValue : RenderPass.DEFAULT.CLEAR_VALUE;
		this.colorLoadOperation = (args.colorLoadOperation !== undefined) ? args.colorLoadOperation : RenderPass.DEFAULT.COLOR_LOAD_OPERATION;
	



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
	get viewport() { return this.renderTarget.viewport; }
	set viewport(viewport) { this.renderTarget.viewport = viewport; }
	get clearValue() { return this.renderTarget.clearValue; }
	set clearValue(clearValue) { this.renderTarget.clearValue = clearValue; }
	get colorLoadOperation() { return this.renderTarget.colorLoadOperation; }
	set colorLoadOperation(colorLoadOperation) { this.renderTarget.colorLoadOperation = colorLoadOperation; }


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


	initializeInternal(args = {}) {
		return super.initializeInternal(args);
	}
	preprocessInternal(args = {}) {
		const argsOut = super.preprocessInternal(args);


		for (let ca = 0; ca < this.colorAttachments.length; ca++) {
			const colorAttachmentTextureDescriptor = this.colorAttachmentTextureDescriptors[ca];
			const colorAttachmentViewDescriptor = this.colorAttachmentViewDescriptors[ca];
			const colorAttachment = this.colorAttachments[ca];

			if (colorAttachmentTextureDescriptor === null) {
				// canvas
				// const texture = this.canvas.getCurrentTexture();
				// const view = texture.createView();
				const texture = this.canvas.getCurrentTexture(colorAttachmentTextureDescriptor);
				const view = texture.createView(colorAttachmentViewDescriptor);
				colorAttachment.view = view;

				this.depthStencilAttachmentTextureDescriptor.size = new GPUExtent3D(
					{
						width: texture.width,
						height: texture.height,
						depthOrArrayLayers: texture.depthOrArrayLayers,
					}
				);
			} else {
				// texture
				const texture = this.textureManager.getTexture(colorAttachmentTextureDescriptor); // create if not created and get
				const view = texture.createView(colorAttachmentViewDescriptor);
				colorAttachment.view = view;
			}
		}

		const depthStencilAttachmentTextureDescriptor = this.depthStencilAttachmentTextureDescriptor;
		const depthStencilAttachmentViewDescriptor = this.depthStencilAttachmentViewDescriptor;
		const depthStencilAttachment = this.depthStencilAttachment;

		const texture = this.textureManager.getTexture(depthStencilAttachmentTextureDescriptor); // create if not created and get
		// const view = texture.createView();
		const view = texture.createView(depthStencilAttachmentViewDescriptor);
		depthStencilAttachment.view = view;


		// TODO change this object
		const RPD = new GPURenderPassDescriptor(
			{
				label: "render pass descriptor",
				colorAttachments: this.colorAttachments,
				depthStencilAttachment: this.depthStencilAttachment,
				occlusionQuerySet: undefined,
				timestampWrites: undefined,
				maxDrawCount: undefined,
			}
		);

		
		// begin
		const renderPassDescriptor = RPD;
		this.commandEncoder = this.context.createCommandEncoder();
		this.renderPassEncoder = this.commandEncoder.beginRenderPass(renderPassDescriptor);
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

		for (let ca = 0; ca < this.colorAttachments.length; ca++) {
			const colorAttachmentTextureDescriptor = this.colorAttachmentTextureDescriptors[ca];
			const colorAttachmentViewDescriptor = this.colorAttachmentViewDescriptors[ca];
			const colorAttachment = this.colorAttachments[ca];

			if (colorAttachmentTextureDescriptor === null) {
				// canvas
				RPM_textureMap.set("canvas", colorAttachmentTextureDescriptor);
			} else {
				// texture
				RPM_textureMap.set(colorAttachmentTextureDescriptor.label, colorAttachmentTextureDescriptor);
			}
		}

		const depthStencilAttachmentTextureDescriptor = this.depthStencilAttachmentTextureDescriptor;
		const depthStencilAttachmentViewDescriptor = this.depthStencilAttachmentViewDescriptor;
		const depthStencilAttachment = this.depthStencilAttachment;

		RPM_textureMap.set(depthStencilAttachmentTextureDescriptor.label, depthStencilAttachmentTextureDescriptor);
	

		return argsOut;
	}
	processMain(args = {}) {
		super.processMain(args);
	}
};