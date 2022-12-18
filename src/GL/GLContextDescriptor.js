import { ContextDescriptorBase } from "../core/ContextDescriptorBase.js";
import { GLDevice } from "./GLDevice.js";


export class GLContextDescriptor extends ContextDescriptorBase { //WebGL context descriptor


    #device

    #context;


    constructor(args = {}) {
        return (async () => {
            super(args);

            this.device = await new GLDevice(this.adapter, args.deviceDescriptor);

            this.context = null;


            return this;
        })();
    }


    get device() { return this.#device; }
    set device(device) { this.#device = device; }

    get context() { return this.#context; }
    set context(context) { this.#context = context; }
};