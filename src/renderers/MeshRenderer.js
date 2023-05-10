import { Renderer } from "./Renderer.js";
import { CameraManager, MeshBasicMaterial } from "../RenderCore.js";
import { ContextManager } from "../RenderCore.js";
import { GPUCommandEncoder } from "../core/PRIMITIVES/command encoding/GPUCommandEncoder.js";
import { CommandEncoderManager } from "../core/CommandEncoderManager.js";
import { GPULoadOp } from "../core/ENUM/GPULoadOp.js";
import { Color4 } from "../math/Color4.js";
import { CanvasManager } from "../core/RC/CanvasManager.js";
import { RenderPassManager } from "../core/RenderPassManager.js";
import { SceneManager } from "../objects/SceneManager.js";
import { ShaderBuilder } from "../program_management/ShaderBuilder.js";
import { ShaderInterpreter } from "../program_management/ShaderInterpreter.js";
import { RenderPass } from "./RenderPass.js";


export class MeshRenderer extends Renderer {


	static DEFAULT = {
		NAME: "",
		TYPE: "MeshRenderer",
		
		VERT: null,
		FRAG: null,
		MATERIAL: new MeshBasicMaterial(),

		VIEWPORT: { x: 0, y: 0, width: 1280, height: 720 },
		CLEAR_VALUE: new Color4(0, 0, 0, 1),
		COLOR_LOAD_OPERATION: GPULoadOp.CLEAR,
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
	#pixelRatio = MeshRenderer.DEFAULT.PIXEL_RATIO;


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

			this.contextManager = await new ContextManager(api, args);
			this.canvasManager = new CanvasManager(api, this.contextManager.context, args.canvasDescriptor);

			this.commandEncoderManager = new CommandEncoderManager(this.context, GPUCommandEncoder.DESCRIPTOR.DEFAULT);
			this.renderPassManager = await new RenderPassManager(this, this.context, this.canvas, {});


			// this.cameraManager = new CameraManager(this.contextManager.context, {});
			// this.lightManager = new LightManager(this.contextManager.context, {});
			// this.meshManager = new MeshManager(this.contextManager.context, {});
			this.sceneManager = new SceneManager(this.contextManager.context, {});


			this.viewport = (args.viewport !== undefined) ? args.viewport : { x: 0, y: 0, width: this.canvas.bufferWidth, height: this.canvas.bufferHeight };
			this.clearColor = (args.clearColor !== undefined) ? args.clearColor : MeshRenderer.DEFAULT.CLEAR_VALUE;
			this.colorLoadOperation = (args.colorLoadOperation !== undefined) ? args.colorLoadOperation : MeshRenderer.DEFAULT.COLOR_LOAD_OPERATION;
			this.pixelRatio = (args.pixelRatio !== undefined) ? args.pixelRatio : MeshRenderer.DEFAULT.PIXEL_RATIO;


            return this;
        })();
	}


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

		this.renderPassManager.viewport = viewport;
	}
	get clearColor() { return this.#clearColor; }
	set clearColor(clearColor) { 
		this.#clearColor.copy(clearColor);

		this.renderPassManager.clearColor = clearColor;
	}
	get colorLoadOperation() { return this.#colorLoadOperation; }
	set colorLoadOperation(colorLoadOperation) {
		this.#colorLoadOperation = colorLoadOperation;

		this.renderPassManager.colorLoadOperation = colorLoadOperation;
	}
	get pixelRatio() { return this.#pixelRatio; }
	set pixelRatio(pixelRatio) { 
		this.#pixelRatio = pixelRatio; 

		his.renderPassManager.pixelRatio = pixelRatio;
	}


	#initialize() {
		return true;
	}
	#preprocess() {
		this.renderPassManager.preprocess();
	}
	#render(scene, camera) {
		// canvas
		this.canvasManager.update();


		// SETUP SCENE = SETUP CAMERA + SETUP LIGHTS + SETUP OBJECTS
		this.sceneManager.activeScene = scene;
		this.sceneManager.setup(this, camera);
		this.sceneManager.update(this, camera);


		// DISPATCH RENDER
		this.renderPassManager.render(this.sceneManager);
	}
	#postprocess() {
		this.renderPassManager.postprocess();
	}
	render(scene, camera) {
		// INITIALIZE
		if (!this.initialized) this.initialized = this.#initialize();


		// PREPROCESS
		this.#preprocess();


		// RENDER
		this.#render(scene, camera);


		// POSTPROCESS
		this.#postprocess();
	}
};