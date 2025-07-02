import { ObjectBase } from "../../ObjectBase.js";
import { BindGroupLayoutManager } from "./BindGroupLayoutManager.js";


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


        this.bindGroupLayoutManager = new BindGroupLayoutManager(this.context, {});
	}


	get context() { return this.#context; }
    set context(context) { this.#context = context; }

    get descriptors() { return this.#descriptors; }
    set descriptors(descriptors) { this.#descriptors = descriptors; }
    get pipelineLayouts() { return this.#pipelineLayouts; }
    set pipelineLayouts(pipelineLayouts) { this.#pipelineLayouts = pipelineLayouts; }


    #createPipelineLayout(descriptor, args = {}) {
        const pipelineLayoutDescriptor = descriptor;

        pipelineLayoutDescriptor.bindGroupLayouts = args.bgl_descriptors.map((x) => { return this.bindGroupLayoutManager.getBindGroupLayout(x); });

        const pipelineLayout = this.context.createPipelineLayout(descriptor);
        this.pipelineLayouts.set(descriptor, pipelineLayout);
        
        descriptor.dirty = false;


        return pipelineLayout;
    }
    createPipelineLayout(descriptor, args = {}) {
        if (this.pipelineLayouts.has(descriptor)) this.#deletePipelineLayout(descriptor);
        const pipelineLayout = this.#createPipelineLayout(descriptor, args);


        return pipelineLayout;
    }
    #updatePipelineLayout(descriptor, args = {}) {
        return this.createPipelineLayout(descriptor, args);
    }
    getPipelineLayout(descriptor, args = {}) {
        return (this.pipelineLayouts.has(descriptor)) ? ((descriptor.dirty) ? this.#updatePipelineLayout(descriptor, args) : this.pipelineLayouts.get(descriptor)) : this.createPipelineLayout(descriptor, args);
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