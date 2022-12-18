import { GPU } from "./PRIMITIVES/GPU.js";
import { GPUAdapter } from "./PRIMITIVES/GPUAdapter.js";
import { GPUDevice } from "./PRIMITIVES/GPUDevice.js";
import { ContextDescriptorBase } from "./ContextDescriptorBase.js";


export class GPUContextDescriptor extends ContextDescriptorBase { //WebGPU context descriptor


    #navigator;
    #gpu;
    #adapter
    #device

    #context;


    constructor(args = {}) {
        return (async () => {
            super(args);

            this.navigator = window.navigator;
            this.gpu = new GPU(this.navigator);
            this.adapter = await new GPUAdapter(this.gpu, args.adapterDescriptor);
            this.device = await new GPUDevice(this.adapter, args.deviceDescriptor);
          
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