import { DescriptorBase } from '../RC/DescriptorBase.js';


export class AttributeLocationDescriptor extends DescriptorBase { //Attribute location descriptor


	static DEFAULT = {
		NAME: "",
		TYPE: "AttributeLocationDescriptor",

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
				
                name: (args.name !== undefined) ? args.name : AttributeLocationDescriptor.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : AttributeLocationDescriptor.DEFAULT.TYPE,
                
                label: (args.label !== undefined) ? args.label : AttributeLocationDescriptor.DEFAULT.LABEL,
                dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : new Map(AttributeLocationDescriptor.DEFAULT.DIRTY_CACHE), //copy
            }
		);

		this.bufferDescriptor = (args.bufferDescriptor !== undefined) ? args.bufferDescriptor : AttributeLocationDescriptor.DEFAULT.BUFFER_DESCRIPTOR;
		this.vertexBufferLayoutDescriptor = (args.vertexBufferLayoutDescriptor !== undefined) ? args.vertexBufferLayoutDescriptor : AttributeLocationDescriptor.DEFAULT.VERTEX_BUFFER_LAYOUT_DESCRIPTOR;
	}


	get bufferDescriptor() { return this.#bufferDescriptor }
	set bufferDescriptor(bufferDescriptor){ this.#bufferDescriptor = bufferDescriptor; }
	get vertexBufferLayoutDescriptor() { return this.#vertexBufferLayoutDescriptor; }
	set vertexBufferLayoutDescriptor(vertexBufferLayoutDescriptor) { this.#vertexBufferLayoutDescriptor = vertexBufferLayoutDescriptor; }
};