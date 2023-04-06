import { DescriptorBase } from "../DescriptorBase.js";


export class BindGroupLayoutDescriptor extends DescriptorBase {


    static DEFAULT = {
        ENTRIES: undefined,
    };


    #entries;
    

    constructor(args = {}) {
        super(args);

        this.entries = (args.entries !== undefined) ? args.entries : BindGroupLayoutDescriptor.DEFAULT.ENTRIES;
    }


    get entries() { return this.#entries; }
    set entries(entries) { this.#entries = entries; }
};