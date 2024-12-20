import { ObjectBase } from "../core/ObjectBase.js";
import { MapT2 } from "../core/MapT2.js";
import { SetT2 } from "../core/SetT2.js";
import { Camera } from "./Camera.js";
import { OrthographicCamera } from "./OrthographicCamera.js";
import { PerspectiveCamera } from "./PerspectiveCamera.js";


export class CameraManager extends ObjectBase {


	static DEFAULT = {
		TYPE: "CameraManager",
		NAME: "",

		CAMERAS: new MapT2({},
			[
				[OrthographicCamera.DEFAULT.TYPE, new SetT2({})],
				[PerspectiveCamera.DEFAULT.TYPE, new SetT2({})],
			]
		),
		MAX_CAMERAS: 1,
		ACTIVE_CAMERA: null,
	};


	#cameras;
	#maxCameras;
	#activeCamera;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : CameraManager.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : CameraManager.DEFAULT.NAME,
			}
		);

		this.cameras = (args.cameras !== undefined) ? args.cameras : CameraManager.DEFAULT.CAMERAS.clone(true);
		this.maxCameras = (args.maxCameras !== undefined) ? args.maxCameras : CameraManager.DEFAULT.MAX_CAMERAS;
		this.activeCamera = (args.activeCamera !== undefined) ? args.activeCamera : CameraManager.DEFAULT.ACTIVE_CAMERA;
	}


	get cameras() { return this.#cameras; }
	set cameras(cameras) { this.#cameras = cameras; }
	get maxCameras() { return this.#maxCameras; }
	set maxCameras(maxCameras) { this.#maxCameras = maxCameras; }
	get activeCamera() { return this.#activeCamera; }
	set activeCamera(camera) { this.#activeCamera = camera; }


	setup() {
		const camera = this.activeCamera;

		if (!camera.set) {
			// SETUP
			//


			camera.set = true;
		}
	}
	update() {
		// UPDATE
		const camera = this.activeCamera;

		camera.update(
			{
				updateParents: true,
				updateChildren: true,
			}
		);
	}

	initializeInternal(args = {}) {
		return true;
	}
	preprocessInternal(args = {}) {

	}
	processInternal(args = {}) {
		for (const [name, camera] of this.cameras) {
			camera.processMain(args);
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
