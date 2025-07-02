import { ObjectBase } from "../../ObjectBase.js";


export class ComputePipelineManager extends ObjectBase { //RC compute pipeline manager
    
    
    static DEFAULT = {
        NAME: "",
		TYPE: "ComputePipelineManager",
    };


	#context;

    #descriptors = new Set();
    #computePipelines = new Map();


	constructor(contextManager, args = {}) {
        super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : ComputePipelineManager.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : ComputePipelineManager.DEFAULT.TYPE,
			}
		);

        this.context = (contextManager.context !== undefined) ? contextManager.context : undefined;

        this.descriptors = (args.descriptors !== undefined) ? args.descriptors : new Set();
        this.computePipelines = (args.computePipelines !== undefined) ? args.computePipelines : new Map();
	}


	get context() { return this.#context; }
    set context(context) { this.#context = context; }

    get descriptors() { return this.#descriptors; }
    set descriptors(descriptors) { this.#descriptors = descriptors; }
    get computePipelines() { return this.#computePipelines; }
    set computePipelines(computePipelines) { this.#computePipelines = computePipelines; }


    #createComputePipeline(descriptor) {
        const computePipeline = this.context.createComputePipeline(descriptor);
        this.computePipelines.set(descriptor, computePipeline);

        descriptor.dirty = false;


        return computePipeline;
    }
    createComputePipeline(descriptor) {
        if (this.computePipelines.has(descriptor)) this.#deleteComputePipeline(descriptor);
        const computePipeline = this.#createComputePipeline(descriptor);


        return computePipeline;
    }
    #updateComputePipeline(descriptor) {
        return this.createComputePipeline(descriptor);
    }
    getComputePipeline(descriptor) {
        return (this.computePipelines.has(descriptor)) ? ((descriptor.dirty) ? this.#updateComputePipeline(descriptor) : this.computePipelines.get(descriptor)) : this.createComputePipeline(descriptor);
    }
    #deleteComputePipeline(descriptor) {
        // this.computePipelines.get(descriptor).destroy();
        const deleted = this.computePipelines.delete(descriptor);


        return deleted;
    }
    deleteComputePipeline(descriptor) {
        return (this.computePipelines.has(descriptor)) ? this.#deleteComputePipeline(descriptor) : false;
    }
};