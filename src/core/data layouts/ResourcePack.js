import { ObjectBase } from "../ObjectBase.js";
import { BindGroupDescriptor } from "../RC/resource binding/BindGroupDescriptor.js";
import { BindGroupLayoutDescriptor } from "../RC/resource binding/BindGroupLayoutDescriptor.js";
import { UniformGroupDescriptor } from "./UniformGroupDescriptor.js";


export class ResourcePack extends ObjectBase {


	static DEFAULT = {
		NAME: "",
		TYPE: "ResourcePack",

		MAX_LOCATION_GROUPS: 1,
		MAX_BINDING_GROUPS: 4,

		RESOURCE_LOCATIONS: new Map(),
		RESOURCE_BINDING_GROUPS: new Map(),
	};


	#maxLocationGroups;
	#maxBindingGroups;

    #resourceLocations = new Map();
	#resourceBindingGroups = new Map();


	constructor(args = {}) {
        super(
			{
				...args,
				
                name: (args.name !== undefined) ? args.name : ResourcePack.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : ResourcePack.DEFAULT.TYPE,
            }
		);


		this.maxLocationGroups = (args.maxLocationGroups !== undefined) ? args.maxLocationGroups : ResourcePack.DEFAULT.MAX_LOCATION_GROUPS;
		this.maxBindingGroups = (args.maxBindingGroups !== undefined) ? args.maxBindingGroups : ResourcePack.DEFAULT.MAX_BINDING_GROUPS;

		this.resourceLocations = (args.resourceLocations !== undefined) ? args.resourceLocations : new Map(ResourcePack.DEFAULT.RESOURCE_LOCATIONS);
		this.resourceBindingGroups = (args.resourceBindingGroups !== undefined) ? args.resourceBindingGroups : this.#assembleResourceBindingGroups();
	}


	get maxLocationGroups() { return this.#maxLocationGroups; }
	set maxLocationGroups(maxLocationGroups) { this.#maxLocationGroups = maxLocationGroups; }
	get maxBindingGroups() { return this.#maxBindingGroups; }
	set maxBindingGroups(maxBindingGroups) { this.#maxBindingGroups = maxBindingGroups; }

	get resourceLocations() { return this.#resourceLocations; }
	set resourceLocations(resourceLocations) { this.#resourceLocations = resourceLocations; }
	get resourceBindingGroups() { return this.#resourceBindingGroups; }
	set resourceBindingGroups(resourceBindingGroups) { this.#resourceBindingGroups = resourceBindingGroups; }


	#assembleResourceLocationGroups() {//TODO currently not in use
		const resourceLocationGroups = new Map();
		
		for (let i = 0; i < this.maxLocationGroups; i++) {
			const resourceLocationGroup = null


			resourceLocationGroups.set(i, resourceLocationGroup);
		}


		return resourceLocationGroups;
	}
	#assembleResourceBindingGroups() {
		const resourceBindingGroups = new Map();

		for (let i = 0; i < this.maxBindingGroups; i++) {
			const resourceBindingGroup = new UniformGroupDescriptor(
				{
					label: `resource grou [${i}]`,
					number: i,
					resourceBindingsInternal: new Map(),
					resourceBindingsExternal: new Map(),


					//TODO members not needed?
					bindGroupLayoutDescriptor: new BindGroupLayoutDescriptor(
						{
							label: `object bind group layout [${i}]`,
							entries: new Array()
						}
					),
					bindGroupDescriptor: new BindGroupDescriptor(
						{
							label: `object bind group [${i}]`,
							layout: null,
							entries: new Array(),
						}
					)
				}
			);


			resourceBindingGroups.set(i, resourceBindingGroup);
			// this.setResourceBindingGroup(i, resourceBindingGroup);
		}


		return resourceBindingGroups;
	}

	getResourceBindingGroup(groupNumber) {
		if (this.resourceBindingGroups.has(groupNumber)) {
			return this.resourceBindingGroups.get(groupNumber);
		} else {
			console.warn(`No resource binding group [${groupNumber}]!`);
			return null;
		}
	}
	setResourceBindingGroup(groupNumber, resourceBindingGroup) {
		this.resourceBindingGroups.set(groupNumber, resourceBindingGroup);
	}

	#getResourceBinding(resourceBindings, bindingNumber) {
		if (resourceBindings.has(bindingNumber)) {
			return resourceBindings.get(bindingNumber);
		} else {
			console.warn(`No resource binding [${bindingNumber}]!`);
			return null;
		}
	}
	getResourceBindingInternal(groupNumber, bindingNumber) {
		const resourceBindingGroup = this.getResourceBindingGroup(groupNumber);
		const resourceBindings = resourceBindingGroup.resourceBindingsInternal;


		return this.#getResourceBinding(resourceBindings, bindingNumber);
	}
	getResourceBindingExternal(groupNumber, bindingNumber) {
		const resourceBindingGroup = this.getResourceBindingGroup(groupNumber);
		const resourceBindings = resourceBindingGroup.resourceBindingsExternal;


		return this.#getResourceBinding(resourceBindings, bindingNumber);
	}
	getResourceBindingAny(groupNumber, bindingNumber) {
		const resourceBindingExternal = this.getResourceBindingExternal(groupNumber, bindingNumber);
		if (resourceBindingExternal !== null) {
			return resourceBindingExternal;
		} else {
			return this.getResourceBindingInternal(groupNumber, bindingNumber);
		}
	}

	#setResourceBinding(resourceBindings, bindingNumber, binding) {
		resourceBindings.set(bindingNumber, binding);
	}
	setResourceBindingInternal(groupNumber, bindingNumber, binding) {
		const resourceBindingGroup = this.getResourceBindingGroup(groupNumber);
		const resourceBindings = resourceBindingGroup.resourceBindingsInternal;


		this.#setResourceBinding(resourceBindings, bindingNumber, binding);
	}
	setResourceBindingExternal(groupNumber, bindingNumber, binding) {
		const resourceBindingGroup = this.getResourceBindingGroup(groupNumber);
		const resourceBindings = resourceBindingGroup.resourceBindingsExternal;


		this.#setResourceBinding(resourceBindings, bindingNumber, binding);
	}

	#setResourceBindingValue(resourceBindings, bindingNumber, setInstruction) {
		const resourceBinding = this.#getResourceBinding(resourceBindings, bindingNumber);


		resourceBinding.dirtyCache.set(setInstruction, setInstruction);
	}
	setResourceBindingValueInternal(groupNumber, bindingNumber, setInstruction) {
		const resourceBindingGroup = this.getResourceBindingGroup(groupNumber);
		const resourceBindings = resourceBindingGroup.resourceBindingsInternal;


		this.#setResourceBindingValue(resourceBindings, bindingNumber, setInstruction);
	}
	setResourceBindingValueExternal(groupNumber, bindingNumber, setInstruction) {
		const resourceBindingGroup = this.getResourceBindingGroup(groupNumber);
		const resourceBindings = resourceBindingGroup.resourceBindingsExternal;


		this.#setResourceBindingValue(resourceBindings, bindingNumber, setInstruction);
	}

	//TODO set unifroms here?
	// bindings (uniforms)
	setMapBindingExternal(name, groupNumber, MAP_NUMBER, mapBinding, setInstruction = undefined) {
		const textureBinding = mapBinding.textureBinding;
		const samplerBinding = mapBinding.samplerBinding;
		
		//TODO add max + max here!!!!
		this.setResourceBindingExternal(groupNumber, MAP_NUMBER + 10, textureBinding);
		this.setResourceBindingExternal(groupNumber, MAP_NUMBER + 20, samplerBinding);


		if (setInstruction) {
			const textureSetInstruction = setInstruction.textureSetInstruction;
			const samplerSetInstruction = setInstruction.samplerSetInstruction; //currently not in use
			
			this.setResourceBindingValueExternal(groupNumber, MAP_NUMBER + 10, textureSetInstruction);
		}
	}
};