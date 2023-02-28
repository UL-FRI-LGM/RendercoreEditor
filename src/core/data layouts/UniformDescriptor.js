import { DescriptorBase } from '../RC/DescriptorBase.js';


export class UniformDescriptor extends DescriptorBase { //Uniform group descriptor


	static DEFAULT = {
		NAME: "",
		TYPE: "UniformDescriptor",

		LABEL: "",
        DIRTY_CACHE: new Map(),

		RESOURCE_DESCRIPTORS: new Map(),
		BIND_GROUP_LAYOUT_DESCRIPTOR: undefined,
		BIND_GROUP_DESCRIPTOR: undefined,
	};


	#resourceDescriptors;
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

		this.resourceDescriptors = (args.resourceDescriptors !== undefined) ? args.resourceDescriptors : new Map(UniformDescriptor.DEFAULT.RESOURCE_DESCRIPTORS); //copy
		this.bindGroupLayoutDescriptor = (args.bindGroupLayoutDescriptor !== undefined) ? args.bindGroupLayoutDescriptor : UniformDescriptor.DEFAULT.BIND_GROUP_LAYOUT_DESCRIPTOR;
		this.bindGroupDescriptor = (args.bindGroupDescriptor !== undefined) ? args.bindGroupDescriptor : UniformDescriptor.DEFAULT.BIND_GROUP_DESCRIPTOR;
	}


	get resourceDescriptors() { return this.#resourceDescriptors }
	set resourceDescriptors(resourceDescriptors){ this.#resourceDescriptors = resourceDescriptors; }
	get bindGroupLayoutDescriptor() { return this.#bindGroupLayoutDescriptor; }
	set bindGroupLayoutDescriptor(bindGroupLayoutDescriptor) { this.#bindGroupLayoutDescriptor = bindGroupLayoutDescriptor; }
	get bindGroupDescriptor() { return this.#bindGroupDescriptor; }
	set bindGroupDescriptor(bindGroupDescriptor) { this.#bindGroupDescriptor = bindGroupDescriptor; }
};