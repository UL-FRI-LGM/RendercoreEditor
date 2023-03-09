import { DescriptorBase } from '../RC/DescriptorBase.js';


export class UniformGroupDescriptor extends DescriptorBase { //Uniform group descriptor


	static DEFAULT = {
		NAME: "",
		TYPE: "UniformGroupDescriptor",

		LABEL: "",
        DIRTY_CACHE: new Map(),

		BINDING_DESCRIPTORS: new Array(),
		BIND_GROUP_LAYOUT_DESCRIPTOR: undefined,
		BIND_GROUP_DESCRIPTOR: undefined,
	};


	#bindingDescriptors;
	#bindGroupLayoutDescriptor;
	#bindGroupDescriptor;


	constructor(args = {}) {
        super(
			{
				...args,
				
                name: (args.name !== undefined) ? args.name : UniformGroupDescriptor.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : UniformGroupDescriptor.DEFAULT.TYPE,
                
                label: (args.label !== undefined) ? args.label : UniformGroupDescriptor.DEFAULT.LABEL,
                dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : new Map(UniformGroupDescriptor.DEFAULT.DIRTY_CACHE), //copy
            }
		);

		this.bindingDescriptors = (args.bindingDescriptors !== undefined) ? args.bindingDescriptors : new Map(UniformGroupDescriptor.DEFAULT.BINDING_DESCRIPTORS); //copy
		this.bindGroupLayoutDescriptor = (args.bindGroupLayoutDescriptor !== undefined) ? args.bindGroupLayoutDescriptor : UniformGroupDescriptor.DEFAULT.BIND_GROUP_LAYOUT_DESCRIPTOR;
		this.bindGroupDescriptor = (args.bindGroupDescriptor !== undefined) ? args.bindGroupDescriptor : UniformGroupDescriptor.DEFAULT.BIND_GROUP_DESCRIPTOR;
	}


	get bindingDescriptors() { return this.#bindingDescriptors; }
    set bindingDescriptors(bindingDescriptors) { this.#bindingDescriptors = bindingDescriptors; }
	get bindGroupLayoutDescriptor() { return this.#bindGroupLayoutDescriptor; }
	set bindGroupLayoutDescriptor(bindGroupLayoutDescriptor) { this.#bindGroupLayoutDescriptor = bindGroupLayoutDescriptor; }
	get bindGroupDescriptor() { return this.#bindGroupDescriptor; }
	set bindGroupDescriptor(bindGroupDescriptor) { this.#bindGroupDescriptor = bindGroupDescriptor; }
};