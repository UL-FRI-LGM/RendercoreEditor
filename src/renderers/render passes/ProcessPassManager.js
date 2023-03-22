import { ShaderLoader } from "../../loaders/ShaderLoader.js";
import { ShaderBuilder } from "../../program_management/ShaderBuilder.js";
import { LoadingManager } from "../../loaders/LoadingManager.js";
import { PassManager } from "./PassManager.js";
import { RenderArrayManager } from "../RenderArrayManager.js";
import { MeshBasicMaterial, MeshLambertMaterial } from "../../RenderCore.js";
import { PostprocessToneMappingMaterial } from "../../materials/PostprocessToneMappingMaterial.js";
import { PostprocessInvertMaterial } from "../../materials/PostprocessInvertMaterial.js";


export class ProcessPassManager extends PassManager { //RC process (compute/render) pass manager


    static DEFAULT = {
        NAME: "",
		TYPE: "ProcessPassManager",

		LOADING_MANAGER: new LoadingManager({ name: "process pass manager loading manager" }),
		SHADER_LOADER: new ShaderLoader({ loadingManager: this.loadingManager, name: "process pass manager shader loader" }),
		SHADER_PREPROCESSOR: new ShaderBuilder({ name: "process pass manager shader preprocessor" }),

		DESCRIPTORS: new Set(),
		PASSES: new Map(),
    };


	#pipelineLayoutDescriptors = new Map();
	#pipelineLayouts = new Map();
	#pipelineDescriptors = new Map();
	#pipeline; //active pipeline


	constructor(renderer, context, canvas, args = {}) {
		return (async () => {
			super(
				renderer, context, canvas,
				{
					...args,
					
					name: (args.name !== undefined) ? args.name : ProcessPassManager.DEFAULT.NAME,
					type: (args.type !== undefined) ? args.type : ProcessPassManager.DEFAULT.TYPE,

					loadingManager: (args.loadingManager !== undefined) ? args.loadingManager : ProcessPassManager.DEFAULT.LOADING_MANAGER,
					shaderLoader: (args.shaderLoader !== undefined) ? args.shaderLoader : ProcessPassManager.DEFAULT.SHADER_LOADER,
					shaderPreprocessor: (args.shaderPreprocessor !== undefined) ? args.shaderPreprocessor : ProcessPassManager.DEFAULT.SHADER_PREPROCESSOR,

					descriptors: (args.descriptors !== undefined) ? args.descriptors : new Set(ProcessPassManager.DEFAULT.DESCRIPTORS), //copy
					passes: (args.passes !== undefined) ? args.passes : new Map(ProcessPassManager.DEFAULT.PASSES), //copy
				}
			);

			this.renderArrayManager = new RenderArrayManager({});
			this.textureMap = new Map();


			await this.load(MeshBasicMaterial);
			await this.load(MeshLambertMaterial);
			await this.load(PostprocessToneMappingMaterial);

			await this.loadCompute(PostprocessInvertMaterial);


			return this;
		})();
	}


	get pipelineLayoutDescriptors() { return this.#pipelineLayoutDescriptors; }
    set pipelineLayoutDescriptors(pipelineLayoutDescriptors) { this.#pipelineLayoutDescriptors = pipelineLayoutDescriptors; }
	get pipeline() { return this.#pipeline; }
    set pipeline(pipeline) { this.#pipeline = pipeline; }


	initializeInternal(args = {}) {
		return super.initializeInternal(args);
	}
	preprocessInternal(args = {}) {
		this.renderArrayManager.clearAll();
	}
	processInternal(args = {}) {
		super.processInternal(args);
	}
	postprocessInternal(args = {}) {
		super.postprocessInternal(args);
	}
	processMain(args = {}) {
		super.processMain(args);
	}
};