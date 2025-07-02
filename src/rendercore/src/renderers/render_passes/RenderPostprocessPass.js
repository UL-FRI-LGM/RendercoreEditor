//


import { RenderPass } from "./RenderPass.js";
import { LoadOp } from "../../core/RC/LoadOp.js";
import { Color4 } from "../../math/Color4.js";
import { OrthographicCamera, Scene, Vector2, Vector3 } from "../../RenderCore.js";
import { Quad } from "../../objects/quad/Quad.js";
import { QuadGeometry } from "../../objects/quad/QuadGeometry.js";
import { QuadBasicMaterial } from "../../materials/QuadBasicMaterial.js";
import { RenderPipelineDescriptor } from "../../core/RC/pipeline/RenderPipelineDescriptor.js";
import { Viewport } from "./Viewport.js";
import { ArrayT2 } from "../../core/ArrayT2.js";
import { Extent3D } from "../../core/RC/textures/Extent3D.js";
import { ClearValue } from "../ClearValue.js";
import { LoadOperation } from "../LoadOperation.js";
import { InstructionCache } from "../../core/data_layouts/InstructionCache.js";
import { QuadBaseGeometry } from "../../objects/quad/QuadBaseGeometry.js";
import { PipelineLayoutDescriptor } from "../../core/RC/resource_binding/PipelineLayoutDescriptor.js";
import { ScissorRectangle } from "./ScissorRectangle.js";
import { PostprocessDilationMaterial } from "../../materials/PostprocessDilationMaterial.js";
import { PostprocessToneMappingMaterial } from "../../materials/PostprocessToneMappingMaterial.js";
import { ErrorT2 } from "../../ErrorT2.js";
import { PostprocessPixelizationMaterial } from "../../materials/PostprocessPixelizationMaterial.js";
import { StoreOperation } from "../StoreOperation.js";
import { StoreOp } from "../../core/RC/StoreOp.js";
import { PostprocessCopyTextureMaterial } from "../../materials/PostprocessCopyTextureMaterial.js";
import { AttachmentReadOnly } from "../AttachmentReadOnly.js";
import { AttachmentTextureDescriptor } from "../AttachmentTextureDescriptor.js";
import { TextureDescriptor } from "../../core/RC/textures/TextureDescriptor.js";
import { TextureDimension } from "../../core/RC/textures/TextureDimension.js";
import { TextureFormat } from "../../core/RC/textures/TextureFormat.js";
import { TextureUsage } from "../../core/RC/textures/TextureUsage.js";
import { AttachmentTextureViewDescriptor } from "../AttachmentTextureViewDescriptor.js";
import { TextureViewDescriptor } from "../../core/RC/textures/TextureViewDescriptor.js";
import { TextureView } from "../../core/RC/textures/TextureView.js";


export class RenderPostprocessPass extends RenderPass {


	static DEFAULT = {
		TYPE: "RenderPostprocessPass",
		NAME: "",

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
							label: `${RenderPostprocessPass.name}`,
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
						label: `${RenderPostprocessPass.name}`,
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
							label: `${RenderPostprocessPass.name}`,
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
						label: `${RenderPostprocessPass.name}`,
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
				scissorRectangle: (args.scissorRectangle !== undefined) ? args.scissorRectangle : RenderPostprocessPass.DEFAULT.SCISSOR_RECTANGLE.clone(),

				clearValue: (args.clearValue !== undefined) ? args.clearValue : RenderPostprocessPass.DEFAULT.CLEAR_VALUE.clone(),
				loadOperation: (args.loadOperation !== undefined) ? args.loadOperation : RenderPostprocessPass.DEFAULT.LOAD_OPERATION.clone(),
				storeOperation: (args.storeOperation !== undefined) ? args.storeOperation : RenderPostprocessPass.DEFAULT.STORE_OPERATION.clone(),
				attachmentReadOnly: (args.attachmentReadOnly !== undefined) ? args.attachmentReadOnly : RenderPostprocessPass.DEFAULT.ATTACHMENT_READ_ONLY.clone(),
				attachmentTextureDescriptor: (args.attachmentTextureDescriptor !== undefined) ? args.attachmentTextureDescriptor : RenderPostprocessPass.DEFAULT.ATTACHMENT_TEXTURE_DESCRIPTOR.clone(),
				attachmentTextureViewDescriptor: (args.attachmentTextureViewDescriptor !== undefined) ? args.attachmentTextureViewDescriptor : RenderPostprocessPass.DEFAULT.ATTACHMENT_TEXTURE_VIEW_DESCRIPTOR.clone(),

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
						baseGeometry: new QuadBaseGeometry(),
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
		//UNIFORM/ATTRIBTUE GETTERS (SET + UPDATE)
		///////////////////////////////////////////////////////////////////////
		// OBJECT
			// const RGD00 = this.resourceGroupDescriptors.get(0);
			// RGD00.resourceBindingsInternal.clear();
			// // RGD00.resourceBindingsInternal.set(
			// // 	0,
			// // 	object.resourcePack.getResourceBindingExteInte(2, 0)
			// // );
			// // this.uniformGroupManager.getUniformGroup(RGD00);
			// // this.uniformGroupManager.setUniformGroupValue(RGD00);

		// GEOMETRY
		for (const [name, desc] of object.geometry.attributeLocationDescriptors) {
			if (desc !== null) {
				this.attributeLocationManager.getAttributeLocation(desc);
				this.attributeLocationManager.setAttributeLocationValue(desc);
			}
		}
		
		// MATERIAL
		// RGD00.resourceBindingsInternal.set(
		// 	0,
		// 	object.material.resourcePack.getResourceBindingExteInte(3, 0)
		// );
		// RGD00.resourceBindingsInternal.set(
		// 	10,
		// 	object.material.resourcePack.getResourceBindingExteInte(3, 10)
		// );
		// RGD00.resourceBindingsInternal.set(
		// 	20,
		// 	object.material.resourcePack.getResourceBindingExteInte(3, 20)
		// );
		const RGD03 = object.material.resourcePack.getResourceBindingGroup(3);

		// set dirty flags to force a texture update (e.g. for a resize)
		RGD03.dirty = true;
		RGD03.bindGroupDescriptor.dirty = true;

		this.uniformGroupManager.getUniformGroup(RGD03);
		this.uniformGroupManager.setUniformGroupValue(RGD03);


		// PIP
		if (!object.pip) {
			const x = null;
			let y = null;

			//TODO pipeline manager should have a conversion function for this
			switch (true) {
				case (object.material instanceof PostprocessToneMappingMaterial):
					y = RenderPipelineDescriptor.CONFIGURATION.POSTPROCESS.TONE_MAPPING
					break;
				case (object.material instanceof PostprocessDilationMaterial):
					y = RenderPipelineDescriptor.CONFIGURATION.POSTPROCESS.DILATION;
					break;
				case (object.material instanceof PostprocessPixelizationMaterial):
					y = RenderPipelineDescriptor.CONFIGURATION.POSTPROCESS.PIXELIZATION;
					break;
				case (object.material instanceof PostprocessCopyTextureMaterial):
						y = RenderPipelineDescriptor.CONFIGURATION.POSTPROCESS.COPY_TEXTURE;
						break;
				default:
					ErrorT2.throw(ErrorT2.MESSAGE.NO_MATCH, { cause: this.type });
			}

			object.pipDesc = y;
			object.pip = this.genPip(object, object.material, x, y);
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
				const buffer = this.bufferManager.getBuffer(desc.bufferDescriptor);
				this.renderPassEncoder.setVertexBuffer(i++, buffer);
			}
		}


		// // set bind group
		// this.renderPassEncoder.setBindGroup(
		// 	0,
		// 	this.bindGroupManager.getBindGroup(RGD00.bindGroupDescriptor));
		// //
		// set bind group
		this.renderPassEncoder.setBindGroup(0, this.bindGroupManager.getBindGroup(RGD03.bindGroupDescriptor));
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
		argsOut.material.clearMapBindings();

		// Add textures to material
		for (let i = 0; i < argsOut.maps.length; i++) {
			argsOut.material.setMapBinding(i, 3, i, argsOut.maps[i]);
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

			// bgl_descriptors: [
			// 	this.resourceGroupDescriptors.get(0).bindGroupLayoutDescriptor,
			// ]
			bgl_descriptors: [
				object.material.resourcePack.getResourceBindingGroup(3).bindGroupLayoutDescriptor,
			],

			PLD: PipelineLayoutDescriptor.CONFIGURATION.RENDER.POSTPROCESS,
		};

		
		const rp = this.renderPipelineManager.createRenderPipeline(x, bundle, y);

		return rp;
	}
};