//


import { RenderPass } from "./RenderPass.js";
import { LoadOp } from "../../core/RC/LoadOp.js";
import { Color4 } from "../../math/Color4.js";
import { OrthographicCamera, Scene, Vector2, Vector3 } from "../../RenderCore.js";
import { Quad } from "../../objects/Quad.js";
import { QuadGeometry } from "../../objects/QuadGeometry.js";
import { QuadBasicMaterial } from "../../materials/QuadBasicMaterial.js";
import { RenderPipelineDescriptor } from "../../core/RC/pipeline/RenderPipelineDescriptor.js";
import { Viewport } from "./Viewport.js";
import { Size } from "../Size.js";
import { ArrayT2 } from "../../core/ArrayT2.js";
import { Extent3D } from "../../core/RC/textures/Extent3D.js";
import { ClearValue } from "../ClearValue.js";
import { LoadOperation } from "../LoadOperation.js";
import { InstructionCache } from "../../core/data_layouts/InstructionCache.js";


export class RenderPostprocessPass extends RenderPass {


	static DEFAULT = {
		NAME: "",
		TYPE: "RenderPostprocessPass",

		INITIALIZED: false,
		EXTERNAL: {
			INITIALIZE: (args = {}) => { return true; },
			PREPROCESS: (args = {}) => { return null; },
			PROCESS: (args = {}) => { return null; },
			POSTPROCESS: (args = {}) => { return null; },
		},

		INSTRUCTION_CACHE : new InstructionCache(
			{ name: "IC - RENDER POSTPROCESS PASS" },
			[
				...RenderPass.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),

		ACTIVE_PIPELINE: null,

		COLOR_ATTACHMENTS: undefined,
		DEPTH_STENCIL_ATTACHMENT: undefined,
		OCCLUSION_QUERY_SET: undefined,
		TIMESTAMP_WRITES: undefined,
		MAX_DRAW_COUNT: undefined,
		RENDER_TARGET: null,

		TARGET: RenderPass.TARGET.SCREEN,
		VIEWPORT: new Viewport({ x: 0, y: 0, width: 1280, height: 720, minDepth: 0, maxDepth: 1 }),

		SIZE: new Size({ color: new ArrayT2({}, new Extent3D({ width: 1280, height: 720 })), depthStencil: new Extent3D({ width: 1280, height: 720 }) }),
		CLEAR_VALUE: new ClearValue({ color: new ArrayT2({}, new Color4(0, 0, 0, 1)), depth: 1, stencil: 0 }),
		LOAD_OPERATION: new LoadOperation({ color: new ArrayT2({}, LoadOp.CLEAR), depth: LoadOp.CLEAR, stencil: LoadOp.CLEAR }),
		PIXEL_RATIO: window.devicePixelRatio || 1,
	};


	constructor(renderer, args = {}) {
		super(
			renderer,
			{
				...args,
				
				name: (args.name !== undefined) ? args.name : RenderPostprocessPass.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : RenderPostprocessPass.DEFAULT.TYPE,

				initialized: (args.initialized !== undefined) ? args.initialized : RenderPostprocessPass.DEFAULT.INITIALIZED,
				initialize: (args.initialize !== undefined) ? args.initialize : RenderPostprocessPass.DEFAULT.EXTERNAL.INITIALIZE,
				preprocess: (args.preprocess !== undefined) ? args.preprocess : RenderPostprocessPass.DEFAULT.EXTERNAL.PREPROCESS,
				postprocess: (args.postprocess !== undefined) ? args.postprocess : RenderPostprocessPass.DEFAULT.EXTERNAL.POSTPROCESS,

				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : RenderPostprocessPass.DEFAULT.INSTRUCTION_CACHE.clone(),

				activePipeline: (args.activePipeline !== undefined) ? args.activePipeline : RenderPostprocessPass.DEFAULT.ACTIVE_PIPELINE,

				colorAttachments: (args.colorAttachments !== undefined) ? args.colorAttachments : RenderPostprocessPass.DEFAULT.COLOR_ATTACHMENTS,
				depthStencilAttachment: (args.depthStencilAttachment !== undefined) ? args.depthStencilAttachment : RenderPostprocessPass.DEFAULT.DEPTH_STENCIL_ATTACHMENT,
				occlusionQuerySet: (args.occlusionQuerySet !== undefined) ? args.occlusionQuerySet : RenderPostprocessPass.DEFAULT.OCCLUSION_QUERY_SET,
				timestampWrites: (args.timestampWrites !== undefined) ? args.timestampWrites : RenderPostprocessPass.DEFAULT.TIMESTAMP_WRITES,
				maxDrawCount: (args.maxDrawCount !== undefined) ? args.maxDrawCount : RenderPostprocessPass.DEFAULT.MAX_DRAW_COUNT,
				renderTarget: (args.renderTarget !== undefined) ? args.renderTarget : RenderPostprocessPass.DEFAULT.RENDER_TARGET,

				target: (args.target !== undefined) ? args.target : RenderPostprocessPass.DEFAULT.TARGET,
				viewport: (args.viewport !== undefined) ? args.viewport : RenderPostprocessPass.DEFAULT.VIEWPORT.clone(),

				size: (args.size !== undefined) ? args.size : RenderPostprocessPass.DEFAULT.SIZE.clone(),
				clearvalue: (args.clearvalue !== undefined) ? args.clearvalue : RenderPostprocessPass.DEFAULT.CLEAR_VALUE.clone(),
				loadOperation: (args.loadOperation !== undefined) ? args.loadOperation : RenderPostprocessPass.DEFAULT.LOAD_OPERATION.clone(),
				pixelRatio: (args.pixelRatio !== undefined) ? args.pixelRatio : RenderPostprocessPass.DEFAULT.PIXEL_RATIO,
			}
		);

		this.postprocessScene = new Scene();
		this.postprocessQuad = new Quad(
		    {
				frustumCulled: false,
		        geometry: new QuadGeometry(
		            {
		                indexed: false,
		                baseGeometry: {
		                    positions: [new Vector3(0, 0, 0)],
		                    sizes: [new Vector2(1, 1)]
		                }
		            }
		        ),
				material: new QuadBasicMaterial(
					{
						emissive: new Color4(0, 0, 0, 0),
						diffuse: new Color4(1, 1, 1, 1),
					}
				)
		    }
		);
		this.postprocessCamera = new OrthographicCamera(
			{
				left: -1,
				right: 1,
				top: 1,
				bottom: -1,
				near: 1, //-1
				far: 2 //1
			}
		);
		this.postprocessScene.add(this.postprocessQuad);
	}



	#render(object) {
		const bufferManager = this.renderer.contextManager.bufferManager;
		const textureManager = this.renderer.contextManager.textureManager;
		const samplerManager = this.renderer.contextManager.samplerManager;
		const bindGroupLayoutManager = this.renderer.contextManager.bindGroupLayoutManager;
		const bindGroupManager = this.renderer.contextManager.bindGroupManager;


		//UNIFORM/ATTRIBTUE GETTERS (SET + UPDATE)
		///////////////////////////////////////////////////////////////////////
		// OBJECT
		const RGD00 = this.resourceGroupDescriptors.get(0);
		RGD00.resourceBindingsInternal.clear();
		
		// GEOMETRY
		for (const [name, desc] of object.geometry.attributeLocationDescriptors) {
			if (desc !== null) {
				this.attributeLocationManager.getAttributeLocation(desc);
				this.attributeLocationManager.setAttributeLocationValue(desc);
			}
		}
		
		// MATERIAL
		RGD00.resourceBindingsInternal.set(
			0,
			object.material.resourcePack.getResourceBindingExteInte(3, 0)
		);
		RGD00.resourceBindingsInternal.set(
			10,
			object.material.resourcePack.getResourceBindingExteInte(3, 10)
		);
		RGD00.resourceBindingsInternal.set(
			20,
			object.material.resourcePack.getResourceBindingExteInte(3, 20)
		);
		this.uniformGroupManager.getUniformGroup(RGD00);
		this.uniformGroupManager.setUniformGroupValue(RGD00);


		// PIP
		if (!object.pip) {
			const x = null;
			const y = RenderPipelineDescriptor.CONFIGURATION.POSTPROCESS.TONE_MAPPING;

			object.pipDesc = y;
			object.pip = this.genPip(object, object.material, x, y);
		}
		const renderPipelineDescriptor = object.pipDesc;
		const renderPipeline = object.pip;


		// set pipeline
		if (this.activePipeline === null) {
			this.activePipeline = renderPipelineDescriptor;

			this.renderPassEncoder.setPipeline(renderPipeline);
		}


		// set vertex buffer
		let i = 0;
		for (const [name, desc] of object.geometry.attributeLocationDescriptors) {
			if (desc !== null) { //TODO set here shader location
				const buffer = this.bufferManager.getBuffer(desc.bufferDescriptor);
				this.renderPassEncoder.setVertexBuffer(i++, buffer);
			}
		}


		// set bind group
		this.renderPassEncoder.setBindGroup(0, this.bindGroupManager.getBindGroup(RGD00.bindGroupDescriptor));
		//


		// draw
		const vertexCount = object.geometry.vertices.count();
		this.renderPassEncoder.draw(vertexCount, object.instanceCount, object.firstVertex, object.firstInstance);
		//
	}


	initializeInternal(args = {}) {
		return super.initializeInternal(args);
	}
	preprocessInternal(args = {}) {
		return super.preprocessInternal(args);
	}
	processInternal(args = {}) {
		const argsOut = super.processInternal(args);

		
		// Remove possible previous maps
		argsOut.material.clearMaps();

		// Add textures to material
		for (let i = 0; i < argsOut.maps.length; i++) {
			argsOut.material.addMapBinding(i, argsOut.maps[i]);
		}
		this.postprocessQuad.material = argsOut.material;

		// this.#render(this.postprocessScene, this.postprocessCamera);
		this.#render(this.postprocessQuad);


		return argsOut;
	}
	postprocessInternal(args = {}) {
		return super.postprocessInternal(args);
	}
	render(args = {}) {
		super.processMain(args);
	}
	

	genPip(object, material, x, y) {


		const bundle = {
			camera: null,
			lightManager: { flags: [], values: [] },
			object: object,

			renderPassManager: this.renderPassManager,

			bgl_descriptors: [
				this.resourcePack.getResourceBindingGroup(0).bindGroupLayoutDescriptor,
			]
		};

		
		const rp = this.renderPipelineManager.createRenderPipeline(x, bundle, y);

		return rp;
	}
};