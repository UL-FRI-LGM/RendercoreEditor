import { DescriptorBase } from "../RC/DescriptorBase.js";


export class UniformGroupDescriptor extends DescriptorBase { //Uniform group descriptor


	static DEFAULT = {
		NAME: "",
		TYPE: "UniformGroupDescriptor",

		LABEL: "",
        DIRTY_CACHE: new Map(),

		NUMBER: null,
		RESOURCE_BINDINGS: new Map(),
		RESOURCE_BINDINGS_EXTERNAL: new Map(),

		// BINDING_DESCRIPTORS: new Array(),
		BIND_GROUP_LAYOUT_DESCRIPTOR: undefined,
		BIND_GROUP_DESCRIPTOR: undefined,

		MAX: {
			BUFFERS: 10,
			TEXTURES: 10,
			SAMPLERS: 10
		},
	};


	#number;
	#resourceBindings;
	#resourceBindingsExternal;

	// #bindingDescriptors;
	#bindGroupLayoutDescriptor;
	#bindGroupDescriptor;

	#maxBuffers;
	#maxTextures;
	#maxSamplers;


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

		this.number = (args.number !== undefined) ? args.number : UniformGroupDescriptor.DEFAULT.NUMBER;
		this.resourceBindings = (args.resourceBindings !== undefined) ? args.resourceBindings : new Map(UniformGroupDescriptor.DEFAULT.RESOURCE_BINDINGS); //copy
		this.resourceBindingsExternal = (args.resourceBindingsExternal !== undefined) ? args.resourceBindingsExternal : new Map(UniformGroupDescriptor.DEFAULT.RESOURCE_BINDINGS_EXTERNAL); //copy

		// this.bindingDescriptors = (args.bindingDescriptors !== undefined) ? args.bindingDescriptors : new Array(UniformGroupDescriptor.DEFAULT.BINDING_DESCRIPTORS); //copy
		this.bindGroupLayoutDescriptor = (args.bindGroupLayoutDescriptor !== undefined) ? args.bindGroupLayoutDescriptor : UniformGroupDescriptor.DEFAULT.BIND_GROUP_LAYOUT_DESCRIPTOR;
		this.bindGroupDescriptor = (args.bindGroupDescriptor !== undefined) ? args.bindGroupDescriptor : UniformGroupDescriptor.DEFAULT.BIND_GROUP_DESCRIPTOR;	
	
		this.maxBuffers = (args.maxBuffers !== undefined) ? args.maxBuffers : UniformGroupDescriptor.DEFAULT.MAX.BUFFERS;
		this.maxTextures = (args.maxTextures !== undefined) ? args.maxTextures : UniformGroupDescriptor.DEFAULT.MAX.TEXTURES;
		this.maxSamplers = (args.maxSamplers !== undefined) ? args.maxSamplers : UniformGroupDescriptor.DEFAULT.MAX.SAMPLERS;
	}


	get number() { return this.#number; }
	set number(number) { this.#number = number; }
	get resourceBindings() { return this.#resourceBindings; }
    set resourceBindings(resourceBindings) { this.#resourceBindings = resourceBindings; }
	get resourceBindingsExternal() { return this.#resourceBindingsExternal; }
    set resourceBindingsExternal(resourceBindingsExternal) { this.#resourceBindingsExternal = resourceBindingsExternal; }
	
	// get bindingDescriptors() { return this.#bindingDescriptors; }
    // set bindingDescriptors(bindingDescriptors) { this.#bindingDescriptors = bindingDescriptors; }
	get bindGroupLayoutDescriptor() { return this.#bindGroupLayoutDescriptor; }
	set bindGroupLayoutDescriptor(bindGroupLayoutDescriptor) { this.#bindGroupLayoutDescriptor = bindGroupLayoutDescriptor; }
	get bindGroupDescriptor() { return this.#bindGroupDescriptor; }
	set bindGroupDescriptor(bindGroupDescriptor) { this.#bindGroupDescriptor = bindGroupDescriptor; }

	get maxBuffers() { return this.#maxBuffers; }
    set maxBuffers(maxBuffers) { this.#maxBuffers = maxBuffers; }
	get maxTextures() { return this.#maxTextures; }
	set maxTextures(maxTextures) { this.#maxTextures = maxTextures; }
	get maxSamplers() { return this.#maxSamplers; }
	set maxSamplers(maxSamplers) { this.#maxSamplers = maxSamplers; }


	addResourceBinding() {
		//add new (override external, if exists)
		new Error("Not implemented!");
	}
	removeResourceBinding() {
		new Error("Not implemented!");
	}
	getResourceBinding() {
		new Error("Not implemented!");
	}
	setResourceBinding(name, setInstruction) {
		//set (update) existing resource binding
		this.dirtyCache.set(
			name,
			setInstruction
		);
	}

	setBufferBinding(name, setInstruction) {
		this.setResourceBinding(
			`SET | BUFFER | ${name} | BINDING NUMBER: ${setInstruction.number}`,
			setInstruction
		);
	}

	setTextureBinding(name, setInstruction) {
		this.setResourceBinding(
			`SET | TEXTURE | ${name} | BINDING NUMBER: ${setInstruction.number}`,
			setInstruction
		);
	}

	setSamplerBinding(name, setInstruction) {
		this.setResourceBinding(
			`SET | SAMPLER | ${name} | BINDING NUMBER: ${setInstruction.number}`,
			setInstruction
		);
	}

	addMapBinding(name, map, setInstruction = undefined) {
		const textureBinding = map.textureBinding;
		this.resourceBindingsExternal.set(
			textureBinding.number, //TODO add max + max here!!!!
			textureBinding
		);

		const samplerBinding = map.samplerBinding;
		this.resourceBindingsExternal.set(
			samplerBinding.number,
			samplerBinding
		);


		if (setInstruction) this.setMapBinding(name, setInstruction);
	}
	getMapBinding() {
		new Error("Not implemented!");
	}
	setMapBinding(name, setInstruction) {		
		// this.setResourceBinding(
		// 	"SET | MAP | BINDING NUMBER: " + setInstruction.number,
		// 	setInstruction
		// );
		this.setTextureBinding(
			name,
			setInstruction.textureSetInstruction
		);
		// this.setSamplerBinding(
		// 	name,
		// 	setInstruction.samplerSetInstruction
		// );
	}
};