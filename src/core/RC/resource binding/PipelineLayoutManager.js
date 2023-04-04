import { ObjectBase } from "../../ObjectBase.js";


export class PipelineLayoutManager extends ObjectBase { //RC pipeline layout manager


    static DEFAULT = {
        NAME: "",
		TYPE: "PipelineLayoutManager",
    };


	#context;

    #descriptors = new Set();
    #pipelineLayouts = new Map();


	constructor(context, args = {}) {
        super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : PipelineLayoutManager.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : PipelineLayoutManager.DEFAULT.TYPE,
			}
		);

        this.context = (context !== undefined) ? context : undefined;

        this.descriptors = (args.descriptors !== undefined) ? args.descriptors : new Set();
        this.pipelineLayouts = (args.pipelineLayouts !== undefined) ? args.pipelineLayouts : new Map();
	}


	get context() { return this.#context; }
    set context(context) { this.#context = context; }

    get descriptors() { return this.#descriptors; }
    set descriptors(descriptors) { this.#descriptors = descriptors; }
    get pipelineLayouts() { return this.#pipelineLayouts; }
    set pipelineLayouts(pipelineLayouts) { this.#pipelineLayouts = pipelineLayouts; }


    #createPipelineLayout(descriptor) {
        const pipelineLayout = this.context.createPipelineLayout(descriptor);
        this.pipelineLayouts.set(descriptor, pipelineLayout);
        
        descriptor.dirty = false;


        return pipelineLayout;
    }
    createPipelineLayout(descriptor) {
        if (this.pipelineLayouts.has(descriptor)) this.#deletePipelineLayout(descriptor);
        const pipelineLayout = this.#createPipelineLayout(descriptor);


        return pipelineLayout;
    }
    #updatePipelineLayout(descriptor) {
        return this.createPipelineLayout(descriptor);
    }
    getPipelineLayout(descriptor) {
        return (this.pipelineLayouts.has(descriptor)) ? ((descriptor.dirty) ? this.#updatePipelineLayout(descriptor) : this.pipelineLayouts.get(descriptor)) : this.createPipelineLayout(descriptor);
    }
    #deletePipelineLayout(descriptor) {
        // this.pipelineLayouts.get(descriptor).destroy();
        const deleted = this.pipelineLayouts.delete(descriptor);


        return deleted;
    }
    deletePipelineLayout(descriptor) {
        return (this.pipelineLayouts.has(descriptor)) ? this.#deletePipelineLayout(descriptor) : false;
    }
};