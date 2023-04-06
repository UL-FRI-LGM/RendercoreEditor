import { DescriptorBase } from "../DescriptorBase.js";


export class BindGroupDescriptor extends DescriptorBase {


    static DEFAULT = {
        LAYOUT: undefined,
        ENTRIES: undefined,
    };


    #layout;
    #entries;


    constructor(args = {}) {
        super(args);

        this.layout = (args.layout !== undefined) ? args.layout : BindGroupDescriptor.DEFAULT.LAYOUT;
        this.entries = (args.entries !== undefined) ? args.entries : BindGroupDescriptor.DEFAULT.ENTRIES;
    }


    get layout() { return this.#layout; }
    set layout(layout) { this.#layout = layout; }
    get entries() { return this.#entries; }
    set entries(entries) { this.#entries = entries; }
};