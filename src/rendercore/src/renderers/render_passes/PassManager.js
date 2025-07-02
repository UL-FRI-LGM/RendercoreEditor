import { ShaderLoader } from "../../loaders/ShaderLoader.js";
import { ShaderBuilder } from "../../program_management/ShaderBuilder.js";
import { ObjectBase } from "../../core/ObjectBase.js";
import { LoadingManager } from "../../loaders/LoadingManager.js";


export class PassManager extends ObjectBase { //RC pass manager base


	static DEFAULT = {
		TYPE: "PassManager",
		NAME: "",
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
	#activePipeline;


	constructor(renderer, context, canvas, args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : PassManager.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : PassManager.DEFAULT.NAME,
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
	set passes(passes) {
		passes.forEach((pass, name) => {
			pass.renderer = this.renderer;
		});

		this.#passes = passes;
	}

	get commandEncoder() { return this.#commandEncoder; }
	set commandEncoder(commandEncoder) { this.#commandEncoder = commandEncoder; }
	get passEncoder() { return this.#passEncoder; }
	set passEncoder(passEncoder) { this.#passEncoder = passEncoder; }

	get pipelineLayoutDescriptors() { return this.#pipelineLayoutDescriptors; }
	set pipelineLayoutDescriptors(pipelineLayoutDescriptors) { this.#pipelineLayoutDescriptors = pipelineLayoutDescriptors; }
	get activePipeline() { return this.#activePipeline; }
	set activePipeline(activePipeline) { this.#activePipeline = activePipeline; }

	get viewport() {
		return Array.from(this.passes).map(([name, pass]) => {
			return [name, pass.viewport];
		});
	}
	set viewport(viewport) {
		if (viewport instanceof Map) {
			for (const [passName, passViewport] of viewport) {
				if (this.passes.has(passName)){
					this.passes.get(passName).viewport = passViewport;
				} else {
					console.warn(`Unknown pass name: [${passName}].`);
				}
			}
		} else {
			for (const [name, pass] of this.passes) {
				pass.viewport = viewport;
			}
		}
	}
	get scissorRectangle() {
		return Array.from(this.passes).map(([name, pass]) => {
			return [name, pass.scissorRectangle];
		});
	}
	set scissorRectangle(scissorRectangle) {
		if (scissorRectangle instanceof Map) {
			for (const [passName, passScissorRectangle] of scissorRectangle) {
				if (this.passes.has(passName)){
					this.passes.get(passName).scissorRectangle = passScissorRectangle;
				} else {
					console.warn(`Unknown pass name: [${passName}].`);
				}
			}
		} else {
			for (const [name, pass] of this.passes) {
				pass.scissorRectangle = scissorRectangle;
			}
		}
	}

	get clearValue() {
		return Array.from(this.passes).map(([name, pass]) => {
			return [name, pass.clearValue];
		});
	}
	set clearValue(clearValue) {
		if (clearValue instanceof Map) {
			for (const [passName, passClearColor] of clearValue) {
				if (this.passes.has(passName)){
					this.passes.get(passName).clearValue = passClearColor;
				} else {
					console.warn(`Unknown pass name: [${passName}].`);
				}
			}
		} else {
			for (const [name, pass] of this.passes) {
				pass.clearValue = clearValue;
			}
		}
	}
	get loadOperation() {
		return Array.from(this.passes).map(([name, pass]) => {
			return [name, pass.loadOperation];
		});
	}
	set loadOperation(loadOperation) {
		if (loadOperation instanceof Map) {
			for (const [passName, passLoadOperation] of loadOperation) {
				if (this.passes.has(passName)){
					this.passes.get(passName).loadOperation = passLoadOperation;
				} else {
					console.warn(`Unknown pass name: [${passName}].`);
				}
			}
		} else {
			for (const [name, pass] of this.passes) {
				pass.loadOperation = loadOperation;
			}
		}
	}
	get storeOperation() {
		return Array.from(this.passes).map(([name, pass]) => {
			return [name, pass.storeOperation];
		});
	}
	set storeOperation(storeOperation) {
		if (storeOperation instanceof Map) {
			for (const [passName, passStoreOperation] of storeOperation) {
				if (this.passes.has(passName)){
					this.passes.get(passName).storeOperation = passStoreOperation;
				} else {
					console.warn(`Unknown pass name: [${passName}].`);
				}
			}
		} else {
			for (const [name, pass] of this.passes) {
				pass.storeOperation = storeOperation;
			}
		}
	}
	get attachmentReadOnly() {
		return Array.from(this.passes).map(([name, pass]) => {
			return [name, pass.attachmentReadOnly];
		});
	}
	set attachmentReadOnly(attachmentReadOnly) {
		if (attachmentReadOnly instanceof Map) {
			for (const [passName, passAttachmentReadOnly] of attachmentReadOnly) {
				if (this.passes.has(passName)){
					this.passes.get(passName).attachmentReadOnly = passAttachmentReadOnly;
				} else {
					console.warn(`Unknown pass name: [${passName}].`);
				}
			}
		} else {
			for (const [name, pass] of this.passes) {
				pass.attachmentReadOnly = attachmentReadOnly;
			}
		}
	}
	get attachmentTextureDescriptor() {
		return Array.from(this.passes).map(([name, pass]) => {
			return [name, pass.attachmentTextureDescriptor];
		});
	}
	set attachmentTextureDescriptor(attachmentTextureDescriptor) {
		if (attachmentTextureDescriptor instanceof Map) {
			for (const [passName, passAttachmentTextureDescriptor] of attachmentTextureDescriptor) {
				if (this.passes.has(passName)){
					this.passes.get(passName).attachmentTextureDescriptor = passAttachmentTextureDescriptor;
				} else {
					console.warn(`Unknown pass name: [${passName}].`);
				}
			}
		} else {
			for (const [name, pass] of this.passes) {
				pass.attachmentTextureDescriptor = attachmentTextureDescriptor;
			}
		}
	}
	get attachmentTextureViewDescriptor() {
		return Array.from(this.passes).map(([name, pass]) => {
			return [name, pass.attachmentTextureViewDescriptor];
		});
	}
	set attachmentTextureViewDescriptor(attachmentTextureViewDescriptor) {
		if (attachmentTextureViewDescriptor instanceof Map) {
			for (const [passName, passAttachmentTextureViewDescriptor] of attachmentTextureViewDescriptor) {
				if (this.passes.has(passName)){
					this.passes.get(passName).attachmentTextureViewDescriptor = passAttachmentTextureViewDescriptor;
				} else {
					console.warn(`Unknown pass name: [${passName}].`);
				}
			}
		} else {
			for (const [name, pass] of this.passes) {
				pass.attachmentTextureViewDescriptor = attachmentTextureViewDescriptor;
			}
		}
	}
	get attachmentSize() {
		return new Map(Array.from(this.passes).map(([name, pass]) => {
			return [name, pass.attachmentSize];
		}));
	}
	set attachmentSize(attachmentSize) {
		if (attachmentSize instanceof Map) {
			for (const [passName, passAttachmentSize] of attachmentSize) {
				if (this.passes.has(passName)){
					this.passes.get(passName).attachmentSize = passAttachmentSize;
				} else {
					console.warn(`Unknown pass name: [${passName}].`);
				}
			}
		} else {
			for (const [name, pass] of this.passes) {
				pass.attachmentSize = attachmentSize;
			}
		}
	}

	get pixelRatio() {
		return Array.from(this.passes).map(([name, pass]) => {
			return [name, pass.pixelRatio];
		});
	}
	set pixelRatio(pixelRatio) {
		if (pixelRatio instanceof Map) {
			for (const [passName, passPixelRatio] of pixelRatio) {
				if (this.passes.has(passName)){
					this.passes.get(passName).pixelRatio = passPixelRatio;
				} else {
					console.warn(`Unknown pass name: [${passName}].`);
				}
			}
		} else {
			for (const [name, pass] of this.passes) {
				pass.pixelRatio = pixelRatio;
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
		this.textureDescriptorMap.clear();


		return args;
	}
	processInternal(args = {}) {
		for (const [name, pass] of this.passes) {
			pass.processMain(
				{
					renderArrayManager: args.renderArrayManager,
					sceneManager: args.sceneManager,
					scene: args.scene,
					camera: args.camera,
					renderPassManager: this,
					textureDescriptorMap: this.textureDescriptorMap,
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
		const argsOut1 = this.preprocessInternal(args);

		// PROCESS
		this.processInternal(argsOut1);

		// POSTPROCESS
		this.postprocessInternal(args);
	}
};