import { Resource } from "./Resource.js";
import { BindGroupEntry } from "../RC/resource_binding/BindGroupEntry.js";
import { BindGroupLayoutEntry } from "../RC/resource_binding/BindGroupLayoutEntry.js";
import { ErrorT2 } from "../../ErrorT2.js";
// import { BindingDescriptor } from "./BindingDescriptor.js";


export class ResourceBinding extends Resource { //custom resource binding (uniform)


	static TARGET = {
		INTERNAL: "internal",
		EXTERNAL: "external"
	};

	static DEFAULT = {
		NAME: "",
		TYPE: "ResourceBinding",

		NUMBER: null,
		TARGET: ResourceBinding.TARGET.EXTERNAL,
		ARRAY_BUFFER: new Float32Array(),
		SET_INSTRUCTION: null,

		// BINDING_DESCRIPTOR: new BindingDescriptor({}),
		RESOURCE_DESCRIPTOR: undefined,
		BIND_GROUP_LAYOUT_ENTRY: new BindGroupLayoutEntry({}),
		BIND_GROUP_ENTRY: new BindGroupEntry({}),
	};


	#number;
	#target;
	#arrayBuffer;
	#setInstruction;

	// #bindingDescriptor;
	#resourceDescriptor;
	#bindGroupLayoutEntry;
	#bindGroupEntry;


	constructor(args = {}) {
        super(
			{
				...args,
				
                name: (args.name !== undefined) ? args.name : ResourceBinding.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : ResourceBinding.DEFAULT.TYPE,
            }
		);

		this.number = (args.number !== undefined) ? args.number : ResourceBinding.DEFAULT.NUMBER;
		this.target = (args.target !== undefined) ? args.target : ResourceBinding.DEFAULT.TARGET;
		this.arrayBuffer = (args.arrayBuffer !== undefined) ? args.arrayBuffer : ResourceBinding.DEFAULT.TARGET;
		this.setInstruction = (args.setInstruction !== undefined) ? args.setInstruction : ResourceBinding.DEFAULT.SET_INSTRUCTION;

		// this.bindingDescriptor = (args.bindingDescriptor !== undefined) ? args.bindingDescriptor : ResourceBinding.DEFAULT.BINDING_DESCRIPTOR;
		this.resourceDescriptor = (args.resourceDescriptor !== undefined) ? args.resourceDescriptor : ResourceBinding.DEFAULT.RESOURCE_DESCRIPTOR;
		this.bindGroupLayoutEntry = (args.bindGroupLayoutEntry !== undefined) ? args.bindGroupLayoutEntry : ResourceBinding.DEFAULT.BIND_GROUP_LAYOUT_ENTRY;
		this.bindGroupEntry = (args.bindGroupEntry !== undefined) ? args.bindGroupEntry : ResourceBinding.DEFAULT.BIND_GROUP_ENTRY;
	}


	get number() { return this.#number; }
	set number(number) { this.#number = number; }
	get target() { return this.#target; }
	set target(target) { this.#target = target; }
	get arrayBuffer() { return this.#arrayBuffer; }
	set arrayBuffer(arrayBuffer) { this.#arrayBuffer = arrayBuffer; }
	get setInstruction() { return this.#setInstruction; }
	set setInstruction(setInstruction) { this.#setInstruction = setInstruction; }

	// get bindingDescriptor() { return this.#bindingDescriptor; }
	// set bindingDescriptor(bindingDescriptor) { this.#bindingDescriptor = bindingDescriptor; }
	get resourceDescriptor() { return this.#resourceDescriptor; }
    set resourceDescriptor(resourceDescriptor) { this.#resourceDescriptor = resourceDescriptor; }
	get bindGroupLayoutEntry() { return this.#bindGroupLayoutEntry; }
    set bindGroupLayoutEntry(bindGroupLayoutEntry) { this.#bindGroupLayoutEntry = bindGroupLayoutEntry; }
	get bindGroupEntry() { return this.#bindGroupEntry }
	set bindGroupEntry(bindGroupEntry){ this.#bindGroupEntry = bindGroupEntry; }


	getValue(getInstruction) {
		ErrorT2.throw(ErrorT2.MESSAGE.NOT_IMPLEMENTED, { cause: this.type });
	}
	setValue(setInstruction) {
		this.dirtyCache.set(setInstruction, setInstruction);
	}

	// setResourceBinding(name, setInstruction) {
	// 	//set (update) this resource binding
	// 	this.dirtyCache.set(
	// 		name,
	// 		setInstruction
	// 	);
	// }
	// setBufferBinding(name, setInstruction) {
	// 	this.setResourceBinding(
	// 		`SET | BUFFER | ${name} | BINDING NUMBER: ${setInstruction.number}`,
	// 		setInstruction
	// 	);
	// }
	// setTextureBinding(name, setInstruction) {
	// 	this.setResourceBinding(
	// 		`SET | TEXTURE | ${name} | BINDING NUMBER: ${setInstruction.number}`,
	// 		setInstruction
	// 	);
	// }
	// setSamplerBinding(name, setInstruction) {
	// 	this.setResourceBinding(
	// 		`SET | SAMPLER | ${name} | BINDING NUMBER: ${setInstruction.number}`,
	// 		setInstruction
	// 	);
	// }
	// setMapBinding(name, setInstruction) {
	// 	this.setTextureBinding("TEXTURE" + name, setInstruction.textureSetInstruction);
	// 	this.setTextureBinding("SAMPLER" + name, setInstruction.samplerSetInstruction);
	// }
};