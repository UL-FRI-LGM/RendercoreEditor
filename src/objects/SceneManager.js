import { ObjectBase } from "../core/ObjectBase.js";


export class SceneManager extends ObjectBase {


	static DEFAULT = {
		NAME: "",
		TYPE: "SceneManager",
	};


	#context;

	#scenes = new Map();
	#activeScene;


	constructor(context, args = {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : SceneManager.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : SceneManager.DEFAULT.TYPE,
			}
		);

		this.context = context;

		this.scenes = (args.scenes !== undefined) ? args.scenes : new Map();
		this.#activeScene = null;
	}


	get context() { return this.#context; }
	set context(context) { this.#context = context; }

	get scenes() { return this.#scenes; }
	set scenes(scenes) { this.#scenes = scenes; }
	get activeScene() { return this.#activeScene; }
	set activeScene(scene) { this.#activeScene = scene; }


	initializeInternal(args = {}) {
		return true;
	}
	preprocessInternal(args = {}) {

	}
	processInternal(args = {}) {
		for (const [name, scene] of this.scenes) {
			scene.processMain(args);
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