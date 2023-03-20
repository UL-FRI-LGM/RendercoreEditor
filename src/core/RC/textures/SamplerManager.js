import { ObjectBase } from "../../ObjectBase.js";


export class SamplerManager extends ObjectBase { //RC sampler manager
    
    
    static DEFAULT = {
        NAME: "",
		TYPE: "SamplerManager",
    };


	#context;

    #descriptors = new Set();
    #samplers = new Map();


	constructor(context, args = {}) {
        super(
			{
				...args,
                
				name: (args.name !== undefined) ? args.name : SamplerManager.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : SamplerManager.DEFAULT.TYPE,
			}
		);

        this.context = (context !== undefined) ? context : undefined;

        this.descriptors = (args.descriptors !== undefined) ? args.descriptors : new Set();
        this.samplers = (args.samplers !== undefined) ? args.samplers : new Map();
	}


	get context() { return this.#context; }
    set context(context) { this.#context = context; }

    get descriptors() { return this.#descriptors; }
    set descriptors(descriptors) { this.#descriptors = descriptors; }
    get samplers() { return this.#samplers; }
    set samplers(samplers) { this.#samplers = samplers; }


    #createSampler(descriptor) {
        const sampler = this.context.createSampler(descriptor);
        this.samplers.set(descriptor, sampler);

        descriptor.dirty = false;


        return sampler;
    }
    createSampler(descriptor) {
        if (this.samplers.has(descriptor)) this.#deleteSampler(descriptor);
        const sampler = this.#createSampler(descriptor);


        return sampler;
    }
    #updateSampler(descriptor) {
        return this.createSampler(descriptor);
    }
    getSampler(descriptor) {
        return (this.samplers.has(descriptor)) ? ((descriptor.dirty) ? this.#updateSampler(descriptor) : this.samplers.get(descriptor)) : this.createSampler(descriptor);

    }
    #deleteSampler(descriptor) {
        this.samplers.get(descriptor).destroy();
        const deleted = this.samplers.delete(descriptor);


        return deleted;
    }
    deleteSampler(descriptor) {
        return (this.samplers.has(descriptor)) ? this.#deleteSampler(descriptor) : false;
    }
};