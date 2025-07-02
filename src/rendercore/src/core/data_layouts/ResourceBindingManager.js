import { ObjectBase } from "../ObjectBase.js";
import { Extent3D } from "../RC/textures/Extent3D.js";
import { ImageCopyTexture } from "./ImageCopyTexture.js";
import { ImageDataLayout } from "./ImageDataLayout.js";
import { Origin3D } from "./Origin3D.js";
import { BufferDescriptor } from "../RC/buffers/BufferDescriptor.js";
import { SamplerDescriptor } from "../RC/samplers/SamplerDescriptor.js";
import { TextureDescriptor } from "../RC/textures/TextureDescriptor.js";


export class ResourceBindingManager extends ObjectBase { //RC resource binding manager


    static DEFAULT = {
        NAME: "",
        TYPE: "ResourceBindingManager",
    };


    #context;

    #descriptors = new Set();
    #resourceBindings = new Map();


	constructor(contextManager, args = {}) {
        super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : ResourceBindingManager.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : ResourceBindingManager.DEFAULT.TYPE,
			}
		);

        this.context = (contextManager.context !== undefined) ? contextManager.context : undefined;

        this.bufferManager = contextManager.bufferManager;
        this.textureManager = contextManager.textureManager;
        this.samplerManager = contextManager.samplerManager;

        this.descriptors = (args.descriptors !== undefined) ? args.descriptors : new Set();
        this.resourceBindings = (args.resourceBindings !== undefined) ? args.resourceBindings : new Map();
	}


	get context() { return this.#context; }
    set context(context) { this.#context = context; }

    get descriptors() { return this.#descriptors; }
    set descriptors(descriptors) { this.#descriptors = descriptors; }
    get resourceBindings() { return this.#resourceBindings; }
    set resourceBindings(resourceBindings) { this.#resourceBindings = resourceBindings; }


    #createResourceBinding(descriptor) {
        // TODO make new wrapper class for this, or context.createResourceBinding(descriptor)?
        const resourceBinding = descriptor;

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

        this.resourceBindings.set(descriptor, resourceBinding);

        descriptor.dirty = false;


        return resourceBinding;
    }
    createResourceBinding(descriptor) {
        if (this.resourceBindings.has(descriptor)) this.#deleteResourceBinding(descriptor);
        const resourceBinding = this.#createResourceBinding(descriptor);


        return resourceBinding;
    }
    #updateResourceBinding(descriptor) {
        return this.createResourceBinding(descriptor);
    }
    getResourceBinding(descriptor) {
        return (this.resourceBindings.has(descriptor)) ? ((descriptor.dirty) ? this.#updateResourceBinding(descriptor) : this.resourceBindings.get(descriptor)) : this.createResourceBinding(descriptor);
    }
    #deleteResourceBinding(descriptor) {
        // this.resourceBindings.get(descriptor).delete();
        const deleted = this.resourceBindings.delete(descriptor);


        return deleted;
    }
    deleteResourceBinding(descriptor) {
        return (this.resourceBindings.has(descriptor)) ? this.#deleteResourceBinding(descriptor) : false;
    }

    #setBufferBindingValue(bufferDescriptor, setInstruction) {
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
    #setTextureBindingValue(textureDescriptor, setInstruction) {    
        const texture = this.textureManager.getTexture(textureDescriptor);

        this.context.queue.writeTexture(
            new ImageCopyTexture(
                {
                    texture: texture,
        
                    mipLevel: setInstruction.destination.layout.mipLevel,
                    origin: new Origin3D(
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
            new ImageDataLayout(
                {
                    offset: setInstruction.source.layout.offset,
                    bytesPerRow: setInstruction.size.width * 4,
                    rowsPerImage: setInstruction.size.height,
                }
            ),
            new Extent3D(
                {
                    width: setInstruction.size.width,
                    height: setInstruction.size.height,
                    depthOrArrayLayers: setInstruction.size.depthOrArrayLayers,
                }
            )
        );
    }
    // #setUniformBinding(descriptor) {}
    setResourceBindingValue(resourceBinding) {
        const resourceDescriptor = resourceBinding.resourceDescriptor;
        // const bindGroupLayoutEntry = resourceBinding.bindGroupLayoutEntry;
        // const bindGroupEntry = resourceBinding.bindGroupEntry;

        if (resourceBinding.dirtyCache.size > 0) {
            resourceBinding.dirtyCache.forEach((setInstruction, name) => {
                switch (resourceDescriptor.type) {
                    case BufferDescriptor.DEFAULT.TYPE:
                        this.#setBufferBindingValue(resourceDescriptor, setInstruction);
                        break;
                    case TextureDescriptor.DEFAULT.TYPE:
                        this.#setTextureBindingValue(resourceDescriptor, setInstruction);
                        break;
                    case SamplerDescriptor.DEFAULT.TYPE:
                        // this.#setSamplerBinding();
                        break;
                    default:
                        throw new Error(`Unknown resource type: [${resourceDescriptor.target}]!`);
                }
            });
            resourceBinding.dirtyCache.clear();
        }
    }
};