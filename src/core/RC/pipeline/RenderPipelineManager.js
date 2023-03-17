import { ObjectBase } from "../../ObjectBase.js";


export class RenderPipelineManager extends ObjectBase { //RC render pipeline manager
    
    
    static DEFAULT = {
        NAME: "",
		TYPE: "RenderPipelineManager",
    };


	#context;

    #descriptors = new Set();
    #renderPipelines = new Map();


	constructor(context, args = {}) {
        super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : RenderPipelineManager.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : RenderPipelineManager.DEFAULT.TYPE,
			}
		);

        this.context = (context !== undefined) ? context : undefined;

        this.descriptors = (args.descriptors !== undefined) ? args.descriptors : new Set();
        this.renderPipelines = (args.renderPipelines !== undefined) ? args.renderPipelines : new Map();
	}


	get context() { return this.#context; }
    set context(context) { this.#context = context; }

    get descriptors() { return this.#descriptors; }
    set descriptors(descriptors) { this.#descriptors = descriptors; }
    get renderPipelines() { return this.#renderPipelines; }
    set renderPipelines(renderPipelines) { this.#renderPipelines = renderPipelines; }


    #createRenderPipeline(descriptor) {
        const renderPipeline = this.context.createRenderPipeline(descriptor);
        this.renderPipelines.set(descriptor, renderPipeline);

        descriptor.dirty = false;


        return renderPipeline;
    }
    createRenderPipeline(descriptor) {
        if (this.renderPipelines.has(descriptor)) this.#deleteRenderPipeline(descriptor);
        const renderPipeline = this.#createRenderPipeline(descriptor);


        return renderPipeline;
    }
    #updateRenderPipeline(descriptor) {
        return this.createRenderPipeline(descriptor);
    }
    getRenderPipeline(descriptor) {
        return (this.renderPipelines.has(descriptor)) ? ((descriptor.dirty) ? this.#updateRenderPipeline(descriptor) : this.renderPipelines.get(descriptor)) : this.createRenderPipeline(descriptor);
    }
    #deleteRenderPipeline(descriptor) {
        // this.renderPipelines.get(descriptor).destroy();
        const deleted = this.renderPipelines.delete(descriptor);


        return deleted;
    }
    deleteRenderPipeline(descriptor) {
        return (this.renderPipelines.has(descriptor)) ? this.#deleteRenderPipeline(descriptor) : false;
    }
};