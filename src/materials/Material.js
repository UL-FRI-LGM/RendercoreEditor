import {FRONT_SIDE, BACK_SIDE, FRONT_AND_BACK_SIDE, FUNC_LEQUAL} from "../constants.js";
import { ObjectBase } from "../core/ObjectBase.js";
import { ShaderLoader } from "../loaders/ShaderLoader.js";
import { LoadingManager } from "../RenderCore.js";


export class Material extends ObjectBase {
	static DEFAULT = {
		NAME: "",
		TYPE: "Material",

		SHADER_PATH: "/src/shaders/default",
		PROGRAM_NAME: "default",

		SHADER_LOADER: new ShaderLoader(
			{ 
				LoadingManager: new LoadingManager({ name: "material default loading manager" }), 
				name: "material shader loader" 
			}
		),
	};


	#shaderSource = { vert: null, frag: null };
	// #program;
	#shaderPath;
	#programName;

	#shaderLoader;

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

	#update = true;


	constructor(args = {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : Material.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Material.DEFAULT.TYPE,
			}
		);
		
		this.shaderPath = (args.shaderPath !== undefined) ? args.shaderPath : Material.DEFAULT.SHADER_PATH;
		this.programName = (args.programName !== undefined) ? args.programName : Material.DEFAULT.PROGRAM_NAME;

		this.shaderLoader = (args.shaderLoader !== undefined) ? args.shaderLoader : Material.DEFAULT.SHADER_LOADER;

		this.requiredProgramTemplate = null;
		this.flags = new Set();
		this.values = new Map();

		this.lights = true;
		this.side = FRONT_SIDE;

		this.depthFunc = FUNC_LEQUAL;
		this.depthTest = true;
		this.depthWrite = true;

		this.transparent = false;
		this.opacity = 1.0;

		this.update = true;
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
	set shaderSource(shaderSource) { 
		this.#shaderSource = shaderSource; 
		this.update = true; 
	}
	// get program() { return this.program; }
	// set program(program) { this.program = program; }
	get shaderPath() { return this.#shaderPath; }
	set shaderPath(shaderPath) { this.#shaderPath = shaderPath; }
	get programName() { return this.#programName; }
	set programName(programName) { this.#programName = programName; }

	get shaderLoader() { return this.#shaderLoader; }
	set shaderLoader(shaderLoader) { this.#shaderLoader = shaderLoader; }

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

	get update() { return this.#update; }
	set update(update) { this.#update = update; }


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