import { CanvasDescriptor } from "../PRIMITIVES/canvas rendering/CanvasDescriptor.js";


export class CanvasManager { //RC canvas context manager


	#api;
	#descriptor;

	#canvas;
	#context;


	constructor(api, args = {}) {
		this.api = api;
		this.descriptor = new CanvasDescriptor(api, args);

		this.canvas = this.descriptor.canvas;
		this.context = this.descriptor.context;
	}


	get api() { return this.#api; }
    set api(api) { this.#api = api; }
	get descriptor() { return this.#descriptor; }
	set descriptor(descriptor) { this.#descriptor = descriptor; }

	get canvas() { return this.#canvas; }
    set canvas(canvas) { this.#canvas = canvas; }
	get context() { return this.#context; }
    set context(context) { this.#context = context; }
};