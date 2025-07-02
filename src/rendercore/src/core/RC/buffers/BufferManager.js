import { ObjectBase } from "../../ObjectBase.js";


export class BufferManager extends ObjectBase { //RC buffer manager
    
    
    static DEFAULT = {
        NAME: "",
		TYPE: "BufferManager",
    };


	#context;

    #descriptors = new Set();
    #buffers = new Map();


	constructor(context, args = {}) {
        super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : BufferManager.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : BufferManager.DEFAULT.TYPE,
			}
		);

        this.context = (context !== undefined) ? context : undefined;

        this.descriptors = (args.descriptors !== undefined) ? args.descriptors : new Set();
        this.buffers = (args.buffers !== undefined) ? args.buffers : new Map();
	}


	get context() { return this.#context; }
    set context(context) { this.#context = context; }

    get descriptors() { return this.#descriptors; }
    set descriptors(descriptors) { this.#descriptors = descriptors; }
    get buffers() { return this.#buffers; }
    set buffers(buffers) { this.#buffers = buffers; }


    #createBuffer(descriptor) {
        const buffer = this.context.createBuffer(
            {
				label: descriptor.label,
				size: descriptor.size * 4,
				usage: descriptor.usage,
				mappedAtCreation: descriptor.mappedAtCreation,
			}
        );
        this.buffers.set(descriptor, buffer);
        
        descriptor.dirty = false;


        return buffer;
    }
    createBuffer(descriptor) {
        if (this.buffers.has(descriptor)) this.#deleteBuffer(descriptor);
        const buffer = this.#createBuffer(descriptor);


        return buffer;
    }
    #updateBuffer(descriptor) {
        return this.createBuffer(descriptor);
    }
    getBuffer(descriptor) {
        return (this.buffers.has(descriptor)) ? ((descriptor.dirty) ? this.#updateBuffer(descriptor) : this.buffers.get(descriptor)) : this.createBuffer(descriptor);
    }
    #deleteBuffer(descriptor) {
        this.buffers.get(descriptor).destroy();
        const deleted = this.buffers.delete(descriptor);


        return deleted;
    }
    deleteBuffer(descriptor) {
        return (this.buffers.has(descriptor)) ? this.#deleteBuffer(descriptor) : false;
    }
};