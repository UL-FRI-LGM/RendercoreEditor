// A GPUAdapter encapsulates an adapter, and describes its capabilities (features and limits).


import { GPURequestAdapterOptions } from "../DICTS/GPURequestAdapterOptions.js";
import { GPUPowerPreference } from "../ENUM/GPUPowerPreference.js";


export class GPUAdapter { //GPU adapter descriptor


    // [SameObject] readonly attribute GPUSupportedFeatures features;
    // [SameObject] readonly attribute GPUSupportedLimits limits;
    // readonly attribute boolean isFallbackAdapter;

    // Promise<GPUDevice> requestDevice(optional GPUDeviceDescriptor descriptor = {});
    // Promise<GPUAdapterInfo> requestAdapterInfo(optional sequence<DOMString> unmaskHints = []);


    static DEFAULT = {
        DESCRIPTOR: new GPURequestAdapterOptions(
            {
                powerPreference: GPUPowerPreference.HIGH_PERFORMANCE, 
                forceFallbackAdapter: false, 
            }
        ),
    };
    static FALLBACK = {
        DESCRIPTOR: new GPURequestAdapterOptions(
            {
                powerPreference: GPUPowerPreference.HIGH_PERFORMANCE, 
                forceFallbackAdapter: true, 
            }
        ),
    };


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
        return this.adapter.requestDevice(descriptor);
    }
    async requestInfo(unmaskHints = []) {
        return this.adapter.requestAdapterInfo(unmaskHints);
    }
};