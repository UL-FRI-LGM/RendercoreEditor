import { GPUCanvasAlphaMode } from "./ENUM/GPUCanvasAlphaMode.js";
import { GPUTextureFormat } from "./ENUM/GPUTextureFormat.js";
import { ContextDescriptor } from "./ContextDescriptor.js";
import { GPUCanvasConfiguration } from "./DICTS/GPUCanvasConfiguration.js";


export class ContextManager { //RC context manager


    #canvas;
    #api;
    #descriptor;

    #context;


    constructor(canvas, api, descriptor) {
        return (async () => {
            this.canvas = canvas;
            this.api = api;
            this.descriptor = descriptor;
    
            this.context = (await new ContextDescriptor(api, descriptor)).context; //mapping (RC context descriptor -> context)

            this.canvas.context.configure(
                new GPUCanvasConfiguration(
                    {
                        device: this.context,
                        format: GPUTextureFormat.RGBA_8_UNORM,
                        alphaMode: GPUCanvasAlphaMode.OPAQUE,
                    }
                )
            );


            return this;
        })();
    }

    
    get canvas() { return this.#canvas; }
    set canvas(canvas) { this.#canvas = canvas; }
    get api() { return this.#api; }
    set api(api) { this.#api = api; }
    get descriptor() { return this.#descriptor; }
    set descriptor(descriptor) { this.#descriptor = descriptor; }

    get context() { return this.#context; }
    set context(context) { this.#context = context; }
};