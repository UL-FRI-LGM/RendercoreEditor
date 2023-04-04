import { DescriptorBase } from "../DescriptorBase.js";


export class PipelineLayoutDescriptor extends DescriptorBase {
    #bindGroupLayouts;


    constructor(args = {}) {
        super(args);

        this.bindGroupLayouts = args.bindGroupLayouts !== undefined ? args.bindGroupLayouts : undefined;
    }


    get bindGroupLayouts() { return this.#bindGroupLayouts; }
    set bindGroupLayouts(bindGroupLayouts) { this.#bindGroupLayouts = bindGroupLayouts; }
};