import { Renderer } from "./Renderer.js";
import { ContextManager } from "../core/context/ContextManager.js";
import { LoadOp } from "../core/RC/LoadOp.js";
import { Color4 } from "../math/Color4.js";
import { ProcessPassManager } from "./render_passes/ProcessPassManager.js";
import { RenderPassManager } from "./render_passes/RenderPassManager.js";
import { ComputePassManager } from "./render_passes/ComputePassManager.js";
import { SceneManager } from "../objects/SceneManager.js";
import { Viewport } from "./render_passes/Viewport.js";
import { MapT2 } from "../core/MapT2.js";
import { RenderBasicPass } from "./render_passes/RenderBasicPass.js";
import { Extent3D } from "../core/RC/textures/Extent3D.js";
import { Size } from "./Size.js";
import { ArrayT2 } from "../core/ArrayT2.js";
import { ClearValue } from "./ClearValue.js";
import { LoadOperation } from "./LoadOperation.js";


export class MeshRenderer extends Renderer {


	static DEFAULT = {
		TYPE: "MeshRenderer",
		NAME: "",

		PASSES: null,

		VIEWPORT: new Viewport({ x: 0, y: 0, width: 1280, height: 720, minDepth: 0, maxDepth: 1 }),

		SIZE: new Size({ color: new ArrayT2({}, new Extent3D({ width: 1280, height: 720 })), depthStencil: new Extent3D({ width: 1280, height: 720 }) }),
		CLEAR_VALUE: new ClearValue({ color: new ArrayT2({}, new Color4(0, 0, 0, 1)), depth: 1, stencil: 0 }),
		LOAD_OPERATION: new LoadOperation({ color: new ArrayT2({}, LoadOp.CLEAR), depth: LoadOp.CLEAR, stencil: LoadOp.CLEAR }),

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


			this.passes = (args.passes !== undefined) ? args.passes : this.#assemblePasses();

			this.viewport = (args.viewport !== undefined) ? args.viewport : MeshRenderer.DEFAULT.VIEWPORT.clone();

			this.size = (args.size !== undefined) ? args.size : MeshRenderer.DEFAULT.SIZE.clone();
			this.clearValue = (args.clearValue !== undefined) ? args.clearValue : MeshRenderer.DEFAULT.CLEAR_VALUE.clone();
			this.loadOperation = (args.loadOperation !== undefined) ? args.loadOperation : MeshRenderer.DEFAULT.LOAD_OPERATION.clone();

			this.pixelRatio = (args.pixelRatio !== undefined) ? args.pixelRatio : MeshRenderer.DEFAULT.PIXEL_RATIO;


			return this;
		})();
	}


	get contextManager() { return this.#contextManager; }
	set contextManager(contextManager) { this.#contextManager = contextManager; }

	get canvas() { return this.contextManager.canvas; }
	get context() { return this.contextManager.context; }
	get CONTEXT() { return this.contextManager.CONTEXT; }

	set passes(passes) {
		this.processPassManager.passes = passes;
	}
	get passes() {
		return this.processPassManager.passes;
	}
	get viewport() {
		return this.processPassManager.viewport;
	}
	set viewport(viewport) {
		this.processPassManager.viewport = viewport;
	}

	get size() {
		return this.processPassManager.size;
	}
	set size(size) {
		this.processPassManager.size = size;
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

	get pixelRatio() {
		return this.processPassManager.pixelRatio;
	}
	set pixelRatio(pixelRatio) {
		this.processPassManager.pixelRatio = pixelRatio;
	}


	#assemblePasses = (() => {
		const extent = new Extent3D();
		const size = { color: [extent], depthStencil: extent };
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
							this,
							{
								viewport: viewport,

								size: size
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

	}
	#processInternal(args = {}) {
		// canvas
		// this.contextManager.update(); // currently do not use this

		// DISPATCH PROCESS: RENDER/COMPUTE
		this.processPassManager.processMain(
			{
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
