import { DescriptorBase } from "../core/RC/DescriptorBase.js";


export class CanvasDescriptor extends DescriptorBase {  //RC canvas descriptor


	static DEFAULT = {
		NAME: "",
		TYPE: "CanvasDescriptor",

		PARENT: null,

		WIDTH: 1280,
		HEIGHT: 720,
	};


	#parent = CanvasDescriptor.DEFAULT.PARENT;

	#width = CanvasDescriptor.DEFAULT.WIDTH;
	#height = CanvasDescriptor.DEFAULT.HEIGHT;


	constructor(api, args = {}) {
		super(args);

		this.api = api;

		this.parent = (args.parent !== undefined) ? args.parent : CanvasDescriptor.DEFAULT.PARENT;
		this.width = (args.width !== undefined) ? args.width : CanvasDescriptor.DEFAULT.WIDTH;
		this.height = (args.height !== undefined) ? args.height : CanvasDescriptor.DEFAULT.HEIGHT;
	}


	get parent() { return this.#parent; }
	set parent(parent) {
		this.#parent = parent;
		this.dirtyCache.set("parent", parent);
	}

	get width() { return this.#width; }
	set width(width) { 
		this.#width = width;
		this.dirtyCache.set("width", width);
	}
	get height() { return this.#height; }
	set height(height) { 
		this.#height = height;
		this.dirtyCache.set("height", height);
	}
	get aspect() { return this.width / this.height; }
};
