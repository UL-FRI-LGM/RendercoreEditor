import { DescriptorBase } from "../DescriptorBase.js";
import { BufferUsage } from "./BufferUsage.js";


export class BufferDescriptor extends DescriptorBase { //RC buffer descriptor (WebGL / WebGPU)


    static DEFAULT = {
        NAME: "",
		TYPE: "BufferDescriptor",

        LABEL: "",
        DIRTY_CACHE: new Map(),

        SIZE: 0,
        USAGE: BufferUsage.VERTEX | BufferUsage.COPY_DST,
        MAPPED_AT_CREATION: false,
    };


    #size;
    #usage;
    #mappedAtCreation;


    constructor(args = {}) {
        super(
			{
				...args,
				
                name: (args.name !== undefined) ? args.name : BufferDescriptor.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : BufferDescriptor.DEFAULT.TYPE,
                
                label: (args.label !== undefined) ? args.label : BufferDescriptor.DEFAULT.LABEL,
                dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : new Map(BufferDescriptor.DEFAULT.DIRTY_CACHE), //copy
            }
		);

        this.size = (args.size !== undefined) ? args.size : BufferDescriptor.DEFAULT.SIZE;
        this.usage = (args.usage !== undefined) ? args.usage : BufferDescriptor.DEFAULT.USAGE;
        this.mappedAtCreation = args.mappedAtCreation !== undefined ? args.mappedAtCreation : BufferDescriptor.DEFAULT.MAPPED_AT_CREATION;
    }

    
    get size() { return this.#size; }
    set size(size) { this.#size = size; }
    get usage() { return this.#usage; }
    set usage(usage) { this.#usage = usage; }
    get mappedAtCreation() { return this.#mappedAtCreation; }
    set mappedAtCreation(mappedAtCreation) { this.#mappedAtCreation = mappedAtCreation; }
};