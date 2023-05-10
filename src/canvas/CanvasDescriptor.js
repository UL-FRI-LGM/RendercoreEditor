import { DescriptorBase } from "../core/RC/DescriptorBase.js";


export class CanvasDescriptor extends DescriptorBase {  //RC canvas descriptor


    static DEFAULT = {
		NAME: "",
		TYPE: "CanvasDescriptor",

		PARENT: null,
        VIEWPORT: undefined,
        WIDTH: undefined,
        HEIGHT: undefined,
	};


    #api;

    #parent;
	#width = CanvasDescriptor.DEFAULT.WIDTH;
	#height = CanvasDescriptor.DEFAULT.HEIGHT;


    constructor(api, args = {}) {
        super(args);

        this.api = api;

        this.parent = (args.parent !== undefined) ? args.parent : CanvasDescriptor.DEFAULT.PARENT;
		this.width = (args.width !== undefined) ? args.width : this.width;
        this.height = (args.height !== undefined) ? args.height : this.height;
    }

    
    get api() { return this.#api; }
    set api(api) { 
        this.#api = api;
        this.dirtyCache.set("api", api);
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