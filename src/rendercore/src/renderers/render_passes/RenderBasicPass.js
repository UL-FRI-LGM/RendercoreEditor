//


import { RenderPass } from "./RenderPass.js";
import { LoadOp } from "../../core/RC/LoadOp.js";
import { Color4 } from "../../math/Color4.js";
import { MeshRenderer } from "../MeshRenderer.js";
import { PipelineLayoutDescriptor } from "../../core/RC/resource_binding/PipelineLayoutDescriptor.js";
import { RenderPipelineDescriptor } from "../../core/RC/pipeline/RenderPipelineDescriptor.js";
import { Viewport } from "./Viewport.js";
import { ArrayT2 } from "../../core/ArrayT2.js";
import { Extent3D } from "../../core/RC/textures/Extent3D.js";
import { ClearValue } from "../ClearValue.js";
import { LoadOperation } from "../LoadOperation.js";
import { IndexFormat } from "../../core/RC/pipeline/vertex_state/IndexFormat.js";
import { InstructionCache } from "../../core/data_layouts/InstructionCache.js";
import { ScissorRectangle } from "./ScissorRectangle.js";
import { StoreOperation } from "../StoreOperation.js";
import { StoreOp } from "../../core/RC/StoreOp.js";
import { AttachmentReadOnly } from "../AttachmentReadOnly.js";
import { AttachmentTextureDescriptor } from "../AttachmentTextureDescriptor.js";
import { TextureDescriptor } from "../../core/RC/textures/TextureDescriptor.js";
import { TextureDimension } from "../../core/RC/textures/TextureDimension.js";
import { TextureFormat } from "../../core/RC/textures/TextureFormat.js";
import { TextureUsage } from "../../core/RC/textures/TextureUsage.js";
import { AttachmentTextureViewDescriptor } from "../AttachmentTextureViewDescriptor.js";
import { TextureViewDescriptor } from "../../core/RC/textures/TextureViewDescriptor.js";
import { TextureView } from "../../core/RC/textures/TextureView.js";
import { Point } from "../../objects/point/Point.js";
import { Line } from "../../objects/line/Line.js";
import { Triangle } from "../../objects/triangle/Triangle.js";


export class RenderBasicPass extends RenderPass {


	static DEFAULT = {
		TYPE: "RenderBasicPass",
		NAME: "",

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
							label: `${RenderBasicPass.name}`,
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
						label: `${RenderBasicPass.name}`,
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
							label: `${RenderBasicPass.name}`,
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
						label: `${RenderBasicPass.name}`,
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
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : RenderBasicPass.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : RenderBasicPass.DEFAULT.NAME,

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
				scissorRectangle: (args.scissorRectangle !== undefined) ? args.scissorRectangle : RenderBasicPass.DEFAULT.SCISSOR_RECTANGLE.clone(),

				clearValue: (args.clearValue !== undefined) ? args.clearValue : RenderBasicPass.DEFAULT.CLEAR_VALUE.clone(),
				loadOperation: (args.loadOperation !== undefined) ? args.loadOperation : RenderBasicPass.DEFAULT.LOAD_OPERATION.clone(),
				storeOperation: (args.storeOperation !== undefined) ? args.storeOperation : RenderBasicPass.DEFAULT.STORE_OPERATION.clone(),
				attachmentReadOnly: (args.attachmentReadOnly !== undefined) ? args.attachmentReadOnly : RenderBasicPass.DEFAULT.ATTACHMENT_READ_ONLY.clone(),
				attachmentTextureDescriptor: (args.attachmentTextureDescriptor !== undefined) ? args.attachmentTextureDescriptor : RenderBasicPass.DEFAULT.ATTACHMENT_TEXTURE_DESCRIPTOR.clone(),
				attachmentTextureViewDescriptor: (args.attachmentTextureViewDescriptor !== undefined) ? args.attachmentTextureViewDescriptor : RenderBasicPass.DEFAULT.ATTACHMENT_TEXTURE_VIEW_DESCRIPTOR.clone(),

				pixelRatio: (args.pixelRatio !== undefined) ? args.pixelRatio : RenderBasicPass.DEFAULT.PIXEL_RATIO,
			}
		);
	}


	#renderObject(object, scene) {
		const camera = scene.cameraManager.activeCamera;
		const lightManager = scene.lightManager;

		const bufferManager = this.bufferManager;
		const textureManager = this.textureManager;
		const samplerManager = this.samplerManager;
		const bindGroupLayoutManager = this.bindGroupLayoutManager;
		const bindGroupManager = this.bindGroupManager;


		//UNIFORM/ATTRIBUTE GETTERS (SET + UPDATE)
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

		// set dirty flags to force a texture update (e.g. for a resize)
		// RGD03.dirty = true;
		// RGD03.bindGroupDescriptor.dirty = true;

		this.uniformGroupManager.getUniformGroup(RGD03);
		this.uniformGroupManager.setUniformGroupValue(RGD03);


		// PIP
		if (!object.pip) {
			const x = null;
			let y;
			
			if (object instanceof Point) {
				if (object.material.transparent) {
					y = RenderPipelineDescriptor.CONFIGURATION.POINT.LAMBERT.TRANSPARENT_FBGRA;
				} else {
					y = RenderPipelineDescriptor.CONFIGURATION.POINT.LAMBERT.OPAQUE_FBGRA;
				}
			} else if (object instanceof Line) {
				if (object.material.transparent) {
					y = RenderPipelineDescriptor.CONFIGURATION.LINE.LAMBERT.TRANSPARENT_FBGRA;
				} else {
					y = RenderPipelineDescriptor.CONFIGURATION.LINE.LAMBERT.OPAQUE_FBGRA;
				}
			} else if (object instanceof Triangle) {
				if (object.material.transparent) {
					y = RenderPipelineDescriptor.CONFIGURATION.TRIANGLE.LAMBERT.TRANSPARENT_FBGRA;
				} else {
					y = RenderPipelineDescriptor.CONFIGURATION.TRIANGLE.LAMBERT.OPAQUE_FBGRA;
				}
			} else {
				if (object.material.transparent) {
					y = RenderPipelineDescriptor.CONFIGURATION.TRIANGLE.LAMBERT.TRANSPARENT_FBGRA;
				} else {
					y = RenderPipelineDescriptor.CONFIGURATION.TRIANGLE.LAMBERT.OPAQUE_FBGRA;
				}
			}

			object.pipDesc = y;
			object.pip = this.#genPip(object, lightManager, camera, x, y);
		}
		const renderPipelineDescriptor = object.pipDesc;
		const renderPipeline = object.pip;


		// set pipeline
		if (this.activePipeline !== renderPipeline) {
			this.activePipeline = renderPipeline;

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
	#render(args = {}) {
		const scene = args.scene;
		const renderArrayManager = args.renderArrayManager;
		const camera = args.camera;
		const lightManager = args.scene.lightManager;

		const renderPassManager = args.renderPassManager;
		const bindGroupManager = this.bindGroupManager;


		// PASS + CAMERA
		const RGD00 = camera.resourcePack.getResourceBindingGroup(0);
		this.uniformGroupManager.getUniformGroup(RGD00);
		this.uniformGroupManager.setUniformGroupValue(RGD00);
		const group_00 = this.resourcePack.getResourceBindingGroup(0);
		const binding_00_00 = camera.resourcePack.getResourceBindingExteInte(0, 0);
		const binding_00_01 = this.resourcePack.getResourceBindingExteInte(0, 1);
		this.resourcePack.setResourceBindingInternal(0, 0, binding_00_00);
		this.resourcePack.setResourceBindingInternal(0, 1, binding_00_01);
		this.uniformGroupManager.getUniformGroup(group_00);
		this.uniformGroupManager.setUniformGroupValue(group_00);
		// set bind group
		this.renderPassEncoder.setBindGroup(0, this.bindGroupManager.getBindGroup(group_00.bindGroupDescriptor));


		// LIGHTS
		const RGD01 = lightManager.resourcePack.getResourceBindingGroup(1);
		this.uniformGroupManager.getUniformGroup(RGD01);
		this.uniformGroupManager.setUniformGroupValue(RGD01);
		// set bind group
		this.renderPassEncoder.setBindGroup(1, this.bindGroupManager.getBindGroup(RGD01.bindGroupDescriptor));


		// Render opaque objects
		this.#renderObjects(renderArrayManager.opaqueObjects, scene);
		// Render transparent objects
		this.#renderObjects(renderArrayManager.transparentObjects, scene);
		// Render skybox last (optimization)
		this.#renderObjects(renderArrayManager.skyboxes, scene);
	}

	initializeInternal(args = {}) {
		return super.initializeInternal(args);
	}
	preprocessInternal(args = {}) {
		return super.preprocessInternal(args);
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
				// camera.resourcePack.getResourceBindingGroup(0).bindGroupLayoutDescriptor,
				this.resourcePack.getResourceBindingGroup(0).bindGroupLayoutDescriptor,
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