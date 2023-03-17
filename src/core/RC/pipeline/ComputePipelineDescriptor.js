import { PipelineDescriptor } from "./PipelineDescriptor.js";


export class ComputePipelineDescriptor extends PipelineDescriptor {


    static DEFAULT = {
        NAME: "",
		TYPE: "ComputePipelineDescriptor",

        COMPUTE: undefined,
    };


    #compute;


    constructor(args = {}) {
        super(args);

        this.compute = (args.compute !== undefined) ? args.compute : ComputePipelineDescriptor.DEFAULT.COMPUTE;
    }


    get compute() { return this.#compute; }
    set compute(compute) { this.#compute = compute; }
};