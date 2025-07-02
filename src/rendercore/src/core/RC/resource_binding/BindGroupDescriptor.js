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


    clone() {
        return new BindGroupDescriptor(
            {
                name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				label: (this.label === Object(this.label)) ? this.label.clone() : this.label,
				dirtyCache: (this.dirtyCache === Object(this.dirtyCache)) ? this.dirtyCache.clone() : this.dirtyCache,

                layout: (this.layout === Object(this.layout)) ? this.layout.clone() : this.layout,
                entries: (this.entries === Object(this.entries)) ? this.entries.clone() : this.entries,
            }
        );
    }
};