// A GPUDevice encapsulates a device and exposes the functionality of that device.
// GPUDevice is the top-level interface through which WebGPU interfaces are created.


import { GPUDeviceDescriptor } from "../DICTS/GPUDeviceDescriptor.js";


export class GPUDevice { //GPU device descriptor


    // [SameObject] readonly attribute GPUSupportedFeatures features;
    // [SameObject] readonly attribute GPUSupportedLimits limits;

    // [SameObject] readonly attribute GPUQueue queue;

    // undefined destroy();

    // GPUBuffer createBuffer(GPUBufferDescriptor descriptor);
    // GPUTexture createTexture(GPUTextureDescriptor descriptor);
    // GPUSampler createSampler(optional GPUSamplerDescriptor descriptor = {});
    // GPUExternalTexture importExternalTexture(GPUExternalTextureDescriptor descriptor);

    // GPUBindGroupLayout createBindGroupLayout(GPUBindGroupLayoutDescriptor descriptor);
    // GPUPipelineLayout createPipelineLayout(GPUPipelineLayoutDescriptor descriptor);
    // GPUBindGroup createBindGroup(GPUBindGroupDescriptor descriptor);

    // GPUShaderModule createShaderModule(GPUShaderModuleDescriptor descriptor);
    // GPUComputePipeline createComputePipeline(GPUComputePipelineDescriptor descriptor);
    // GPURenderPipeline createRenderPipeline(GPURenderPipelineDescriptor descriptor);
    // Promise<GPUComputePipeline> createComputePipelineAsync(GPUComputePipelineDescriptor descriptor);
    // Promise<GPURenderPipeline> createRenderPipelineAsync(GPURenderPipelineDescriptor descriptor);

    // GPUCommandEncoder createCommandEncoder(optional GPUCommandEncoderDescriptor descriptor = {});
    // GPURenderBundleEncoder createRenderBundleEncoder(GPURenderBundleEncoderDescriptor descriptor);

    // GPUQuerySet createQuerySet(GPUQuerySetDescriptor descriptor);


    static DEFAULT = {
        DESCRIPTOR: new GPUDeviceDescriptor({
            requiredFeatures: [], 
            requiredLimits: {}, 
            defaultQueue: {}, 
        }),
    };


    #adapter;
    #descriptor;

    #device;


    constructor(adapter, descriptor = undefined) {
        return (async () => {

            this.adapter = adapter;
            this.descriptor = descriptor;

            this.device = await adapter.requestDevice(descriptor);
            this.device.lost.then((info) => {
                console.error(`WebGPU device was lost: ${info.message}`);
                console.error(info);
        
                this.device = null;
        
                // Many causes for lost devices are transient, so applications should try getting a
                // new device once a previous one has been lost unless the loss was caused by the
                // application intentionally destroying the device. Note that any WebGPU resources
                // created with the previous device (buffers, textures, etc) will need to be
                // re-created with the new one.
                if (info.reason !== "destroyed") {
                    // initialize
                }
            });

            
            return this;
        })();
    }

    
    get adapter() { return this.#adapter; }
    set adapter(adapter) { this.#adapter = adapter; }
    get descriptor() { return this.#descriptor}
    set descriptor(descriptor) { this.#descriptor = descriptor; }

    get device() { return this.#device; }
    set device(device) { this.#device = device; } 

    get features() {
        return this.device.features;
    }
    get limits() {
        return this.device.limits;
    }
    get queue() {
        return this.device.queue;
    }


    // undefined destroy();
    destroy() {
        this.device.destroy();
    }

    // GPUBuffer createBuffer(GPUBufferDescriptor descriptor);
    createBuffer(descriptor = undefined) {
        return this.device.createBuffer(descriptor);
    }
    // GPUTexture createTexture(GPUTextureDescriptor descriptor);
    createTexture(descriptor = undefined) {
        return this.device.createTexture(descriptor);
    }
    // GPUSampler createSampler(optional GPUSamplerDescriptor descriptor = {});
    createSampler(descriptor = undefined) {
        return this.device.createSampler(descriptor);
    }
    // GPUExternalTexture importExternalTexture(GPUExternalTextureDescriptor descriptor);
    importExternalTexture(descriptor = undefined) {
        return this.device.importExternalTexture(descriptor);
    }

    // GPUBindGroupLayout createBindGroupLayout(GPUBindGroupLayoutDescriptor descriptor);
    createBindGroupLayout(descriptor = undefined) {
        return this.device.createBindGroupLayout(descriptor);
    }
    // GPUPipelineLayout createPipelineLayout(GPUPipelineLayoutDescriptor descriptor);
    createPipelineLayout(descriptor = undefined) {
        return this.device.createPipelineLayout(descriptor);
    }
    // GPUBindGroup createBindGroup(GPUBindGroupDescriptor descriptor);
    createBindGroup(descriptor = undefined) {
        return this.device.createBindGroup(descriptor);
    }

    // GPUShaderModule createShaderModule(GPUShaderModuleDescriptor descriptor);
    createShaderModule(descriptor = undefined) {
        return this.device.createShaderModule(descriptor);
    }
    // GPUComputePipeline createComputePipeline(GPUComputePipelineDescriptor descriptor);
    createComputePipeline(descriptor = undefined) {
        return this.device.createComputePipeline(descriptor);
    }
    // GPURenderPipeline createRenderPipeline(GPURenderPipelineDescriptor descriptor);
    createRenderPipeline(descriptor = undefined) {
        return this.device.createRenderPipeline(descriptor);
    }
    // Promise<GPUComputePipeline> createComputePipelineAsync(GPUComputePipelineDescriptor descriptor);
    // Promise<GPURenderPipeline> createRenderPipelineAsync(GPURenderPipelineDescriptor descriptor);

    // GPUCommandEncoder createCommandEncoder(optional GPUCommandEncoderDescriptor descriptor = {});
    createCommandEncoder(descriptor = undefined) {
        return this.device.createCommandEncoder(descriptor);
    }
    // GPURenderBundleEncoder createRenderBundleEncoder(GPURenderBundleEncoderDescriptor descriptor);
    createRenderBundleEncoder(descriptor = undefined) {
        return this.device.createRenderBundleEncoder(descriptor);
    }

    // GPUQuerySet createQuerySet(GPUQuerySetDescriptor descriptor);
    createQuerySet(descriptor = undefined) {
        return this.device.createQuerySet(descriptor);
    }
};