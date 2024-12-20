export class BufferBindingLayout {


    #type;
    #hasDynamicOffset;
    #minBindingSize


    constructor(args = {}) {
        this.type = (args.type !== undefined) ? args.type : undefined;
        this.hasDynamicOffset = (args.hasDynamicOffset !== undefined) ? args.hasDynamicOffset : undefined;
        this.minBindingSize = (args.minBindingSize !== undefined) ? args.minBindingSize : undefined;
    }


    get type() { return this.#type; }
    set type(type) { this.#type = type; }
    get hasDynamicOffset() { return this.#hasDynamicOffset }
    set hasDynamicOffset(hasDynamicOffset) { this.#hasDynamicOffset = hasDynamicOffset; }
    get minBindingSize() { return this.#minBindingSize }
    set minBindingSize(minBindingSize) { this.#minBindingSize = minBindingSize; }
};
