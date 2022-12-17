import {Camera} from "./Camera.js";


export class OrthographicCamera extends Camera {
	static DEFAULT = {
		NAME: "",
		TYPE: "OrthographicCamera",

		VISIBLE: true,
		FRUSTUM_CULLED: false,

		ZOOM: 1.0,
		ASPECT: 1.0,
		NEAR: 0.0,
		FAR: 128.0,
		TOP: 16.0,
		BOTTOM: -16.0,
		LEFT: -16.0,
		RIGHT: 16.0,
	};


	#zoom = OrthographicCamera.DEFAULT.ZOOM;
	#aspect = OrthographicCamera.DEFAULT.ASPECT;
	#near = OrthographicCamera.DEFAULT.NEAR;
	#far = OrthographicCamera.DEFAULT.FAR;
	#top = OrthographicCamera.DEFAULT.TOP;
	#bottom = OrthographicCamera.DEFAULT.BOTTOM;
	#left = OrthographicCamera.DEFAULT.LEFT;
	#right = OrthographicCamera.DEFAULT.RIGHT;


	constructor(args = {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : OrthographicCamera.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : OrthographicCamera.DEFAULT.TYPE,
			
				visible: (args.visible !== undefined) ? args.visible : OrthographicCamera.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : OrthographicCamera.DEFAULT.FRUSTUM_CULLED,
			}
		);

		this.zoom = (args.zoom !== undefined) ? args.zoom : OrthographicCamera.DEFAULT.ZOOM;
		this.aspect = (args.aspect !== undefined) ? args.aspect : OrthographicCamera.DEFAULT.ASPECT;
		this.near = (args.near !== undefined) ? args.near : OrthographicCamera.DEFAULT.NEAR;
		this.far = (args.far !== undefined) ? args.far : OrthographicCamera.DEFAULT.FAR;
		this.top = (args.top !== undefined) ? args.top : OrthographicCamera.DEFAULT.TOP;
		this.bottom = (args.bottom !== undefined) ? args.bottom : OrthographicCamera.DEFAULT.BOTTOM;
		this.left = (args.left !== undefined) ? args.left : OrthographicCamera.DEFAULT.LEFT;
		this.right = (args.right !== undefined) ? args.right : OrthographicCamera.DEFAULT.RIGHT;
	}


	get zoom() { return this.#zoom; }
	set zoom(zoom) {
		this.#zoom = zoom;

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
		const dx = (this.right - this.left) / (2 * this.zoom);
		const dy = (this.top - this.bottom) / (2 * this.zoom);
		const cx = (this.right + this.left) / 2;
		const cy = (this.top + this.bottom) / 2;

		const left = cx - dx;
		const right = cx + dx;
		const top = cy + dy;
		const bottom = cy - dy;

		this.projectionMatrix = this.projectionMatrix.makeOrthographic(left, right, top, bottom, this.near, this.far);
	}
	#updateLR(){
		this.left = -this.top * this.aspect;
		this.right = -this.left;
	}
};