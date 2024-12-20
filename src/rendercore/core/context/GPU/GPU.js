//GPU is the entry point to WebGPU


export class GPU { //GPU gpu wrapper


    // Promise<GPUAdapter?> requestAdapter(optional GPURequestAdapterOptions options = {});
    // TextureFormat getPreferredCanvasFormat();


    #navigator;
    #gpu;


    constructor(navigator) {
        this.navigator = navigator;
        this.gpu = navigator.gpu;
    }

    
    get navigator() { return this.#navigator; }
    set navigator(navigator) { this.#navigator = navigator; }
    get gpu() { return this.#gpu; }
    set gpu(gpu) { this.#gpu = gpu; }


    async requestAdapter(options = undefined) {
        return await this.gpu.requestAdapter(options);
    }

    prefferedCanvasFormat() {
        return this.gpu.getPreferredCanvasFormat();
    }
};
