import { ShaderLoader } from "../../loaders/ShaderLoader.js";
import { ShaderBuilder } from "../../program_management/ShaderBuilder.js";
import { LoadingManager } from "../../loaders/LoadingManager.js";
import { MeshBasicMaterial } from "../../materials/MeshBasicMaterial.js";
import { MeshLambertMaterial } from "../../materials/MeshLambertMaterial.js";
import { PostprocessToneMappingMaterial } from "../../materials/PostprocessToneMappingMaterial.js";
import { PassManager } from "./PassManager.js";


export class RenderPassManager extends PassManager { //RC render pass manager


    static DEFAULT = {
        NAME: "",
		TYPE: "RenderPassManager",

		LOADING_MANAGER: new LoadingManager({ name: "render pass manager loading manager" }),
		SHADER_LOADER: new ShaderLoader({ loadingManager: this.loadingManager, name: "render pass manager shader loader" }),
		SHADER_PREPROCESSOR: new ShaderBuilder({ name: "render pass manager shader preprocessor" }),

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
					
					name: (args.name !== undefined) ? args.name : RenderPassManager.DEFAULT.NAME,
					type: (args.type !== undefined) ? args.type : RenderPassManager.DEFAULT.TYPE,

					loadingManager: (args.loadingManager !== undefined) ? args.loadingManager : RenderPassManager.DEFAULT.LOADING_MANAGER,
					shaderLoader: (args.shaderLoader !== undefined) ? args.shaderLoader : RenderPassManager.DEFAULT.SHADER_LOADER,
					shaderPreprocessor: (args.shaderPreprocessor !== undefined) ? args.shaderPreprocessor : RenderPassManager.DEFAULT.SHADER_PREPROCESSOR,

					descriptors: (args.descriptors !== undefined) ? args.descriptors : new Set(RenderPassManager.DEFAULT.DESCRIPTORS), //copy
					passes: (args.passes !== undefined) ? args.passes : new Map(RenderPassManager.DEFAULT.PASSES), //copy
				}
			);


			this.textureMap = new Map();


			await this.load(MeshBasicMaterial);
			await this.load(MeshLambertMaterial);
			await this.load(PostprocessToneMappingMaterial);
	

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