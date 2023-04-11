//


import { RenderPass } from "./RenderPass.js";
import { GPULoadOp } from "../../core/ENUM/GPULoadOp.js";
import { Color4 } from "../../math/Color4.js";
import { OrthographicCamera, Scene, Vector2, Vector3 } from "../../RenderCore.js";
import { Quad } from "../../objects/Quad.js";
import { QuadGeometry } from "../../objects/QuadGeometry.js";
import { QuadBasicMaterial } from "../../materials/QuadBasicMaterial.js";
import { RenderPipelineDescriptor } from "../../core/RC/pipeline/RenderPipelineDescriptor.js";


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

		COLOR_ATTACHMENTS: undefined,
		DEPTH_STENCIL_ATTACHMENT: undefined,
		OCCLUSION_QUERY_SET: undefined,
		TIMESTAMP_WRITES: undefined,
		MAX_DRAW_COUNT: undefined,

		TARGET: RenderPass.TARGET.SCREEN,
		VIEWPORT: { x: 0, y: 0, width: 1280, height: 720 },
		CLEAR_VALUE: new Color4(0, 0, 0, 1),
		COLOR_LOAD_OPERATION: GPULoadOp.CLEAR,
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

				colorAttachments: (args.colorAttachments !== undefined) ? args.colorAttachments : RenderPostprocessPass.DEFAULT.COLOR_ATTACHMENTS,
				depthStencilAttachment: (args.depthStencilAttachment !== undefined) ? args.depthStencilAttachment : RenderPostprocessPass.DEFAULT.DEPTH_STENCIL_ATTACHMENT,
				occlusionQuerySet: (args.occlusionQuerySet !== undefined) ? args.occlusionQuerySet : RenderPostprocessPass.DEFAULT.OCCLUSION_QUERY_SET,
				timestampWrites: (args.timestampWrites !== undefined) ? args.timestampWrites : RenderPostprocessPass.DEFAULT.TIMESTAMP_WRITES,
				maxDrawCount: (args.maxDrawCount !== undefined) ? args.maxDrawCount : RenderPostprocessPass.DEFAULT.MAX_DRAW_COUNT,
			
				target: (args.target !== undefined) ? args.target : RenderPostprocessPass.DEFAULT.TARGET,
				viewport: (args.viewport !== undefined) ? args.viewport : { ...RenderPostprocessPass.DEFAULT.VIEWPORT }, //copy
				clearvalue: (args.clearvalue !== undefined) ? args.clearvalue : RenderPostprocessPass.DEFAULT.CLEAR_VALUE,
				colorLoadOperation: (args.colorLoadOperation !== undefined) ? args.colorLoadOperation : RenderPostprocessPass.DEFAULT.COLOR_LOAD_OPERATION,
			}
		);

		this.colorAttachmentTextureDescriptors = args.colorAttachmentTextureDescriptors;
		this.colorAttachmentViewDescriptors = args.colorAttachmentViewDescriptors;

		this.depthStencilAttachmentTextureDescriptor = args.depthStencilAttachmentTextureDescriptor;
		this.depthStencilAttachmentViewDescriptor = args.depthStencilAttachmentViewDescriptor;

		console.error(this);


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

		const attributeLocationManager = this.renderer.contextManager.attributeLocationManager;
		const uniformGroupManager = this.renderer.contextManager.uniformGroupManager;


		//UNIFORM/ATTRIBTUE GETTERS (SET + UPDATE)
		///////////////////////////////////////////////////////////////////////
		// OBJECT
		uniformGroupManager.getUniformGroup(object.uniformGroupDescriptor);
		uniformGroupManager.setUniformGroup(object.uniformGroupDescriptor);
		// GEOMETRY
		for (const [name, desc] of object.geometry.attributeLocationDescriptors) {
			if (desc !== null) {
				attributeLocationManager.getAttributeLocation(desc);
				attributeLocationManager.setAttributeLocation(desc);
			}
		}
		// MATERIAL
		uniformGroupManager.getUniformGroup(object.material.uniformGroupDescriptor);
		uniformGroupManager.setUniformGroup(object.material.uniformGroupDescriptor);


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
		if (this.PIPELINE_RPD !== renderPipelineDescriptor || this.activePip === null) {
			this.PIPELINE_RPD = renderPipelineDescriptor;
			this.activePip = renderPipelineDescriptor;

			this.renderPassEncoder.setPipeline(renderPipeline);
		}


		// set vertex buffer
		let i = 0;
		for (const [name, desc] of object.geometry.attributeLocationDescriptors) {
			if (desc !== null) { //TODO set here shader location
				const buffer = bufferManager.getBuffer(desc.bufferDescriptor);
				this.renderPassEncoder.setVertexBuffer(i++, buffer);
			}
		}


		// set bind group
		this.renderPassEncoder.setBindGroup(0, bindGroupManager.getBindGroup(object.material.uniformGroupDescriptor.bindGroupDescriptor));
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
				object.material.uniformGroupDescriptor.bindGroupLayoutDescriptor,
			]
		};

		
		const rp = this.renderPipelineManager.createRenderPipeline(x, bundle, y);

		return rp;
	}
};