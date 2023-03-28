import { ObjectBase } from "../../ObjectBase.js";


export class BindGroupManager extends ObjectBase { //RC bind group manager
    static DEFAULT = {
        NAME: "",
		TYPE: "BindGroupManager",
    };


	#context;

    #descriptors = new Set();
    #bindGroups = new Map();


	constructor(context, args = {}) {
        super(
			{
				...args,
                
				name: (args.name !== undefined) ? args.name : BindGroupManager.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : BindGroupManager.DEFAULT.TYPE,
			}
		);

        this.context = (context !== undefined) ? context : undefined;

        this.descriptors = (args.descriptors !== undefined) ? args.descriptors : new Set();
        this.bindGroups = (args.bindGroups !== undefined) ? args.bindGroups : new Map();
	}


	get context() { return this.#context; }
    set context(context) { this.#context = context; }

    get descriptors() { return this.#descriptors; }
    set descriptors(descriptors) { this.#descriptors = descriptors; }
    get bindGroups() { return this.#bindGroups; }
    set bindGroups(bindGroups) { this.#bindGroups = bindGroups; }


    #createBindGroup(descriptor) {
        const bindGroup = this.context.createBindGroup(descriptor);
        this.bindGroups.set(descriptor, bindGroup);

        descriptor.dirty = false;

        
        return bindGroup;
    }
    createBindGroup(descriptor) {
        if (this.bindGroups.has(descriptor)) this.#deleteBindGroup(descriptor);
        const bindGroup = this.#createBindGroup(descriptor);


        return bindGroup;
    }
    #updateBindGroup(descriptor) {
        return this.createBindGroup(descriptor);
    }
    getBindGroup(descriptor) {
        return (this.bindGroups.has(descriptor)) ? ((descriptor.dirty) ? this.#updateBindGroup(descriptor) : this.bindGroups.get(descriptor)) : this.createBindGroup(descriptor);
    }
    #deleteBindGroup(descriptor) {
        // this.bindGroups.get(descriptor).destroy();
        const deleted = this.bindGroups.delete(descriptor);


        return deleted;
    }
    deleteBindGroup(descriptor) {
        return (this.bindGroups.has(descriptor)) ? this.#deleteBindGroup(descriptor) : false;
    }
};