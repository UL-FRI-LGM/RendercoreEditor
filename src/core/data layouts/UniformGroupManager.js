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
        return (this.uniformGroups.has(descriptor)) ? ((descriptor.dirty) ? this.#updateUniformGroup(descriptor) : this.uniformGroups.get(descriptor)) : this.createUniformGroup(descriptor);
    }
    #deleteUniformGroup(descriptor) {
        // this.uniformGroups.get(descriptor).delete();
        const delted = this.uniformGroups.delete(descriptor);


        return delted;
    }
    deleteUniformGroup(descriptor) {
        return (this.uniformGroups.has(descriptor)) ? this.#deleteUniformGroup(descriptor) : false;
    }

    #setBufferBinding(bufferDescriptor, setInstruction) {
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
    #setTextureBinding(textureDescriptor, setInstruction) {    
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
    #setResourceBinding(resourceBinding, setInstruction) {
        const resourceDescriptor = resourceBinding.resourceDescriptor;
        const bindGroupLayoutEntry = resourceBinding.bindGroupLayoutEntry;
        const bindGroupEntry = resourceBinding.bindGroupEntry;

        switch (resourceDescriptor.type) {
            case BufferDescriptor.DEFAULT.TYPE:
                this.#setBufferBinding(resourceDescriptor, setInstruction);
                break;
            case TextureDescriptor.DEFAULT.TYPE:
                this.#setTextureBinding(resourceDescriptor, setInstruction);
                break;
            case SamplerDescriptor.DEFAULT.TYPE:
                // this.#setSamplerBinding();
                break;
            default:
                throw new Error(`Unknown resource type: [${resourceDescriptor.target}]!`);
        }
    }
    #setUniformBinding(descriptor) {
        //TODO add uniform binding manager
    }
    setUniformGroup(descriptor) {
        const uniformGroup = this.uniformGroups.get(descriptor);

        const resourceBindings = uniformGroup.resourceBindings;
        const resourceBindingsExternal = uniformGroup.resourceBindingsExternal;
		const bindGroupLayoutDescriptor = uniformGroup.bindGroupLayoutDescriptor;
		const bindGroupDescriptor = uniformGroup.bindGroupDescriptor;

        for (const [name, setInstruction] of uniformGroup.dirtyCache) {
            
            switch (setInstruction.target) {
				case ResourceBinding.TARGET.INTERNAL:
                    const resourceBindingInternal = resourceBindings.get(setInstruction.number);
                    this.#setResourceBinding(resourceBindingInternal, setInstruction);
					break;
				case ResourceBinding.TARGET.EXTERNAL:
                    const resourceBindingExternal = resourceBindingsExternal.get(setInstruction.number);
                    this.#setResourceBinding(resourceBindingExternal, setInstruction);
					break;
				default:
                    throw new Error(`Unknown set instruction target: [${setInstruction.target}]!`);
			}


        }
        uniformGroup.dirtyCache.clear();
    }
};