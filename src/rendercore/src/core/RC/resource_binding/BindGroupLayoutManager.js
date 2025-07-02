import { ObjectBase } from "../../ObjectBase.js";


export class BindGroupLayoutManager extends ObjectBase { //RC bind group layout manager
    
    
    static DEFAULT = {
        NAME: "",
		TYPE: "BindGroupLayoutManager",
    };


	#context;

    #descriptors = new Set();
    #bindGroupLayouts = new Map();


	constructor(context, args = {}) {
        super(
			{
				...args,
                
				name: (args.name !== undefined) ? args.name : BindGroupLayoutManager.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : BindGroupLayoutManager.DEFAULT.TYPE,
			}
		);

        this.context = (context !== undefined) ? context : undefined;

        this.descriptors = (args.descriptors !== undefined) ? args.descriptors : new Set();
        this.bindGroupLayouts = (args.bindGroupLayouts !== undefined) ? args.bindGroupLayouts : new Map();
	}


	get context() { return this.#context; }
    set context(context) { this.#context = context; }

    get descriptors() { return this.#descriptors; }
    set descriptors(descriptors) { this.#descriptors = descriptors; }
    get bindGroupLayouts() { return this.#bindGroupLayouts; }
    set bindGroupLayouts(bindGroupLayouts) { this.#bindGroupLayouts = bindGroupLayouts; }


    #createBindGroupLayout(descriptor) {
        const bindGroupLayout = this.context.createBindGroupLayout(descriptor);
        this.bindGroupLayouts.set(descriptor, bindGroupLayout);

        descriptor.dirty = false;
        
        
        return bindGroupLayout;
    }
    createBindGroupLayout(descriptor) {
        if (this.bindGroupLayouts.has(descriptor)) this.#deleteBindGroupLayout(descriptor);
        const bindGroupLayout = this.#createBindGroupLayout(descriptor);


        return bindGroupLayout;
    }
    #updateBindGroupLayout(descriptor) {
        return this.createBindGroupLayout(descriptor);
    }
    getBindGroupLayout(descriptor) {
        return (this.bindGroupLayouts.has(descriptor)) ? ((descriptor.dirty) ? this.#updateBindGroupLayout(descriptor) : this.bindGroupLayouts.get(descriptor)) : this.createBindGroupLayout(descriptor);
    }
    #deleteBindGroupLayout(descriptor) {
        // this.bindGroupLayouts.get(descriptor).destroy();
        const deleted = this.bindGroupLayouts.delete(descriptor);


        return deleted;
    }
    deleteBindGroupLayout(descriptor) {
        return (this.bindGroupLayouts.has(descriptor)) ? this.#deleteBindGroupLayout(descriptor) : false;
    }
};