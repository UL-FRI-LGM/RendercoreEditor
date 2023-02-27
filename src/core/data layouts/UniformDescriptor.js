import { DescriptorBase } from '../RC/DescriptorBase.js';


export class UniformDescriptor extends DescriptorBase {


	static DEFAULT = {
		NAME: "",
		TYPE: "UniformDescriptor",

		LABEL: "",
        DIRTY_CACHE: new Map(),

		BUFFER_DESCRIPTOR: undefined,
		BIND_GROUP_LAYOUT_DESCRIPTOR: undefined,
		BIND_GROUP_DESCRIPTOR: undefined,
	};


	#bufferDescriptor;
	#bindGroupLayoutDescriptor;
	#bindGroupDescriptor;


	constructor(args = {}) {
        super(
			{
				...args,
				
                name: (args.name !== undefined) ? args.name : UniformDescriptor.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : UniformDescriptor.DEFAULT.TYPE,
                
                label: (args.label !== undefined) ? args.label : UniformDescriptor.DEFAULT.LABEL,
                dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : new Map(UniformDescriptor.DEFAULT.DIRTY_CACHE), //copy
            }
		);

		this.bufferDescriptor = (args.bufferDescriptor !== undefined) ? args.bufferDescriptor : UniformDescriptor.DEFAULT.BUFFER_DESCRIPTOR;
		this.bindGroupLayoutDescriptor = (args.bindGroupLayoutDescriptor !== undefined) ? args.bindGroupLayoutDescriptor : UniformDescriptor.DEFAULT.BIND_GROUP_LAYOUT_DESCRIPTOR;
		this.bindGroupDescriptor = (args.bindGroupDescriptor !== undefined) ? args.bindGroupDescriptor : UniformDescriptor.DEFAULT.BIND_GROUP_DESCRIPTOR;
	}


	get bufferDescriptor() { return this.#bufferDescriptor }
	set bufferDescriptor(bufferDescriptor){ this.#bufferDescriptor = bufferDescriptor; }
	get bindGroupLayoutDescriptor() { return this.#bindGroupLayoutDescriptor; }
	set bindGroupLayoutDescriptor(bindGroupLayoutDescriptor) { this.#bindGroupLayoutDescriptor = bindGroupLayoutDescriptor; }
	get bindGroupDescriptor() { return this.#bindGroupDescriptor; }
	set bindGroupDescriptor(bindGroupDescriptor) { this.#bindGroupDescriptor = bindGroupDescriptor; }
};