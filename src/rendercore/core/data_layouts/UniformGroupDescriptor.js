import { DescriptorBase } from "../RC/DescriptorBase.js";
import { MapT2 } from "../MapT2.js";


export class UniformGroupDescriptor extends DescriptorBase { //Uniform group descriptor


	static DEFAULT = {
		NAME: "",
		TYPE: "UniformGroupDescriptor",

		LABEL: "",
        DIRTY_CACHE: new MapT2({}),

		NUMBER: null,
		RESOURCE_BINDINGS_INTERNAL: new MapT2({}),
		RESOURCE_BINDINGS_EXTERNAL: new MapT2({}),

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
	#resourceBindingsInternal;
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
                dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : UniformGroupDescriptor.DEFAULT.DIRTY_CACHE.clone(true),
            }
		);

		this.number = (args.number !== undefined) ? args.number : UniformGroupDescriptor.DEFAULT.NUMBER;
		this.resourceBindingsInternal = (args.resourceBindingsInternal !== undefined) ? args.resourceBindingsInternal : UniformGroupDescriptor.DEFAULT.RESOURCE_BINDINGS_INTERNAL.clone(true);
		this.resourceBindingsExternal = (args.resourceBindingsExternal !== undefined) ? args.resourceBindingsExternal : UniformGroupDescriptor.DEFAULT.RESOURCE_BINDINGS_EXTERNAL.clone(true);

		// this.bindingDescriptors = (args.bindingDescriptors !== undefined) ? args.bindingDescriptors : new Array(UniformGroupDescriptor.DEFAULT.BINDING_DESCRIPTORS); //copy
		this.bindGroupLayoutDescriptor = (args.bindGroupLayoutDescriptor !== undefined) ? args.bindGroupLayoutDescriptor : UniformGroupDescriptor.DEFAULT.BIND_GROUP_LAYOUT_DESCRIPTOR;
		this.bindGroupDescriptor = (args.bindGroupDescriptor !== undefined) ? args.bindGroupDescriptor : UniformGroupDescriptor.DEFAULT.BIND_GROUP_DESCRIPTOR;	
	
		this.maxBuffers = (args.maxBuffers !== undefined) ? args.maxBuffers : UniformGroupDescriptor.DEFAULT.MAX.BUFFERS;
		this.maxTextures = (args.maxTextures !== undefined) ? args.maxTextures : UniformGroupDescriptor.DEFAULT.MAX.TEXTURES;
		this.maxSamplers = (args.maxSamplers !== undefined) ? args.maxSamplers : UniformGroupDescriptor.DEFAULT.MAX.SAMPLERS;
	}


	get number() { return this.#number; }
	set number(number) { this.#number = number; }
	get resourceBindingsInternal() { return this.#resourceBindingsInternal; }
    set resourceBindingsInternal(resourceBindingsInternal) { this.#resourceBindingsInternal = resourceBindingsInternal; }
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


	clone() {
		return new UniformGroupDescriptor(
			{
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				label: (this.label === Object(this.label)) ? this.label.clone() : this.label,
				dirtyCache: (this.dirtyCache === Object(this.dirtyCache)) ? this.dirtyCache.clone() : this.dirtyCache,

				number: (this.number === Object(this.number)) ? this.number.clone() : this.number,
				resourceBindingsInternal: (this.resourceBindingsInternal === Object(this.resourceBindingsInternal)) ? this.resourceBindingsInternal.clone() : this.resourceBindingsInternal,
				resourceBindingsExternal: (this.resourceBindingsExternal === Object(this.resourceBindingsExternal)) ? this.resourceBindingsExternal.clone() : this.resourceBindingsExternal,

				// bindingDescriptors: (this.bindingDescriptors === Object(this.bindingDescriptors)) ? this.bindingDescriptors.clone() : this.bindingDescriptors,
				bindGroupLayoutDescriptor: (this.bindGroupLayoutDescriptor === Object(this.bindGroupLayoutDescriptor)) ? this.bindGroupLayoutDescriptor.clone() : this.bindGroupLayoutDescriptor,
				bindGroupDescriptor: (this.bindGroupDescriptor === Object(this.bindGroupDescriptor)) ? this.bindGroupDescriptor.clone() : this.bindGroupDescriptor,

				maxBuffers: (this.maxBuffers === Object(this.maxBuffers)) ? this.maxBuffers.clone() : this.maxBuffers,
				maxTextures: (this.maxTextures === Object(this.maxTextures)) ? this.maxTextures.clone() : this.maxTextures,
				maxSamplers: (this.maxSamplers === Object(this.maxSamplers)) ? this.maxSamplers.clone() : this.maxSamplers,
			}
		);
	}

	#hasResourceBinding(channel, number) {
		return channel.has(number);
	}
	hasResourceBindingsInternal(number) {
		return this.#hasResourceBinding(this.resourceBindingsInternal, number);
	}
	hasResourceBindingsExternal(number) {
		return this.#hasResourceBinding(this.resourceBindingsExternal, number);
	}

	#getResourceBinding(channel, number) {
		if (channel.has(number)) {
			return channel.get(number);
		} else {
			console.warn(`No resource_binding [${this.number.toString().padStart(2, '0')}][${number.toString().padStart(2, '0')}]!`);
			return undefined;
		}
	}
	getResourceBindingInternal(number) {
		return this.#getResourceBinding(this.resourceBindingsInternal, number);
	}
	getResourceBindingExternal(number) {
		return this.#getResourceBinding(this.resourceBindingsExternal, number);
	}
	getResourceBindingExteInte(number) {
		return this.hasResourceBindingsExternal(number) ? this.getResourceBindingExternal(number) : this.getResourceBindingInternal(number);
	}
	#setResourceBinding(channel, number, binding) {
		channel.set(number, binding);
	}
	setResourceBindingInternal(number, binding) {
		this.#setResourceBinding(this.resourceBindingsInternal, number, binding);
	}
	setResourceBindingExternal(number, binding) {
		this.#setResourceBinding(this.resourceBindingsExternal, number, binding);
	}
	setResourceBindingExteInte(number, binding) {
		throw new Error("Not implemented!");
	}
	setMapBindingInternal() {
		throw new Error("Not implemented!");
	}
	setMapBindingExternal(mapNumber, mapBinding, setInstruction = undefined) {
		const textureBinding = mapBinding.textureBinding;
		const samplerBinding = mapBinding.samplerBinding;

		//TODO add max + max here!!!!
		this.setResourceBindingExternal(mapNumber + 10, textureBinding);
		this.setResourceBindingExternal(mapNumber + 20, samplerBinding);
	

		if (setInstruction) {
			this.setMapBindingValueExternal(mapNumber, setInstruction);
		}
	}

	#setResourceBindingValue(channel, number, setInstruction) {
		this.#getResourceBinding(channel, number).setValue(setInstruction);
	}
	setResourceBindingValueInternal(number, setInstruction){
		this.#setResourceBindingValue(this.resourceBindingsInternal, number, setInstruction);
	}
	setResourceBindingValueExternal(number, setInstruction){
		this.#setResourceBindingValue(this.resourceBindingsExternal, number, setInstruction);
	}
	setMapBindingValueInternal() {
		throw new Error("Not implemented!");
	}
	setMapBindingValueExternal(mapNumber, setInstruction) {
		this.setResourceBindingValueExternal(mapNumber + 10, setInstruction.textureSetInstruction);
		// this.setResourceBindingValueExternal(mapNumber + 20, setInstruction.samplerSetInstruction);
	}
};