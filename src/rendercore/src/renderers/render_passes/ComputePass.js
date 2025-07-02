//


import { LoadOp } from "../../core/RC/LoadOp.js";
import { Color4 } from "../../math/Color4.js";
import { RenderTarget } from "../RenderTarget.js";
import { Pass } from "./Pass.js";
import { GPUComputePassDescriptor } from "../../core/DICTS/GPUComputePassDescriptor.js";
import { ComputePipelineDescriptor } from "../../core/RC/pipeline/ComputePipelineDescriptor.js";
import { ComputePipelineManager } from "../../core/RC/pipeline/ComputePipelineManager.js";
import { Viewport } from "./Viewport.js";
import { ArrayT2 } from "../../core/ArrayT2.js";
import { Extent3D } from "../../core/RC/textures/Extent3D.js";
import { ClearValue } from "../ClearValue.js";
import { LoadOperation } from "../LoadOperation.js";
import { ErrorT2 } from "../../ErrorT2.js";


export class ComputePass extends Pass { // custom render pass


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
		TYPE: "ComputePass",
		NAME: "",

		INITIALIZED: false,
		EXTERNAL: {
			INITIALIZE: (args = {}) => { return true; },
			PREPROCESS: (args = {}) => { return null; },
			PROCESS: (args = {}) => { ErrorT2.throw(ErrorT2.MESSAGE.NOT_IMPLEMENTED, { cause: this.type }); },
			POSTPROCESS: (args = {}) => { return null; },
		},

		ACTIVE_PIPELINE: null,

		COLOR_ATTACHMENTS: undefined,
		DEPTH_STENCIL_ATTACHMENT: undefined,
		OCCLUSION_QUERY_SET: undefined,
		TIMESTAMP_WRITES: undefined,
		MAX_DRAW_COUNT: undefined,

		// TYPE: ComputePass.TYPE.BASIC,
		TARGET: ComputePass.TARGET.SCREEN,
		VIEWPORT: new Viewport({ x: 0, y: 0, width: 1280, height: 720, minDepth: 0, maxDepth: 1 }),

		CLEAR_VALUE: new ClearValue({ color: new ArrayT2({}, new Color4(0, 0, 0, 1)), depth: 1, stencil: 0 }),
		LOAD_OPERATION: new LoadOperation({ color: new ArrayT2({}, LoadOp.CLEAR), depth: LoadOp.CLEAR, stencil: LoadOp.CLEAR }),
	};


	// #type;
	#target;
	#viewport = ComputePass.DEFAULT.VIEWPORT.clone();

	#clearValue = ComputePass.DEFAULT.CLEAR_VALUE.clone();
	#loadOperation = ComputePass.DEFAULT.LOAD_OPERATION.clone();

	#colorAttachments;
    #depthStencilAttachment;
    #occlusionQuerySet;
    #timestampWrites;
    #maxDrawCount;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : ComputePass.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : ComputePass.DEFAULT.NAME,

				initializedExternal: (args.initialized !== undefined) ? args.initialized : ComputePass.DEFAULT.INITIALIZED,
				initializeExternal: (args.initialize !== undefined) ? args.initialize : ComputePass.DEFAULT.EXTERNAL.INITIALIZE,
				preprocessExternal: (args.preprocess !== undefined) ? args.preprocess : ComputePass.DEFAULT.EXTERNAL.PREPROCESS,
				processExternal: (args.compute !== undefined) ? args.compute : ComputePass.DEFAULT.EXTERNAL.COMPUTE,
				postprocessExternal: (args.postprocess !== undefined) ? args.postprocess : ComputePass.DEFAULT.EXTERNAL.POSTPROCESS,

				activePipeline: (args.activePipeline !== undefined) ? args.activePipeline : ComputePass.DEFAULT.ACTIVE_PIPELINE,
			}
		);

        this.colorAttachments = (args.colorAttachments !== undefined) ? args.colorAttachments : ComputePass.DEFAULT.COLOR_ATTACHMENTS;
        this.depthStencilAttachment = (args.depthStencilAttachment !== undefined) ? args.depthStencilAttachment : ComputePass.DEFAULT.DEPTH_STENCIL_ATTACHMENT;
        this.occlusionQuerySet = (args.occlusionQuerySet !== undefined) ? args.occlusionQuerySet : ComputePass.DEFAULT.OCCLUSION_QUERY_SET;
        this.timestampWrites = (args.timestampWrites !== undefined) ? args.timestampWrites : ComputePass.DEFAULT.TIMESTAMP_WRITES;
        this.maxDrawCount = (args.maxDrawCount !== undefined) ? args.maxDrawCount : ComputePass.DEFAULT.MAX_DRAW_COUNT;
	


		this.renderTarget = new RenderTarget({});
		// this.type = (args.type !== undefined) ? args.type : ComputePass.DEFAULT.TYPE;
		this.target = (args.target !== undefined) ? args.target : ComputePass.DEFAULT.TARGET;
		this.viewport = (args.viewport !== undefined) ? args.viewport : ComputePass.DEFAULT.VIEWPORT.clone();

		this.clearValue = (args.clearValue !== undefined) ? args.clearValue : ComputePass.DEFAULT.CLEAR_VALUE.clone();
		this.loadOperation = (args.loadOperation !== undefined) ? args.loadOperation : ComputePass.DEFAULT.LOAD_OPERATION.clone();



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

	get clearValue() { return this.renderTarget.clearValue; }
	set clearValue(clearValue) { this.renderTarget.clearValue = clearValue; }
	get loadOperation() { return this.renderTarget.loadOperation; }
	set loadOperation(loadOperation) { this.renderTarget.loadOperation = loadOperation; }
	get attachmentSize() { return this.renderTarget.attachmentSize; }
	set attachmentSize(attachmentSize) { this.renderTarget.attachmentSize = attachmentSize; }


	

	get outDepthID() {
		return this._outDepthID;
	}
	set outDepthID(value) {
		if (this._type === ComputePass.SCREEN) {
			console.warn("Warning: Setting output depth texture to ComputePass that renders to screen!")
		}

		this._outDepthID = value;
	}
	get outTextures() {
		return this._outTextures;
	}
	set outTextures(value) {
		if (this._type === ComputePass.SCREEN) {
			console.warn("Warning: Setting output color textures to ComputePass that renders to screen!")
		}

		this._outTextures = value;
	}


	#compute(args = {}, material) {
		const bufferManager = this.bufferManager;
		const textureManager = this.textureManager;
		const samplerManager = this.samplerManager;
		const bindGroupLayoutManager = this.bindGroupLayoutManager;
		const bindGroupManager = this.bindGroupManager;

		const attributeLocationManager = this.attributeLocationManager;
		const uniformGroupManager = this.uniformGroupManager;

		// uniformGroupManager.createUniformGroup(material.uniformGroupDescriptor);
		// uniformGroupManager.updateUniformGroup(material.uniformGroupDescriptor);
		uniformGroupManager.getUniformGroup(material.uniformGroupDescriptor);
		uniformGroupManager.setUniformGroup(material.uniformGroupDescriptor);


		if (!material.pip) {
			material.pip = this.genPip(material);
		}
		const pip = material.pip;
		this.computePassEncoder.setPipeline(pip);
		
		this.computePassEncoder.setBindGroup(0, bindGroupManager.getBindGroup(material.uniformGroupDescriptor.bindGroupDescriptor));

		this.computePassEncoder.dispatchWorkgroups(8, 8, 1);
	}

	initializeInternal(args = {}) {
		return this.initializeExternal(args);
	}
	preprocessInternal(args = {}) {
		const argsOut = super.preprocessInternal(args);


		// TODO change this object
		const RPD = new GPUComputePassDescriptor(
			{
				label: "render pass descriptor",
				timestampWrites: undefined
			}
		);

		
		// begin
		const computePassDescriptor = RPD;
		this.commandEncoder = this.context.createCommandEncoder();
		this.computePassEncoder = this.commandEncoder.beginComputePass(computePassDescriptor);
		//


		return argsOut;
	}
	processInternal(args = {}) {
		const argsOut = super.processInternal(args);


		// Remove possible previous maps
		argsOut.material.clearMapBindings();

		// Add textures to material
		for (let i = 0; i < argsOut.maps.length; i++) {
			argsOut.material.setMapBinding(i, 3, i, argsOut.maps[i]);
		}

		this.#compute(argsOut, argsOut.material);


		return argsOut;
	}
	postprocessInternal(args = {}) {
		const argsOut = super.postprocessExternal(args);


		// end
		this.computePassEncoder.end();
		// this.computePassEncoder.endPass(); //firefox
		const commandBuffer = this.commandEncoder.finish();
		this.context.queue.submit([commandBuffer]);
		//

	
		return argsOut;
	}
	processMain(args = {}) {
		super.processMain(args);
	}



	genPip(material) {


		const bundle = {
			camera: null,
			lightManager: null,
			object: { material: material },

			computePassManager: this.computePassManager,

			bgl_descriptors: [
				material.uniformGroupDescriptor.bindGroupLayoutDescriptor
			]
		};
		const x = new ComputePipelineDescriptor({ label: "compute pipeline" });

		const cp = this.computePipelineManager.createComputePipeline(x, bundle);
		
		return cp;
	}
};
