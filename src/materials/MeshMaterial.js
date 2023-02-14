import {FRONT_SIDE, BACK_SIDE, FRONT_AND_BACK_SIDE, FUNC_LEQUAL} from "../constants.js";
import { GPUBindGroupDescriptor } from "../core/DICTS/GPUBindGroupDescriptor.js";
import { GPUBindGroupLayoutDescriptor } from "../core/DICTS/GPUBindGroupLayoutDescriptor.js";
import { GPUBindGroupLayoutEntry } from "../core/DICTS/GPUBindGroupLayoutEntry.js";
import { GPUBufferBindingLayout } from "../core/DICTS/GPUBufferBindingLayout.js";
import { GPUSamplerBindingLayout } from "../core/DICTS/GPUSamplerBindingLayout.js";
import { GPUTextureBindingLayout } from "../core/DICTS/GPUTextureBindingLayout.js";
import { GPUBufferBindingType } from "../core/ENUM/GPUBufferBindingType.js";
import { GPUSamplerBindingType } from "../core/ENUM/GPUSamplerBindingType.js";
import { GPUTextureSamplingType } from "../core/ENUM/GPUTextureSamplingType.js";
import { GPUTextureViewDimension } from "../core/ENUM/GPUTextureViewDimension.js";
import { GPUShaderStage } from "../core/NAMESPACE/GPUShaderStage.js";
import { ObjectBase } from "../core/ObjectBase.js";
import { ShaderLoader } from "../loaders/ShaderLoader.js";
import { ShaderBuilder } from "../program_management/ShaderBuilder.js";
import { LoadingManager, Material } from "../RenderCore.js";


export class MeshMaterial extends Material {

	
	static bindGroupLayoutEntry = new GPUBindGroupLayoutEntry(
		{
			binding: 0,
			visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
			buffer: new GPUBufferBindingLayout(
				{
					type: GPUBufferBindingType.UNIFORM,
					hasDynamicOffset: false,
					minBindingSize: 0,
				}
			),
		}
	);
	static bindGroupLayoutDescriptor = new GPUBindGroupLayoutDescriptor(
		{
			label: "mesh material bind group layout",
			entries: [
				MeshMaterial.bindGroupLayoutEntry,
				// new GPUBindGroupLayoutEntry(
				// 	{
				// 		binding: 10,
				// 		visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
				// 		sampler: new GPUSamplerBindingLayout(
				// 			{
				// 				type: GPUSamplerBindingType.FILTERING
				// 			}
				// 		),
				// 	}
				// ),
				// new GPUBindGroupLayoutEntry(
				// 	{
				// 		binding: 20,
				// 		visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
				// 		texture: new GPUTextureBindingLayout(
				// 			{
				// 				sampleType: GPUTextureSamplingType.FLOAT,
				// 				viewDimension: GPUTextureViewDimension.D2,
				// 				multisampled: false
				// 			}
				// 		),
				// 	}
				// ),
			],
		}
	);

	static DEFAULT = {
		NAME: "",
		TYPE: "MeshMaterial",

		SHADER_PATH: "/src/shaders/default",
		PROGRAM_NAME: "default",

		SHADER_LOADER: new ShaderLoader(
			{ 
				loadingManager: new LoadingManager({ name: "material default loading manager" }), 
				name: "material shader loader" 
			}
		),
		SHADER_PREPROCESSOR: new ShaderBuilder({ name: "material default shader preprocessor" }),

		TRANSPARENT: false,
		OPACITY: 1.0,
	};


	#shaderSource = { vert: null, frag: null };
	#preprocessedShaderSource = { vert: null, frag: null };
	// #program;
	#shaderPath;
	#programName;

	#shaderLoader;
	#shaderPreprocessor;

	#requiredProgramTemplate;
	#flags;
	#values;

	#lights;
	#side;

	#depthFunc;
	#depthTest;
	#depthWrite;

	#transparent;
	#opacity;

	#updated = true;


	constructor(args = {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : MeshMaterial.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : MeshMaterial.DEFAULT.TYPE,
			}
		);
		
		this.shaderPath = (args.shaderPath !== undefined) ? args.shaderPath : MeshMaterial.DEFAULT.SHADER_PATH;
		this.programName = (args.programName !== undefined) ? args.programName : MeshMaterial.DEFAULT.PROGRAM_NAME;

		this.shaderLoader = (args.shaderLoader !== undefined) ? args.shaderLoader : MeshMaterial.DEFAULT.SHADER_LOADER;
		this.shaderPreprocessor = (args.shaderPreprocessor !== undefined) ? args.shaderPreprocessor : MeshMaterial.DEFAULT.SHADER_PREPROCESSOR; 

		this.requiredProgramTemplate = null;
		this.flags = new Set();
		this.values = new Map();

		this.lights = true;
		this.side = FRONT_SIDE;

		this.depthFunc = FUNC_LEQUAL;
		this.depthTest = true;
		this.depthWrite = true;

		this.transparent = (args.transparent !== undefined) ? args.transparent : MeshMaterial.DEFAULT.TRANSPARENT;
		this.opacity = (args.opacity !== undefined) ? args.opacity : MeshMaterial.DEFAULT.OPACITY;

		this.updated = true;


		// this.samplersBindGroupLayoutDescriptor = new GPUBindGroupLayoutDescriptor(
		// 	{
		// 		entries: new Array(),
		// 	}
		// );
		// this.samplersBindGroupDescriptor = new GPUBindGroupDescriptor(
		// 	{
		// 		layout: null,
		// 		entries: new Array(),
		// 	}
		// );
		// this.texturesBindGroupLayoutDescriptor = new GPUBindGroupLayoutDescriptor(
		// 	{
		// 		entries: new Array(),
		// 	}
		// );
		// this.texturesBindGroupDescriptor = new GPUBindGroupDescriptor(
		// 	{
		// 		layout: null,
		// 		entries: new Array(),
		// 	}
		// );
	}


	get shaderSource() { 
		if(this.#shaderSource.vert === null) {
			const vertPath = this.shaderPath + this.programName + "_vert.wgsl";
			this.shaderLoader.load(vertPath).then(
				(data) => { 
					this.shaderSource = { vert: data, frag: this.#shaderSource.frag }; 
				}, 
				() => {}
			);
		}
		if(this.#shaderSource.frag === null) {
			const fragPath = this.shaderPath + this.programName + "_frag.wgsl";
			this.shaderLoader.load(fragPath).then(
				(data) => { 
					this.shaderSource = { vert: this.#shaderSource.vert, frag: data }; 
				}, 
				() => {}
			);
		}


		return this.#shaderSource; 
	}
	get shaderSource2() { 
		return (async () => {
			const vertPath = this.shaderPath + this.programName + "_vert.wgsl";
			const fragPath = this.shaderPath + this.programName + "_frag.wgsl";

			const d1 = await this.shaderLoader.load(vertPath);
			const d2 = await this.shaderLoader.load(fragPath);

			this.shaderSource = { vert: d1, frag: d2 }; 

			return this.#shaderSource;
		})();
	}
	get shaderSource3() { 
		const prom1 = (async () => {
			const vertPath = this.shaderPath + this.programName + "_vert.wgsl";
			const d1 = await this.shaderLoader.load(vertPath);

			return d1;
		})();

		const prom2 = (async () => {
			const fragPath = this.shaderPath + this.programName + "_frag.wgsl";
			const d2 = await this.shaderLoader.load(fragPath);

			return d2;
		})();

		this.shaderSource = { vert: prom1, frag: prom2 }; 

		return this.#shaderSource;
	}
	set shaderSource(shaderSource) {
		this.#shaderSource = shaderSource;
		this.updated = true;


	}
	get preprocessedShaderSource() { return this.#preprocessedShaderSource; }
	set preprocessedShaderSource(preprocessedShaderSource) { this.#preprocessedShaderSource = preprocessedShaderSource; }
	// get program() { return this.program; }
	// set program(program) { this.program = program; }
	get shaderPath() { return this.#shaderPath; }
	set shaderPath(shaderPath) { this.#shaderPath = shaderPath; }
	get programName() { return this.#programName; }
	set programName(programName) { this.#programName = programName; }

	get shaderLoader() { return this.#shaderLoader; }
	set shaderLoader(shaderLoader) { this.#shaderLoader = shaderLoader; }
	get shaderPreprocessor() { return this.#shaderPreprocessor; }
	set shaderPreprocessor(shaderPreprocessor) { this.#shaderPreprocessor = shaderPreprocessor; }

	get requiredProgramTemplate() { return this.#requiredProgramTemplate; }
	set requiredProgramTemplate(requiredProgramTemplate) { this.#requiredProgramTemplate = requiredProgramTemplate; }
	get flags() { return this.#flags; }
	set flags(flags) {
		this.requiredProgramTemplate = null;
		this.#flags = flags;
	}
	get values() { return this.#values; }
	set values(values) {
		this.requiredProgramTemplate = null;
		this.#values = values;
	}

	get lights() { return this.#lights; }
	set lights(lights) {
		this.#lights = lights;

		if (lights) {
			this.addSBFlag("LIGHTS");
		} else {
			this.rmSBFlag("LIGHTS");
		}
	}
	get side() { return this.#side; }
	set side(side) { 
		this.#side = side;

		if (side === FRONT_SIDE) {
			this.addSBFlag("FRONT_SIDE");
			this.rmSBFlag("BACK_SIDE");
			this.rmSBFlag("FRONT_AND_BACK_SIDE");
		} else if (side === BACK_SIDE) {
			this.rmSBFlag("FRONT_SIDE");
			this.addSBFlag("BACK_SIDE");
			this.rmSBFlag("FRONT_AND_BACK_SIDE");
		} else if (side === FRONT_AND_BACK_SIDE) {
			this.rmSBFlag("FRONT_SIDE");
			this.rmSBFlag("BACK_SIDE");
			this.addSBFlag("FRONT_AND_BACK_SIDE");
		}
	}

	get depthFunc() { return this.#depthFunc; }
	set depthFunc(depthFunc) { this.#depthFunc = depthFunc; }
	get depthTest() { return this.#depthTest; }
	set depthTest(depthTest) { this.#depthTest = depthTest; }
	get depthWrite() { return this.#depthWrite; }
	set depthWrite(depthWrite) { this.#depthWrite = depthWrite; }

	get transparent() { return this.#transparent; }
	set transparent(transparent) { 
		this.#transparent = transparent;

		if(this.transparent) {
			this.addSBFlag("TRANSPARENT");
		} else {
			this.rmSBFlag("TRANSPARENT");
		}
	}
	get opacity() { return this.#opacity; }
	set opacity(opacity) { this.#opacity = opacity; }

	get updated() { return this.#updated; }
	set updated(updated) { this.#updated = updated; }


	addSBFlag(flag) {
		this.requiredProgramTemplate = null;
		this.flags.add(flag);
	}
	rmSBFlag(flag) {
		this.requiredProgramTemplate = null;
		this.flags.delete(flag);
	}
	clearSBFlags() {
		this.requiredProgramTemplate = null;
		this.flags.clear();
	}

	addSBValue(name, value) {
		this.requiredProgramTemplate = null;
		this.values.set(name, value);
	}
	rmSBValue(name) {
		this.requiredProgramTemplate = null;
		this.values.delete(name);
	}
	clearSBValues() {
		this.requiredProgramTemplate = null;
		this.values.clear();
	}
};