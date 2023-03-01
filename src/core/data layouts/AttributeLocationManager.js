import { ObjectBase } from "../ObjectBase.js";


export class AttributeLocationManager extends ObjectBase { // attribute setter
    
    
    static DEFAULT = {
        NAME: "",
		TYPE: "AttributeLocationManager",
    };


	#context;

    #descriptors = new Set();
    #attributeLocations = new Map();


	constructor(contextManager, args = {}) {
        super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : AttributeLocationManager.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : AttributeLocationManager.DEFAULT.TYPE,
			}
		);

        this.context = (contextManager.context !== undefined) ? contextManager.context : undefined;

        this.bufferManager = contextManager.bufferManager;
        this.textureManager = contextManager.textureManager;
        this.samplerManager = contextManager.samplerManager;
        this.bindGroupLayoutManager = contextManager.bindGroupLayoutManager;
        this.bindGroupManager = contextManager.bindGroupManager;

        this.descriptors = (args.descriptors !== undefined) ? args.descriptors : new Set();
        this.attributeLocations = (args.attributeLocations !== undefined) ? args.attributeLocations : new Map();
	}


	get context() { return this.#context; }
    set context(context) { this.#context = context; }

    get descriptors() { return this.#descriptors; }
    set descriptors(descriptors) { this.#descriptors = descriptors; }
    get attributeLocations() { return this.#attributeLocations; }
    set attributeLocations(attributeLocations) { this.#attributeLocations = attributeLocations; }


    #writeBuffer(bufferDescriptor, arrayBuffer) {
        const buffer = this.bufferManager.getBuffer(bufferDescriptor);

        this.context.queue.writeBuffer(
            buffer, 
            0, 
            arrayBuffer.buffer, 
            0, 
            bufferDescriptor.size * 4
        );
    }
    #createAttributeLocation(descriptor) {
        const attributeLocation = descriptor;
        this.bufferManager.createBuffer(descriptor.bufferDescriptor); //create buffer
        //NOOP //create vertex buffer layout

        this.attributeLocations.set(descriptor, attributeLocation);


        return attributeLocation;
    }
    createAttributeLocation(descriptor) {
        return (this.attributeLocations.has(descriptor)) ? this.attributeLocations.get(descriptor) : this.#createAttributeLocation(descriptor);
    }
    updateAttributeLocation(descriptor) {
        const attributeLocation = this.attributeLocations.get(descriptor);
        this.bufferManager.updateBuffer(attributeLocation.bufferDescriptor); //update buffer
        //NOOP //update vertex buffer layout

        // TODO update
        this.#writeBuffer(attributeLocation.bufferDescriptor, attributeLocation.arrayBuffer);
    }
    getAttributeLocation(descriptor) {
        return (this.attributeLocations.has(descriptor)) ? this.attributeLocations.get(descriptor) : this.createAttributeLocation(descriptor);
    }
    deleteAttributeLocation(descriptor) {
        // return (this.attributeLocations.has(descriptor)) ? this.attributeLocations.get(descriptor).destroy() : false;
        return this.attributeLocations.delete(descriptor);
    }


    #set() {

    }
};