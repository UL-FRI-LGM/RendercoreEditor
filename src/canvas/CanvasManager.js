import { Canvas } from "./Canvas.js";
import { CanvasConfiguration } from "./CanvasConfiguration.js";
import { ObjectBase } from "../core/ObjectBase.js";
import { CanvasDescriptor } from "./CanvasDescriptor.js";


export class CanvasManager extends ObjectBase { //RC canvas manager


	static DEFAULT = {
        NAME: "",
		TYPE: "CanvasManager",
    };


	#api;
	#descriptor;
	#configuration;

	#canvas;


	constructor(api, context, args = {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : CanvasManager.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : CanvasManager.DEFAULT.TYPE,
			}
		);

		this.api = api;
		this.descriptor = new CanvasDescriptor(api, args);
		this.configuration = new CanvasConfiguration(context, args);

		this.canvas = new Canvas(this.descriptor.api, this.descriptor);
		this.canvas.configure(this.configuration);
	}


	get api() { return this.#api; }
    set api(api) { this.#api = api; }
	get descriptor() { return this.#descriptor; }
	set descriptor(descriptor) { this.#descriptor = descriptor; }
	get configuration() { return this.#configuration; }
	set configuration(configuration) { this.#configuration = configuration; }

	get canvas() { return this.#canvas; }
    set canvas(canvas) { this.#canvas = canvas; }

	
	setup() {
		
	}
	update() {
		if (this.descriptor.dirtyCache.size > 0) {
			// for (const [name, desc] of this.descriptor.dirtyCache) {
			// 	if (desc !== undefined) this.canvas[name] = desc;
			// }
			this.descriptor.dirtyCache.forEach((value, name) => {
				this.canvas[name] = value;
			});
			this.descriptor.dirtyCache.clear();
		}
	}
};