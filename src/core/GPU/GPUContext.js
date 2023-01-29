import { GPU } from "./GPU.js";
import { GPUAdapter } from "./GPUAdapter.js";
import { GPUDevice } from "./GPUDevice.js";


export class GPUContext { //WebGPU context wrapper


    #navigator;
    #gpu;
    #adapter
    #device
    #context;


    constructor(args = {}) {
        return (async () => {
            // super(args);

            this.navigator = window.navigator;
            this.gpu = new GPU(this.navigator);
            this.adapter = await new GPUAdapter(this.gpu, args);
            this.device = await new GPUDevice(this.adapter, args);
            this.context = this.device.device;


            return this;
        })();
    }

    
    get navigator() { return this.#navigator; }
    set navigator(navigator) { this.#navigator = navigator; }
    get gpu() { return this.#gpu; }
    set gpu(gpu) { this.#gpu = gpu; }
    get adapter() { return this.#adapter; }
    set adapter(adapter) { this.#adapter = adapter; }
    get device() { return this.#device; }
    set device(device) { this.#device = device; }
    get context() { return this.#context; }
    set context(context) { this.#context = context; }
};