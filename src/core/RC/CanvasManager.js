import { Canvas } from "../Canvas.js";
import { CanvasDescriptor } from "../PRIMITIVES/canvas rendering/CanvasDescriptor.js";


export class CanvasManager { //RC canvas context manager


	#api;
	#descriptor;

	#canvas;
	// #context;


	constructor(api, args = {}) {
		this.api = api;
		this.descriptor = new CanvasDescriptor(api, args);

		// this.canvas = this.descriptor.canvas;
		// this.context = this.descriptor.context;
		this.canvas = new Canvas(this.descriptor.api, this.descriptor);
	}


	get api() { return this.#api; }
    set api(api) { this.#api = api; }
	get descriptor() { return this.#descriptor; }
	set descriptor(descriptor) { this.#descriptor = descriptor; }

	get canvas() { return this.#canvas; }
    set canvas(canvas) { this.#canvas = canvas; }
	// get context() { return this.#context; }
    // set context(context) { this.#context = context; }


	update() {
		for (const [name, desc] of this.descriptor.dirtyCache) {
			if (desc !== undefined) this.canvas[name] = desc;
		}
        this.descriptor.dirtyCache.clear();
	}
};