import {FRONT_SIDE, BACK_SIDE, FRONT_AND_BACK_SIDE, FUNC_LEQUAL} from "../constants.js";
import { ShaderLoader } from "../loaders/ShaderLoader.js";
import { ShaderBuilder } from "../program_management/ShaderBuilder.js";
import { LoadingManager, Material } from "../RenderCore.js";


export class MeshMaterial extends Material { //mesh custom material


	static DEFAULT = {
		NAME: "",
		TYPE: "MeshMaterial",

		SHADER_LOADER: new ShaderLoader(
			{ 
				loadingManager: new LoadingManager({ name: "mesh material default loading manager" }), 
				name: "mesh material shader loader" 
			}
		),
		SHADER_PREPROCESSOR: new ShaderBuilder({ name: "mesh material default shader preprocessor" }),

		SHADER_PATH: "/src/shaders/default",
		PROGRAM_NAME: "default",

		TRANSPARENT: false,
		OPACITY: 1.0,
	};


	#shaderLoader;
	#shaderPreprocessor;

	#shaderPath;
	#programName;
	#shaderSource = { vert: null, frag: null };
	#preprocessedShaderSource = { vert: null, frag: null };

	#requiredProgramTemplate;
	#flags;
	#values;

	#lights;//TODO move to flags?????????
	#side;

	#depthFunc;
	#depthTest;
	#depthWrite;

	#transparent;
	#opacity;

	#updated = true;

	#uniforms;
	#attributes;
	#maps;

	#dirtyCache;


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

		this.uniforms = (args.uniforms !== undefined) ? args.uniforms : new Map();
		this.attributes = (args.attributes !== undefined) ? args.attributes : new Map();
		this.maps = new Map();
		
		this.dirtyCache = new Map();
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

	get uniforms() { return this.#uniforms; }
	set uniforms(uniforms) { this.#uniforms = uniforms; }
	get attributes() { return this.#attributes; }
	set attributes(attributes) { this.#attributes = attributes; }
	get maps() { return this.#maps; }
	set maps(maps) { this.#maps = maps; }
	//TODO textures, samplers
	
	get dirtyCache() { return this.#dirtyCache; }
	set dirtyCache(dirtyCache) { this.#dirtyCache = dirtyCache; }


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

	getUniform(name) {
		return this.uniforms.get(name);
	}
	setUniform(name, value) {
		this.uniforms.set(name, value);
		this.dirtyCache.set(name, value);
	}
	removeUniform(name) {
		this.uniforms.delete(name);
		this.dirtyCache.delete(name);
	}

	getAttribute(name) {
		return this.attributes.get(name);
	}
	setAttribute(name, value) {
		this.attributes.set(name, value);
		this.dirtyCache.set(name, value);
	}
	removeAttribute(name) {
		this.attributes.delete(name);
		this.dirtyCache.delete(name);
	}

	getMap(name) {
		return this.maps.get(name);
	}
	setMap(name, map) {
		this.requiredProgramTemplate = null;
		this.maps.set(name, map);

		this.addSBFlag("TEXTURES"); //TODO rename to MAPS?
		this.addSBValue("NUM_TEXTURES", this.maps.size);
	}
	removeMap(name) {
		this.requiredProgramTemplate = null;
		this.maps.delete(name);

		if (this.maps.size === 0) this.rmSBFlag("TEXTURES");
		this.addSBValue("NUM_TEXTURES", this.maps.size);
	}
	clearMaps() {
		this.requiredProgramTemplate = null;
		this.maps.clear();

		this.rmSBFlag("TEXTURES");
		this.addSBValue("NUM_TEXTURES", this.maps.size);
	}
};