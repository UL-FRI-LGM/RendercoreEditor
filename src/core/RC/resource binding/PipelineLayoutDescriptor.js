import { DescriptorBase } from "../DescriptorBase.js";


export class PipelineLayoutDescriptor extends DescriptorBase {


    static DEFAULT = {
        BIND_GROUP_LAYOUTS: undefined,
    };


    #bindGroupLayouts;


    constructor(args = {}) {
        super(args);

        this.bindGroupLayouts = args.bindGroupLayouts !== undefined ? args.bindGroupLayouts : PipelineLayoutDescriptor.DEFAULT.BIND_GROUP_LAYOUTS;
    }


    get bindGroupLayouts() { return this.#bindGroupLayouts; }
    set bindGroupLayouts(bindGroupLayouts) { this.#bindGroupLayouts = bindGroupLayouts; }
};