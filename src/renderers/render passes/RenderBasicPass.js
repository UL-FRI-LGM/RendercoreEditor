//


import { RenderPass } from "./RenderPass.js";
import { GPULoadOp } from "../../core/ENUM/GPULoadOp.js";
import { Color4 } from "../../math/Color4.js";
import { MeshRenderer } from "../MeshRenderer.js";
import { RenderOpaquePipelineDescriptor } from "../../core/RC/pipeline/RenderOpaquePipelineDescriptor.js";
import { PipelineLayoutDescriptor } from "../../core/RC/resource binding/PipelineLayoutDescriptor.js";
import { RenderPipelineDescriptor } from "../../core/RC/pipeline/RenderPipelineDescriptor.js";


export class RenderBasicPass extends RenderPass {


	static DEFAULT = {
		NAME: "",
		TYPE: "RenderBasicPass",

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
				
				name: (args.name !== undefined) ? args.name : RenderBasicPass.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : RenderBasicPass.DEFAULT.TYPE,

				initialized: (args.initialized !== undefined) ? args.initialized : RenderBasicPass.DEFAULT.INITIALIZED,
				initialize: (args.initialize !== undefined) ? args.initialize : RenderBasicPass.DEFAULT.EXTERNAL.INITIALIZE,
				preprocess: (args.preprocess !== undefined) ? args.preprocess : RenderBasicPass.DEFAULT.EXTERNAL.PREPROCESS,
				postprocess: (args.postprocess !== undefined) ? args.postprocess : RenderBasicPass.DEFAULT.EXTERNAL.POSTPROCESS,

				colorAttachments: (args.colorAttachments !== undefined) ? args.colorAttachments : RenderBasicPass.DEFAULT.COLOR_ATTACHMENTS,
				depthStencilAttachment: (args.depthStencilAttachment !== undefined) ? args.depthStencilAttachment : RenderBasicPass.DEFAULT.DEPTH_STENCIL_ATTACHMENT,
				occlusionQuerySet: (args.occlusionQuerySet !== undefined) ? args.occlusionQuerySet : RenderBasicPass.DEFAULT.OCCLUSION_QUERY_SET,
				timestampWrites: (args.timestampWrites !== undefined) ? args.timestampWrites : RenderBasicPass.DEFAULT.TIMESTAMP_WRITES,
				maxDrawCount: (args.maxDrawCount !== undefined) ? args.maxDrawCount : RenderBasicPass.DEFAULT.MAX_DRAW_COUNT,
			
				target: (args.target !== undefined) ? args.target : RenderBasicPass.DEFAULT.TARGET,
				viewport: (args.viewport !== undefined) ? args.viewport : { ...RenderBasicPass.DEFAULT.VIEWPORT }, //copy
				clearvalue: (args.clearvalue !== undefined) ? args.clearvalue : RenderBasicPass.DEFAULT.CLEAR_VALUE,
				colorLoadOperation: (args.colorLoadOperation !== undefined) ? args.colorLoadOperation : RenderBasicPass.DEFAULT.COLOR_LOAD_OPERATION,
			}
		);

		this.colorAttachmentTextureDescriptors = args.colorAttachmentTextureDescriptors;
		this.colorAttachmentViewDescriptors = args.colorAttachmentViewDescriptors;

		this.depthStencilAttachmentTextureDescriptor = args.depthStencilAttachmentTextureDescriptor;
		this.depthStencilAttachmentViewDescriptor = args.depthStencilAttachmentViewDescriptor;

		console.error(this);
	}



	#renderObject(object, sceneManager) {
		const camera = sceneManager.cameraManager.activeCamera;
		const lightManager = sceneManager.lightManager;

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
			const x = new RenderOpaquePipelineDescriptor({ label: "render opaque pipeline" });
			const y = (object.material.transparent) ? 
			RenderPipelineDescriptor.CONFIGURATION.TRIANGLE_TRANSPARENT_LAMBERT : 
			RenderPipelineDescriptor.CONFIGURATION.TRIANGLE_OPAQUE_LAMBERT;

			object.pipDesc = y;
			object.pip = this.#genPip(object, lightManager, camera, x, y);
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
		this.renderPassEncoder.setBindGroup(2, bindGroupManager.getBindGroup(object.uniformGroupDescriptor.bindGroupDescriptor));
		this.renderPassEncoder.setBindGroup(3, bindGroupManager.getBindGroup(object.material.uniformGroupDescriptor.bindGroupDescriptor));
		//


		// draw
		const vertexCount = object.geometry.vertices.count();
		this.renderPassEncoder.draw(vertexCount, object.instanceCount, object.firstVertex, object.firstInstance);
		//
	}
	#renderObjects(renderArray, sceneManager) {
		for (let i = 0; i < renderArray.length; i++) {
			const object = renderArray.get(i);


			let selectedMaterial;
			if(this._renderMode === MeshRenderer.MODE.COLOR){
				selectedMaterial = object.material;
			}else if(this._renderMode === MeshRenderer.MODE.SHADOW){
				selectedMaterial = object._DSM;
			}else if(this._renderMode === MeshRenderer.MODE.P_SHADOW){
				selectedMaterial = object._PSM;
			}else if(this._renderMode == MeshRenderer.MODE.GEOMETRY){
				selectedMaterial = object.GBufferMaterial;
			}else if(this._renderMode == MeshRenderer.MODE.PICK){
				selectedMaterial = object._PM;
			}else{
				selectedMaterial = object.material;
			}


			this.#renderObject(object, sceneManager);
		}
	}
	#renderOpaqueObjects(renderArray, sceneManager){
		if (renderArray.length > 0) {
			// Sort the objects by render order
			renderArray.sort(function(a, b) {
				return a.renderOrder - b.renderOrder;
			});

			this.#renderObjects(renderArray, sceneManager);
		}
	}
	#renderTransparentObjects(renderArray, sceneManager){
		const camera = sceneManager.cameraManager.activeCamera;
		if (renderArray.length > 0) {
			// Sort the objects by z

			// console.error(camera.parent.transform.local.position);

			renderArray.sort(function(a, b) {
				const renderOrderDiff = a.renderOrder - b.renderOrder;
				if (renderOrderDiff === 0) {
					// TODO fix global transform, then cahnge this to local
					// return b.transform.global.position.distanceToSquared(camera.transform.global.position) - a.transform.global.position.distanceToSquared(camera.transform.global.position);
					return b.transform.local.position.distanceToSquared(camera.parent.transform.local.position) - a.transform.local.position.distanceToSquared(camera.parent.transform.local.position);
				} else {
					return renderOrderDiff;
				}
			});

			this.#renderObjects(renderArray, sceneManager);
		}
	}
	#render(args = {}) {
		const sceneManager = args.sceneManager;
		const renderArrayManager = args.renderArrayManager;

		// Render opaque objects
		this.#renderOpaqueObjects(renderArrayManager.opaqueObjects, sceneManager);
		// Render transparent objects
		this.#renderTransparentObjects(renderArrayManager.transparentObjects, sceneManager);
		// Render skybox last (opitmization)
		this.#renderOpaqueObjects(renderArrayManager.skyboxes, sceneManager);
	}

	initializeInternal(args = {}) {
		return super.initializeInternal(args);
	}
	preprocessInternal(args = {}) {
		const argsOut = super.preprocessInternal(args);


		const sceneManager = args.sceneManager;
		const scene = args.scene;
		const camera = args.camera;
		const lightManager = args.sceneManager.lightManager;
		const renderPassManager = args.renderPassManager;

		// SETUP SCENE = SETUP CAMERA + SETUP LIGHTS + SETUP OBJECTS
		sceneManager.activeScene = scene;
		sceneManager.setup(renderPassManager, camera);
		sceneManager.update(renderPassManager, camera);


		///
		const bindGroupManager = this.renderer.contextManager.bindGroupManager;
		const attributeLocationManager = this.renderer.contextManager.attributeLocationManager;
		const uniformGroupManager = this.renderer.contextManager.uniformGroupManager;
		
		// CAMERA
		uniformGroupManager.getUniformGroup(camera.uniformGroupDescriptor);
		uniformGroupManager.setUniformGroup(camera.uniformGroupDescriptor);
		// LIGHTS
		uniformGroupManager.getUniformGroup(lightManager.uniformGroupDescriptor);
		uniformGroupManager.setUniformGroup(lightManager.uniformGroupDescriptor);
	
		// set bind group
		this.renderPassEncoder.setBindGroup(0, bindGroupManager.getBindGroup(camera.uniformGroupDescriptor.bindGroupDescriptor));
		this.renderPassEncoder.setBindGroup(1, bindGroupManager.getBindGroup(lightManager.uniformGroupDescriptor.bindGroupDescriptor));
		///


		return argsOut;
	}
	processInternal(args = {}) {
		const argsOut = super.processInternal(args);


		this.#render(argsOut);
	

		return argsOut;
	}
	postprocessInternal(args = {}) {
		return super.postprocessInternal(args);
	}
	processMain(args = {}) {
		super.processMain(args);
	}
	

	#genPip(object, lightManager, camera, x, y) {


		const bundle = {
			camera: camera,
			lightManager: lightManager,
			object: object,

			renderPassManager: this.renderPassManager,

			bgl_descriptors: [
				camera.uniformGroupDescriptor.bindGroupLayoutDescriptor,
				lightManager.uniformGroupDescriptor.bindGroupLayoutDescriptor,
				object.uniformGroupDescriptor.bindGroupLayoutDescriptor,
				object.material.uniformGroupDescriptor.bindGroupLayoutDescriptor,
			],

			PLD: PipelineLayoutDescriptor.CONFIGURATION.RENDER_BASIC,
		};


		const rp = this.renderPipelineManager.createRenderPipeline(x, bundle, y);

		return rp;
	}
};