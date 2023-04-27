import { ObjectBase } from "../ObjectBase.js";


export class AttributeLocationManager extends ObjectBase { //RC attribute location manager (attribute setter)
    
    
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


    #createAttributeLocation(descriptor) {
        const attributeLocation = descriptor;
        
        this.bufferManager.getBuffer(descriptor.bufferDescriptor);

        this.attributeLocations.set(descriptor, attributeLocation);

        descriptor.dirty = false;


        return attributeLocation;
    }
    createAttributeLocation(descriptor) {
        if (this.attributeLocations.has(descriptor)) this.#deleteAttributeLocation(descriptor);
        const attributeLocation = this.#createAttributeLocation(descriptor);


        return attributeLocation;    }
    #updateAttributeLocation(descriptor) {
        return this.createAttributeLocation(descriptor);
    }
    getAttributeLocation(descriptor) {
        return (this.attributeLocations.has(descriptor)) ? ((descriptor.dirty) ? this.#updateAttributeLocation(descriptor) : this.attributeLocations.get(descriptor)) : this.createAttributeLocation(descriptor);
    }
    #deleteAttributeLocation(descriptor) {
        // this.attributeLocations.get(descriptor).delete();
        const delted = this.attributeLocations.delete(descriptor);


        return delted;
    }
    deleteAttributeLocation(descriptor) {
        return (this.attributeLocations.has(descriptor)) ? this.#deleteAttributeLocation(descriptor) : false;
    }

    #setBufferLoactionValue(bufferDescriptor, setInstruction) {
        const buffer_dst = this.bufferManager.getBuffer(bufferDescriptor);
        const offset_dst = setInstruction.destination.layout.offset;
        const arrayBuffer_src = setInstruction.source.arrayBuffer;
        const offset_src = setInstruction.source.layout.offset;
        const size = setInstruction.size;

        const byteSize_dst = 4;
        const byteSize_src = arrayBuffer_src.byteLength / arrayBuffer_src.length;

        this.context.queue.writeBuffer(
            buffer_dst,
            offset_dst * byteSize_dst,
            arrayBuffer_src.buffer,
            offset_src * byteSize_src,
            size * byteSize_src
        );
    }
    #setResourceLocationValue(resourceLocation, setInstruction) {
        const resourceDescriptor = resourceLocation.bufferDescriptor;

        this.#setBufferLoactionValue(resourceDescriptor, setInstruction);
    }
    setAttributeLocationValue(descriptor) {
        const attributeLocation = this.attributeLocations.get(descriptor);
        // const bufferDescriptor = attributeLocation.bufferDescriptor;
        // const vertexBufferLayoutDescriptor = attributeLocation.vertexBufferLayoutDescriptor;

        if (attributeLocation.dirtyCache.size > 0) {
            attributeLocation.dirtyCache.forEach((setInstruction, name) => {
                this.#setResourceLocationValue(attributeLocation, setInstruction);
            });
            attributeLocation.dirtyCache.clear();
        }
    }
};