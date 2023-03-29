import { ObjectBase } from "../ObjectBase.js";
import { GPUExtent3D } from "../DICTS/GPUExtent3D.js";
import { GPUImageCopyTexture } from "../DICTS/GPUImageCopyTexture.js";
import { GPUImageDataLayout } from "../DICTS/GPUImageDataLayout.js";
import { GPUOrigin3D } from "../DICTS/GPUOrigin3D.js";
import { BufferDescriptor } from "../RC/buffers/BufferDescriptor.js";
import { SamplerDescriptor } from "../RC/samplers/SamplerDescriptor.js";
import { TextureDescriptor } from "../RC/textures/TextureDescriptor.js";
import { ResourceBinding } from "./ResourceBinding.js";


export class UniformGroupManager extends ObjectBase { //RC uniform group manager (uniform setter)
    
    
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

        const resourceBindings = uniformGroup.resourceBindings;
        const resourceBindingsExternal = uniformGroup.resourceBindingsExternal;
		const bindGroupLayoutDescriptor = uniformGroup.bindGroupLayoutDescriptor;
		const bindGroupDescriptor = uniformGroup.bindGroupDescriptor;

        const bindGroupLayoutEntries = new Map();
        const bindGroupEntries = new Map();

        for (const [number, resourceBinding] of resourceBindings) {
            const resourceDescriptor = resourceBinding.resourceDescriptor;
            const bindGroupLayoutEntry = resourceBinding.bindGroupLayoutEntry;
            const bindGroupEntry = resourceBinding.bindGroupEntry;

			switch (resourceDescriptor.type) {
				case BufferDescriptor.DEFAULT.TYPE:
					bindGroupEntry.resource.buffer = this.bufferManager.getBuffer(resourceDescriptor);
					break;
				case TextureDescriptor.DEFAULT.TYPE:
					bindGroupEntry.resource = this.textureManager.getTexture(resourceDescriptor).createView();
					break;
				case SamplerDescriptor.DEFAULT.TYPE:
					bindGroupEntry.resource = this.samplerManager.getSampler(resourceDescriptor);
					break;
				default:
                    throw new Error(`Unknown resource type: [${resourceDescriptor.type}]!`);
			}

            bindGroupLayoutEntries.set(number, bindGroupLayoutEntry);
            bindGroupEntries.set(number, bindGroupEntry);
		}

        for (const [number, resourceBinding] of resourceBindingsExternal) {
            const resourceDescriptor = resourceBinding.resourceDescriptor;
            const bindGroupLayoutEntry = resourceBinding.bindGroupLayoutEntry;
            const bindGroupEntry = resourceBinding.bindGroupEntry;

			switch (resourceDescriptor.type) {
				case BufferDescriptor.DEFAULT.TYPE:
					bindGroupEntry.resource.buffer = this.bufferManager.getBuffer(resourceDescriptor);
					break;
				case TextureDescriptor.DEFAULT.TYPE:
					bindGroupEntry.resource = this.textureManager.getTexture(resourceDescriptor).createView();
					break;
				case SamplerDescriptor.DEFAULT.TYPE:
					bindGroupEntry.resource = this.samplerManager.getSampler(resourceDescriptor);
					break;
				default:
                    throw new Error(`Unknown resource type: [${resourceDescriptor.type}]!`);
			}

            bindGroupLayoutEntries.set(number, bindGroupLayoutEntry);
            bindGroupEntries.set(number, bindGroupEntry);
		}

        bindGroupLayoutDescriptor.entries = Array.from(bindGroupLayoutEntries.values());
        bindGroupDescriptor.layout = this.bindGroupLayoutManager.getBindGroupLayout(bindGroupLayoutDescriptor);
        bindGroupDescriptor.entries = Array.from(bindGroupEntries.values());

        this.uniformGroups.set(descriptor, uniformGroup);

        descriptor.dirty = false;


        return uniformGroup;
    }
    createUniformGroup(descriptor) {
        if (this.uniformGroups.has(descriptor)) this.#deleteUniformGroup(descriptor);
        const uniformGroup = this.#createUniformGroup(descriptor);


        return uniformGroup;
    }
    #updateUniformGroup(descriptor) {
        return this.createUniformGroup(descriptor);
    }
    getUniformGroup(descriptor) {
        const ug = (this.uniformGroups.has(descriptor)) ? ((descriptor.dirty) ? this.#updateUniformGroup(descriptor) : this.uniformGroups.get(descriptor)) : this.createUniformGroup(descriptor);
        if(this.uniformGroups.has(descriptor)) {
            this.#set(descriptor);
        }
        return ug;
    }
    #deleteUniformGroup(descriptor) {
        // this.uniformGroups.get(descriptor).delete();
        const delted = this.uniformGroups.delete(descriptor);


        return delted;
    }
    deleteUniformGroup(descriptor) {
        return (this.uniformGroups.has(descriptor)) ? this.#deleteUniformGroup(uniformGroups) : false;
    }


    #setBuffer(bufferDescriptor, setInstruction) {
        const buffer = this.bufferManager.getBuffer(bufferDescriptor);

        this.context.queue.writeBuffer(
            buffer,
            setInstruction.bufferOffset,
            setInstruction.data,
            setInstruction.dataOffset,
            setInstruction.size
        );
    }
    #setTexture(textureDescriptor, setInstruction) {    
        const texture = this.textureManager.getTexture(textureDescriptor);

        this.context.queue.writeTexture(
            new GPUImageCopyTexture(
                {
                    texture: texture,
        
                    mipLevel: setInstruction.destination.layout.mipLevel,
                    origin: new GPUOrigin3D(
                        {
                            x: setInstruction.destination.layout.x,
                            y: setInstruction.destination.layout.y,
                            z: setInstruction.destination.layout.z,
                        }
                    ),
                    aspect: setInstruction.destination.layout.aspect,
                }
            ),
            setInstruction.source.arrayBuffer.buffer,
            new GPUImageDataLayout(
                {
                    offset: setInstruction.source.layout.offset,
                    bytesPerRow: setInstruction.size.width * 4,
                    rowsPerImage: setInstruction.size.height,
                }
            ),
            new GPUExtent3D(
                {
                    width: setInstruction.size.width,
                    height: setInstruction.size.height,
                    depthOrArrayLayers: setInstruction.size.depthOrArrayLayers,
                }
            )
        );
    }
    #setBinding(resourceBinding, setInstruction) {

        const resourceDescriptor = resourceBinding.resourceDescriptor;
        const bindGroupLayoutEntry = resourceBinding.bindGroupLayoutEntry;
        const bindGroupEntry = resourceBinding.bindGroupEntry;

        switch (resourceDescriptor.type) {
            case BufferDescriptor.DEFAULT.TYPE:
                this.#setBuffer(resourceDescriptor, setInstruction);
                break;
            case TextureDescriptor.DEFAULT.TYPE:
                this.#setTexture(resourceDescriptor, setInstruction);
                break;
            case SamplerDescriptor.DEFAULT.TYPE:
                // this.#setSampler();
                break;
            default:
                throw new Error(`Unknown resource type: [${resourceDescriptor.target}]!`);
        }
    }
    #set(descriptor) {
        const uniformGroup = this.uniformGroups.get(descriptor);

        const resourceBindings = uniformGroup.resourceBindings;
        const resourceBindingsExternal = uniformGroup.resourceBindingsExternal;
		const bindGroupLayoutDescriptor = uniformGroup.bindGroupLayoutDescriptor;
		const bindGroupDescriptor = uniformGroup.bindGroupDescriptor;


        //update children
        //TODO


        //update self
        for (const [name, setDescriptor] of uniformGroup.dirtyCache) {
            
            switch (setDescriptor.target) {
				case ResourceBinding.TARGET.INTERNAL:
                    const resourceBindingInternal = resourceBindings.get(setDescriptor.bindingNumber);
                    this.#setBinding(resourceBindingInternal, setDescriptor);
					break;
				case ResourceBinding.TARGET.EXTERNAL:
                    const resourceBindingExternal = resourceBindingsExternal.get(setDescriptor.bindingNumber);
                    this.#setBinding(resourceBindingExternal, setDescriptor);
					break;
				default:
                    throw new Error(`Unknown set instruction target: [${setDescriptor.target}]!`);
			}


        }
        uniformGroup.dirtyCache.clear();
    }
};