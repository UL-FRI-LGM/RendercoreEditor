import { Renderer } from "./Renderer.js";
import { ContextManager } from "../core/context/ContextManager.js";
import { LoadOp } from "../core/RC/LoadOp.js";
import { Color4 } from "../math/Color4.js";
import { ProcessPassManager } from "./render_passes/ProcessPassManager.js";
import { RenderPassManager } from "./render_passes/RenderPassManager.js";
import { ComputePassManager } from "./render_passes/ComputePassManager.js";
import { SceneManager } from "../objects/scene/SceneManager.js";
import { Viewport } from "./render_passes/Viewport.js";
import { MapT2 } from "../core/MapT2.js";
import { RenderBasicPass } from "./render_passes/RenderBasicPass.js";
import { Extent3D } from "../core/RC/textures/Extent3D.js";
import { AttachmentSize } from "./AttachmentSize.js";
import { ArrayT2 } from "../core/ArrayT2.js";
import { ClearValue } from "./ClearValue.js";
import { LoadOperation } from "./LoadOperation.js";
import { ScissorRectangle } from "./render_passes/ScissorRectangle.js";
import { StoreOperation } from "./StoreOperation.js";
import { StoreOp } from "../core/RC/StoreOp.js";
import { AttachmentReadOnly } from "./AttachmentReadOnly.js";
import { AttachmentTextureDescriptor } from "./AttachmentTextureDescriptor.js";
import { TextureDescriptor } from "../core/RC/textures/TextureDescriptor.js";
import { TextureDimension } from "../core/RC/textures/TextureDimension.js";
import { TextureFormat } from "../core/RC/textures/TextureFormat.js";
import { TextureUsage } from "../core/RC/textures/TextureUsage.js";
import { AttachmentTextureViewDescriptor } from "./AttachmentTextureViewDescriptor.js";
import { TextureViewDescriptor } from "../core/RC/textures/TextureViewDescriptor.js";
import { TextureView } from "../core/RC/textures/TextureView.js";
import { RenderArrayManager } from "./RenderArrayManager.js";


export class MeshRenderer extends Renderer {


	static DEFAULT = {
		TYPE: "MeshRenderer",
		NAME: "",

		PASSES: null,

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
							label: `${MeshRenderer.name}`,
							size: new Extent3D({ width: 1280, height: 720, depthOrArrayLayers: 1 }),
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
						label: `${MeshRenderer.name}`,
						size: new Extent3D({ width: 1280, height: 720, depthOrArrayLayers: 1 }),
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
							label: `${MeshRenderer.name}`,
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
						label: `${MeshRenderer.name}`,
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
	static MODE = {
		COLOR: 0,
		SHADOW: 1,
		P_SHADOW: 2,
		GEOMETRY: 3,
		PICK: 4
	};


	#contextManager;

	#renderArrayManager;


	constructor(api, args = {}) {
		return (async () => {
			super(
				api, 
				{
					...args,

					type: (args.type !== undefined) ? args.type : MeshRenderer.DEFAULT.TYPE,
					name: (args.name !== undefined) ? args.name : MeshRenderer.DEFAULT.NAME,
				}
			);

			this.contextManager = await new ContextManager(api, args);


			// render + compute
			this.processPassManager = await new ProcessPassManager(this, this.context, this.canvas, {});
			// render
			// this.renderPassManager = await new RenderPassManager(this, this.context, this.canvas, {});
			// compute
			// this.computePassManger = await new ComputePassManager(this, this.context, this.canvas, {});


			// this.cameraManager = new CameraManager(this.contextManager.context, {});
			// this.lightManager = new LightManager(this.contextManager.context, {});
			// this.meshManager = new MeshManager(this.contextManager.context, {});
			this.sceneManager = new SceneManager(this.contextManager.context, {});

			this.renderArrayManager = new RenderArrayManager({});

			this.passes = (args.passes !== undefined) ? args.passes : this.#assemblePasses();

			this.viewport = (args.viewport !== undefined) ? args.viewport : MeshRenderer.DEFAULT.VIEWPORT.clone();
			this.scissorRectangle = (args.scissorRectangle !== undefined) ? args.scissorRectangle : MeshRenderer.DEFAULT.SCISSOR_RECTANGLE.clone();

			this.clearValue = (args.clearValue !== undefined) ? args.clearValue : MeshRenderer.DEFAULT.CLEAR_VALUE.clone();
			this.loadOperation = (args.loadOperation !== undefined) ? args.loadOperation : MeshRenderer.DEFAULT.LOAD_OPERATION.clone();
			this.storeOperation = (args.storeOperation !== undefined) ? args.storeOperation : MeshRenderer.DEFAULT.STORE_OPERATION.clone();
			this.attachmentReadOnly = (args.attachmentReadOnly !== undefined) ? args.attachmentReadOnly : MeshRenderer.DEFAULT.ATTACHMENT_READ_ONLY.clone();
			this.attachmentTextureDescriptor = (args.attachmentTextureDescriptor !== undefined) ? args.attachmentTextureDescriptor : MeshRenderer.DEFAULT.ATTACHMENT_TEXTURE_DESCRIPTOR.clone();
			this.attachmentTextureViewDescriptor = (args.attachmentTextureViewDescriptor !== undefined) ? args.attachmentTextureViewDescriptor : MeshRenderer.DEFAULT.ATTACHMENT_TEXTURE_VIEW_DESCRIPTOR.clone();

			this.pixelRatio = (args.pixelRatio !== undefined) ? args.pixelRatio : MeshRenderer.DEFAULT.PIXEL_RATIO;


			return this;
		})();
	}


	get contextManager() { return this.#contextManager; }
	set contextManager(contextManager) { this.#contextManager = contextManager; }

	get canvas() { return this.contextManager.canvas; }
	get context() { return this.contextManager.context; }
	get CONTEXT() { return this.contextManager.CONTEXT; }

	get renderArrayManager() { return this.#renderArrayManager; }
	set renderArrayManager(renderArrayManager) { this.#renderArrayManager = renderArrayManager; }

	get passes() {
		return this.processPassManager.passes;
	}
	set passes(passes) {
		this.processPassManager.passes = passes;
	}
	get viewport() {
		return this.processPassManager.viewport;
	}
	set viewport(viewport) {
		this.processPassManager.viewport = viewport;
	}
	get scissorRectangle() {
		return this.processPassManager.scissorRectangle;
	}
	set scissorRectangle(scissorRectangle) {
		this.processPassManager.scissorRectangle = scissorRectangle;
	}

	get clearValue() {
		return this.processPassManager.clearValue;
	}
	set clearValue(clearValue) {
		this.processPassManager.clearValue = clearValue;
	}
	get loadOperation() {
		return this.processPassManager.loadOperation;
	}
	set loadOperation(loadOperation) {
		this.processPassManager.loadOperation = loadOperation;
	}
	get storeOperation() {
		return this.processPassManager.storeOperation;
	}
	set storeOperation(storeOperation) {
		this.processPassManager.storeOperation = storeOperation;
	}
	get attachmentReadOnly() {
		return this.processPassManager.attachmentReadOnly;
	}
	set attachmentReadOnly(attachmentReadOnly) {
		this.processPassManager.attachmentReadOnly = attachmentReadOnly;
	}
	get attachmentTextureDescriptor() {
		return this.processPassManager.attachmentTextureDescriptor;
	}
	set attachmentTextureDescriptor(attachmentTextureDescriptor) {
		this.processPassManager.attachmentTextureDescriptor = attachmentTextureDescriptor;
	}
	get attachmentTextureViewDescriptor() {
		return this.processPassManager.attachmentTextureViewDescriptor;
	}
	set attachmentTextureViewDescriptor(attachmentTextureViewDescriptor) {
		this.processPassManager.attachmentTextureViewDescriptor = attachmentTextureViewDescriptor;
	}
	get attachmentSize() {
		return this.processPassManager.attachmentSize;
	}
	set attachmentSize(attachmentSize) {
		this.processPassManager.attachmentSize = attachmentSize;
	}

	get pixelRatio() {
		return this.processPassManager.pixelRatio;
	}
	set pixelRatio(pixelRatio) {
		this.processPassManager.pixelRatio = pixelRatio;
	}


	#assemblePasses = (() => {
		const extent = new Extent3D();
		const attachmentSize = new AttachmentSize();
		const viewport = new Viewport();


		return () => {
			extent.width = Math.floor(this.canvas.clientWidth * this.pixelRatio);
			extent.height = Math.floor(this.canvas.clientHeight * this.pixelRatio);
			extent.depthOrArrayLayers = 1;

			viewport.x = 0;
			viewport.y = 0;
			viewport.width = extent.width;
			viewport.height = extent.height;


			return new MapT2(
				{ name: "PASSES - MESH RENDERER" },
				[
					[
						"RP-00", new RenderBasicPass(
							{
								viewport: viewport,

								attachmentSize: attachmentSize
							}
						)
					],
				]
			);
		};
	})();

	#initializeInternal(args = {}) {
		return null;
	}
	#preprocessInternal(args = {}) {
		// const renderPassManager = this.renderPassManager;


		// const sceneManager = this.sceneManager;
		const scene = args.scene;
		const camera = args.camera;

		const lightManager = scene.lightManager;

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


		this.renderArrayManager.clearAll();
		this.renderArrayManager.fill(scene, camera);

		this.renderArrayManager.sort(camera);
	}
	#processInternal(args = {}) {
		// canvas
		// this.contextManager.update(); // currently do not use this

		// DISPATCH PROCESS: RENDER/COMPUTE
		this.processPassManager.processMain(
			{
				renderArrayManager: this.renderArrayManager,
				sceneManager: this.sceneManager,
				scene: args.scene,
				camera: args.camera
			}
		);
	}
	#postprocessInternal(args = {}) {

	}
	render(args = {}) {
		// INITIALIZE
		if (!this.initialized) {
			this.#initializeInternal(args);
			this.initialized = true;
		}

		// PREPROCESS
		this.#preprocessInternal(args);

		// PROCESS: RENDER/COMPUTE
		this.#processInternal(args);

		// POSTPROCESS
		this.#postprocessInternal(args);
	}
};
