import { ObjectBase } from "../../ObjectBase.js";


export class MultisampleStateManager extends ObjectBase { //RC multisample state manager
    
    
    static DEFAULT = {
        NAME: "",
		TYPE: "MultisampleStateManager",
    };


	#context;

    #descriptors = new Set();
    #multisampleStates = new Map();


	constructor(context, args = {}) {
        super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : MultisampleStateManager.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : MultisampleStateManager.DEFAULT.TYPE,
			}
		);

        this.context = (context !== undefined) ? context : undefined;

        this.descriptors = (args.descriptors !== undefined) ? args.descriptors : new Set();
        this.multisampleStates = (args.multisampleStates !== undefined) ? args.multisampleStates : new Map();
	}


	get context() { return this.#context; }
    set context(context) { this.#context = context; }

    get descriptors() { return this.#descriptors; }
    set descriptors(descriptors) { this.#descriptors = descriptors; }
    get multisampleStates() { return this.#multisampleStates; }
    set multisampleStates(multisampleStates) { this.#multisampleStates = multisampleStates; }


    #createMultisampleState(descriptor, args = {}) {
        // const multisampleState = createMultisampleState(descriptor);
        const multisampleState = descriptor;

        multisampleState.count = 1;
        multisampleState.mask = 0xFFFFFFFF;
        multisampleState.alphaToCoverageEnabled = false;

        this.multisampleStates.set(descriptor, multisampleState);

        descriptor.dirty = false;


        return multisampleState;
    }
    createMultisampleState(descriptor, args = {}) {
        if (this.multisampleStates.has(descriptor)) this.#deleteMultisampleState(descriptor);
        const multisampleState = this.#createMultisampleState(descriptor, args);


        return multisampleState;
    }
    #updateMultisampleState(descriptor, args = {}) {
        return this.createMultisampleState(descriptor, args);
    }
    getMultisampleState(descriptor, args = {}) {
        return (this.multisampleStates.has(descriptor)) ? ((descriptor.dirty) ? this.#updateMultisampleState(descriptor, args) : this.multisampleStates.get(descriptor)) : this.createMultisampleState(descriptor, args);
    }
    #deleteMultisampleState(descriptor) {
        // this.multisampleStates.get(descriptor).destroy();
        const deleted = this.multisampleStates.delete(descriptor);


        return deleted;
    }
    deleteMultisampleState(descriptor) {
        return (this.multisampleStates.has(descriptor)) ? this.#deleteMultisampleState(descriptor) : false;
    }
};