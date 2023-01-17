import { Renderer } from "./Renderer.js";
import { RenderArrayManager } from "./RenderArrayManager.js";
import { GPURenderPipeline } from "../core/PRIMITIVES/pipelines/GPURenderPipeline.js";
import { CameraManager } from "../RenderCore.js";
import { ContextManager } from "../RenderCore.js";
import { GPUCommandEncoder } from "../core/PRIMITIVES/command encoding/GPUCommandEncoder.js";
import { GPURenderPassEncoder } from "../core/PRIMITIVES/render passes/GPURenderPassEncoder.js";
import { GPUCanvasAlphaMode } from "../core/ENUM/GPUCanvasAlphaMode.js";
import { GPUTextureFormat } from "../core/ENUM/GPUTextureFormat.js";
import { CommandEncoderManager } from "../core/CommandEncoderManager.js";
import { GPUTextureView } from "../core/PRIMITIVES/textures/GPUTextureView.js";
import { LoadingManager } from "../loaders/LoadingManager.js";
import { ShaderLoader } from "../loaders/ShaderLoader.js";
import { GPUExtent3D } from "../core/DICTS/GPUExtent3D.js";
import { GPUTextureDescriptor } from "../core/DICTS/GPUTextureDescriptor.js";
import { GPUTexture } from "../core/PRIMITIVES/textures/GPUTexture.js";
import { GPURenderPassColorAttachment } from "../core/DICTS/GPURenderPassColorAttachment.js";
import { GPURenderPassDepthStencilAttachment } from "../core/DICTS/GPURenderPassDepthStencilAttachment.js";
import { GPURenderPassDescriptor } from "../core/DICTS/GPURenderPassDescriptor.js";
import { GPUTextureViewDescriptor } from "../core/DICTS/GPUTextureViewDescriptor.js";
import { GPULoadOp } from "../core/ENUM/GPULoadOp.js";
import { GPUStoreOp } from "../core/ENUM/GPUStoreOp.js";
import { Color4 } from "../math/Color4.js";
import { GPUShaderStage } from "../core/NAMESPACE/GPUShaderStage.js";
import { CanvasManager } from "../core/RC/CanvasManager.js";
import { GPUCanvasConfiguration } from "../core/DICTS/GPUCanvasConfiguration.js";
import { BufferManager } from "../core/BufferManager.js";
import { TextureManager } from "../core/TextureManager.js";
import { RenderPassManager } from "../core/RenderPassManager.js";
import { GPUBufferUsage } from "../core/NAMESPACE/GPUBufferUsage.js";
import { LightManager } from "../lights/LightManager.js";
import { MeshManager } from "../objects/MeshManager.js";
import { SceneManager } from "../objects/SceneManager.js";


export class MeshRenderer extends Renderer {
	static DEFAULT = {
		NAME: "",
		TYPE: "MeshRenderer",
		
		VERT: null,
		FRAG: null,

		VIEWPORT: { x: 0, y: 0, width: 1280, height: 720 },
		CLEAR_VALUE: new Color4(0, 0, 0, 1),
		COLOR_LOAD_OPERATION: GPULoadOp.CLEAR,
	};
	static MODE = {
		COLOR: 0,
		SHADOW: 1,
		P_SHADOW: 2,
		GEOMETRY: 3,
		PICK: 4
	};


	#deviceManager;
	#contextManager;
	#canvasManager;

	#renderPipelineManager;
	#commandEncoderManager;

	#renderManager;

	#loadingManager;
	#shaderLoader;
	#shaderManager;

	#viewport = { ...MeshRenderer.DEFAULT.VIEWPORT }; //clone
	#clearColor = MeshRenderer.DEFAULT.CLEAR_VALUE.clone();
	#colorLoadOperation = MeshRenderer.DEFAULT.COLOR_LOAD_OPERATION;


	constructor(api, args = {}) {
		return (async () => {
			super(
				api, 
				{
					...args,
					name: (args.name !== undefined) ? args.name : MeshRenderer.DEFAULT.NAME,
					type: (args.type !== undefined) ? args.type : MeshRenderer.DEFAULT.TYPE,
				}
			);

			this.deviceManager = null;
			this.contextManager = await new ContextManager(api, args);
			this.bufferManager = new BufferManager(this.contextManager.context, {});
			this.textureManager = new TextureManager(this.contextManager.context, {});
			this.canvasManager = new CanvasManager(api, this.contextManager.context, args.canvasDescriptor);

			this.commandEncoderManager = new CommandEncoderManager(this.context, GPUCommandEncoder.DESCRIPTOR.DEFAULT);
			this.renderPassManager = new RenderPassManager(this.contextManager.context, {});

			this.renderArrayManager = new RenderArrayManager({});

			this.cameraManager = new CameraManager(this.contextManager.context, {});
			this.lightManager = new LightManager(this.contextManager.context, {});
			this.meshManager = new MeshManager(this.contextManager.context, {});
			this.sceneManager = new SceneManager(this.contextManager.context, {});


			this.viewport = (args.viewport !== undefined) ? args.viewport : { x: 0, y: 0, width: this.canvas.bufferWidth, height: this.canvas.bufferHeight };
			this.clearColor = (args.clearColor !== undefined) ? args.clearColor : MeshRenderer.DEFAULT.CLEAR_VALUE;
			this.colorLoadOperation = (args.colorLoadOperation !== undefined) ? args.colorLoadOperation : MeshRenderer.DEFAULT.COLOR_LOAD_OPERATION;


			this.loadingManager = new LoadingManager({ name: "mesh renderer loading lanager" });
			this.shaderLoader = new ShaderLoader({ loadingManager: this.loadingManager, name: "mesh renderer shader loader" });


			//TODO make default material class and not only default shaders
			MeshRenderer.DEFAULT.VERT = await this.shaderLoader.load("/src/shaders/basic/basic_flat_vert.wgsl");
			MeshRenderer.DEFAULT.FRAG = await this.shaderLoader.load("/src/shaders/basic/basic_flat_frag.wgsl");


			this.SET_PIPELINE = null;


			this.size =  new GPUExtent3D(
				{
					width: this.canvas.bufferWidth,
					height: this.canvas.bufferHeight,
					depthOrArrayLayers: 1,
				}
			);
			this.colorTexture = this.canvas.getCurrentTexture();
			this.colorTexture.label = "canvas texture 0";
			this.colorTextureViewDescriptor = new GPUTextureViewDescriptor(
				{
					label: "color texture view",
					format: GPUTextureView.FORMAT.RGBA_8_UNORM,
					dimension: GPUTextureView.DIMENSION.D2,
					aspect: GPUTextureView.ASPECT.ALL,
					baseMipLevel: 0,
					mipLevelCount: 1,
					baseArrayLayer: 0,
					arrayLayerCount: 1,
				}
			);
			this.depthTextureDescriptor = new GPUTextureDescriptor(
				{
					label: "depth texture",
					size: this.size,
					mipLevelCount: 1,
					sampleCount: 1,
					dimension: GPUTexture.DIMENSION.D2,
					format: GPUTextureFormat.DEPTH_24_PLUS_STENCIL_8,
					usage: GPUTexture.USAGE.RENDER_ATTACHMENT,
					viewFormats: [],
				}
			);
			this.depthTexture = this.context.createTexture(this.depthTextureDescriptor);
			this.colorAttachment = new GPURenderPassColorAttachment(
				{
					view: this.colorTexture.createView(this.colorTextureViewDescriptor),
					resolveTarget: undefined,
					clearValue: this.clearColor,
					loadOp: this.colorLoadOperation,
					storeOp: GPUStoreOp.STORE,
				}
			);
			this.depthStencilAttachment = new GPURenderPassDepthStencilAttachment(
				{
					view: this.depthTexture.createView(),
	
					depthClearValue: 1.0,
					depthLoadOp: GPULoadOp.CLEAR,
					depthStoreOp: GPUStoreOp.STORE,
					depthReadOnly: false,
				
					stencilClearValue: 0,
					stencilLoadOp: GPULoadOp.CLEAR,
					stencilStoreOp: GPUStoreOp.STORE,
					stencilReadOnly: false,
				}
			);
			this.renderPassDescriptor = new GPURenderPassDescriptor(
				{
					label: "render pass descriptor",
					colorAttachments: 
					[
						this.colorAttachment,
					],
					depthStencilAttachment: this.depthStencilAttachment,
					occlusionQuerySet: undefined,
					timestampWrites: undefined,
					maxDrawCount: undefined,
				}
			);


            return this;
        })();
	}


	get deviceManager() { return this.#deviceManager; }
	set deviceManager(deviceManager) { this.#deviceManager = deviceManager; }
	get contextManager() { return this.#contextManager; }
	set contextManager(contextManager) { this.#contextManager = contextManager; }
	get canvasManager() { return this.#canvasManager; }
	set canvasManager(canvasManager) { this.#canvasManager = canvasManager; }

	get canvas() { return this.canvasManager.canvas; }
	get context() { return this.contextManager.context; }

	get commandEncoderManager() { return this.#commandEncoderManager; }
	set commandEncoderManager(commandEncoderManager) { this.#commandEncoderManager = commandEncoderManager; }
	get renderManager() { return this.#renderManager; }
	set renderManager(renderManager) { this.#renderManager = renderManager; }

	get loadingManager() { return this.#loadingManager; }
	set loadingManager(loadingManager) { this.#loadingManager = loadingManager; }
	get shaderLoader() { return this.#shaderLoader; }
	set shaderLoader(shaderLoader) { this.#shaderLoader = shaderLoader; }

	get viewport() { return this.#viewport; }
	set viewport(viewport) { 
		this.#viewport = viewport; 


		this.size =  new GPUExtent3D(
			{
				width: this.viewport.width,
				height: this.viewport.height,
				depthOrArrayLayers: 1,
			}
		);
		this.depthTextureDescriptor = new GPUTextureDescriptor(
			{
				label: "depth texture",
				size: this.size,
				mipLevelCount: 1,
				sampleCount: 1,
				dimension: GPUTexture.DIMENSION.D2,
				format: GPUTextureFormat.DEPTH_24_PLUS_STENCIL_8,
				usage: GPUTexture.USAGE.RENDER_ATTACHMENT,
				viewFormats: [],
			}
		);
		this.depthTexture = this.context.createTexture(this.depthTextureDescriptor);
		if(this.renderPassDescriptor)this.renderPassDescriptor.depthStencilAttachment.view = this.depthTexture.createView();
	}
	get clearColor() { return this.#clearColor; }
	set clearColor(clearColor) { 
		this.#clearColor.copy(clearColor);

		if(this.colorAttachment)this.colorAttachment.clearValue = this.clearColor;
	}
	get colorLoadOperation() { return this.#colorLoadOperation; }
	set colorLoadOperation(colorLoadOperation) {
		this.#colorLoadOperation = colorLoadOperation;

		if(this.colorAttachment)this.colorAttachment.loadOp = this.colorLoadOperation;
	}


	setup() {

	}
	update() {

	}
	#renderPassBegin() {
		// Clear the render arrays //why not just modify: add/remove?
		this.renderArrayManager.clearAll();



		this.commandEncoder = this.context.createCommandEncoder();

		const canvasTexture = this.canvas.getCurrentTexture();
		canvasTexture.label = "canvas texture";
		this.renderPassDescriptor.colorAttachments[0].view = canvasTexture.createView(this.colorTextureViewDescriptor);

		// TODO (clear this later)
		// this.renderPassDescriptor.depthStencilAttachment.depthLoadValue = 1.0;
		// this.renderPassDescriptor.depthStencilAttachment.stencilLoadValue = 0.0;
		// this.renderPassDescriptor.depthStencilAttachment.stencilStoreOp = GPUStoreOp.STORE;
		// this.renderPassDescriptor.depthStencilAttachment.depthReadOnly = false;
		// this.renderPassDescriptor.depthStencilAttachment.depthWriteEnable = true;
		// this.renderPassDescriptor.depthStencilAttachment.depthWriteEnabled = true;
		// this.renderPassDescriptor.depthStencilAttachment.stencilReadOnly = false;
		// this.renderPassDescriptor.depthStencilAttachment.stencilWriteEnable = true;
		// this.renderPassDescriptor.depthStencilAttachment.stencilWriteEnabled = true;

		// console.warn(this.renderPassDescriptor);

		this.renderPassEncoder = this.commandEncoder.beginRenderPass(this.renderPassDescriptor);
	}	
	#renderPassEnd() {
		this.renderPassEncoder.end();
		// this.renderPassEncoder.endPass();

		const commandBuffer = this.commandEncoder.finish();
		this.context.queue.submit([commandBuffer]);
	}
	async render(scene, camera) {
		this.#renderPassBegin();


		// canvas
		this.canvasManager.update();




		//1. SETUP CAMERA
		this.cameraManager.activeCamera = camera;
		this.cameraManager.setup();
		this.cameraManager.update();




		//2. SETUP LIGHTS
		this.lightManager.setup(scene);
		this.lightManager.update(scene);

	


		//0. SETUP SCENE = SETUP CAMERA + SETUP LIGHTS + SETUP OBJECTS
		this.sceneManager.activeScene = scene;
		this.sceneManager.setup();
		this.sceneManager.update(this, camera);




		this.renderPassEncoder.setBindGroup(0, camera.bindGroup);
		this.renderPassEncoder.setBindGroup(1, this.lightManager.bindGroup);
			


		//RENDER OBJECTS
		// Render opaque objects
		await this.#renderOpaqueObjects(this.renderArrayManager.opaqueObjects, camera);
		// Render transparent objects
		await this.#renderTransparentObjects(this.renderArrayManager.transparentObjects, camera);
		// Render skybox last (opitmization)
		await this.#renderOpaqueObjects(this.renderArrayManager.skyboxes, camera);


		this.#renderPassEnd();
	}

	async #renderOpaqueObjects(opaqueObjects, camera){
		if (opaqueObjects.length > 0) {
			// Sort the objects by render order
			opaqueObjects.sort(function(a, b) {
				return a.renderOrder - b.renderOrder;
			});

			await this.#renderObjects(opaqueObjects, camera);
		}
	}
	async #renderTransparentObjects(transparentObjects, camera){
		if (transparentObjects.length > 0) {
			// Sort the objects by z
			transparentObjects.sort(function(a, b) {
				const renderOrderDiff = a.renderOrder - b.renderOrder;
				if(renderOrderDiff === 0){
					return b.transform.global.position.distanceToSquared(camera.transform.global.position) - a.transform.global.position.distanceToSquared(camera.transform.global.position);
				}else{
					return renderOrderDiff;
				}
			});

			await this.#renderObjects(transparentObjects, camera);
		}
	}


	async #renderObjects(objects, camera) {
		for (let i = 0; i < objects.length; i++) {
			const object = objects.get(i);


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
				selectedMaterial = object.material
			}


			await object.draw(this, camera);
		}
	}
};