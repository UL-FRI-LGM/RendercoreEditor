import { API } from "../RenderCore.js";
import { GLContextDescriptor } from "../GL/GLContextDescriptor.js";
import { GPUContextDescriptor } from "./GPUContextDescriptor.js";


export class ContextDescriptor { //RC context descriptor


    #api;
    #descriptor;

    #context;


    constructor(api, descriptor) {
        return (async () => {
            this.api = api;
            this.descriptor = descriptor;

            if(api === API.WEBGL2){
                this.context = (await new GLContextDescriptor(descriptor)).context;
            }else if(api === API.WEBGPU){
                this.context = (await new GPUContextDescriptor(descriptor)).context;
            }


            return this;
        })();
    }


    get api() { return this.#api; }
    set api(api) { this.#api = api; }
    get descriptor() { return this.#descriptor; }
    set descriptor(descriptor) { this.#descriptor = descriptor; }

    get context() { return this.#context; }
    set context(context) { this.#context = context; }
};