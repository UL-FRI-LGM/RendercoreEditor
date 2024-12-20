//


import { RenderPass } from "./RenderPass.js";
import { LoadOp } from "../../core/RC/LoadOp.js";
import { Color4 } from "../../math/Color4.js";
import { MeshRenderer } from "../MeshRenderer.js";
import { PipelineLayoutDescriptor } from "../../core/RC/resource_binding/PipelineLayoutDescriptor.js";
import { RenderPipelineDescriptor } from "../../core/RC/pipeline/RenderPipelineDescriptor.js";
import { Viewport } from "./Viewport.js";
import { Size } from "../Size.js";
import { ArrayT2 } from "../../core/ArrayT2.js";
import { Extent3D } from "../../core/RC/textures/Extent3D.js";
import { ClearValue } from "../ClearValue.js";
import { LoadOperation } from "../LoadOperation.js";
import { IndexFormat } from "../../core/RC/pipeline/vertex_state/IndexFormat.js";
import { InstructionCache } from "../../core/data_layouts/InstructionCache.js";


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

		INSTRUCTION_CACHE : new InstructionCache(
			{ name: "IC - RENDER BASIC PASS" },
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
				
				name: (args.name !== undefined) ? args.name : RenderBasicPass.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : RenderBasicPass.DEFAULT.TYPE,

				initialized: (args.initialized !== undefined) ? args.initialized : RenderBasicPass.DEFAULT.INITIALIZED,
				initialize: (args.initialize !== undefined) ? args.initialize : RenderBasicPass.DEFAULT.EXTERNAL.INITIALIZE,
				preprocess: (args.preprocess !== undefined) ? args.preprocess : RenderBasicPass.DEFAULT.EXTERNAL.PREPROCESS,
				postprocess: (args.postprocess !== undefined) ? args.postprocess : RenderBasicPass.DEFAULT.EXTERNAL.POSTPROCESS,

				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : RenderBasicPass.DEFAULT.INSTRUCTION_CACHE.clone(),

				activePipeline: (args.activePipeline !== undefined) ? args.activePipeline : RenderBasicPass.DEFAULT.ACTIVE_PIPELINE,

				colorAttachments: (args.colorAttachments !== undefined) ? args.colorAttachments : RenderBasicPass.DEFAULT.COLOR_ATTACHMENTS,
				depthStencilAttachment: (args.depthStencilAttachment !== undefined) ? args.depthStencilAttachment : RenderBasicPass.DEFAULT.DEPTH_STENCIL_ATTACHMENT,
				occlusionQuerySet: (args.occlusionQuerySet !== undefined) ? args.occlusionQuerySet : RenderBasicPass.DEFAULT.OCCLUSION_QUERY_SET,
				timestampWrites: (args.timestampWrites !== undefined) ? args.timestampWrites : RenderBasicPass.DEFAULT.TIMESTAMP_WRITES,
				maxDrawCount: (args.maxDrawCount !== undefined) ? args.maxDrawCount : RenderBasicPass.DEFAULT.MAX_DRAW_COUNT,
				renderTarget: (args.renderTarget !== undefined) ? args.renderTarget : RenderBasicPass.DEFAULT.RENDER_TARGET,

				target: (args.target !== undefined) ? args.target : RenderBasicPass.DEFAULT.TARGET,
				viewport: (args.viewport !== undefined) ? args.viewport : RenderBasicPass.DEFAULT.VIEWPORT.clone(),

				size: (args.size !== undefined) ? args.size : RenderBasicPass.DEFAULT.SIZE.clone(),
				clearvalue: (args.clearvalue !== undefined) ? args.clearvalue : RenderBasicPass.DEFAULT.CLEAR_VALUE.clone(),
				loadOperation: (args.loadOperation !== undefined) ? args.loadOperation : RenderBasicPass.DEFAULT.LOAD_OPERATION.clone(),
				pixelRatio: (args.pixelRatio !== undefined) ? args.pixelRatio : RenderBasicPass.DEFAULT.PIXEL_RATIO,
			}
		);
	}


	#renderObject(object, scene) {
		const camera = scene.cameraManager.activeCamera;
		const lightManager = scene.lightManager;

		const bufferManager = this.renderer.contextManager.bufferManager;
		const textureManager = this.renderer.contextManager.textureManager;
		const samplerManager = this.renderer.contextManager.samplerManager;
		const bindGroupLayoutManager = this.renderer.contextManager.bindGroupLayoutManager;
		const bindGroupManager = this.renderer.contextManager.bindGroupManager;


		//UNIFORM/ATTRIBTUE GETTERS (SET + UPDATE)
		///////////////////////////////////////////////////////////////////////
		// OBJECTS
		const RGD02 = object.resourcePack.getResourceBindingGroup(2);
		this.uniformGroupManager.getUniformGroup(RGD02);
		this.uniformGroupManager.setUniformGroupValue(RGD02);

		// GEOMETRY
		for (const [name, desc] of object.geometry.attributeLocationDescriptors) {
			if (desc !== null) {
				this.attributeLocationManager.getAttributeLocation(desc);
				this.attributeLocationManager.setAttributeLocationValue(desc);
			}
		}

		// MATERIAL
		const RGD03 = object.material.resourcePack.getResourceBindingGroup(3);
		this.uniformGroupManager.getUniformGroup(RGD03);
		this.uniformGroupManager.setUniformGroupValue(RGD03);


		// PIP
		if (!object.pip) {
			const x = null;
			let y = (object.material.transparent) ? 
			RenderPipelineDescriptor.CONFIGURATION.TRIANGLE.LAMBERT.TRANSPARENT_FBGRA: 
			RenderPipelineDescriptor.CONFIGURATION.TRIANGLE.LAMBERT.OPAQUE_FBGRA;

			object.pipDesc = y;
			object.pip = this.#genPip(object, lightManager, camera, x, y);
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
				const buffer = bufferManager.getBuffer(desc.bufferDescriptor);
				this.renderPassEncoder.setVertexBuffer(i++, buffer);
			}
		}


		// set bind group
		this.renderPassEncoder.setBindGroup(2, this.bindGroupManager.getBindGroup(RGD02.bindGroupDescriptor));
		this.renderPassEncoder.setBindGroup(3, this.bindGroupManager.getBindGroup(RGD03.bindGroupDescriptor));
		//


		// draw
		if (object.geometry.indices) {
			// force indices update with this
			this.attributeLocationManager.getAttributeLocation(object.geometry.indices);
			this.attributeLocationManager.setAttributeLocationValue(object.geometry.indices);

			const indexBuffer = this.bufferManager.getBuffer(object.geometry.indices.bufferDescriptor);
			
			this.renderPassEncoder.setIndexBuffer(indexBuffer, IndexFormat.UINT_32);
			this.renderPassEncoder.drawIndexed(object.indexCount, object.instanceCount, object.firstIndex, object.baseVertex, object.firstInstance);
		} else {
			this.renderPassEncoder.draw(object.vertexCount, object.instanceCount, object.firstVertex, object.firstInstance);
		}
		//
	}
	#renderObjects(renderArray, scene) {
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


			this.#renderObject(object, scene);
		}
	}
	#renderOpaqueObjects(renderArray, scene){
		if (renderArray.length > 0) {
			// Sort the objects by render order
			renderArray.sort(function(a, b) {
				return a.renderOrder - b.renderOrder;
			});

			this.#renderObjects(renderArray, scene);
		}
	}
	#renderTransparentObjects(renderArray, scene){
		const camera = scene.cameraManager.activeCamera;
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

			this.#renderObjects(renderArray, scene);
		}
	}
	#render(args = {}) {
		const scene = args.scene;
		const renderArrayManager = args.scene.renderArrayManager;
		const camera = args.camera;
		const lightManager = args.scene.lightManager;

		const renderPassManager = args.renderPassManager;
		const bindGroupManager = this.renderer.contextManager.bindGroupManager;


		// CAMERA
		const RGD00 = camera.resourcePack.getResourceBindingGroup(0);
		this.uniformGroupManager.getUniformGroup(RGD00);
		this.uniformGroupManager.setUniformGroupValue(RGD00);
		// LIGHTS
		const RGD01 = lightManager.resourcePack.getResourceBindingGroup(1);
		this.uniformGroupManager.getUniformGroup(RGD01);
		this.uniformGroupManager.setUniformGroupValue(RGD01);
	
		// set bind group
		this.renderPassEncoder.setBindGroup(0, this.bindGroupManager.getBindGroup(RGD00.bindGroupDescriptor));
		this.renderPassEncoder.setBindGroup(1, this.bindGroupManager.getBindGroup(RGD01.bindGroupDescriptor));
		//


		// Render opaque objects
		this.#renderOpaqueObjects(renderArrayManager.opaqueObjects, scene);
		// Render transparent objects
		this.#renderTransparentObjects(renderArrayManager.transparentObjects, scene);
		// Render skybox last (opitmization)
		this.#renderOpaqueObjects(renderArrayManager.skyboxes, scene);
	}

	initializeInternal(args = {}) {
		return super.initializeInternal(args);
	}
	preprocessInternal(args = {}) {
		const argsOut = super.preprocessInternal(args);


		// const sceneManager = args.sceneManager;
		const scene = args.scene;
		const camera = args.camera;

		const lightManager = args.scene.lightManager;
		const renderPassManager = args.renderPassManager;


		// sceneManager.setup(renderPassManager, camera);
		// sceneManager.update(renderPassManager, camera);

		// sceneManager.processMain(
		// 	{
		// 		scene: scene,
		// 		camera: camera,
		// 	}
		// );

		scene.processMain(
			{
				argsUpdate: (args.argsUpdate !== undefined) ? args.argsUpdate : scene.argsUpdate,


                camera: camera,
			}
		);


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
				camera.resourcePack.getResourceBindingGroup(0).bindGroupLayoutDescriptor,
				lightManager.resourcePack.getResourceBindingGroup(1).bindGroupLayoutDescriptor,
				object.resourcePack.getResourceBindingGroup(2).bindGroupLayoutDescriptor,
				object.material.resourcePack.getResourceBindingGroup(3).bindGroupLayoutDescriptor,
			],

			PLD: PipelineLayoutDescriptor.CONFIGURATION.RENDER.BASIC,
		};


		const rp = this.renderPipelineManager.createRenderPipeline(x, bundle, y);

		return rp;
	}
};