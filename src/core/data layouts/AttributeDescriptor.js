import { DescriptorBase } from '../RC/DescriptorBase.js';


export class AttributeDescriptor extends DescriptorBase { //Attribute location descriptor


	static DEFAULT = {
		NAME: "",
		TYPE: "AttributeDescriptor",

		LABEL: "",
        DIRTY_CACHE: new Map(),

		BUFFER_DESCRIPTOR: undefined,
		VERTEX_BUFFER_LAYOUT_DESCRIPTOR: undefined,
	};


	#bufferDescriptor;
	#vertexBufferLayoutDescriptor;


	constructor(args = {}) {
        super(
			{
				...args,
				
                name: (args.name !== undefined) ? args.name : AttributeDescriptor.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : AttributeDescriptor.DEFAULT.TYPE,
                
                label: (args.label !== undefined) ? args.label : AttributeDescriptor.DEFAULT.LABEL,
                dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : new Map(AttributeDescriptor.DEFAULT.DIRTY_CACHE), //copy
            }
		);

		this.bufferDescriptor = (args.bufferDescriptor !== undefined) ? args.bufferDescriptor : AttributeDescriptor.DEFAULT.BUFFER_DESCRIPTOR;
		this.vertexBufferLayoutDescriptor = (args.vertexBufferLayoutDescriptor !== undefined) ? args.vertexBufferLayoutDescriptor : AttributeDescriptor.DEFAULT.VERTEX_BUFFER_LAYOUT_DESCRIPTOR;
	}


	get bufferDescriptor() { return this.#bufferDescriptor }
	set bufferDescriptor(bufferDescriptor){ this.#bufferDescriptor = bufferDescriptor; }
	get vertexBufferLayoutDescriptor() { return this.#vertexBufferLayoutDescriptor; }
	set vertexBufferLayoutDescriptor(vertexBufferLayoutDescriptor) { this.#vertexBufferLayoutDescriptor = vertexBufferLayoutDescriptor; }
};