import { DescriptorBase } from "../DescriptorBase.js";
import { BufferUsage } from "./BufferUsage.js";


export class BufferDescriptor extends DescriptorBase { //RC buffer descriptor (WebGL / WebGPU)


    static DEFAULT = {
        NAME: "",
		TYPE: "BufferDescriptor",

        LABEL: "",
        DIRTY_CACHE: new Map(),

        SIZE: 0,
        ITEM_SIZE: 4,
        USAGE: BufferUsage.VERTEX | BufferUsage.COPY_DST,
        MAPPED_AT_CREATION: false,

        ARRAY_BUFFER: new Float32Array(),
    };

    
    #size;
    #itemSize;
    #usage;
    #mappedAtCreation;

    #arrayBuffer;


    constructor(args = {}) {
        super(
			{
				...args,
				
                name: (args.name !== undefined) ? args.name : BufferDescriptor.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : BufferDescriptor.DEFAULT.TYPE,
                
                label: (args.label !== undefined) ? args.label : BufferDescriptor.DEFAULT.LABEL,
                dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : new Map(BufferDescriptor.DEFAULT.DIRTY_CACHE), //copy
            }
		);

        this.size = (args.size !== undefined) ? args.size : BufferDescriptor.DEFAULT.SIZE;
        this.itemSize = (args.itemSize !== undefined) ? args.itemSize : BufferDescriptor.DEFAULT.ITEM_SIZE;
        this.usage = (args.usage !== undefined) ? args.usage : BufferDescriptor.DEFAULT.USAGE;
        this.mappedAtCreation = args.mappedAtCreation !== undefined ? args.mappedAtCreation : BufferDescriptor.DEFAULT.MAPPED_AT_CREATION;

        this.arrayBuffer = (args.arrayBuffer !== undefined) ? args.arrayBuffer : BufferDescriptor.DEFAULT.ARRAY_BUFFER;
    }

    
    get size() { return this.#size; }
    set size(size) { this.#size = size; }
    get itemSize() { return this.#itemSize; }
    set itemSize(itemSize) { this.#itemSize = itemSize; }
    get usage() { return this.#usage; }
    set usage(usage) { this.#usage = usage; }
    get mappedAtCreation() { return this.#mappedAtCreation; }
    set mappedAtCreation(mappedAtCreation) { this.#mappedAtCreation = mappedAtCreation; }

    get arrayBuffer() { return this.#arrayBuffer; }
    set arrayBuffer(arrayBuffer) { 
        this.#arrayBuffer = arrayBuffer; 

        this.dirtyCache.set(
            "ArrayBuffer", 
            {
                bufferOffset: 0, 
                data: this.arrayBuffer.buffer, 
                dataOffset: 0, 
                size: () => { return this.size * 4 }
            }
        );
    }

    
    count() {
		return this.arrayBuffer.length / this.itemSize;
	}

    normalize() {
        for (let i = 0; i < this.arrayBuffer.length; i += this.itemSize) {

            let squareSum = 0.0;
			for (let j = 0; j < this.itemSize; j++) {
                squareSum += this.arrayBuffer[i + j] * this.arrayBuffer[i + j];
            }

			const n = 1.0 / Math.sqrt(squareSum); // 1.0 / sqrt(x*x + y*y + ...)
			for (let j = 0; j < this.itemSize; j++) {
                this.arrayBuffer[i + j] *= n;
            }
		}


        return this;
    }

    // setup(context) {
    //     if (this.buffer) this.buffer.destroy();
	// 	this.buffer = context.createBuffer(this.bufferDescriptor);
	// }
    // update(context) {
	// 	for (const [name, desc] of this.dirtyCache) {
	// 		context.queue.writeBuffer(this.buffer, desc.bufferOffset, desc.data, desc.dataOffset, desc.size());
	// 	}
    //     this.dirtyCache.clear();
	// }
    // set(renderPassEncoder, slot) {
    //     renderPassEncoder.setVertexBuffer(slot, this.buffer);
    // }
};