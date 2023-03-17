import { ObjectBase } from "./ObjectBase.js";


export class PipelineManager extends ObjectBase { //RC pipeline manager
    
    
    static DEFAULT = {
        NAME: "",
		TYPE: "PipelineManager",
    };


	#context;

    #descriptors = new Set();
    #pipelines = new Map();


	constructor(context, args = {}) {
        super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : PipelineManager.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : PipelineManager.DEFAULT.TYPE,
			}
		);

        this.context = (context !== undefined) ? context : undefined;

        this.descriptors = (args.descriptors !== undefined) ? args.descriptors : new Set();
        this.pipelines = (args.pipelines !== undefined) ? args.pipelines : new Map();
	}


	get context() { return this.#context; }
    set context(context) { this.#context = context; }

    get descriptors() { return this.#descriptors; }
    set descriptors(descriptors) { this.#descriptors = descriptors; }
    get pipelines() { return this.#pipelines; }
    set pipelines(pipelines) { this.#pipelines = pipelines; }


    #createPipeline(descriptor, createPipeline) {
        const pipeline = createPipeline(descriptor);
        this.pipelines.set(descriptor, pipeline);

        descriptor.dirty = false;


        return pipeline;
    }
    createPipeline(descriptor, createPipeline) {
        if (this.pipelines.has(descriptor)) this.#deletePipeline(descriptor);
        const pipeline = this.#createPipeline(descriptor, createPipeline);


        return pipeline;
    }
    #updatePipeline(descriptor, createPipeline) {
        return this.createPipeline(descriptor, createPipeline);
    }
    getPipeline(descriptor) {
        return (this.pipelines.has(descriptor)) ? ((descriptor.dirty) ? this.#updatePipeline(descriptor, createPipeline) : this.pipelines.get(descriptor)) : this.createPipeline(descriptor, createPipeline);
    }
    #deletePipeline(descriptor) {
        // this.pipelines.get(descriptor).destroy();
        const deleted = this.pipelines.delete(descriptor);


        return deleted;
    }
    deletePipeline(descriptor) {
        return (this.pipelines.has(descriptor)) ? this.#deletePipeline(descriptor) : false;
    }
};