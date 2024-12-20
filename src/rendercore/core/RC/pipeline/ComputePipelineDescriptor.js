import { PipelineDescriptor } from "./PipelineDescriptor.js";


export class ComputePipelineDescriptor extends PipelineDescriptor {


    static DEFAULT = {
        NAME: "",
		TYPE: "ComputePipelineDescriptor",

        LABEL: "",
        DIRTY_CACHE: new Map(),

        LAYOUT: null,

        COMPUTE: undefined,
    };


    #compute;


    constructor(args = {}) {
        super(
            {
                ...args,

                name: (args.name !== undefined) ? args.name : ComputePipelineDescriptor.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : ComputePipelineDescriptor.DEFAULT.TYPE,

                label: (args.label !== undefined) ? args.label : ComputePipelineDescriptor.DEFAULT.LABEL,
                dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : new Map(ComputePipelineDescriptor.DEFAULT.DIRTY_CACHE), //copy

                layout: (args.layout !== undefined) ? args.layout : ComputePipelineDescriptor.DEFAULT.LAYOUT,
            }
        );

        this.compute = (args.compute !== undefined) ? args.compute : ComputePipelineDescriptor.DEFAULT.COMPUTE;
    }


    get compute() { return this.#compute; }
    set compute(compute) { this.#compute = compute; }
};