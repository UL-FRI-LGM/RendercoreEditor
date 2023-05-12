import { API, CONSTANTS } from "../RenderCore.js";
import { GL2Context } from "./GL2/GL2Context.js";
import { GPUContext } from "./GPU/GPUContext.js";


export class Context { //RC context wrapper


    static API = {
        WEBGL1: "webgl1",
        WEBGL2: "webgl2",
        WEBGPU: "webgpu",
    };
    static #API = new Map([
        [Context.API.WEBGL2, async (args) => { return await new GL2Context(args); }],
        [Context.API.WEBGPU, async (args) => { return await new GPUContext(args); }],
    ]);


    // #api;

    // #device;
    // #context;


    constructor(api, args = {}) {
        return (async () => {
            // this.api = api;

            // if(api === API.WEBGL2){
            //     const context = (await new GL2Context(args));
            //     this.device = context.device;
            //     this.context = context.context;
            // }else if(api === API.WEBGPU){
            //     const context = (await new context(args));
            //     this.device = context.device;
            //     this.context = context.context;
            // }


            // return this;
            // return (api === API.WEBGL2) ? (await new GL2Context(args)) : ((api === API.WEBGPU) ? (await new GPUContext(args)) : null);
            return await Context.#API.get(api)(args);
        })();
    }


    // get api() { return this.#api; }
    // set api(api) { this.#api = api; }

    // get device() { return this.#device; }
    // set device(device) { this.#device = device; }
    // get context() { return this.#context; }
    // set context(context) { this.#context = context; }
};
