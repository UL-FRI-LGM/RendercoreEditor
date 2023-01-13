import { Canvas } from "../../Canvas.js";
import { DescriptorBase } from "../../RC/DescriptorBase.js";


export class CanvasDescriptor extends DescriptorBase {  //RC canvas descriptor


    static DEFAULT = {
		NAME: "",
		TYPE: "CanvasDescriptor",

		PARENT: null,
        VIEWPORT: undefined,
        WIDTH: undefined,
        HEIGHT: undefined,
        PIXEL_RATIO: window.devicePixelRatio || 1,
	};


    #api;

    #parent;
	#viewport = CanvasDescriptor.DEFAULT.VIEWPORT;
	#width = CanvasDescriptor.DEFAULT.WIDTH;
	#height = CanvasDescriptor.DEFAULT.HEIGHT;
    #pixelRatio;


    constructor(api, args = {}) {
        super(args);

        this.api = api;

        this.parent = (args.parent !== undefined) ? args.parent : CanvasDescriptor.DEFAULT.PARENT;
		this.viewport = (args.viewport !== undefined) ? args.viewport : this.viewport;
		this.width = (args.width !== undefined) ? args.width : this.width;
        this.height = (args.height !== undefined) ? args.height : this.height;
		this.pixelRatio = (args.pixelRatio !== undefined) ? args.pixelRatio : CanvasDescriptor.DEFAULT.PIXEL_RATIO;
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
    get viewport() { return this.#viewport; }
    set viewport(viewport) { 
        this.#viewport = viewport;
        this.dirtyCache.set("viewport", viewport);
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
	get pixelRatio() { return this.#pixelRatio; }
	set pixelRatio(pixelRatio) { 
		this.#pixelRatio = pixelRatio;
        this.dirtyCache.set("pixelRatio", pixelRatio);
	}
};