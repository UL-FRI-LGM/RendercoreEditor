import {Camera} from "./Camera.js";
import { InstructionCache } from "../core/data_layouts/InstructionCache.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";
import { MapT2 } from "../core/MapT2.js";


export class PerspectiveCamera extends Camera {
	static DEFAULT = {
		NAME: "",
		TYPE: "PerspectiveCamera",

		VISIBLE: true,
		FRUSTUM_CULLED: false,

		RESOURCE_PACK: new ResourcePack({ name: "RP - PERSPECTIVE CAMERA" }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: "IC - PERSPECTIVE CAMERA" },
			[
				...Camera.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),
		DIRTY_CACHE: new MapT2(
			{ name: "DC - PERSPECTIVE CAMERA" },
			[
				...Camera.DEFAULT.DIRTY_CACHE.clone(),
			]
		),

		FOV: 50,
		ASPECT: 1,
		NEAR: 0.1,
		FAR: 128,
		TOP: 1,
		BOTTOM: -1,
		LEFT: -1,
		RIGHT: 1,
	};


	#fov = PerspectiveCamera.DEFAULT.FOV;
	#aspect = PerspectiveCamera.DEFAULT.ASPECT;
	#near = PerspectiveCamera.DEFAULT.NEAR;
	#far = PerspectiveCamera.DEFAULT.FAR;
	#top = PerspectiveCamera.DEFAULT.TOP;
	#bottom = PerspectiveCamera.DEFAULT.BOTTOM;
	#left = PerspectiveCamera.DEFAULT.LEFT;
	#right = PerspectiveCamera.DEFAULT.RIGHT;


	constructor(args= {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : PerspectiveCamera.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : PerspectiveCamera.DEFAULT.TYPE,
			
				visible: (args.visible !== undefined) ? args.visible : PerspectiveCamera.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : PerspectiveCamera.DEFAULT.FRUSTUM_CULLED,

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : PerspectiveCamera.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : PerspectiveCamera.DEFAULT.INSTRUCTION_CACHE.clone(),
				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : PerspectiveCamera.DEFAULT.DIRTY_CACHE.clone(),
			}
		);

		this.fov = (args.fov !== undefined) ? args.fov : PerspectiveCamera.DEFAULT.FOV;
		this.aspect = (args.aspect !== undefined) ? args.aspect : PerspectiveCamera.DEFAULT.ASPECT;
		this.near = (args.near !== undefined) ? args.near : PerspectiveCamera.DEFAULT.NEAR;
		this.far = (args.far !== undefined) ? args.far : PerspectiveCamera.DEFAULT.FAR;
		this.top = (args.top !== undefined) ? args.top : this.near * Math.tan((Math.PI/180) * 0.5 * this.fov);
		this.bottom = (args.bottom !== undefined) ? args.bottom : -this.top;
		this.left = (args.left !== undefined) ? args.left : -0.5 * (this.aspect * (2 * this.top));
		this.right = (args.right !== undefined) ? args.right : -this.left;
	}


	get fov() { return this.#fov; }
	set fov(fov) {
		this.#fov = fov;

		this.#updateTBLR();
		this.updateProjectionMatrix();
	}
	get aspect() { return this.#aspect; }
	set aspect(aspect) {
		this.#aspect = aspect;

		this.#updateLR();
		this.updateProjectionMatrix();
	}
	get near() { return this.#near; }
	set near(near) {
		this.#near = near;

		this.#updateTBLR();
		this.updateProjectionMatrix();
	}
	get far() { return this.#far; }
	set far(far) {
		this.#far = far;

		this.updateProjectionMatrix();
	}
	get top() { return this.#top; }
	set top(top) {
		this.#top = top;

		this.updateProjectionMatrix();
	}
	get bottom() { return this.#bottom; }
	set bottom(bottom) {
		this.#bottom = bottom;

		this.updateProjectionMatrix();
	}
	get left() { return this.#left; }
	set left(left) {
		this.#left = left;

		this.updateProjectionMatrix();
	}
	get right() { return this.#right; }
	set right(right) {
		this.#right = right;

		this.updateProjectionMatrix();
	}


	updateProjectionMatrix() {
		this.projectionMatrix = this.projectionMatrix.makePerspective(this.left, this.right, this.top, this.bottom, this.near, this.far);
	}
	#updateTBLR(){
		this.top = this._near * Math.tan((Math.PI/180) * 0.5 * this.fov);
		this.bottom = -this.top;
		this.#updateLR();
	}
	#updateLR(){
		this.left = -0.5 * (this.aspect * (2 * this.top));
		this.right = -this.left;
	}
};