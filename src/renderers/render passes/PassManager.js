import { ShaderLoader } from "../../loaders/ShaderLoader.js";
import { ShaderBuilder } from "../../program_management/ShaderBuilder.js";
import { ObjectBase } from "../../core/ObjectBase.js";
import { LoadingManager } from "../../loaders/LoadingManager.js";


export class PassManager extends ObjectBase { //RC pass manager base


	static DEFAULT = {
		NAME: "",
		TYPE: "PassManager",
	};


	#context;
	#canvas;

	#loadingManager;
	#shaderLoader;
	#shaderPreprocessor;
	#shaderCache = new Map()
	#shaderManager;

	#descriptors = new Set();
	#passes = new Map();

	#commandEncoder;
	#passEncoder;

	#pipelineLayoutDescriptors = new Map();
	#pipelineLayouts = new Map();
	#pipelineDescriptors = new Map();
	#pipeline; //active pipeline


	constructor(renderer, context, canvas, args = {}) {
		super(
			{
				...args,
				
				name: (args.name !== undefined) ? args.name : PassManager.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : PassManager.DEFAULT.TYPE,
			}
		);

		this.renderer = renderer;
		this.context = context;
		this.canvas = canvas;

		this.loadingManager = new LoadingManager({ name: "pass manager loading manager" });
		this.shaderLoader = new ShaderLoader({ loadingManager: this.loadingManager, name: "pass manager shader loader" });
		this.shaderPreprocessor = new ShaderBuilder({ name: "pass manager shader preprocessor" });

		this.descriptors = (args.descriptors !== undefined) ? args.descriptors : new Set();
		this.passes = (args.passes !== undefined) ? args.passes : new Map();
	}


	get context() { return this.#context; }
	set context(context) { this.#context = context; }
	get canvas() { return this.#canvas; }
	set canvas(canvas) { this.#canvas = canvas; }

	get loadingManager() { return this.#loadingManager; }
	set loadingManager(loadingManager) { this.#loadingManager = loadingManager; }
	get shaderLoader() { return this.#shaderLoader; }
	set shaderLoader(shaderLoader) { this.#shaderLoader = shaderLoader; }
	get shaderPreprocessor() { return this.#shaderPreprocessor; }
	set shaderPreprocessor(shaderPreprocessor) { this.#shaderPreprocessor = shaderPreprocessor; }
	get shaderCache() { return this.#shaderCache; }
	set shaderCache(shaderCache) { this.#shaderCache = shaderCache; }

	get descriptors() { return this.#descriptors; }
	set descriptors(descriptors) { this.#descriptors = descriptors; }
	get passes() { return this.#passes; }
	set passes(passes) { this.#passes = passes; }

	get commandEncoder() { return this.#commandEncoder; }
	set commandEncoder(commandEncoder) { this.#commandEncoder = commandEncoder; }
	get passEncoder() { return this.#passEncoder; }
	set passEncoder(passEncoder) { this.#passEncoder = passEncoder; }

	get pipelineLayoutDescriptors() { return this.#pipelineLayoutDescriptors; }
	set pipelineLayoutDescriptors(pipelineLayoutDescriptors) { this.#pipelineLayoutDescriptors = pipelineLayoutDescriptors; }
	get pipeline() { return this.#pipeline; }
	set pipeline(pipeline) { this.#pipeline = pipeline; }

	get viewport() {
		return Array.from(this.passes).map(([name, pass]) => {
			return [name, pass.viewport];
		});
	}
	set viewport(viewport) {
		for (const [name, pass] of this.passes) {
			if (viewport.has(name)) {
				pass.viewport = viewport.get(name);
			} else {
				console.warn(name);
			}
		}
	}
	get clearColor() {
		return Array.from(this.passes).map(([name, pass]) => {
			return [name, pass.clearValue];
		});
	}
	set clearColor(clearColor) {
		for (const [name, pass] of this.passes) {
			if (clearColor.has(name)) {
				pass.clearValue = clearColor.get(name);
			} else {
				console.warn(name);
			}
		}
	}
	get colorLoadOperation() {
		return Array.from(this.passes).map(([name, pass]) => {
			return [name, pass.colorLoadOperation];
		});
	}
	set colorLoadOperation(colorLoadOperation) {
		for (const [name, pass] of this.passes) {
			if (colorLoadOperation.has(name)) {
				pass.colorLoadOperation = colorLoadOperation;
			} else {
				console.warn(name);
			}
		}
	}


	async load(MATC) {
		const vertPath = MATC.DEFAULT.SHADER_PATH + MATC.DEFAULT.PROGRAM_NAME + "_vert.wgsl";
		const fragPath = MATC.DEFAULT.SHADER_PATH + MATC.DEFAULT.PROGRAM_NAME + "_frag.wgsl";

		const vertSource = await this.shaderLoader.load(vertPath);
		const fragSource = await this.shaderLoader.load(fragPath);

		this.shaderCache.set(vertPath, vertSource);
		this.shaderCache.set(fragPath, fragSource);
	}
	async loadCompute(MATC) {
		const compPath = MATC.DEFAULT.SHADER_PATH + MATC.DEFAULT.PROGRAM_NAME + "_comp.wgsl";

		const compSource = await this.shaderLoader.load(compPath);

		this.shaderCache.set(compPath, compSource);
	}

	initializeInternal(args = {}) {
		return true;
	}
	preprocessInternal(args = {}) {

	}
	processInternal(args = {}) {
		for (const [name, pass] of this.passes) {
			pass.processMain(
				{
					sceneManager: args.sceneManager,
					scene: args.scene,
					camera: args.camera,
					renderPassManager: this,
					textureMap: this.textureMap,
				}
			);
		}
	}
	postprocessInternal(args = {}) {

	}
	processMain(args = {}) {
		// INITIALIZE
		if (!this.initialized) {
			this.initializeInternal(args);
			this.initialized = true;
		}

		// PREPROCESS
		this.preprocessInternal(args);

		// PROCESS
		this.processInternal(args);

		// POSTPROCESS
		this.postprocessInternal(args);
	}
};