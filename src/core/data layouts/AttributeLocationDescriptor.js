import { DescriptorBase } from '../RC/DescriptorBase.js';


export class AttributeLocationDescriptor extends DescriptorBase { //Attribute location descriptor


	static DEFAULT = {
		NAME: "",
		TYPE: "AttributeLocationDescriptor",

		LABEL: "",
        DIRTY_CACHE: new Map(),

		ITEM_SIZE: 4,
		ARRAY_BUFFER: new Float32Array(),
		BUFFER_DESCRIPTOR: undefined,
		VERTEX_BUFFER_LAYOUT_DESCRIPTOR: undefined,
	};


	#itemSize;
	#arrayBuffer;
	#bufferDescriptor;
	#vertexBufferLayoutDescriptor;


	constructor(args = {}) {
        super(
			{
				...args,
				
                name: (args.name !== undefined) ? args.name : AttributeLocationDescriptor.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : AttributeLocationDescriptor.DEFAULT.TYPE,
                
                label: (args.label !== undefined) ? args.label : AttributeLocationDescriptor.DEFAULT.LABEL,
                dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : new Map(AttributeLocationDescriptor.DEFAULT.DIRTY_CACHE), //copy
            }
		);

		this.itemSize = (args.itemSize !== undefined) ? args.itemSize : AttributeLocationDescriptor.DEFAULT.ITEM_SIZE;
		this.arrayBuffer = (args.arrayBuffer !== undefined) ? args.arrayBuffer : new Float32Array(AttributeLocationDescriptor.DEFAULT.ARRAY_BUFFER); //copy
		this.bufferDescriptor = (args.bufferDescriptor !== undefined) ? args.bufferDescriptor : AttributeLocationDescriptor.DEFAULT.BUFFER_DESCRIPTOR;
		this.vertexBufferLayoutDescriptor = (args.vertexBufferLayoutDescriptor !== undefined) ? args.vertexBufferLayoutDescriptor : AttributeLocationDescriptor.DEFAULT.VERTEX_BUFFER_LAYOUT_DESCRIPTOR;
	}


	get itemSize() { return this.#itemSize }
	set itemSize(itemSize){ this.#itemSize = itemSize; }
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
	get bufferDescriptor() { return this.#bufferDescriptor }
	set bufferDescriptor(bufferDescriptor){ this.#bufferDescriptor = bufferDescriptor; }
	get vertexBufferLayoutDescriptor() { return this.#vertexBufferLayoutDescriptor; }
	set vertexBufferLayoutDescriptor(vertexBufferLayoutDescriptor) { this.#vertexBufferLayoutDescriptor = vertexBufferLayoutDescriptor; }


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
};