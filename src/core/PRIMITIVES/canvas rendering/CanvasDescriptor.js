import { Canvas } from "../../Canvas.js";


export class CanvasDescriptor {  //RC canvas descriptor


    #api;
    #canvas;

    #context;


    constructor(api, args =  {}) {
        this.api = api;
        this.canvas = new Canvas({ ...args, contextType: api });

        this.context = this.canvas.context;
    }

    
    get api() { return this.#api; }
    set api(api) { this.#api = api; }
    get canvas() { return this.#canvas; }
    set canvas(canvas) { this.#canvas = canvas; }

    get context() { return this.#context; }
    set context(context) { this.#context = context; }
};