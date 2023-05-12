// A GPUAdapter encapsulates an adapter, and describes its capabilities (features and limits).


export class GPUAdapter { //GPU adapter wrapper


    // [SameObject] readonly attribute GPUSupportedFeatures features;
    // [SameObject] readonly attribute GPUSupportedLimits limits;
    // readonly attribute boolean isFallbackAdapter;

    // Promise<GPUDevice> requestDevice(optional GPUDeviceDescriptor descriptor = {});
    // Promise<GPUAdapterInfo> requestAdapterInfo(optional sequence<DOMString> unmaskHints = []);


    #gpu;
    #options;
    #adapter;


    constructor(gpu, options = undefined) {
        return (async () => {

            this.gpu = gpu;
            this.options = options;
            this.adapter = await gpu.requestAdapter(options);
          
            
            return this;
        })();
    }

    
    get gpu() { return this.#gpu; }
    set gpu(gpu) { this.#gpu = gpu; }
    get options() { return this.#options; }
    set options(options) { this.#options = options; }
    get adapter() { return this.#adapter; }
    set adapter(adapter) { this.#adapter = adapter; }

    get features() {
        return this.adapter.features;
    }
    get limits() {
        return this.adapter.limits;
    }
    get isFallbackAdapter() {
        return this.adapter.isFallbackAdapter;
    }


    async requestDevice(descriptor) {
        return await this.adapter.requestDevice(descriptor);
    }
    async requestInfo(unmaskHints = []) {
        return await this.adapter.requestAdapterInfo(unmaskHints);
    }
};
