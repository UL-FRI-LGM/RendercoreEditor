import { Resource } from './Resource.js';
import { ErrorT2 } from '../../ErrorT2.js';


export class ResourceLocation extends Resource { //custom resource location (attribute)


	static DEFAULT = {
		NAME: "",
		TYPE: "ResourceLocation",

		LABEL: "",
        DIRTY_CACHE: new Map(),

		NUMBER: null,
		ITEM_SIZE: 4,
		ARRAY_BUFFER: new Float32Array(),
		SET_INSTRUCTION: null,

		BUFFER_DESCRIPTOR: undefined,
		VERTEX_BUFFER_LAYOUT_DESCRIPTOR: undefined,
	};


	#number;
	#itemSize;
	#arrayBuffer;
	#setInstruction;

	#bufferDescriptor;
	#vertexBufferLayoutDescriptor;


	constructor(args = {}) {
        super(
			{
				...args,
				
                name: (args.name !== undefined) ? args.name : ResourceLocation.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : ResourceLocation.DEFAULT.TYPE,
            }
		);

		this.number = (args.number !== undefined) ? args.number : ResourceLocation.DEFAULT.NUMBER;
		this.itemSize = (args.itemSize !== undefined) ? args.itemSize : ResourceLocation.DEFAULT.ITEM_SIZE;
		this.arrayBuffer = (args.arrayBuffer !== undefined) ? args.arrayBuffer : new Float32Array(ResourceLocation.DEFAULT.ARRAY_BUFFER); //copy
		this.setInstruction = (args.setInstruction !== undefined) ? args.setInstruction : ResourceLocation.DEFAULT.SET_INSTRUCTION;

		this.bufferDescriptor = (args.bufferDescriptor !== undefined) ? args.bufferDescriptor : ResourceLocation.DEFAULT.BUFFER_DESCRIPTOR;
		this.vertexBufferLayoutDescriptor = (args.vertexBufferLayoutDescriptor !== undefined) ? args.vertexBufferLayoutDescriptor : ResourceLocation.DEFAULT.VERTEX_BUFFER_LAYOUT_DESCRIPTOR;
	}


	get number() { return this.#number; }
	set number(number) { this.#number = number; }
	get itemSize() { return this.#itemSize }
	set itemSize(itemSize){ this.#itemSize = itemSize; }
	get arrayBuffer() { return this.#arrayBuffer; }
    set arrayBuffer(arrayBuffer) { this.#arrayBuffer = arrayBuffer; }
	get setInstruction() { return this.#setInstruction; }
	set setInstruction(setInstruction) { this.#setInstruction = setInstruction; }

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

	addResourceLocation() {
		//add new (override external, if exists)
		ErrorT2.throw(ErrorT2.MESSAGE.NOT_IMPLEMENTED, { cause: this.type });
	}
	removeResourceLocation() {
		ErrorT2.throw(ErrorT2.MESSAGE.NOT_IMPLEMENTED, { cause: this.type });
	}
	getResourceLocation() {
		ErrorT2.throw(ErrorT2.MESSAGE.NOT_IMPLEMENTED, { cause: this.type });
	}
	setResourceLocation(name, setInstruction) {
		//set (update) existing resource location
		this.dirtyCache.set(
			name,
			setInstruction
		);
	}
};