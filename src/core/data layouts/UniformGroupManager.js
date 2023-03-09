import { ObjectBase } from "../ObjectBase.js";
import { BufferDescriptor } from "../RC/buffers/BufferDescriptor.js";
import { SamplerDescriptor } from "../RC/samplers/SamplerDescriptor.js";
import { TextureDescriptor } from "../RC/textures/TextureDescriptor.js";


export class UniformGroupManager extends ObjectBase {
    
    
    static DEFAULT = {
        NAME: "",
		TYPE: "UniformGroupManager",
    };


	#context;

    #descriptors = new Set();
    #uniformGroups = new Map();


	constructor(contextManager, args = {}) {
        super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : UniformGroupManager.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : UniformGroupManager.DEFAULT.TYPE,
			}
		);

        this.context = (contextManager.context !== undefined) ? contextManager.context : undefined;

        this.bufferManager = contextManager.bufferManager;
        this.textureManager = contextManager.textureManager;
        this.samplerManager = contextManager.samplerManager;
        this.bindGroupLayoutManager = contextManager.bindGroupLayoutManager;
        this.bindGroupManager = contextManager.bindGroupManager;

        this.descriptors = (args.descriptors !== undefined) ? args.descriptors : new Set();
        this.uniformGroups = (args.uniformGroups !== undefined) ? args.uniformGroups : new Map();
	}


	get context() { return this.#context; }
    set context(context) { this.#context = context; }

    get descriptors() { return this.#descriptors; }
    set descriptors(descriptors) { this.#descriptors = descriptors; }
    get uniformGroups() { return this.#uniformGroups; }
    set uniformGroups(uniformGroups) { this.#uniformGroups = uniformGroups; }


    #createUniformGroup(descriptor) {
        const uniformGroup = descriptor;

        const bindingDescriptors = uniformGroup.bindingDescriptors;
		const bindGroupLayoutDescriptor = uniformGroup.bindGroupLayoutDescriptor;
		const bindGroupDescriptor = uniformGroup.bindGroupDescriptor;

        //TODO change this with conversion from RC descriptor to WebGPU descriptor
        bindGroupDescriptor.layout = this.bindGroupLayoutManager.getBindGroupLayout(bindGroupLayoutDescriptor);
        for (let bd = 0; bd < bindingDescriptors.length; bd++) {
            const bindingDescriptor = bindingDescriptors[bd];
            const resourceDescriptor = bindingDescriptor.resourceDescriptor;

			switch (resourceDescriptor.type) {
				case BufferDescriptor.DEFAULT.TYPE:
					bindGroupDescriptor.entries[bd].resource.buffer = this.bufferManager.getBuffer(resourceDescriptor);
					break;
				case TextureDescriptor.DEFAULT.TYPE:
					bindGroupDescriptor.entries[bd].resource = this.textureManager.getTexture(resourceDescriptor).createView();
					break;
				case SamplerDescriptor.DEFAULT.TYPE:
					bindGroupDescriptor.entries[bd].resource = this.samplerManager.getSampler(resourceDescriptor);
					break;
				default:
				  	console.warn("UNKNOWN TYPE");
			}
		}


        this.uniformGroups.set(descriptor, uniformGroup);


        return uniformGroup;
    }
    createUniformGroup(descriptor) {
        return (this.uniformGroups.has(descriptor)) ? this.uniformGroups.get(descriptor) : this.#createUniformGroup(descriptor);
    }
    #updateBuffer(bufferDescriptor, dirtyCacheEntry) {
        const buffer = this.bufferManager.getBuffer(bufferDescriptor);

        this.context.queue.writeBuffer(
            buffer,
            dirtyCacheEntry.bufferOffset,
            dirtyCacheEntry.data,
            dirtyCacheEntry.dataOffset,
            dirtyCacheEntry.size
        );
    }
    #updateTexture(textureDescriptor, dirtyCacheEntry) {    
        const texture = this.textureManager.getTexture(textureDescriptor);

        this.context.queue.writeTexture(
			dirtyCacheEntry.destination(texture), 
			dirtyCacheEntry.data, 
			dirtyCacheEntry.dataLayout(), 
			dirtyCacheEntry.size()
        );
    }
    #updateBinding(bindingDescriptor, desc) {
        const binding = bindingDescriptor.binding;
        const arrayBuffer = bindingDescriptor.arrayBuffer;
        const resourceDescriptor = bindingDescriptor.resourceDescriptor;

        switch (resourceDescriptor.type) {
            case BufferDescriptor.DEFAULT.TYPE:
                this.#updateBuffer(resourceDescriptor, desc);
                break;
            case TextureDescriptor.DEFAULT.TYPE:
                this.#updateTexture(resourceDescriptor, desc);
                break;
            case SamplerDescriptor.DEFAULT.TYPE:
                // this.#updateSampler();
                break;
            default:
                console.warn("UNKNOWN TYPE: [" + resourceDescriptor.type + "]");
        }
    }
    updateUniformGroup(descriptor) {
        const uniformGroup = this.uniformGroups.get(descriptor);

        const bindingDescriptors = uniformGroup.bindingDescriptors;
        const bindGroupLayoutDescriptor = uniformGroup.bindGroupLayoutDescriptor;
        const bindGroupDescriptor = uniformGroup.bindGroupDescriptor;

        //update children
        //TODO

        //update self
        for (const [name, desc] of uniformGroup.dirtyCache) {
            const bindingDescriptor = bindingDescriptors[desc.binding];
            this.#updateBinding(bindingDescriptor, desc);
        }
        uniformGroup.dirtyCache.clear();
    }
    getUniformGroup(descriptor) {
        return (this.uniformGroups.has(descriptor)) ? this.uniformGroups.get(descriptor) : this.createUniformGroup(descriptor);
    }
    deleteUniformGroup(descriptor) {
        // return (this.uniformGroups.has(descriptor)) ? this.uniformGroups.get(descriptor).destroy() : false;
        return this.uniformGroups.delete(descriptor);
    }


    #set() {

    }
};