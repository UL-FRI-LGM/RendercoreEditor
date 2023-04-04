import { GPUObjectDescriptorBase } from "../GPUObjectDescriptorBase.js";


export class PipelineLayoutDescriptor extends GPUObjectDescriptorBase {
    #bindGroupLayouts;


    constructor(args = {}) {
        super(args);

        this.bindGroupLayouts = args.bindGroupLayouts !== undefined ? args.bindGroupLayouts : undefined;
    }


    get bindGroupLayouts() { return this.#bindGroupLayouts; }
    set bindGroupLayouts(bindGroupLayouts) { this.#bindGroupLayouts = bindGroupLayouts; }
};