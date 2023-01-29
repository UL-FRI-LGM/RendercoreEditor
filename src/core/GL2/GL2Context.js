import { GL2Device } from "./GL2Device.js";


export class GL2Context { //WebGL context wrapper


    #device
    #context;


    constructor(args = {}) {
        return (async () => {
            // super(args);

            this.device = await new GL2Device(this.adapter, args.deviceDescriptor);
            this.context = null;


            return this;
        })();
    }


    get device() { return this.#device; }
    set device(device) { this.#device = device; }
    get context() { return this.#context; }
    set context(context) { this.#context = context; }
};