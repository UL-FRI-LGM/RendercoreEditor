import { Group } from "../group/Group.js";
import { RenderArrayManager } from "../../renderers/RenderArrayManager.js";
import { CameraManager } from "../../cameras/CameraManager.js";
import { LightManager } from "../../lights/LightManager.js";
import { ResourcePack } from "../../core/data_layouts/ResourcePack.js";
import { MapT2 } from "../../core/MapT2.js";


export class Scene extends Group {
	static DEFAULT = {
		NAME: "",
		TYPE: "Scene",

		VISIBLE: true,
		FRUSTUM_CULLED: false,
		
		RESOURCE_PACK: new ResourcePack({ name: "RP - SCENE" }),
		DIRTY_CACHE: new MapT2(
			{ name: "DC - SCENE" },
			[
				...Group.DEFAULT.DIRTY_CACHE.clone(),
			]
		),

		AUTO_UPDATE: true,

		INITIALIZED: false,
		EXTERNAL: {
			INITIALIZE: (args = {}) => { return true; },
			PREPROCESS: (args = {}) => { return null; },
			PROCESS: (args = {}) => { return null; },
			POSTPROCESS: (args = {}) => { return null; },
		},

		ARGS_UPDATE: {
			updateParents: false,
			updateChildren: true,
		},
	};


	#autoUpdate;

	#initialized;
	#initializeExternal;
	#preprocessExternal;
	#processExternal;
	#postprocessExternal;

	#argsUpdate;


	constructor(args = {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : Scene.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Scene.DEFAULT.TYPE,

				visible: (args.visible !== undefined) ? args.visible : Scene.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : Scene.DEFAULT.FRUSTUM_CULLED,

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : Scene.DEFAULT.RESOURCE_PACK.clone(),
				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : Scene.DEFAULT.DIRTY_CACHE.clone(),
			}
		);

		this.autoUpdate = (args.autoUpdate !== undefined) ? args.autoUpdate : Scene.DEFAULT.AUTO_UPDATE;

		this.cameraManager = new CameraManager({});
		this.lightManager = new LightManager({});
		this.meshManager = null;

		this.initialized = (args.initialized !== undefined) ? args.initialized : Scene.DEFAULT.INITIALIZED;
		this.initializeExternal = (args.initializeExternal !== undefined) ? args.initializeExternal : Scene.DEFAULT.EXTERNAL.INITIALIZE;
		this.preprocessExternal = (args.preprocessExternal !== undefined) ? args.preprocessExternal : Scene.DEFAULT.EXTERNAL.PREPROCESS;
		this.processExternal = (args.processExternal !== undefined) ? args.processExternal : Scene.DEFAULT.EXTERNAL.PROCESS;
		this.postprocessExternal = (args.postprocessExternal !== undefined) ? args.postprocessExternal : Scene.DEFAULT.EXTERNAL.POSTPROCESS;
	
		this.argsUpdate = (args.argsUpdate !== undefined) ? args.argsUpdate : {
			updateParents: false,
			updateChildren: true,
		};
	}


	get autoUpdate() { return this.#autoUpdate; }
	set autoUpdate(autoUpdate) { this.#autoUpdate = autoUpdate; }

	get initialized() { return this.#initialized; }
	set initialized(initialized) { this.#initialized = initialized; }
	get initializeExternal() { return this.#initializeExternal; }
	set initializeExternal(initializeExternal) { this.#initializeExternal = initializeExternal; }
	get preprocessExternal() { return this.#preprocessExternal; }
	set preprocessExternal(preprocessExternal) { this.#preprocessExternal = preprocessExternal; }
	get processExternal() { return this.#processExternal; }
	set processExternal(processExternal) { this.#processExternal = processExternal; }
	get postprocessExternal() { return this.#postprocessExternal; }
	set postprocessExternal(postprocessExternal) { this.#postprocessExternal = postprocessExternal; }

	get argsUpdate() { return this.#argsUpdate; }
	set argsUpdate(argsUpdate) { this.#argsUpdate = argsUpdate; }


	setup(args = {}) {
		super.setup(args);


		// 1. SETUP CAMERA
		this.cameraManager.activeCamera = args.camera;
		this.cameraManager.setup();

		// 2. SETUP LIGHTS
		this.lightManager.setup(this);

		// 3.
		// this.meshManager.setup();
		// this.#setupObjects(camera); // currently not in use
	}
	update(args = {}, camera) {
		super.update(args);

		
		// Update scene graph and camera matrices


		// 1. UPDATE CAMERA
		this.cameraManager.update();

		// 2. UPDATE LIGHTS
		this.lightManager.update(this);


		// Update objects attributes and set up lights
	}

	initializeInternal(args = {}) { return { ...args, ...this.initializeExternal(args)}; }
	preprocessInternal(args = {}) {
		this.setup(args);


		return { ...args, ...this.preprocessExternal(args) };
	}
	processInternal(args = {}) {
		this.cameraManager.update();
		if (this.autoUpdate) this.update(args.argsUpdate, args.camera);


		return { ...args, ...this.processExternal(args) };
	}
	postprocessInternal(args = {}) { return { ...args, ...this.postprocessExternal(args) }; }
	processMain(args = {}) {
		// INITIALIZE
		if (!this.initialized) {
			this.initializeInternal(args);
			this.initialized = true;
		}

		// PREPROCESS
		const argsOut1 = this.preprocessInternal(args);

		// PROCESS
		const argsOut2 = this.processInternal(argsOut1);

		// POSTPROCESS
		const argsOut3 = this.postprocessInternal(argsOut2);
	}
};