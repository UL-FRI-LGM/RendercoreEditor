import { DescriptorBase } from '../RC/DescriptorBase.js';


export class AttributeDescriptor extends DescriptorBase {


	static DEFAULT = {
		NAME: "",
		TYPE: "AttributeDescriptor",

		LABEL: "",
        DIRTY_CACHE: new Map(),

		BUFFER_DESCRIPTOR: undefined,
		VERTEX_BUFFER_LAYOUT: undefined,
	};


	#bufferDescriptor;
	#vertexBufferLayout;


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
		this.vertexBufferLayout = (args.vertexBufferLayout !== undefined) ? args.vertexBufferLayout : AttributeDescriptor.DEFAULT.VERTEX_BUFFER_LAYOUT;
	}


	get bufferDescriptor() { return this.#bufferDescriptor }
	set bufferDescriptor(bufferDescriptor){ this.#bufferDescriptor = bufferDescriptor; }
	get vertexBufferLayout() { return this.#vertexBufferLayout; }
	set vertexBufferLayout(vertexBufferLayout) { this.#vertexBufferLayout = vertexBufferLayout; }
}